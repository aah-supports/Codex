---
id: poo.module-05.lesson
title: Heritage, composition et polymorphisme
tags:
  - heritage
  - composition
  - polymorphisme
---

# Heritage, composition et polymorphisme

L'heritage exprime une relation de specialisation. Il ne doit pas servir uniquement a eviter quelques lignes de duplication.

La citation de la banane, du gorille et de la foret rappelle le probleme : parfois on voulait seulement une banane, mais on recupere le gorille qui la tient, puis toute la foret autour. Avec `extends`, une sous-classe recupere plus que ce qu'elle voulait : API, comportements, contraintes et couplage avec la classe mere.

## Composition

La composition consiste a assembler des objets plus petits. Elle rend souvent le systeme plus explicite et plus facile a faire evoluer.

## Polymorphisme

Le polymorphisme permet d'utiliser plusieurs implementations derriere un meme contrat.

Dans le projet cinema, `PricingPolicy` peut representer plusieurs politiques de prix sans multiplier les `if`.
