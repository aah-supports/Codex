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
