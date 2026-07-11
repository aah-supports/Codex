---
id: poo.module-02.solutions
title: Corrections guidées
---

# Corrections guidées

## Correction de l’exercice principal

Problème travaillé : Une séance peut être créée avec une capacité négative ou un horaire vide. Les erreurs apparaissent beaucoup plus tard dans l’application.

La règle à retenir est la suivante : Un invariant est une règle qui doit rester vraie pendant toute la vie de l’objet. Le constructeur et les méthodes publiques doivent le protéger.

La correction refuse immédiatement les valeurs invalides. Une méthode nommée comme `reserveSeats` exprime une intention métier et vérifie la capacité restante.

## Raisonnement pas à pas

1. Reformule la règle métier avec des mots simples.
2. Identifie l’objet qui possède les données nécessaires pour appliquer cette règle.
3. Place la vérification ou la décision dans cet objet, pas dans tous les appelants.
4. Relis l’appel public : il doit raconter une intention métier, pas une manipulation technique.

## Correction type

```java
public final class Screening {
    private final int capacity;
    private int reservedSeats;

    public Screening(int capacity) {
        if (capacity <= 0) {
            throw new IllegalArgumentException("La capacité doit être positive");
        }
        this.capacity = capacity;
    }

    public void reserveSeats(int quantity) {
        if (quantity <= 0 || reservedSeats + quantity > capacity) {
            throw new IllegalArgumentException("Réservation impossible");
        }
        reservedSeats += quantity;
    }
}
```

Cette correction montre le résultat attendu : un nom métier, une règle localisée et un appelant qui n’a pas besoin de connaître les détails internes.

## Erreur fréquente

Si l’invariant est vérifié seulement dans le service, un autre service pourra oublier la règle. L’objet doit donc rester le gardien de sa validité.

## Auto-évaluation

- Peux-tu expliquer pourquoi chaque classe existe ?
- Peux-tu citer la règle protégée par l’objet ?
- Peux-tu changer une règle sans modifier toute l’application ?
- Ton code reste-t-il compréhensible sans commentaire long ?
