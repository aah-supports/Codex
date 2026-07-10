---
id: poo.module-12.lesson
title: Modele metier et architecture finale
tags:
  - architecture
  - domaine
  - infrastructure
---

# Modele metier et architecture finale

Le but final n'est pas d'avoir beaucoup de classes. Le but est de pouvoir faire evoluer le logiciel sans propager les changements partout.

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

Le domaine contient les regles metier : reservation, tarification, cycle de vie, invariants.

## Application

L'application orchestre les cas d'utilisation : creer une reservation, annuler, lister les seances.

## Infrastructure

L'infrastructure contient les details : base de donnees, paiement externe, email.

## Presentation

La presentation adapte les entrees et sorties : API, controleur, interface.

## Construire l'architecture progressivement

Ne pas commencer le projet avec tous les dossiers parfaits. La progression recommandee :

1. creer un modele domaine simple ;
2. ecrire les invariants ;
3. ajouter les cas d'utilisation ;
4. introduire les ports necessaires ;
5. brancher l'infrastructure ;
6. refactorer les frontieres quand la douleur apparait.

L'architecture est une consequence des responsabilites, pas un decor.

## Frontieres

Une frontiere se justifie quand deux parties changent pour des raisons differentes.

Exemples :

- les regles de reservation changent avec le metier ;
- la base de donnees change avec l'infrastructure ;
- l'API HTTP change avec la presentation ;
- le prestataire de paiement change avec un contrat externe.

Chaque frontiere doit reduire le cout d'un changement probable.

## Defense des choix

En soutenance, il ne suffit pas de dire "j'ai utilise Clean Architecture". Il faut expliquer :

- quelle regle metier est protegee ;
- quel detail technique est isole ;
- quel test prouve le comportement ;
- quel compromis a ete accepte.

## Definition de fini

Le projet est fini si un autre developpeur peut :

- lire le domaine sans connaitre la base de donnees ;
- comprendre les cas d'utilisation ;
- lancer les tests ;
- remplacer un adaptateur ;
- justifier les patterns presents.
