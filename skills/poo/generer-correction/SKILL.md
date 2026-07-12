---
name: generer-correction
description: Générer des corrections pédagogiques de POO en français à partir du corpus Markdown ou d’un exercice fourni. Use when the user asks to correct an exercise, justify an answer, explain a solution, or validate and improve a correction.md file.
---

# Générer une correction

## Objectif

Rédiger une correction claire, utile et directement réutilisable dans le corpus.

## Entrées minimales

- exercice ou QCM à corriger ;
- module ou notions concernées ;
- niveau visé ;
- degré de détail attendu.

## Format de sortie

Retourner uniquement du Markdown.

Suivre une structure proche du corpus :

```markdown
# Correction de l'exercice principal

...

# Raisonnement pas à pas

1. ...
2. ...

# Correction type

```java
...
```

# Erreur fréquente

...

# Auto-évaluation

- ...
```

## Règles de rédaction

- expliquer le pourquoi avant le code ;
- corriger la logique, pas seulement la syntaxe ;
- nommer explicitement la règle métier ou le principe objet en jeu ;
- montrer le code corrigé si nécessaire ;
- signaler les erreurs fréquentes ;
- éviter les explications vagues ;
- garder un français précis, simple et accentué.

## Style de sortie

- écrire de manière académique, claire et précise ;
- éviter les salutations, les formules d’introduction et les émoticônes ;
- rester référencé sur le corpus plutôt que générique ;
- si du code est nécessaire, utiliser le langage adapté au corpus ;
- terminer par une section de références du cours si elle est pertinente et lisible.

## Contrôle qualité

- vérifier que la correction répond bien à l’énoncé ;
- vérifier que le raisonnement est compréhensible sans contexte externe ;
- vérifier que l’exemple corrigé reste cohérent avec le corpus ;
- vérifier que les choix proposés sont justifiables pédagogiquement.
