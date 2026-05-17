<?php   


namespace App\Entity;

use App\Entity\User;
use App\Repository\SetupRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: SetupRepository::class)]
#[ORM\Table(name: 'setup')]

class Setup
{

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length:255)]
    private string $processeur = '';

    #[ORM\Column]
    private int $memoire = 0;

    #[ORM\Column(length:255)]
    private string $carte_graphique = '';

    #[ORM\Column(nullable: true)]
    private int $stockage = 0;

    #[ORM\OneToOne(targetEntity: User::class, inversedBy: 'setup')]
    #[ORM\JoinColumn(name: 'user_id', referencedColumnName: 'id_user', nullable: true)]
    private ?User $user = null;


// CONSTRUCTEUR
    public function __construct( ) {
    }


// GETTERS
    public function getId_user(): ?int {
        return $this->id;
    }


    public function getProcesseur(): string
    {
        return $this->processeur;
    }

    public function getMemoire(): int
    {
        return $this->memoire;
    }

    public function getCarte_Graphique(): string
    {
        return $this->carte_graphique;
    }
    

    public function getStockage(): int
    {
        return $this->stockage;
    }
    public function getUser(): ?User {
        return $this->user;
    }


//SETTERS
    public function setProcesseur(string $processeur): void{
        $this->processeur = $processeur;
    }

    public function setMemoire(int $memoire): void{
        $this->memoire = $memoire;
    }

    public function setCarte_Graphique(string $carte_graphique): void{
        $this->carte_graphique = $carte_graphique;
    }

    public function setStockage(int $stockage): void{
        $this->stockage = $stockage;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCarteGraphique(): ?string
    {
        return $this->carte_graphique;
    }

    public function setCarteGraphique(string $carte_graphique): static
    {
        $this->carte_graphique = $carte_graphique;

        return $this;
    }
    public function setUser(?User $user): void {
        $this ->user = $user;
    }
}