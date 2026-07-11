---
id: poo.module-10.quiz
title: QCM
tags:
  - quiz
  - refactoring
  - code-smell
  - test
summaryTags:
  - quiz
---

Question: Un refactoring doit normalement...
A. Préserver le comportement observable.
B. Ajouter une fonctionnalité métier.
C. Supprimer tous les tests.
D. Changer le besoin utilisateur.
Answer: Préserver le comportement observable.
Explanation: Le refactoring change la structure interne, pas ce que le programme fait pour l'utilisateur.
---
Question: Pourquoi avancer par petites transformations ?
A. Pour localiser les erreurs et garder un filet de sécurité.
B. Pour rendre Git inutile.
C. Pour éviter les noms de classes.
D. Pour supprimer les interfaces.
Answer: Pour localiser les erreurs et garder un filet de sécurité.
Explanation: Des pas courts rendent les regressions plus faciles à comprendre.
---
Question: Pourquoi écrire des tests de caractérisation avant un refactoring risqué ?
A. Pour figer le comportement actuel avant de modifier la structure.
B. Pour supprimer le besoin de relire le code.
C. Pour éviter de nommer les méthodes.
D. Pour rendre le code plus procédural.
Answer: Pour figer le comportement actuel avant de modifier la structure.
Explanation: On ajoute d’abord un test de caractérisation, puis on extrait une méthode nommée. Ensuite seulement, on déplace la règle vers l’objet qui possède les données nécessaires.
