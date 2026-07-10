---
id: poo.module-04.examples
title: Exemples
---

# Classe qui fait trop

```java
public class ReservationService {
    public double calculatePrice(Reservation reservation) {
        return 12.0 * reservation.seatCount();
    }

    public void saveReservation(Reservation reservation) {
        // SQL
    }

    public void sendEmail(Reservation reservation) {
        // SMTP
    }
}
```

Cette classe melange tarification, persistance et notification.

# Responsabilites separees

```java
public interface PricingPolicy {
    Money priceFor(Reservation reservation);
}

public interface ReservationRepository {
    void save(Reservation reservation);
}

public interface NotificationService {
    void reservationConfirmed(Reservation reservation);
}
```

Les raisons de changer deviennent plus claires.
