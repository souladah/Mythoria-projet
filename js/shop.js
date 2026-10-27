const panier = document.getElementById("panier");
const total = document.getElementById("total-prix");
const contour = document.getElementById("cart-contour");
const mesg = document.getElementById("panier-vide");
const viderBtn = document.getElementById("btn-vider");
const comanderBtn = document.getElementById("btn-commander");
const listComande = document.getElementById("liste-panier");
const closBtn = document.getElementById("close-panier");
const openPanier = document.getElementById("cart-icon-btn");
const ajoutBtn = document.querySelectorAll(".btn-add-cart");// pour selectionner tout les btn dajout de boosters au pnier

let panierProduits = JSON.parse(
    localStorage.getItem("panierMythoria")
) || [];

for (let i = 0; i < ajoutBtn.length; i++) {
    ajoutBtn[i].addEventListener("click", () => {
        const nom = ajoutBtn[i].dataset.name;
        const prix = Number(ajoutBtn[i].dataset.price);//dataset.price in html atribute data-Pric
        const quantite = Number(ajoutBtn[i].previousElementSibling.value);

        if (!Number.isInteger(quantite) || quantite <= 0) {
            alert("Veuillez choisir une quantité entière valide.");
            return;
        }

        const produitExistant = panierProduits.find(
            p => p.nom === nom
        );

        if (produitExistant) {
            produitExistant.quantite += quantite;
        } else {
            panierProduits.push({
                nom: nom,
                prix: prix,
                quantite: quantite
            });
        }

        sauvegarderPanier();
        afficherPanier();
    });
}

openPanier.addEventListener("click", () => {
    panier.classList.remove("hidden");
});

closBtn.addEventListener("click", () => {
    panier.classList.add("hidden");
});

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

    if (panierProduits.length === 0) {
        mesg.textContent = "Votre panier est vide";
        mesg.style.display = "list-item";
        listComande.appendChild(mesg);
        return;
    }

    mesg.style.display = "none";

    for (let i = 0; i < panierProduits.length; i++) {
        const newProduit = document.createElement("li");

        newProduit.textContent =
            panierProduits[i].nom + " " +
            panierProduits[i].prix.toFixed(2) + " € × " +
            panierProduits[i].quantite + " = " +
            (panierProduits[i].prix * panierProduits[i].quantite).toFixed(2) + " € ";

        const addBtn = document.createElement("button");
        addBtn.textContent = "+";
        addBtn.type = "button";

        addBtn.addEventListener("click", () => {
            panierProduits[i].quantite++;
            sauvegarderPanier();
            afficherPanier();
        });

        const diminuerBtn = document.createElement("button");
        diminuerBtn.textContent = "-";
        diminuerBtn.type = "button";

        diminuerBtn.addEventListener("click", () => {
            if (panierProduits[i].quantite > 1) {
                panierProduits[i].quantite--;
            } else {
                panierProduits.splice(i, 1);
            }

            sauvegarderPanier();
            afficherPanier();
        });

        const removeBTn = document.createElement("button");
        removeBTn.textContent = "Supprimer";
        removeBTn.type = "button";

        removeBTn.addEventListener("click", () => {
            panierProduits.splice(i, 1);
            sauvegarderPanier();
            afficherPanier();
        });

        newProduit.appendChild(diminuerBtn);
        newProduit.appendChild(addBtn);
        newProduit.appendChild(removeBTn);

        listComande.appendChild(newProduit);
    }
}

function sauvegarderPanier() {
    localStorage.setItem(
        "panierMythoria",
        JSON.stringify(panierProduits)
    );
}

function vider() {
    panierProduits.length = 0;
    sauvegarderPanier();
    afficherPanier();
}

viderBtn.addEventListener("click", () => {
    vider();
});

comanderBtn.addEventListener("click", () => {
    if (panierProduits.length === 0) {
        alert("Votre panier est vide.");
        return;
    }

    let inventaire = JSON.parse(
        localStorage.getItem("mythoriaBoosters")
    ) || [];

    panierProduits.forEach(produit => {
        for (let i = 0; i < produit.quantite; i++) {
            inventaire.push({
                id: Date.now() + Math.random(),
                type: produit.nom ,
            });
        }
    });

    localStorage.setItem(
        "mythoriaBoosters",
        JSON.stringify(inventaire)
    );

    alert(
        "Commande validée ! Total : " +
        total.textContent +
        "\nTes boosters sont disponibles dans Ouverture."
    );

    vider();
});

afficherPanier();
