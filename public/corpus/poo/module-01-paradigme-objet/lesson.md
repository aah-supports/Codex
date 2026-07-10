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

Ce module suit une progression volontairement simple, inspiree des approches pratiques type MOOC d'Helsinki et Head First Java : partir d'un petit exemple, observer le probleme, puis introduire le vocabulaire.

## Objectifs

A la fin du module, tu dois pouvoir :

- distinguer code procedural et code objet ;
- expliquer etat, comportement et identite ;
- identifier des objets dans un domaine ;
- formuler une responsabilite sans commencer par les attributs ;
- eviter le piege de la classe qui n'est qu'une structure de donnees.

Un objet combine trois dimensions :

- un etat ;
- un comportement ;
- une identite.

La bonne question n'est pas seulement "quelles donnees faut-il stocker ?", mais "quel objet doit etre responsable de cette decision ?".

## Procedural vs objet

En procedural, une fonction manipule souvent des donnees passives. En objet, on essaie de rapprocher les donnees et les comportements qui garantissent leur coherence.

Dans le projet cinema, `Movie`, `Screening`, `Room`, `Seat` et `Reservation` ne sont pas seulement des tables. Ce sont des objets qui protegent des regles.

## Objet, classe, instance

Une classe est un modele. Une instance est un objet concret cree a partir de cette classe.

`Movie` est une classe. Le film "Alien" programme ce soir est une instance possible de cette classe.

## Message

Dans la vision historique d'Alan Kay, un objet recoit des messages. En Java, appeler une methode comme `reservation.confirm()` revient a demander a l'objet de faire quelque chose.

Cette nuance est importante : on ne veut pas seulement lire les donnees d'un objet pour prendre toutes les decisions ailleurs.

## Point important

Une classe ne doit pas forcement representer un objet physique. Une regle tarifaire, une periode de reservation ou une strategie de paiement peuvent aussi devenir des objets.

## Erreurs frequentes

- creer une classe pour chaque nom trouve dans l'enonce ;
- commencer par les getters et setters ;
- mettre toute la logique dans un service central ;
- croire que "objet" signifie toujours "objet physique".
