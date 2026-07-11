---
id: poo.module-03.examples
title: Exemples
---

# Composition d'une salle

```java
public class Room {
    private final String name;
    private final List<Seat> seats;

    public Room(String name, List<Seat> seats) {
        if (seats.isEmpty()) {
            throw new IllegalArgumentException("A room needs seats");
        }

        this.name = name;
        this.seats = List.copyOf(seats);
    }
}
```

La salle protège sa liste de sièges avec `List.copyOf`.

# Association dans une réservation

```java
public class Reservation {
    private final Customer customer;
    private final Screening screening;
    private final List<Seat> seats;

    public Reservation(Customer customer, Screening screening, List<Seat> seats) {
        this.customer = customer;
        this.screening = screening;
        this.seats = List.copyOf(seats);
    }
}
```

La réservation relie plusieurs objets, mais elle ne doit pas tout savoir faire.

# Chevauchement de séances

```java
public class Screening {
    private final Movie movie;
    private final Room room;
    private final LocalDateTime startsAt;

    public boolean overlaps(Screening other) {
        if (!room.equals(other.room)) {
            return false;
        }

        return startsAt.isBefore(other.endsAt()) && other.startsAt.isBefore(endsAt());
    }

    public LocalDateTime endsAt() {
        return startsAt.plusMinutes(movie.durationInMinutes());
    }
}
```

La relation entre `Screening`, `Movie` et `Room` permet d'exprimer une vraie règle : deux séances dans la même salle ne doivent pas se chevaucher.

# Mauvaise relation

```java
public class Movie {
    private List<Reservation> reservations;
}
```

Un film n'a pas besoin de connaître les réservations. Cette relation ajoute du couplage sans porter une règle naturelle du domaine.
