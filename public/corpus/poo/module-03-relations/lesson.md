---
id: poo.module-03.lesson
title: Relations entre objets
tags:
  - def
  - important
---

# Relations entre objets

Un programme objet n'est pas une collection de classes isolées. C'est un graphe d'objets qui collaborent.

Les relations principales sont :

- association : un objet connaît ou utilise un autre objet ;
- composition : un objet possède fortement un autre objet et contrôle son cycle de vie ;
- agrégation : un objet regroupe d'autres objets sans forcément les posséder ;
- dépendance : un objet utilise temporairement un service ou une valeur.

## Question de conception

Avant d'ajouter un attribut, demander : "cet objet doit-il vraiment connaître cet autre objet ?"

Dans le cinéma, une `Screening` concerné un `Movie` et une `Room`. Une `Room` compose ses `Seat`. Une `Reservation` associe un `Customer`, une `Screening` et des sièges.

## Multiplicites

Les cardinalités forcent à clarifier le modèle :

- une salle contient plusieurs sièges ;
- une séance concerné exactement un film ;
- une réservation contient au moins un siège ;
- un client peut avoir plusieurs réservations.

Une relation mal choisie rend le code difficile à faire évoluer. Une relation trop large propage les changements.

## Méthode de modelisation

Pour choisir une relation, avancer en quatre questions :

1. l'objet À a-t-il besoin de connaître B pour respecter une règle ?
2. À contrôle-t-il la vie de B ?
3. B peut-il exister sans À ?
4. la relation doit-elle être parcourue dans les deux sens ?

Exemple : un `Seat` existe dans une `Room`. Dans notre modèle, un siège sans salle n'a pas de sens. La composition est raisonnable.

Exemple inverse : un `Customer` existe sans `Reservation`. Une réservation reference un client, mais ne le possède pas.

## Attention aux relations bidirectionnelles

Une relation bidirectionnelle semble pratique, mais elle augmente la complexité.

Si `Room` connaît toutes ses `Screening` et que chaque `Screening` connaît sa `Room`, il faut maintenir les deux côtés cohérents. Ce n'est utile que si le domaine le demande vraiment.

## UML utile, pas bureaucratique

Un diagramme de classes doit aider à penser. Il ne doit pas tout documenter.

Pour ce cours, un bon diagramme montre :

- classes importantes du domaine ;
- relations ;
- cardinalités ;
- responsabilités principales ;
- invariants importants.

Il peut ignorer les getters, setters et détails techniques.

```uml
┌──────────────┐      1      ┌──────────────┐
│    Movie     │─────────────│  Screening   │
└──────────────┘             └──────────────┘
                                   │ 1
                                   │
                                   │ *
                             ┌──────────────┐
                             │    Room      │
                             └──────────────┘
                                   │ 1
                                   │
                                   │ *
                             ┌──────────────┐
                             │    Seat      │
                             └──────────────┘

┌──────────────┐      1      ┌──────────────┐
│   Customer   │─────────────│ Reservation  │
└──────────────┘             └──────────────┘
```

La lecture attendue est simple : une salle possède ses sièges, une séance relie un film et une salle, une réservation référence un client et des sièges.

## Approfondissement théorique : relations, dépendances et coût du modèle

Un programme objet n'est pas une collection de classes isolées. Les objets collaborent. Mais chaque relation a un coût : elle crée une dépendance de compréhension, de compilation, de test et d'évolution. Modéliser les relations est donc un acte de conception, pas un simple dessin UML.

L'association exprime un lien significatif entre deux objets. Une réservation est associée à une séance parce que cette relation fait partie du sens métier. La composition exprime un lien plus fort : une partie appartient à un tout et son cycle de vie est fortement lié à ce tout. Une dépendance ponctuelle exprime simplement qu'un objet utilise un autre objet pour accomplir une opération.

La distinction est importante parce qu'elle influence le couplage. Si une classe conserve trop de références, elle devient sensible à trop de changements. Un objet qui connaît toute la structure interne du système finit par devenir un centre de décision caché. À l'inverse, un objet qui ne connaît rien ne peut pas collaborer utilement. Le travail de conception consiste à choisir les relations nécessaires et à refuser les relations de confort.

Les multiplicités font partie du raisonnement. Dire qu'une séance possède plusieurs sièges, qu'une réservation concerne une séance, ou qu'un client peut avoir plusieurs réservations permet de clarifier les règles avant le code. Les multiplicités ne servent pas seulement aux diagrammes : elles révèlent souvent des invariants.

Un bon modèle limite aussi la navigation. Si le code écrit reservation.getScreening().getRoom().getSeats(), il est peut-être en train de traverser trop de détails. Une méthode comme reservation.canReserve(seatRequest) ou screening.reserve(seats) peut mieux exprimer l'intention et protéger la structure interne.

Les travaux de modélisation orientée objet insistent justement sur cette lecture relationnelle du domaine. Chez Larman, une bonne relation n'est pas choisie parce qu'elle "fonctionne", mais parce qu'elle raconte une vérité stable du problème. Une association, une composition ou une dépendance ne sont donc pas des décorations UML : elles sont une manière de dire ce que le système considère comme durable, ce qui est temporaire, et ce qui peut être remplacé.

Cette lecture est utile pour éviter deux excès opposés. Le premier consiste à tout relier, comme si une application devait être entièrement navigable de partout. Le second consiste à tout couper, comme si les objets vivaient isolés. Le bon modèle garde juste assez de liens pour exprimer le domaine sans le figer.

### Points d'analyse

- La relation correspond-elle à une phrase métier stable ?
- Qui possède le cycle de vie de qui ?
- Cette référence est-elle conservée durablement ou utilisée ponctuellement ?
