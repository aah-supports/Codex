---
id: poo.module-06.exercises
title: Exercices
---

# Exercice guide

Créer deux implémentations de `ReservationRepository` :

- `InMemoryReservationRepository` ;
- `FakeDatabaseReservationRepository`.

Le cas d'utilisation ne doit pas changer quand on remplace l'implémentation.

# Exercice autonome

Ajouter une interface `PaymentGateway` avec une implémentation `FakePaymentGateway`. Le cas d'utilisation doit confirmer la réservation seulement si le paiement réussit.

# Atelier progressif

## Niveau 1

Identifier les détails techniques dans cette liste :

- calculer le prix ;
- sauvegarder en SQL ;
- vérifier les sièges ;
- appeler Stripe ;
- envoyer un email SMTP ;
- confirmer une réservation.

## Niveau 2

Créer les ports :

- `ReservationRepository` ;
- `PaymentGateway` ;
- `NotificationService`.

Pour chaque port, écrire une phrase : "le domaine a besoin de..."

## Niveau 3

Écrire un test du cas d'utilisation avec :

- `InMemoryReservationRepository` ;
- `FakePaymentGateway` ;
- `SpyNotificationService`.

Le test doit vérifier que la réservation est sauvegardée seulement si le paiement est accepté.

## Critère de réussite

Aucun cas d'utilisation ne doit instancier directement une classe d'infrastructure.
