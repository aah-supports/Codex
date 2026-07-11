---
id: fiche.poo-invariants
title: Invariants en POO
tags:
  - def
  - important
---

# Invariants en POO

Un invariant est une règle qui doit rester vraie pour qu'un objet soit valide.

Exemples :

- une séance ne peut pas avoir une capacité négative ;
- une réservation doit contenir au moins une place ;
- un montant ne peut pas être négatif ;
- un email doit avoir un format acceptable.

## Règle pratique

Si une règle protège l'état d'un objet, elle doit être placée dans cet objet ou dans un objet-valeur dédié.

## Mauvais réflexe

Mettre la validation seulement dans un formulaire ou un controller. Cela marche au début, puis un autre point d'entrée oublie la règle.

## Bon réflexe

Créer un objet valide dès sa construction, puis exposer des méthodes métier qui gardent l'objet cohérent.

```java
public final class SeatRequest {
    private final int quantity;

    public SeatRequest(int quantity) {
        if (quantity <= 0) {
            throw new IllegalArgumentException("Le nombre de places doit être positif");
        }
        this.quantity = quantity;
    }
}
```
