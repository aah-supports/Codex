---
id: poo.module-02.exercises
title: Exercices
---

# TP

Créer :

- `Movie` ;
- `Room` ;
- `Customer` ;
- `Screening`.

Ajouter les règles de validité dans les constructeurs.

# Question

Pourquoi un objet valide dès sa construction simplifie-t-il le reste du code ?

# Atelier progressif

## Niveau 1

Ajouter les validations minimales :

- titre de film non vide ;
- durée positive ;
- salle avec au moins un siège ;
- client avec email non vide ;
- réservation avec au moins un siège.

## Niveau 2

Remplacer trois setters par des méthodes métier :

- `setTitle` devient `renameTo` ;
- `setCancelled` devient `cancel` ;
- `setStartsAt` devient `rescheduleTo`.

Pour chaque méthode, ajouter au moins une validation.

## Niveau 3

Identifier les invariants qui appartiennent à :

- `Movie` ;
- `Room` ;
- `Screening` ;
- `Reservation`.

Puis expliquer pourquoi ces invariants ne doivent pas être uniquement dans un controller ou un formulaire.

## Critère de réussite

Le code client ne doit pas pouvoir créer un objet manifestement invalide sans recevoir une exception claire.
