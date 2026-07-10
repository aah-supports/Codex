---
id: poo.module-12.examples
title: Exemples
---

# Cas d'utilisation

```java
public class CreateReservationUseCase {
    private final ReservationRepository repository;
    private final PaymentGateway paymentGateway;
    private final PricingPolicy pricingPolicy;

    public Reservation execute(CreateReservationCommand command) {
        Reservation reservation = Reservation.create(command.customer(), command.screening(), command.seats());
        Money price = pricingPolicy.priceFor(reservation);
        paymentGateway.charge(command.paymentMethod(), price);
        repository.save(reservation.confirm());
        return reservation;
    }
}
```

# Decision de conception

```text
Decision: dependance vers PaymentGateway et non StripeClient.
Raison: le paiement externe est un detail instable.
Consequence: il faut ecrire un adapter, mais les tests et le domaine restent simples.
```
