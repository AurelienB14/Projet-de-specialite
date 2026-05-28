<?php

namespace App\Entity;

use App\Repository\GameRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;

#[ORM\Entity(repositoryClass: GameRepository::class)]
class Game
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private string $nom = '';

    #[ORM\Column(type: 'text')]
    private string $description = '';

    #[ORM\Column]
    private int $age = 0;

    #[ORM\Column]
    private int $date = 0;

    #[ORM\Column]
    private int $ventes = 0;

    #[ORM\Column(type: 'json', nullable: true)]
    private ?array $categories = [];

    #[ORM\Column(type: 'json', nullable: true)]
    private ?array $plateforms = [];

    #[ORM\Column(type: 'text', nullable: true)]
    private ?string $image = null;

    #[ORM\Column(type: 'float', nullable: true)]
    private ?float $note = null;

    #[ORM\OneToMany(mappedBy: 'game', targetEntity: Review::class)]
    private Collection $reviews;

    #[ORM\ManyToOne(targetEntity: User::class)]
    #[ORM\JoinColumn(name: 'user_id', referencedColumnName: 'id_user', nullable: true)]

    private ?User $user_id = null;

    public function __construct()
    {
        $this->reviews = new ArrayCollection();
    }

    public function getReviews(): Collection
    {
        return $this->reviews;
    }

    public function getId()
    {
        return $this->id;
    }

    public function getNom()
    {
        return $this->nom;
    }

    public function setNom($newNom)
    {
        $this->nom = $newNom;
    }

    public function getDescription()
    {
        return $this->description;
    }

    public function setDescription($newDescription)
    {
        $this->description = $newDescription;
    }

    public function getAge()
    {
        return $this->age;
    }

    public function setAge($newAge)
    {
        $this->age = $newAge;
    }

    public function getDate()
    {
        return $this->date;
    }

    public function setDate($newDate)
    {
        if ($newDate >= 1947) {
            $this->date = $newDate;
        }
    }

    public function getCategories(): ?array
    {
        return $this->categories;
    }
    public function setCategories(?array $categories): void
    {
        $this->categories = $categories;
    }

    public function getPlateformes(): ?array
    {
        return $this->plateforms;
    }
    public function setPlateformes(?array $plateformes): void
    {
        $this->plateforms = $plateformes;
    }


    public function getVentes()
    {
        return $this->ventes;
    }
    public function setVentes($newVentes)
    {
        $this->ventes = $newVentes;
    }

    public function getNote()
    {
        return $this->note;
    }
    public function setNote($newNote)
    {
        $this->note = $newNote;
    }

    public function getUserId()
    {
        return $this->user_id;
    }
    public function setUserId($newUserId)
    {
        $this->user_id = $newUserId;
    }

    public function getImage()
    {
        return $this->image;
    }

    public function setImage($newImage)
    {
        $this->image = $newImage;
    }


    //SETUP MINIMUM
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $cpu_min = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $gpu_min = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?int $ram_min = null;

    public function getCpuMin(): ?string { return $this-> cpu_min; }
    public function setCpuMin(?string $cpu_min): void {$this->cpu_min = $cpu_min; }

    public function getGpuMin(): ?string { return $this-> gpu_min; }
    public function setGpuMin(?string $gpu_min): void {$this->gpu_min = $gpu_min; }

    public function getRamMin(): ?int { return $this-> ram_min; }
    public function setRamMin(?string $ram_min): void {$this->ram_min = $ram_min; }

}