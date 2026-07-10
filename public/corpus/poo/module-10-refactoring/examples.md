---
id: poo.module-10.examples
title: Exemples
---

# Methode qui fait trop

```java
public void reserve(ReservationRequest request) {
    // verifier les sieges
    // calculer le prix
    // sauvegarder
    // debiter
    // envoyer un email
    // imprimer le billet
}
```

# Premiere extraction

```java
public void reserve(ReservationRequest request) {
    Reservation reservation = createReservation(request);
    Money price = pricingPolicy.priceFor(reservation);
    paymentGateway.charge(request.paymentMethod(), price);
    repository.save(reservation.confirm());
    notificationService.reservationConfirmed(reservation);
}
```

Le code n'est pas encore parfait, mais les responsabilites apparaissent.
