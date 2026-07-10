---
id: poo.module-01.lesson
title: Comprendre le paradigme objet
tags:
  - poo
  - objet
  - responsabilite
---

# Comprendre le paradigme objet

La programmation orientee objet ne consiste pas seulement a ranger du code dans des classes. Le point central est de repartir correctement les responsabilites.

Un objet combine trois dimensions :

- un etat ;
- un comportement ;
- une identite.

La bonne question n'est pas seulement "quelles donnees faut-il stocker ?", mais "quel objet doit etre responsable de cette decision ?".

## Procedural vs objet

En procedural, une fonction manipule souvent des donnees passives. En objet, on essaie de rapprocher les donnees et les comportements qui garantissent leur coherence.

Dans le projet cinema, `Movie`, `Screening`, `Room`, `Seat` et `Reservation` ne sont pas seulement des tables. Ce sont des objets qui protegent des regles.

## Point important

Une classe ne doit pas forcement representer un objet physique. Une regle tarifaire, une periode de reservation ou une strategie de paiement peuvent aussi devenir des objets.
