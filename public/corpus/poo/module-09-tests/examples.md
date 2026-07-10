---
id: poo.module-09.examples
title: Exemples
---

# Test de comportement

```java
@Test
void shouldApplyStudentPrice() {
    PricingPolicy pricing = new StudentPricing();

    double price = pricing.calculatePrice(screening);

    assertEquals(8.0, price);
}
```

# Fake repository

```java
public class FakeReservationRepository implements ReservationRepository {
    private final List<Reservation> saved = new ArrayList<>();

    @Override
    public void save(Reservation reservation) {
        saved.add(reservation);
    }

    public boolean contains(Reservation reservation) {
        return saved.contains(reservation);
    }
}
```

Le fake permet de tester un cas d'utilisation sans base de donnees.

# Test d'invariant

```java
@Test
void shouldRejectMovieWithoutTitle() {
    assertThrows(IllegalArgumentException.class, () -> {
        new Movie("", 120);
    });
}
```

# Test de transition

```java
@Test
void shouldNotCancelRefundedReservation() {
    Reservation reservation = confirmedReservation();
    reservation.refund();

    assertThrows(InvalidReservationStateException.class, reservation::cancel);
}
```

# Spy de notification

```java
public class SpyNotificationService implements NotificationService {
    private boolean confirmationSent;

    @Override
    public void reservationConfirmed(Reservation reservation) {
        confirmationSent = true;
    }

    public boolean confirmationWasSent() {
        return confirmationSent;
    }
}
```

Le spy verifie une interaction observable sans coupler le test a une bibliotheque externe.
