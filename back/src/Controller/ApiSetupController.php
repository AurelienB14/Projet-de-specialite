<?php

namespace App\Controller;

use App\Config\SetupConfig;
use App\Entity\Setup;
use App\Repository\SetupRepository;
use App\Repository\UserRepository;
use App\Repository\GameRepository;
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
            if ($user)
                $setup->setUser($user);
        }

        $em->persist($setup);
        $em->flush();

        return $this->json(['id' => $setup->getId()], 201);
    }

    #[Route('/{id}', name: 'api_setup_show', methods: ['GET'])]
    public function show(int $id, SetupRepository $repo): JsonResponse
    {
        $setup = $repo->find($id);
        if (!$setup)
            return $this->json(['error' => 'Not found'], 404);

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
        if (!$setup)
            return $this->json(['error' => 'Not found'], 404);

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
        if (!$setup)
            return $this->json(['error' => 'Not found'], 404);

        $em->remove($setup);
        $em->flush();

        return $this->json(['success' => true]);
    }

    #[Route('/config/setup', name: 'api_setup_config', methods: ['GET'])]
    public function setupConfig(): JsonResponse
    {
        return $this->json([
            'gpu' => SetupConfig::GPU_LIST,
            'cpu' => SetupConfig::CPU_LIST,
            'ram' => SetupConfig::RAM_LIST,

        ]);
    }

    #[Route('/verify-setup/{gameId}', name: 'api_verify_setup', methods: ['GET'])]
    public function verifySetup(int $gameId, GameRepository $gameRepo): JsonResponse
    {
        $user = $this->getUser();

        if (!$user instanceof \App\Entity\User) {
            return $this->json(['error' => 'Non authentifié'], 401);
        }

        $game = $gameRepo->find($gameId);
        $setup = $user->getSetup();

        if (!$setup) {
            return $this->json(['error' => 'Pas de setup'], 404);
        }

        $cpuList = SetupConfig::CPU_LIST;
        $gpuList = SetupConfig::GPU_LIST;
        $ramList = SetupConfig::RAM_LIST;

        $userCpuIndex = array_search($setup->getProcesseur(), $cpuList);
        $gameCpuIndex = array_search($game->getCpuMin(), $cpuList);

        $userGpuIndex = array_search($setup->getCarteGraphique(), $gpuList);
        $gameGpuIndex = array_search($game->getGpuMin(), $gpuList);

        $userRamIndex = array_search($setup->getMemoire(), $ramList);
        $gameRamIndex = array_search($game->getRamMin(), $ramList);

        return $this->json([
            'cpu' => [
                'ok' => $userCpuIndex >= $gameCpuIndex,
                'user' => $setup->getProcesseur(),
                'required' => $game->getCpuMin(),
            ],
            'gpu' => [
                'ok' => $userGpuIndex >= $gameGpuIndex,
                'user' => $setup->getCarteGraphique(),
                'required' => $game->getGpuMin(),
            ],
            'ram' => [
                'ok' => $userRamIndex >= $gameRamIndex,
                'user' => $setup->getMemoire(),
                'required' => $game->getRamMin(),
            ],
            'can_run' => $userCpuIndex >= $gameCpuIndex && $userGpuIndex >= $gameGpuIndex && $userRamIndex >= $gameRamIndex,
        ]);
    }
}