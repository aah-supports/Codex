---
id: poo.module-03.lesson
title: Relations entre objets
tags:
  - association
  - composition
  - uml
---

# Relations entre objets

Un programme objet n'est pas une collection de classes isolees. C'est un graphe d'objets qui collaborent.

Les relations principales sont :

- association : un objet connait ou utilise un autre objet ;
- composition : un objet possede fortement un autre objet et controle son cycle de vie ;
- agregation : un objet regroupe d'autres objets sans forcement les posseder ;
- dependance : un objet utilise temporairement un service ou une valeur.

## Question de conception

Avant d'ajouter un attribut, demander : "cet objet doit-il vraiment connaitre cet autre objet ?"

Dans le cinema, une `Screening` concerne un `Movie` et une `Room`. Une `Room` compose ses `Seat`. Une `Reservation` associe un `Customer`, une `Screening` et des sieges.

## Multiplicites

Les cardinalites forcent a clarifier le modele :

- une salle contient plusieurs sieges ;
- une seance concerne exactement un film ;
- une reservation contient au moins un siege ;
- un client peut avoir plusieurs reservations.

Une relation mal choisie rend le code difficile a faire evoluer. Une relation trop large propage les changements.

## Methode de modelisation

Pour choisir une relation, avancer en quatre questions :

1. l'objet A a-t-il besoin de connaitre B pour respecter une regle ?
2. A controle-t-il la vie de B ?
3. B peut-il exister sans A ?
4. la relation doit-elle etre parcourue dans les deux sens ?

Exemple : un `Seat` existe dans une `Room`. Dans notre modele, un siege sans salle n'a pas de sens. La composition est raisonnable.

Exemple inverse : un `Customer` existe sans `Reservation`. Une reservation reference un client, mais ne le possede pas.

## Attention aux relations bidirectionnelles

Une relation bidirectionnelle semble pratique, mais elle augmente la complexite.

Si `Room` connait toutes ses `Screening` et que chaque `Screening` connait sa `Room`, il faut maintenir les deux cotes coherents. Ce n'est utile que si le domaine le demande vraiment.

## UML utile, pas bureaucratique

Un diagramme de classes doit aider a penser. Il ne doit pas tout documenter.

Pour ce cours, un bon diagramme montre :

- classes importantes du domaine ;
- relations ;
- cardinalites ;
- responsabilites principales ;
- invariants importants.

Il peut ignorer les getters, setters et details techniques.
