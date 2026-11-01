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

// donnees
let panierProduits = JSON.parse(
    localStorage.getItem("panierMythoria")
) || [];

// stockage 
function sauvegarderPanier() {
    localStorage.setItem(
        "panierMythoria",
        JSON.stringify(panierProduits)
    );
}
// ajout dun produit 
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
}
// ajout clic
function gererClicAjout(bouton){
      const nom = bouton.dataset.name;
        const prix = Number(bouton.dataset.price);//dataset.price in html atribute data-Pric
        const quantite = Number(bouton.previousElementSibling.value);

        if (!quantiteValide(quantite)) {
            alert("Veuillez choisir une quantité entière valide.");
            return;
        }
        ajoutProduit(nom,prix,quantite);
        sauvegarderPanier();
        afficherPanier();
}

// validation de qunatite
function quantiteValide(quantite){
    return Number.isInteger(quantite)&& quantite>0 ;
}

// calcul de contour et total du commande
function calculerTotaux(){
    let totalCalcul=0;
    let quantiteTotale=0;
    for(let i=0;i<panierProduits.length;i++){
        totalCalcul=totalCalcul+panierProduits[i].prix*panierProduits[i].quantite ;
        quantiteTotale=quantiteTotale+panierProduits[i].quantite ;
    }
    return { totalCalcul , quantiteTotale };
}

// augmenter diminuer et supprimer la qunatite d une comande
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

// vider le panier 
function vider() {
    panierProduits.length = 0;
    sauvegarderPanier();
    afficherPanier();
}


// afficher contour et total
function afficherTotaux(){
    const totaux=calculerTotaux();
    total.textContent = totaux.totalCalcul.toFixed(2) + " €";
    contour.textContent =  totaux.quantiteTotale;
}
// afichier panier vide
function afficherPanierVide(){
    mesg.textContent="Votre panier est vide";
    mesg.style.display="list-item";
    listComande.appendChild(mesg);
}
// create + - et supprimer
function creerBouton(text,action){
    const bouton=document.createElement("button");
    bouton.textContent=text;
    bouton.type="button";
    bouton.addEventListener("click",()=>{
        action();
        sauvegarderPanier();
        afficherPanier();
    });
    return bouton ;
}
// creer les li
function creerLigneProduit(produit,index){
    const ligne=document.createElement("li");
    ligne.textContent=
      produit.nom+" "+
      produit.prix.toFixed(2)+" € × "+
      produit.quantite+" = "+
      (produit.prix*produit.quantite).toFixed(2)+" € ";

    const dimunerBtn=creerBouton("-",function(){diminuerQuantite(index)});

    const addBtn=creerBouton("+",function(){augmenterQuantite(index)});

    const removBtn=creerBouton("supprimer",function(){supprimerProduit(index)});

    ligne.appendChild(dimunerBtn);
    ligne.appendChild(addBtn);
    ligne.appendChild(removBtn);
    return ligne ;
}

// affichage
function afficherPanier() {
    afficherTotaux();

    listComande.innerHTML = "";// pour lors dajout un produit ne s affiche pas deeux fois 

    if (panierProduits.length === 0) {
       
     afficherPanierVide();
     return ;
    }

    mesg.style.display = "none";

    for (let i = 0; i < panierProduits.length; i++) {
        let toutLesLigne=creerLigneProduit(panierProduits[i],i);
        listComande.appendChild(toutLesLigne);
    }
}



// sauvegarder les boosters achter dans  local storage
function ajouterBoostersInventaire(){
     let inventaire = JSON.parse(
        localStorage.getItem("mythoriaBoosters")
    ) || [];

       for (const { nom, quantite } of panierProduits) {
            const existant = inventaire.find(b=>
                b.nom === nom
            );

            if (existant) {
                existant.quantite += quantite;
            } else {
                inventaire.push({
                    id: Math.random(),
                    nom: nom,
                    quantite: quantite
                });
            }
        }

    localStorage.setItem(
        "mythoriaBoosters",
        JSON.stringify(inventaire)
    );

}
// comander
function commander(){
  if (panierProduits.length === 0) {
        alert("Votre panier est vide.");
        return;
    }
    ajouterBoostersInventaire();
    alert(
        "Commande validée ! Total : " +
        total.textContent +
        "\nTes boosters sont disponibles dans Ouverture."
    );

    vider();
}

// les events
function initialiserEvenements(){
    for(let i=0; i<ajoutBtn.length;i++){
        ajoutBtn[i].addEventListener("click",()=>{
            gererClicAjout(ajoutBtn[i]);
        });
    }
        openPanier.addEventListener("click", () => {
           panier.classList.remove("hidden");});
        closBtn.addEventListener("click", () => {
           panier.classList.add("hidden");});
        viderBtn.addEventListener("click", vider);
        comanderBtn.addEventListener("click",commander);
}


initialiserEvenements();
afficherPanier();
