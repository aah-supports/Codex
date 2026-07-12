---
name: generer-exercice
description: Générer des exercices progressifs de POO en français à partir du corpus Markdown. Use when the user asks to create, enrich, rewrite, or validate exercises.md content for a POO module, with guided steps, autonomous work, and success criteria.
---

# Générer un exercice

## Objectif

Créer un exercice progressif qui suit le niveau et le vocabulaire du cours.

## Entrées minimales

- corpus ou module cible ;
- niveau visé ;
- objectif pédagogique ;
- thème exact à travailler ;
- format souhaité si le corpus impose une structure particulière.

## Format de sortie

Retourner uniquement du Markdown.

Suivre la structure du corpus :

```markdown
# Exercice guidé

...

# Exercice autonome

...

# Atelier progressif

## Niveau 1
...

## Niveau 2
...

## Niveau 3
...

# Correction attendue
...
```

## Règles de rédaction

- partir d’un contexte concret ;
- découper la difficulté en étapes ;
- donner des consignes actionnables ;
- éviter de noyer l’étudiant sous le jargon ;
- utiliser les notions du cours comme appui ;
- ne pas fournir la correction complète si elle n’est pas demandée ;
- garder des formulations claires et progressives ;
- conserver les accents et le français du corpus.

## Contrôle qualité

- vérifier que l’exercice est faisable sans information externe ;
- vérifier que chaque étape sert l’objectif pédagogique ;
- vérifier que la difficulté monte progressivement ;
- vérifier que le corpus contient bien les notions mobilisées.
