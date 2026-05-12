<?php

namespace App\Controller;

use App\Repository\SetupRepository;
use App\Entity\Setup;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

use App\Form\SetupFormType;
use Doctrine\ORM\EntityManagerInterface;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\RedirectResponse;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;



final class SetupController extends AbstractController
{
    #[Route('/setup', name: 'app_setup')]
    public function index(SetupRepository $repo): Response
    {
            $setups = $repo->findAll();

        return $this->render('setup/index.html.twig', [
            'controller_name' => 'SetupController',
                'setups' => $setups,

        ]);
    } 

    #[Route('/setup/create', name: 'app_setup_create', methods: ['GET', 'POST'])]
    public function create(Request $request, EntityManagerInterface $em): Response
    {
        $setup = new Setup();

        $form = $this->createForm(SetupFormType::class, $setup);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {


            $em->persist($setup);
            $em->flush();

            return $this->redirectToRoute('app_setup');
        }
        return $this->render('setup/add.html.twig', [
            'form' => $form,
        ]);


    }


    #[Route('/setup/{id_setup}', name:'app_setup_show', methods: ['GET'])]
    public function show(int $id_setup, SetupRepository $repo): Response
    {
        $setup = $repo->find($id_setup);

        if (!$setup) {
            throw $this->createNotFoundException('Ordinateur introuvable');
        }

        return $this->render('setup/show.html.twig', [
            'setup' => $setup,
        ]);
    }


    #[Route('/setup/{id_setup}/delete', name: 'app_setup_delete', methods: ['POST', 'DELETE'])]
    public function delete(int $id_setup, SetupRepository $repo, EntityManagerInterface $em): RedirectResponse
    {

        $setup = $repo->find($id_setup);
        $em->remove($setup);
        $em->flush();

        return $this->redirectToRoute('app_setup');
    }

#[Route('/setup/{id_setup}/edit', name: 'app_setup_edit', methods: ['GET', 'POST'])]
    public function edit(int $id_setup, Request $request, SetupRepository $repo, EntityManagerInterface $em): Response
    {
        $setup = $repo->find($id_setup);

        if ($request->isMethod('POST')) {
            $setup->setProcesseur($request->request->get('processeur'));
            $setup->setMemoire($request->request->get('memoire'));
            $setup->setCarte_Graphique($request->request->get('carte_graphique'));
            $setup->setStockage($request->request->get('stockage'));
        
            $em->flush();

            return $this->redirectToRoute('app_setup');

        }
        return $this->render('setup/edit.html.twig', [
            'setup' => $setup
        ]);

    }


}