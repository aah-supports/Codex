---
id: poo.module-08.lesson
title: Exceptions, contrats et objets-valeurs
tags:
  - def
  - important
---

# Exceptions, contrats et objets-valeurs

Un objet protège des invariants. Un invariant est une règle qui doit rester vraie pour que l'objet soit valide.

Les contrats aident à raisonner :

- précondition : ce qui doit être vrai avant l'appel ;
- postcondition : ce qui doit être vrai après l'appel ;
- invariant : ce qui doit rester vrai pendant toute la vie de l'objet.

## Erreur métier ou technique

Une carte refusée, un siège déjà réservé et une base de données indisponible ne sont pas le même type de problème.

## Value Object

Un objet-valeur représente une valeur riche : `Money`, `EmailAddress`, `SeatNumber`. Il est souvent immuable et comparé par valeur.

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
- `PaymentRefusedException` ;
- `InvalidScreeningPeriodException`.

Nommer les exceptions métier aide à lire les cas d'utilisation et à afficher de meilleurs messages.

## Immutabilité

Un value object doit souvent être immuable. Si un montant change, on crée un nouveau `Money`. Cela évite les modifications invisibles partagées entre plusieurs objets.

## Approfondissement théorique : contrats, valeurs et validité

Les contrats permettent de raisonner sur le comportement attendu d'un objet. Une précondition décrit ce qui doit être vrai avant l'appel. Une postcondition décrit ce qui doit être vrai après l'appel. Un invariant décrit ce qui doit rester vrai pendant toute la vie de l'objet. Ces notions viennent de la conception par contrat et donnent une base théorique solide à l'encapsulation.

Les objets-valeurs rendent ces contrats visibles dans le type. Un email représenté par String ne dit rien de sa validité. Un montant représenté par double ne dit rien de sa devise ni de son signe. Un objet-valeur comme EmailAddress ou Money concentre la validation et donne un nom métier à une valeur.

Un objet-valeur se distingue d'une entité par l'absence d'identité propre. Deux Money de même montant et même devise sont équivalents. Deux réservations avec les mêmes champs ne sont pas forcément la même réservation, car elles ont une identité. Cette distinction est essentielle dans les modèles métier.

L'immutabilité renforce cette logique. Si un objet-valeur change, on crée une nouvelle valeur. Cela évite les effets de bord et rend les raisonnements plus simples. Le code peut transmettre un Money sans craindre qu'un autre morceau du programme le modifie silencieusement.

Les exceptions doivent elles aussi être pensées. Une erreur métier comme SeatAlreadyReserved n'a pas le même sens qu'une erreur technique de base de données. Les distinguer permet de mieux tester, mieux afficher les messages et mieux protéger les cas d'utilisation.

### Signaux de création

- Une primitive est validée partout.
- Deux primitives voyagent toujours ensemble.
- Le nom métier est plus important que le type technique.
