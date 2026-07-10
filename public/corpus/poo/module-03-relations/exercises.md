---
id: poo.module-03.exercises
title: Exercices
---

# Exercice guide

Dessiner le diagramme de classes minimal du cinéma :

- `Movie` ;
- `Room` ;
- `Seat` ;
- `Screening` ;
- `Customer` ;
- `Reservation`.

Indiquer les multiplicites.

# Exercice autonome

Repondre pour chaque relation :

- qui contrôle le cycle de vie ?
- la relation doit-elle être navigable dans les deux sens ?
- peut-on remplacer l'objet par un identifiant sans perdre une règle importante ?

# TP

Coder `Room`, `Seat` et `Screening`. Ajouter une méthode qui refusé deux séances qui se chevauchent dans la même salle.

# Atelier progressif

## Niveau 1

Classer les relations :

- une salle contient des sièges ;
- une séance concerne un film ;
- une réservation concerne un client ;
- une réservation contient plusieurs sièges ;
- un paiement confirme une réservation.

Pour chaque relation, choisir association, composition, agrégation ou dépendance.

## Niveau 2

Ajouter les cardinalités :

```text
Room 1 -- * Seat
Screening * -- 1 Movie
Reservation * -- 1 Customer
Reservation 1 -- * Seat
```

Discuter les cardinalités qui pourraient changer selon le métier.

## Niveau 3

Coder une méthode `Room.hasSeat(SeatNumber seatNumber)` et l'utiliser dans `Reservation` pour refusér un siège qui n'appartient pas à la salle de la séance.

## Critère de réussite

Le modèle doit empêcher une réservation incohérente : réserver un siège d'une autre salle, réserver zéro siège, ou programmer deux séances incompatibles.
