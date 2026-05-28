<?php

namespace App\Entity;

use App\Repository\ReviewRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;


#[ORM\Entity(repositoryClass: ReviewRepository::class)]
#[ORM\Table(name: 'review')]


class Review {

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: User::class)]
    #[ORM\JoinColumn(name: 'user_id', referencedColumnName: 'id_user', nullable: false)]
    private ?User $user = null;

    #[ORM\ManyToOne(targetEntity: Game::class, inversedBy: 'reviews')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Game $game = null;

    #[ORM\Column(type: 'datetime')]
    private ?\DateTimeInterface $createdAt = null;

    #[ORM\Column]
    private int $note = 0;

    #[ORM\Column(type: 'text', nullable: true)]
    private ?string $commentaire = null;

    public function __construct()
    {
        $this->createdAt = new \DateTime();
    }

    public function getId(): ?int { return $this->id; }
    public function getUser(): ?User { return $this->user; }
    public function getGame(): ?Game { return $this->game; }
    public function getCreatedAt(): ?\DateTimeInterface { return $this->createdAt; }
    public function getNote(): ?int { return $this->note; }
    public function getCommentaire(): ?string { return $this->commentaire; }

    public function setUser(?User $user): void { $this->user = $user; }
    public function setGame(?Game $game): void { $this->game = $game; }
    public function setCreatedAt(\DateTimeInterface $createdAt): void { $this->createdAt = $createdAt; }
    public function setNote(?int $note): void { $this->note = $note; }
    public function setCommentaire(?string $commentaire): void { $this->commentaire = $commentaire; }



}