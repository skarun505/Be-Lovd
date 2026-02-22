<<<<<<< HEAD
// Checkout Page JavaScript

// Load cart and display order summary
function loadCheckoutData() {
    const cart = JSON.parse(localStorage.getItem('belovd_cart') || '[]');

    if (cart.length === 0) {
        alert('Your cart is empty! Redirecting to shop...');
        window.location.href = 'index.html#products';
        return;
    }

    // Display order items
    const orderItems = document.getElementById('orderItems');
    orderItems.innerHTML = cart.map(item => `
        <div class="order-item">
            <img src="${item.image}" alt="${item.name}" class="order-item-image">
            <div class="order-item-details">
                <div class="order-item-name">${item.name}</div>
                <div class="order-item-qty">Qty: ${item.quantity}</div>
            </div>
            <div class="order-item-price">Rs. ${(item.price * item.quantity).toLocaleString('en-IN')}</div>
        </div>
    `).join('');

    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const delivery = subtotal >= 999 ? 0 : 50;
    const total = subtotal + delivery;

    // Update summary
    document.getElementById('checkoutSubtotal').textContent = 'Rs. ' + subtotal.toLocaleString('en-IN');
    document.getElementById('checkoutDelivery').textContent = delivery === 0 ? 'FREE' : 'Rs. ' + delivery.toLocaleString('en-IN');
    document.getElementById('checkoutTotal').textContent = 'Rs. ' + total.toLocaleString('en-IN');
}

// Set minimum delivery date (tomorrow)
function setMinDeliveryDate() {
    const dateInput = document.getElementById('deliveryDate');
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split('T')[0];
    dateInput.min = minDate;
    dateInput.value = minDate;
}

// Handle form submission
document.getElementById('checkoutForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    // Get cart data
    const cart = JSON.parse(localStorage.getItem('belovd_cart') || '[]');
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const delivery = subtotal >= 999 ? 0 : 50;
    const total = subtotal + delivery;

    // Prepare order data
    const orderData = {
        customer: data,
        items: cart,
        subtotal: subtotal,
        delivery: delivery,
        total: total,
        paymentMethod: data.paymentMethod,
        deliveryDate: data.deliveryDate,
        orderDate: new Date().toISOString(),
        orderNumber: 'BL' + new Date().getFullYear() + Math.floor(Math.random() * 100000).toString().padStart(5, '0')
    };

    // Save order data
    localStorage.setItem('lastOrder', JSON.stringify(orderData));

    // Simulate payment processing
    const paymentMethod = data.paymentMethod;

    if (paymentMethod === 'online') {
        // Simulate online payment
        if (confirm('Proceed to payment gateway?\n\nTotal: Rs. ' + total.toLocaleString('en-IN'))) {
            alert('Payment processed successfully!\n\nThis is a demo. In production, you would integrate with Razorpay/PayU/Instamojo.');
            window.location.href = 'order-confirmation.html';
        }
    } else {
        // Cash on Delivery
        if (confirm('Confirm Order?\n\nTotal: Rs. ' + total.toLocaleString('en-IN') + '\n\nPayment Method: Cash on Delivery\nDelivery Date: ' + new Date(data.deliveryDate).toLocaleDateString('en-IN'))) {
            window.location.href = 'order-confirmation.html';
        }
    }
});

// Mobile menu
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Update step indicator based on scroll or actions
function updateSteps(currentStep) {
    const steps = document.querySelectorAll('.step');
    steps.forEach((step, index) => {
        if (index < currentStep) {
            step.classList.add('active');
        } else if (index === currentStep) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
}

// Initialize page
document.addEventListener('DOMContentLoaded', function () {
    loadCheckoutData();
    setMinDeliveryDate();
    updateSteps(0); // Start at delivery step
});

// Validate phone number
document.getElementById('phone').addEventListener('input', function (e) {
    this.value = this.value.replace(/[^0-9]/g, '').slice(0, 10);
});

// Validate pincode
document.getElementById('pincode').addEventListener('input', function (e) {
    this.value = this.value.replace(/[^0-9]/g, '').slice(0, 6);
});

// Auto-capitalize name
document.getElementById('fullName').addEventListener('blur', function (e) {
    this.value = this.value.replace(/\b\w/g, l => l.toUpperCase());
});

// Update step when payment method selected
document.querySelectorAll('input[name="paymentMethod"]').forEach(radio => {
    radio.addEventListener('change', function () {
        updateSteps(1); // Move to payment step
    });
});
=======
// Checkout Page JavaScript

// Load cart and display order summary
function loadCheckoutData() {
    const cart = JSON.parse(localStorage.getItem('belovd_cart') || '[]');

    if (cart.length === 0) {
        alert('Your cart is empty! Redirecting to shop...');
        window.location.href = 'index.html#products';
        return;
    }

    // Display order items
    const orderItems = document.getElementById('orderItems');
    orderItems.innerHTML = cart.map(item => `
        <div class="order-item">
            <img src="${item.image}" alt="${item.name}" class="order-item-image">
            <div class="order-item-details">
                <div class="order-item-name">${item.name}</div>
                <div class="order-item-qty">Qty: ${item.quantity}</div>
            </div>
            <div class="order-item-price">Rs. ${(item.price * item.quantity).toLocaleString('en-IN')}</div>
        </div>
    `).join('');

    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const delivery = subtotal >= 999 ? 0 : 50;
    const total = subtotal + delivery;

    // Update summary
    document.getElementById('checkoutSubtotal').textContent = 'Rs. ' + subtotal.toLocaleString('en-IN');
    document.getElementById('checkoutDelivery').textContent = delivery === 0 ? 'FREE' : 'Rs. ' + delivery.toLocaleString('en-IN');
    document.getElementById('checkoutTotal').textContent = 'Rs. ' + total.toLocaleString('en-IN');
}

// Set minimum delivery date (tomorrow)
function setMinDeliveryDate() {
    const dateInput = document.getElementById('deliveryDate');
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split('T')[0];
    dateInput.min = minDate;
    dateInput.value = minDate;
}

// Handle form submission
document.getElementById('checkoutForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    // Get cart data
    const cart = JSON.parse(localStorage.getItem('belovd_cart') || '[]');
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const delivery = subtotal >= 999 ? 0 : 50;
    const total = subtotal + delivery;

    // Prepare order data
    const orderData = {
        customer: data,
        items: cart,
        subtotal: subtotal,
        delivery: delivery,
        total: total,
        paymentMethod: data.paymentMethod,
        deliveryDate: data.deliveryDate,
        orderDate: new Date().toISOString(),
        orderNumber: 'BL' + new Date().getFullYear() + Math.floor(Math.random() * 100000).toString().padStart(5, '0')
    };

    // Save order data
    localStorage.setItem('lastOrder', JSON.stringify(orderData));

    // Simulate payment processing
    const paymentMethod = data.paymentMethod;

    if (paymentMethod === 'online') {
        // Simulate online payment
        if (confirm('Proceed to payment gateway?\n\nTotal: Rs. ' + total.toLocaleString('en-IN'))) {
            alert('Payment processed successfully!\n\nThis is a demo. In production, you would integrate with Razorpay/PayU/Instamojo.');
            window.location.href = 'order-confirmation.html';
        }
    } else {
        // Cash on Delivery
        if (confirm('Confirm Order?\n\nTotal: Rs. ' + total.toLocaleString('en-IN') + '\n\nPayment Method: Cash on Delivery\nDelivery Date: ' + new Date(data.deliveryDate).toLocaleDateString('en-IN'))) {
            window.location.href = 'order-confirmation.html';
        }
    }
});

// Mobile menu
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Update step indicator based on scroll or actions
function updateSteps(currentStep) {
    const steps = document.querySelectorAll('.step');
    steps.forEach((step, index) => {
        if (index < currentStep) {
            step.classList.add('active');
        } else if (index === currentStep) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
}

// Initialize page
document.addEventListener('DOMContentLoaded', function () {
    loadCheckoutData();
    setMinDeliveryDate();
    updateSteps(0); // Start at delivery step
});

// Validate phone number
document.getElementById('phone').addEventListener('input', function (e) {
    this.value = this.value.replace(/[^0-9]/g, '').slice(0, 10);
});

// Validate pincode
document.getElementById('pincode').addEventListener('input', function (e) {
    this.value = this.value.replace(/[^0-9]/g, '').slice(0, 6);
});

// Auto-capitalize name
document.getElementById('fullName').addEventListener('blur', function (e) {
    this.value = this.value.replace(/\b\w/g, l => l.toUpperCase());
});

// Update step when payment method selected
document.querySelectorAll('input[name="paymentMethod"]').forEach(radio => {
    radio.addEventListener('change', function () {
        updateSteps(1); // Move to payment step
    });
});
>>>>>>> 232031e4dd04047ed6559d03af03add0e5aaeef1
