// Page d'accueil
// Diapo Burger
let diapoBurger = [ // tableau avec mes img de burgers
    "img/burger-diapo/burger-1.png",
    "img/burger-diapo/burger-2.png",
    "img/burger-diapo/burger-3.png"
]

let nomBurger = [ // tableau nom des burgers
    "Classic Burger",
    "Double Cheese",
    "Burger Vegge"
]

let index = 0
let img = document.getElementById("image-burger"); // recupère la balise img

function changeImg() {
    index = ( index + 1 ) % diapoBurger.length; // indexe qui avance en boucle
    img.src = diapoBurger[index]; // change la source de l'image en fonction de l'indexe
    baliseNomBurger.innerHTML = ""; // enlève le nom quand ça change l'img
}

// affiche le nom au click
let baliseNomBurger = document.getElementById("nom-burger"); // récup balise nom-burger

function afficheNom(){ //function qui affiche le nom en fonction de l'index
    baliseNomBurger.innerHTML = nomBurger[index]; // change le nom du burger en fonction de l'index
}

//lancement page acceuil
if (img){ // ne marche que si sur la page il y a ma variable img
    setInterval(changeImg, 10000 ); // lance la fonction changeImg avec l'intervalle de 10s
    img.addEventListener("click", afficheNom); // affiche le nom au click sur l'image

}

// -------------------------------------------------------------------------------

// Page créer ingrédient

// créer des ingrédient de base si pas déjà là
if (localStorage.getItem("Steak") === null){
    localStorage.setItem("Steak", 10);
}
if (localStorage.getItem("Pain Burger") === null){
    localStorage.setItem("Pain Burger", 10);
}


let boutonIngredients = document.getElementById("btn-creer-ingredient"); // récup le bouton

// function qui ajoute les ingrédients
function ajouterIngredients(){
    // récup les différents champs
        let nomIngredients = document.getElementById("nom-ingredient").value;
        let quantiteIngredient = document.getElementById("quantite-ingredient").value;
        let messageErreur = document.getElementById("erreur-ingredient");

    if (nomIngredients === ""){ // si nom vide => message erreur
        messageErreur.innerHTML = "ERREUR : nom manquant";
    }
    else if (quantiteIngredient  <= 0){ // si quantité <= 0 => message erreur
        messageErreur.innerHTML = "ERREUR : quantité non valide";
    }
    else {
        // qaund c'est OK
        messageErreur.innerHTML = ""; // pas de message d'erreur
        //console.log("OK :", nomIngredients, quantiteIngredient);

        // vérif si l'ingrédient existe déja
        let ancien = localStorage.getItem(nomIngredients); // recherche si il existe

        if (ancien === null){ // si renvoie null => existe pas => créer l'ingrédient
            localStorage.setItem(nomIngredients, quantiteIngredient);
        }
        else { // changement de  la quantité (ancienne + nouvelle)
            localStorage.setItem(nomIngredients, Number(ancien) + Number(quantiteIngredient));
        }

    }
}

if(boutonIngredients){
    boutonIngredients.addEventListener("click", ajouterIngredients);
}

// -------------------------------------------------------------------------------

// Page créer burger

let mapBurger = new Map(); // map qui stockera les burgers créer

let boutonBurger = document.getElementById("btn-creer-burger"); // récup le bouton

let menuDeroulant = [ // récup des menus déroulants
    document.getElementById("ingredient-1"),
    document.getElementById("ingredient-2"),
    document.getElementById("ingredient-3"),
]

// fonction qui remplie les menus déroulant avec les éléments du locaStorage avec un boucle
function remplirMenuDeroulant(){

    // vider les listes (pour quand ca refresh)
    for (let liste of menuDeroulant){
        liste.innerHTML = "";
        let optionVide = document.createElement("option");
        optionVide.value = "";
        liste.appendChild(optionVide);
    }

    for (let i = 0; i < localStorage.length; i++){

        let nom = localStorage.key(i);

        // vérif que l'ingrédient est en stock (+ de 0 en quantité)
        let verifStock = Number(localStorage.getItem(nom))

        if (verifStock > 0){
            // boucle dans la boucle pour remplir les trois listes
            for (let liste of menuDeroulant){

                let option = document.createElement("option"); // créer un élément de type option
                option.value = nom; // set la value
                option.textContent = nom; // set le nom
                liste.appendChild(option); // ajouter à la liste
            }
        }
    }
}

// function qui créer les burgers
function creerBurger(){
    // récup les différents champs
    let nomBurgerCreer = document.getElementById("nom-burger").value;
    let champ1 = document.getElementById("ingredient-1").value;
    let champ2 = document.getElementById("ingredient-2").value;
    let champ3 = document.getElementById("ingredient-3").value;
    let messageErreurBurger = document.getElementById("erreur-burger");

    if (nomBurgerCreer === ""){ // si nom vide => message erreur
        messageErreurBurger.innerHTML = "ERREUR : nom manquant";
    }
    else if (champ1 === ""){ // si champ1 rien de selectionner
        messageErreurBurger.innerHTML = "ERREUR : Ingrédient 1 manquant";
    }
    else if (champ2 === ""){ // si champ2 rien de selectionner
        messageErreurBurger.innerHTML = "ERREUR : Ingrédient 2 manquant";
    }
    else if (champ3 === ""){ // si champ3 rien de selectionner
        messageErreurBurger.innerHTML = "ERREUR : Ingrédient 3 manquant";
    }
    else {
        // qaund c'est OK
        messageErreurBurger.innerHTML = ""; // pas de message d'erreur
        //console.log("OK :", nomBurgerCreer, champ1, champ2, champ3) ;

        mapBurger.set(nomBurgerCreer, [champ1, champ2, champ3]); // créer le burger et le stock dans la map

        // en déduire les ingrédients
            let optionChoisi = [champ1, champ2, champ3];

            for (let choix of optionChoisi){
                let ancienneQuantite = Number(localStorage.getItem(choix)); // recup la quantité
                //console.log("Avant : ", ancienneQuantite, choix );

                localStorage.setItem(choix, ancienneQuantite -1); // retire 1 à la quantité
                //console.log("Apres : ", choix, localStorage.getItem(choix)) ;
            }
        //maj liste + retire les champs
            remplirMenuDeroulant();
            document.getElementById("nom-burger").value = ""; // vide le champs nom

    }
}

if (menuDeroulant[0] !== null){
    remplirMenuDeroulant();
}
if(boutonBurger){
    boutonBurger.addEventListener("click", creerBurger);
}

// -------------------------------------------------------------------------------

// Qui sommes nous page
let paraAPI = document.getElementById("para-api"); // recup balise paragraphe par l'id
let liste = document.createElement("ul") // créer une balise liste pour mettre les productions

function recupInfoAPI(){ // fonction pour recup les infos
    let requete = new XMLHttpRequest(); // créer nouvelle requete
    requete.onreadystatechange = function() {
        if (requete.readyState == XMLHttpRequest.DONE) { // verif si fini
            if (requete.status == 200) { // verif le status
                // quand OK :
                let resultat = JSON.parse(requete.responseText);
                //console.log(resultat);
                // récup les élément dont j'ai besoin et les attribue à une variable
                    let numBio = resultat.items[0].numeroBio;
                    let gerant = resultat.items[0].gerant;
                    let lieu = resultat.items[0].adressesOperateurs[0].lieu;
                    let codeP = resultat.items[0].adressesOperateurs[0].codePostal;
                    let ville = resultat.items[0].adressesOperateurs[0].ville;
                //console.log(numBio, gerant, lieu, codeP, ville);
                    // recup tout les production grace à une boucle FOR
                    let tabProduction = resultat.items[0].productions; //met toute les production dans tabProduction
                    //console.log(tabProduction);
                    let tailleTabProduction = tabProduction.length // prend la taille de tabProduction
                    for (let i = 0; i < tailleTabProduction; i++) {
                        //console.log(tabProduction[i].nom);
                        let point = document.createElement("li"); // créer les point de la liste
                        point.textContent = tabProduction[i].nom; // met le texte dans les points
                        liste.appendChild(point); //ajoute les point à la liste
                    }
                // ecriture du paragraphe
                    paraAPI.innerHTML = "Notre restaurant travaille avec des produits locaux provenant de la ferme bio numéro " + numBio + " de Monsieur " + gerant + " située à l’adresse " + lieu + " " + codeP + " "  + ville + ". Cette ferme intervient dans les commerces : ";
                    paraAPI.appendChild(liste); // ajoute ma liste après le texte

            }
            else {
                // quand KO
                console.log("ça marche pas"); // message erreur
                console.log("état :", requete.readyState, "statut :", requete.status); // où est l'erreur
            }

        }

    }
    requete.open("GET", "https://opendata.agencebio.org/api/gouv/operateurs/?siret=79317749400028"); // paramètre de la requete méthode GET + URL
    requete.send(); // envoie de la requete
}

//lancement que sur la page qui somme nous
if (paraAPI) { //ne marche que si sur la page il y a ma variable paraAPI
    recupInfoAPI(); // la fonction récup info API
}


