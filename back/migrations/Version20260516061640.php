<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260516061640 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE setup CHANGE user_id user_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE setup ADD CONSTRAINT FK_251D5630A76ED395 FOREIGN KEY (user_id) REFERENCES user (id_user)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_251D5630A76ED395 ON setup (user_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE setup DROP FOREIGN KEY FK_251D5630A76ED395');
        $this->addSql('DROP INDEX UNIQ_251D5630A76ED395 ON setup');
        $this->addSql('ALTER TABLE setup CHANGE user_id user_id INT NOT NULL');
    }
}
