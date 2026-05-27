<?php

namespace App\Entity;

use App\Repository\ArticleRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ArticleRepository::class)]
#[ORM\Table(name: 'article')]

class Article
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private string $title;

    #[ORM\Column(type: 'text')]
    private string $content;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $image = null;

    #[ORM\Column(type: 'datetime')]
    private \DateTimeInterface $createdAt;

    #[ORM\ManyToOne(targetEntity: User::class)]
    #[ORM\JoinColumn(name: 'user_id', referencedColumnName: 'id_user')]
    private ?User $auteur = null;

    #[ORM\Column(type: 'json', nullable: true)]
    private ?array $tags = [];


    //getters
    public function getId(): ?int
    {
        return $this->id;
    }
    public function getTitle(): string { return $this->title; }
    public function getContent(): string { return $this->content; }
    public function getImage(): ?string { return $this->image; }
    public function getDate(): \DateTimeInterface { return $this->createdAt; }
    public function getAuteur(): string { return $this->title; }


}