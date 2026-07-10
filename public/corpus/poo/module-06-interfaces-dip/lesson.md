---
id: poo.module-06.lesson
title: Interfaces et inversion des dependances
tags:
  - interface
  - dip
  - injection
---

# Interfaces et inversion des dependances

Une interface exprime un contrat. Elle permet au code metier de dependre de ce qu'il attend, pas d'un detail technique.

L'inversion des dependances dit que les regles importantes ne doivent pas connaitre directement les details instables : base de donnees, API externe, SMTP, console, framework.

## Injection par constructeur

Une dependance importante doit etre visible dans le constructeur. Cela rend l'objet plus honnete et plus testable.

## Ports et adaptateurs

Le domaine ou l'application definit un port, par exemple `ReservationRepository`. L'infrastructure fournit un adaptateur, par exemple `InMemoryReservationRepository` ou `SqlReservationRepository`.

Cette separation permet de changer le stockage sans modifier le cas d'utilisation.

## Interface utile ou inutile ?

Une interface est utile quand elle stabilise une attente et cache une variation.

Bonne raison :

- plusieurs implementations existent ou sont probables ;
- on veut tester sans infrastructure ;
- on veut isoler un service externe ;
- le domaine ne doit pas connaitre le detail technique.

Mauvaise raison :

- "une classe doit toujours avoir son interface" ;
- "SOLID dit de mettre des interfaces partout" ;
- "on verra peut-etre un jour".

## Frontiere de dependance

Le cas d'utilisation `CreateReservationUseCase` est important. Il doit connaitre les concepts metier et les contrats necessaires. Il ne doit pas connaitre `MySqlConnection`, `StripeClient` ou `SmtpTransport`.

Cela ne supprime pas la complexite. Cela la place dans les adaptateurs, la ou elle peut changer sans contaminer le coeur.

## Testabilite

Une dependance injectee permet un test simple :

```java
ReservationRepository repository = new InMemoryReservationRepository();
CreateReservationUseCase useCase = new CreateReservationUseCase(repository);
```

Le test n'a pas besoin de base de donnees. Il verifie le comportement du cas d'utilisation.
