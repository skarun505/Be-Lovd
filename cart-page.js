<<<<<<< HEAD
// Cart Page JavaScript

// Load and display cart
function displayCartPage() {
    const cart = JSON.parse(localStorage.getItem('belovd_cart') || '[]');
    const cartItemsList = document.getElementById('cartItemsList');
    const cartCount = document.getElementById('cartCount');

    // Update cart count in nav
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCount) {
        cartCount.textContent = totalItems;
    }

    if (cart.length === 0) {
        cartItemsList.innerHTML = `
            <div class="empty-cart-message">
                <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                <h3>Your cart is empty</h3>
                <p>Add some delicious cakes to get started</p>
                <a href="index.html#products" class="continue-shopping-btn">Continue Shopping</a>
            </div>
        `;
        updateCartSummary(0, 0, 0);
        return;
    }

    // Display cart items
    cartItemsList.innerHTML = cart.map((item, index) => `
        <div class="cart-item-full">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image-large">
            <div class="cart-item-info">
                <div>
                    <h3 class="cart-item-name-large">${item.name}</h3>
                    <p class="cart-item-desc cart-item-desc">Premium cake, freshly baked</p>
                </div>
                <div class="cart-item-price-large">Rs. ${item.price.toLocaleString('en-IN')}</div>
            </div>
            <div class="cart-item-actions-full">
                <div class="qty-controls">
                    <button class="qty-btn-large" onclick="updateCartQuantity(${index}, -1)">-</button>
                    <span class="qty-display">${item.quantity}</span>
                    <button class="qty-btn-large" onclick="updateCartQuantity(${index}, 1)">+</button>
                </div>
                <button class="remove-btn" onclick="removeCartItem(${index})">Remove</button>
            </div>
        </div>
    `).join('');

    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryCharges = subtotal >= 999 ? 0 : 50;
    const total = subtotal + deliveryCharges;

    updateCartSummary(subtotal, deliveryCharges, total);
}

// Update cart summary
function updateCartSummary(subtotal, delivery, total) {
    document.getElementById('subtotal').textContent = 'Rs. ' + subtotal.toLocaleString('en-IN');
    document.getElementById('deliveryCharges').textContent = delivery === 0 ? 'FREE' : 'Rs. ' + delivery.toLocaleString('en-IN');
    document.getElementById('discount').textContent = '- Rs. 0';
    document.getElementById('cartTotal').textContent = 'Rs. ' + total.toLocaleString('en-IN');

    // Update delivery message
    const deliveryMessage = document.getElementById('deliveryMessage');
    if (subtotal >= 999) {
        deliveryMessage.textContent = 'You get FREE delivery!';
        deliveryMessage.parentElement.style.background = '#E8F5E9';
        deliveryMessage.parentElement.style.color = '#4CAF50';
    } else {
        const remaining = 999 - subtotal;
        deliveryMessage.textContent = `Add Rs. ${remaining.toLocaleString('en-IN')} more for FREE delivery`;
        deliveryMessage.parentElement.style.background = '#FFF3CD';
        deliveryMessage.parentElement.style.color = '#856404';
    }
}

// Update quantity
function updateCartQuantity(index, change) {
    const cart = JSON.parse(localStorage.getItem('belovd_cart') || '[]');
    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    localStorage.setItem('belovd_cart', JSON.stringify(cart));
    displayCartPage();
}

// Remove item
function removeCartItem(index) {
    if (confirm('Remove this item from cart?')) {
        const cart = JSON.parse(localStorage.getItem('belovd_cart') || '[]');
        cart.splice(index, 1);
        localStorage.setItem('belovd_cart', JSON.stringify(cart));
        displayCartPage();
    }
}

// Apply coupon
function applyCoupon() {
    const couponInput = document.getElementById('couponInput');
    const couponMessage = document.getElementById('couponMessage');
    const code = couponInput.value.trim().toUpperCase();

    const validCoupons = {
        'LOVE10': { discount: 10, type: 'percent' },
        'VALENTINE50': { discount: 50, type: 'fixed' },
        'FIRST100': { discount: 100, type: 'fixed' }
    };

    if (validCoupons[code]) {
        const coupon = validCoupons[code];
        couponMessage.className = 'coupon-message success';
        couponMessage.textContent = `Coupon applied! You saved Rs. ${coupon.discount}${coupon.type === 'percent' ? '%' : ''}`;

        // Apply discount (you can enhance this)
        const discount = coupon.type === 'percent' ?
            (parseInt(document.getElementById('subtotal').textContent.replace(/[^0-9]/g, '')) * coupon.discount / 100) :
            coupon.discount;
        document.getElementById('discount').textContent = `- Rs. ${discount.toLocaleString('en-IN')}`;
    } else {
        couponMessage.className = 'coupon-message error';
        couponMessage.textContent = 'Invalid coupon code';
    }

    setTimeout(() => {
        couponMessage.textContent = '';
        couponMessage.className = 'coupon-message';
    }, 3000);
}

// Mobile menu
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Initialize page
document.addEventListener('DOMContentLoaded', displayCartPage);
=======
// Cart Page JavaScript

// Load and display cart
function displayCartPage() {
    const cart = JSON.parse(localStorage.getItem('belovd_cart') || '[]');
    const cartItemsList = document.getElementById('cartItemsList');
    const cartCount = document.getElementById('cartCount');

    // Update cart count in nav
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCount) {
        cartCount.textContent = totalItems;
    }

    if (cart.length === 0) {
        cartItemsList.innerHTML = `
            <div class="empty-cart-message">
                <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                <h3>Your cart is empty</h3>
                <p>Add some delicious cakes to get started</p>
                <a href="index.html#products" class="continue-shopping-btn">Continue Shopping</a>
            </div>
        `;
        updateCartSummary(0, 0, 0);
        return;
    }

    // Display cart items
    cartItemsList.innerHTML = cart.map((item, index) => `
        <div class="cart-item-full">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image-large">
            <div class="cart-item-info">
                <div>
                    <h3 class="cart-item-name-large">${item.name}</h3>
                    <p class="cart-item-desc cart-item-desc">Premium cake, freshly baked</p>
                </div>
                <div class="cart-item-price-large">Rs. ${item.price.toLocaleString('en-IN')}</div>
            </div>
            <div class="cart-item-actions-full">
                <div class="qty-controls">
                    <button class="qty-btn-large" onclick="updateCartQuantity(${index}, -1)">-</button>
                    <span class="qty-display">${item.quantity}</span>
                    <button class="qty-btn-large" onclick="updateCartQuantity(${index}, 1)">+</button>
                </div>
                <button class="remove-btn" onclick="removeCartItem(${index})">Remove</button>
            </div>
        </div>
    `).join('');

    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryCharges = subtotal >= 999 ? 0 : 50;
    const total = subtotal + deliveryCharges;

    updateCartSummary(subtotal, deliveryCharges, total);
}

// Update cart summary
function updateCartSummary(subtotal, delivery, total) {
    document.getElementById('subtotal').textContent = 'Rs. ' + subtotal.toLocaleString('en-IN');
    document.getElementById('deliveryCharges').textContent = delivery === 0 ? 'FREE' : 'Rs. ' + delivery.toLocaleString('en-IN');
    document.getElementById('discount').textContent = '- Rs. 0';
    document.getElementById('cartTotal').textContent = 'Rs. ' + total.toLocaleString('en-IN');

    // Update delivery message
    const deliveryMessage = document.getElementById('deliveryMessage');
    if (subtotal >= 999) {
        deliveryMessage.textContent = 'You get FREE delivery!';
        deliveryMessage.parentElement.style.background = '#E8F5E9';
        deliveryMessage.parentElement.style.color = '#4CAF50';
    } else {
        const remaining = 999 - subtotal;
        deliveryMessage.textContent = `Add Rs. ${remaining.toLocaleString('en-IN')} more for FREE delivery`;
        deliveryMessage.parentElement.style.background = '#FFF3CD';
        deliveryMessage.parentElement.style.color = '#856404';
    }
}

// Update quantity
function updateCartQuantity(index, change) {
    const cart = JSON.parse(localStorage.getItem('belovd_cart') || '[]');
    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    localStorage.setItem('belovd_cart', JSON.stringify(cart));
    displayCartPage();
}

// Remove item
function removeCartItem(index) {
    if (confirm('Remove this item from cart?')) {
        const cart = JSON.parse(localStorage.getItem('belovd_cart') || '[]');
        cart.splice(index, 1);
        localStorage.setItem('belovd_cart', JSON.stringify(cart));
        displayCartPage();
    }
}

// Apply coupon
function applyCoupon() {
    const couponInput = document.getElementById('couponInput');
    const couponMessage = document.getElementById('couponMessage');
    const code = couponInput.value.trim().toUpperCase();

    const validCoupons = {
        'LOVE10': { discount: 10, type: 'percent' },
        'VALENTINE50': { discount: 50, type: 'fixed' },
        'FIRST100': { discount: 100, type: 'fixed' }
    };

    if (validCoupons[code]) {
        const coupon = validCoupons[code];
        couponMessage.className = 'coupon-message success';
        couponMessage.textContent = `Coupon applied! You saved Rs. ${coupon.discount}${coupon.type === 'percent' ? '%' : ''}`;

        // Apply discount (you can enhance this)
        const discount = coupon.type === 'percent' ?
            (parseInt(document.getElementById('subtotal').textContent.replace(/[^0-9]/g, '')) * coupon.discount / 100) :
            coupon.discount;
        document.getElementById('discount').textContent = `- Rs. ${discount.toLocaleString('en-IN')}`;
    } else {
        couponMessage.className = 'coupon-message error';
        couponMessage.textContent = 'Invalid coupon code';
    }

    setTimeout(() => {
        couponMessage.textContent = '';
        couponMessage.className = 'coupon-message';
    }, 3000);
}

// Mobile menu
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Initialize page
document.addEventListener('DOMContentLoaded', displayCartPage);
>>>>>>> 232031e4dd04047ed6559d03af03add0e5aaeef1
