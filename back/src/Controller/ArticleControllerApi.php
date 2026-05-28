<?php

namespace App\Controller;

use App\Entity\Article;
use App\Repository\ArticleRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api')]
final class ArticleControllerApi extends AbstractController
{
    private function serialize(Article $article): array
    {
        return [
            'id' => $article->getId(),
            'auteur' => [
                'id' => $article->getAuteur()?->getIdUser(),
                'pseudo' => $article->getAuteur()?->getPseudo(),
                'avatar' => $article->getAuteur()?->getAvatar(),
            ],
            'title' => $article->getTitle(),
            'content' => $article->getContent(),
            'image' => $article->getImage(),
            'tags' => $article->getTags(),
            'created_at' => $article->getDate()?->format('d-m-Y'),
        ];
    }

    #[Route('/articles', name: 'api_articles', methods: ['GET'])]
    public function index(ArticleRepository $repo): JsonResponse
    {
        $articles = $repo->findAll();
        return $this->json(
            array_map(fn($a) => $this->serialize($a), $articles)
        );
    }



    #[Route('/articles/{id}', name: 'api_article_show', methods: ['GET'])]
    public function show(int $id, ArticleRepository $repo): JsonResponse
    {
        $article = $repo->find($id);
        if (!$article) return $this->json(['error' => 'Not found'], 404);
        return $this->json($this->serialize($article));
    }



    #[Route('/articles', name: 'api_article_create', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $user = $this->getUser();
        if (!$user instanceof \App\Entity\User) {
            return $this->json(['error' => 'Non authentifié'], 401);
        }

        $data = json_decode($request->getContent(), true);

        $article = new Article();
        $article->setTitle($data['title']);
        $article->setContent($data['content']);
        $article->setImage($data['image'] ?? null);
        $article->setTags($data['tags'] ?? []);
        $article->setAuteur($user);
        $article->setCreatedAt(new \DateTime());

        $em->persist($article);
        $em->flush();

        return $this->json($this->serialize($article), 201);
    }



    #[Route('/articles/{id}', name: 'api_article_edit', methods: ['PUT'])]
    public function edit(int $id, Request $request, ArticleRepository $repo, EntityManagerInterface $em): JsonResponse
    {
        $article = $repo->find($id);
        if (!$article) return $this->json(['error' => 'Not found'], 404);

        $data = json_decode($request->getContent(), true);
        $article->setTitle($data['title'] ?? $article->getTitle());
        $article->setContent($data['content'] ?? $article->getContent());
        $article->setImage($data['image'] ?? $article->getImage());
        $article->setTags($data['tags'] ?? $article->getTags());

        $em->flush();
        return $this->json($this->serialize($article));
    }



    #[Route('/articles/{id}', name: 'api_article_delete', methods: ['DELETE'])]
    public function delete(int $id, ArticleRepository $repo, EntityManagerInterface $em): JsonResponse
    {
        $article = $repo->find($id);
        if (!$article) return $this->json(['error' => 'Not found'], 404);

        $em->remove($article);
        $em->flush();
        return $this->json(['message' => 'Article supprimé']);
    }
}