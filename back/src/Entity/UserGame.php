<?php

namespace App\Entity;

use App\Repository\UserGameRepository;
use Doctrine\ORM\Mapping as ORM;


#[ORM\Entity(repositoryClass: UserGameRepository::class)]
#[ORM\Table(name: 'user_game')]

class UserGame {

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: User::class)]
    #[ORM\JoinColumn(name: 'user_id', referencedColumnName: 'id_user', nullable: false)]
    private ?User $user = null;

    #[ORM\ManyToOne(targetEntity: Game::class, inversedBy: 'userGames')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Game $game = null;

    #[ORM\Column(type: 'datetime')]
    private ?\DateTimeInterface $addedAt = null;

    #[ORM\Column(length: 50, nullable: true)]
    private ?string $status = null;

    #[ORM\Column(nullable: true)]
    private ?int $note = null;


    public function __construct(){
        $this->addedAt = new \DateTime();
    }

    public function getId(): ?int { return $this->id; }
    public function getUser(): ?User { return $this->user; }
    public function getGame(): ?Game { return $this->game; }
    public function getAddedAt(): ?\DateTimeInterface { return $this->addedAt; }
    public function getStatus(): ?string { return $this->status; }
    public function getNote(): ?int { return $this->note; }

    public function setUser(?User $user): void { $this->user = $user; }
    public function setGame(?Game $game): void { $this->game = $game; }
    public function setAddedAt(\DateTimeInterface $addedAt): void { $this->addedAt = $addedAt; }
    public function setStatus(?string $status): void { $this->status = $status; }
    public function setNote(?int $note): void { $this->note = $note; }

}
