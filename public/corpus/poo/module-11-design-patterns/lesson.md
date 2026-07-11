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

Un pattern n'est pas une décoration. C'est une réponse connue à une tension récurrente.

Le bon ordre pédagogique est :

1. rencontrer le problème ;
2. sentir le coût du code actuel ;
3. introduire le pattern ;
4. évaluer le coût du pattern.

## Patterns du projet cinéma

- Strategy : politiques de prix, paiement, annulation ;
- Adapter : prestataire de paiement externe ;
- Observer : notification après réservation ;
- State : cycle de vie d'une réservation ;
- Factory Method : création contrôlée quand elle devient complexe ;
- Command : action exécutable ou annulable.

Éviter d'ajouter une factory, trois interfaces et quatre classes pour construire un objet simple.

## Pattern ou simple objet ?

Avant d'utiliser un pattern, poser trois questions :

1. quel problème concret est en train d'apparaître ?
2. quel changement futur devient difficile ?
3. quel coût le pattern ajoute-t-il ?

Un pattern ajoute souvent des classes, des interfaces et une indirection. Ce coût est acceptable s'il rend un changement important plus simple.

## Progression par problèmes

Strategy apparaît quand une condition choisit entre plusieurs algorithmes.

Adapter apparaît quand une API externe ne correspond pas au contrat du domaine.

Observer apparaît quand plusieurs réactions doivent suivre un événement sans coupler l'émetteur à tous les récepteurs.

State apparaît quand les transitions d'un objet dépendent fortement de son état courant.

## Anti-pattern pédagogique

Ne pas demander de memoriser 23 patterns d'un coup. Un étudiant progresse quand il reconnaît la tension :

- "cette condition grossit" ;
- "cette API externe fuit partout" ;
- "cette classe notifie trop de choses" ;
- "ce status string produit des transitions invalides".
