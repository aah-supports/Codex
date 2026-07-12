---
name: adapter-niveau
description: Adapter le niveau pédagogique d’un contenu POO en français à partir du corpus Markdown. Use when the user asks to simplify, deepen, shorten, or rewrite a lesson, exercise, correction, or QCM for another difficulty level while preserving the same concept.
---

# Adapter le niveau

## Objectif

Réécrire un contenu sans changer le fond, en ajustant la densité pédagogique.

## Entrées minimales

- contenu source ;
- niveau cible ;
- type de contenu à préserver ;
- contraintes de longueur ou de détail ;
- notion ou chapitre à conserver.

## Format de sortie

Produire le même type de contenu que l’entrée :

- si l’entrée est un cours, rendre un cours ;
- si l’entrée est un exercice, rendre un exercice ;
- si l’entrée est un QCM, rendre un QCM ;
- si l’entrée est une correction, rendre une correction.

## Règles d’adaptation

- pour un niveau plus simple, expliquer les termes avant de les utiliser ;
- pour un niveau plus avancé, ajouter les nuances, contre-exemples et limites ;
- garder la même notion centrale ;
- conserver les références du corpus si elles restent pertinentes ;
- réduire ou augmenter la densité, pas déformer le sujet ;
- éviter le jargon non expliqué ;
- conserver le français et les accents du corpus.

## Contrôle qualité

- vérifier que le sens initial est conservé ;
- vérifier que le niveau cible est réellement atteint ;
- vérifier que le texte reste cohérent avec le reste du corpus ;
- vérifier que les exemples et définitions ne changent pas de sujet.
