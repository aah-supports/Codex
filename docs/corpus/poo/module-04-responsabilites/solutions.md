---
id: poo.module-04.solutions
title: Corrections guidées
tags:
  - important
---

# Corrections guidées

## Correction de l’exercice principal

Problème travaillé : `BookingService` valide les règles, calcule le prix, réserve les places, envoie les e-mails et écrit en base. La classe devient difficile à tester.

La règle à retenir est la suivante : La cohésion mesure si les éléments d’une classe travaillent pour une même idée. Le couplage mesure combien une classe dépend des détails des autres.

Le service orchestre le cas d’usage, mais il délègue les décisions. `SeatMap` choisit les places, `PricingPolicy` calcule le prix, `Notifier` envoie le message.

## Raisonnement pas à pas

1. Reformule la règle métier avec des mots simples.
2. Identifie l’objet qui possède les données nécessaires pour appliquer cette règle.
3. Place la vérification ou la décision dans cet objet, pas dans tous les appelants.
4. Relis l’appel public : il doit raconter une intention métier, pas une manipulation technique.

## Correction type

```java
public final class BookingService {
    private final PricingPolicy pricingPolicy;
    private final Notifier notifier;

    public Booking confirm(SeatMap seatMap, Customer customer, int quantity) {
        List<Seat> seats = seatMap.reserve(quantity);
        Money price = pricingPolicy.priceFor(seats, customer);
        Booking booking = new Booking(customer, seats, price);
        notifier.bookingConfirmed(booking);
        return booking;
    }
}
```

Cette correction montre le résultat attendu : un nom métier, une règle localisée et un appelant qui n’a pas besoin de connaître les détails internes.

## Erreur fréquente

Un service central qui connaît toutes les règles finit par annuler les bénéfices de la POO.

## Auto-évaluation

- Peux-tu expliquer pourquoi chaque classe existe ?
- Peux-tu citer la règle protégée par l’objet ?
- Peux-tu changer une règle sans modifier toute l’application ?
- Ton code reste-t-il compréhensible sans commentaire long ?
