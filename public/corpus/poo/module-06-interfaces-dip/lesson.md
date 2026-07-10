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
