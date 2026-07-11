---
id: poo.module-07.solutions
title: Corrections guidées
tags:
  - correction
  - a-retenir
  - solid
  - responsabilite
  - architecture
summaryTags:
  - correction
---

# Corrections guidées

## Correction de l’exercice principal

Problème travaillé : Une correction applique SOLID mécaniquement et crée dix classes abstraites sans rendre le code plus clair.

La règle à retenir est la suivante : SOLID sert à repérer une tension : changement fréquent, dépendance rigide, contrat trop large ou substitution cassée.

On part du symptôme. Si une classe change pour deux raisons, SRP aide. Si une dépendance concrète bloque les tests, DIP aide. Si aucun problème n’existe, on n’ajoute pas d’abstraction.

## Raisonnement pas à pas

1. Reformule la règle métier avec des mots simples.
2. Identifie l’objet qui possède les données nécessaires pour appliquer cette règle.
3. Place la vérification ou la décision dans cet objet, pas dans tous les appelants.
4. Relis l’appel public : il doit raconter une intention métier, pas une manipulation technique.

## Correction type

```java
public final class BookingReport {
    public String render(Booking booking) {
        return booking.reference() + " - " + booking.status();
    }
}

public final class BookingRepository {
    public void save(Booking booking) {
        // persistance uniquement
    }
}
```

Cette correction montre le résultat attendu : un nom métier, une règle localisée et un appelant qui n’a pas besoin de connaître les détails internes.

## Erreur fréquente

Un principe n’est pas une obligation de design. Il doit améliorer une situation concrète.

## Auto-évaluation

- Peux-tu expliquer pourquoi chaque classe existe ?
- Peux-tu citer la règle protégée par l’objet ?
- Peux-tu changer une règle sans modifier toute l’application ?
- Ton code reste-t-il compréhensible sans commentaire long ?
