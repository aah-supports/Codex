---
id: poo.module-10.examples
title: Exemples
---

# Méthode qui fait trop

```java
public void reserve(ReservationRequest request) {
    // vérifier les sièges
    // calculer le prix
    // sauvegarder
    // debiter
    // envoyer un email
    // imprimer le billet
}
```

# Première extraction

```java
public void reserve(ReservationRequest request) {
    Reservation reservation = createReservation(request);
    Money price = pricingPolicy.priceFor(reservation);
    paymentGateway.charge(request.paymentMethod(), price);
    repository.save(reservation.confirm());
    notificationService.reservationConfirmed(reservation);
}
```

Le code n'est pas encore parfait, mais les responsabilités apparaissent.

# Remplacer primitive par objet

Avant :

```java
public void pay(double amount, String currency) {
    if (amount < 0) {
        throw new IllegalArgumentException();
    }
}
```

Après :

```java
public void pay(Money amount) {
    paymentGateway.charge(amount);
}
```

La validation du montant n'est plus dupliquee.

# Remplacer condition par polymorphisme

Avant :

```java
switch (reservation.status()) {
    case "PENDING" -> reservation.confirm();
    case "CANCELLED" -> throw new IllegalStateException();
}
```

Après :

```java
reservation.confirm();
```

La logique de transition peut vivre dans l'objet ou dans un état dédié.
