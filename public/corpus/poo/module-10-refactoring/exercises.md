---
id: poo.module-10.exercises
title: Exercices
---

# Exercice guidé

Identifier les smells dans une méthode qui :

1. vérifie la disponibilité ;
2. calcule le tarif ;
3. enregistre ;
4. débite ;
5. envoie un email ;
6. imprime le billet.

# TP

Refactorer en trois petites étapes maximum par commit :

- extraire les validations ;
- extraire la tarification ;
- introduire un repository ;
- introduire un service de notification.

Après chaque étape, les tests doivent rester verts.

# Atelier progressif

## Niveau 1

Identifier le smell principal :

- méthode de 80 lignes ;
- classe qui connaît SQL et SMTP ;
- `String status` comparé partout ;
- `double amount` et `String currency` passés ensemble ;
- cinq `if` pour les types de clients.

## Niveau 2

Choisir le refactoring adapté :

- Extract Method ;
- Extract Class ;
- Replace Primitive with Object ;
- Replace Conditional with Polymorphism ;
- Introduce Parameter Object.

## Niveau 3

Faire un plan de refactoring en 5 commits maximum. Chaque commit doit avoir un objectif vérifiable.

## Critère de réussite

Le comportement observable reste identique, mais le prochain changement devient plus local.
