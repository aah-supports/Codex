---
id: poo.module-08.lesson
title: Exceptions, contrats et objets-valeurs
tags:
  - exception
  - contrat
  - value-object
---

# Exceptions, contrats et objets-valeurs

Un objet protège des invariants. Un invariant est une règle qui doit rester vraie pour que l'objet soit valide.

Les contrats aident à raisonnér :

- precondition : ce qui doit être vrai avant l'appel ;
- postcondition : ce qui doit être vrai après l'appel ;
- invariant : ce qui doit rester vrai pendant toute la vie de l'objet.

## Erreur métier ou technique

Une carte refusée, un siège déjà réservé et une base de données indisponible ne sont pas le même type de problème.

## Value Object

Un objet-valeur représente une valeur riche : `Money`, `EmailAddress`, `SeatNumber`. Il est souvent immuable et compare par valeur.

## Pourquoi les primitives posent problème

Les primitives sont utiles, mais elles ne portent pas l'intention.

```java
String email;
String seatNumber;
double amount;
String currency;
```

Ces types ne disent pas ce qui est valide. Ils ne distinguent pas un email d'un identifiant, ni un montant en euros d'un montant en dollars.

Les objets-valeurs rendent le modèle plus explicite :

```java
EmailAddress email;
SeatNumber seatNumber;
Money price;
```

## Exception et langage métier

Toutes les erreurs ne doivent pas être des `IllegalArgumentException`.

Exemples :

- `SeatAlreadyReservedException` ;
- `PaymentRefusédException` ;
- `InvalidScreeningPeriodException`.

Nommer les exceptions métier aide à lire les cas d'utilisation et à afficher de meilleurs messages.

## Immutabilite

Un value object doit souvent être immuable. Si un montant change, on crée un nouveau `Money`. Cela évite les modifications invisibles partagées entre plusieurs objets.
