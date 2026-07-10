---
id: poo.module-01.exercises
title: Exercices
---

# Exercice guide

A partir du domaine du cinema, lister les objets probables :

- film ;
- salle ;
- siege ;
- seance ;
- client ;
- reservation.

Pour chaque objet, noter :

- ce qu'il connait ;
- ce qu'il fait ;
- avec quels autres objets il collabore.

# Exercice autonome

Modeliser `Movie`, `Screening` et `MovieTheater`. Ne pas commencer par les attributs uniquement. Commencer par les responsabilites.

# Atelier progressif

## Niveau 1

Pour chacun des mots suivants, dire s'il s'agit plutot d'un objet, d'une valeur, d'une action ou d'une regle :

- film ;
- duree ;
- reserver ;
- tarif etudiant ;
- salle ;
- siege ;
- paiement refuse ;
- annulation.

## Niveau 2

Ecrire une fiche pour trois objets :

```text
Nom:
Etat connu:
Comportements:
Collaborateurs:
Regles protegees:
```

## Niveau 3

Comparer deux conceptions :

1. une fonction `reserve(customer, screening, seats)` qui fait tout ;
2. des objets `Reservation`, `Screening`, `Seat`, `PricingPolicy`.

Expliquer ce qui sera plus facile a changer si demain on ajoute :

- un tarif senior ;
- une salle 4DX ;
- une interdiction de reserver deux fois le meme siege ;
- une annulation remboursable.

## Correction attendue

Une bonne reponse ne cherche pas a creer beaucoup de classes. Elle justifie ou se trouve chaque responsabilite.
