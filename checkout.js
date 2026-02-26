// Checkout Page JavaScript

// Load cart and display order summary
function loadCheckoutData() {
    const cart = JSON.parse(localStorage.getItem('belovd_cart') || '[]');

    if (cart.length === 0) {
        showNotification('Your cart is empty! Redirecting to shop...', 'fa-info-circle');
        setTimeout(() => {
            window.location.href = 'index.html#products';
        }, 1500);
        return;
    }

    // Display order items
    const orderItems = document.getElementById('orderItems');
    if (orderItems) {
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
    }

    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const delivery = subtotal >= 999 ? 0 : 50;
    const total = subtotal + delivery;

    // Update summary
    const subE = document.getElementById('checkoutSubtotal');
    if (subE) subE.textContent = 'Rs. ' + subtotal.toLocaleString('en-IN');

    const delE = document.getElementById('checkoutDelivery');
    if (delE) delE.textContent = delivery === 0 ? 'FREE' : 'Rs. ' + delivery.toLocaleString('en-IN');

    const totE = document.getElementById('checkoutTotal');
    if (totE) totE.textContent = 'Rs. ' + total.toLocaleString('en-IN');
}

// Set minimum delivery date (tomorrow)
function setMinDeliveryDate() {
    const dateInput = document.getElementById('deliveryDate');
    if (!dateInput) return;
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split('T')[0];
    dateInput.min = minDate;
    dateInput.value = minDate;
}

// Handle form submission
const checkForm = document.getElementById('checkoutForm');
if (checkForm) {
    checkForm.addEventListener('submit', function (e) {
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
            paymentMethod: data.paymentMethod || 'online',
            deliveryDate: data.deliveryDate || new Date().toISOString(),
            orderDate: new Date().toISOString(),
            orderNumber: 'BL' + new Date().getFullYear() + Math.floor(Math.random() * 100000).toString().padStart(5, '0')
        };

        // Save order data
        localStorage.setItem('lastOrder', JSON.stringify(orderData));

        // Custom Modal UI
        const createModal = (title, message, isPayment) => {
            const modalOverlay = document.createElement('div');
            modalOverlay.style.cssText = `position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;z-index:99999;opacity:0;transition:opacity 0.3s ease;`;

            const modalContent = document.createElement('div');
            modalContent.style.cssText = `background:#fff;padding:2rem;border-radius:12px;text-align:center;max-width:400px;width:90%;box-shadow:0 10px 30px rgba(0,0,0,0.2);transform:translateY(20px);transition:transform 0.3s ease;`;

            modalContent.innerHTML = `
                <h3 style="font-family:var(--font-heading);font-size:1.5rem;color:var(--plum);margin-bottom:1rem;">${title}</h3>
                <p style="color:var(--text-muted);margin-bottom:2rem;font-size:0.95rem;">${message}</p>
                <div style="display:flex;gap:1rem;justify-content:center;">
                    <button id="cancelModal" style="padding:0.75rem 1.5rem;border:1px solid var(--border);border-radius:50px;background:transparent;cursor:pointer;font-weight:600;">Cancel</button>
                    <button id="confirmModal" style="padding:0.75rem 1.5rem;border:none;border-radius:50px;background:var(--cta-bg);color:#fff;cursor:pointer;font-weight:600;">Proceed</button>
                </div>
            `;

            modalOverlay.appendChild(modalContent);
            document.body.appendChild(modalOverlay);

            // Animate it in
            setTimeout(() => {
                modalOverlay.style.opacity = '1';
                modalContent.style.transform = 'translateY(0)';
            }, 10);

            return new Promise((resolve) => {
                document.getElementById('cancelModal').onclick = () => {
                    modalOverlay.style.opacity = '0';
                    setTimeout(() => modalOverlay.remove(), 300);
                    resolve(false);
                };
                document.getElementById('confirmModal').onclick = () => {
                    modalOverlay.style.opacity = '0';
                    setTimeout(() => modalOverlay.remove(), 300);
                    resolve(true);
                };
            });
        };

        const paymentMethod = data.paymentMethod || 'online';

        // Async wrapper to use await with the new modal
        (async () => {
            if (paymentMethod === 'online') {
                const confirmed = await createModal('Proceed to Payment Gateway', `Total Amount: ₹${total.toLocaleString('en-IN')}<br>You will be redirected securely.`);
                if (confirmed) {
                    showNotification('Payment processed successfully!\nRedirecting to confirmation...', 'fa-check');
                    setTimeout(() => window.location.href = 'order-confirmation.html', 2000);
                }
            } else {
                const confirmed = await createModal('Confirm Cash on Delivery', `Total Amount: ₹${total.toLocaleString('en-IN')}<br>Please keep exact change ready.`);
                if (confirmed) {
                    showNotification('Order successfully placed!', 'fa-check');
                    setTimeout(() => window.location.href = 'order-confirmation.html', 1500);
                }
            }
        })();
    });
}

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

// Add visual validation function
const setValidState = (input, isValid) => {
    if (isValid) {
        input.style.borderColor = '#22c55e'; // Green
        input.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.15)';
    } else {
        input.style.borderColor = 'var(--border)';
        input.style.boxShadow = 'none';
        if (input.value.length > 0) {
            input.style.borderColor = '#ef4444'; // Red if they typed but invalid
        }
    }
}

// Validate phone number
const phone = document.getElementById('phone');
if (phone) {
    phone.addEventListener('input', function (e) {
        this.value = this.value.replace(/[^0-9]/g, '').slice(0, 10);
        setValidState(this, this.value.length === 10);
    });
}

// Validate address and other basic inputs dynamically
const addressBlock = document.getElementById('address');
if (addressBlock) {
    addressBlock.addEventListener('input', function (e) {
        setValidState(this, this.value.trim().length > 10);
    });
}

// Validate pincode
const pin = document.getElementById('pincode');
if (pin) {
    pin.addEventListener('input', function (e) {
        this.value = this.value.replace(/[^0-9]/g, '').slice(0, 6);
        setValidState(this, this.value.length === 6);
    });
}

// Auto-capitalize name
const fname = document.getElementById('fullName');
if (fname) {
    fname.addEventListener('blur', function (e) {
        this.value = this.value.replace(/\b\w/g, l => l.toUpperCase());
        setValidState(this, this.value.trim().length > 2);
    });
    fname.addEventListener('input', function (e) {
        setValidState(this, this.value.trim().length > 2);
    });
}

// Update step when payment method selected
document.querySelectorAll('input[name="paymentMethod"]').forEach(radio => {
    radio.addEventListener('change', function () {
        updateSteps(1); // Move to payment step
    });
});
