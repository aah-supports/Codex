---
id: poo.module-01.examples
title: Exemples
tags:
  - exemple
  - anti-pattern
  - objet
  - classe
  - responsabilite
summaryTags:
  - exemple
  - anti-pattern
---

# Mauvais départ

```java
double calculateAccountBalance(double balance, double amount, String opération) {
    if (opération.equals("deposit")) {
        return balance + amount;
    }

    if (opération.equals("withdraw")) {
        return balance - amount;
    }

    return balance;
}
```

Le code connaît l'opération sous forme de chaîne et ne protège pas vraiment le compte.

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

La responsabilité se rapproche de l'objet concerné.

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

La réservation porte déjà une information utile : le nombre de sièges. La tarification pourra ensuite collaborer avec elle.

Point pédagogique : ne cherche pas encore l'architecture parfaite. Le premier pas est de faire apparaître les concepts du domaine.
