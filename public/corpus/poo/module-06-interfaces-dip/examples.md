---
id: poo.module-06.examples
title: Exemples
tags:
  - exemple
  - anti-pattern
  - interface
  - contrat
  - dip
summaryTags:
  - exemple
  - anti-pattern
---

# Port

```java
public interface ReservationRepository {
    void save(Reservation reservation);
}
```

# Adaptateur en mémoire

```java
public class InMemoryReservationRepository implements ReservationRepository {
    private final List<Reservation> reservations = new ArrayList<>();

    @Override
    public void save(Reservation reservation) {
        reservations.add(reservation);
    }
}
```

# Cas d'utilisation

```java
public class CreateReservationUseCase {
    private final ReservationRepository repository;

    public CreateReservationUseCase(ReservationRepository repository) {
        this.repository = repository;
    }

    public void execute(Reservation reservation) {
        repository.save(reservation);
    }
}
```

Le cas d'utilisation dépend d'une abstraction.

# Mauvais couplage

```java
public class CreateReservationUseCase {
    private final MySqlReservationRepository repository = new MySqlReservationRepository();

    public void execute(Reservation reservation) {
        repository.save(reservation);
    }
}
```

Le cas d'utilisation decide lui-même du stockage. Il devient plus difficile à tester et à deployer dans un autre contexte.

# Injection explicite

```java
public class CreateReservationUseCase {
    private final ReservationRepository repository;
    private final PaymentGateway paymentGateway;

    public CreateReservationUseCase(
        ReservationRepository repository,
        PaymentGateway paymentGateway
    ) {
        this.repository = repository;
        this.paymentGateway = paymentGateway;
    }
}
```

Le constructeur documente les besoins reels du cas d'utilisation.

# Adapter de paiement

```java
public class FakePaymentGateway implements PaymentGateway {
    @Override
    public PaymentResult charge(PaymentMethod method, Money amount) {
        return PaymentResult.accepted();
    }
}
```

Cette implémentation permet de travailler avant l'integration d'un vrai prestataire.
