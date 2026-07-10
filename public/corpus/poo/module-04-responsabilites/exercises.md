---
id: poo.module-04.exercises
title: Exercices
---

# Exercice guide

Prendre une classe `ReservationService` qui :

1. verifie les sieges ;
2. calcule le prix ;
3. sauvegarde ;
4. envoie un email ;
5. genere un billet.

Identifier les responsabilites distinctes.

# Exercice autonome

Proposer les classes ou interfaces necessaires :

- `Reservation` ;
- `PricingPolicy` ;
- `ReservationRepository` ;
- `NotificationService` ;
- `TicketGenerator`.

Pour chacune, ecrire une phrase : "cette classe change quand..."

# Atelier progressif

## Niveau 1

Pour chaque responsabilite, choisir un proprietaire probable :

- verifier qu'une reservation contient au moins un siege ;
- calculer une reduction etudiante ;
- envoyer un email ;
- sauvegarder une reservation ;
- produire un numero de billet ;
- refuser une transition d'etat invalide.

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

Refactorer en gardant un scenario simple :

```text
Quand un client reserve deux sieges disponibles,
alors la reservation est confirmee,
le prix est calcule,
la reservation est sauvegardee,
une notification est envoyee.
```

## Critere de reussite

Chaque classe doit pouvoir etre expliquee en une phrase courte sans utiliser "et aussi".
