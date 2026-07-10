---
id: poo.module-07.examples
title: Exemples
---

# Violation OCP

```java
public double priceFor(Customer customer) {
    if (customer.type().equals("STUDENT")) {
        return 8.0;
    }

    if (customer.type().equals("CHILD")) {
        return 6.0;
    }

    return 12.0;
}
```

Chaque nouveau type modifie la meme methode.

# Extension par polymorphisme

```java
public interface PricingPolicy {
    double priceFor(Customer customer);
}
```

Ajouter une politique revient a ajouter une classe, pas a modifier la chaine de conditions stable.

# Violation ISP

```java
public interface CinemaDevice {
    void printTicket();
    void scanTicket();
    void sendEmail();
}
```

Une imprimante de tickets ne devrait pas dependre de `sendEmail`.

Separation :

```java
public interface TicketPrinter {
    void printTicket(Ticket ticket);
}

public interface TicketScanner {
    ScanResult scan(Ticket ticket);
}

public interface EmailSender {
    void send(Email email);
}
```

# Violation LSP

```java
public class CancelledReservation extends Reservation {
    @Override
    public void confirm() {
        throw new IllegalStateException("Cannot confirm");
    }
}
```

Si `confirm` n'a plus de sens, l'heritage est probablement un mauvais modele. Un pattern State ou une composition peut mieux exprimer le cycle de vie.
