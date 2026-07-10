---
id: poo.module-10.lesson
title: Refactoring d'un code existant
tags:
  - refactoring
  - code-smells
  - legacy
---

# Refactoring d'un code existant

Refactorer, ce n'est pas réécrire parce qu'on prefere un autre style. C'est ameliorer la structure interne sans changer le comportement observable.

Le refactoring se fait par petites transformations :

- extraire une méthode ;
- extraire une classe ;
- deplacer une méthode ;
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

Les tests servent de filet de sécurité. Sans test, commencer par caractériser le comportement existant.

## Stratégie en code existant

Quand le code est déjà fragile, ne commence pas par "bien architecturer". Commence par reduire le risque.

1. comprendre le comportement actuel ;
2. écrire un test de caracterisation ;
3. extraire un petit morceau ;
4. relancer les tests ;
5. renommer pour clarifier ;
6. recommencer.

## Exemple de sequence

Pour une méthode `reserve` de 120 lignes :

- extraire `validateSeats` ;
- extraire `calculatePrice` ;
- introduire `PricingPolicy` ;
- extraire `chargePayment` ;
- introduire `PaymentGateway` ;
- extraire `notifyCustomer`.

Chaque etape doit être suffisamment petite pour être comprise en revue.

## Refactoring et design

Le refactoring révèle souvent les objets manquants. Quand plusieurs lignes manipulent toujours les mêmes valeurs ensemble, il manque peut-être un objet.

Exemple : `amount` et `currency` manipules partout signalent souvent un objet `Money`.
