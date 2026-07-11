---
id: poo.module-10.exercises
title: Exercices
---

# Exercice guide

Identifier les smells dans une méthode qui :

1. vérifie la disponibilité ;
2. calcule le tarif ;
3. enregistre ;
4. debite ;
5. envoie un email ;
6. imprime le billet.

# TP

Refactorer en trois petites etapes maximum par commit :

- extraire les validations ;
- extraire la tarification ;
- introduire un repository ;
- introduire un service de notification.

Après chaque etape, les tests doivent rester verts.

# Atelier progressif

## Niveau 1

Identifier le smell principal :

- méthode de 80 lignes ;
- classe qui connaît SQL et SMTP ;
- `String status` compare partout ;
- `double amount` et `String currency` passes ensemble ;
- cinq `if` pour les types de clients.

## Niveau 2

Choisir le refactoring adapté :

- Extract Method ;
- Extract Class ;
- Replace Primitive with Object ;
- Replace Conditional with Polymorphism ;
- Introduce Paramétér Object.

## Niveau 3

Faire un plan de refactoring en 5 commits maximum. Chaque commit doit avoir un objectif vérifiable.

## Critère de réussite

Le comportement observable reste identique, mais le prochain changement devient plus local.
