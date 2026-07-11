---
id: poo.module-08.quiz
title: QCM
---

Question: Un value object est souvent comparé...
A. Par valeur.
B. Par adresse mémoire uniquement.
C. Par nombre de méthodes.
D. Par son repository.
Answer: Par valeur.
Explanation: Deux objets-valeurs représentant la même valeur sont équivalents.
---
Question: Pourquoi remplacer `String email` par `EmailAddress` ?
A. Pour porter la validation dans un type explicite.
B. Pour rendre le code plus lent.
C. Pour supprimer les constructeurs.
D. Pour éviter les tests.
Answer: Pour porter la validation dans un type explicite.
Explanation: Le type réduit l'ambiguïté et empêche de propager une valeur invalide.
---
Question: Pourquoi créer un objet-valeur `Money` plutôt qu’utiliser un `double` partout ?
A. Pour ajouter de l’héritage.
B. Pour éviter les constructeurs.
C. Pour centraliser les règles de validité et rendre le code plus explicite.
D. Pour supprimer les tests.
Answer: Pour centraliser les règles de validité et rendre le code plus explicite.
Explanation: `Money` empêche les montants négatifs et donne un nom métier à la valeur. Le reste du code ne manipule plus un `double` ambigu.
