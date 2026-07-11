# Persistance GitHub

## Règle de séparation

GitHub stocke le contenu partageable. IndexedDB stocke le travail personnel quotidien.

## Peut être versionné

- corpus Markdown ;
- modules ;
- exercices et QCM relus ;
- templates de génération ;
- stats anonymisées si l'utilisateur l'active.

## Ne doit pas être public par défaut

- historique détaillé de réponses ;
- email, nom, identifiants personnels ;
- exports complets non anonymisés.

## Format recommandé pour stats anonymisées

```json
{
  "schemaVersion": 1,
  "anonymousUserId": "local-random-id",
  "generatedAt": "2026-07-10T00:00:00.000Z",
  "corpus": {
    "poo": {
      "completedModules": 2,
      "averageScore": 82,
      "quizAttempts": 6
    }
  }
}
```
