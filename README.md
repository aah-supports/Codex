# POO Learning App

Application React/TypeScript local-first pour apprendre la programmation orientée objet avec un corpus Markdown versionné.

## Mode local

- L'application fonctionne sans backend distant.
- Les cours, exercices, corrections et QCM partagent un corpus Markdown local.
- La génération de contenu utilise Ollama en local avec `gemma4:e4b-mlx` par défaut.
- Les brouillons générés restent dans le navigateur et s'exportent avec le backup complet.

## Architecture de persistance

- GitHub est la source de vérité du contenu partageable : app, corpus Markdown, exercices et QCM.
- IndexedDB est la source locale des données utilisateur : progression, scores et préférences.
- Export/import JSON sert de sécurité anti-perte et de sauvegarde portable.
- Les stats peuvent être poussées sur GitHub uniquement après anonymisation et action explicite de l'utilisateur.

## Corpus générés

Les contenus générés sont organisés dans `public/corpus/generated` :

- `qcm/`
- `exercises/`
- `corrections/`

Chaque dossier a son `index.json` pour décrire les tags, les emplacements et les références de rangement.

## Ollama

```bash
ollama serve
```

Le modèle configuré par défaut dans l'app est `gemma4:e4b-mlx`. La page de génération permet de modifier l'URL locale et le modèle si besoin.

## Démarrage

```bash
npm install
npm run dev
```

## Scripts

```bash
npm run build
npm run typecheck
npm run lint
```

## Corpus

Le contenu pédagogique est dans `public/corpus`. Ajouter un corpus consiste à créer ses fichiers Markdown et à l'enregistrer dans `public/corpus/index.json`.
