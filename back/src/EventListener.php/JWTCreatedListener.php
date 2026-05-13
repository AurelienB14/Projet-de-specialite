<?php

namespace App\EventListener;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

class JWTCreatedListener
{
    public function onJWTCreated(JWTCreatedEvent $event): void
    {
        $user = $event->getUser();
        $payload = $event->getData();

        $payload['id'] = $user->getIdUser();
        $payload['roles'] = $user->getRoles();
        $payload['pseudo'] = $user->getPseudo();

        $event->setData($payload);
    }
}