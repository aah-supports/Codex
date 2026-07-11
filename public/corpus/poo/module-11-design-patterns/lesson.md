---
id: poo.module-11.lesson
title: Design patterns utiles
tags:
  - def
  - important
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

## Approfondissement théorique : les patterns comme solutions nommées

Un design pattern est une solution récurrente à un problème récurrent dans un contexte donné. Cette définition est importante : le pattern n'est pas seulement une structure de classes. Il relie un problème, des forces en tension, une solution et des conséquences.

Strategy répond à la variation d'un algorithme. Dans le projet cinéma, plusieurs politiques de prix peuvent coexister. Le pattern permet de rendre ces politiques interchangeables. Adapter répond à l'incompatibilité entre un contrat attendu et une API fournie. Observer permet de réagir à un événement sans coupler l'émetteur à tous les effets secondaires. State permet de déplacer le comportement qui dépend fortement de l'état courant.

La valeur d'un pattern est aussi pédagogique. Il donne un vocabulaire commun. Dire que le paiement externe est branché par un Adapter ou que les tarifs utilisent Strategy permet de communiquer rapidement une intention de conception.

Mais un pattern a un coût. Il ajoute des types, des indirections et parfois de la complexité. Utiliser un pattern sans tension réelle produit un code cérémoniel. Le bon usage consiste à attendre que le besoin soit visible : plusieurs variations, une frontière externe, plusieurs réactions à un événement, un cycle d'état complexe.

Un pattern doit rester subordonné au domaine. Les noms des classes doivent continuer à parler de réservation, prix, paiement ou notification. Si les noms techniques écrasent le vocabulaire métier, le pattern devient un obstacle.

### Analyse attendue

- Quel problème récurrent est présent ?
- Quel pattern répond précisément à cette tension ?
- Quelles conséquences positives et négatives introduit-il ?
