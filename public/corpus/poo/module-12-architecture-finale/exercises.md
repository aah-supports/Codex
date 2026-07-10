---
id: poo.module-12.exercises
title: Exercices
---

# Projet final

Terminer le systeme de reservation de cinema :

1. gestion des films ;
2. programmation des seances ;
3. reservation de sieges ;
4. tarification ;
5. paiement ;
6. cycle de vie ;
7. notifications.

# Livrables

- diagramme de classes limite au domaine ;
- deux diagrammes de sequence ;
- tests ;
- trois decisions de conception ;
- une mauvaise conception abandonnee ;
- un refactoring significatif ;
- justification des patterns utilises ou refuses.

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

Ecrire trois decisions d'architecture :

```text
Decision:
Contexte:
Option retenue:
Option refusee:
Consequence positive:
Consequence negative:
```

## Niveau 3

Construire un scenario complet :

```text
Given une seance disponible
And deux sieges libres
When le client reserve et paye
Then la reservation est confirmee
And le paiement est enregistre
And une notification est envoyee
```

Identifier les objets et ports traverses.

## Niveau 4

Preparer la soutenance :

- une responsabilite bien placee ;
- une responsabilite deplacee pendant le refactoring ;
- un pattern utile ;
- un pattern refuse ;
- un compromis non resolu.

## Critere de reussite

Le projet doit pouvoir evoluer sur au moins trois axes sans modification massive : nouveau tarif, nouveau moyen de paiement, nouveau canal de notification.
