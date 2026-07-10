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

## Progression mentale

Pour apprendre la POO, il faut accepter de ralentir au debut. Le reflexe naturel est souvent d'ecrire une fonction qui prend toutes les donnees, puis de multiplier les conditions. La progression attendue est differente :

1. decrire le domaine avec des mots simples ;
2. reperer les choses qui ont une identite stable ;
3. reperer les regles qui doivent rester vraies ;
4. attribuer chaque regle a l'objet qui a le plus de legitimite ;
5. faire collaborer les objets au lieu de concentrer toutes les decisions.

Dans le projet cinema, "reserver une place" semble etre une action simple. Pourtant cette action implique un client, une seance, une salle, des sieges, une politique tarifaire et un paiement. Le but de la POO est de repartir cette complexite pour que chaque objet reste comprehensible.

## Exemple d'analyse de domaine

Phrase de depart :

> Un client reserve deux sieges pour une seance du film Alien dans la salle 3.

Objets candidats :

- `Customer` : identifie la personne qui reserve ;
- `Movie` : porte le titre, la duree, la classification ;
- `Room` : porte le nom de la salle et ses sieges ;
- `Seat` : represente une place precise ;
- `Screening` : associe un film, une salle et un horaire ;
- `Reservation` : represente l'engagement de garder des sieges pour un client.

Responsabilites possibles :

- `Screening` sait si elle chevauche une autre seance ;
- `Reservation` sait combien de sieges elle contient ;
- `Room` sait quels sieges existent ;
- `PricingPolicy` sait calculer un prix.

La POO commence quand on justifie ces choix, pas quand on ecrit `class`.

## Critere de comprehension

Tu as compris ce module si tu peux expliquer pourquoi `Reservation` n'est pas juste une ligne dans une table, mais un objet qui porte une partie du sens metier.
