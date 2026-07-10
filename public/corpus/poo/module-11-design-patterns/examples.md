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

Le domaine depend de `PaymentGateway`, pas de Stripe.
