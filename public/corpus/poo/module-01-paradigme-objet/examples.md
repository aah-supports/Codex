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
