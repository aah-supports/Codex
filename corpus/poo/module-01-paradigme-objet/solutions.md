---
id: poo.module-01.solutions
title: Corrections guidées
tags:
  - important
---

# Corrections guidées

## Correction de l’exercice principal

Problème travaillé : Un script de réservation mélange les données, les règles et l’affichage. On ne sait plus où placer une nouvelle règle métier.

La règle à retenir est la suivante : Commence par nommer les responsabilités avant de créer les classes. Une classe n’est utile que si elle porte une décision ou une action stable.

La correction consiste à faire apparaître le vocabulaire du domaine. `Movie` porte le titre et la durée. `Screening` porte l’horaire et les places disponibles. `Booking` porte la décision de confirmer ou refuser une réservation.

## Raisonnement pas à pas

1. Reformule la règle métier avec des mots simples.
2. Identifie l’objet qui possède les données nécessaires pour appliquer cette règle.
3. Place la vérification ou la décision dans cet objet, pas dans tous les appelants.
4. Relis l’appel public : il doit raconter une intention métier, pas une manipulation technique.

## Correction type

```java
public final class Booking {
    private final Screening screening;
    private final int requestedSeats;

    public Booking(Screening screening, int requestedSeats) {
        if (requestedSeats <= 0) {
            throw new IllegalArgumentException("Le nombre de places doit être positif");
        }
        this.screening = screening;
        this.requestedSeats = requestedSeats;
    }

    public boolean canBeConfirmed() {
        return screening.hasAvailableSeats(requestedSeats);
    }
}
```

Cette correction montre le résultat attendu : un nom métier, une règle localisée et un appelant qui n’a pas besoin de connaître les détails internes.

## Erreur fréquente

Créer une classe `BookingData` avec uniquement des getters déplace le problème sans créer de modèle objet.

## Auto-évaluation

- Peux-tu expliquer pourquoi chaque classe existe ?
- Peux-tu citer la règle protégée par l’objet ?
- Peux-tu changer une règle sans modifier toute l’application ?
- Ton code reste-t-il compréhensible sans commentaire long ?
