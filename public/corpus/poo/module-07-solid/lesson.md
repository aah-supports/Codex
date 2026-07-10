---
id: poo.module-07.lesson
title: Principes SOLID
tags:
  - solid
  - srp
  - ocp
  - lsp
  - isp
  - dip
---

# Principes SOLID

SOLID n'est pas une checklist magique. Ce sont des outils de diagnostic pour comprendre pourquoi un code resiste au changement.

## SRP

Une unite de code doit avoir une raison coherente de changer.

## OCP

Un systeme doit pouvoir etre etendu sans modifier excessivement le code stable.

## LSP

Une sous-classe doit pouvoir remplacer sa classe de base sans casser les attentes du programme.

## ISP

Un client ne doit pas dependre de methodes dont il n'a pas besoin.

## DIP

Les regles de haut niveau ne doivent pas dependre directement des details techniques.

Appliquer SOLID mecaniquement peut produire trop d'abstractions. Le but reste de reduire le cout du changement.
