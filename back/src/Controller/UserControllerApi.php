<?php

namespace App\Controller;

use App\Repository\UserRepository;
use App\Entity\User;
use App\Entity\Setup;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

#[Route('/api')]
final class UserControllerApi extends AbstractController
{
    // ← méthode privée réutilisable
    private function serializeUser(User $user): array
    {
        return [
            'id' => $user->getIdUser(),
            'pseudo' => $user->getPseudo(),
            'email' => $user->getEmail(),
            'prenom' => $user->getPrenom(),
            'nom' => $user->getNom(),
            'avatar' => $user->getAvatar(),
            'roles' => $user->getRoles(),
            'setup' => $user->getSetup() ? $this->serializeSetup($user->getSetup()) : null,
        ];
    }

    private function serializeSetup(Setup $setup): array
    {
        return [
            'id' => $setup->getId(),
            'processeur' => $setup->getProcesseur(),
            'memoire' => $setup->getMemoire(),
            'carte_graphique' => $setup->getCarte_Graphique(),
            'stockage' => $setup->getStockage(),
        ];
    }

    #[Route('/users', name: 'api_user', methods: ['GET'])]
    public function index(UserRepository $repo): Response
    {
        $users = $repo->findAll();

        return $this->json(
            array_map(fn($u) => $this->serializeUser($u), $users)
        );
    }

    #[Route('/me', name: 'api_me', methods: ['GET'])]
    public function me(): Response
    {
        $user = $this->getUser();
        if (!$user instanceof User) {
            return $this->json(['error' => 'Non authentifié'], 401);
        }
        return $this->json($this->serializeUser($user));
    }

    #[Route('/register', name: 'api_register', methods: ['POST'])]
    public function register(Request $request, EntityManagerInterface $em, UserPasswordHasherInterface $hasher, UserRepository $repo): Response
    {
        // Récupère depuis FormData ou JSON
        $email = $request->request->get('email') ?? (json_decode($request->getContent(), true)['email'] ?? null);
        $pseudo = $request->request->get('pseudo') ?? (json_decode($request->getContent(), true)['pseudo'] ?? null);
        $prenom = $request->request->get('prenom') ?? (json_decode($request->getContent(), true)['prenom'] ?? null);
        $password = $request->request->get('password') ?? (json_decode($request->getContent(), true)['password'] ?? null);
        $nom = $request->request->get('nom');

        if (empty($email) || empty($password) || empty($pseudo) || empty($prenom)) {
            return $this->json(['error' => 'Champs obligatoires manquants'], 400);
        }

        if ($repo->findOneBy(['email' => $email])) {
            return $this->json(['error' => 'Cet email est déjà utilisé'], 409);
        }

        $user = new User();
        $user->setEmail($email);
        $user->setPseudo($pseudo);
        $user->setPrenom($prenom);
        $user->setNom($nom ?? null);
        $user->setPassword($hasher->hashPassword($user, $password));
        $user->setRoles(['ROLE_USER']);

        // Gestion avatar
        $avatarFile = $request->files->get('avatar');
        if ($avatarFile) {
            $newFilename = uniqid() . '.' . $avatarFile->guessExtension();
            $avatarFile->move(
                $this->getParameter('avatars_directory'),
                $newFilename
            );
            $user->setAvatar($newFilename);
        }

        $em->persist($user);
        $em->flush();

        return $this->json($this->serializeUser($user), 201);
    }
    #[Route('/users', name: 'api_user_create', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $em, UserPasswordHasherInterface $hasher): Response
    {
        $data = json_decode($request->getContent(), true);

        $user = new User();
        $user->setEmail($data['email']);
        $user->setPseudo($data['pseudo']);
        $user->setPrenom($data['prenom']);
        $user->setNom($data['nom'] ?? null);
        $user->setPassword($hasher->hashPassword($user, $data['password']));
        $user->setRoles(['ROLE_USER']);

        $em->persist($user);
        $em->flush();

        return $this->json($this->serializeUser($user), 201);
    }



    #[Route('/users/{id_user}', name: 'api_user_show', methods: ['GET'])]
    public function show(int $id_user, UserRepository $repo): Response
    {
        $user = $repo->find($id_user);

        if (!$user) {
            return $this->json(['error' => 'Utilisateur introuvable'], 404);
        }

        return $this->json($this->serializeUser($user));
    }

    #[Route('/users/{id_user}', name: 'api_user_edit', methods: ['PUT'])]
    public function edit(int $id_user, Request $request, UserRepository $repo, EntityManagerInterface $em): Response
    {
        $user = $repo->find($id_user);

        if (!$user) {
            return $this->json(['error' => 'Utilisateur introuvable'], 404);
        }

        $data = json_decode($request->getContent(), true);

        $user->setPseudo($data['pseudo'] ?? $user->getPseudo());
        $user->setPrenom($data['prenom'] ?? $user->getPrenom());
        $user->setEmail($data['email'] ?? $user->getEmail());
        $user->setNom($data['nom'] ?? $user->getNom());

        $em->flush();

        return $this->json($this->serializeUser($user));
    }

    #[Route('/users/{id_user}', name: 'api_user_delete', methods: ['DELETE'])]
    public function delete(int $id_user, UserRepository $repo, EntityManagerInterface $em): Response
    {
        $user = $repo->find($id_user);

        if (!$user) {
            return $this->json(['error' => 'Utilisateur introuvable'], 404);
        }

        $em->remove($user);
        $em->flush();

        return $this->json(['message' => 'Utilisateur supprimé'], 200);
    }

    //ROUTE SETUP
    #[Route('/users/{id_user}/setup', name: 'api_user_setup', methods: ['POST', 'PUT'])]
    public function setup(int $id_user, Request $request, UserRepository $repo, EntityManagerInterface $em): Response
    {
        $user = $repo->find($id_user);

        $data = json_decode($request->getContent(), true);

        $setup = $user->getSetup() ?? new Setup();
        $setup->setProcesseur($data['processeur']);
        $setup->setCarte_Graphique($data['carte_graphique']);
        $setup->setMemoire($data['memoire']);
        $setup->setStockage($data['stockage']);

        $em->persist($setup);
        $em->flush();

        return $this->json(['message' => 'Setup mis à jour']);


    }


}