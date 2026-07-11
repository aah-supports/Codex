---
id: poo.module-06.solutions
title: Corrections guidées
tags:
  - correction
  - a-retenir
  - interface
  - contrat
  - dip
summaryTags:
  - correction
---

# Corrections guidées

## Correction de l’exercice principal

Problème travaillé : La réservation appelle directement une API de paiement. Impossible de tester le cas “paiement refusé” sans dépendre du réseau.

La règle à retenir est la suivante : Une interface décrit ce dont le domaine a besoin. L’infrastructure fournit ensuite une implémentation concrète.

Le cas d’usage dépend de `PaymentGateway`. En production, un adaptateur appelle l’API réelle. En test, un faux renvoie un paiement accepté ou refusé.

## Raisonnement pas à pas

1. Reformule la règle métier avec des mots simples.
2. Identifie l’objet qui possède les données nécessaires pour appliquer cette règle.
3. Place la vérification ou la décision dans cet objet, pas dans tous les appelants.
4. Relis l’appel public : il doit raconter une intention métier, pas une manipulation technique.

## Correction type

```java
public interface PaymentGateway {
    PaymentResult charge(Money amount);
}

public final class ConfirmBookingUseCase {
    private final PaymentGateway payments;

    public ConfirmBookingUseCase(PaymentGateway payments) {
        this.payments = payments;
    }

    public void confirm(Booking booking) {
        PaymentResult result = payments.charge(booking.price());
        booking.confirmWith(result);
    }
}
```

Cette correction montre le résultat attendu : un nom métier, une règle localisée et un appelant qui n’a pas besoin de connaître les détails internes.

## Erreur fréquente

Créer une interface pour chaque classe n’aide pas. L’interface est utile quand elle protège une frontière ou une variation réelle.

## Auto-évaluation

- Peux-tu expliquer pourquoi chaque classe existe ?
- Peux-tu citer la règle protégée par l’objet ?
- Peux-tu changer une règle sans modifier toute l’application ?
- Ton code reste-t-il compréhensible sans commentaire long ?
