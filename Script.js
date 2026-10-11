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
