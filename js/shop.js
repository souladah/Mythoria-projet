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

        const inputQuantite = document.getElementById(
            ajoutBtn[i].dataset.quantityInput
        );

        const quantite = Number(inputQuantite.value);

        if (quantite <= 0) {
            alert("Veuillez choisir une quantité valide.");
            return;
        }

        const produitExistant = panierProduits.find(
            p => p.nom === nom
        );

        if (produitExistant) {

            produitExistant.quantite = produitExistant.quantite+quantite;

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

