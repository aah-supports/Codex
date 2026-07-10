---
id: poo.module-06.lesson
title: Interfaces et inversion des dépendances
tags:
  - interface
  - dip
  - injection
---

# Interfaces et inversion des dépendances

Une interface exprime un contrat. Elle permet au code métier de dépendre de ce qu'il attend, pas d'un detail technique.

L'inversion des dépendances dit que les règles importantes ne doivent pas connaître directement les détails instables : basé de données, API externe, SMTP, console, framework.

## Injection par constructeur

Une dépendance importante doit être visible dans le constructeur. Cela rend l'objet plus honnété et plus testable.

## Ports et adaptateurs

Le domaine ou l'application définit un port, par exemple `ReservationRepository`. L'infrastructure fournit un adaptateur, par exemple `InMemoryReservationRepository` ou `SqlReservationRepository`.

Cette separation permet de changer le stockage sans modifier le cas d'utilisation.

## Interface utile ou inutile ?

Une interface est utile quand elle stabilise une attente et cache une variation.

Bonne raison :

- plusieurs implémentations existent ou sont probables ;
- on veut tester sans infrastructure ;
- on veut isoler un service externe ;
- le domaine ne doit pas connaître le detail technique.

Mauvaise raison :

- "une classe doit toujours avoir son interface" ;
- "SOLID dit de mettre des interfaces partout" ;
- "on verra peut-être un jour".

## Frontière de dépendance

Le cas d'utilisation `CreateReservationUseCase` est important. Il doit connaître les concepts métier et les contrats nécessaires. Il ne doit pas connaître `MySqlConnection`, `StripeClient` ou `SmtpTransport`.

Cela ne supprime pas la complexité. Cela la place dans les adaptateurs, là où elle peut changer sans contaminer le cœur.

## Testabilité

Une dépendance injectee permet un test simple :

```java
ReservationRepository repository = new InMemoryReservationRepository();
CreateReservationUseCase useCase = new CreateReservationUseCase(repository);
```

Le test n'a pas besoin de basé de données. Il vérifie le comportement du cas d'utilisation.
