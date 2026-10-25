const boosters = document.getElementById("boosters");
const panier = document.getElementById("panier");
const total = document.getElementById("total-prix");
const contour = document.getElementById("cart-contour");
const mesg = document.getElementById("panier-vide");
const viderBtn = document.getElementById("btn-vider");
const comanderBtn = document.getElementById("btn-commander");
const listComande = document.getElementById("liste-panier");
const closBtn = document.getElementById("close-panier");
const openPanier = document.getElementById("cart-icon-btn");
const ajoutBtn = document.querySelectorAll(".btn-add-cart");


let panierProduits = [];

for (let i = 0; i < ajoutBtn.length; i++) {

    ajoutBtn[i].addEventListener("click", () => {

        const nom = ajoutBtn[i].dataset.name;
        const prix = Number(ajoutBtn[i].dataset.price);

        const quantite = Number(ajoutBtn[i].previousElementSibling.value);
        if (quantite <= 0) {
            alert("Veuillez choisir une quantité valide.");
            return;
        }

        const produitExistant = panierProduits.find(
            p => p.nom === nom
        );

        if (produitExistant) {

            produitExistant.quantite = produitExistant.quantite + quantite ;

        } else {

            panierProduits.push({
                nom: nom,
                prix: prix,
                quantite: quantite
            });
        }

        afficherPanier();
    });
}

openPanier.addEventListener("click",()=>{
    panier.classList.remove("hidden") ;
})

closBtn.addEventListener("click",()=>{
      panier.classList.add("hidden") ;

})

function afficherPanier() {
    let totalCalcul = 0;
    let quantiteTotale = 0;

    for (let i = 0; i < panierProduits.length; i++) {
        totalCalcul += panierProduits[i].prix * panierProduits[i].quantite;
        quantiteTotale += panierProduits[i].quantite;
    }

    total.textContent = totalCalcul.toFixed(2) + " €";
    contour.textContent = quantiteTotale;

    listComande.innerHTML = "";

    mesg.classList.add("none") ;

    for (let i = 0; i < panierProduits.length; i++) {
        const newProduit = document.createElement("li");

        newProduit.textContent =
            panierProduits[i].nom + " " +
            panierProduits[i].prix + " € × " +
            panierProduits[i].quantite + " = " +
            (panierProduits[i].prix * panierProduits[i].quantite) + " € ";

        const removeBTn = document.createElement("button");
        removeBTn.textContent = "Supprimer";
        removeBTn.type = "button";

        removeBTn.addEventListener("click", () => {
            panierProduits.splice(i, 1);
            afficherPanier();
        });

        newProduit.appendChild(removeBTn);
        listComande.appendChild(newProduit);
    }
}

