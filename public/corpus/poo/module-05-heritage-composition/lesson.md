---
id: poo.module-05.lesson
title: Héritage, composition et polymorphisme
tags:
  - héritage
  - composition
  - polymorphisme
---

# Héritage, composition et polymorphisme

L'héritage exprime une relation de spécialisation. Il ne doit pas servir uniquement à éviter quelques lignes de duplication.

## Objectifs

À la fin du module, tu dois pouvoir :

- reconnaître une vraie relation "est un" ;
- expliquer ce que `extends` implique ;
- utiliser une interface pour obtenir du polymorphisme ;
- remplacer une chaîne de conditions par des stratégies ;
- choisir la composition quand l'héritage est trop fragile.

La citation de la banane, du gorille et de la forêt rappelle le problème : parfois on voulait seulement une banane, mais on récupère le gorille qui la tient, puis toute la forêt autour. Avec `extends`, une sous-classe récupère plus que ce qu'elle voulait : API, comportements, contraintes et couplage avec la classe mère.

## Substitution

Une sous-classe doit pouvoir remplacer sa classe mère sans surprise. Si `StudentPricing` hérite de `StandardPricing`, mais doit désactiver la moitié des méthodes héritées, la relation est probablement mauvaise.

## Composition

La composition consiste à assembler des objets plus petits. Elle rend souvent le système plus explicite et plus facile à faire évoluer.

Au lieu d'hériter pour réutiliser du code, on peut déléguer :

```java
public class DiscountedPricing implements PricingPolicy {
    private final PricingPolicy basePricing;
    private final Discount discount;

    public DiscountedPricing(PricingPolicy basePricing, Discount discount) {
        this.basePricing = basePricing;
        this.discount = discount;
    }

    @Override
    public double calculatePrice(Screening screening) {
        return discount.applyTo(basePricing.calculatePrice(screening));
    }
}
```

## Polymorphisme

Le polymorphisme permet d'utiliser plusieurs implémentations derrière un même contrat.

Dans le projet cinéma, `PricingPolicy` peut représenter plusieurs politiques de prix sans multiplier les `if`.

## Règle pratique

Utiliser l'héritage quand la relation de substitution est solide. Utiliser la composition quand on veut assembler des comportements.

## Progression pédagogique

Ne commence pas par `extends`. Commence par un problème :

1. plusieurs tarifs existent ;
2. chaque tarif calcule différemment ;
3. le code contient une condition qui grossit ;
4. on introduit un contrat commun ;
5. on remplace la condition par du polymorphisme.

L'héritage de classe arrive seulement si une vraie spécialisation existe.

## Quand l'héritage est raisonnable

Un héritage peut être acceptable si :

- la sous-classe est vraiment un cas particulier de la classe mère ;
- les invariants de la classe mère restent vrais ;
- aucune méthode héritée ne devient absurde ;
- le comportement commun est stable ;
- la substitution ne surprend pas le code client.

Si une sous-classe doit dire "je ne supporte pas cette méthode", c'est un signal fort contre l'héritage.

## Composition et combinaison

La composition permet de combiner des comportements sans enfermer le modèle dans une hiérarchie rigide. Pour la tarification, on peut composer :

- un tarif de base ;
- une réduction ;
- une majoration 3D ;
- un code promotionnel.

Cette approche évite une explosion de classes comme `Student3DWednesdayPromotionPricing`.
