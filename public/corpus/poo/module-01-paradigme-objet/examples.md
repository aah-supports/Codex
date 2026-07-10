---
id: poo.module-01.examples
title: Exemples
---

# Mauvais depart

```java
double calculateAccountBalance(double balance, double amount, String operation) {
    if (operation.equals("deposit")) {
        return balance + amount;
    }

    if (operation.equals("withdraw")) {
        return balance - amount;
    }

    return balance;
}
```

Le code connait l'operation sous forme de chaine et ne protege pas vraiment le compte.

# Version objet

```java
public class BankAccount {
    private double balance;

    public void deposit(double amount) {
        balance += amount;
    }

    public void withdraw(double amount) {
        balance -= amount;
    }

    public double getBalance() {
        return balance;
    }
}
```

La responsabilite se rapproche de l'objet concerne.

# Exemple fil rouge : reservation de cinema

Version procedurale fragile :

```java
double calculateTotalPrice(int seatCount, String customerType, boolean is3D) {
    double unitPrice = 12.0;

    if (customerType.equals("STUDENT")) {
        unitPrice = 8.0;
    }

    if (customerType.equals("CHILD")) {
        unitPrice = 6.0;
    }

    if (is3D) {
        unitPrice += 3.0;
    }

    return unitPrice * seatCount;
}
```

Ce code fonctionne, mais il concentre les decisions. Chaque nouveau tarif modifie la meme fonction.

Premiere lecture objet :

```java
public class Reservation {
    private final Customer customer;
    private final Screening screening;
    private final List<Seat> seats;

    public int seatCount() {
        return seats.size();
    }
}
```

La reservation porte deja une information utile : le nombre de sieges. La tarification pourra ensuite collaborer avec elle.

Point pedagogique : ne cherche pas encore l'architecture parfaite. Le premier pas est de faire apparaitre les concepts du domaine.
