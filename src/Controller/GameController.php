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

class GameController extends AbstractController
{
    #[Route('/games', name: 'app_games')]
    public function index(GameRepository $gameRepository): Response
    {
        $games = $gameRepository->findAll();

        return $this->render('game/index.html.twig', [
            'controller_name' => 'GameController',
            'games' => $games,
        ]);

    }

    #[Route('/game/{id}', name: 'app_game')]
    public function game(int $id, GameRepository $jeuRepository): Response
    {
        $jeu = $jeuRepository->find($id);

        return $this->render('game/game.html.twig', [
            'jeu' => $jeu,
        ]);

    }

    #[Route('/game/createupdate/{id}', name: 'app_createupdategame', defaults: ['id' => null])]
    public function createupdate(int $id = null, GameRepository $jeuRepository, Request $request, EntityManagerInterface $manager): Response
    {

        $lien = "/game/createupdate/0";
        $btn = "Ajouter";
        $lienback = "/games";

        if ($id && $id>0) {
            $jeu = $jeuRepository->find($id);
            $lien = "/game/createupdatejeu/$id";
            $btn = "Modifier";
            $lienback = "/game/$id";
        } else {
            $jeu = new Game();
        }

        $verificationTab = [];

        if ($request->isMethod('POST')) {
            $jeu->setNom($request->request->get('nom'));
            $jeu->setDescription($request->request->get('description'));
            $jeu->setAge($request->request->get('age'));
            $jeu->setDate($request->request->get('date'));
            $jeu->setVentes($request->request->get('ventes'));

            if (strlen($jeu->getNom()) < 2 || strlen($jeu->getNom()) > 100) {
                $verificationTab["nom"] = "Le nom comporte " . strlen($jeu->getNom()) . " Caractères. Minimum : 2 | Maximum : 100";
            }

            if (strlen($jeu->getDescription()) < 10 || strlen($jeu->getDescription()) > 1000) {
                $verificationTab["description"] = "La description " . strlen($jeu->getDescription()) . " Caractères. Minimum : 10 | Maximum : 1000";
            }

            if ($jeu->getAge() < 3 || $jeu->getAge() > 18) {
                $verificationTab["age"] = "L'âge minimum d'un jeu doit se situer entre 3 et 18 ans. Actuellement : " . $jeu->getAge() . " ans.";
            }

            if ($jeu->getDate() < 1958 || $jeu->getDate() > date("Y") + 10) {
                $verificationTab["date"] = "La date de sortie du jeu doit être entre 1958 et " . (date("Y") + 10) . ". Actuellement : " . $jeu->getDate() . ".";
            }

            if ($jeu->getVentes() < 0 || $jeu->getVentes() > 1000000000) {
                $verificationTab["ventes"] = "La date de sortie du jeu doit être entre 0 et 1000000000 (1 milliard). Actuellement : " . $jeu->getVentes() . " ventes.";
            }

            $imageFile = $request->files->get('image');
            if ($imageFile) {
                $extensionsValides = ["jpg", "jpeg", "png"];
                $extension = strtolower($imageFile->getClientOriginalExtension());
                
                if (!in_array($extension, $extensionsValides)) {
                    $verificationTab["image"] = "Format invalide (jpg, jpeg, png uniquement).";
                } elseif (count($verificationTab) > 0) {
                    $verificationTab["image"] = "Resélectionnez votre image.";
                } elseif ($imageFile->getSize() > 500 * 1024) {
                    $verificationTab["image"] = "L'image ne doit pas dépasser 500KB.";
                } else {
                    $imageData = base64_encode(file_get_contents($imageFile->getPathname()));
                    $mimeType = $imageFile->getMimeType();
                    $jeu->setImage('data:' . $mimeType . ';base64,' . $imageData);
                }
            } elseif (!$id || $id==0) {
                $verificationTab["image"] = "Une image est obligatoire.";
            }

            if (count($verificationTab) > 0) {
                return $this->render('game/createupdate.html.twig', [
                    'verification' => $verificationTab,
                    'jeu' => $jeu,
                    'lien' => $lien,
                    'btn' => $btn,
                    'lienback' => $lienback,
                ]);
            }

            $manager->persist($jeu);
            $manager->flush();

        } else {
            return $this->render('game/createupdate.html.twig', [
                'verification' => $verificationTab,
                'jeu' => $jeu,
                'lien' => $lien,
                'btn' => $btn,
                'lienback' => $lienback,
            ]);
        }

        return $this->redirectToRoute('app_games');
    }

    #[Route('/game/delete/{id}', name: 'app_deletegame')]
    public function JeuDelete(int $id, GameRepository $jeuRepository, EntityManagerInterface $manager)
    {
        $jeu = $jeuRepository->find($id);

        if ($jeu) {
            $manager->remove($jeu);
            $manager->flush();
        }

        return $this->redirectToRoute('app_games');
    }
}