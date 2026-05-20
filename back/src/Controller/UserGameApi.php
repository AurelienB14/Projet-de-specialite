<?php

namespace App\Controller;

use App\Entity\UserGame;
use App\Repository\UserGameRepository;
use App\Repository\UserRepository;
use App\Repository\GameRepository;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/api')]
final class UserGameApi extends AbstractController
{

    private function serialize(UserGame $ug): array
    {
        return [
            'id' => $ug->getId(),
            'user' => $ug->getUser()?->getIdUser(),
            'game' => [
                'id' => $ug->getGame()?->getId(),
                'nom' => $ug->getGame()?->getNom(),
                'image' => $ug->getGame()?->getImage(),
                'categories' => $ug->getGame()?->getCategories(),
            ],
            'added_at' => $ug->getAddedAt()?->format('d-m-Y'),
            'status' => $ug->getStatus(),
            'note' => $ug->getNote(),
        ];
    }

    #[Route('/users/{id_user}/games', name: 'api_user_games', methods: ['GET'])]
    public function index(int $id_user, UserGameRepository $repo): JsonResponse
    {

        $userGames = $repo->findBy(['user' => $id_user]);
        return $this->json(
            array_map(fn($ug) => $this->serialize($ug), $userGames)
        );
    }

    #[Route('/users/{id_user}/games', name: 'api_user_game_add', methods: ['POST'])]
    public function add(int $id_user, Request $request, UserRepository $userRepo, GameRepository $gameRepo, EntityManagerInterface $em): JsonResponse
    {

        $data = json_decode($request->getContent(), true);

        $user = $userRepo->find($id_user);
        $game = $gameRepo->find($data['game_id']);
       
        if (!$user || !$game) {
            return $this->json(['error' => 'User ou Game introuvable'], 404);
        }

        $userGame = new UserGame();
        $userGame->setUser($user);
        $userGame->setGame($game);
        $userGame->setStatus($data['status'] ?? null);
        $userGame->setNote($data['note'] ?? null);

        $em->persist($userGame);
        $em->flush();

        return $this->json($this->serialize($userGame), 201);
    }

    #[Route('/users/{id_user}/games/{id}', name: 'api_user_game_edit', methods: ['PUT'])]
    public function edit(int $id, Request $request, UserGameRepository $repo, EntityManagerInterface $em): JsonResponse
    {
        $userGame = $repo->find($id);
        if (!$userGame)
            return $this->json(['error' => 'Not found'], 404);

        $data = json_decode($request->getContent(), true);
        $userGame->setStatus($data['status'] ?? $userGame->getStatus());
        $userGame->setNote($data['note'] ?? $userGame->getNote());

        $em->flush();
        return $this->json($this->serialize($userGame));
    }

    // Supprimer un jeu de la bibliothèque
    #[Route('/users/{id_user}/games/{id}', name: 'api_user_game_delete', methods: ['DELETE'])]
    public function delete(int $id, UserGameRepository $repo, EntityManagerInterface $em): JsonResponse
    {
        $userGame = $repo->find($id);
        if (!$userGame)
            return $this->json(
                ['error' => 'Not found'],
                404
            );

        $em->remove($userGame);
        $em->flush();
        return $this->json(['message' => 'Jeu retiré de la bibliothèque']);
    }
}
