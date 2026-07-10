---
id: poo.module-02.lesson
title: Classes, objets et encapsulation
tags:
  - encapsulation
  - invariant
---

# Encapsulation

L'encapsulation protège l'état interne d'un objet. Elle évite que n'importe quel code puisse produire un objet invalide.

## Objectifs

À la fin du module, tu dois pouvoir :

- rendre un attribut privé quand il porte une règle ;
- construire un objet valide des le depart ;
- distinguer getter utile et setter dangereux ;
- placer les validations dans le bon objet ;
- expliquer ce qu'est un invariant.

Un objet doit idealement être valide des sa construction. Les invariants importants doivent être vérifies au plus près de l'objet concerne.

## Invariant

Un invariant est une règle qui doit toujours rester vraie.

Exemples :

- un film à une durée positive ;
- une salle contient au moins un siège ;
- une réservation contient au moins un siège ;
- une adresse email contient un format acceptable.

Si l'invariant est disperse dans plusieurs services, il sera oublie. S'il est protège dans l'objet, le modèle devient plus robuste.

## Attention aux setters automatiques

Ajouter un setter pour chaque attribut revient souvent à rendre l'objet modifiable depuis partout. Cela deplace les règles ailleurs et fragilise le modèle.

Un setter n'est pas interdit. Il doit correspondre à une vraie operation métier.

`setDuration(-10)` est faible. `rescheduleTo(newPeriod)` ou `renameTo(title)` peut être plus expressif si l'objet vérifie ses règles.

## Progression pratique

Commencer petit :

1. créer la classe ;
2. rendre les attributs privés ;
3. ajouter le constructeur ;
4. refusér les valeurs invalides ;
5. exposer seulement ce qui est nécessaire.

## Encapsulation et langage métier

L'encapsulation ne sert pas seulement à cacher des attributs. Elle permet de donner un nom métier aux operations.

Comparer :

```java
reservation.setStatus("CANCELLED");
```

et :

```java
reservation.cancel();
```

La deuxième version donne une intention. Elle permet aussi de vérifier les règles : une réservation déjà remboursée ne peut peut-être plus être annulée.

## Mauvais signal : getters partout

Quand un objet expose tous ses attributs, le reste du programme commence à prendre les décisions à sa place.

```java
if (reservation.getScreening().getRoom().getName().equals("IMAX")) {
    price += 4.0;
}
```

Cette chaîne révèle que la connaissance est dispersée. Il faut se demander quel objet ou service métier devrait porter cette décision.

## Travail attendu

Chaque classe du domaine doit avoir au moins une raison d'exister autre que "stocker des données". Si une classe n'a que des getters et setters, elle est peut-être anémique ou pas encore terminée.
