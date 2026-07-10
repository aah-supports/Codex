---
id: poo.module-02.exercises
title: Exercices
---

# TP

Creer :

- `Movie` ;
- `Room` ;
- `Customer` ;
- `Screening`.

Ajouter les regles de validite dans les constructeurs.

# Question

Pourquoi un objet valide des sa construction simplifie-t-il le reste du code ?

# Atelier progressif

## Niveau 1

Ajouter les validations minimales :

- titre de film non vide ;
- duree positive ;
- salle avec au moins un siege ;
- client avec email non vide ;
- reservation avec au moins un siege.

## Niveau 2

Remplacer trois setters par des methodes metier :

- `setTitle` devient `renameTo` ;
- `setCancelled` devient `cancel` ;
- `setStartsAt` devient `rescheduleTo`.

Pour chaque methode, ajouter au moins une validation.

## Niveau 3

Identifier les invariants qui appartiennent a :

- `Movie` ;
- `Room` ;
- `Screening` ;
- `Reservation`.

Puis expliquer pourquoi ces invariants ne doivent pas etre uniquement dans un controller ou un formulaire.

## Critere de reussite

Le code client ne doit pas pouvoir creer un objet manifestement invalide sans recevoir une exception claire.
