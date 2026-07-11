---
id: poo.module-11.examples
title: Exemples
---

# State

```java
public interface ReservationState {
    ReservationState confirm();
    ReservationState cancel();
}
```

```java
public class PendingState implements ReservationState {
    @Override
    public ReservationState confirm() {
        return new ConfirmedState();
    }

    @Override
    public ReservationState cancel() {
        return new CancelledState();
    }
}
```

# Adapter

```java
public class StripePaymentAdapter implements PaymentGateway {
    private final StripeClient client;

    public StripePaymentAdapter(StripeClient client) {
        this.client = client;
    }

    @Override
    public PaymentResult charge(PaymentMethod method, Money amount) {
        return client.createCharge(method.token(), amount.amount());
    }
}
```

Le domaine dépend de `PaymentGateway`, pas de Stripe.

# Observer pour les événements

```java
public interface ReservationListener {
    void onReservationConfirmed(Reservation reservation);
}
```

```java
public class ReservationNotifier {
    private final List<ReservationListener> listeners;

    public void confirmed(Reservation reservation) {
        for (ReservationListener listener : listeners) {
            listener.onReservationConfirmed(reservation);
        }
    }
}
```

Le cas d'utilisation n'a pas besoin de connaître tous les effets secondaires.

# Command

```java
public interface Command {
    void execute();
}
```

```java
public class CancelReservationCommand implements Command {
    private final Reservation reservation;

    public CancelReservationCommand(Reservation reservation) {
        this.reservation = reservation;
    }

    @Override
    public void execute() {
        reservation.cancel();
    }
}
```

Une commande peut être loggée, rejouée ou mise en file.

# Quand ne pas utiliser de pattern

Si une application a un seul tarif fixe, `StandardPricing` suffit. Ajouter une hiérarchie Strategy complète sans variation réelle alourdit le code.
