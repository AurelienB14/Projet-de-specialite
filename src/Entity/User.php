<?php
namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\ORM\Mapping as ORM; 


#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\Table(name: 'user')]

class User {

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id_user = null;

    #[ORM\Column(length: 50, unique: true)]
    private string $pseudo;

    #[ORM\Column(length: 100, nullable: true)]
    private ?string $nom = null;

    #[ORM\Column(length: 100)]
    private string $prenom;

    #[ORM\Column(length: 180, unique: true)]
    private string $email;

    #[ORM\Column(length: 255)]
    private string $password;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $avatar = null;



// CONSTRUCTEUR
    public function __construct( ) {
    }


// GETTERS
    public function getId_user(): ?int {
        return $this->id_user;
    }
    
    public function getPseudo(): string {
        return $this->pseudo;
    }

    public function getNom(): ?string {
        return $this->nom;
    }

    public function getPrenom(): string {
        return $this->prenom;
    }

    public function getEmail(): string {
        return $this->email;
    }
    public function getPassword(): string {
        return $this -> password;
    }
    public function getAvatar(): ?string {
        return $this->avatar;
    }

//SETTERS
    public function setPseudo(string $pseudo): void{
        $this->pseudo = $pseudo;
    }
    public function setNom(?string $nom): void {
        $this->nom = $nom;
    }
    public function setPrenom(string $prenom): void {
        $this->prenom = $prenom;
    }
    public function setEmail(string $email): void {
        $this->email = $email;
    }
    public function setPassword(string $password): void {
        $this->password = $password;
    }
    public function setAvatar(?string $avatar): void {
        $this-> avatar = $avatar;
    }


}
