// Page d'accueil
// Diapo Burger
let diapoBurger = [ // tableau avec mes img de burgers
    "img/burger-diapo/burger-1.png",
    "img/burger-diapo/burger-2.png",
    "img/burger-diapo/burger-3.png"
]

let nomBurger = [
    "Classic Burger",
    "Double Cheese",
    "Burger Vegge"
]

let index = 0
let img = document.getElementById("image-burger"); // recupère la balise img


function changeImg() {
    index = ( index +1 ) % diapoBurger.length; // indexe qui avance
    img.src = diapoBurger[index]; // change la source de l'image en fonction de l'indexe
    baliseNomBurger.innerHTML = "";
}

setInterval(changeImg, 10000 ); // lance la fonction changeImg avec l'intervalle de 10s

// affiche le nom au click
let baliseNomBurger = document.getElementById("nom-burger"); // récup balise nom-burger

function afficheNom(){ //function qui affiche le nom en fonction de l'index
    baliseNomBurger.innerHTML = nomBurger[index];
}
img.addEventListener("click", afficheNom); // affiche le nom au click
