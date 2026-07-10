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
