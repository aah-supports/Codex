---
id: poo.module-12.lesson
title: Modèle métier et architecture finale
tags:
  - architecture
  - domaine
  - infrastructure
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

## Construire l'architecture progressivement

Ne pas commencer le projet avec tous les dossiers parfaits. La progression recommandee :

1. créer un modèle domaine simple ;
2. écrire les invariants ;
3. ajouter les cas d'utilisation ;
4. introduire les ports nécessaires ;
5. brancher l'infrastructure ;
6. refactorer les frontières quand la douleur apparaît.

L'architecture est une consequence des responsabilités, pas un decor.

## Frontieres

Une frontière se justifie quand deux parties changent pour des raisons différentes.

Exemples :

- les règles de réservation changent avec le métier ;
- la base de données change avec l'infrastructure ;
- l'API HTTP change avec la presentation ;
- le prestataire de paiement change avec un contrat externe.

Chaque frontière doit réduire le coût d'un changement probable.

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
