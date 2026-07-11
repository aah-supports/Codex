---
id: poo.module-09.exercises
title: Exercices
---

# TP

Tester :

- une réservation valide ;
- l'impossibilité de réserver un siège déjà occupé ;
- une règle tarifaire ;
- l'annulation d'une réservation ;
- la sauvegarde avec un fake repository.

# Exercice autonome

Prendre un test qui vérifie trop d'appels internes. Le réécrire pour vérifier uniquement le comportement observable.

# Atelier progressif

## Niveau 1

Écrire trois tests d'invariants :

- `Movie` refusé une durée négative ;
- `Room` refusé une liste vide de sièges ;
- `Reservation` refusé zéro siège.

## Niveau 2

Tester une politique tarifaire avec trois cas :

- plein tarif ;
- étudiant ;
- enfant.

Ne pas tester les détails internes, seulement le prix retourne.

## Niveau 3

Tester `CreateReservationUseCase` avec fake repository et fake paiement.

Scénarios :

- paiement accepté : réservation sauvegardée ;
- paiement refusé : réservation non sauvegardée ;
- siège déjà réservé : exception métier.

## Critère de réussite

Si tu peux refactorer l'intérieur de la classe sans casser le test, le test est probablement au bon niveau.
