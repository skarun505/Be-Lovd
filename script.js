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

function toggleCart() {
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('cartOverlay');
    if (sidebar) sidebar.classList.toggle('open');
    if (overlay) overlay.classList.toggle('show');
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
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');
    if (!cartItems || !cartCount || !cartTotal) return;

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `₹${total.toLocaleString('en-IN')}`;

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

function showNotification(message) {
    const existing = document.querySelector('.toast-notification');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `<i class="fa-solid fa-check-circle"></i> <span>${message}</span>`;
    Object.assign(toast.style, {
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        background: '#8B3A1A',
        color: 'white',
        padding: '0.9rem 1.8rem',
        borderRadius: '8px',
        zIndex: '10002',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        fontFamily: 'Inter, sans-serif',
        fontSize: '0.88rem',
        fontWeight: '600',
        transform: 'translateY(100px)',
        opacity: '0',
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    });

    document.body.appendChild(toast);
    setTimeout(() => { toast.style.transform = 'translateY(0)'; toast.style.opacity = '1'; }, 100);
    setTimeout(() => {
        toast.style.transform = 'translateY(100px)';
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}

function filterCategory(cat) {
    showNotification(`Browsing ${cat.toUpperCase()} collection`);
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    loadCart();

    // Close cart
    const closeBtn = document.getElementById('closeCart');
    if (closeBtn) closeBtn.addEventListener('click', toggleCart);

    // Checkout
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) { showNotification('Your cart is empty!'); return; }
            alert("Proceeding to checkout...\n\nThank you for choosing Be'Lovd.");
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
});
