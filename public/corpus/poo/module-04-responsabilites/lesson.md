---
id: poo.module-04.lesson
title: Responsabilites, cohesion et couplage
tags:
  - responsabilite
  - cohesion
  - couplage
---

# Responsabilites, cohesion et couplage

Une bonne classe n'est pas une classe courte par principe. C'est une classe dont les responsabilites sont coherentes.

La cohesion mesure si les elements d'une classe travaillent vers une meme intention. Le couplage mesure a quel point une classe depend des details des autres.

## Diagnostic simple

Demander :

- quelle est la raison de changer de cette classe ?
- quel objet possede deja les informations necessaires ?
- cette classe orchestre-t-elle tout le systeme ?
- ce comportement appartient-il au domaine ou a l'infrastructure ?

## Information Expert

Le principe GRASP Information Expert propose d'attribuer une responsabilite a l'objet qui possede l'information necessaire pour la realiser.

Ce n'est pas une loi mecanique. Il faut aussi regarder la cohesion, la testabilite et le niveau d'abstraction.
