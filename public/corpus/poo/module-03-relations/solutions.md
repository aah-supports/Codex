---
id: poo.module-03.solutions
title: Corrections guidées
tags:
  - correction
  - a-retenir
  - association
  - composition
  - couplage
summaryTags:
  - correction
---

# Corrections guidées

## Correction de l’exercice principal

Problème travaillé : Le modèle relie tout à tout : un client connaît la salle, les sièges, le paiement et les notifications. Chaque changement casse plusieurs classes.

La règle à retenir est la suivante : Une relation doit avoir une raison métier. Composition si la partie vit avec le tout, association si deux objets collaborent durablement, dépendance si l’objet est seulement utilisé ponctuellement.

`Screening` peut composer ses sièges, car ils n’ont pas de sens sans la séance. `Booking` associe un client et une séance. Une notification reste une dépendance utilisée après confirmation.

## Raisonnement pas à pas

1. Reformule la règle métier avec des mots simples.
2. Identifie l’objet qui possède les données nécessaires pour appliquer cette règle.
3. Place la vérification ou la décision dans cet objet, pas dans tous les appelants.
4. Relis l’appel public : il doit raconter une intention métier, pas une manipulation technique.

## Correction type

```java
public final class Screening {
    private final List<Seat> seats;

    public Screening(int capacity) {
        this.seats = IntStream.rangeClosed(1, capacity)
            .mapToObj(Seat::new)
            .toList();
    }

    public Seat seat(int number) {
        return seats.get(number - 1);
    }
}
```

Cette correction montre le résultat attendu : un nom métier, une règle localisée et un appelant qui n’a pas besoin de connaître les détails internes.

## Erreur fréquente

Multiplier les références bidirectionnelles rend le graphe d’objets difficile à comprendre et augmente le couplage.

## Auto-évaluation

- Peux-tu expliquer pourquoi chaque classe existe ?
- Peux-tu citer la règle protégée par l’objet ?
- Peux-tu changer une règle sans modifier toute l’application ?
- Ton code reste-t-il compréhensible sans commentaire long ?
