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

# Package domaine

```java
package cinema.domain.reservation;

public class Reservation {
    private final ReservationId id;
    private final Customer customer;
    private final Screening screening;
    private ReservationState state;

    public void confirm() {
        state = state.confirm();
    }
}
```

Le domaine parle de reservation, client, seance et etat. Il ne parle pas de SQL.

# Package infrastructure

```java
package cinema.infrastructure.persistence;

public class SqlReservationRepository implements ReservationRepository {
    private final DataSource dataSource;

    @Override
    public void save(Reservation reservation) {
        // mapping SQL
    }
}
```

L'infrastructure adapte le domaine a une technologie.

# Controller mince

```java
public class ReservationController {
    private final CreateReservationUseCase useCase;

    public HttpResponse create(CreateReservationHttpRequest request) {
        CreateReservationCommand command = mapper.toCommand(request);
        Reservation reservation = useCase.execute(command);
        return HttpResponse.created(mapper.toResponse(reservation));
    }
}
```

Le controller traduit. Il ne porte pas la regle metier.
