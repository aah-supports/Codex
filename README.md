# POO Learning App

Application React/TypeScript local-first pour apprendre la programmation orientee objet avec un corpus Markdown versionne.

## Architecture de persistance

- GitHub est la source de verite du contenu partageable : app, corpus Markdown, exercices, QCM, fiches publiques.
- IndexedDB est la source locale des donnees utilisateur : progression, scores, notes privees, preferences.
- Export/import JSON sert de securite anti-perte et de sauvegarde portable.
- Les stats peuvent etre poussees sur GitHub uniquement apres anonymisation et action explicite de l'utilisateur.

## Demarrage

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

Le contenu pedagogique est dans `public/corpus`. Ajouter un corpus consiste a creer ses fichiers Markdown et a l'enregistrer dans `public/corpus/index.json`.
