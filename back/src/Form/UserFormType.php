<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;


use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\Email;

use Symfony\Component\Validator\Constraints\Length;


class UserFormType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('pseudo', TextType::class, [
                'attr'=> [
                    'minlength' => 3,
                    'maxlenght' => 20,
                ],
                 'constraints' => [
                new NotBlank(message: 'Le pseudo est obligatoire'),
                new Length(
                    min: 3,
                    max: 50,
                    minMessage: 'Minimun {{ limit }} caractères'
                ),
            ],
            ])
            ->add('nom', TextType::class, [
                'required' => false
            ])
            ->add('prenom', TextType::class, [
                'constraints' => [
                    new NotBlank(message: "Veuillez renseignez votre Prénom")
                ],
            ])
            ->add('email', EmailType::class, [
                'constraints' => [
                    new NotBlank(message: "Veuillez renseignez votre Email"),
                    new Email(message: "Veuillez renseignez un email valide")
                ]
            ])
            ->add('password')
            ->add('avatar', FileType::class, [
                'label' => 'Avatar',
                'mapped' => false,
                'required' => false,
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => User::class,
        ]);
    }
}
