# POO Learning App

Application React/TypeScript local-first pour apprendre la programmation orientée objet avec un corpus Markdown versionné.

## Installation et démarrage

### 1. Prérequis

- Node.js installé.
- Git installé.
- Pour l’IA locale, Ollama installé sur la machine.

### 2. Installer le dépôt

```bash
npm install
```

### 3. Lancer l'app en local

```bash
npm run dev
```

Ouvrir l’URL affichée par Vite.

## Modes d'utilisation

### Mode sans IA

- L'application fonctionne sans backend distant.
- Les cours, exercices, corrections et QCM restent accessibles.
- La partie IA reste désactivée tant qu’aucune configuration n’a été validée dans Paramètres.

### Mode IA locale

1. Installer Ollama.
2. Lancer le serveur local avec `ollama serve`.
3. Télécharger le modèle avec `ollama pull gemma4:e4b-mlx`.
4. Ouvrir la page Paramètres.
5. Choisir `Modèle local`.
6. Renseigner l’URL du service, le modèle, puis activer l’IA.

Ce mode est recommandé pour les étudiants qui veulent tout garder sur leur machine.

### Mode API distante

1. Ouvrir la page Paramètres.
2. Choisir `API distante`.
3. Renseigner l’URL du service.
4. Renseigner le modèle demandé par l’API.
5. Ajouter une clé API si nécessaire.
6. Activer l’IA.

L’API doit être compatible avec le format d’appel attendu par l’application ou exposée derrière un proxy de traduction.

## Règle GitHub Pages

- GitHub est la source de vérité du contenu partageable : app, corpus Markdown, exercices et QCM.
- IndexedDB est la source locale des données utilisateur : progression, scores et préférences.
- Export/import JSON sert de sécurité anti-perte et de sauvegarde portable.
- Les stats peuvent être poussées sur GitHub uniquement après anonymisation et action explicite de l'utilisateur.
- Sur GitHub Pages, la partie IA est désactivée par défaut. Elle ne s’active que si l’utilisateur configure volontairement un moteur dans ses paramètres locaux.

## Corpus générés

Les contenus générés sont organisés dans `public/corpus/generated` :

- `qcm/`
- `exercises/`
- `corrections/`

Chaque dossier a son `index.json` pour décrire les tags, les emplacements et les références de rangement.

## Vérifier la configuration IA

La page Paramètres permet de choisir entre :

- un modèle local via Ollama ;
- une API distante configurée à la main.

Dans les deux cas, la configuration est stockée localement dans le navigateur. La génération et le chat utilisent cette configuration une fois l’IA activée.

## Scripts

```bash
npm run build
npm run typecheck
npm run lint
```

## Corpus

Le contenu pédagogique est dans `public/corpus`. Ajouter un corpus consiste à créer ses fichiers Markdown et à l'enregistrer dans `public/corpus/index.json`.
