---
id: poo.module-04.quiz
title: QCM
---

Question: Une classe peu cohésive est souvent une classe qui...
A. Mélange plusieurs raisons de changer.
B. Possède trop peu de méthodes.
C. N'utilise jamais d'interface.
D. A un constructeur.
Answer: Mélange plusieurs raisons de changer.
Explanation: La cohésion baisse quand une classe rassemble des responsabilités qui évoluent pour des raisons différentes.
---
Question: Information Expert aide à choisir...
A. L'objet qui porte une responsabilité.
B. La couleur du thème.
C. La base de données.
D. Le nom du package racine.
Answer: L'objet qui porte une responsabilité.
Explanation: Le principe invite à placer le comportement près de l'information utile.
---
Question: Quel symptôme indique une faible cohésion ?
A. Une classe a un constructeur.
B. Une classe contient une méthode publique.
C. Une classe change pour des raisons métier très différentes.
D. Une classe utilise un type primitif.
Answer: Une classe change pour des raisons métier très différentes.
Explanation: Le service orchestre le cas d’usage, mais il délègue les décisions. `SeatMap` choisit les places, `PricingPolicy` calcule le prix, `Notifier` envoie le message.
