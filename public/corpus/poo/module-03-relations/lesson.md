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
