<?php

namespace App\Controller;

use App\Entity\Setup;
use App\Repository\SetupRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;


#[Route('/api/setups')]
final class ApiSetupController extends AbstractController
{
    #[Route('', name: 'api_setup_index', methods: ['GET'])]
    public function index(SetupRepository $repo): JsonResponse
    {
        $setups = $repo->findAll();
        $data = array_map(fn($s) => [
            'id' => $s->getId(),
            'processeur' => $s->getProcesseur(),
            'memoire' => $s->getMemoire(),
            'carte_graphique' => $s->getCarteGraphique(),
            'stockage' => $s->getStockage(),
        ], $setups);

        return $this->json($data);
    }

    #[Route('', name: 'api_setup_create', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $em, UserRepository $userRepo): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $setup = new Setup();
        $setup->setProcesseur($data['processeur']);
        $setup->setMemoire($data['memoire']);
        $setup->setCarteGraphique($data['carte_graphique']);
        $setup->setStockage($data['stockage']);

        if (isset($data['user_id'])) {
            $user = $userRepo->find($data['user_id']);
            if ($user) $setup->setUser($user);
        }

        $em->persist($setup);
        $em->flush();

        return $this->json(['id' => $setup->getId()], 201);
    }

    #[Route('/{id}', name: 'api_setup_show', methods: ['GET'])]
    public function show(int $id, SetupRepository $repo): JsonResponse
    {
        $setup = $repo->find($id);
        if (!$setup) return $this->json(['error' => 'Not found'], 404);

        return $this->json([
            'id' => $setup->getId(),
            'processeur' => $setup->getProcesseur(),
            'memoire' => $setup->getMemoire(),
            'carte_graphique' => $setup->getCarteGraphique(),
            'stockage' => $setup->getStockage(),
        ]);
    }

    #[Route('/{id}', name: 'api_setup_edit', methods: ['PUT'])]
    public function edit(int $id, Request $request, SetupRepository $repo, EntityManagerInterface $em): JsonResponse
    {
        $setup = $repo->find($id);
        if (!$setup) return $this->json(['error' => 'Not found'], 404);

        $data = json_decode($request->getContent(), true);
        $setup->setProcesseur($data['processeur']);
        $setup->setMemoire($data['memoire']);
        $setup->setCarteGraphique($data['carte_graphique']);
        $setup->setStockage($data['stockage']);

        $em->flush();

        return $this->json(['success' => true]);
    }

    #[Route('/{id}', name: 'api_setup_delete', methods: ['DELETE'])]
    public function delete(int $id, SetupRepository $repo, EntityManagerInterface $em): JsonResponse
    {
        $setup = $repo->find($id);
        if (!$setup) return $this->json(['error' => 'Not found'], 404);

        $em->remove($setup);
        $em->flush();

        return $this->json(['success' => true]);
    }
}