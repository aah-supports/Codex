---
id: poo.module-11.lesson
title: Design patterns utiles
tags:
  - design-patterns
  - strategy
  - adapter
  - observer
  - state
---

# Design patterns utiles

Un pattern n'est pas une decoration. C'est une reponse connue a une tension recurrente.

Le bon ordre pedagogique est :

1. rencontrer le probleme ;
2. sentir le cout du code actuel ;
3. introduire le pattern ;
4. evaluer le cout du pattern.

## Patterns du projet cinema

- Strategy : politiques de prix, paiement, annulation ;
- Adapter : prestataire de paiement externe ;
- Observer : notification apres reservation ;
- State : cycle de vie d'une reservation ;
- Factory Method : creation controlee quand elle devient complexe ;
- Command : action executable ou annulable.

Eviter d'ajouter une factory, trois interfaces et quatre classes pour construire un objet simple.

## Pattern ou simple objet ?

Avant d'utiliser un pattern, poser trois questions :

1. quel probleme concret est en train d'apparaitre ?
2. quel changement futur devient difficile ?
3. quel cout le pattern ajoute-t-il ?

Un pattern ajoute souvent des classes, des interfaces et une indirection. Ce cout est acceptable s'il rend un changement important plus simple.

## Progression par problemes

Strategy apparait quand une condition choisit entre plusieurs algorithmes.

Adapter apparait quand une API externe ne correspond pas au contrat du domaine.

Observer apparait quand plusieurs reactions doivent suivre un evenement sans coupler l'emetteur a tous les recepteurs.

State apparait quand les transitions d'un objet dependent fortement de son etat courant.

## Anti-pattern pedagogique

Ne pas demander de memoriser 23 patterns d'un coup. Un etudiant progresse quand il reconnait la tension :

- "cette condition grossit" ;
- "cette API externe fuit partout" ;
- "cette classe notifie trop de choses" ;
- "ce status string produit des transitions invalides".
