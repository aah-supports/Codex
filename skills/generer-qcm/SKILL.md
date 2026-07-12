---
name: generer-qcm
description: Générer des QCM de POO en français à partir du corpus Markdown. Use when the user asks to create, enrich, rewrite, or validate quiz.md content for a POO module, or when transforming lesson content into multiple-choice questions with answers and explanations.
---

# Générer un QCM

## Objectif

Produire un QCM directement compatible avec le corpus du cours.

## Entrées minimales

- corpus ou module cible ;
- niveau visé ;
- nombre de questions ;
- notions à couvrir ;
- contrainte éventuelle de difficulté.

## Format de sortie

Retourner uniquement du Markdown, sans préambule.

Respecter le format du corpus :

```markdown
---
id: poo.module-01.quiz
title: QCM
---

Question: ...
A. ...
B. ...
C. ...
D. ...
Answer: ...
Explanation: ...
---
```

## Règles de rédaction

- poser une seule bonne réponse ;
- rendre les distracteurs plausibles ;
- rester fidèle au vocabulaire du cours ;
- éviter les pièges gratuits ;
- expliquer brièvement pourquoi la bonne réponse est bonne ;
- garder un français précis et accentué ;
- ne pas inventer de notion hors corpus ;
- varier les formulations sans changer le fond.

## Contrôle qualité

- vérifier que `Answer` correspond exactement à une proposition ;
- vérifier que chaque question teste une compréhension réelle ;
- vérifier que les explications rappellent la règle ou l’idée du cours ;
- vérifier que le niveau est cohérent avec le module demandé.
