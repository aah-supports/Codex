---
id: poo.module-01.exercises
title: Exercices
---

# Exercice guide

À partir du domaine du cinéma, lister les objets probables :

- film ;
- salle ;
- siège ;
- séance ;
- client ;
- réservation.

Pour chaque objet, noter :

- ce qu'il connait ;
- ce qu'il fait ;
- avec quels autres objets il collabore.

# Exercice autonome

Modéliser `Movie`, `Screening` et `MovieTheater`. Ne pas commencer par les attributs uniquement. Commencer par les responsabilités.

# Atelier progressif

## Niveau 1

Pour chacun des mots suivants, dire s'il s'agit plutôt d'un objet, d'une valeur, d'une action ou d'une règle :

- film ;
- durée ;
- réserver ;
- tarif étudiant ;
- salle ;
- siège ;
- paiement refusé ;
- annulation.

## Niveau 2

Écrire une fiche pour trois objets :

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

Expliquer ce qui sera plus facile à changer si demain on ajoute :

- un tarif senior ;
- une salle 4DX ;
- une interdiction de réserver deux fois le même siège ;
- une annulation remboursable.

## Correction attendue

Une bonne réponse ne cherche pas à créer beaucoup de classes. Elle justifie où se trouve chaque responsabilité.
