---
id: poo.module-09.lesson
title: Tests unitaires orientes objet
tags:
  - tests
  - comportement
  - doubles
---

# Tests unitaires orientes objet

Tester un objet ne signifie pas verifier chaque ligne interne. Un bon test verifie un comportement observable.

## Etat ou interaction

Un test d'etat verifie le resultat apres l'action. Un test d'interaction verifie qu'une collaboration a eu lieu.

Il faut eviter les tests trop lies a l'implementation. Sinon, chaque refactoring casse les tests alors que le comportement n'a pas change.

## Doubles de test

- fake : implementation simple mais fonctionnelle ;
- stub : reponse controlee ;
- mock : verification d'interaction ;
- dummy : objet passe uniquement pour remplir une signature.

Utiliser les mocks avec mesure. Trop de mocks peuvent figer la conception.
