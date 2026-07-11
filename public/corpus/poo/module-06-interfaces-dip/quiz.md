---
id: poo.module-06.quiz
title: QCM
---

Question: Pourquoi injecter une dépendance par constructeur ?
A. Pour rendre la dépendance visible et testable.
B. Pour éviter toutes les interfaces.
C. Pour accelerer automatiquement le code.
D. Pour supprimer les objets.
Answer: Pour rendre la dépendance visible et testable.
Explanation: Le constructeur montre ce dont l'objet a besoin et permet de fournir un faux en test.
---
Question: Dans une architecture ports/adaptateurs, le repository est souvent...
A. Un port défini côté application ou domaine.
B. Une classe graphique.
C. Une constante globale.
D. Un type primitif.
Answer: Un port défini côté application ou domaine.
Explanation: L'application définit ce dont elle a besoin, l'infrastructure fournit les détails.
---
Question: Quel est le bénéfice principal d’une interface à une frontière externe ?
A. Rendre le code plus long.
B. Permettre au domaine de dépendre d’un contrat plutôt que d’un détail technique.
C. Remplacer toutes les classes concrètes.
D. Empêcher les exceptions.
Answer: Permettre au domaine de dépendre d’un contrat plutôt que d’un détail technique.
Explanation: Le cas d’usage dépend de `PaymentGateway`. En production, un adaptateur appelle l’API réelle. En test, un faux renvoie un paiement accepté ou refusé.
