---
id: poo.module-11.lab
title: Choisir un pattern à partir d’une tension
---

# Choisir un pattern à partir d’une tension

## Objectif

À la fin de cet atelier, tu dois obtenir un petit morceau de modèle objet lisible, testable et relié au projet de réservation de cinéma. L’objectif n’est pas d’écrire beaucoup de code, mais d’écrire le code au bon endroit.

## Situation de départ

Le code utilise des patterns parce qu’ils sont connus, mais personne ne sait quel problème ils résolvent.

```java
if (type.equals("STUDENT")) { ... }
else if (type.equals("PREMIUM")) { ... }
else if (type.equals("GROUP")) { ... }
```

Ce point de départ est volontairement imparfait. Il rend visible le problème avant la correction.

## Étape 1 : nommer le comportement

Écris trois phrases avant de coder :

- « l’objet doit refuser... »
- « l’objet doit accepter... »
- « l’objet ne doit pas connaître... »

Ces phrases servent de filtre. Si une méthode ne correspond à aucune phrase métier, elle appartient peut-être à une autre classe.

## Étape 2 : déplacer une règle dans un objet

Crée ou modifie une classe pour qu’elle protège une règle précise. Préfère une méthode métier à un setter générique.

## Étape 3 : vérifier la progression

Ajoute deux exemples d’utilisation : un cas valide et un cas invalide. Explique en une phrase ce que le nouvel objet empêche.

## Étape 4 : extension

Reprends le même raisonnement sur un autre objet du module. Tu peux travailler avec `Movie`, `Screening`, `Booking`, `PaymentGateway`, `PricingPolicy` ou `SeatMap` selon le thème du chapitre.

## Résultat attendu

- une classe avec un nom métier ;
- une règle vérifiée près des données concernées ;
- au moins un exemple de cas invalide ;
- une courte justification du choix de conception.
