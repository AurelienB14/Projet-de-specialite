<?php

namespace App\Form;

use App\Entity\Setup;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class SetupFormType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('processeur')
            ->add('memoire', ChoiceType::class, [
                'choices' => [
                    '4 Go' => 4,
                    '8 Go' => 8,
                    '16 Go' => 16,
                    '32 Go' => 32,
                ],
                'label' => 'Mémoire RAM',
            ])
            ->add('carte_graphique')
            ->add('stockage', ChoiceType::class, [
    'choices' => [
        '128 Go' => 128,
        '256 Go' => 256,
        '512 Go' => 512,
        '1 To' => 1000,
        '2 To' => 2000,
    ],
    'label' => 'Stockage',
])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Setup::class,
        ]);
    }
}