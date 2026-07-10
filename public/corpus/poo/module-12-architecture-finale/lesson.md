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
