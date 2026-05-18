<?php
namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\ORM\Mapping as ORM;

use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;

use Symfony\Component\Serializer\Annotation\Groups;


#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\Table(name: 'user')]

class User implements UserInterface, PasswordAuthenticatedUserInterface
{

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['user:read'])]
    private ?int $id_user = null;

    #[ORM\Column(length: 50, unique: true)]
    #[Groups(['user:read'])]
    private string $pseudo;

    #[ORM\Column(length: 100, nullable: true)]
    #[Groups(['user:read'])]
    private ?string $nom = null;

    #[ORM\Column(length: 100)]
    #[Groups(['user:read'])]    
    private string $prenom;

    #[ORM\Column(length: 180, unique: true)]
    #[Groups(['user:read'])]
    private string $email;

    #[ORM\Column(length: 255)]
    private string $password;


    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['user:read'])]
    private ?string $avatar = null;

    #[ORM\Column(type: 'text', nullable: true)]
    #[Groups(['user:read'])]
    private ?string $description = null;


    #[ORM\Column]
    #[Groups(['user:read'])]
    private array $roles = [];

    #[ORM\OneToOne(targetEntity: Setup::class, mappedBy: 'user')]
    private ?Setup $setup = null;



    public function getUserIdentifier(): string
    {
        return $this->email;
    }

    public function getRoles(): array
    {
        $roles = $this->roles;
        $roles[] = 'ROLE_USER';
        return array_unique($roles);
    }

    public function setRoles(array $roles): void
    {
        $this->roles = $roles;
    }

    public function eraseCredentials(): void
    {
    }

    


    // GETTERS
    public function getId_user(): ?int
    {
        return $this->id_user;
    }

    public function getPseudo(): string
    {
        return $this->pseudo;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function getPrenom(): string
    {
        return $this->prenom;
    }

    public function getEmail(): string
    {
        return $this->email;
    }
    public function getPassword(): string
    {
        return $this->password;
    }
    public function getAvatar(): ?string
    {
        return $this->avatar;
    }
    public function getSetup(): ?Setup 
    {
        return $this->setup;
    }
    public function getDescription(): ?string {
        return $this->description;
    }

    //SETTERS
    public function setPseudo(string $pseudo): void
    {
        $this->pseudo = $pseudo;
    }
    public function setNom(?string $nom): void
    {
        $this->nom = $nom;
    }
    public function setPrenom(string $prenom): void
    {
        $this->prenom = $prenom;
    }
    public function setEmail(string $email): void
    {
        $this->email = $email;
    }
    public function setPassword(string $password): void
    {
        $this->password = $password;
    }
    public function setAvatar(?string $avatar): void
    {
        $this->avatar = $avatar;
    }

    public function getIdUser(): ?int
    {
        return $this->id_user;
    }
    public function setSetup(? Setup $setup): void {
        $this->setup = $setup;
    }
    public function setDescription(string $description): void {
        $this->description = $description;
    }


}
