---
id: poo.module-04.exercises
title: Exercices
---

# Exercice guidé

Prendre une classe `ReservationService` qui :

1. vérifie les sièges ;
2. calcule le prix ;
3. sauvegarde ;
4. envoie un email ;
5. génère un billet.

Identifier les responsabilités distinctes.

# Exercice autonome

Proposer les classes ou interfaces nécessaires :

- `Reservation` ;
- `PricingPolicy` ;
- `ReservationRepository` ;
- `NotificationService` ;
- `TicketGenerator`.

Pour chacune, écrire une phrase : "cette classe change quand..."

# Atelier progressif

## Niveau 1

Pour chaque responsabilité, choisir un propriétaire probable :

- vérifier qu'une réservation contient au moins un siège ;
- calculer une réduction étudiante ;
- envoyer un email ;
- sauvegarder une réservation ;
- produire un numéro de billet ;
- refuser une transition d'état invalide.

## Niveau 2

Repérer les smells :

```java
public class CinemaManager {
    public void reserve(...) { }
    public void sendEmail(...) { }
    public void executeSql(...) { }
    public void calculateVat(...) { }
    public void printTicket(...) { }
}
```

Nommer au moins trois raisons de changer.

## Niveau 3

Refactorer en gardant un scénario simple :

```text
Quand un client réserve deux sièges disponibles,
alors la réservation est confirmée,
le prix est calculé,
la réservation est sauvegardée,
une notification est envoyée.
```

## Critère de réussite

Chaque classe doit pouvoir être expliquee en une phrase courte sans utiliser "et aussi".
