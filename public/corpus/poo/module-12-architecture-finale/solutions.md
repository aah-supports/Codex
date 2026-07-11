---
id: poo.module-12.solutions
title: Corrections guidées
tags:
  - correction
  - a-retenir
  - architecture
  - domaine
  - port
summaryTags:
  - correction
---

# Corrections guidées

## Correction de l’exercice principal

Problème travaillé : Le modèle métier dépend du framework web, de la base de données et des détails de paiement. Il devient difficile à utiliser hors de l’application.

La règle à retenir est la suivante : Le domaine porte les règles métier. L’application orchestre les cas d’usage. L’infrastructure branche les détails techniques.

`Booking`, `Screening` et `Money` restent dans le domaine. `BookSeatUseCase` orchestre. Les repositories, contrôleurs et adaptateurs de paiement restent en infrastructure.

## Raisonnement pas à pas

1. Reformule la règle métier avec des mots simples.
2. Identifie l’objet qui possède les données nécessaires pour appliquer cette règle.
3. Place la vérification ou la décision dans cet objet, pas dans tous les appelants.
4. Relis l’appel public : il doit raconter une intention métier, pas une manipulation technique.

## Correction type

```java
public final class BookSeatUseCase {
    private final BookingRepository bookings;
    private final PaymentGateway payments;

    public BookingId handle(BookSeatCommand command) {
        Booking booking = Booking.request(command.screeningId(), command.seats());
        payments.charge(booking.price());
        bookings.save(booking);
        return booking.id();
    }
}
```

Cette correction montre le résultat attendu : un nom métier, une règle localisée et un appelant qui n’a pas besoin de connaître les détails internes.

## Erreur fréquente

Une architecture en dossiers ne suffit pas. Les dépendances doivent réellement pointer vers le domaine, pas l’inverse.

## Auto-évaluation

- Peux-tu expliquer pourquoi chaque classe existe ?
- Peux-tu citer la règle protégée par l’objet ?
- Peux-tu changer une règle sans modifier toute l’application ?
- Ton code reste-t-il compréhensible sans commentaire long ?
