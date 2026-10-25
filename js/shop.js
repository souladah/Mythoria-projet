const cart = []; 

const cartIconBtn  = document.getElementById('cart-icon-btn');
const cartModal    = document.getElementById('cart-modal');
const closeCartBtn = document.getElementById('close-cart');
const cartBadge    = document.getElementById('cart-badge');
const listePanier  = document.getElementById('liste-panier');
const totalPrix    = document.getElementById('total-prix');
const btnVider     = document.getElementById('btn-vider');
const btnCommander = document.getElementById('btn-commander');

cartIconBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  cartModal.classList.toggle('hidden');
});
closeCartBtn.addEventListener('click', () => cartModal.classList.add('hidden'));

document.querySelectorAll('.btn-add-cart').forEach(btn => {
  btn.addEventListener('click', () => {
    const name     = btn.dataset.name;
    const price    = parseFloat(btn.dataset.price);
    const input    = document.getElementById(btn.dataset.quantityInput);
    const quantity = Math.max(1, parseInt(input.value) || 1);

    const existing = cart.find(item => item.name === name);
    if (existing) existing.quantity += quantity;
    else cart.push({ name, price, quantity });

    input.value = 1;
    renderCart();
    cartModal.classList.remove('hidden');
  });
});

function renderCart() {
  listePanier.innerHTML = '';

  if (cart.length === 0) {
    listePanier.innerHTML = '<li class="py-4 text-center text-slate-500">Votre panier est vide.</li>';
    totalPrix.textContent = '0,00 €';
    cartBadge.textContent = '0';
    return;
  }

  let total = 0;
  let totalArticles = 0;

  cart.forEach((item, index) => {
    total         += item.price * item.quantity;
    totalArticles += item.quantity;

    const li = document.createElement('li');
    li.className = 'flex items-center justify-between gap-3 py-3';
    li.innerHTML = `
      <div class="flex-1">
        <p class="font-semibold text-white">${item.name}</p>
        <p class="text-sm text-slate-400">${item.price.toFixed(2).replace('.', ',')} € × ${item.quantity}</p>
      </div>
      <div class="flex items-center gap-2">
        <button type="button" class="btn-minus w-7 h-7 rounded border border-white/20 text-white hover:bg-white/10" data-index="${index}">−</button>
        <span class="w-6 text-center text-white">${item.quantity}</span>
        <button type="button" class="btn-plus w-7 h-7 rounded border border-white/20 text-white hover:bg-white/10" data-index="${index}">+</button>
        <button type="button" class="btn-remove ml-2 text-red-400 hover:text-red-300" data-index="${index}">✕</button>
      </div>
    `;
    listePanier.appendChild(li);
  });

  totalPrix.textContent = total.toFixed(2).replace('.', ',') + ' €';
  cartBadge.textContent = totalArticles;

  listePanier.querySelectorAll('.btn-plus').forEach(b => {
    b.addEventListener('click', () => {
      cart[b.dataset.index].quantity++;
      renderCart();
    });
  });
  listePanier.querySelectorAll('.btn-minus').forEach(b => {
    b.addEventListener('click', () => {
      const i = b.dataset.index;
      if (cart[i].quantity > 1) cart[i].quantity--;
      else cart.splice(i, 1);
      renderCart();
    });
  });
  listePanier.querySelectorAll('.btn-remove').forEach(b => {
    b.addEventListener('click', () => {
      cart.splice(b.dataset.index, 1);
      renderCart();
    });
  });
}

btnVider.addEventListener('click', () => {
  cart.length = 0;
  renderCart();
});

btnCommander.addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Votre panier est vide.');
    return;
  }
  alert('Merci pour votre commande ! 🎉');
  cart.length = 0;
  renderCart();
  cartModal.classList.add('hidden');
});

document.addEventListener('click', (e) => {
  if (!cartModal.classList.contains('hidden')
      && !cartModal.contains(e.target)
      && e.target !== cartIconBtn
      && !cartIconBtn.contains(e.target)) {
    cartModal.classList.add('hidden');
  }
});

renderCart();