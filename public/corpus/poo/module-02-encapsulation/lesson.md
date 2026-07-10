---
id: poo.module-02.lesson
title: Classes, objets et encapsulation
tags:
  - encapsulation
  - invariant
---

# Encapsulation

L'encapsulation protege l'etat interne d'un objet. Elle evite que n'importe quel code puisse produire un objet invalide.

## Objectifs

A la fin du module, tu dois pouvoir :

- rendre un attribut prive quand il porte une regle ;
- construire un objet valide des le depart ;
- distinguer getter utile et setter dangereux ;
- placer les validations dans le bon objet ;
- expliquer ce qu'est un invariant.

Un objet doit idealement etre valide des sa construction. Les invariants importants doivent etre verifies au plus pres de l'objet concerne.

## Invariant

Un invariant est une regle qui doit toujours rester vraie.

Exemples :

- un film a une duree positive ;
- une salle contient au moins un siege ;
- une reservation contient au moins un siege ;
- une adresse email contient un format acceptable.

Si l'invariant est disperse dans plusieurs services, il sera oublie. S'il est protege dans l'objet, le modele devient plus robuste.

## Attention aux setters automatiques

Ajouter un setter pour chaque attribut revient souvent a rendre l'objet modifiable depuis partout. Cela deplace les regles ailleurs et fragilise le modele.

Un setter n'est pas interdit. Il doit correspondre a une vraie operation metier.

`setDuration(-10)` est faible. `rescheduleTo(newPeriod)` ou `renameTo(title)` peut etre plus expressif si l'objet verifie ses regles.

## Progression pratique

Commencer petit :

1. creer la classe ;
2. rendre les attributs prives ;
3. ajouter le constructeur ;
4. refuser les valeurs invalides ;
5. exposer seulement ce qui est necessaire.

## Encapsulation et langage metier

L'encapsulation ne sert pas seulement a cacher des attributs. Elle permet de donner un nom metier aux operations.

Comparer :

```java
reservation.setStatus("CANCELLED");
```

et :

```java
reservation.cancel();
```

La deuxieme version donne une intention. Elle permet aussi de verifier les regles : une reservation deja remboursee ne peut peut-etre plus etre annulee.

## Mauvais signal : getters partout

Quand un objet expose tous ses attributs, le reste du programme commence a prendre les decisions a sa place.

```java
if (reservation.getScreening().getRoom().getName().equals("IMAX")) {
    price += 4.0;
}
```

Cette chaine revele que la connaissance est dispersee. Il faut se demander quel objet ou service metier devrait porter cette decision.

## Travail attendu

Chaque classe du domaine doit avoir au moins une raison d'exister autre que "stocker des donnees". Si une classe n'a que des getters et setters, elle est peut-etre anemique ou pas encore terminee.
