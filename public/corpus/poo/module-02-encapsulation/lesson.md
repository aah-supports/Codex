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
- construire un objet valide dès le départ ;
- distinguer getter utile et setter dangereux ;
- placer les validations dans le bon objet ;
- expliquer ce qu'est un invariant.

Un objet doit idéalement être valide dès sa construction. Les invariants importants doivent être vérifiés au plus près de l'objet concerné.

## Invariant

Un invariant est une règle qui doit toujours rester vraie pour qu'un objet reste cohérent.

Autrement dit : si cette règle est fausse, l'objet ne devrait pas exister dans cet état.

Exemples :

- un film a une durée positive ;
- une salle contient au moins un siège ;
- une réservation contient au moins un siège ;
- une adresse email contient un format acceptable.

## Pourquoi placer l'invariant dans l'objet ?

Prenons la règle : "un film ne peut pas avoir une durée négative".

Si cette règle est vérifiée uniquement dans un formulaire, elle peut être oubliée ailleurs : dans un import CSV, dans un test, dans une API, dans un script d'administration. Le programme peut alors créer un `Movie` invalide malgré la validation du formulaire.

Si la règle est dans le constructeur de `Movie`, chaque création de film passe par le même garde-fou.

```java
public Movie(String title, int durationInMinutes) {
    if (durationInMinutes <= 0) {
        throw new IllegalArgumentException("Duration must be positive");
    }

    this.title = title;
    this.durationInMinutes = durationInMinutes;
}
```

Le modèle devient plus robuste parce qu'il ne dépend plus de la vigilance de tous les appelants. L'objet protège lui-même son état.

## Attention aux setters automatiques

Ajouter un setter pour chaque attribut revient souvent à rendre l'objet modifiable depuis partout. Cela déplace les règles ailleurs et fragilise le modèle.

Un setter n'est pas interdit. Il doit correspondre à une vraie opération métier.

`setDuration(-10)` est faible. `rescheduleTo(newPeriod)` ou `renameTo(title)` peut être plus expressif si l'objet vérifie ses règles.

## Progression pratique

Commencer petit :

1. créer la classe ;
2. rendre les attributs privés ;
3. ajouter le constructeur ;
4. refuser les valeurs invalides ;
5. exposer seulement ce qui est nécessaire.

## Encapsulation et langage métier

L'encapsulation ne sert pas seulement à cacher des attributs. Elle permet de donner un nom métier aux opérations.

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
