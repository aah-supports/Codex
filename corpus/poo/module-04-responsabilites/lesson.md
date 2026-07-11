---
id: poo.module-04.lesson
title: Responsabilités, cohésion et couplage
tags:
  - def
  - important
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

## Approfondissement théorique : responsabilité et qualité de conception

La responsabilité est une notion centrale parce qu'elle relie le code au raisonnement. Une classe ne devrait pas être jugée seulement par sa taille, mais par l'unité de ce qu'elle décide. Une petite classe peut être mauvaise si elle n'a pas de rôle clair. Une classe plus grande peut être acceptable si tout son contenu sert une même idée.

La cohésion mesure cette unité. Une classe cohésive rassemble des méthodes et des données qui changent pour une même raison. Par exemple, une politique tarifaire qui calcule un prix selon une règle donnée est cohésive. Un service qui calcule le prix, envoie un email, écrit en base et imprime un billet mélange plusieurs raisons de changer.

Le couplage décrit ce qu'une classe connaît des autres. Un couplage existe toujours dans un système objet : les objets collaborent. Le problème est le couplage excessif aux détails. Si une classe dépend de la structure interne de trois autres classes, elle sera fragile. Si elle dépend d'un contrat clair, elle reste plus stable.

Le principe Information Expert propose une règle simple : attribuer une responsabilité à l'objet qui possède les informations nécessaires pour l'assumer. Cette règle n'est pas absolue, mais elle évite de centraliser toute l'intelligence dans des services. Si SeatMap connaît les places libres, SeatMap est un bon candidat pour choisir ou réserver des places.

Dans une démarche universitaire, il faut apprendre à justifier. Dire qu'une méthode est dans une classe parce que cela fonctionne ne suffit pas. Il faut expliquer pourquoi cette classe est le bon propriétaire de la décision, quelles informations elle utilise, et quel changement futur sera plus simple grâce à ce choix.

### Grille de lecture

- Quelles sont les raisons de changer de cette classe ?
- Quelles décisions porte-t-elle réellement ?
- De quels détails externes dépend-elle inutilement ?
