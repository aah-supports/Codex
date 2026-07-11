---
id: shared.glossary
title: Glossaire
tags:
  - glossaire
  - definition
  - a-retenir
summaryTags:
  - definition
---

# Glossaire progressif

## A

- Abstraction : manière de cacher un détail inutile pour se concentrer sur une intention. Par exemple, le domaine peut demander un paiement sans connaître l’API bancaire utilisée.
- Adaptateur : objet qui traduit un contrat attendu par ton application vers une API ou une classe incompatible.
- Agrégation : relation entre deux objets où la partie peut continuer à exister sans le tout.
- Association : lien durable entre deux objets qui collaborent, sans relation de possession forte.

## C

- Classe : modèle de construction d’objets. Elle définit les données internes et les comportements disponibles.
- Cohésion : mesure de l’unité d’une classe. Une classe cohésive travaille autour d’une même idée.
- Composition : relation forte où un objet contient des parties qui vivent avec lui.
- Contrat : promesse faite par une méthode, une classe ou une interface. Il indique ce qui peut être appelé et ce qui doit être respecté.
- Couplage : niveau de dépendance entre deux éléments du code. Plus le couplage est fort, plus un changement local peut avoir des effets ailleurs.

## D

- Dépendance : objet, service ou contrat dont une classe a besoin pour faire son travail.
- DIP : Dependency Inversion Principle. Les règles importantes doivent dépendre de contrats stables plutôt que de détails techniques.
- Domaine : partie du code qui porte le vocabulaire et les règles métier.

## E

- Encapsulation : fait de protéger l’état interne d’un objet et d’obliger les changements à passer par des méthodes contrôlées.
- Exception métier : erreur qui exprime une règle du domaine, par exemple une place déjà réservée.

## H

- Héritage : relation où une classe reprend le comportement d’une autre avec `extends`. Il est utile si la substitution reste vraie.

## I

- Identité : ce qui permet de reconnaître un objet même si certaines de ses données changent.
- Interface : contrat qui décrit ce qu’un objet sait faire, sans imposer comment il le fait.
- Invariant : règle qui doit rester vraie pour qu’un objet soit valide. Exemple : une séance ne peut pas avoir une capacité négative.

## O

- Objet : unité qui combine état, comportement et identité. Un bon objet porte une responsabilité compréhensible.
- Objet-valeur : objet sans identité propre, comparé par ses valeurs. Exemple : un email, un montant ou une période.

## P

- Polymorphisme : capacité à utiliser plusieurs implémentations à travers un même contrat.
- Port : interface placée côté application ou domaine pour décrire un besoin externe, par exemple payer ou sauvegarder.

## R

- Refactoring : modification de la structure du code sans changement du comportement observable.
- Responsabilité : décision ou action qui appartient à un objet.

## S

- Setter : méthode qui modifie directement une donnée. Un setter automatique peut fragiliser un objet s’il contourne les règles métier.
- Strategy : pattern qui rend plusieurs algorithmes interchangeables derrière un même contrat.
- Substitution : propriété attendue de l’héritage : un sous-type doit pouvoir remplacer son type parent sans casser le programme.
