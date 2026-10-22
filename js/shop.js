const catalogue    = document.querySelector('#boosters');   
const panier       = document.querySelector('#cart-items');
const totalSpan    = document.querySelector('#cart-total');
const compteurSpan = document.querySelector('#cart-count');

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

let panierProduits = {}; 


let total = 0;      

function afficherPanier() {
  panier.innerHTML = '';
  total = 0;

  for (const id in panierProduits) {
    const produit = produits[id];        
    if (!produit) continue;              

    total += produit.prix;

    const li = document.createElement('li');
    li.textContent = produit.titre + ' — ' + formaterPrix(produit.prix);
    const btn = document.createElement('button');
    btn.textContent = 'Supprimer';
    btn.className = 'supprimer';
    btn.dataset.id = id;
    li.appendChild(btn);
    panier.appendChild(li);
  }

  totalSpan.textContent = formaterPrix(total);
}

function ajouterProduit(id) {
  panierProduits[id] = 1;  
  afficherPanier();
}

catalogue.addEventListener('click', function (e) {
  const bouton = e.target.closest('[data-add-to-cart]');
  if (!bouton) return;

  const article = bouton.closest('[data-product-id]');
  const id = article.dataset.productId;

  ajouterProduit(id);
});
panier.addEventListener('click', function (e) {
  if (!e.target.classList.contains('supprimer')) return;

  const id = e.target.dataset.id;
  delete panierProduits[id];

  afficherPanier();
});


afficherPanier();