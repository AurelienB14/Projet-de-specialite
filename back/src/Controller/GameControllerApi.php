<?php

namespace App\Controller;

use App\Entity\Game;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\Request;
use App\Form\GameFormType;


use App\Repository\GameRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api')]
class GameControllerApi extends AbstractController
{
    #[Route('/games', name: 'api_games')]
    public function index(GameRepository $gameRepository): Response
    {
        $games = $gameRepository->findAll();
        $data = [];
        foreach ($games as $game) {
            $data[] = $game->getId();
        }

        return $this->json($data);
    }

    #[Route('/game/{id}', name: 'api_game')]
    public function game(int $id, GameRepository $jeuRepository): Response
    {
        $game = $jeuRepository->find($id);
        $data = [
            'id'=>$game->getId(),
            'nom'=>$game->getNom(),
            'description'=>$game->getDescription(),
            'age'=>$game->getAge(),
            'date'=>$game->getDate(),
            'ventes'=>$game->getVentes(),
            'image'=>$game->getImage(),
            'categories'=>$game->getCategories(),
            'cpu_min'=>$game->getCpuMin(),
            'gpu_min'=>$game->getGpuMin(),
            'ram_min'=>$game->getRamMin(),
        ];

        return $this->json($data);
    }

    #[Route('/game/createupdate/{id}', name: 'api_createupdategame', defaults: ['id' => null], methods: ['GET', 'POST'])]
    public function createupdate(int $id, GameRepository $jeuRepository, Request $request, EntityManagerInterface $manager): Response
    {

        $data = [
            "infos" => [
                "lien" => "/game/createupdate/0",
                "btn" => "Ajouter",
                "lienback" => "/games"
            ],
            "verification" => [
                "nom" => "",
                "description" => "",
                "date" => "",
                "age" => "",
                "ventes" => "",
                "image" => ""
            ],
            "jeu" => [
                "nom" => "",
                "description" => "",
                "date" => null,
                "age" => null,
                "ventes" => null,
                "image" => "",
                "categories" => []
            ]
        ];

        if ($id && $id>0) {
            $jeu = $jeuRepository->find($id);
            $data["infos"]["lien"] = "/game/createupdatejeu/$id";
            $data["infos"]["btn"] = "Modifier";
            $data["infos"]["lienback"] = "/game/$id";

            $data["jeu"]["nom"] = $jeu->getNom();
            $data["jeu"]["description"] = $jeu->getDescription();
            $data["jeu"]["date"] = $jeu->getDate();
            $data["jeu"]["age"] = $jeu->getAge();
            $data["jeu"]["ventes"] = $jeu->getVentes();
            $data["jeu"]["image"] = $jeu->getImage();
            $data["jeu"]["categories"] = $jeu ->getCategories();
        } else {
            $jeu = new Game();
        }

        $verif = false;

        if ($request->isMethod('POST')) {
            $jeu->setNom($request->request->get('nom'));
            $jeu->setDescription($request->request->get('description'));
            $jeu->setAge($request->request->get('age'));
            $jeu->setDate($request->request->get('date'));
            $jeu->setVentes($request->request->get('ventes'));
            $jeu->setCategories(json_decode($request->request->get('categories'), true) ?? []); 

            if (strlen($jeu->getNom()) < 2 || strlen($jeu->getNom()) > 100) {
                $data["verification"]["nom"] = "Le nom comporte " . strlen($jeu->getNom()) . " Caractères. Minimum : 2 | Maximum : 100";
                $verif = True;
            }

            if (strlen($jeu->getDescription()) < 10 || strlen($jeu->getDescription()) > 1000) {
                $data["verification"]["description"] = "La description " . strlen($jeu->getDescription()) . " Caractères. Minimum : 10 | Maximum : 1000";
                $verif = True;
            }

            if ($jeu->getAge() < 3 || $jeu->getAge() > 18) {
                $data["verification"]["age"] = "L'âge minimum d'un jeu doit se situer entre 3 et 18 ans. Actuellement : " . $jeu->getAge() . " ans.";
                $verif = True;
            }

            if ($jeu->getDate() < 1958 || $jeu->getDate() > date("Y") + 10) {
                $data["verification"]["date"] = "La date de sortie du jeu doit être entre 1958 et " . (date("Y") + 10) . ". Actuellement : " . $jeu->getDate() . ".";
                $verif = True;
            }

            if ($jeu->getVentes() < 0 || $jeu->getVentes() > 1000000000) {
                $data["verification"]["ventes"] = "La date de sortie du jeu doit être entre 0 et 1000000000 (1 milliard). Actuellement : " . $jeu->getVentes() . " ventes.";
                $verif = True;
            }

            $imageFile = $request->files->get('image');
            if ($imageFile) {
                $extensionsValides = ["jpg", "jpeg", "png"];
                $extension = strtolower($imageFile->getClientOriginalExtension());
                
                if (!in_array($extension, $extensionsValides)) {
                    $data["verification"]["image"] = "Format invalide (jpg, jpeg, png uniquement).";
                } elseif ($verif > 0) {
                    $data["verification"]["image"] = "Resélectionnez votre image.";
                } elseif ($imageFile->getSize() > 500 * 1024) {
                    $data["verification"]["image"] = "L'image ne doit pas dépasser 500KB.";
                } else {
                    $imageData = base64_encode(file_get_contents($imageFile->getPathname()));
                    $mimeType = $imageFile->getMimeType();
                    $jeu->setImage('data:' . $mimeType . ';base64,' . $imageData);
                    $data["jeu"]["image"] = $jeu->getImage();
                }
            } elseif (!$id || $id==0) {
                $data["verification"]["image"] = "Une image est obligatoire.";
            }

            if ($verif) {
                return $this->json($data);
            }

            $manager->persist($jeu);
            $manager->flush();

        } else {
            return $this->json($data);
        }

        return $this->json(['success' => true]);
    }


    #[Route('/game/delete/{id}', name: 'api_deletegame', methods: ['DELETE'])]
    public function JeuDelete(int $id, GameRepository $jeuRepository, EntityManagerInterface $manager)
    {
        $jeu = $jeuRepository->find($id);

        if ($jeu) {
            $manager->remove($jeu);
            $manager->flush();
        }

        return $this->json(['success' => true]);
    }
}