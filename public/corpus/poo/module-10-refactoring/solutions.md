---
id: poo.module-10.solutions
title: Corrections guidées
tags:
  - correction
  - a-retenir
  - refactoring
  - code-smell
  - test
summaryTags:
  - correction
---

# Corrections guidées

## Correction de l’exercice principal

Problème travaillé : Un ancien service fonctionne mais personne n’ose le modifier. Les règles sont dupliquées et les tests sont faibles.

La règle à retenir est la suivante : Un refactoring change la structure du code sans changer son comportement observable. Il doit être petit, vérifiable et réversible.

On ajoute d’abord un test de caractérisation, puis on extrait une méthode nommée. Ensuite seulement, on déplace la règle vers l’objet qui possède les données nécessaires.

## Raisonnement pas à pas

1. Reformule la règle métier avec des mots simples.
2. Identifie l’objet qui possède les données nécessaires pour appliquer cette règle.
3. Place la vérification ou la décision dans cet objet, pas dans tous les appelants.
4. Relis l’appel public : il doit raconter une intention métier, pas une manipulation technique.

## Correction type

```java
public Money priceFor(Customer customer, Screening screening) {
    Money basePrice = screening.basePrice();
    return customer.isStudent() ? basePrice.minusPercent(20) : basePrice;
}
```

Cette correction montre le résultat attendu : un nom métier, une règle localisée et un appelant qui n’a pas besoin de connaître les détails internes.

## Erreur fréquente

Réécrire tout le module avant d’avoir des tests mélange refactoring et réimplémentation.

## Auto-évaluation

- Peux-tu expliquer pourquoi chaque classe existe ?
- Peux-tu citer la règle protégée par l’objet ?
- Peux-tu changer une règle sans modifier toute l’application ?
- Ton code reste-t-il compréhensible sans commentaire long ?
