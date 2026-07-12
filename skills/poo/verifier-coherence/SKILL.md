---
name: verifier-coherence
description: Vérifier la cohérence d’un corpus POO en français à partir du Markdown du cours. Use when the user asks to audit lessons, exercises, corrections, QCM, glossary entries, references, tags, or the pedagogical progression for contradictions, gaps, or mismatched links.
---

# Vérifier la cohérence

## Objectif

Contrôler qu’un corpus reste juste, progressif et aligné sur lui-même.

## Points à vérifier

- cohérence entre cours, exercices, QCM et corrections ;
- progression pédagogique ;
- définitions contradictoires ou ambiguës ;
- références cassées ou mal orientées ;
- doublons inutiles ;
- niveau de langage incohérent ;
- réponses de QCM qui ne correspondent pas à l’énoncé ;
- exemples qui contredisent la règle expliquée.

## Format de sortie

Répondre avec une liste de constats concrets, ordonnés par gravité.

Pour chaque constat, indiquer :

- le fichier ou la partie concernée ;
- le problème exact ;
- l’impact pédagogique ;
- si possible, une correction brève.

Si rien n’est problématique, le dire explicitement.

## Règles d’analyse

- ne pas inventer de problèmes ;
- citer le texte exact quand c’est utile ;
- séparer les erreurs factuelles des choix pédagogiques ;
- distinguer les blocages importants des améliorations mineures ;
- rester bref, précis et actionnable.

## Style de sortie

- écrire de manière académique, claire et précise ;
- éviter les salutations, les formules d’introduction et les émoticônes ;
- rester référencé sur le corpus plutôt que générique ;
- si du code est nécessaire, utiliser le langage adapté au corpus ;
- terminer par une section de références du cours si elle est pertinente et lisible.
