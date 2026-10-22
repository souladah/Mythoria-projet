const catalogue    = document.querySelector('#boosters');
const panier       = document.querySelector('#cart-items');
const totalSpan    = document.querySelector('#cart-total');
const compteurSpan = document.querySelector('#cart-count');

const messagePanier   = document.querySelector('#cart-empty');
const boutonVider     = document.querySelector('#clear-cart');
const boutonCommander = document.querySelector('#checkout');
const notification    = document.querySelector('#cart-notice');   

const cartes = catalogue.querySelectorAll('[data-product-id]');

const produits = {};

cartes.forEach(function (carte) {
  
 
  const id    = carte.dataset.productId;    
  const nom   = carte.dataset.productName;    
  const prix  = Number(carte.dataset.price);  
  const image = carte.querySelector('img').getAttribute('src'); 
  produits[id] = {
    titre: nom,
    prix: prix,
    image: image,
  };
});


function formaterPrix(prix) {
  return prix.toFixed(2).replace('.', ',') + ' €';
}
function afficherMessage(texte) {
  notification.textContent = texte;
  notification.classList.remove('hidden');
}
let panierProduits = {}; 


let total = 0;      

const CLE_STOCKAGE = 'mythoria-cart-v1';
function sauvegarderPanier() {
  localStorage.setItem(CLE_STOCKAGE, JSON.stringify(panierProduits));
}

function chargerPanier() {
  const texte = localStorage.getItem(CLE_STOCKAGE);
  if (!texte) return;

  const sauvegarde = JSON.parse(texte);

  for (const id in sauvegarde) {
    const quantite = sauvegarde[id];
    if (produits[id] && quantite >= 1 && quantite <= 99) {
      panierProduits[id] = quantite;
    }
  }
}
function afficherPanier() {
  panier.innerHTML = '';
  total = 0;

  for (const id in panierProduits) {
    const produit = produits[id];
    if (!produit) continue;

    const quantite  = panierProduits[id];
    const prixLigne = produit.prix * quantite;  

    total += prixLigne;        

    const li = document.createElement('li');
    li.textContent = produit.titre + ' × ' + quantite + ' — ' + formaterPrix(prixLigne);

    const btn = document.createElement('button');
    btn.textContent = 'Supprimer';
    btn.className = 'supprimer';
    btn.dataset.id = id;
    li.appendChild(btn);

    panier.appendChild(li);
  }
  

  totalSpan.textContent = formaterPrix(total);
  let nombreArticles = 0;
  for (const id in panierProduits) {
    nombreArticles += panierProduits[id];
  }

  compteurSpan.textContent = '(' + nombreArticles + (nombreArticles === 1 ? ' article' : ' articles') + ')';

  if (nombreArticles === 0) {
    messagePanier.classList.remove('hidden');
    boutonVider.disabled = true;
    boutonCommander.disabled = true;
  } else {
    messagePanier.classList.add('hidden');
    boutonVider.disabled = false;
    boutonCommander.disabled = false;
  }
  
}
boutonVider.addEventListener('click', function () {
  panierProduits = {};
  afficherPanier();
  sauvegarderPanier();
  afficherMessage('Le panier a été vidé.');
});
boutonCommander.addEventListener('click', function () {
  if (Object.keys(panierProduits).length === 0) return;

  panierProduits = {};
  afficherPanier();
  sauvegarderPanier();
  afficherMessage('Commande simulée avec succès. Aucun paiement effectué.');
});
function ajouterProduit(id, quantite) {
 const quantiteActuelle = panierProduits[id] || 0;
  panierProduits[id] = quantiteActuelle + quantite;
  afficherPanier();
  sauvegarderPanier();
  afficherMessage(produits[id].titre + ' ajouté au panier.');  
}

catalogue.addEventListener('click', function (e) {
  const bouton = e.target.closest('[data-add-to-cart]');
  if (!bouton) return;

  const article = bouton.closest('[data-product-id]');
  const id = article.dataset.productId;

  const inputQuantite = article.querySelector('[data-quantity]');
  const quantite = Number(inputQuantite.value);

  ajouterProduit(id, quantite);
});
panier.addEventListener('click', function (e) {
  if (!e.target.classList.contains('supprimer')) return;

  const id = e.target.dataset.id;
  delete panierProduits[id];

  afficherPanier();
  sauvegarderPanier();
  afficherMessage('Le booster a été supprimé du panier.');
});


chargerPanier();
afficherPanier();