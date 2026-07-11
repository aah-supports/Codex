---
id: poo.module-08.solutions
title: Corrections guidées
---

# Corrections guidées

## Correction de l’exercice principal

Problème travaillé : Les montants, les e-mails et les identifiants circulent sous forme de `String` ou de `double`. Les erreurs sont découvertes trop tard.

La règle à retenir est la suivante : Un objet-valeur représente une valeur métier validée. Il n’a pas d’identité propre et se compare par ses valeurs.

`Money` empêche les montants négatifs et donne un nom métier à la valeur. Le reste du code ne manipule plus un `double` ambigu.

## Raisonnement pas à pas

1. Reformule la règle métier avec des mots simples.
2. Identifie l’objet qui possède les données nécessaires pour appliquer cette règle.
3. Place la vérification ou la décision dans cet objet, pas dans tous les appelants.
4. Relis l’appel public : il doit raconter une intention métier, pas une manipulation technique.

## Correction type

```java
public record Money(int cents) {
    public Money {
        if (cents < 0) {
            throw new IllegalArgumentException("Un montant ne peut pas être négatif");
        }
    }

    public Money add(Money other) {
        return new Money(cents + other.cents);
    }
}
```

Cette correction montre le résultat attendu : un nom métier, une règle localisée et un appelant qui n’a pas besoin de connaître les détails internes.

## Erreur fréquente

Un objet-valeur ne doit pas devenir un mini-service. Il porte une valeur, ses validations et quelques opérations naturelles.

## Auto-évaluation

- Peux-tu expliquer pourquoi chaque classe existe ?
- Peux-tu citer la règle protégée par l’objet ?
- Peux-tu changer une règle sans modifier toute l’application ?
- Ton code reste-t-il compréhensible sans commentaire long ?
