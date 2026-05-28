<?php

namespace App\Command;

use App\Repository\GameRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

#[AsCommand(name: 'app:recalcul-notes')]
class RecalculNotesCommand extends Command
{
    public function __construct(
        private GameRepository $gameRepo,
        private EntityManagerInterface $em
    ) {
        parent::__construct();
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $games = $this->gameRepo->findAll();

        foreach ($games as $game) {
            $reviews = $game->getReviews();
            $total = count($reviews);
            $moyenne = $total > 0
                ? array_sum(array_map(fn($r) => $r->getNote(), $reviews->toArray())) / $total
                : null;

            $game->setNote($moyenne);
        }

        $this->em->flush();
        $output->writeln('Notes recalculées !');

        return Command::SUCCESS;
    }
}