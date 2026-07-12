---
id: poo.module-05.lesson
title: Héritage, composition et polymorphisme
tags:
  - def
  - important
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

```uml
┌─────────────────────┐
│   PricingPolicy      │
├─────────────────────┤
│ + calculatePrice()   │
└─────────────────────┘
        ▲       ▲
        │       │
┌──────────────┐ ┌──────────────┐
│ StandardPricing│ │ StudentPricing│
└──────────────┘ └──────────────┘

┌─────────────────────┐
│ DiscountedPricing   │
├─────────────────────┤
│ - basePricing       │───> PricingPolicy
│ - discount          │
└─────────────────────┘
```

Ce schéma montre la différence entre spécialiser une famille de comportements et assembler un comportement avec un autre. La composition reste plus souple quand la variation porte sur un calcul.

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

Joshua Bloch résume bien le sujet : la composition est souvent plus sûre que l'héritage, parce qu'elle réduit la surface des surprises. Sandi Metz pousse la même logique plus loin : le code lisible n'est pas celui qui réutilise le plus, mais celui qui exprime clairement qui dépend de quoi. Autrement dit, l'héritage n'est pas condamné, mais il doit être justifié par une substitution réelle, pas par un simple confort de réutilisation.

Dans un cours universitaire, cette distinction est essentielle. Un étudiant peut écrire `extends` très vite ; il est beaucoup plus difficile d'expliquer pourquoi cette hiérarchie reste saine lorsque les règles métier changent. C'est exactement là que la composition devient intellectuellement plus robuste : elle fait apparaître les variations comme des collaborations, pas comme des branches de plus en plus fragiles.

## Approfondissement théorique : substitution, polymorphisme et réutilisation

L'héritage est souvent découvert comme un mécanisme de réutilisation. Cette vision est dangereuse si elle masque la notion de substitution. Une sous-classe doit pouvoir être utilisée partout où la classe mère est attendue, sans casser les attentes du programme. C'est le principe de substitution.

La relation est donc plus forte qu'un simple partage de code. Si PremiumBooking hérite de Booking mais change le sens de certaines méthodes, ou refuse certaines opérations héritées, la hiérarchie devient trompeuse. Le code client croit manipuler une réservation ordinaire, mais reçoit un objet qui ne respecte pas le même contrat comportemental.

La composition répond à un autre besoin : assembler des comportements. Si le prix varie selon le statut du client, le jour, la 3D ou une promotion, le cœur du problème est une variation de calcul. Il est souvent plus clair de composer Booking avec une PricingPolicy que de créer une hiérarchie de réservations.

Le polymorphisme reste central dans les deux cas. Il permet d'envoyer le même message à plusieurs objets qui respectent le même contrat. La différence est que la composition permet de choisir l'objet variable sans enfermer tout le modèle dans une hiérarchie rigide.

La bonne question n'est donc pas : comment éviter l'héritage ? La bonne question est : quelle relation exprime le mieux le domaine et résistera le mieux aux changements ? L'héritage convient aux spécialisations stables. La composition convient aux comportements interchangeables.

### Critères de décision

- La relation est-elle vraiment de type est-un ?
- Le sous-type respecte-t-il toutes les attentes du type parent ?
- Le besoin réel est-il une variation de comportement ?
