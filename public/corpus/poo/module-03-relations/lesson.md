---
id: poo.module-03.lesson
title: Relations entre objets
tags:
  - def
  - important
---

# Relations entre objets

Un programme objet n'est pas une collection de classes isolées. C'est un graphe d'objets qui collaborent.

Les relations principales sont :

- association : un objet connaît ou utilise un autre objet ;
- composition : un objet possède fortement un autre objet et contrôle son cycle de vie ;
- agrégation : un objet regroupe d'autres objets sans forcément les posséder ;
- dépendance : un objet utilise temporairement un service ou une valeur.

## Question de conception

Avant d'ajouter un attribut, demander : "cet objet doit-il vraiment connaître cet autre objet ?"

Dans le cinéma, une `Screening` concerné un `Movie` et une `Room`. Une `Room` compose ses `Seat`. Une `Reservation` associe un `Customer`, une `Screening` et des sièges.

## Multiplicites

Les cardinalités forcent à clarifier le modèle :

- une salle contient plusieurs sièges ;
- une séance concerné exactement un film ;
- une réservation contient au moins un siège ;
- un client peut avoir plusieurs réservations.

Une relation mal choisie rend le code difficile à faire évoluer. Une relation trop large propage les changements.

## Méthode de modelisation

Pour choisir une relation, avancer en quatre questions :

1. l'objet À a-t-il besoin de connaître B pour respecter une règle ?
2. À contrôle-t-il la vie de B ?
3. B peut-il exister sans À ?
4. la relation doit-elle être parcourue dans les deux sens ?

Exemple : un `Seat` existe dans une `Room`. Dans notre modèle, un siège sans salle n'a pas de sens. La composition est raisonnable.

Exemple inverse : un `Customer` existe sans `Reservation`. Une réservation reference un client, mais ne le possède pas.

## Attention aux relations bidirectionnelles

Une relation bidirectionnelle semble pratique, mais elle augmente la complexité.

Si `Room` connaît toutes ses `Screening` et que chaque `Screening` connaît sa `Room`, il faut maintenir les deux côtés cohérents. Ce n'est utile que si le domaine le demande vraiment.

## UML utile, pas bureaucratique

Un diagramme de classes doit aider à penser. Il ne doit pas tout documenter.

Pour ce cours, un bon diagramme montre :

- classes importantes du domaine ;
- relations ;
- cardinalités ;
- responsabilités principales ;
- invariants importants.

Il peut ignorer les getters, setters et détails techniques.
