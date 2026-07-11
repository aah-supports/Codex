---
id: poo.module-02.quiz
title: QCM
---

Question: Pourquoi éviter les attributs publics pour un objet métier ?
A. Parce que Java l'interdit.
B. Parce qu'ils permettent de casser les invariants.
C. Parce que cela empeche les tests.
D. Parce qu'un attribut public est plus lent.
Answer: Parce qu'ils permettent de casser les invariants.
Explanation: Un attribut public peut être modifie sans passer par les règles de validation de l'objet.
---
Question: Que signifie un objet valide des sa construction ?
A. Tous ses invariants essentiels sont déjà respectés.
B. Il possède au moins un setter.
C. Il ne peut jamais changer.
D. Il est forcément sérialisable.
Answer: Tous ses invariants essentiels sont déjà respectés.
Explanation: Le constructeur empeche de créer un objet incohérent.
