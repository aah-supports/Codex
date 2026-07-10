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
