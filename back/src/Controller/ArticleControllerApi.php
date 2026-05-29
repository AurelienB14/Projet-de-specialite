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
        if (!$article)
            return $this->json(['error' => 'Not found'], 404);
        return $this->json($this->serialize($article));
    }



    #[Route('/articles', name: 'api_article_create', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $user = $this->getUser();
        if (!$user instanceof \App\Entity\User) {
            return $this->json(['error' => 'Non authentifié'], 401);
        }

        $article = new Article();
        $article->setTitle($request->request->get('title'));
        $article->setContent($request->request->get('content'));
        $tagsRaw = $request->request->get('tags');
        $article->setTags($tagsRaw ? json_decode($tagsRaw, true) : []);
        $article->setAuteur($user);
        $article->setCreatedAt(new \DateTime());

        $imageFile = $request->files->get('image');
        if ($imageFile) {
            $newFilename = uniqid() . '.' . $imageFile->guessExtension();
            $imageFile->move($this->getParameter('articles_directory'), $newFilename);
            $article->setImage($newFilename);
        }

        $em->persist($article);
        $em->flush();

        return $this->json($this->serialize($article), 201);
    }



    #[Route('/articles/{id}', name: 'api_article_edit', methods: ['PUT', 'POST'])]
    public function edit(int $id, Request $request, ArticleRepository $repo, EntityManagerInterface $em): JsonResponse
    {
        $article = $repo->find($id);
        if (!$article)
            return $this->json(['error' => 'Not found'], 404);

        $article->setTitle($request->request->get('title') ?? $article->getTitle());
        $article->setContent($request->request->get('content') ?? $article->getContent());

        $tagsRaw = $request->request->get('tags');
        if ($tagsRaw !== null) {
            $article->setTags(json_decode($tagsRaw, true));
        }

        $imageFile = $request->files->get('image');
        if ($imageFile) {
            $newFilename = uniqid() . '.' . $imageFile->guessExtension();
            $imageFile->move($this->getParameter('articles_directory'), $newFilename);
            $article->setImage($newFilename);
        }

        $em->flush();
        return $this->json($this->serialize($article));
    }



    #[Route('/articles/{id}', name: 'api_article_delete', methods: ['DELETE'])]
    public function delete(int $id, ArticleRepository $repo, EntityManagerInterface $em): JsonResponse
    {
        $article = $repo->find($id);
        if (!$article)
            return $this->json(['error' => 'Not found'], 404);

        $em->remove($article);
        $em->flush();
        return $this->json(['message' => 'Article supprimé']);
    }
}