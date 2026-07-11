---
id: poo.module-05.quiz
title: QCM
---

Question: Pourquoi l'héritage peut-il être dangereux ?
A. Il crée une dépendance forte avec la classe mère.
B. Il empêche toute réutilisation.
C. Il rend impossible le polymorphisme.
D. Il ne fonctionne pas avec Java.
Answer: Il crée une dépendance forte avec la classe mère.
Explanation: Une sous-classe hérite de l'API, des contraintes et des évolutions de sa classe mère.
---
Question: Que permet le polymorphisme dans l'exemple des tarifs ?
A. Remplacer des conditions par des objets interchangeables.
B. Supprimer toutes les classes.
C. Éviter les interfaces.
D. Stocker le prix dans une variable globale.
Answer: Remplacer des conditions par des objets interchangeables.
Explanation: Plusieurs stratégies peuvent respecter le même contrat et être utilisées sans connaître leur classe concrète.
---
Question: Pourquoi préférer parfois la composition à `extends` ?
A. Parce que Java interdit l’héritage.
B. Parce qu’elle rend les tests inutiles.
C. Parce qu’elle isole mieux une variation de comportement.
D. Parce qu’elle supprime les interfaces.
Answer: Parce qu’elle isole mieux une variation de comportement.
Explanation: La variation de prix devient un objet interchangeable. `Booking` reste stable et ne connaît que le contrat `PricingPolicy`.
