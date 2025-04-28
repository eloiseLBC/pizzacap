# pizzacap

## 🍕 Pizza Cap — Web App

Ce dépôt contient le site web du projet Pizza Cap, réalisé en React + TypeScript avec Tailwind CSS dans le cadre du projet de 4ᵉ année à l'ISEN.
Il a pour objectif de créer une interface moderne et responsive permettant de consulter, commander des pizzas du restaurant PizzaCap, à partir d'une maquette réalisée sur Figma.

Le site consomme une API externe développée séparément, disponible dans le dépôt apiPizza.

## 🧠 Contexte

-   🕓 Durée de développement : 16 heures de TD présentiel + travail personnel
-   🎓 Projet pédagogique (développement web)
-   🎨 Maquette conçue sur Figma
-   🧪 Tests intégrés
-   🌐 API Flask externe (repo apiPizza)

## 🚀 Technologies utilisées

-   ⚛️ React
-   🧠 TypeScript
-   💨 Tailwind CSS, librairie fancy components
-   📏 ESLint + prettier
-   🧪 Tests front (en cours d'implémentation)

## 📡 Connexion à l'API

Le frontend communique avec une API Flask exposée localement ou en ligne.

### 🔗 L’API est disponible ici : apiPizza

#### Exemple d’endpoints utilisés :

| Méthode | Endpoint       | Description             |
| ------: | -------------- | ----------------------- |
|     GET | `/pizzas`      | Liste des pizzas        |
|     GET | `/pizzas/<id>` | Description d'une pizza |

## 🧪 Tests

Nous prévoyons d’intégrer des tests frontaux pour :

-   Vérifier l’affichage dynamique des pizzas
-   Tester les composants critiques (cards, pages dynamiques, etc.)
-   Garantir la robustesse de l'intégration API

## 📂 Arborescence (à modifier à la fin du projet)

<pre>
pizza-cap/
├── public/
├── src/
|   ├── assets/
│   ├── components/
│   ├── views/
│   ├── layouts/
│   ├── hooks/
│   └── models/
├── .eslintrc.js
├── tailwind.config.js
├── tsconfig.json
└── README.md</pre>

## ✨ À propos

Projet réalisé par Rozenn et Éloïse, étudiantes de 4ᵉ année à JUNIA ISEN, dans le cadre du module de développement web.
