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

# Explosion par heritage

```java
public class StudentPricing3DWednesday extends StudentPricing3D {
    // Que se passe-t-il si on ajoute les codes promo ?
}
```

Cette hierarchie devient vite artificielle. Elle encode des combinaisons dans les noms de classes.

# Composition de politiques

```java
public class ThreeDSurcharge implements PricingPolicy {
    private final PricingPolicy base;

    public ThreeDSurcharge(PricingPolicy base) {
        this.base = base;
    }

    @Override
    public double calculatePrice(Screening screening) {
        return base.calculatePrice(screening) + 3.0;
    }
}
```

On peut envelopper une politique existante au lieu de creer une nouvelle branche d'heritage.

# Substitution cassee

```java
public class ReadOnlyReservation extends Reservation {
    @Override
    public void cancel() {
        throw new UnsupportedOperationException();
    }
}
```

Si le code client attend qu'une `Reservation` puisse etre annulee, cette sous-classe casse le contrat implicite.
