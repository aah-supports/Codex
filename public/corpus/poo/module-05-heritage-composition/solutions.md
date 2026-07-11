---
id: poo.module-05.solutions
title: Corrections guidées
tags:
  - correction
  - a-retenir
  - heritage
  - composition
  - polymorphisme
summaryTags:
  - correction
---

# Corrections guidées

## Correction de l’exercice principal

Problème travaillé : `PremiumBooking extends Booking` commence bien, puis une promotion temporaire oblige à surcharger plusieurs méthodes. La hiérarchie devient rigide.

La règle à retenir est la suivante : Utilise `extends` seulement quand la relation “est un” respecte la substitution. Sinon, compose avec un objet qui porte la variation.

La variation de prix devient un objet interchangeable. `Booking` reste stable et ne connaît que le contrat `PricingPolicy`.

## Raisonnement pas à pas

1. Reformule la règle métier avec des mots simples.
2. Identifie l’objet qui possède les données nécessaires pour appliquer cette règle.
3. Place la vérification ou la décision dans cet objet, pas dans tous les appelants.
4. Relis l’appel public : il doit raconter une intention métier, pas une manipulation technique.

## Correction type

```java
public interface PricingPolicy {
    Money priceFor(Screening screening, int seats);
}

public final class Booking {
    private final PricingPolicy pricingPolicy;

    public Booking(PricingPolicy pricingPolicy) {
        this.pricingPolicy = pricingPolicy;
    }

    public Money quote(Screening screening, int seats) {
        return pricingPolicy.priceFor(screening, seats);
    }
}
```

Cette correction montre le résultat attendu : un nom métier, une règle localisée et un appelant qui n’a pas besoin de connaître les détails internes.

## Erreur fréquente

La forêt, le gorille et la banane rappellent qu’en héritant d’une classe, on récupère parfois beaucoup plus que le comportement voulu.

## Auto-évaluation

- Peux-tu expliquer pourquoi chaque classe existe ?
- Peux-tu citer la règle protégée par l’objet ?
- Peux-tu changer une règle sans modifier toute l’application ?
- Ton code reste-t-il compréhensible sans commentaire long ?
