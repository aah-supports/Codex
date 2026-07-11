---
id: poo.module-02.quiz
title: QCM
tags:
  - quiz
  - classe
  - encapsulation
  - invariant
summaryTags:
  - quiz
---

Question: Pourquoi éviter les attributs publics pour un objet métier ?
A. Parce que Java l'interdit.
B. Parce qu'ils permettent de casser les invariants.
C. Parce que cela empêche les tests.
D. Parce qu'un attribut public est plus lent.
Answer: Parce qu'ils permettent de casser les invariants.
Explanation: Un attribut public peut être modifié sans passer par les règles de validation de l'objet.
---
Question: Que signifie un objet valide dès sa construction ?
A. Tous ses invariants essentiels sont déjà respectés.
B. Il possède au moins un setter.
C. Il ne peut jamais changer.
D. Il est forcément sérialisable.
Answer: Tous ses invariants essentiels sont déjà respectés.
Explanation: Le constructeur empêche de créer un objet incohérent.
---
Question: Où placer en priorité la règle “une capacité ne peut pas être négative” ?
A. Dans chaque appelant.
B. Dans la classe qui représente la séance.
C. Dans le composant graphique.
D. Dans le fichier de configuration.
Answer: Dans la classe qui représente la séance.
Explanation: La correction refuse immédiatement les valeurs invalides. Une méthode nommée comme `reserveSeats` exprime une intention métier et vérifie la capacité restante.
