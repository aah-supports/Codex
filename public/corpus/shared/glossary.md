---
id: shared.glossary
title: Glossaire
tags:
  - def
  - important
---

# Glossaire progressif

## A

- Abstraction : opération intellectuelle qui consiste à retenir ce qui est utile pour raisonner, et à masquer le détail qui n’aide pas la décision. En POO, une classe ou une interface abstrait une intention : réserver, payer, notifier, valider. [Voir responsabilité et abstraction](#/learn/poo/poo.module-04).
- Adaptateur : objet qui traduit une interface attendue par ton application vers une API, une librairie ou une classe qui ne parle pas exactement le même langage. Il protège le domaine des détails techniques. [Voir interfaces et dépendances](#/learn/poo/poo.module-06) et [design patterns](#/learn/poo/poo.module-11).
- Agrégation : relation entre un tout et une partie lorsque la partie peut exister sans le tout. Une équipe agrège des joueurs, mais un joueur peut rester un joueur hors de cette équipe. [Voir relations entre objets](#/learn/poo/poo.module-03).
- Arrange, Act, Assert : structure classique d’un test. On prépare le contexte, on exécute l’action, puis on vérifie le résultat. Cette forme rend l’intention du test plus lisible. [Voir tests unitaires](#/learn/poo/poo.module-09).
- Association : relation durable entre deux objets qui se connaissent ou collaborent. Elle indique un lien métier, sans forcément indiquer une possession forte. [Voir relations entre objets](#/learn/poo/poo.module-03).

## C

- Cas d’utilisation : action applicative complète vue du point de vue d’un utilisateur ou d’un autre système. Il orchestre les objets du domaine sans contenir tous les détails métier. [Voir architecture finale](#/learn/poo/poo.module-12).
- Classe : modèle de construction d’objets. Elle décrit les données internes, les comportements disponibles et les règles qui protègent les instances. [Voir classes et encapsulation](#/learn/poo/poo.module-02).
- Classe abstraite : classe incomplète qui factorise un comportement commun et oblige les sous-classes à fournir certaines opérations. Elle doit être utilisée avec prudence, car elle crée une relation d’héritage forte. [Voir héritage, composition et polymorphisme](#/learn/poo/poo.module-05).
- Code smell : indice qu’un morceau de code devient difficile à comprendre, modifier ou tester. Ce n’est pas toujours une erreur, mais c’est un signal de refactoring possible. [Voir refactoring](#/learn/poo/poo.module-10).
- Cohésion : degré d’unité d’une classe ou d’un module. Une classe cohésive regroupe des éléments qui changent pour les mêmes raisons et servent une responsabilité claire. [Voir responsabilités, cohésion et couplage](#/learn/poo/poo.module-04).
- Collection : groupe d’objets manipulés ensemble. En conception objet, une collection métier peut porter des règles, par exemple empêcher deux réservations identiques. [Voir relations entre objets](#/learn/poo/poo.module-03).
- Command : design pattern qui transforme une demande en objet. Il permet de stocker, rejouer, annuler ou journaliser une action. [Voir design patterns](#/learn/poo/poo.module-11).
- Composition : relation forte où un objet possède des parties qui n’ont pas de cycle de vie autonome dans ce contexte. Si le tout disparaît, les parties disparaissent avec lui. [Voir relations entre objets](#/learn/poo/poo.module-03) et [héritage/composition](#/learn/poo/poo.module-05).
- Constructeur : méthode spéciale appelée à la création d’un objet. Il doit produire une instance immédiatement utilisable et empêcher les états incohérents dès le départ. [Voir encapsulation](#/learn/poo/poo.module-02).
- Contrat : promesse explicite ou implicite faite par une méthode, une classe ou une interface. Il précise ce que l’appelant peut attendre et ce qu’il doit respecter. [Voir interfaces](#/learn/poo/poo.module-06) et [contrats](#/learn/poo/poo.module-08).
- Couplage : niveau de dépendance entre deux éléments du code. Plus le couplage est fort, plus un changement local risque de provoquer des modifications ailleurs. [Voir responsabilités, cohésion et couplage](#/learn/poo/poo.module-04).

## D

- Dépendance : élément dont une classe a besoin pour faire son travail : objet, service, interface, configuration ou librairie. Une dépendance doit rester compréhensible et contrôlée. [Voir interfaces et inversion des dépendances](#/learn/poo/poo.module-06).
- Dépendance concrète : dépendance vers une classe précise ou un outil technique précis. Elle est parfois acceptable, mais elle rend souvent les tests et les évolutions plus difficiles. [Voir interfaces et inversion des dépendances](#/learn/poo/poo.module-06).
- Diagramme de classes : représentation UML qui montre les classes, leurs attributs, leurs méthodes et leurs relations. Il sert à discuter la conception, pas à remplacer le raisonnement sur les responsabilités. [Voir relations entre objets](#/learn/poo/poo.module-03).
- DIP : Dependency Inversion Principle. Les règles importantes doivent dépendre de contrats stables plutôt que de détails techniques variables. [Voir principes SOLID](#/learn/poo/poo.module-07) et [interfaces/DIP](#/learn/poo/poo.module-06).
- Domaine : partie du code qui porte le vocabulaire, les règles et les décisions métier. C’est le cœur conceptuel de l’application. [Voir architecture finale](#/learn/poo/poo.module-12).
- Donnée primitive : valeur simple comme `String`, `int` ou `boolean`. Les primitives sont utiles, mais trop de primitives peuvent cacher des concepts métier qui méritent un objet-valeur. [Voir contrats et objets-valeurs](#/learn/poo/poo.module-08).
- DTO : Data Transfer Object. Objet simple utilisé pour transporter des données entre couches ou systèmes. Il ne doit pas être confondu avec un objet métier riche. [Voir architecture finale](#/learn/poo/poo.module-12).
- Dummy : objet passé à un test parce que la signature le demande, mais qui n’est pas réellement utilisé dans le scénario testé. [Voir tests unitaires](#/learn/poo/poo.module-09).

## E

- Encapsulation : fait de protéger l’état interne d’un objet et d’obliger les modifications à passer par des méthodes qui respectent les règles métier. [Voir classes, objets et encapsulation](#/learn/poo/poo.module-02).
- État : ensemble des valeurs internes d’un objet à un instant donné. L’état doit rester cohérent avec les règles du domaine. [Voir paradigme objet](#/learn/poo/poo.module-01).
- État valide : situation dans laquelle toutes les règles nécessaires sont respectées. L’objet peut alors être utilisé sans vérifications permanentes par le reste du programme. [Voir encapsulation](#/learn/poo/poo.module-02).
- Exception métier : erreur qui exprime une règle du domaine, par exemple une séance complète ou une réservation impossible. Elle doit aider à comprendre pourquoi l’action est refusée. [Voir exceptions et contrats](#/learn/poo/poo.module-08).
- Extension : ajout d’un nouveau comportement sans modifier inutilement le code déjà stable. C’est l’idée centrale du principe Open/Closed. [Voir principes SOLID](#/learn/poo/poo.module-07).
- `extends` : mot-clé Java qui crée une relation d’héritage entre une classe enfant et une classe parent. Il ne doit être utilisé que si la relation de substitution est vraie. [Voir héritage, composition et polymorphisme](#/learn/poo/poo.module-05).
- Extract Class : refactoring qui déplace une partie cohérente d’une classe vers une nouvelle classe. Il est utile quand une classe accumule plusieurs responsabilités. [Voir refactoring](#/learn/poo/poo.module-10).
- Extract Method : refactoring qui extrait une portion de code dans une méthode nommée. Le nom de la méthode rend l’intention plus lisible. [Voir refactoring](#/learn/poo/poo.module-10).

## F

- Facade : objet qui propose une interface simple devant un ensemble de collaborations plus complexes. Elle réduit la complexité visible pour l’appelant. [Voir design patterns](#/learn/poo/poo.module-11).
- Factory Method : design pattern qui délègue la création d’un objet à une méthode spécialisée. Il aide lorsque le choix de l’objet concret dépend d’un contexte. [Voir design patterns](#/learn/poo/poo.module-11).
- Fake : implémentation simplifiée mais fonctionnelle utilisée dans un test, par exemple un dépôt en mémoire. Le fake remplace une infrastructure lourde. [Voir tests unitaires](#/learn/poo/poo.module-09).
- Fragilité : tendance d’un code à casser lorsqu’on le modifie. Elle augmente souvent avec le couplage fort, les invariants dispersés et les responsabilités mal placées. [Voir responsabilités](#/learn/poo/poo.module-04) et [refactoring](#/learn/poo/poo.module-10).

## G

- Getter : méthode qui expose une information interne. Un getter n’est pas mauvais en soi, mais trop de getters peuvent indiquer que les décisions sont prises hors de l’objet concerné. [Voir encapsulation](#/learn/poo/poo.module-02).
- God Object : objet qui sait trop de choses et décide de trop de choses. Il concentre la complexité et rend le système difficile à tester. [Voir responsabilités, cohésion et couplage](#/learn/poo/poo.module-04).

## H

- Héritage : relation où une classe reprend le comportement d’une autre. Il est adapté quand une sous-classe peut vraiment remplacer sa classe parent sans surprise. [Voir héritage, composition et polymorphisme](#/learn/poo/poo.module-05).

## I

- Identité : propriété qui permet de reconnaître un objet comme le même objet, même si certaines de ses valeurs changent. [Voir paradigme objet](#/learn/poo/poo.module-01).
- Immutabilité : choix de rendre un objet non modifiable après sa création. Elle simplifie le raisonnement, car l’état ne change pas en secret. [Voir contrats et objets-valeurs](#/learn/poo/poo.module-08).
- Information Expert : principe GRASP qui propose de confier une responsabilité à l’objet qui possède les informations nécessaires pour l’assumer. [Voir responsabilités](#/learn/poo/poo.module-04).
- Infrastructure : couche qui contient les détails techniques : base de données, système de fichiers, API externe, framework. Elle doit dépendre du domaine, pas l’inverse. [Voir architecture finale](#/learn/poo/poo.module-12).
- Injection de dépendance : technique qui consiste à fournir ses dépendances à un objet depuis l’extérieur, souvent par constructeur. Elle rend le code plus testable et moins lié aux détails concrets. [Voir interfaces et inversion des dépendances](#/learn/poo/poo.module-06).
- Instance : objet concret créé à partir d’une classe. Deux instances d’une même classe peuvent avoir des états différents. [Voir paradigme objet](#/learn/poo/poo.module-01).
- Interface : contrat qui décrit ce qu’un objet sait faire sans imposer comment il le fait. Elle permet le polymorphisme et réduit la dépendance aux classes concrètes. [Voir interfaces et inversion des dépendances](#/learn/poo/poo.module-06).
- Invariant : règle qui doit toujours rester vraie pour qu’un objet soit valide. Si l’invariant est dispersé, il peut être oublié ; s’il est protégé dans l’objet, le modèle devient plus robuste. [Voir encapsulation](#/learn/poo/poo.module-02) et [contrats](#/learn/poo/poo.module-08).
- ISP : Interface Segregation Principle. Il vaut mieux plusieurs interfaces précises qu’une grosse interface qui force les classes à dépendre de méthodes inutiles. [Voir principes SOLID](#/learn/poo/poo.module-07).

## L

- Loi de Déméter : règle de conception qui limite les chaînes d’appels longues. Elle encourage un objet à parler à ses proches collaborateurs plutôt qu’à naviguer dans toute la structure interne d’un autre objet. [Voir couplage](#/learn/poo/poo.module-04).
- LSP : Liskov Substitution Principle. Une sous-classe doit pouvoir remplacer sa classe parent sans casser les attentes du programme. [Voir héritage](#/learn/poo/poo.module-05) et [SOLID](#/learn/poo/poo.module-07).

## M

- Message : demande envoyée à un objet pour qu’il exécute un comportement. En POO, on pense souvent en objets qui reçoivent des messages plutôt qu’en données manipulées de l’extérieur. [Voir paradigme objet](#/learn/poo/poo.module-01).
- Méthode : comportement nommé d’une classe. Une bonne méthode exprime une intention, respecte le niveau d’abstraction attendu et évite de mélanger plusieurs décisions. [Voir classes et encapsulation](#/learn/poo/poo.module-02).
- Mock : double de test qui vérifie qu’une interaction attendue a eu lieu. Il est utile pour tester une collaboration, mais il peut rendre les tests fragiles s’il est utilisé partout. [Voir tests unitaires](#/learn/poo/poo.module-09).
- Modèle du domaine : ensemble des objets qui représentent les concepts métier et leurs règles. Il ne doit pas être réduit à des structures de données passives. [Voir architecture finale](#/learn/poo/poo.module-12).
- Multiplicité : indication du nombre d’objets possibles dans une relation, par exemple `1`, `0..1` ou `0..*`. Elle clarifie les règles de cardinalité du modèle. [Voir relations entre objets](#/learn/poo/poo.module-03).

## O

- Objet : unité qui combine état, comportement et identité. Un bon objet ne se contente pas de stocker des données : il protège des règles et prend des décisions locales. [Voir paradigme objet](#/learn/poo/poo.module-01).
- Objet anémique : objet métier qui ne contient presque que des données, tandis que les règles sont déplacées dans des services. Ce style peut rendre les invariants plus difficiles à protéger. [Voir responsabilités](#/learn/poo/poo.module-04).
- Objet-valeur : objet sans identité propre, comparé par ses valeurs. Un email, un montant ou une période sont de bons candidats, car leur validité peut être protégée dans le type. [Voir objets-valeurs](#/learn/poo/poo.module-08).
- Observer : design pattern dans lequel un sujet prévient des observateurs lorsqu’un événement arrive. Il découple l’émetteur de ceux qui réagissent. [Voir design patterns](#/learn/poo/poo.module-11).
- OCP : Open/Closed Principle. Un code devrait être ouvert à l’extension mais fermé à la modification inutile. L’objectif est de pouvoir ajouter des variantes sans réécrire le cœur stable. [Voir principes SOLID](#/learn/poo/poo.module-07).
- Orchestration : coordination de plusieurs objets pour réaliser un cas d’utilisation. L’orchestration ne doit pas absorber toutes les règles métier. [Voir architecture finale](#/learn/poo/poo.module-12).

## P

- Paradigme objet : manière de programmer qui organise le logiciel autour d’objets responsables, capables de collaborer par messages. [Voir paradigme objet](#/learn/poo/poo.module-01).
- Polymorphisme : capacité à utiliser plusieurs implémentations derrière un même contrat. Le code appelant dépend de ce qui est promis, pas de la classe concrète. [Voir héritage, composition et polymorphisme](#/learn/poo/poo.module-05).
- Port : interface placée côté application ou domaine pour décrire un besoin externe, comme sauvegarder, envoyer un email ou payer. [Voir interfaces/DIP](#/learn/poo/poo.module-06) et [architecture finale](#/learn/poo/poo.module-12).
- Postcondition : propriété qui doit être vraie après l’exécution d’une méthode si ses préconditions étaient respectées. [Voir contrats](#/learn/poo/poo.module-08).
- Précondition : condition qui doit être vraie avant d’appeler une méthode. Si elle n’est pas respectée, l’appelant utilise mal le contrat. [Voir contrats](#/learn/poo/poo.module-08).
- Principe de responsabilité unique : principe selon lequel une classe doit avoir une raison principale de changer. Il aide à séparer les décisions métier, techniques et de présentation. [Voir SOLID](#/learn/poo/poo.module-07).
- Private : visibilité qui limite l’accès à l’intérieur de la classe. Elle aide à préserver l’encapsulation et à empêcher les modifications incontrôlées. [Voir encapsulation](#/learn/poo/poo.module-02).
- Protected : visibilité accessible depuis la classe et ses sous-classes. Elle peut être utile, mais elle augmente le couplage avec la hiérarchie d’héritage. [Voir héritage](#/learn/poo/poo.module-05).
- Public : visibilité accessible depuis l’extérieur. Tout élément public devient une partie du contrat et doit donc être choisi avec soin. [Voir encapsulation](#/learn/poo/poo.module-02).

## R

- Refactoring : modification de la structure interne du code sans changer son comportement observable. Il sert à rendre le code plus lisible, plus testable ou plus évolutif. [Voir refactoring](#/learn/poo/poo.module-10).
- Repository : objet qui donne l’illusion d’une collection d’objets métier tout en cachant la persistance réelle. Il évite que le domaine connaisse SQL, MongoDB ou un fichier. [Voir architecture finale](#/learn/poo/poo.module-12).
- Responsabilité : décision, connaissance ou action qui appartient à un objet. Une bonne conception consiste souvent à placer chaque responsabilité au bon endroit. [Voir paradigme objet](#/learn/poo/poo.module-01) et [responsabilités](#/learn/poo/poo.module-04).
- Règle métier : contrainte ou décision issue du domaine, par exemple empêcher une réservation sur une séance complète. Elle doit être visible et protégée dans le modèle. [Voir encapsulation](#/learn/poo/poo.module-02) et [domaine](#/learn/poo/poo.module-12).

## S

- Service applicatif : objet qui pilote un cas d’utilisation. Il récupère les dépendances nécessaires, appelle le domaine et gère la transaction ou l’orchestration générale. [Voir architecture finale](#/learn/poo/poo.module-12).
- Service de domaine : objet du domaine utilisé lorsqu’une règle métier ne trouve pas naturellement sa place dans une entité ou un objet-valeur. Il ne doit pas devenir un fourre-tout. [Voir responsabilités](#/learn/poo/poo.module-04).
- Setter : méthode qui modifie directement une donnée. Un setter automatique peut fragiliser un modèle s’il permet de contourner les règles métier. [Voir encapsulation](#/learn/poo/poo.module-02).
- SOLID : famille de cinq principes de conception : SRP, OCP, LSP, ISP et DIP. Ils servent à raisonner sur les responsabilités, les dépendances et l’évolution du code. [Voir principes SOLID](#/learn/poo/poo.module-07).
- SRP : Single Responsibility Principle. Une classe doit avoir une responsabilité principale et une raison principale de changer. [Voir principes SOLID](#/learn/poo/poo.module-07).
- State : design pattern qui déplace le comportement dépendant d’un état dans des objets représentant ces états. Il évite souvent de longues chaînes de conditions. [Voir design patterns](#/learn/poo/poo.module-11).
- Strategy : design pattern qui rend plusieurs algorithmes interchangeables derrière un même contrat. Il est utile lorsque l’on veut choisir un comportement sans modifier le code appelant. [Voir design patterns](#/learn/poo/poo.module-11).
- Stub : double de test qui fournit une réponse contrôlée. Il aide à tester un scénario sans dépendre d’un service réel. [Voir tests unitaires](#/learn/poo/poo.module-09).
- Substitution : propriété attendue de l’héritage : un sous-type doit pouvoir remplacer son type parent sans changer le sens du programme. [Voir héritage et polymorphisme](#/learn/poo/poo.module-05) et [SOLID](#/learn/poo/poo.module-07).

## T

- Test d’état : test qui vérifie l’état final ou la valeur produite après une action. Il est souvent plus stable qu’un test qui vérifie trop précisément les appels internes. [Voir tests unitaires](#/learn/poo/poo.module-09).
- Test d’interaction : test qui vérifie qu’un objet a bien collaboré avec un autre. Il est utile pour les ports et effets externes, mais doit rester ciblé. [Voir tests unitaires](#/learn/poo/poo.module-09).
- Test de caractérisation : test écrit pour capturer le comportement existant avant un refactoring. Il permet de modifier la structure avec moins de risque. [Voir refactoring](#/learn/poo/poo.module-10).
- Test unitaire : test rapide et ciblé qui vérifie une petite unité de comportement. Il aide à documenter les règles et à sécuriser les changements. [Voir tests unitaires](#/learn/poo/poo.module-09).
- Type : catégorie qui définit les valeurs possibles et les opérations autorisées. En POO, créer un type métier peut rendre une règle plus explicite qu’une primitive isolée. [Voir objets-valeurs](#/learn/poo/poo.module-08).

## U

- UML : langage de modélisation utilisé pour représenter des classes, relations, séquences ou états. Il sert à clarifier une discussion de conception, pas à produire une vérité automatique. [Voir relations entre objets](#/learn/poo/poo.module-03).

## V

- Value Object : terme anglais pour objet-valeur. Il désigne un objet défini par ses valeurs, souvent immutable, qui protège une petite règle métier. [Voir objets-valeurs](#/learn/poo/poo.module-08).
- Visibilité : règle qui indique où un attribut, une méthode ou une classe peut être utilisé. Les niveaux comme `private`, `protected` et `public` structurent le contrat et l’encapsulation. [Voir encapsulation](#/learn/poo/poo.module-02).
