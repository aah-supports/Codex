---
id: poo.module-08.lesson
title: Exceptions, contrats et objets-valeurs
tags:
  - exception
  - contrat
  - value-object
---

# Exceptions, contrats et objets-valeurs

Un objet protege des invariants. Un invariant est une regle qui doit rester vraie pour que l'objet soit valide.

Les contrats aident a raisonner :

- precondition : ce qui doit etre vrai avant l'appel ;
- postcondition : ce qui doit etre vrai apres l'appel ;
- invariant : ce qui doit rester vrai pendant toute la vie de l'objet.

## Erreur metier ou technique

Une carte refusee, un siege deja reserve et une base de donnees indisponible ne sont pas le meme type de probleme.

## Value Object

Un objet-valeur represente une valeur riche : `Money`, `EmailAddress`, `SeatNumber`. Il est souvent immuable et compare par valeur.

## Pourquoi les primitives posent probleme

Les primitives sont utiles, mais elles ne portent pas l'intention.

```java
String email;
String seatNumber;
double amount;
String currency;
```

Ces types ne disent pas ce qui est valide. Ils ne distinguent pas un email d'un identifiant, ni un montant en euros d'un montant en dollars.

Les objets-valeurs rendent le modele plus explicite :

```java
EmailAddress email;
SeatNumber seatNumber;
Money price;
```

## Exception et langage metier

Toutes les erreurs ne doivent pas etre des `IllegalArgumentException`.

Exemples :

- `SeatAlreadyReservedException` ;
- `PaymentRefusedException` ;
- `InvalidScreeningPeriodException`.

Nommer les exceptions metier aide a lire les cas d'utilisation et a afficher de meilleurs messages.

## Immutabilite

Un value object doit souvent etre immuable. Si un montant change, on cree un nouveau `Money`. Cela evite les modifications invisibles partagees entre plusieurs objets.
