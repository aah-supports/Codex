---
id: poo.module-02.lesson
title: Classes, objets et encapsulation
tags:
  - encapsulation
  - invariant
---

# Encapsulation

L'encapsulation protege l'etat interne d'un objet. Elle evite que n'importe quel code puisse produire un objet invalide.

Un objet doit idealement etre valide des sa construction. Les invariants importants doivent etre verifies au plus pres de l'objet concerne.

## Attention aux setters automatiques

Ajouter un setter pour chaque attribut revient souvent a rendre l'objet modifiable depuis partout. Cela deplace les regles ailleurs et fragilise le modele.
