---
name: build-poo-learning-app
description: Build or extend a downloadable offline-first learning application for object-oriented programming using React, TypeScript, TanStack Router, TanStack Query, Zustand, markdown knowledge corpus files, progressive lessons, examples, exercises, QCM/quizzes, stats, corpus tags, an opening historical/bibliographic chapter, and optional local small-model exercise generation. Use when creating, improving, or maintaining the POO learning app based on POO/plan.md or any future course corpus.
---

# Build POO Learning App

## Source canonique

S'appuyer d'abord sur `POO/plan.md`. Ce fichier définit la progression pédagogique, les notions, exercices, bibliographie et projet fil rouge. Ne pas remplacer ce plan par un cours générique de POO.

L'application démarre avec le corpus POO, mais doit accepter d'autres corpus plus tard. Concevoir les contenus comme des données versionnées, pas comme du texte codé en dur dans les composants.

## Objectif produit

Créer une application pédagogique téléchargeable, utilisable hors connexion, digeste et progressive pour apprendre la programmation orientée objet.

L'application doit proposer :

- des leçons progressives issues du corpus Markdown ;
- des exemples courts et concrets ;
- des exercices guidés ;
- des QCM pour apprendre et vérifier ce qui a été retenu ;
- des lectures gratuites ou librement accessibles importantes sur le web ;
- une partie statistiques pour suivre précisément la progression ;
- un corpus Markdown modifiable pour enrichir le cours, ajouter des remarques, références et supports ;
- une option de génération locale de nouveaux exercices et QCM avec un petit modèle, par exemple Mistral, à partir du corpus.

## Stack obligatoire

Utiliser :

- React ;
- TypeScript ;
- TanStack Router pour les routes typées ;
- TanStack Query pour le chargement, cache et invalidation des contenus ;
- Zustand pour l'état local durable de l'utilisateur ;
- Markdown/MDX ou Markdown parsé en runtime/build time pour le corpus ;
- un design inspiré de shadcn/ui.

Ne pas imposer un backend pour l'usage courant. Le fonctionnement principal doit rester local/offline-first.

## Architecture recommandée

Organiser l'app par domaines plutôt que par types de fichiers globaux.

```text
src/
├── app/
│   ├── router/
│   ├── providers/
│   └── shell/
├── features/
│   ├── learning-path/
│   ├── lessons/
│   ├── exercises/
│   ├── quizzes/
│   ├── stats/
│   └── generation/
├── content/
│   ├── corpus-index.ts
│   ├── markdown-loader.ts
│   └── schemas.ts
├── components/
│   ├── ui/
│   └── layout/
├── stores/
├── lib/
└── types/
```

Garder les composants UI réutilisables dans `components/ui`, les écrans et comportements métier dans `features/*`, et les règles de contenu dans `content/*`.

## Organisation du corpus Markdown

Prévoir un dossier de corpus transportable avec l'app :

```text
corpus/
├── index.json
├── poo/
│   ├── module-01-paradigme-objet/
│   │   ├── lesson.md
│   │   ├── examples.md
│   │   ├── exercises.md
│   │   ├── quiz.md
│   │   └── readings.md
│   └── module-02-encapsulation/
└── shared/
    ├── glossary.md
    ├── bibliography.md
    └── quotes.md
```

Chaque module doit contenir des métadonnées lisibles par l'app :

```yaml
---
id: poo.module-05
title: Heritage, composition et polymorphisme
level: beginner-intermediate
durationMinutes: 45
prerequisites:
  - poo.module-01
tags:
  - poo
  - heritage
  - polymorphisme
  - composition
---
```

Créer un index central qui décrit les corpus disponibles, leur ordre, leurs modules, leurs prérequis et leur version. Éviter que l'ordre pédagogique dépende uniquement du tri alphabétique des fichiers.

## Modèle pédagogique

Suivre la progression de `plan.md` :

0. ouverture historique et bibliographique : auteurs clés, idées fondatrices, influences pédagogiques ;
1. paradigme objet ;
2. classes, objets et encapsulation ;
3. relations entre objets ;
4. responsabilités, cohésion et couplage ;
5. héritage, composition et polymorphisme ;
6. interfaces et inversion des dépendances ;
7. SOLID ;
8. exceptions, contrats et objets-valeurs ;
9. tests unitaires orientés objet ;
10. refactoring ;
11. design patterns utiles ;
12. modèle métier et architecture finale.

Pour chaque module, produire au minimum :

- une introduction courte ;
- un objectif d'apprentissage explicite ;
- un exemple de mauvais code ;
- une correction commentée ;
- un exercice guidé ;
- un exercice autonome ;
- un QCM avec explications ;
- une synthèse ;
- des lectures complémentaires.

Utiliser les citations et images mentales comme accroches pédagogiques, mais ne pas les transformer en gimmick. Pour l'héritage et `extends`, intégrer l'idée célèbre : "la forêt, le gorille et la banane" pour montrer le risque d'hériter de plus que ce dont on a besoin. L'utiliser dans le module héritage/composition pour expliquer pourquoi la composition est souvent préférable à un héritage fragile.

Pour le module d'ouverture, présenter brièvement les acteurs qui structurent le cours :

- Ole-Johan Dahl et Kristen Nygaard : Simula, simulation, classes et objets ;
- Alan Kay : objets comme unités de messages et de collaboration ;
- Grady Booch : analyse et conception orientées objet ;
- Bertrand Meyer : encapsulation, invariants, conception par contrat ;
- Rebecca Wirfs-Brock et Alan McKean : rôles, responsabilités et collaborations ;
- Craig Larman : UML, GRASP, analyse et conception progressives ;
- Sandi Metz et Joshua Bloch : composition, dépendances et pratiques robustes ;
- Kathy Sierra et Bert Bates, ainsi que le MOOC d'Helsinki : progression pédagogique, lisibilité et apprentissage par petits pas.

## Lectures web

Proposer des lectures gratuites ou accessibles publiquement quand elles sont importantes. Privilégier les sources primaires et stables :

- textes d'Alan Kay et histoire de Smalltalk ;
- documentation officielle UML de l'OMG ;
- articles de Martin Fowler sur le refactoring ;
- ressources officielles TypeScript sur classes, interfaces et types ;
- articles de référence sur SOLID, composition, tests et design patterns lorsque la source est fiable.

Ne pas intégrer de longs extraits sous copyright dans le corpus. Stocker les liens, résumés courts, niveau recommandé et raison pédagogique.

## États et données utilisateur

Utiliser Zustand pour stocker localement :

- progression par module ;
- leçons commencées/terminées ;
- réponses aux QCM ;
- scores et historique ;
- exercices terminés ;
- préférences d'affichage.

Prévoir une persistance locale, par exemple `localStorage` ou IndexedDB selon le volume. Prévoir l'export/import des données utilisateur en JSON.

Utiliser TanStack Query pour charger :

- index de corpus ;
- contenus Markdown ;
- QCM et exercices ;
- lectures ;
- résultats générés par le modèle local quand cette option existe.

## Statistiques attendues

La page stats doit montrer précisément où l'utilisateur en est :

- progression globale ;
- progression par corpus et module ;
- notions maîtrisées/faibles ;
- derniers QCM ;
- taux de réussite ;
- séries d'apprentissage ;
- temps estimé restant ;
- exercices à reprendre ;
- modules à reprendre.

Les stats doivent aider à reprendre le travail, pas seulement afficher des graphiques.

## Génération locale d'exercices et QCM

Prévoir une feature isolée `features/generation`.

Le moteur IA est optionnel. L'app doit rester utilisable sans moteur. Quand l'option est activée :

- lire le corpus Markdown local comme contexte ;
- générer des exercices, QCM et corrections à partir d'un module ou tag ;
- marquer les contenus générés comme non canoniques ;
- permettre à l'utilisateur de sauvegarder, modifier ou supprimer une génération ;
- éviter d'écraser le corpus officiel ;
- stocker les générations dans un espace utilisateur séparé.

Prévoir deux modes de configuration dans les paramètres :

- modèle local, par exemple Ollama avec `gemma4:e4b-mlx` ;
- API distante configurée manuellement, avec base URL, modèle et clé éventuelle.

L'interface doit rester remplaçable. Les appels de génération et de chat ne partent que si le moteur est explicitement activé. Sur GitHub Pages, la partie IA reste désactivée par défaut tant qu'aucune configuration locale n'a été saisie.

## Design

Construire une interface sobre, lisible et inspirée de shadcn/ui :

- navigation latérale ou top-level claire ;
- navigation latérale dense inspirée d'une documentation API ;
- cartes compactes pour modules et exercices ;
- badges de tags de corpus ;
- progress bars ;
- onglets pour leçon, exemples, exercices, QCM et lectures ;
- états vides utiles ;
- mode clair/sombre si l'infrastructure le permet ;
- typographie confortable pour la lecture longue.

Ne pas créer une landing page marketing. L'écran initial doit permettre de reprendre l'apprentissage ou de démarrer le premier module.

## Routes minimales

Prévoir ces routes :

```text
/
/corpus
/corpus/$corpusId
/learn/$corpusId/$moduleId
/exercises/$corpusId/$moduleId
/quiz/$corpusId/$moduleId
/stats
/settings
```

Utiliser les loaders et params typés de TanStack Router. Les routes doivent rester compatibles avec une app statique téléchargeable.

## Qualité attendue

Avant de terminer une implémentation :

- vérifier que l'app démarre ;
- vérifier au moins un parcours complet : ouvrir un module, lire une leçon, répondre à un QCM, voir les stats changer ;
- vérifier le comportement hors ligne si une PWA ou un bundle statique est prévu ;
- vérifier que le corpus peut être enrichi sans modifier les composants React ;
- ajouter des tests ciblés sur parsing de corpus, calcul de progression et scoring de QCM.

## Bilan sur le contenu

Quand le corpus POO est enrichi, garder le même niveau d'exigence sur le fond :

- commencer par l'histoire du champ et les auteurs qui ont façonné ses concepts ;
- relier chaque notion à une définition précise et à une difficulté réelle ;
- développer davantage les distinctions conceptuelles au lieu d'empiler des résumés ;
- citer la littérature structurante quand une idée vient d'un auteur identifiable ;
- insérer des diagrammes UML simples seulement lorsqu'ils clarifient le modèle ;
- garder des exemples concrets, des exercices et des QCM alignés sur la progression ;
- éviter les formulations trop rapides, les concepts non explicités et les passages purement décoratifs.

## Processus d'installation à documenter

Quand tu mets à jour le README ou la page Paramètres, documenter clairement :

1. l'installation du dépôt ;
2. le fonctionnement sans IA ;
3. la configuration du mode local ;
4. la configuration d'une API distante ;
5. l'activation explicite du moteur ;
6. le comportement par défaut sur GitHub Pages ;
7. les contraintes matérielles du mode local.

## Principes de décision

Garder le contenu pédagogique modulaire. Toute connaissance de POO doit pouvoir vivre dans le corpus Markdown.

Garder l'expérience progressive. L'utilisateur doit savoir quoi lire, quoi pratiquer, quoi revoir.

Garder les abstractions simples. L'app enseigne la bonne conception : son propre code doit éviter les composants massifs, les stores globaux fourre-tout et les données pédagogiques codées en dur.
