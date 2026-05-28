<?php

namespace App\Controller;

use App\Entity\Game;
use App\Entity\Review;
use App\Repository\ReviewRepository;

use App\Repository\UserRepository;
use App\Repository\GameRepository;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/api')]
final class ReviewControllerApi extends AbstractController
{


    private function serialize(Review $review): array
    {
        return [
            'id' => $review->getId(),
            'user' => [
                'id' => $review->getUser()?->getIdUser(),
                'pseudo' => $review->getUser()?->getPseudo(),
                'avatar' => $review->getUser()?->getAvatar(),
            ],
            'game' => [
                'id' => $review->getGame()?->getId(),
                'nom' => $review->getGame()?->getNom(),
                'image' => $review->getGame()?->getImage(),
                'categories' => $review->getGame()?->getCategories(),
            ],
            'created_at' => $review->getCreatedAt()?->format('d-m-Y'),
            'commentaire' => $review->getCommentaire(),
            'note' => $review->getNote(),
        ];
    }

    private function reCalculGameNote(Game $game, EntityManagerInterface $em): void 
    {
        $reviews = $game->getReviews();
        $total = count($reviews);
        $moyenne = $total > 0
            ? round(array_sum(array_map(fn($r) => $r->getNote(), $reviews->toArray())) / $total, 1)
            : null;

        $game->setNote($moyenne);
        $em->flush();
    }

    #[Route('/users/{id_user}/reviews', name: 'api_user_reviews', methods: ['GET'])]
    public function index(int $id_user, ReviewRepository $repo): JsonResponse
    {

        $userReviews = $repo->findBy(['user' => $id_user]);
        return $this->json(
            array_map(fn($review) => $this->serialize($review), $userReviews)
        );
    }

    #[Route('/users/{id_user}/reviews', name: 'api_user_review_add', methods: ['POST'])]
    public function add(int $id_user, Request $request, UserRepository $userRepo, GameRepository $gameRepo, EntityManagerInterface $em): JsonResponse
    {

        $data = json_decode($request->getContent(), true);

        $user = $userRepo->find($id_user);
        $game = $gameRepo->find($data['game_id']);

        if (!$user || !$game) {
            return $this->json(['error' => 'User ou Game introuvable'], 404);
        }

        $userReview = new Review();
        $userReview->setUser($user);
        $userReview->setGame($game);
        $userReview->setCommentaire($data['commentaire'] ?? null);
        $userReview->setNote($data['note'] ?? null);

        $em->persist($userReview);
        $em->flush();
        $this->reCalculGameNote($game, $em);
        return $this->json($this->serialize($userReview), 201);
    }

    #[Route('/users/{id_user}/review/{id}', name: 'api_user_review_edit', methods: ['PUT'])]
    public function edit(int $id, Request $request, ReviewRepository $repo, EntityManagerInterface $em): JsonResponse
    {
        $userReview = $repo->find($id);
        if (!$userReview)
            return $this->json(['error' => 'Not found'], 404);

        $data = json_decode($request->getContent(), true);
        $userReview->setCommentaire($data['commentaire'] ?? $userReview->getCommentaire());
        $userReview->setNote($data['note'] ?? $userReview->getNote());

        $em->flush();
        $this->reCalculGameNote($userReview->getGame(), $em);
        return $this->json($this->serialize($userReview));
    }

    // Supprimer un jeu de la bibliothèque
    #[Route('/users/{id_user}/review/{id}', name: 'api_user_review_delete', methods: ['DELETE'])]
    public function delete(int $id, ReviewRepository $repo, EntityManagerInterface $em): JsonResponse
    {
        $userReview = $repo->find($id);
        if (!$userReview)
            return $this->json(
                ['error' => 'Not found'],
                404
            );
        $game = $userReview->getGame();
        $em->remove($userReview);
        $em->flush();
        $this->reCalculGameNote($game, $em);
        return $this->json(['message' => 'avis retiré']);
    }
    #[Route('/games/{id}/reviews', name: 'api_game_reviews', methods: ['GET'])]
    public function gameReviews(int $id, ReviewRepository $repo): JsonResponse
    {
        $reviews = $repo->findBy(['game' => $id]);
        return $this->json(
            array_map(fn($review) => $this->serialize($review), $reviews)
        );
    }
}