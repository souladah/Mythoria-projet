const catalogue    = document.querySelector('#boosters');   


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

