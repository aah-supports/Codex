---
id: poo.module-05.exercises
title: Exercices
---

# TP

Implementer plusieurs politiques :

- tarif standard ;
- tarif etudiant ;
- tarif enfant ;
- majoration pour une seance 3D ;
- reduction le mercredi.

# Refactoring

Partir d'une longue chaine de conditions et remplacer les cas par des implementations de `PricingPolicy`.

# Atelier progressif

## Niveau 1

Pour chaque relation, dire si l'heritage est plausible :

- `StudentPricing` est un `PricingPolicy` ;
- `Room` est un `Seat` ;
- `ThreeDScreening` est un `Screening` ;
- `EmailNotification` est un `NotificationService` ;
- `DiscountedPricing` est un `StandardPricing`.

Justifier avec la substitution.

## Niveau 2

Transformer ce code :

```java
if (type.equals("STUDENT")) { return 8.0; }
if (type.equals("CHILD")) { return 6.0; }
return 12.0;
```

en trois classes qui implementent `PricingPolicy`.

## Niveau 3

Ajouter une majoration 3D sans modifier les classes de tarif existantes. Utiliser la composition.

## Critere de reussite

Le code doit permettre d'ajouter un nouveau tarif sans modifier la methode centrale de calcul.
