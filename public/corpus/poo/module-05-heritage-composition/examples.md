---
id: poo.module-05.examples
title: Exemples
---

# Contrat

```java
public interface PricingPolicy {
    double calculatePrice(Screening screening);
}
```

# Implementations

```java
public class StandardPricing implements PricingPolicy {
    @Override
    public double calculatePrice(Screening screening) {
        return 12.0;
    }
}
```

```java
public class StudentPricing implements PricingPolicy {
    @Override
    public double calculatePrice(Screening screening) {
        return 8.0;
    }
}
```

Le code client depend du contrat `PricingPolicy`, pas des classes concretes.
