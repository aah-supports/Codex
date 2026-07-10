# Cours complet de programmation orientée objet

La programmation orientée objet ne doit pas être enseignée uniquement comme une syntaxe composée de classes, d'attributs et de méthodes. Le véritable objectif est d'apprendre à **répartir correctement les responsabilités**, maîtriser les dépendances et produire un logiciel qui reste modifiable.
---

# 1. Bibliographie essentielle

## A. Fondements de la programmation orientée objet

### 1. Grady Booch et al. — *Object-Oriented Analysis and Design with Applications*

**Référence :**

Booch, Grady, Robert A. Maksimchuk, Michael W. Engle, Bobbi J. Young, Jim Conallen et Kelli A. Houston.
*Object-Oriented Analysis and Design with Applications*, 3e édition, Addison-Wesley, 2007.

C'est l'une des grandes références pour comprendre :

* l'abstraction ;
* les objets et les classes ;
* les responsabilités ;
* les collaborations entre objets ;
* l'analyse et la conception orientées objet ;
* le passage du besoin métier au modèle logiciel.

La troisième édition intègre notamment UML, Java, les composants, les patterns et le processus unifié. ([Pearson][1])

**Niveau :** intermédiaire à avancé.
**Usage pédagogique :** référence théorique du cours.

---

### 2. Bertrand Meyer — *Object-Oriented Software Construction*

Meyer, Bertrand.
*Object-Oriented Software Construction*, 2e édition, Prentice Hall, 1997.

Référence fondamentale pour :

* l'encapsulation ;
* l'héritage ;
* le polymorphisme ;
* les invariants ;
* la programmation par contrat ;
* le principe ouvert-fermé ;
* la robustesse des abstractions.

C'est un ouvrage exigeant, mais important pour comprendre que la POO ne consiste pas seulement à organiser du code dans des classes.

**Niveau :** avancé.

---

### 3. Alan Kay — textes et conférences sur Smalltalk

Références à rechercher :

* *The Early History of Smalltalk* ;
* conférences d'Alan Kay sur la programmation orientée objet ;
* travaux du Xerox PARC sur Smalltalk.

Alan Kay insiste sur une vision souvent oubliée de la POO : des objets autonomes qui communiquent par messages. Cette conception est différente d'une simple organisation du code autour de classes.

**Niveau :** historique et conceptuel.

---

### 4. Ole-Johan Dahl et Kristen Nygaard — Simula

Les travaux autour de **Simula 67** constituent l'un des fondements historiques des classes, objets, instances, héritage et méthodes virtuelles.

**Usage pédagogique :** introduction historique permettant d'expliquer pourquoi la POO est issue de la simulation de systèmes composés d'entités en interaction.

---

# 2. Conception orientée objet

## 5. Craig Larman — *Applying UML and Patterns*

Larman, Craig.
*Applying UML and Patterns: An Introduction to Object-Oriented Analysis and Design and Iterative Development*, 3e édition, Prentice Hall, 2004.

Très utile pour enseigner :

* les cas d'utilisation ;
* les diagrammes de séquence système ;
* les contrats d'opérations ;
* les diagrammes de classes ;
* les responsabilités ;
* les patterns GRASP ;
* la conception itérative.

Les patterns **GRASP** sont particulièrement importants :

* Information Expert ;
* Creator ;
* Controller ;
* Low Coupling ;
* High Cohesion ;
* Polymorphism ;
* Indirection ;
* Protected Variations ;
* Pure Fabrication.

**Niveau :** intermédiaire.
**Usage pédagogique :** probablement le meilleur ouvrage pour relier UML, analyse métier et code.

---

## 6. Rebecca Wirfs-Brock et Alan McKean — *Object Design*

Wirfs-Brock, Rebecca et Alan McKean.
*Object Design: Roles, Responsibilities, and Collaborations*, Addison-Wesley, 2002.

Ouvrage central pour la conception guidée par les responsabilités :

* quel objet doit connaître quelle information ?
* quel objet doit réaliser quelle opération ?
* comment les objets collaborent-ils ?
* comment éviter les classes omniscientes ?

Il introduit l'approche **Responsibility-Driven Design**.

**Niveau :** intermédiaire à avancé.

---

## 7. Sandi Metz — *Practical Object-Oriented Design*

Metz, Sandi.
*Practical Object-Oriented Design: An Agile Primer Using Ruby*, 2e édition, Addison-Wesley, 2018.

Malgré l'utilisation de Ruby, l'ouvrage est largement transposable à Java, Python, PHP, TypeScript ou C#. Il traite notamment :

* de la responsabilité unique ;
* de la gestion des dépendances ;
* des interfaces ;
* du duck typing ;
* de l'héritage ;
* de la composition ;
* des tests orientés objet.

La table des matières suit précisément cette progression, de la responsabilité d'une classe jusqu'aux tests et à la composition. ([O'Reilly Media][2])

**Niveau :** intermédiaire.
**Usage pédagogique :** excellente référence pratique.

---

## 8. Arthur J. Riel — *Object-Oriented Design Heuristics*

Riel, Arthur J.
*Object-Oriented Design Heuristics*, Addison-Wesley, 1996.

Cet ouvrage propose des règles concrètes permettant d'évaluer un modèle objet :

* limiter les responsabilités d'une classe ;
* éviter les classes centrales contrôlant tout le système ;
* surveiller les relations de dépendance ;
* préférer les objets spécialisés aux structures conditionnelles complexes.

**Niveau :** intermédiaire à avancé.

---

# 3. Design patterns

## 9. Erich Gamma, Richard Helm, Ralph Johnson et John Vlissides — *Design Patterns*

Gamma, Erich, Richard Helm, Ralph Johnson et John Vlissides.
*Design Patterns: Elements of Reusable Object-Oriented Software*, Addison-Wesley, 1994.

C'est le célèbre ouvrage du **Gang of Four**.

Il présente 23 patterns répartis en trois familles :

### Création

* Factory Method ;
* Abstract Factory ;
* Builder ;
* Prototype ;
* Singleton.

### Structure

* Adapter ;
* Bridge ;
* Composite ;
* Decorator ;
* Facade ;
* Flyweight ;
* Proxy.

### Comportement

* Chain of Responsibility ;
* Command ;
* Interpreter ;
* Iterator ;
* Mediator ;
* Memento ;
* Observer ;
* State ;
* Strategy ;
* Template Method ;
* Visitor.

L'ouvrage présente les patterns comme des solutions réutilisables à des problèmes récurrents de conception, en décrivant notamment leurs classes participantes, leurs responsabilités et leurs collaborations. ([informit.com][3])

**Niveau :** intermédiaire à avancé.

### Limite pédagogique

Il ne faut pas demander aux étudiants de mémoriser les 23 patterns. Ils doivent d'abord rencontrer un problème de conception, puis comprendre comment un pattern peut le résoudre.

---

## 10. Eric Freeman et Elisabeth Robson — *Head First Design Patterns*

Freeman, Eric et Elisabeth Robson.
*Head First Design Patterns*, 2e édition, O'Reilly, 2020.

Approche plus accessible que le Gang of Four. Le livre explique :

* quand employer un pattern ;
* pourquoi il est utile ;
* quelles conséquences il entraîne ;
* quels principes de conception il mobilise.

La deuxième édition met particulièrement en relation les patterns et les principes fondamentaux de conception orientée objet. ([O'Reilly Media][4])

**Niveau :** débutant avancé à intermédiaire.
**Usage pédagogique :** ouvrage recommandé aux étudiants.

---

## 11. Joshua Kerievsky — *Refactoring to Patterns*

Kerievsky, Joshua.
*Refactoring to Patterns*, Addison-Wesley, 2004.

L'intérêt de l'ouvrage est de ne pas introduire artificiellement les patterns. Il montre comment les faire émerger progressivement lors d'un refactoring.

**Niveau :** avancé.

---

# 4. Principes SOLID et architecture

## 12. Robert C. Martin — *Agile Software Development: Principles, Patterns, and Practices*

Martin, Robert C.
*Agile Software Development: Principles, Patterns, and Practices*, Prentice Hall, 2002.

Référence majeure pour les principes SOLID :

* **S** : Single Responsibility Principle ;
* **O** : Open/Closed Principle ;
* **L** : Liskov Substitution Principle ;
* **I** : Interface Segregation Principle ;
* **D** : Dependency Inversion Principle.

C'est une meilleure source théorique sur SOLID que les nombreux résumés trouvés en ligne.

**Niveau :** intermédiaire.

---

## 13. Robert C. Martin — *Clean Architecture*

Martin, Robert C.
*Clean Architecture: A Craftsman's Guide to Software Structure and Design*, Prentice Hall, 2017.

À utiliser pour prolonger la POO vers :

* les frontières architecturales ;
* la séparation métier/infrastructure ;
* les cas d'utilisation ;
* l'inversion des dépendances ;
* les entités métier ;
* les adaptateurs et contrôleurs.

L'ouvrage appartient à la collection de Robert C. Martin consacrée aux principes, pratiques et architectures logicielles. ([informit.com][5])

**Niveau :** intermédiaire à avancé.

---

## 14. Robert C. Martin — *Clean Code*

Martin, Robert C.
*Clean Code: A Handbook of Agile Software Craftsmanship*, 2e édition, Pearson/Addison-Wesley, 2025.

La deuxième édition aborde les pratiques de codage, les principes de conception, l'architecture, les tests et la responsabilité professionnelle. ([informit.com][6])

**Niveau :** débutant avancé à intermédiaire.

### Lecture critique indispensable

Cet ouvrage est influent, mais ses règles ne doivent pas être transformées en lois universelles. Par exemple :

* une fonction très courte n'est pas toujours plus lisible ;
* multiplier les petites classes peut fragmenter inutilement le système ;
* les commentaires ne sont pas toujours un échec ;
* le nombre idéal de paramètres dépend du contexte ;
* une abstraction prématurée peut être plus coûteuse qu'une duplication locale.

---

## 15. Steve McConnell — *Code Complete*

McConnell, Steve.
*Code Complete*, 2e édition, Microsoft Press, 2004.

Ouvrage généraliste particulièrement solide sur :

* la construction logicielle ;
* le nommage ;
* les classes ;
* les méthodes ;
* les conditions ;
* la gestion de la complexité ;
* les revues de code ;
* la qualité interne.

**Niveau :** débutant avancé à intermédiaire.

---

# 5. Refactoring et dette technique

## 16. Martin Fowler — *Refactoring*

Fowler, Martin.
*Refactoring: Improving the Design of Existing Code*, 2e édition, Addison-Wesley, 2018.

Fowler définit le refactoring comme une amélioration contrôlée de la conception d'un code existant par de petites transformations préservant son comportement. ([martinfowler.com][7])

Refactorings essentiels :

* Extract Function ;
* Extract Class ;
* Move Function ;
* Encapsulate Variable ;
* Replace Conditional with Polymorphism ;
* Replace Type Code with Subclasses ;
* Introduce Parameter Object ;
* Replace Inheritance with Delegation.

**Niveau :** intermédiaire.
**Usage pédagogique :** indispensable dans un cours sérieux de POO.

---

## 17. William C. Wake — *Refactoring Workbook*

Wake, William C.
*Refactoring Workbook*, Addison-Wesley, 2003.

Propose des exercices permettant d'identifier :

* les mauvaises odeurs du code ;
* les responsabilités mal réparties ;
* les duplications ;
* les dépendances problématiques ;
* les abstractions insuffisantes ou excessives.

---

## 18. Michael Feathers — *Working Effectively with Legacy Code*

Feathers, Michael.
*Working Effectively with Legacy Code*, Prentice Hall, 2004.

Référence majeure pour apprendre à modifier un code difficilement testable :

* création de points de rupture ;
* introduction d'interfaces ;
* extraction de dépendances ;
* tests de caractérisation ;
* sécurisation progressive du code historique.

**Niveau :** avancé.

---

# 6. Tests et conception orientée objet

## 19. Steve Freeman et Nat Pryce — *Growing Object-Oriented Software, Guided by Tests*

Freeman, Steve et Nat Pryce.
*Growing Object-Oriented Software, Guided by Tests*, Addison-Wesley, 2009.

Montre comment les tests peuvent guider :

* les interfaces ;
* les collaborations ;
* la responsabilité des objets ;
* l'architecture du système ;
* l'utilisation raisonnée des mocks.

**Niveau :** intermédiaire à avancé.

---

## 20. Kent Beck — *Test-Driven Development: By Example*

Beck, Kent.
*Test-Driven Development: By Example*, Addison-Wesley, 2002.

Référence pour la boucle :

1. écrire un test qui échoue ;
2. écrire le minimum de code ;
3. faire réussir le test ;
4. refactorer.

**Niveau :** intermédiaire.

---

## 21. Gerard Meszaros — *xUnit Test Patterns*

Meszaros, Gerard.
*xUnit Test Patterns: Refactoring Test Code*, Addison-Wesley, 2007.

Référence très complète sur les structures, défauts et patterns des tests automatisés.

**Niveau :** avancé.

---

# 7. Domain-Driven Design

## 22. Eric Evans — *Domain-Driven Design*

Evans, Eric.
*Domain-Driven Design: Tackling Complexity in the Heart of Software*, Addison-Wesley, 2003.

Référence centrale pour :

* le langage ubiquitaire ;
* les entités ;
* les objets-valeurs ;
* les agrégats ;
* les repositories ;
* les factories ;
* les services de domaine ;
* les bounded contexts ;
* la modélisation du métier.

L'objectif du DDD est d'aligner la conception du logiciel sur le modèle mental et les règles du domaine métier. ([informit.com][8])

**Niveau :** avancé.

---

## 23. Vaughn Vernon — *Implementing Domain-Driven Design*

Vernon, Vaughn.
*Implementing Domain-Driven Design*, Addison-Wesley, 2013.

Version plus directement opérationnelle du DDD, illustrée avec des exemples Java également transposables à C#. ([informit.com][9])

**Niveau :** avancé.

---

## 24. Vaughn Vernon — *Domain-Driven Design Distilled*

Vernon, Vaughn.
*Domain-Driven Design Distilled*, Addison-Wesley, 2016.

Introduction plus concise à :

* la conception stratégique ;
* les bounded contexts ;
* les sous-domaines ;
* les agrégats ;
* les événements de domaine.

**Niveau :** intermédiaire.

---

# 8. UML et modélisation

## 25. Object Management Group — *UML 2.5.1 Specification*

La spécification officielle UML décrit un langage graphique permettant de visualiser, spécifier, construire et documenter les systèmes logiciels orientés objet. La version formelle publiée par l'OMG est UML 2.5.1. ([OMG][10])

Pour un cours de POO, les diagrammes réellement utiles sont :

* diagramme de classes ;
* diagramme d'objets ;
* diagramme de séquence ;
* diagramme d'états ;
* diagramme de composants ;
* diagramme de packages.

Il n'est pas nécessaire d'enseigner toute la spécification UML.

---

## 26. Martin Fowler — *UML Distilled*

Fowler, Martin.
*UML Distilled: A Brief Guide to the Standard Object Modeling Language*, 3e édition, Addison-Wesley, 2003.

Référence synthétique et pragmatique pour apprendre à utiliser UML sans transformer le modèle en documentation bureaucratique.

**Niveau :** débutant à intermédiaire.

---

# 9. Références spécifiques par langage

## Java

### 27. Joshua Bloch — *Effective Java*

Bloch, Joshua.
*Effective Java*, 3e édition, Addison-Wesley, 2018.

Points majeurs :

* constructeurs statiques ;
* immutabilité ;
* composition plutôt qu'héritage ;
* interfaces ;
* généricité ;
* égalité des objets ;
* gestion des ressources ;
* exceptions.

---

### 28. Cay S. Horstmann — *Core Java*

Horstmann, Cay S.
*Core Java*, volumes I et II.

Bonne référence technique générale sur Java et son modèle objet.

---

## C#

### 29. Bill Wagner — *Effective C#*

Wagner, Bill.
*Effective C#: 50 Specific Ways to Improve Your C#*, Addison-Wesley.

---

### 30. Jon Skeet — *C# in Depth*

Skeet, Jon.
*C# in Depth*, Manning.

---

## Python

### 31. Luciano Ramalho — *Fluent Python*

Ramalho, Luciano.
*Fluent Python*, 2e édition, O'Reilly, 2022.

À utiliser pour comprendre :

* le modèle objet Python ;
* les protocoles ;
* les méthodes spéciales ;
* les dataclasses ;
* l'héritage multiple ;
* les interfaces implicites ;
* les objets fonctions.

---

### 32. Brett Slatkin — *Effective Python*

Slatkin, Brett.
*Effective Python*, Addison-Wesley.

---

## JavaScript et TypeScript

### 33. Kyle Simpson — *You Don't Know JS Yet*

Référence importante sur :

* les objets JavaScript ;
* les prototypes ;
* la délégation ;
* les closures ;
* `this` ;
* les classes comme sucre syntaxique.

---

### 34. Dan Vanderkam — *Effective TypeScript*

Vanderkam, Dan.
*Effective TypeScript*, O'Reilly.

---

### 35. Boris Cherny — *Programming TypeScript*

Cherny, Boris.
*Programming TypeScript*, O'Reilly.

---

# 10. Ordre de lecture recommandé

## Pour un étudiant débutant

1. *Head First Design Patterns* ;
2. *UML Distilled* ;
3. *Clean Code*, avec recul critique ;
4. *Refactoring* ;
5. *Effective Java* ou l'équivalent du langage choisi.

## Pour un développeur intermédiaire

1. *Practical Object-Oriented Design* ;
2. *Applying UML and Patterns* ;
3. *Refactoring* ;
4. *Design Patterns* ;
5. *Growing Object-Oriented Software, Guided by Tests*.

## Pour un développeur avancé

1. *Object-Oriented Software Construction* ;
2. *Object Design* ;
3. *Domain-Driven Design* ;
4. *Working Effectively with Legacy Code* ;
5. *Implementing Domain-Driven Design*.

---

# Programme détaillé du cours

## Cadre général

**Durée :** 12 séances de 3 h 30, soit 42 heures.
**Public :** étudiants connaissant déjà les variables, fonctions, conditions, boucles et collections.
**Langage principal recommandé :** Java.
**Projet fil rouge :** système de réservation d'un cinéma.

Le projet doit progressivement gérer :

* les films ;
* les salles ;
* les séances ;
* les clients ;
* les réservations ;
* les tarifs ;
* les paiements ;
* les annulations ;
* les notifications.

---

# Séance 1 — Comprendre le paradigme objet

## Objectifs

* distinguer paradigme procédural et paradigme objet ;
* comprendre les notions d'état, comportement et identité ;
* identifier des objets dans un domaine métier ;
* éviter de réduire un objet à une simple structure de données.

## Notions

* paradigme de programmation ;
* objet ;
* classe ;
* instance ;
* état ;
* comportement ;
* identité ;
* message ;
* responsabilité.

## Exemple

Approche procédurale :

```java
double calculateAccountBalance(
    double balance,
    double amount,
    String operation
) {
    if (operation.equals("deposit")) {
        return balance + amount;
    }

    if (operation.equals("withdraw")) {
        return balance - amount;
    }

    return balance;
}
```

Approche objet :

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

## Activité

À partir du domaine du cinéma, identifier :

* les objets ;
* leurs informations ;
* leurs comportements ;
* leurs collaborations.

## Exercice

Modéliser un `Movie`, une `Screening` et une `MovieTheater`.

## Point critique

Une classe ne doit pas nécessairement représenter un objet physique. Une règle tarifaire, une période ou une stratégie de paiement peuvent aussi devenir des objets.

---

# Séance 2 — Classes, objets et encapsulation

## Objectifs

* créer une classe cohérente ;
* contrôler son état interne ;
* utiliser les constructeurs ;
* protéger les invariants.

## Notions

* attributs ;
* méthodes ;
* visibilité ;
* constructeur ;
* encapsulation ;
* invariant ;
* getters et setters ;
* objets valides dès leur construction.

## Exemple problématique

```java
public class Movie {
    public String title;
    public int duration;
}
```

N'importe quel code peut produire :

```java
movie.duration = -500;
```

## Version encapsulée

```java
public class Movie {

    private final String title;
    private final int durationInMinutes;

    public Movie(String title, int durationInMinutes) {
        if (title == null || title.isBlank()) {
            throw new IllegalArgumentException("Title is required");
        }

        if (durationInMinutes <= 0) {
            throw new IllegalArgumentException(
                "Duration must be positive"
            );
        }

        this.title = title;
        this.durationInMinutes = durationInMinutes;
    }

    public String getTitle() {
        return title;
    }

    public int getDurationInMinutes() {
        return durationInMinutes;
    }
}
```

## TP

Créer :

* `Movie` ;
* `Room` ;
* `Customer` ;
* `Screening`.

Ajouter les règles de validité dans les constructeurs.

## Évaluation formative

Expliquer pourquoi ajouter automatiquement un setter pour chaque attribut peut casser l'encapsulation.

---

# Séance 3 — Relations entre objets

## Objectifs

* modéliser les relations ;
* distinguer association, agrégation et composition ;
* comprendre les multiplicités ;
* concevoir un graphe d'objets cohérent.

## Notions

* association ;
* composition ;
* agrégation ;
* dépendance ;
* navigabilité ;
* cardinalités ;
* diagramme de classes UML.

## Exemple

```java
public class Reservation {

    private final Customer customer;
    private final Screening screening;
    private final List<Seat> seats;

    public Reservation(
        Customer customer,
        Screening screening,
        List<Seat> seats
    ) {
        this.customer = customer;
        this.screening = screening;
        this.seats = new ArrayList<>(seats);
    }
}
```

## TP

Créer le diagramme de classes du cinéma :

* une salle possède des sièges ;
* une séance concerne un film et une salle ;
* une réservation concerne un client et plusieurs sièges.

## Difficulté conceptuelle

Déterminer qui contrôle le cycle de vie :

* un siège existe-t-il sans salle ?
* une réservation existe-t-elle sans séance ?
* un client existe-t-il indépendamment d'une réservation ?

---

# Séance 4 — Responsabilités, cohésion et couplage

## Objectifs

* attribuer correctement les responsabilités ;
* détecter une classe qui fait trop de choses ;
* réduire le couplage ;
* améliorer la cohésion.

## Notions

* responsabilité ;
* cohésion ;
* couplage ;
* Tell, Don't Ask ;
* Feature Envy ;
* God Object ;
* anémie du modèle métier ;
* principe de responsabilité unique.

## Mauvaise conception

```java
public class ReservationService {

    public double calculatePrice(Reservation reservation) {
        // ...
    }

    public void saveReservation(Reservation reservation) {
        // ...
    }

    public void sendEmail(Reservation reservation) {
        // ...
    }

    public String generatePdf(Reservation reservation) {
        // ...
    }
}
```

La classe mélange :

* règles tarifaires ;
* persistance ;
* communication ;
* génération de document.

## TP de refactoring

Répartir les responsabilités entre :

* `Reservation` ;
* `PricingPolicy` ;
* `ReservationRepository` ;
* `NotificationService` ;
* `TicketGenerator`.

## Question structurante

> Quel objet possède les informations nécessaires pour accomplir cette responsabilité ?

Introduction au pattern GRASP **Information Expert**.

---

# Séance 5 — Héritage, composition et polymorphisme

## Objectifs

* comprendre l'héritage ;
* utiliser le polymorphisme ;
* distinguer spécialisation et simple réutilisation ;
* privilégier la composition lorsque la relation « est un » n'est pas solide.

## Notions

* classe mère ;
* classe dérivée ;
* redéfinition ;
* substitution ;
* classe abstraite ;
* méthode abstraite ;
* composition ;
* délégation.

## Exemple avec polymorphisme

```java
public interface PricingPolicy {
    double calculatePrice(Screening screening);
}
```

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

## TP

Implémenter plusieurs politiques :

* tarif standard ;
* tarif étudiant ;
* tarif enfant ;
* majoration pour une séance 3D ;
* réduction le mercredi.

## Point critique

L'héritage ne doit pas être utilisé uniquement pour éviter de dupliquer quelques lignes. Il crée une dépendance forte entre la classe mère et ses sous-classes.

---

# Séance 6 — Interfaces et inversion des dépendances

## Objectifs

* concevoir une interface ;
* dépendre d'un contrat plutôt que d'une implémentation ;
* injecter une dépendance ;
* comprendre l'intérêt du découplage.

## Notions

* interface ;
* contrat ;
* implémentation ;
* injection par constructeur ;
* inversion de dépendance ;
* ports et adaptateurs ;
* testabilité.

## Exemple

```java
public interface ReservationRepository {
    void save(Reservation reservation);
}
```

```java
public class InMemoryReservationRepository
    implements ReservationRepository {

    private final List<Reservation> reservations =
        new ArrayList<>();

    @Override
    public void save(Reservation reservation) {
        reservations.add(reservation);
    }
}
```

```java
public class CreateReservationUseCase {

    private final ReservationRepository repository;

    public CreateReservationUseCase(
        ReservationRepository repository
    ) {
        this.repository = repository;
    }

    public void execute(Reservation reservation) {
        repository.save(reservation);
    }
}
```

## TP

Créer deux implémentations :

* stockage en mémoire ;
* stockage simulé dans une base de données.

Le cas d'utilisation ne doit pas dépendre de l'implémentation choisie.

---

# Séance 7 — Principes SOLID

## Objectifs

* connaître les cinq principes ;
* détecter leur violation ;
* comprendre qu'ils servent d'outils de diagnostic ;
* éviter leur application mécanique.

## Contenu

### SRP

Une unité de code doit avoir une raison cohérente de changer.

### OCP

Le système doit pouvoir être étendu sans modification excessive du code stable.

### LSP

Une sous-classe doit pouvoir remplacer sa classe de base sans modifier les propriétés attendues du programme.

### ISP

Un client ne doit pas dépendre d'opérations dont il n'a pas besoin.

### DIP

Les règles de haut niveau ne doivent pas dépendre directement des détails techniques.

## TP

Analyse d'un code contenant :

* une longue chaîne de `if` ;
* une interface trop large ;
* une classe fille qui lève une exception sur une méthode héritée ;
* une dépendance directe à MySQL ;
* une classe mélangeant facturation et envoi d'e-mails.

## Point critique

SOLID n'est pas une mesure automatique de qualité. Une architecture peut respecter formellement SOLID tout en étant inutilement abstraite et difficile à comprendre.

---

# Séance 8 — Exceptions, contrats et objets-valeurs

## Objectifs

* préserver les invariants ;
* distinguer erreur métier et erreur technique ;
* créer des objets-valeurs ;
* utiliser les exceptions avec discernement.

## Notions

* précondition ;
* postcondition ;
* invariant ;
* exception ;
* exception métier ;
* immutabilité ;
* égalité structurelle ;
* Value Object.

## Exemple d'objet-valeur

```java
public record Money(double amount, String currency) {

    public Money {
        if (amount < 0) {
            throw new IllegalArgumentException(
                "Amount cannot be negative"
            );
        }

        if (currency == null || currency.isBlank()) {
            throw new IllegalArgumentException(
                "Currency is required"
            );
        }
    }
}
```

## TP

Créer :

* `Money` ;
* `EmailAddress` ;
* `SeatNumber` ;
* `ScreeningPeriod`.

## Réflexion

Pourquoi remplacer un simple `String email` par un objet `EmailAddress` ?

---

# Séance 9 — Tests unitaires orientés objet

## Objectifs

* tester le comportement d'un objet ;
* distinguer état et interaction ;
* isoler les dépendances ;
* éviter les tests trop liés à l'implémentation.

## Notions

* test unitaire ;
* Arrange, Act, Assert ;
* fixture ;
* stub ;
* fake ;
* mock ;
* test de comportement ;
* test d'état ;
* double de test.

## Exemple

```java
@Test
void shouldApplyStudentPrice() {
    PricingPolicy pricing = new StudentPricing();

    double price = pricing.calculatePrice(screening);

    assertEquals(8.0, price);
}
```

## TP

Tester :

* une réservation valide ;
* l'impossibilité de réserver un siège déjà occupé ;
* une règle tarifaire ;
* l'annulation d'une réservation ;
* la sauvegarde avec un faux repository.

## Point critique

Un test qui vérifie chaque appel interne peut empêcher le refactoring. Il faut tester les comportements observables plutôt que reproduire l'implémentation dans le test.

---

# Séance 10 — Refactoring d'un code existant

## Objectifs

* repérer les code smells ;
* modifier une conception sans changer son comportement ;
* procéder par petites transformations ;
* utiliser les tests comme filet de sécurité.

## Code smells étudiés

* Long Method ;
* Large Class ;
* Duplicate Code ;
* Feature Envy ;
* Data Class ;
* Primitive Obsession ;
* Shotgun Surgery ;
* Divergent Change ;
* Switch Statements ;
* Message Chains ;
* Middle Man.

## Refactorings étudiés

* Extract Method ;
* Extract Class ;
* Move Method ;
* Introduce Parameter Object ;
* Encapsulate Collection ;
* Replace Conditional with Polymorphism ;
* Replace Primitive with Object ;
* Replace Inheritance with Delegation.

## TP

Refactorer une méthode unique qui :

1. vérifie la disponibilité des sièges ;
2. calcule le tarif ;
3. enregistre la réservation ;
4. débite le client ;
5. envoie un e-mail ;
6. imprime le billet.

---

# Séance 11 — Design patterns utiles

## Objectifs

* reconnaître un problème récurrent ;
* choisir un pattern pour une raison précise ;
* mesurer son coût ;
* éviter le pattern inutile.

## Patterns étudiés

### Strategy

Pour les tarifs, paiements ou politiques d'annulation.

### Factory Method

Pour centraliser certaines créations complexes.

### Observer

Pour publier un événement de réservation.

### Adapter

Pour intégrer une API externe de paiement.

### Decorator

Pour enrichir dynamiquement une fonctionnalité.

### State

Pour représenter l'état d'une réservation :

* en attente ;
* confirmée ;
* annulée ;
* remboursée.

### Command

Pour représenter une action exécutable.

## TP

Implémenter au minimum :

* Strategy pour le calcul du prix ;
* Adapter pour un prestataire de paiement ;
* Observer pour la notification ;
* State pour le cycle de vie d'une réservation.

## Point critique

Le pattern doit répondre à une tension réelle. Ajouter une factory, trois interfaces et quatre classes pour construire un objet simple est une dégradation, pas une amélioration.

---

# Séance 12 — Modèle métier et architecture finale

## Objectifs

* séparer domaine, application et infrastructure ;
* construire un modèle métier cohérent ;
* produire une architecture testable ;
* défendre ses choix de conception.

## Organisation proposée

```text
src/
├── domain/
│   ├── model/
│   ├── pricing/
│   ├── repository/
│   └── exception/
├── application/
│   ├── create_reservation/
│   ├── cancel_reservation/
│   └── list_screenings/
├── infrastructure/
│   ├── persistence/
│   ├── payment/
│   └── notification/
└── presentation/
    └── controller/
```

## Travail final

Les étudiants doivent :

1. terminer le système de réservation ;
2. produire un diagramme de classes limité au domaine ;
3. produire deux diagrammes de séquence ;
4. écrire les tests ;
5. documenter trois décisions de conception ;
6. identifier une mauvaise conception abandonnée ;
7. présenter un refactoring significatif ;
8. justifier l'utilisation ou l'absence de chaque pattern.

---

# Projet fil rouge détaillé

## Fonctionnalité 1 — Gestion des films

* créer un film ;
* définir sa durée ;
* définir sa classification ;
* empêcher une durée négative.

## Fonctionnalité 2 — Programmation des séances

* associer un film à une salle ;
* indiquer une date ;
* détecter un chevauchement ;
* calculer l'heure de fin.

## Fonctionnalité 3 — Réservation

* choisir une séance ;
* sélectionner plusieurs sièges ;
* vérifier leur disponibilité ;
* calculer le prix total ;
* confirmer la réservation.

## Fonctionnalité 4 — Tarification

* plein tarif ;
* étudiant ;
* enfant ;
* séance 3D ;
* réduction hebdomadaire ;
* code promotionnel.

## Fonctionnalité 5 — Paiement

* paiement par carte ;
* paiement refusé ;
* remboursement ;
* adaptation à un prestataire externe.

## Fonctionnalité 6 — Cycle de vie

```text
PENDING → CONFIRMED → CANCELLED
                   ↘ REFUNDED
```

## Fonctionnalité 7 — Notifications

* confirmation ;
* annulation ;
* remboursement ;
* changement de salle.

---

# Modalités pédagogiques recommandées

Pour chaque séance de 3 h 30 :

|  Durée | Activité                              |
| -----: | ------------------------------------- |
| 20 min | rappel et question de départ          |
| 40 min | présentation conceptuelle             |
| 30 min | analyse collective d'un mauvais code  |
| 60 min | exercice guidé                        |
| 10 min | pause                                 |
| 60 min | TP autonome                           |
| 20 min | correction et justification des choix |
| 10 min | synthèse                              |

Le cours doit consacrer autant de temps à **l'analyse du mauvais code** qu'à l'écriture de nouvelles classes. Les étudiants progressent lorsqu'ils doivent expliquer pourquoi une responsabilité est mal placée, pas seulement lorsqu'ils savent écrire `extends`.

---

# Évaluation proposée

## Contrôle continu — 40 %

### Exercices individuels — 20 %

* encapsulation ;
* relations ;
* polymorphisme ;
* interfaces ;
* tests.

### Refactoring — 20 %

À partir d'un code volontairement mal conçu :

* identifier les problèmes ;
* proposer une stratégie ;
* refactorer ;
* préserver les comportements ;
* justifier les transformations.

## Projet final — 50 %

| Critère                         | Points |
| ------------------------------- | -----: |
| Modèle métier et invariants     |     10 |
| Répartition des responsabilités |     10 |
| Encapsulation                   |      5 |
| Couplage et cohésion            |      5 |
| Polymorphisme et interfaces     |      5 |
| Tests                           |      5 |
| Refactoring                     |      5 |
| Justification des choix         |      5 |

## Soutenance — 10 %

Questions possibles :

* pourquoi cette responsabilité appartient-elle à cette classe ?
* pourquoi utiliser une interface ici ?
* que se passe-t-il si le moyen de paiement change ?
* cette relation est-elle réellement un héritage ?
* quel est le coût de ce pattern ?
* quelle partie du modèle est métier ?
* quel invariant l'objet protège-t-il ?

---

# Compétences finales attendues

À la fin du cours, l'étudiant doit pouvoir :

1. distinguer objet, classe, instance, état et comportement ;
2. créer des objets qui protègent leurs invariants ;
3. répartir les responsabilités ;
4. concevoir des collaborations entre objets ;
5. utiliser l'héritage sans en abuser ;
6. privilégier la composition lorsque nécessaire ;
7. utiliser le polymorphisme pour supprimer des conditions répétitives ;
8. concevoir des interfaces cohérentes ;
9. maîtriser les dépendances ;
10. appliquer SOLID avec discernement ;
11. lire et produire des diagrammes UML utiles ;
12. écrire des tests unitaires ;
13. reconnaître les principales mauvaises odeurs ;
14. refactorer sans modifier le comportement ;
15. appliquer quelques patterns utiles ;
16. séparer le métier des détails techniques ;
17. argumenter ses choix de conception.

Le point central du cours peut être résumé ainsi :

> Une bonne conception orientée objet ne se mesure pas au nombre de classes, mais à la facilité avec laquelle le logiciel peut évoluer sans propager les modifications dans tout le système.

[1]: https://www.pearson.com/en-us/subject-catalog/p/object-oriented-analysis-and-design-with-applications/P200000000143/9780132797443?srsltid=AfmBOooWmS_jRAW3aaCG0m6RVirf1LDLjtv2RrDRO9g6GJYai0fabASW&utm_source=chatgpt.com "Object-Oriented Analysis and Design with Applications"
[2]: https://www.oreilly.com/library/view/practical-object-oriented-design/9780134445588/?utm_source=chatgpt.com "Practical Object-Oriented Design: An Agile Primer Using ..."
[3]: https://www.informit.com/articles/article.aspx?p=1327762&utm_source=chatgpt.com "Why We Wrote Design Patterns: Elements of Reusable Object ..."
[4]: https://www.oreilly.com/library/view/head-first-design/9781492077992/?utm_source=chatgpt.com "Head First Design Patterns, 2nd Edition [Book]"
[5]: https://www.informit.com/imprint/series_detail.aspx?ser=348084&sorttype=0&utm_source=chatgpt.com "The Robert C. Martin Series"
[6]: https://www.informit.com/imprint/series_detail.aspx?ser=348084&utm_source=chatgpt.com "Robert C. Martin Series"
[7]: https://martinfowler.com/articles/refactoring-2nd-ed.html?utm_source=chatgpt.com "The Second Edition of \"Refactoring\""
[8]: https://www.informit.com/store/domain-driven-design-tackling-complexity-in-the-heart-9780321125217?utm_source=chatgpt.com "Domain-Driven Design: Tackling Complexity in the Heart of ..."
[9]: https://www.informit.com/store/implementing-domain-driven-design-9780133039894?utm_source=chatgpt.com "Implementing Domain-Driven Design"
[10]: https://www.omg.org/spec/UML/2.5.1/About-UML?utm_source=chatgpt.com "About the Unified Modeling Language Specification ..."
