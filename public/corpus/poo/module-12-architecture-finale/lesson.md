---
id: poo.module-12.lesson
title: Modèle métier et architecture finale
tags:
  - def
  - important
---

# Modèle métier et architecture finale

Le but final n'est pas d'avoir beaucoup de classes. Le but est de pouvoir faire évoluer le logiciel sans propager les changements partout.

Une organisation possible :

```text
src/
├── domain/
│   ├── model/
│   ├── pricing/
│   ├── repository/
│   └── exception/
├── application/
│   ├── create_reservation/
│   ├── cancel_reservation/
│   └── list_screenings/
├── infrastructure/
│   ├── persistence/
│   ├── payment/
│   └── notification/
└── presentation/
    └── controller/
```

## Domaine

Le domaine contient les règles métier : réservation, tarification, cycle de vie, invariants.

## Application

L'application orchestre les cas d'utilisation : créer une réservation, annuler, lister les séances.

## Infrastructure

L'infrastructure contient les détails : base de données, paiement externe, email.

## Presentation

La présentation adapte les entrees et sorties : API, contrôleur, interface.

```uml
┌──────────────────────┐
│       domain         │
│  model / pricing     │
└──────────────────────┘
           ▲
           │ dépendance autorisée
┌──────────────────────┐
│    application       │
│  use cases / ports   │
└──────────────────────┘
           ▲
           │
┌──────────────────────┐      ┌──────────────────────┐
│   infrastructure    │──────▶│    presentation      │
│ db / payment / mail │      │   http / ui / api    │
└──────────────────────┘      └──────────────────────┘
```

Le schéma reste volontairement simple : le domaine au centre, l'application qui orchestre, et les détails techniques autour.

## Construire l'architecture progressivement

Ne pas commencer le projet avec tous les dossiers parfaits. La progression recommandee :

1. créer un modèle domaine simple ;
2. écrire les invariants ;
3. ajouter les cas d'utilisation ;
4. introduire les ports nécessaires ;
5. brancher l'infrastructure ;
6. refactorer les frontières quand la douleur apparaît.

L'architecture est une conséquence des responsabilités, pas un décor.

## Frontières

Une frontière se justifie quand deux parties changent pour des raisons différentes.

Exemples :

- les règles de réservation changent avec le métier ;
- la base de données change avec l'infrastructure ;
- l'API HTTP change avec la presentation ;
- le prestataire de paiement change avec un contrat externe.

Chaque frontière doit réduire le coût d'un changement probable.

Cette logique rejoint fortement l'approche DDD et Clean Architecture : on organise le code autour des raisons de changer, pas autour des outils. Le domaine conserve son vocabulaire propre, l'application orchestre les cas d'utilisation, et l'infrastructure reste remplaçable. L'intérêt intellectuel de cette séparation n'est pas esthétique. Il est de rendre visibles les dépendances de sens.

En pratique, cette manière de construire le système oblige à poser de vraies questions : quelle règle métier doit rester stable, quel détail technique est provisoire, et quel compromis vaut la peine d'être accepté maintenant ? C'est ce niveau d'argumentation qu'on attend à la fin du parcours.

## Defense des choix

En soutenance, il ne suffit pas de dire "j'ai utilisé Clean Architecture". Il faut expliquer :

- quelle règle métier est protégée ;
- quel détail technique est isolé ;
- quel test prouve le comportement ;
- quel compromis à été accepté.

## Definition de fini

Le projet est fini si un autre développeur peut :

- lire le domaine sans connaître la base de données ;
- comprendre les cas d'utilisation ;
- lancer les tests ;
- remplacer un adaptateur ;
- justifier les patterns presents.

## Approfondissement théorique : architecture, dépendances et stabilité

L'architecture logicielle organise les dépendances en fonction des raisons de changer. Le domaine change avec les règles métier. L'infrastructure change avec les outils techniques. L'interface change avec les usages. Quand ces dimensions sont mélangées, chaque évolution devient plus risquée.

Dans une architecture orientée domaine, les règles métier restent au centre. Les entités, objets-valeurs et politiques du domaine ne dépendent pas du framework web, de la base de données ou du fournisseur de paiement. La couche application orchestre les cas d'utilisation. L'infrastructure fournit les adaptateurs concrets.

Cette organisation peut être comprise comme une gestion de la stabilité. Les règles métier importantes doivent être protégées des détails volatils. Un changement de base de données ne devrait pas modifier Booking. Un changement de prestataire de paiement ne devrait pas modifier la règle qui dit quand une réservation peut être confirmée.

Les ports jouent un rôle essentiel. Ils expriment les besoins de l'application envers le monde extérieur : sauvegarder une réservation, facturer un paiement, envoyer une notification. Les adaptateurs réalisent ces besoins avec des outils concrets. Cette structure rend les tests plus simples et les remplacements techniques moins coûteux.

Il faut toutefois rester proportionné. Une architecture trop complexe pour un petit projet devient un poids. L'objectif n'est pas de multiplier les couches, mais de placer les frontières là où les raisons de changer sont réellement différentes.

### Soutenance et justification

- Quelle règle métier est protégée dans le domaine ?
- Quelle dépendance technique est isolée par un port ?
- Quel compromis as-tu accepté pour garder le projet lisible ?
