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
