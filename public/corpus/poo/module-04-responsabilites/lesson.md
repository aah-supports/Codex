---
id: poo.module-04.lesson
title: Responsabilites, cohesion et couplage
tags:
  - responsabilite
  - cohesion
  - couplage
---

# Responsabilites, cohesion et couplage

Une bonne classe n'est pas une classe courte par principe. C'est une classe dont les responsabilites sont coherentes.

La cohesion mesure si les elements d'une classe travaillent vers une meme intention. Le couplage mesure a quel point une classe depend des details des autres.

## Diagnostic simple

Demander :

- quelle est la raison de changer de cette classe ?
- quel objet possede deja les informations necessaires ?
- cette classe orchestre-t-elle tout le systeme ?
- ce comportement appartient-il au domaine ou a l'infrastructure ?

## Information Expert

Le principe GRASP Information Expert propose d'attribuer une responsabilite a l'objet qui possede l'information necessaire pour la realiser.

Ce n'est pas une loi mecanique. Il faut aussi regarder la cohesion, la testabilite et le niveau d'abstraction.

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

La decision de savoir si une reservation est un groupe appartient davantage a `Reservation`.

## God Object

Un objet central qui sait tout faire devient vite impossible a maintenir. Dans le projet cinema, `ReservationService` peut devenir un God Object s'il gere :

- disponibilite ;
- prix ;
- paiement ;
- persistance ;
- notification ;
- generation de billet ;
- remboursement.

Le refactoring consiste a identifier les axes de changement, puis a distribuer les responsabilites.

## Cohesion avant abstraction

Ne pas creer une interface uniquement parce qu'une classe existe. Chercher d'abord une responsabilite claire. Une abstraction faible rend le code plus difficile a lire.
