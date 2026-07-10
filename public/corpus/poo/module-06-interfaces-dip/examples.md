---
id: poo.module-06.examples
title: Exemples
---

# Port

```java
public interface ReservationRepository {
    void save(Reservation reservation);
}
```

# Adaptateur en memoire

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

Le cas d'utilisation depend d'une abstraction.
