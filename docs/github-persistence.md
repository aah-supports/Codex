# Persistance GitHub

## Regle de separation

GitHub stocke le contenu partageable. IndexedDB stocke le travail personnel quotidien.

## Peut etre versionne

- corpus Markdown ;
- modules ;
- exercices et QCM relus ;
- templates de generation ;
- stats anonymisees si l'utilisateur l'active.

## Ne doit pas etre public par defaut

- historique detaille de reponses ;
- email, nom, identifiants personnels ;
- exports complets non anonymises.

## Format recommande pour stats anonymisees

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
