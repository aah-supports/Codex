---
id: poo.module-04.lesson
title: Responsabilités, cohésion et couplage
tags:
  - responsabilité
  - cohésion
  - couplage
---

# Responsabilités, cohésion et couplage

Une bonne classe n'est pas une classe courte par principe. C'est une classe dont les responsabilités sont cohérentes.

La cohésion mesure si les éléments d'une classe travaillent vers une même intention. Le couplage mesure à quel point une classe dépend des détails des autres.

## Diagnostic simple

Demander :

- quelle est la raison de changer de cette classe ?
- quel objet possède déjà les informations nécessaires ?
- cette classe orchestre-t-elle tout le système ?
- ce comportement appartient-il au domaine ou à l'infrastructure ?

## Information Expert

Le principe GRASP Information Expert propose d'attribuer une responsabilité à l'objet qui possède l'information nécessaire pour la realiser.

Ce n'est pas une loi mécanique. Il faut aussi regarder la cohésion, la testabilite et le niveau d'abstraction.

## Deplacer le comportement vers le bon objet

Une mauvaise conception apparait souvent ainsi :

```java
if (reservation.getSeats().size() > 5) {
    price = price * 0.9;
}
```

La classe qui contient ce code connait la structure interne de `Reservation`. Une meilleure piste est de demander :

```java
if (reservation.isGroupBooking()) {
    price = price * 0.9;
}
```

La décision de savoir si une réservation est un groupe appartient davantage à `Reservation`.

## God Object

Un objet central qui sait tout faire devient vite impossible à maintenir. Dans le projet cinéma, `ReservationService` peut devenir un God Object s'il gère :

- disponibilité ;
- prix ;
- paiement ;
- persistance ;
- notification ;
- génération de billet ;
- remboursement.

Le refactoring consiste à identifier les axes de changement, puis à distribuer les responsabilités.

## Cohésion avant abstraction

Ne pas créer une interface uniquement parce qu'une classe existe. Chercher d'abord une responsabilité claire. Une abstraction faible rend le code plus difficile à lire.
