---
id: poo.module-02.examples
title: Exemples
---

# Probleme

```java
public class Movie {
    public String title;
    public int duration;
}
```

Ce code permet `movie.duration = -500`.

# Version encapsulee

```java
public class Movie {
    private final String title;
    private final int durationInMinutes;

    public Movie(String title, int durationInMinutes) {
        if (title == null || title.isBlank()) {
            throw new IllegalArgumentException("Title is required");
        }

        if (durationInMinutes <= 0) {
            throw new IllegalArgumentException("Duration must be positive");
        }

        this.title = title;
        this.durationInMinutes = durationInMinutes;
    }
}
```

# Version avec intention metier

```java
public class Screening {
    private final Movie movie;
    private final Room room;
    private final LocalDateTime startsAt;

    public Screening(Movie movie, Room room, LocalDateTime startsAt) {
        if (movie == null) {
            throw new IllegalArgumentException("Movie is required");
        }

        if (room == null) {
            throw new IllegalArgumentException("Room is required");
        }

        if (startsAt == null || startsAt.isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("Screening must be planned in the future");
        }

        this.movie = movie;
        this.room = room;
        this.startsAt = startsAt;
    }

    public LocalDateTime endsAt() {
        return startsAt.plusMinutes(movie.durationInMinutes());
    }
}
```

La methode `endsAt` evite de recalculer la fin de seance partout. L'objet porte une connaissance utile.

# Exemple de setter remplace

Faible :

```java
reservation.setCancelled(true);
```

Meilleur :

```java
reservation.cancel();
```

Encore meilleur si la regle existe :

```java
reservation.cancelAt(LocalDateTime cancellationDate);
```

Le nom de la methode doit raconter l'action metier.
