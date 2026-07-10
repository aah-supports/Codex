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

# Tell, Don't Ask

Version qui demande trop :

```java
if (reservation.getStatus().equals("PENDING")) {
    reservation.setStatus("CONFIRMED");
}
```

Version qui confie la decision :

```java
reservation.confirm();
```

L'objet peut maintenant proteger ses transitions.

# Feature Envy

```java
public class PricingService {
    public boolean isGroupBooking(Reservation reservation) {
        return reservation.getSeats().size() >= 5;
    }
}
```

La methode manipule surtout les donnees de `Reservation`. Elle envie une autre classe. Une meilleure conception :

```java
public class Reservation {
    public boolean isGroupBooking() {
        return seats.size() >= 5;
    }
}
```
