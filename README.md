# POO Learning App

Application React/TypeScript local-first pour apprendre la programmation orientée objet avec un corpus Markdown versionné.

## Architecture de persistance

- GitHub est la source de vérité du contenu partageable : app, corpus Markdown, exercices et QCM.
- IndexedDB est la source locale des données utilisateur : progression, scores et préférences.
- Export/import JSON sert de sécurité anti-perte et de sauvegarde portable.
- Les stats peuvent être poussées sur GitHub uniquement après anonymisation et action explicite de l'utilisateur.

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
