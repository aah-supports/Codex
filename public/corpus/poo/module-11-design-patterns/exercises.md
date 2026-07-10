---
id: poo.module-11.exercises
title: Exercices
---

# TP

Implementer au minimum :

- Strategy pour le calcul du prix ;
- Adapter pour un prestataire de paiement ;
- Observer pour une notification ;
- State pour le cycle de vie d'une reservation.

# Exercice autonome

Pour chaque pattern utilise, ecrire :

- le probleme initial ;
- la solution apportee ;
- le cout ajoute ;
- pourquoi une solution plus simple ne suffit pas.

# Atelier progressif

## Niveau 1

Associer le probleme au pattern :

- plusieurs politiques de prix ;
- integration d'un prestataire de paiement ;
- plusieurs reactions apres confirmation ;
- reservation avec etats `PENDING`, `CONFIRMED`, `CANCELLED`, `REFUNDED`.

## Niveau 2

Implementer Strategy pour les tarifs sans toucher a `Reservation`.

## Niveau 3

Implementer State pour empecher :

- confirmer une reservation annulee ;
- annuler une reservation remboursee ;
- rembourser une reservation non confirmee.

## Niveau 4

Presenter un pattern refuse. Expliquer pourquoi une solution plus simple est meilleure dans ce cas.

## Critere de reussite

Le pattern doit supprimer une tension visible. S'il ne fait qu'ajouter des noms abstraits, il est probablement inutile.
