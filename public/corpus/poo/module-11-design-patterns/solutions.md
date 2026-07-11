---
id: poo.module-11.solutions
title: Corrections guidées
tags:
  - important
---

# Corrections guidées

## Correction de l’exercice principal

Problème travaillé : Le code utilise des patterns parce qu’ils sont connus, mais personne ne sait quel problème ils résolvent.

La règle à retenir est la suivante : Un design pattern est une solution nommée à un problème récurrent. Il doit répondre à une tension précise.

Strategy sert à varier un calcul, Adapter à brancher une API incompatible, Observer à réagir à un événement, State à déplacer un comportement qui dépend fortement d’un état.

## Raisonnement pas à pas

1. Reformule la règle métier avec des mots simples.
2. Identifie l’objet qui possède les données nécessaires pour appliquer cette règle.
3. Place la vérification ou la décision dans cet objet, pas dans tous les appelants.
4. Relis l’appel public : il doit raconter une intention métier, pas une manipulation technique.

## Correction type

```java
public interface DiscountStrategy {
    Money apply(Money price);
}

public final class StudentDiscount implements DiscountStrategy {
    public Money apply(Money price) {
        return price.minusPercent(20);
    }
}
```

Cette correction montre le résultat attendu : un nom métier, une règle localisée et un appelant qui n’a pas besoin de connaître les détails internes.

## Erreur fréquente

Nommer une classe `ManagerFactoryStrategy` ne crée pas une bonne conception. Le pattern doit rester lisible dans le domaine.

## Auto-évaluation

- Peux-tu expliquer pourquoi chaque classe existe ?
- Peux-tu citer la règle protégée par l’objet ?
- Peux-tu changer une règle sans modifier toute l’application ?
- Ton code reste-t-il compréhensible sans commentaire long ?
