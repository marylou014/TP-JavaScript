<div align="center">

# 🍔 Burger Factory ✦

**TD JavaScript : un site de création de burgers, en HTML / CSS / JavaScript pur**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

</div>
---

## ✦ À propos

Burger Factory est un site de 4 pages réalisé en TD de JavaScript (BTS SIO option SLAM, EPSI Montpellier).
On peut y consulter un diaporama de burgers, créer ses propres ingrédients, composer des burgers à partir d'un stock, et découvrir la ferme bio partenaire du restaurant grâce à une API publique.
Les pages HTML et le CSS ont été généré avec Claude, le but étant de se concentrer sur le JS.

Aucune librairie JavaScript n'est utilisée : tout est écrit en JavaScript natif.
 
---

## ✦ Les pages

### 🏠 Accueil (`index.html`)
- Diaporama automatique : l'image change toutes les 10 secondes.
- Au clic sur l'image, le nom du burger s'affiche en dessous. Il disparaît quand l'image change.
### 🥬 Création Ingrédient (`creation-ingredient.html`)
- Formulaire avec un nom et une quantité.
- Vérification des champs : nom obligatoire, quantité supérieure à 0. Un message d'erreur s'affiche entre les deux blocs si besoin.
- Si l'ingrédient existe déjà, sa quantité est additionnée à l'ancienne.
- Les ingrédients sont enregistrés dans le `localStorage` : le nom sert de clé et la quantité de valeur. Ils sont donc retrouvés sur les autres pages.
### 🍔 Création Burger (`creation-burger.html`)
- Les 3 listes déroulantes sont remplies avec les ingrédients du `localStorage` (les ingrédients de base et ceux créés par l'utilisateur).
- Un ingrédient dont le stock est à 0 n'est plus proposé.
- Vérification des champs : nom et 3 ingrédients obligatoires. Le message d'erreur s'affiche sous le bloc du formulaire.
- Les burgers créés sont stockés dans une `Map` (nom du burger en clé, tableau de ses 3 ingrédients en valeur).
- À la création, 1 est déduit du stock de chaque ingrédient utilisé, puis les listes sont mises à jour.
### 🌱 Qui sommes-nous ? (`qui-sommes-nous.html`)
- Appel à l'API de l'Agence Bio (`/api/gouv/operateurs`, méthode GET, avec un SIRET en paramètre) grâce à `XMLHttpRequest`.
- Si la requête réussit, une phrase est construite avec le numéro bio, le gérant et l'adresse de la ferme, suivie de la liste de toutes ses productions.
- Si elle échoue, un message d'erreur s'affiche dans la console.
---

## ✦ Structure du projet

```
TP-JavaScript/
├── index.html                  # Accueil + diaporama
├── creation-ingredient.html    # Formulaire de création d'ingrédient
├── creation-burger.html        # Formulaire de création de burger
├── qui-sommes-nous.html        # Présentation + appel API
├── style.css                   # Styles communs à toutes les pages
├── Script.js                   # JavaScript de toutes les pages
├── img/                        # Images du site
└── README.md
```

Un seul fichier `Script.js` est chargé par toutes les pages. Chaque partie du code est protégée par un test (`if`) qui vérifie que les éléments de la page existent, pour ne s'exécuter que sur la bonne page.
 
---

## ✦ Lancer le projet

1. Cloner le dépôt :
```bash
   git clone https://github.com/marylou014/TP-JavaScript.git
```
2. Ouvrir `index.html` dans un navigateur (ou utiliser le serveur local de ton éditeur).
3. Une connexion internet est nécessaire pour la page « Qui sommes-nous ? » (appel à l'API).
---

## ✦ Notions de JavaScript utilisées

- Sélection et modification du DOM (`getElementById`, `createElement`, `appendChild`, `textContent`)
- Événements (`addEventListener`) et minuterie (`setInterval`)
- Tableaux, boucles `for` et objet `Map`
- Stockage dans le navigateur avec `localStorage` (`getItem`, `setItem`)
- Requête HTTP avec `XMLHttpRequest` et lecture de JSON (`JSON.parse`)
- Validation de formulaire et messages d'erreur
---

## ✦ Source des données

L'API utilisée est celle de l'[Agence Bio](https://opendata.agencebio.org/) (données ouvertes des opérateurs bio).
 
---

<div align="center">
Fait par [Marylou](https://github.com/marylou014)

</div>
 
