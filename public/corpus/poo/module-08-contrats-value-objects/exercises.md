---
id: poo.module-08.exercises
title: Exercices
tags:
  - exercice
  - pratique
  - contrat
  - exception
  - value-object
summaryTags:
  - exercice
---

# TP

Créer :

- `Money` ;
- `EmailAddress` ;
- `SeatNumber` ;
- `ScreeningPeriod`.

Pour chacun, définir les invariants.

# Exercice autonome

Remplacer dans le modèle cinéma :

- `String email` par `EmailAddress` ;
- `double price` par `Money` ;
- `String seat` par `SeatNumber`.

Identifier ce que le compilateur peut maintenant protéger.

# Atelier progressif

## Niveau 1

Pour chaque primitive, proposer un objet-valeur :

- `String email` ;
- `double price` ;
- `String currency` ;
- `String seat` ;
- `LocalDateTime start/end`.

## Niveau 2

Écrire les invariants :

```text
Money:
EmailAddress:
SeatNumber:
ScreeningPeriod:
```

## Niveau 3

Modifier `Reservation` pour utiliser `Money` et `SeatNumber`. Rechercher les endroits où le code devient plus simple parce que les validations sont déjà faites.

## Critère de réussite

Un objet-valeur doit refuser une valeur invalide au moment de sa création.
