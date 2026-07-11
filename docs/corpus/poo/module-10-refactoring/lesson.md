---
id: poo.module-10.lesson
title: Refactoring d'un code existant
tags:
  - def
  - important
---

# Refactoring d'un code existant

Refactorer, ce n'est pas réécrire parce qu'on préfère un autre style. C'est améliorer la structure interne sans changer le comportement observable.

Le refactoring se fait par petites transformations :

- extraire une méthode ;
- extraire une classe ;
- deplacer une méthode ;
- remplacer une primitive par un objet ;
- remplacer une condition par du polymorphisme ;
- encapsuler une collection.

## Code smells

Un code smell n'est pas une preuve de bug. C'est un signal qui mérite une analyse.

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

Quand le code est déjà fragile, ne commence pas par "bien architecturer". Commence par réduire le risque.

1. comprendre le comportement actuel ;
2. écrire un test de caracterisation ;
3. extraire un petit morceau ;
4. relancer les tests ;
5. renommer pour clarifier ;
6. recommencer.

## Exemple de séquence

Pour une méthode `reserve` de 120 lignes :

- extraire `validateSeats` ;
- extraire `calculatePrice` ;
- introduire `PricingPolicy` ;
- extraire `chargePayment` ;
- introduire `PaymentGateway` ;
- extraire `notifyCustomer`.

Chaque étape doit être suffisamment petite pour être comprise en revue.

## Refactoring et design

Le refactoring révèle souvent les objets manquants. Quand plusieurs lignes manipulent toujours les mêmes valeurs ensemble, il manque peut-être un objet.

Exemple : `amount` et `currency` manipulés partout signalent souvent un objet `Money`.

## Approfondissement théorique : transformer sans changer le sens

Le refactoring est une discipline de transformation contrôlée. Sa définition stricte est importante : modifier la structure interne du code sans changer son comportement observable. Cette idée permet de séparer deux activités différentes : améliorer le design et ajouter une fonctionnalité.

Sur un code existant, la première difficulté est l'incertitude. On ne sait pas toujours quelles règles sont volontaires et quelles règles sont accidentelles. Les tests de caractérisation servent alors à capturer le comportement actuel. Ils ne disent pas que ce comportement est idéal, mais ils empêchent de le modifier sans s'en rendre compte.

Les code smells sont des indices de conception. Une méthode longue peut révéler plusieurs responsabilités. Une liste de paramètres peut révéler un objet manquant. Une duplication peut révéler une règle non nommée. Une chaîne de conditions peut révéler une variation qui mérite du polymorphisme. Chaque smell doit être relié à une douleur concrète.

Le refactoring efficace avance par petites étapes : extraire une méthode, renommer, déplacer une méthode, introduire un objet-valeur, remplacer une condition par une stratégie. Après chaque étape, les tests doivent confirmer que le comportement reste stable. Cette granularité réduit le risque et facilite la revue.

Dans une optique universitaire, il faut savoir expliquer pourquoi une transformation améliore la conception. On ne refactore pas pour obtenir un code plus joli, mais pour rendre une règle plus locale, une responsabilité plus claire ou une évolution future moins coûteuse.

### Discipline pratique

- Un objectif par étape.
- Un comportement observable conservé.
- Une justification de conception après la transformation.
