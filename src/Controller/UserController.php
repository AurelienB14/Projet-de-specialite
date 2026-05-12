<?php

namespace App\Controller;

use App\Repository\UserRepository;
use App\Entity\User;
use Symfony\Component\HttpFoundation\File\UploadedFile;


use App\Form\UserFormType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\RedirectResponse;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;


final class UserController extends AbstractController
{
    #[Route('/user', name: 'app_user')]
    public function index(UserRepository $repo): Response
    {
            $users = $repo->findAll();

        return $this->render('user/index.html.twig', [
            'controller_name' => 'UserController',
                'users' => $users,

        ]);
    }

    #[Route('/user/create', name: 'app_user_create', methods: ['GET', 'POST'])]
    public function create(Request $request, EntityManagerInterface $em, UserPasswordHasherInterface $hasher): Response
    {
        $user = new User();

        $form = $this->createForm(UserFormType::class, $user);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            $hashedPassword = $hasher->hashPassword($user, $user->getPassword());
            $user->setPassword($hashedPassword);

            /** @var UploadedFile $avatarFile */
            $avatarFile = $form->get('avatar')->getData();

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

            return $this->redirectToRoute('app_user');
        }
        return $this->render('user/add.html.twig', [
            'form' => $form,
        ]);


    }

    #[Route('/user/{id_user}', name:'app_user_show', methods: ['GET'])]
    public function show(int $id_user, UserRepository $repo): Response
    {
        $user = $repo->find($id_user);

        if (!$user) {
            throw $this->createNotFoundException('Utilisateur introuvable');
        }

        return $this->render('user/show.html.twig', [
            'user' => $user,
        ]);
    }
    #[Route('/user/{id_user}/delete', name: 'app_user_delete', methods: ['POST', 'DELETE'])]
    public function delete(int $id_user, UserRepository $repo, EntityManagerInterface $em): RedirectResponse
    {

        $user = $repo->find($id_user);
        $em->remove($user);
        $em->flush();

        return $this->redirectToRoute('app_user');
    }

    #[Route('/user/{id_user}/edit', name: 'app_user_edit', methods: ['GET', 'POST'])]
    public function edit(int $id_user, Request $request, UserRepository $repo, EntityManagerInterface $em): Response
    {
        $user = $repo->find($id_user);

        if ($request->isMethod('POST')) {
            $user->setPseudo($request->request->get('pseudo'));
            $user->setPrenom($request->request->get('prenom'));
            $user->setEmail($request->request->get('email'));
            $user->setNom($request->request->get('nom'));
        
            $em->flush();

            return $this->redirectToRoute('app_user');

        }
        return $this->render('user/edit.html.twig', [
            'user' => $user
        ]);

    }


}
