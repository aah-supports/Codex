---
id: poo.module-07.exercises
title: Exercices
---

# Exercice guide

Associer chaque problème à un principe SOLID :

- classe qui facture et envoie des emails ;
- longue chaîne de `if` pour les tarifs ;
- sous-classe qui lance une exception sur une méthode héritée ;
- interface `Machine` avec `print`, `scan`, `fax` pour toutes les imprimantes ;
- cas d'utilisation qui instancie directement une classe MySQL.

# Exercice autonome

Refactorer un exemple de tarification pour appliquer OCP sans ajouter d'abstraction inutile.

# Atelier progressif

## Niveau 1

Pour chaque extrait, nommer le principe concerné et la douleur concrète :

```java
public class ReservationService {
    void save() { }
    void sendEmail() { }
    void calculatePrice() { }
}
```

```java
public interface Worker {
    void work();
    void eat();
}
```

```java
public class UseCase {
    private final MySqlRepository repository = new MySqlRepository();
}
```

## Niveau 2

Refactorer uniquement ce qui fait mal. Ne pas ajouter d'interface si une classe concrète suffit pour le moment.

## Niveau 3

Comparer deux versions :

- une version simple mais couplée ;
- une version abstraite mais plus extensible.

Dire dans quel contexte chaque version est acceptable.

## Critère de réussite

La justification doit mentionner un changement futur concret, pas seulement "c'est plus propre".
