---
id: poo.module-02.lesson
title: Classes, objets et encapsulation
tags:
  - def
  - important
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

## UML simple pour protéger une règle

Quand une classe porte un invariant important, un petit diagramme aide à voir où vit la règle.

```uml
┌──────────────────────────┐
│          Movie           │
├──────────────────────────┤
│ - title: String          │
│ - durationInMinutes: int │
├──────────────────────────┤
│ + Movie(...)             │
│ + renameTo(...)          │
│ + rescheduleTo(...)      │
└──────────────────────────┘
```

Ce schéma rappelle une idée simple : la durée ne doit pas être modifiée librement par n'importe quel service. Elle passe par une opération contrôlée par l'objet.

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

## Approfondissement théorique : encapsulation, abstraction et invariants

L'encapsulation est souvent présentée comme le fait de mettre les attributs en privé. Cette définition est incomplète. Le cœur de l'encapsulation est le contrôle des changements d'état. Un objet possède un état interne, mais cet état ne doit pas pouvoir être transformé n'importe comment par le reste du programme.

La notion centrale est celle d'invariant. Un invariant est une propriété qui doit rester vraie pendant toute la vie de l'objet. Si une salle doit toujours contenir au moins un siège, cette règle ne doit pas dépendre du bon vouloir d'un formulaire. Si une réservation doit toujours contenir au moins une place, cette règle ne doit pas être recopiée dans chaque service.

Dans une perspective théorique, l'encapsulation sert aussi à maintenir une frontière d'abstraction. L'utilisateur de l'objet n'a pas besoin de connaître tous les détails de représentation. Il doit connaître les opérations disponibles et leurs effets. Par exemple, il est plus fort de proposer reserveSeats que setReservedSeats. La première méthode exprime une opération du domaine. La seconde expose une mutation technique.

Cette différence améliore la robustesse. Quand l'état est modifié uniquement par des méthodes métier, l'objet peut vérifier ses règles à chaque changement. Le programme ne dépend plus de la vigilance permanente de tous les appelants. Il existe un point de contrôle local et identifiable.

Bertrand Meyer formalise cette idée dans la conception par contrat : une classe doit non seulement cacher ses données, mais surtout garantir que ses promesses restent vraies. Cela change la manière de lire une API. Un constructeur, une méthode ou une exception ne sont pas de simples mécanismes techniques ; ils expriment des obligations entre le code appelant et l'objet appelé.

Dans ce cadre, les invariants ne sont pas des validations accessoires. Ils sont la charpente logique du modèle. Si l'invariant vit ailleurs que dans l'objet, il dépend de l'attention humaine. S'il vit dans l'objet, le modèle gagne en localité, en lisibilité et en fiabilité.

Il faut cependant éviter un contresens : encapsuler ne veut pas dire cacher tout sans réfléchir. Un getter peut être légitime s'il expose une information utile sans compromettre la cohérence. Un setter peut être légitime s'il correspond vraiment à une action métier contrôlée. Le problème n'est pas la présence d'une méthode publique, mais l'absence de règle derrière cette méthode.

Steve McConnell insiste aussi sur un point important : la complexité ne disparaît pas parce qu'on la distribue. Encapsuler ne consiste pas à déplacer la complexité hors de vue, mais à la concentrer là où elle peut être contrôlée et testée.

### Raisonnement attendu

- Identifier les invariants avant de choisir les méthodes publiques.
- Remplacer les mutations génériques par des actions nommées.
- Tester les comportements qui protègent la validité de l'objet.
