---
id: poo.module-09.solutions
title: Corrections guidées
tags:
  - correction
  - a-retenir
  - test
  - comportement
  - mock
summaryTags:
  - correction
---

# Corrections guidées

## Correction de l’exercice principal

Problème travaillé : Les tests vérifient les getters et la liste exacte des méthodes appelées. Ils cassent dès qu’on refactore sans changer le comportement.

La règle à retenir est la suivante : Un bon test objet décrit un comportement observable : résultat, exception métier, changement d’état public ou collaboration importante.

Le test vérifie qu’une réservation impossible est refusée. Il ne vérifie pas l’ordre interne de toutes les méthodes privées.

## Raisonnement pas à pas

1. Reformule la règle métier avec des mots simples.
2. Identifie l’objet qui possède les données nécessaires pour appliquer cette règle.
3. Place la vérification ou la décision dans cet objet, pas dans tous les appelants.
4. Relis l’appel public : il doit raconter une intention métier, pas une manipulation technique.

## Correction type

```java
@Test
void refuseReservationWhenSeatIsAlreadyTaken() {
    Screening screening = new Screening(1);
    screening.reserveSeats(1);

    assertThrows(IllegalArgumentException.class, () -> screening.reserveSeats(1));
}
```

Cette correction montre le résultat attendu : un nom métier, une règle localisée et un appelant qui n’a pas besoin de connaître les détails internes.

## Erreur fréquente

Tester les détails internes donne une fausse sécurité et rend le refactoring coûteux.

## Auto-évaluation

- Peux-tu expliquer pourquoi chaque classe existe ?
- Peux-tu citer la règle protégée par l’objet ?
- Peux-tu changer une règle sans modifier toute l’application ?
- Ton code reste-t-il compréhensible sans commentaire long ?
