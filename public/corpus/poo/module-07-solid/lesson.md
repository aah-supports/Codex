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

## Lecture progressive

SOLID devient utile quand on a deja vu du code souffrir.

Avant d'appliquer un principe, formuler la douleur :

- "chaque nouveau tarif modifie cette methode" ;
- "cette classe change pour trop de raisons" ;
- "cette sous-classe ne respecte pas le comportement attendu" ;
- "cette interface force des methodes inutiles" ;
- "le domaine depend d'une base de donnees".

Le principe vient ensuite nommer le probleme.

## Exemple de mauvais usage

Il est possible de respecter SOLID en apparence et de produire un code illisible :

```text
MovieServiceInterface
MovieServiceImpl
MovieManager
MovieHandler
MovieProcessor
```

Si ces noms ne portent pas des responsabilites claires, l'abstraction est du bruit.

## Questions d'auto-diagnostic

- SRP : quelle est la raison de changer ?
- OCP : quel changement futur est couteux aujourd'hui ?
- LSP : le code client peut-il remplacer la classe mere par la sous-classe ?
- ISP : qui utilise vraiment cette methode ?
- DIP : le code important depend-il d'un detail instable ?
