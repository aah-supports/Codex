---
id: poo.module-12.exercises
title: Exercices
---

# Projet final

Terminer le système de réservation de cinéma :

1. gestion des films ;
2. programmation des séances ;
3. réservation de sièges ;
4. tarification ;
5. paiement ;
6. cycle de vie ;
7. notifications.

# Livrables

- diagramme de classes limite au domaine ;
- deux diagrammes de sequence ;
- tests ;
- trois décisions de conception ;
- une mauvaise conception abandonnée ;
- un refactoring significatif ;
- justification des patterns utilisés ou refusés.

# Atelier progressif

## Niveau 1

Classer ces classes par couche :

- `Reservation` ;
- `CreateReservationUseCase` ;
- `SqlReservationRepository` ;
- `ReservationController` ;
- `PricingPolicy` ;
- `StripePaymentAdapter` ;
- `Money`.

## Niveau 2

Écrire trois décisions d'architecture :

```text
Decision:
Contexte:
Option retenue:
Option refusee:
Consequence positive:
Consequence negative:
```

## Niveau 3

Construire un scénario complet :

```text
Given une séance disponible
And deux sièges libres
When le client réserve et paye
Then la réservation est confirmée
And le paiement est enregistre
And une notification est envoyee
```

Identifier les objets et ports traversés.

## Niveau 4

Preparer la soutenance :

- une responsabilité bien placée ;
- une responsabilité deplacée pendant le refactoring ;
- un pattern utile ;
- un pattern refusé ;
- un compromis non resolu.

## Critère de réussite

Le projet doit pouvoir évoluer sur au moins trois axes sans modification massive : nouveau tarif, nouveau moyen de paiement, nouveau canal de notification.
