<?php

namespace App\Entity;

use App\Repository\GameRepository;
use Doctrine\ORM\Mapping as ORM;

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

    #[ORM\Column(type: 'text', nullable: true)]
    private ?string $image = null;
    
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

    public function setDate($newDate) {
        if ($newDate >= 1947) {
            $this->date = $newDate;
        }
    }

    public function getVentes()
    {
        return $this->ventes;
    }
    public function setVentes($newVentes)
    {
        $this->ventes = $newVentes;
    }

    public function getImage() 
    {
        return $this->image;
    }

    public function setImage($newImage) 
    {
        $this->image = $newImage;
    }
}