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

    public function __construct()
    {
        $this->createdAt = new \DateTime();
    }
    //getters
    public function getId(): ?int
    {
        return $this->id;
    }
    public function getTitle(): string
    {
        return $this->title;
    }
    public function getContent(): string
    {
        return $this->content;
    }
    public function getImage(): ?string
    {
        return $this->image;
    }
    public function getDate(): \DateTimeInterface
    {
        return $this->createdAt;
    }
    public function getAuteur(): User
    {
        return $this->auteur;
    }
    public function getTags(): ?array
    {
        return $this->tags;
    }


    public function setTitle(string $title): void
    {
        $this->title = $title;
    }
    public function setContent(string $content): void
    {
        $this->content = $content;
    }
    public function setImage(?string $image): void
    {
        $this->image = $image;
    }
    public function setAuteur(?User $auteur): void
    {
        $this->auteur = $auteur;
    }
    public function setTags(?array $tags): void
    {
        $this->tags = $tags;
    }
    public function setCreatedAt(\DateTimeInterface $createdAt): void
    {
        $this->createdAt = $createdAt;
    }


}