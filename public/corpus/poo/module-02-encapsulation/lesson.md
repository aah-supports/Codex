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
