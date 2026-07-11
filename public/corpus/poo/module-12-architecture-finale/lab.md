---
id: poo.module-12.lab
title: Assembler domaine, application et infrastructure
---

# Assembler domaine, application et infrastructure

## Objectif

À la fin de cet atelier, tu dois obtenir un petit morceau de modèle objet lisible, testable et relié au projet de réservation de cinéma. L’objectif n’est pas d’écrire beaucoup de code, mais d’écrire le code au bon endroit.

## Situation de départ

Le modèle métier dépend du framework web, de la base de données et des détails de paiement. Il devient difficile à utiliser hors de l’application.

```java
@PostMapping("/book")
public void book() {
    // SQL, paiement et règles métier dans le contrôleur
}
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
