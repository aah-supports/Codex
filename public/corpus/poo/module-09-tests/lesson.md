---
id: poo.module-09.lesson
title: Tests unitaires orientes objet
tags:
  - tests
  - comportement
  - doubles
---

# Tests unitaires orientes objet

Tester un objet ne signifie pas vérifier chaque ligne interne. Un bon test vérifie un comportement observable.

## État ou interaction

Un test d'état vérifie le résultat après l'action. Un test d'interaction vérifie qu'une collaboration à eu lieu.

Il faut éviter les tests trop lies à l'implémentation. Sinon, chaque refactoring casse les tests alors que le comportement n'a pas change.

## Doubles de test

- fake : implémentation simple mais fonctionnelle ;
- stub : réponse contrôlée ;
- mock : verification d'interaction ;
- dummy : objet passe uniquement pour remplir une signature.

Utiliser les mocks avec mesure. Trop de mocks peuvent figer la conception.

## Structure Arrange, Act, Assert

Un test lisible suit souvent trois temps :

1. Arrange : preparer les objets ;
2. Act : executer l'action ;
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
