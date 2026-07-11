---
id: poo.module-06.lesson
title: Interfaces et inversion des dépendances
tags:
  - def
  - important
---

# Interfaces et inversion des dépendances

Une interface exprime un contrat. Elle permet au code métier de dépendre de ce qu'il attend, pas d'un détail technique.

Un contrat décrit ce qu'un objet promet de faire, sans dire comment il le fait.

Exemple : `ReservationRepository` promet de sauvegarder une réservation. Le cas d'utilisation n'a pas besoin de savoir si la sauvegarde se fait en mémoire, en SQL ou dans un fichier.

L'inversion des dépendances dit que les règles importantes ne doivent pas connaître directement les détails instables : base de données, API externe, SMTP, console, framework.

La raison est simple : ces détails changent souvent. Une base de données peut être remplacée, une API de paiement peut changer, un système d'email peut être externalisé. Les règles métier doivent survivre à ces changements.

## Injection par constructeur

Une dépendance est un objet dont une classe a besoin pour travailler.

Une dépendance importante doit être visible dans le constructeur. Cela rend l'objet plus honnête : on voit immédiatement ce dont il a besoin.

Cela le rend aussi plus testable, car le test peut fournir une fausse implémentation.

## Ports et adaptateurs

Un port est une interface placée du côté du cœur applicatif. Elle décrit un besoin.

Un adaptateur est une classe placée du côté technique. Elle branche ce besoin sur une technologie réelle.

Le domaine ou l'application définit un port, par exemple `ReservationRepository`. L'infrastructure fournit un adaptateur, par exemple `InMemoryReservationRepository` ou `SqlReservationRepository`.

Cette séparation permet de changer le stockage sans modifier le cas d'utilisation.

## Interface utile ou inutile ?

Une interface est utile quand elle stabilise une attente et cache une variation.

Bonne raison :

- plusieurs implémentations existent ou sont probables ;
- on veut tester sans infrastructure ;
- on veut isoler un service externe ;
- le domaine ne doit pas connaître le détail technique.

Mauvaise raison :

- "une classe doit toujours avoir son interface" ;
- "SOLID dit de mettre des interfaces partout" ;
- "on verra peut-être un jour".

## Frontière de dépendance

Le cas d'utilisation `CreateReservationUseCase` est important. Il doit connaître les concepts métier et les contrats nécessaires. Il ne doit pas connaître `MySqlConnection`, `StripeClient` ou `SmtpTransport`.

Cela ne supprime pas la complexité. Cela la place dans les adaptateurs, là où elle peut changer sans contaminer le cœur.

## Testabilité

Une dépendance injectée permet un test simple :

```java
ReservationRepository repository = new InMemoryReservationRepository();
CreateReservationUseCase useCase = new CreateReservationUseCase(repository);
```

Le test n'a pas besoin de base de données. Il vérifie le comportement du cas d'utilisation.

## Approfondissement théorique : contrats et inversion des dépendances

Une interface est un contrat. Elle décrit ce qu'un objet doit fournir, sans imposer comment il le fournit. Dans un système bien structuré, les contrats les plus importants sont placés du côté du code stable, pas du côté des détails techniques.

L'inversion des dépendances part d'un constat : les règles métier doivent survivre aux changements techniques. Une base de données peut être remplacée. Une API de paiement peut changer. Un service d'email peut être externalisé. Si le domaine dépend directement de ces détails, chaque changement technique menace le cœur de l'application.

Le port définit un besoin du point de vue de l'application. PaymentGateway signifie que le cas d'utilisation a besoin de facturer un montant. L'adaptateur traduit ce besoin vers un outil concret. Cette séparation permet de tester le cas d'utilisation avec un faux paiement, sans réseau et sans secret de configuration.

Il ne faut pas confondre abstraction utile et abstraction automatique. Créer une interface pour chaque classe ne rend pas le système meilleur. Une interface a un coût : elle ajoute un nom, un fichier, un détour de lecture. Elle se justifie quand elle isole une variation réelle ou une frontière instable.

Dans une progression pédagogique, il faut d'abord sentir la douleur : tests difficiles, dépendance au réseau, changement de fournisseur, logique métier mélangée à l'infrastructure. Ensuite seulement, l'interface devient une réponse claire.

### Vérification

- Le contrat exprime-t-il un besoin métier ou le nom d'un outil ?
- Peut-on tester le cas d'utilisation sans dépendance externe réelle ?
- L'interface protège-t-elle une frontière qui peut changer ?
