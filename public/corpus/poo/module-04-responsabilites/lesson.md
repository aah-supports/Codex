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

Ces deux mots sont abstraits, donc il faut les relier à une situation concrète.

Une classe très cohésive ressemble à un outil spécialisé : tout ce qu'elle contient sert le même objectif. Par exemple, une classe `PricingPolicy` qui calcule uniquement un prix.

Une classe très couplée connaît trop de détails des autres classes. Par exemple, une classe qui navigue dans `reservation.getScreening().getRoom().getName()` dépend de la structure interne de `Reservation`, `Screening` et `Room`.

Le problème n'est pas esthétique. Plus une classe connaît de détails, plus elle risque de casser quand un détail change.

## Diagnostic simple

Demander :

- quelle est la raison de changer de cette classe ?
- quel objet possède déjà les informations nécessaires ?
- cette classe orchestre-t-elle tout le système ?
- ce comportement appartient-il au domaine ou à l'infrastructure ?

## Information Expert

Le principe GRASP Information Expert propose d'attribuer une responsabilité à l'objet qui possède l'information nécessaire pour la réaliser.

Exemple : pour savoir si une réservation contient au moins cinq sièges, `Reservation` est un bon candidat, car elle possède déjà la liste des sièges.

Ce n'est pas une loi mécanique. Il faut aussi regarder la cohésion, la testabilité et le niveau d'abstraction.

## Déplacer le comportement vers le bon objet

Une mauvaise conception apparaît souvent ainsi :

```java
if (reservation.getSeats().size() > 5) {
    price = price * 0.9;
}
```

La classe qui contient ce code connaît la structure interne de `Reservation`. Une meilleure piste est de demander :

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

Ici, "axe de changement" signifie "raison probable pour laquelle le code devra évoluer". Le prix peut changer pour une raison commerciale. La persistance peut changer pour une raison technique. Les notifications peuvent changer pour une raison produit.

Le refactoring consiste à identifier ces axes de changement, puis à distribuer les responsabilités.

## Cohésion avant abstraction

Ne pas créer une interface uniquement parce qu'une classe existe. Chercher d'abord une responsabilité claire.

Une abstraction est une idée générale qui cache un détail. Par exemple, `PaymentGateway` cache le détail "Stripe", "PayPal" ou "faux paiement de test".

Une abstraction faible est une abstraction qui ne cache rien d'utile. Si une interface n'a qu'une seule implémentation, aucun changement probable, et un nom flou, elle ajoute surtout du bruit.
