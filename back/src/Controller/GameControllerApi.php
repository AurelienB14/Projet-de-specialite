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
            'image'=>$game->getImage()
        ];

        return $this->json($data);
    }
}