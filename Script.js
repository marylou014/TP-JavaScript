//CREATION INGREDIENT

// Récupérer le bouton grâce à son identifiant HTML
let boutonIngredient = document.getElementById("btn-creer-ingredient");


// Fonction exécutée quand on clique sur le bouton
function creerIngredient() {

    // Récupérer le nom saisi
    let nom = document.getElementById("nom-ingredient").value;

    // Récupérer la quantité saisie
    let quantite = document.getElementById("quantite-ingredient").value;

    // Récupérer l'endroit où afficher les erreurs
    let erreur = document.getElementById("erreur-ingredient");


    // Vérifier si le nom est vide
    if (nom.trim() === "") {

        erreur.textContent = "Le nom est obligatoire.";

    }

    // Vérifier si la quantité est vide
    else if (quantite === "") {

        erreur.textContent = "La quantité est obligatoire.";

    }

    // Vérifier si la quantité est supérieure à 0
    else if (Number(quantite) <= 0) {

        erreur.textContent = "La quantité doit être > à 0.";

    }

    // Si les informations sont correctes
    else {

        // Enlever le message d'erreur
        erreur.textContent = "";

        // Récupérer les ingrédients enregistrés
        let ingredients = JSON.parse(localStorage.getItem("ingredients"));

        // Créer un tableau s'il n'existe pas
        if (ingredients === null) {
            ingredients = [];
        }

        // Créer un objet contenant le nom et la quantité
        let ingredient = {
            nom: nom,
            quantite: Number(quantite)
        };

        // Ajouter l'ingrédient au tableau
        ingredients.push(ingredient);

        // Stocker les ingrédients dans le navigateur
        localStorage.setItem("ingredients", JSON.stringify(ingredients));

    }
}


// Détecter le clic sur le bouton
if (boutonIngredient !== null) {
    boutonIngredient.addEventListener("click", creerIngredient);
}


//  LISTES CREATION BURGER


// Récupérer les trois listes déroulantes
let liste1 = document.getElementById("ingredient-1");
let liste2 = document.getElementById("ingredient-2");
let liste3 = document.getElementById("ingredient-3");


// Fonction pour afficher les ingrédients enregistrés
function afficherIngredients() {

    // Récupérer les ingrédients stockés
    let ingredients = JSON.parse(localStorage.getItem("ingredients"));

    // Vérifier si des ingrédients sont enregistrés
    if (ingredients !== null) {

        // Parcourir le tableau avec une boucle for
        for (let i = 0; i < ingredients.length; i++) {

            // Récupérer le nom de l'ingrédient
            let nom = ingredients[i].nom;


            // Ajouter l'ingrédient à la première liste
            let option1 = document.createElement("option");

            option1.value = nom;
            option1.textContent = nom;

            liste1.appendChild(option1);


            // Ajouter l'ingrédient à la deuxième liste
            let option2 = document.createElement("option");

            option2.value = nom;
            option2.textContent = nom;

            liste2.appendChild(option2);


            // Ajouter l'ingrédient à la troisième liste
            let option3 = document.createElement("option");

            option3.value = nom;
            option3.textContent = nom;

            liste3.appendChild(option3);

        }
    }
}


// Vérifier que les trois listes existent sur cette page
if (liste1 !== null && liste2 !== null && liste3 !== null) {

    // Afficher les ingrédients dans les listes
    afficherIngredients();

}
