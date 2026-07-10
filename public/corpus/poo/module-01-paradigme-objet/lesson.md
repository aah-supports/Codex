---
id: poo.module-01.lesson
title: Comprendre le paradigme objet
tags:
  - poo
  - objet
  - responsabilité
---

# Comprendre le paradigme objet

La Programmation orientée objet ne consiste pas seulement à ranger du code dans des classes. Le point central est de répartir correctement les responsabilités.

Ce module suit une progression volontairement simple, inspirée des approches pratiques type MOOC d'Helsinki et Head First Java : partir d'un petit exemple, observer le problème, puis introduire le vocabulaire.

## Objectifs

À la fin du module, tu dois pouvoir :

- distinguer code procédural et code objet ;
- expliquer état, comportement et identité ;
- identifier des objets dans un domaine ;
- formuler une responsabilité sans commencer par les attributs ;
- éviter le piège de la classe qui n'est qu'une structure de données.

Un objet combine trois dimensions :

- un état ;
- un comportement ;
- une identité.

La bonne question n'est pas seulement "quelles données faut-il stocker ?", mais "quel objet doit être responsable de cette décision ?".

## Procédural vs objet

En procédural, une fonction manipule souvent des données passives. En objet, on essaie de rapprocher les données et les comportements qui garantissent leur cohérence.

Dans le projet cinéma, `Movie`, `Screening`, `Room`, `Seat` et `Reservation` ne sont pas seulement des tables. Ce sont des objets qui protègent des règles.

## Objet, classe, instance

Une classe est un modèle. Une instance est un objet concret créé à partir de cette classe.

`Movie` est une classe. Le film "Alien" programme ce soir est une instance possible de cette classe.

## Message

Dans la vision historique d'Alan Kay, un objet reçoit des messages. En Java, appeler une méthode comme `reservation.confirm()` revient à demander à l'objet de faire quelque chose.

Cette nuance est importante : on ne veut pas seulement lire les données d'un objet pour prendre toutes les décisions ailleurs.

## Point important

Une classe ne doit pas forcément représenter un objet physique. Une règle tarifaire, une période de réservation ou une stratégie de paiement peuvent aussi devenir des objets.

## Erreurs frequentes

- créer une classe pour chaque nom trouvé dans l'énoncé ;
- commencer par les getters et setters ;
- mettre toute la logique dans un service central ;
- croire que "objet" signifie toujours "objet physique".

## Progression mentale

Pour apprendre la POO, il faut accepter de ralentir au début. Le réflexe naturel est souvent d'écrire une fonction qui prend toutes les données, puis de multiplier les conditions. La progression attendue est différente :

1. décrire le domaine avec des mots simples ;
2. repérer les choses qui ont une identité stable ;
3. repérer les règles qui doivent rester vraies ;
4. attribuer chaque règle à l'objet qui à le plus de légitimité ;
5. faire collaborer les objets au lieu de concentrer toutes les décisions.

Dans le projet cinéma, "réserver une place" semble être une action simple. Pourtant cette action implique un client, une séance, une salle, des sièges, une politique tarifaire et un paiement. Le but de la POO est de répartir cette complexité pour que chaque objet reste compréhensible.

## Exemple d'analyse de domaine

Phrase de depart :

> Un client réserve deux sièges pour une séance du film Alien dans la salle 3.

Objets candidats :

- `Customer` : identifie la personne qui réserve ;
- `Movie` : porte le titre, la durée, la classification ;
- `Room` : porte le nom de la salle et ses sièges ;
- `Seat` : représente une place précise ;
- `Screening` : associe un film, une salle et un horaire ;
- `Reservation` : représente l'engagement de garder des sièges pour un client.

Responsabilités possibles :

- `Screening` sait si elle chevauche une autre séance ;
- `Reservation` sait combien de sièges elle contient ;
- `Room` sait quels sièges existent ;
- `PricingPolicy` sait calculer un prix.

La POO commence quand on justifie ces choix, pas quand on ecrit `class`.

## Critère de compréhension

Tu as compris ce module si tu peux expliquer pourquoi `Reservation` n'est pas juste une ligne dans une table, mais un objet qui porte une partie du sens métier.
