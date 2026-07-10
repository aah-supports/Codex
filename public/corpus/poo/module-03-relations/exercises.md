---
id: poo.module-03.exercises
title: Exercices
---

# Exercice guide

Dessiner le diagramme de classes minimal du cinema :

- `Movie` ;
- `Room` ;
- `Seat` ;
- `Screening` ;
- `Customer` ;
- `Reservation`.

Indiquer les multiplicites.

# Exercice autonome

Repondre pour chaque relation :

- qui controle le cycle de vie ?
- la relation doit-elle etre navigable dans les deux sens ?
- peut-on remplacer l'objet par un identifiant sans perdre une regle importante ?

# TP

Coder `Room`, `Seat` et `Screening`. Ajouter une methode qui refuse deux seances qui se chevauchent dans la meme salle.

# Atelier progressif

## Niveau 1

Classer les relations :

- une salle contient des sieges ;
- une seance concerne un film ;
- une reservation concerne un client ;
- une reservation contient plusieurs sieges ;
- un paiement confirme une reservation.

Pour chaque relation, choisir association, composition, agregation ou dependance.

## Niveau 2

Ajouter les cardinalites :

```text
Room 1 -- * Seat
Screening * -- 1 Movie
Reservation * -- 1 Customer
Reservation 1 -- * Seat
```

Discuter les cardinalites qui pourraient changer selon le metier.

## Niveau 3

Coder une methode `Room.hasSeat(SeatNumber seatNumber)` et l'utiliser dans `Reservation` pour refuser un siege qui n'appartient pas a la salle de la seance.

## Critere de reussite

Le modele doit empecher une reservation incoherente : reserver un siege d'une autre salle, reserver zero siege, ou programmer deux seances incompatibles.
