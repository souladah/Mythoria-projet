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

        if (!quantiteValide(quantite)) {
            alert("Veuillez choisir une quantité entière valide.");
            return;
        }
        ajoutProduit(nom,prix,quantite);
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
function quantiteValide(quantite){
    return Number.isInteger(quantite)&& quantite>0 ;
}
function ajoutProduit(nom,prix,quantite){
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
};
function calculerTotaux(){
    let totalCalcul=0;
    let quantiteTotale=0;
    for(let i=0;i<panierProduits.length;i++){
        totalCalcul=totalCalcul+panierProduits[i].prix*panierProduits[i].quantite ;
        quantiteTotale=quantiteTotale+panierProduits[i].quantite ;
    }
    return { totalCalcul , quantiteTotale };
}
function afficherTotaux(){
    const totaux=calculerTotaux();
    total.textContent = totaux.totalCalcul.toFixed(2) + " €";
    contour.textContent =  totaux.quantiteTotale;
}
function afficherPanierVide(){
    mesg.textContent="Votre panier est vide";
    mesg.style.display="list-item";
    listComande.appendChild(mesg);
}

function creerBouton(text,action){
    const bouton=document.createElement("button");
    bouton.textContent=text;
    bouton.type="button";
    bouton.addEventListener("click",()=>{
        action();
        sauvegarderPanier();
        afficherPanier()
    })
    return bouton ;
}
function creerLigneProduit(produit,index){
    const ligne=document.createElement("li");
    ligne.textContent=
      produit.nom+" "+
      produit.prix.toFixed(2)+" €  x "+
      produit.quantite+" = "+
      (produit.prix*produit.quantite).toFixed(2)+" € ";

    const dimunerBtn=creerBouton("-",()=>{
        diminuerQuantite(index);
    });
    const addBtn=creerBouton("+",()=>{
       augmenterQuantite(index);
    });

    const removBtn=creerBouton("Supprimer",()=>{
           supprimerProduit(index);
    });
    ligne.appendChild(dimunerBtn);
    ligne.appendChild(addBtn);
    ligne.appendChild(removBtn);
    return ligne ;
}

function augmenterQuantite(index){
    panierProduits[index].quantite++;
}
function diminuerQuantite(index){
    if(panierProduits[index].quantite>1){
        panierProduits[index].quantite--;
    }else{
        panierProduits.splice(index,1);
    }
}
function supprimerProduit(index){
    panierProduits.splice(index,1);
}
function afficherPanier() {
    afficherTotaux();

    listComande.innerHTML = "";

    if (panierProduits.length === 0) {
       
     afficherPanierVide();
     return ;
    }

    mesg.style.display = "none";

    for (let i = 0; i < panierProduits.length; i++) {
       

        listComande.appendChild(creerLigneProduit(panierProduits[i],i));
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
