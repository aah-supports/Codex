---
id: poo.module-06.exercises
title: Exercices
---

# Exercice guide

Creer deux implementations de `ReservationRepository` :

- `InMemoryReservationRepository` ;
- `FakeDatabaseReservationRepository`.

Le cas d'utilisation ne doit pas changer quand on remplace l'implementation.

# Exercice autonome

Ajouter une interface `PaymentGateway` avec une implementation `FakePaymentGateway`. Le cas d'utilisation doit confirmer la reservation seulement si le paiement reussit.

# Atelier progressif

## Niveau 1

Identifier les details techniques dans cette liste :

- calculer le prix ;
- sauvegarder en SQL ;
- verifier les sieges ;
- appeler Stripe ;
- envoyer un email SMTP ;
- confirmer une reservation.

## Niveau 2

Creer les ports :

- `ReservationRepository` ;
- `PaymentGateway` ;
- `NotificationService`.

Pour chaque port, ecrire une phrase : "le domaine a besoin de..."

## Niveau 3

Ecrire un test du cas d'utilisation avec :

- `InMemoryReservationRepository` ;
- `FakePaymentGateway` ;
- `SpyNotificationService`.

Le test doit verifier que la reservation est sauvegardee seulement si le paiement est accepte.

## Critere de reussite

Aucun cas d'utilisation ne doit instancier directement une classe d'infrastructure.
