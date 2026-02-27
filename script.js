/* 
   Be'Lovd Bakery - Core Logic
*/

// ===== CART STATE =====
let cart = [];

function loadCart() {
    const savedCart = localStorage.getItem('belovd_cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartUI();
    }
}

function saveCart() {
    localStorage.setItem('belovd_cart', JSON.stringify(cart));
}

function toggleCart(forceClose = null) {
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('cartOverlay');

    if (forceClose === false) {
        if (sidebar) sidebar.classList.remove('open');
        if (overlay && !document.querySelector('.cart-sidebar.open')) overlay.classList.remove('show');
        return;
    }

    if (sidebar) sidebar.classList.toggle('open');
    if (overlay) overlay.classList.toggle('show');

    // Close others
    const menuS = document.getElementById('menuSidebar');
    const accS = document.getElementById('accountSidebar');
    if (menuS && menuS.classList.contains('open')) menuS.classList.remove('open');
    if (accS && accS.classList.contains('open')) accS.classList.remove('open');
}

function toggleMenuSidebar(forceClose = null) {
    const sidebar = document.getElementById('menuSidebar');
    const overlay = document.getElementById('cartOverlay');

    if (forceClose === false) {
        if (sidebar) sidebar.classList.remove('open');
        if (overlay && !document.querySelector('.cart-sidebar.open')) overlay.classList.remove('show');
        return;
    }

    if (sidebar) sidebar.classList.toggle('open');
    if (overlay) overlay.classList.toggle('show');

    // Close others
    const cartS = document.getElementById('cartSidebar');
    const accS = document.getElementById('accountSidebar');
    if (cartS && cartS.classList.contains('open')) cartS.classList.remove('open');
    if (accS && accS.classList.contains('open')) accS.classList.remove('open');
}

function toggleAccount(forceClose = null) {
    const sidebar = document.getElementById('accountSidebar');
    const overlay = document.getElementById('cartOverlay');

    if (forceClose === false) {
        if (sidebar) sidebar.classList.remove('open');
        if (overlay && !document.querySelector('.cart-sidebar.open')) overlay.classList.remove('show');
        return;
    }

    if (sidebar) sidebar.classList.toggle('open');
    if (overlay) overlay.classList.toggle('show');

    // Close others
    const cartS = document.getElementById('cartSidebar');
    const menuS = document.getElementById('menuSidebar');
    if (cartS && cartS.classList.contains('open')) cartS.classList.remove('open');
    if (menuS && menuS.classList.contains('open')) menuS.classList.remove('open');
}

function addToCart(name, price, image) {
    const existing = cart.find(item => item.name === name);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ name, price: parseInt(price), image: image || '', quantity: 1 });
    }
    saveCart();
    updateCartUI();
    showNotification(`Added "${name}" to your cart!`);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartUI();
}

function updateQuantity(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
        removeFromCart(index);
    } else {
        saveCart();
        updateCartUI();
    }
}

function updateCartUI() {
    const cartItems = document.getElementById('cartItems');
    const cartCounts = document.querySelectorAll('.cart-count');
    const cartTotal = document.getElementById('cartTotal');
    if (!cartItems || !cartTotal) return;

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCounts.forEach(el => el.textContent = totalItems);

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `₹${total.toLocaleString('en-IN')}`;

    // Free delivery progress logic
    const FREE_DELIVERY_THRESHOLD = 999;
    const amountToFree = document.getElementById('amountToFree');
    const deliveryProgress = document.getElementById('deliveryProgress');

    if (amountToFree && deliveryProgress) {
        if (total >= FREE_DELIVERY_THRESHOLD) {
            amountToFree.parentElement.innerHTML = `You've unlocked <span style="color: #c15e39;">Free Delivery!</span> 🚚`;
            deliveryProgress.style.width = '100%';
            deliveryProgress.style.background = '#22c55e'; // Green for success
        } else {
            const remaining = FREE_DELIVERY_THRESHOLD - total;
            amountToFree.parentElement.innerHTML = `Add <span id="amountToFree">₹${remaining}</span> more for <span style="color: #c15e39;">Free Delivery!</span>`;
            const percentage = Math.min((total / FREE_DELIVERY_THRESHOLD) * 100, 100);
            deliveryProgress.style.width = `${percentage}%`;
            deliveryProgress.style.background = '#c15e39';
        }
    }

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fa-solid fa-cookie-bite"></i>
                <p>Your cart is empty</p>
                <button class="btn-primary" onclick="toggleCart()" style="margin-top:1rem;">START BROWSING</button>
            </div>
        `;
    } else {
        cartItems.innerHTML = cart.map((item, i) => `
            <div class="cart-item" style="display:flex;gap:1rem;margin-bottom:1.2rem;padding-bottom:1.2rem;border-bottom:1px solid #eee;">
                ${item.image ? `<img src="${item.image}" alt="${item.name}" style="width:60px;height:60px;object-fit:cover;border-radius:8px;">` : ''}
                <div style="flex:1;">
                    <div style="font-weight:700;font-size:0.9rem;">${item.name}</div>
                    <div style="color:#888;font-size:0.82rem;margin-bottom:0.5rem;">₹${item.price.toLocaleString('en-IN')}</div>
                    <div style="display:flex;align-items:center;gap:0.5rem;">
                        <button onclick="updateQuantity(${i}, -1)" style="width:26px;height:26px;border-radius:50%;border:1px solid #ddd;background:#fff;cursor:pointer;">−</button>
                        <span style="font-weight:700;">${item.quantity}</span>
                        <button onclick="updateQuantity(${i}, 1)" style="width:26px;height:26px;border-radius:50%;border:1px solid #ddd;background:#fff;cursor:pointer;">+</button>
                        <button onclick="removeFromCart(${i})" style="margin-left:auto;background:none;border:none;color:#bbb;cursor:pointer;"><i class="fa-regular fa-trash-can"></i></button>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

function showNotification(message, iconClass = 'fa-check-circle') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'custom-toast';
    // Use innerHTML properly dealing with newlines from alert strings
    const formattedMessage = message.replace(/\n/g, '<br>');
    toast.innerHTML = `<i class="fa-solid ${iconClass}"></i> <div>${formattedMessage}</div>`;

    container.appendChild(toast);

    // Auto remove after animation completes (3.4s defined in CSS)
    setTimeout(() => {
        if (toast.parentElement) {
            toast.remove();
        }
    }, 3500);
}

function filterCategory(cat) {
    showNotification(`Browsing ${cat.toUpperCase()} collection`);
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    loadCart();

    // Auth State Display (Mock check)
    // For now we set loggedIn to false so the user sees the new Auth view.
    const loggedIn = false;
    const loggedOutState = document.getElementById('loggedOutState');
    const loggedInState = document.getElementById('loggedInState');
    const accountFooter = document.getElementById('accountFooter');

    if (loggedIn) {
        if (loggedOutState) loggedOutState.style.display = 'none';
        if (loggedInState) loggedInState.style.display = 'block';
        if (accountFooter) accountFooter.style.display = 'block';
    } else {
        if (loggedOutState) loggedOutState.style.display = 'block';
        if (loggedInState) loggedInState.style.display = 'none';
        if (accountFooter) accountFooter.style.display = 'none';
    }

    // Close cart
    const closeBtn = document.getElementById('closeCart');
    if (closeBtn) closeBtn.addEventListener('click', toggleCart);

    // Checkout
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) { showNotification('Your cart is empty!'); return; }
            showNotification("Proceeding to checkout...<br><span style='font-size:0.8rem; opacity:0.8;'>Thank you for choosing Be'Lovd.</span>", "fa-bag-shopping");
            cart = []; saveCart(); updateCartUI(); toggleCart();
        });
    }

    // Menu card add to cart
    document.querySelectorAll('.menu-card[data-name]').forEach(card => {
        card.addEventListener('click', () => {
            const name = card.dataset.name;
            const price = card.dataset.price;
            const img = card.querySelector('img') ? card.querySelector('img').src : '';
            addToCart(name, price, img);
        });
    });

    // Hot selling add to cart
    document.querySelectorAll('.hot-product-card[data-name]').forEach(card => {
        card.addEventListener('click', () => {
            const name = card.dataset.name;
            const price = card.dataset.price;
            const img = card.querySelector('img') ? card.querySelector('img').src : '';
            addToCart(name, price, img);
        });
    });

    // Product detail add to cart
    const detailAddBtn = document.querySelector('.product-add-btn');
    if (detailAddBtn) {
        detailAddBtn.addEventListener('click', () => {
            const name = detailAddBtn.dataset.name;
            const price = detailAddBtn.dataset.price;
            const img = detailAddBtn.dataset.img;
            addToCart(name, price, img);
            toggleCart(); // Option to open the cart when they add the item!
        });
    }
});

// Register Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('SW registered'))
            .catch(err => console.log('SW registration failed: ', err));
    });
}
