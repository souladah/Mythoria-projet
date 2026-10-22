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

function creerBoutonPanier(texte, action, id, classes, etiquette) {
  const bouton = document.createElement('button');
  bouton.type = 'button';
  bouton.textContent = texte;
  bouton.dataset.action = action;
  bouton.dataset.id = id;
  bouton.className = classes;
  bouton.setAttribute('aria-label', etiquette);
  return bouton;
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
    li.className = 'group relative flex flex-col gap-4 rounded-2xl border border-amber-300/15 bg-gradient-to-r from-slate-900/90 via-slate-950/80 to-indigo-950/40 p-4 shadow-lg shadow-black/20 transition duration-300 hover:-translate-y-0.5 hover:border-amber-300/40 hover:shadow-xl hover:shadow-amber-950/20 sm:flex-row sm:items-center sm:gap-5 sm:p-5';

    const visuel = document.createElement('div');
    visuel.className = 'relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-amber-200/30 bg-slate-950 p-1 shadow-lg shadow-amber-950/20';

    const image = document.createElement('img');
    image.src = produit.image;
    image.alt = 'Illustration de ' + produit.titre;
    image.className = 'h-full w-full rounded-lg object-contain transition duration-500 group-hover:scale-110';
    image.loading = 'lazy';
    visuel.appendChild(image);

    const sceau = document.createElement('span');
    sceau.textContent = '✦';
    sceau.className = 'absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full border border-amber-200/40 bg-slate-950/85 text-[10px] text-amber-200';
    visuel.appendChild(sceau);

    const details = document.createElement('div');
    details.className = 'min-w-0 flex-1';

    const label = document.createElement('p');
    label.className = 'mb-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-amber-300/80';
    label.textContent = 'Butin enchanté';

    const nom = document.createElement('h3');
    nom.className = 'font-[Cinzel] text-sm font-bold leading-6 text-white sm:text-base';
    nom.textContent = produit.titre;

    const prixUnitaire = document.createElement('p');
    prixUnitaire.className = 'mt-1 text-xs text-slate-400';
    prixUnitaire.textContent = formaterPrix(produit.prix) + ' · pièce';
    details.append(label, nom, prixUnitaire);

    const commandes = document.createElement('div');
    commandes.className = 'flex items-center justify-between gap-4 sm:justify-end';

    const quantites = document.createElement('div');
    quantites.className = 'inline-flex items-center rounded-full border border-white/10 bg-slate-950/70 p-1 shadow-inner';
    const diminuer = creerBoutonPanier('−', 'diminuer', id, 'flex h-8 w-8 items-center justify-center rounded-full text-lg text-slate-300 transition hover:bg-amber-300/15 hover:text-amber-100 disabled:cursor-not-allowed disabled:opacity-30', 'Retirer une unité de ' + produit.titre);
    diminuer.disabled = quantite <= 1;
    const nombre = document.createElement('span');
    nombre.className = 'min-w-9 px-2 text-center text-sm font-bold text-white';
    nombre.textContent = String(quantite);
    const augmenter = creerBoutonPanier('+', 'augmenter', id, 'flex h-8 w-8 items-center justify-center rounded-full text-lg text-amber-200 transition hover:bg-amber-300/15 hover:text-amber-100 disabled:cursor-not-allowed disabled:opacity-30', 'Ajouter une unité de ' + produit.titre);
    augmenter.disabled = quantite >= 99;
    quantites.append(diminuer, nombre, augmenter);

    const resume = document.createElement('div');
    resume.className = 'min-w-24 text-right';
    const prix = document.createElement('p');
    prix.className = 'font-[Cinzel] text-base font-bold text-amber-200';
    prix.textContent = formaterPrix(prixLigne);
    const sousTitre = document.createElement('p');
    sousTitre.className = 'text-[10px] uppercase tracking-widest text-slate-500';
    sousTitre.textContent = 'Sous-total';
    resume.append(prix, sousTitre);

    const supprimer = creerBoutonPanier('×', 'supprimer', id, 'absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full border border-white/10 text-lg leading-none text-slate-500 transition hover:border-rose-300/50 hover:bg-rose-400/10 hover:text-rose-200 sm:static sm:h-9 sm:w-9 sm:text-base', 'Supprimer ' + produit.titre + ' du panier');
    commandes.append(quantites, resume, supprimer);

    li.append(visuel, details, commandes);

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
  const bouton = e.target.closest('[data-action]');
  if (!bouton) return;

  const id = bouton.dataset.id;
  const action = bouton.dataset.action;

  if (action === 'augmenter' && panierProduits[id] < 99) {
    panierProduits[id] += 1;
  } else if (action === 'diminuer' && panierProduits[id] > 1) {
    panierProduits[id] -= 1;
  } else if (action === 'supprimer') {
    delete panierProduits[id];
  } else {
    return;
  }

  afficherPanier();
  sauvegarderPanier();
  if (action === 'supprimer') afficherMessage('Le booster a été supprimé du panier.');
});


chargerPanier();
afficherPanier();
