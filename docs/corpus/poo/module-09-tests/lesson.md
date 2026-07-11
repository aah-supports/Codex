---
id: poo.module-09.lesson
title: Tests unitaires orientés objet
tags:
  - def
  - important
---

# Tests unitaires orientés objet

Tester un objet ne signifie pas vérifier chaque ligne interne. Un bon test vérifie un comportement observable.

## État ou interaction

Un test d'état vérifie le résultat après l'action. Un test d'interaction vérifie qu'une collaboration a eu lieu.

Il faut éviter les tests trop liés à l'implémentation. Sinon, chaque refactoring casse les tests alors que le comportement n'a pas changé.

## Doubles de test

- fake : implémentation simple mais fonctionnelle ;
- stub : réponse contrôlée ;
- mock : vérification d'interaction ;
- dummy : objet passé uniquement pour remplir une signature.

Utiliser les mocks avec mesure. Trop de mocks peuvent figer la conception.

## Structure Arrange, Act, Assert

Un test lisible suit souvent trois temps :

1. Arrange : préparer les objets ;
2. Act : exécuter l'action ;
3. Assert : vérifier le résultat.

```java
@Test
void shouldConfirmReservationWhenPaymentIsAccepted() {
    // Arrange
    PaymentGateway payment = new FakeAcceptedPaymentGateway();
    ReservationRepository repository = new InMemoryReservationRepository();
    CreateReservationUseCase useCase = new CreateReservationUseCase(repository, payment);

    // Act
    Reservation reservation = useCase.execute(command);

    // Assert
    assertTrue(reservation.isConfirmed());
    assertTrue(repository.contains(reservation));
}
```

## Tester les invariants

Les objets du domaine doivent avoir leurs tests propres :

- impossible de créer un `Movie` sans titre ;
- impossible de créer une `Reservation` sans siège ;
- impossible de confirmer une réservation déjà annulée ;
- impossible d'additionner deux `Money` de devises différentes.

Ces tests documentent les règles métier.

## Éviter le test miroir

Un test miroir répète l'implémentation au lieu de vérifier le comportement. S'il contient les mêmes conditions que le code testé, il protège mal.

## Approfondissement théorique : le test comme spécification comportementale

Dans un programme objet, le test unitaire ne sert pas seulement à détecter des erreurs. Il sert aussi à préciser le comportement attendu d'un objet. Un bon test raconte une règle. Il décrit une situation, une action et une conséquence observable.

Tester tous les getters ne donne pas beaucoup de valeur. Cela vérifie que le code retourne ce qu'il stocke, mais pas que le modèle protège une règle. Tester qu'une réservation sans siège est refusée est beaucoup plus fort : le test documente un invariant métier.

Il faut distinguer tests d'état et tests d'interaction. Un test d'état vérifie le résultat après l'action. Un test d'interaction vérifie qu'une collaboration importante a eu lieu, par exemple appeler un port de paiement. Les interactions doivent être testées avec mesure. Trop de mocks figent l'implémentation et rendent le refactoring difficile.

Les doubles de test permettent d'isoler une unité de comportement. Un fake peut remplacer une base en mémoire. Un stub peut renvoyer un paiement refusé. Un mock peut vérifier qu'une notification a été déclenchée. Le choix du double dépend de ce que le test cherche à prouver.

Une conception testable n'est pas un accident. Elle résulte souvent d'une bonne séparation des responsabilités. Si un objet est impossible à tester sans base de données, réseau et horloge réelle, il mélange probablement trop de dépendances.

### Lecture d'un bon test

- Le nom du test décrit-il une règle métier ?
- L'assertion porte-t-elle sur un comportement observable ?
- Le test survivra-t-il à un refactoring interne ?
