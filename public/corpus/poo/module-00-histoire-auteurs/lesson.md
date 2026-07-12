---
id: poo.module-00.lesson
title: Histoire de la POO et auteurs clés
tags:
  - def
  - important
---

# Histoire de la POO et auteurs clés

La programmation orientée objet n'apparaît pas comme une technique isolée. Elle vient d'une histoire intellectuelle précise : simulation, communication entre objets, conception par contrat, analyse de responsabilités, puis structuration des architectures.

Ce chapitre sert d'entrée. Il explique d'où viennent les notions du cours, pourquoi elles ont été formulées de cette manière, et quels auteurs ont fortement influencé la manière dont nous les enseignons ici.

## Pourquoi commencer par l'histoire ?

Commencer par l'histoire évite deux erreurs fréquentes :

- croire que la POO se réduit à `class` et `extends` ;
- croire que toutes les idées du cours ont été inventées par le langage utilisé.

Les concepts ont une généalogie. Les comprendre aide à comprendre leur portée et leurs limites.

## Repères historiques

### Simula 67

Ole-Johan Dahl et Kristen Nygaard ont joué un rôle fondateur avec Simula. Leur travail relie la simulation de systèmes à des notions qui deviendront centrales : classes, objets, instances, héritage et interactions.

L'idée importante est simple : un programme peut représenter des entités qui évoluent et interagissent plutôt qu'une suite unique d'opérations.

### Alan Kay et Smalltalk

Alan Kay insiste sur les objets comme unités autonomes qui communiquent par messages. Cette vision est plus profonde qu'une simple organisation du code en classes.

Elle explique pourquoi on doit toujours se demander qui parle à qui, qui décide, et qui protège les règles du domaine.

### Booch, Meyer, Wirfs-Brock, Larman

Grady Booch relie l'analyse et la conception orientées objet à la notion de responsabilités et de collaborations.

Bertrand Meyer formalise la conception par contrat, les invariants et la robustesse des abstractions.

Rebecca Wirfs-Brock et Alan McKean poussent une conception guidée par les rôles et les responsabilités.

Craig Larman relie ces idées à UML, aux cas d'utilisation et à une progression de conception exploitable en projet.

### Les prolongements pratiques

Sandi Metz, Joshua Bloch, Martin Fowler et d'autres ont rendu ces idées très concrètes pour le développement moderne :

- composition plutôt qu'héritage fragile ;
- dépendances plus explicites ;
- refactoring continu ;
- code lisible et testable ;
- règles métier localisées.

## Les acteurs clés du cours

### Ole-Johan Dahl et Kristen Nygaard

Ils montrent que la POO vient de la simulation et de la modélisation de systèmes en interaction.

### Alan Kay

Il fait comprendre que l'objet n'est pas seulement un conteneur de données, mais un interlocuteur qui reçoit des messages.

### Grady Booch

Il aide à relier objets, responsabilités et collaborations dans une démarche de conception.

### Bertrand Meyer

Il donne une base théorique solide à l'encapsulation, aux invariants et à la conception par contrat.

### Rebecca Wirfs-Brock et Alan McKean

Ils rappellent que la qualité d'un modèle dépend des rôles attribués aux objets.

### Craig Larman

Il relie les modèles objet à l'UML, aux GRASP et à la progression par cas concrets.

### Sandi Metz et Joshua Bloch

Ils donnent des repères pratiques pour choisir la composition, réduire le couplage et garder des modèles robustes.

### Kathy Sierra et Bert Bates

Ils influencent la pédagogie du cours : petites étapes, exemples courts, retour régulier au concret, progression lisible.

## Ce que le cours hérite de ces auteurs

Le corpus POO suit trois idées fortes :

1. partir du problème réel avant de parler de syntaxe ;
2. protéger les règles du domaine avant d'ajouter des structures ;
3. concevoir des collaborations lisibles avant de multiplier les abstractions.

Le reste du parcours développe ces trois axes de façon progressive.
