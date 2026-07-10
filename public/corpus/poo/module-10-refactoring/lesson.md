---
id: poo.module-10.lesson
title: Refactoring d'un code existant
tags:
  - refactoring
  - code-smells
  - legacy
---

# Refactoring d'un code existant

Refactorer, ce n'est pas reecrire parce qu'on prefere un autre style. C'est ameliorer la structure interne sans changer le comportement observable.

Le refactoring se fait par petites transformations :

- extraire une methode ;
- extraire une classe ;
- deplacer une methode ;
- remplacer une primitive par un objet ;
- remplacer une condition par du polymorphisme ;
- encapsuler une collection.

## Code smells

Un code smell n'est pas une preuve de bug. C'est un signal qui merite une analyse.

Exemples :

- Long Method ;
- Large Class ;
- Duplicate Code ;
- Feature Envy ;
- Primitive Obsession ;
- Switch Statements ;
- Message Chains.

Les tests servent de filet de securite. Sans test, commencer par caracteriser le comportement existant.
