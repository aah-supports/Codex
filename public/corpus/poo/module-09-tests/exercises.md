---
id: poo.module-09.exercises
title: Exercices
---

# TP

Tester :

- une reservation valide ;
- l'impossibilite de reserver un siege deja occupe ;
- une regle tarifaire ;
- l'annulation d'une reservation ;
- la sauvegarde avec un fake repository.

# Exercice autonome

Prendre un test qui verifie trop d'appels internes. Le reecrire pour verifier uniquement le comportement observable.

# Atelier progressif

## Niveau 1

Ecrire trois tests d'invariants :

- `Movie` refuse une duree negative ;
- `Room` refuse une liste vide de sieges ;
- `Reservation` refuse zero siege.

## Niveau 2

Tester une politique tarifaire avec trois cas :

- plein tarif ;
- etudiant ;
- enfant.

Ne pas tester les details internes, seulement le prix retourne.

## Niveau 3

Tester `CreateReservationUseCase` avec fake repository et fake paiement.

Scenarios :

- paiement accepte : reservation sauvegardee ;
- paiement refuse : reservation non sauvegardee ;
- siege deja reserve : exception metier.

## Critere de reussite

Si tu peux refactorer l'interieur de la classe sans casser le test, le test est probablement au bon niveau.
