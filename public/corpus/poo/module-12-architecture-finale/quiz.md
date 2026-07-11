---
id: poo.module-12.quiz
title: QCM
---

Question: Dans une architecture séparée, la base de données appartient plutôt à...
A. L'infrastructure.
B. L'entite métier.
C. L'objet-valeur.
D. La classe mère.
Answer: L'infrastructure.
Explanation: La base de données est un détail technique que le domaine ne doit pas connaître directement.
---
Question: Le domaine doit contenir principalement...
A. Les règles métier et invariants.
B. Les controllers HTTP.
C. Les requétés SQL.
D. Les templates HTML.
Answer: Les règles métier et invariants.
Explanation: Le domaine exprime le modèle métier indépendamment des détails techniques.
---
Question: Quel est le rôle principal de la couche application ?
A. Porter toutes les règles métier.
B. Orchestrer un cas d’usage en utilisant le domaine et des ports.
C. Remplacer les tests.
D. Contenir uniquement du CSS.
Answer: Orchestrer un cas d’usage en utilisant le domaine et des ports.
Explanation: `Booking`, `Screening` et `Money` restent dans le domaine. `BookSeatUseCase` orchestre. Les repositories, contrôleurs et adaptateurs de paiement restent en infrastructure.
