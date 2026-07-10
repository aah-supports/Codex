---
id: poo.module-09.lesson
title: Tests unitaires orientes objet
tags:
  - tests
  - comportement
  - doubles
---

# Tests unitaires orientes objet

Tester un objet ne signifie pas verifier chaque ligne interne. Un bon test verifie un comportement observable.

## Etat ou interaction

Un test d'etat verifie le resultat apres l'action. Un test d'interaction verifie qu'une collaboration a eu lieu.

Il faut eviter les tests trop lies a l'implementation. Sinon, chaque refactoring casse les tests alors que le comportement n'a pas change.

## Doubles de test

- fake : implementation simple mais fonctionnelle ;
- stub : reponse controlee ;
- mock : verification d'interaction ;
- dummy : objet passe uniquement pour remplir une signature.

Utiliser les mocks avec mesure. Trop de mocks peuvent figer la conception.

## Structure Arrange, Act, Assert

Un test lisible suit souvent trois temps :

1. Arrange : preparer les objets ;
2. Act : executer l'action ;
3. Assert : verifier le resultat.

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

- impossible de creer un `Movie` sans titre ;
- impossible de creer une `Reservation` sans siege ;
- impossible de confirmer une reservation deja annulee ;
- impossible d'additionner deux `Money` de devises differentes.

Ces tests documentent les regles metier.

## Eviter le test miroir

Un test miroir repete l'implementation au lieu de verifier le comportement. S'il contient les memes conditions que le code teste, il protege mal.
