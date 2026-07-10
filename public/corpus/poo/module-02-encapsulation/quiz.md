---
id: poo.module-02.quiz
title: QCM
---

Question: Pourquoi eviter les attributs publics pour un objet metier ?
A. Parce que Java l'interdit.
B. Parce qu'ils permettent de casser les invariants.
C. Parce que cela empeche les tests.
D. Parce qu'un attribut public est plus lent.
Answer: Parce qu'ils permettent de casser les invariants.
Explanation: Un attribut public peut etre modifie sans passer par les regles de validation de l'objet.
---
Question: Que signifie un objet valide des sa construction ?
A. Tous ses invariants essentiels sont deja respectes.
B. Il possede au moins un setter.
C. Il ne peut jamais changer.
D. Il est forcement serialisable.
Answer: Tous ses invariants essentiels sont deja respectes.
Explanation: Le constructeur empeche de creer un objet incoherent.
