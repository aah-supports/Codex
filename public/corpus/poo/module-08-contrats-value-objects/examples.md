---
id: poo.module-08.examples
title: Exemples
---

# Objet-valeur

```java
public record Money(double amount, String currency) {
    public Money {
        if (amount < 0) {
            throw new IllegalArgumentException("Amount cannot be negative");
        }

        if (currency == null || currency.isBlank()) {
            throw new IllegalArgumentException("Currency is required");
        }
    }
}
```

# Email valide

```java
public record EmailAddress(String value) {
    public EmailAddress {
        if (value == null || !value.contains("@")) {
            throw new IllegalArgumentException("Invalid email");
        }
    }
}
```

Le type porte la validation. Le reste du code n'a plus a manipuler un simple `String` ambigu.

# Operation sur Money

```java
public record Money(double amount, String currency) {
    public Money add(Money other) {
        if (!currency.equals(other.currency)) {
            throw new IllegalArgumentException("Cannot add different currencies");
        }

        return new Money(amount + other.amount, currency);
    }
}
```

La regle de devise appartient a `Money`, pas au service de reservation.

# SeatNumber

```java
public record SeatNumber(int row, int number) {
    public SeatNumber {
        if (row <= 0 || number <= 0) {
            throw new IllegalArgumentException("Seat coordinates must be positive");
        }
    }

    public String label() {
        return row + "-" + number;
    }
}
```

Le code ne manipule plus des chaines comme `"A12"` sans validation.

# Exception metier

```java
public class SeatAlreadyReservedException extends RuntimeException {
    public SeatAlreadyReservedException(SeatNumber seatNumber) {
        super("Seat already reserved: " + seatNumber.label());
    }
}
```
