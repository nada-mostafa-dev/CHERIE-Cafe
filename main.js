/* ==========================================================================
   CHÉRIE Desserts & Salons - Interactive Functionality
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  
  // --- Cart Data ---
  let cart = [
    { id: 1, title: 'Strawberry Cheesecake', price: 160, qty: 1 },
    { id: 2, title: 'Iced Spanish Latte', price: 110, qty: 1 }
  ];

  // --- DOM Elements ---
  const cartToggleBtn = document.getElementById('cartToggle');
  const heroOrderBtn = document.getElementById('heroOrderBtn');
  const orderNowBtn = document.getElementById('orderNowBtn');
  const closeCartBtn = document.getElementById('closeCart');
  const cartSidebar = document.getElementById('cartSidebar');
  const cartOverlay = document.getElementById('cartOverlay');
  const cartItemsList = document.getElementById('cartItemsList');
  const cartBadgeCount = document.getElementById('cartBadgeCount');
  const cartSubtotal = document.getElementById('cartSubtotal');
  const filterTabs = document.querySelectorAll('.tab-btn');
  const miniCards = document.querySelectorAll('.mini-product-card');

  // --- Open / Close Cart Sidebar ---
  function openCart() {
    cartSidebar.classList.add('open');
    cartOverlay.classList.add('active');
  }

  function closeCart() {
    cartSidebar.classList.remove('open');
    cartOverlay.classList.remove('active');
  }

  if (cartToggleBtn) cartToggleBtn.addEventListener('click', openCart);
  if (heroOrderBtn) heroOrderBtn.addEventListener('click', openCart);
  if (orderNowBtn) orderNowBtn.addEventListener('click', openCart);
  if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

  // --- Render Cart Items ---
  function renderCart() {
    cartItemsList.innerHTML = '';
    let total = 0;
    let itemCount = 0;

    cart.forEach((item, index) => {
      total += item.price * item.qty;
      itemCount += item.qty;

      const itemEl = document.createElement('div');
      itemEl.className = 'cart-item';
      itemEl.innerHTML = `
        <div class="cart-item-info">
          <h4 class="cart-item-title">${item.title}</h4>
          <p class="cart-item-price">EGP ${item.price.toFixed(2)}</p>
        </div>
        <div class="cart-item-controls">
          <div class="qty-control">
            <button class="btn-qty minus" data-index="${index}">-</button>
            <span class="qty-val">${item.qty}</span>
            <button class="btn-qty plus" data-index="${index}">+</button>
          </div>
          <button class="btn-remove-item" data-index="${index}"><i class="fa-regular fa-trash-can"></i></button>
        </div>
      `;
      cartItemsList.appendChild(itemEl);
    });

    cartBadgeCount.textContent = itemCount;
    cartSubtotal.textContent = `EGP ${total}`;

    attachCartEventListeners();
  }

  // --- Quantity & Remove Handlers ---
  function attachCartEventListeners() {
    document.querySelectorAll('.btn-qty.plus').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = e.target.getAttribute('data-index');
        cart[idx].qty += 1;
        renderCart();
      });
    });

    document.querySelectorAll('.btn-qty.minus').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = e.target.getAttribute('data-index');
        if (cart[idx].qty > 1) {
          cart[idx].qty -= 1;
        } else {
          cart.splice(idx, 1);
        }
        renderCart();
      });
    });

    document.querySelectorAll('.btn-remove-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = e.currentTarget.getAttribute('data-index');
        cart.splice(idx, 1);
        renderCart();
      });
    });
  }

  // --- Add to Cart Global Function ---
  window.addToCart = function(title, price) {
    const existing = cart.find(item => item.title === title);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ id: Date.now(), title, price, qty: 1 });
    }
    renderCart();
    openCart();
  };

  // --- Seasonal Patisserie Category Filter ---
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterValue = tab.getAttribute('data-filter');

      miniCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --- Form Submission Handling ---
  const inquiryForm = document.getElementById('inquiryForm');
  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you for reaching out! Our concierge at CHÉRIE will review your request and contact you shortly.');
      inquiryForm.reset();
    });
  }

  // Initial Render
  renderCart();
});