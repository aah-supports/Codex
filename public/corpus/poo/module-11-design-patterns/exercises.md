---
id: poo.module-11.exercises
title: Exercices
---

# TP

Implémenter au minimum :

- Strategy pour le calcul du prix ;
- Adapter pour un prestataire de paiement ;
- Observer pour une notification ;
- State pour le cycle de vie d'une réservation.

# Exercice autonome

Pour chaque pattern utilisé, écrire :

- le problème initial ;
- la solution apportée ;
- le coût ajoute ;
- pourquoi une solution plus simple ne suffit pas.

# Atelier progressif

## Niveau 1

Associer le problème au pattern :

- plusieurs politiques de prix ;
- integration d'un prestataire de paiement ;
- plusieurs réactions après confirmation ;
- réservation avec états `PENDING`, `CONFIRMED`, `CANCELLED`, `REFUNDED`.

## Niveau 2

Implémenter Strategy pour les tarifs sans toucher à `Reservation`.

## Niveau 3

Implémenter State pour empêcher :

- confirmer une réservation annulée ;
- annuler une réservation remboursée ;
- rembourser une réservation non confirmée.

## Niveau 4

Presenter un pattern refusé. Expliquer pourquoi une solution plus simple est meilleure dans ce cas.

## Critère de réussite

Le pattern doit supprimer une tension visible. S'il ne fait qu'ajouter des noms abstraits, il est probablement inutile.
