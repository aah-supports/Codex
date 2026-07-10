---
id: poo.module-08.lesson
title: Exceptions, contrats et objets-valeurs
tags:
  - exception
  - contrat
  - value-object
---

# Exceptions, contrats et objets-valeurs

Un objet protege des invariants. Un invariant est une regle qui doit rester vraie pour que l'objet soit valide.

Les contrats aident a raisonner :

- precondition : ce qui doit etre vrai avant l'appel ;
- postcondition : ce qui doit etre vrai apres l'appel ;
- invariant : ce qui doit rester vrai pendant toute la vie de l'objet.

## Erreur metier ou technique

Une carte refusee, un siege deja reserve et une base de donnees indisponible ne sont pas le meme type de probleme.

## Value Object

Un objet-valeur represente une valeur riche : `Money`, `EmailAddress`, `SeatNumber`. Il est souvent immuable et compare par valeur.
