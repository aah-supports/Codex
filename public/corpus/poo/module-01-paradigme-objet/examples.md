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

Le code connait l'operation sous forme de chaîne et ne protège pas vraiment le compte.

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

La responsabilité se rapproche de l'objet concerne.

# Exemple fil rouge : réservation de cinéma

Version procédurale fragile :

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

Ce code fonctionne, mais il concentre les décisions. Chaque nouveau tarif modifie la même fonction.

Première lecture objet :

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

La réservation porte dejà une information utile : le nombre de sièges. La tarification pourra ensuite collaborer avec elle.

Point pédagogique : ne cherche pas encore l'architecture parfaite. Le premier pas est de faire apparaitre les concepts du domaine.
