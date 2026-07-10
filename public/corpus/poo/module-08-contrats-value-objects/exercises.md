---
id: poo.module-08.exercises
title: Exercices
---

# TP

Creer :

- `Money` ;
- `EmailAddress` ;
- `SeatNumber` ;
- `ScreeningPeriod`.

Pour chacun, definir les invariants.

# Exercice autonome

Remplacer dans le modele cinema :

- `String email` par `EmailAddress` ;
- `double price` par `Money` ;
- `String seat` par `SeatNumber`.

Identifier ce que le compilateur peut maintenant proteger.

# Atelier progressif

## Niveau 1

Pour chaque primitive, proposer un objet-valeur :

- `String email` ;
- `double price` ;
- `String currency` ;
- `String seat` ;
- `LocalDateTime start/end`.

## Niveau 2

Ecrire les invariants :

```text
Money:
EmailAddress:
SeatNumber:
ScreeningPeriod:
```

## Niveau 3

Modifier `Reservation` pour utiliser `Money` et `SeatNumber`. Rechercher les endroits ou le code devient plus simple parce que les validations sont deja faites.

## Critere de reussite

Un objet-valeur doit refuser une valeur invalide au moment de sa creation.
