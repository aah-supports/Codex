---
id: poo.module-05.lesson
title: Heritage, composition et polymorphisme
tags:
  - heritage
  - composition
  - polymorphisme
---

# Heritage, composition et polymorphisme

L'heritage exprime une relation de specialisation. Il ne doit pas servir uniquement a eviter quelques lignes de duplication.

## Objectifs

A la fin du module, tu dois pouvoir :

- reconnaitre une vraie relation "est un" ;
- expliquer ce que `extends` implique ;
- utiliser une interface pour obtenir du polymorphisme ;
- remplacer une chaine de conditions par des strategies ;
- choisir la composition quand l'heritage est trop fragile.

La citation de la banane, du gorille et de la foret rappelle le probleme : parfois on voulait seulement une banane, mais on recupere le gorille qui la tient, puis toute la foret autour. Avec `extends`, une sous-classe recupere plus que ce qu'elle voulait : API, comportements, contraintes et couplage avec la classe mere.

## Substitution

Une sous-classe doit pouvoir remplacer sa classe mere sans surprise. Si `StudentPricing` herite de `StandardPricing`, mais doit desactiver la moitie des methodes heritees, la relation est probablement mauvaise.

## Composition

La composition consiste a assembler des objets plus petits. Elle rend souvent le systeme plus explicite et plus facile a faire evoluer.

Au lieu d'heriter pour reutiliser du code, on peut deleguer :

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

Le polymorphisme permet d'utiliser plusieurs implementations derriere un meme contrat.

Dans le projet cinema, `PricingPolicy` peut representer plusieurs politiques de prix sans multiplier les `if`.

## Regle pratique

Utiliser l'heritage quand la relation de substitution est solide. Utiliser la composition quand on veut assembler des comportements.
