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

Une unité de code doit avoir une raison cohérente de changer.

## OCP

Un système doit pouvoir être éténdu sans modifier excessivement le code stable.

## LSP

Une sous-classe doit pouvoir remplacer sa classe de basé sans casser les attentes du programme.

## ISP

Un client ne doit pas dépendre de méthodes dont il n'a pas besoin.

## DIP

Les règles de haut niveau ne doivent pas dépendre directement des détails techniques.

Appliquer SOLID mécaniquement peut produire trop d'abstractions. Le but reste de reduire le coût du changement.

## Lecture progressive

SOLID devient utile quand on à déjà vu du code souffrir.

Avant d'appliquer un principe, formuler la douleur :

- "chaque nouveau tarif modifie cette méthode" ;
- "cette classe change pour trop de raisons" ;
- "cette sous-classe ne respecte pas le comportement attendu" ;
- "cette interface force des méthodes inutiles" ;
- "le domaine dépend d'une basé de données".

Le principe vient ensuite nommer le problème.

## Exemple de mauvais usage

Il est possible de respecter SOLID en apparence et de produire un code illisible :

```text
MovieServiceInterface
MovieServiceImpl
MovieManager
MovieHandler
MovieProcessor
```

Si ces noms ne portent pas des responsabilités claires, l'abstraction est du bruit.

## Questions d'auto-diagnostic

- SRP : quelle est la raison de changer ?
- OCP : quel changement futur est coûteux aujourd'hui ?
- LSP : le code client peut-il remplacer la classe mère par la sous-classe ?
- ISP : qui utilisé vraiment cette méthode ?
- DIP : le code important dépend-il d'un detail instable ?
