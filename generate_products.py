import os

products = [
    {
        "id": "signature-fudgy",
        "name": "SIGNATURE FUDGY",
        "hook": "Rich. Gooey. Crowd Favorite.",
        "image": "./assets/signature_fudgy.png",
        "price": "₹299",
        "ingredients": "Premium Dark Cocoa, Organic Flour, Free-range Eggs, Real Butter, Cane Sugar, Madagascar Vanilla Extract.",
        "highlight": "⭐ Our #1 Most Loved – Over 10,000 Boxes Sold!",
        "badge": "Most Loved"
    },
    {
        "id": "walnut-crunch",
        "name": "WALNUT CRUNCH",
        "hook": "Nutty texture with intense cocoa.",
        "image": "./assets/walnut_crunch.png",
        "price": "₹349",
        "ingredients": "Signature Fudgy Base, Hand-sorted Premium Kashmiri Walnuts, Sea Salt Dash.",
        "highlight": "🥜 Perfectly balance of crunch & gooey chocolate.",
        "badge": "New"
    },
    {
        "id": "salted-caramel",
        "name": "SALTED CARAMEL",
        "hook": "Sweet & salty perfection.",
        "image": "./assets/salted_caramel.png",
        "price": "₹399",
        "ingredients": "Dark Chocolate Fudge Base, House-made Salted Caramel Ribbon, Flaky Sea Salt.",
        "highlight": "✨ Rated 5-Stars by top food critics!",
        "badge": "Limited Batch"
    },
    {
        "id": "triple-choco",
        "name": "TRIPLE CHOCO",
        "hook": "White, milk, and dark chunks.",
        "image": "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=450&h=380&fit=crop",
        "price": "₹349",
        "ingredients": "Belgian Dark Chocolate, Creamy Milk Chocolate, White Chocolate Chunks, Cocoa Powder.",
        "highlight": "🍫 Triple the chocolate in every single bite. A chocoholic's dream!",
        "badge": "Premium"
    },
    {
        "id": "peanut-butter",
        "name": "PEANUT BUTTER",
        "hook": "Creamy peanut butter marbling.",
        "image": "./assets/peanut_butter.png",
        "price": "₹349",
        "ingredients": "Rich Fudge Base, Roasted Unsweetened Peanut Butter Swirl, Crushed Peanuts.",
        "highlight": "🔥 Freshly roasted peanuts ground in-house daily!",
        "badge": "Fan Favorite"
    },
    {
        "id": "vegan-dark-fudge",
        "name": "VEGAN DARK FUDGE",
        "hook": "100% plant-based, deeply fudgy.",
        "image": "./assets/vegan_dark_fudge.png",
        "price": "₹399",
        "ingredients": "Organic Almond Milk, Pure Coconut Oil, Single-Origin Vegan Cocoa, Flaxseed, Agave Nectar.",
        "highlight": "🌱 100% Cruelty-free & Guilt-free indulgence!",
        "badge": "Vegan Formulated"
    },
    {
        "id": "assorted-gift-box",
        "name": "ASSORTED GIFT BOX OF 6",
        "hook": "Pick any 6 flavours for a perfect premium gift experience.",
        "image": "./assets/assorted_gift_box.png",
        "price": "₹1799",
        "ingredients": "Varies by selection. All made with premium dark cocoa, organic flour, and clean ingredients.",
        "highlight": "🎁 The perfect gifting solution for any occasion!",
        "badge": "Best for Gifting"
    },
    {
        "id": "party-platter",
        "name": "CLASSIC PARTY PLATTER (12 PCS)",
        "hook": "A dozen of our classic fudgy brownies for your celebrations.",
        "image": "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=600&h=450&fit=crop",
        "price": "₹2999",
        "ingredients": "Our signature fudgy base baked to order for a crowd.",
        "highlight": "🎊 Ready for the ultimate chocolate overload party!",
        "badge": "Party Saver"
    }
]

for product in products:
    filename = f"product-{product['id']}.html"
    html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Be’Lovd | Clean Treats, Baked Fresh Daily</title>
    <meta name="description"
        content="Be’Lovd | Clean Treats, Baked Fresh Daily. Stop restricting. Start indulging. We bake with real ingredients—no maida, no refined sugar, no BS. Just pure, wholesome goodness.">
    <!-- Favicon & PWA -->
    <link rel="icon" type="image/png" href="assets/beloved_logo.png">
    <link rel="apple-touch-icon" href="assets/beloved_logo.png">
    <link rel="manifest" href="manifest.json">
    <meta name="theme-color" content="#431C1A">

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <!-- Main Style -->
    <link rel="stylesheet" href="style.css">
    <style>
        .product-detail-section {{
            padding: 8rem 0 5rem;
            background: var(--bg);
            min-height: 80vh;
            display: flex;
            align-items: center;
        }}
        .product-detail-grid {{
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
            align-items: center;
        }}
        .product-detail-img img {{
            width: 100%;
            border-radius: 12px;
            box-shadow: var(--shadow-md);
            object-fit: cover;
            height: 500px;
        }}
        .product-badge {{
            display: inline-block;
            background-color: var(--cta-bg);
            color: var(--white);
            padding: 0.4rem 1rem;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 600;
            margin-bottom: 1rem;
            letter-spacing: 1px;
            text-transform: uppercase;
        }}
        .product-title {{
            font-size: clamp(2.5rem, 4vw, 3.5rem);
            margin-bottom: 0.5rem;
            color: var(--text-dark);
        }}
        .product-price {{
            font-size: 2rem;
            color: var(--cta-bg);
            font-weight: 700;
            margin-bottom: 1.5rem;
            font-family: var(--font-heading);
        }}
        .product-hook {{
            font-size: 1.2rem;
            color: var(--text-muted);
            margin-bottom: 2rem;
        }}
        .highlight-box {{
            background: rgba(226, 178, 172, 0.15);
            border-left: 4px solid var(--cta-bg);
            padding: 1rem 1.5rem;
            margin-bottom: 2rem;
            border-radius: 0 8px 8px 0;
            font-weight: 500;
            color: var(--cta-bg);
            font-size: 1.05rem;
        }}
        .ingredients-box {{
            margin-bottom: 2.5rem;
        }}
        .ingredients-box h4 {{
            font-family: var(--font-heading);
            font-size: 1.3rem;
            margin-bottom: 0.8rem;
            color: var(--text-dark);
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }}
        .ingredients-box p {{
            color: var(--text-muted);
            line-height: 1.6;
        }}
        @media (max-width: 768px) {{
            .product-detail-grid {{
                grid-template-columns: 1fr;
                gap: 2rem;
            }}
            .product-detail-section {{
                padding: 6rem 0 3rem;
            }}
            .product-detail-img img {{
                height: 350px;
            }}
        }}
    </style>
</head>
<body>

    <!-- Cart Sidebar -->
    <div class="cart-sidebar" id="cartSidebar">
        <div class="cart-header">
            <h2>Your Cart</h2>
            <button class="close-cart" id="closeCart"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <div class="cart-items" id="cartItems">
            <div class="empty-cart">
                <i class="fa-solid fa-cookie-bite"></i>
                <p>Your cart is empty</p>
                <button class="btn-primary" onclick="toggleCart()" style="margin-top:1rem;">START BROWSING</button>
            </div>
        </div>
        <div class="cart-footer">
            <div class="cart-total">
                <span>Total:</span>
                <span id="cartTotal">₹0</span>
            </div>
            <button class="checkout-btn" id="checkoutBtn" onclick="window.location.href='checkout.html'">SECURE CHECKOUT <i class="fa-solid fa-lock"></i></button>
        </div>
    </div>
    <div class="cart-overlay" id="cartOverlay" onclick="toggleCart(); toggleAccount(false);"></div>

    <!-- Account Sidebar -->
    <div class="cart-sidebar account-sidebar" id="accountSidebar">
        <div class="cart-header">
            <h2>My Account</h2>
            <button class="close-cart" id="closeAccount" onclick="toggleAccount()"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <div class="cart-items" style="padding: 2rem;">
            <!-- Profile Info -->
            <div class="account-section" style="margin-bottom: 2.5rem;">
                <h4 style="font-family: var(--font-heading); color: var(--plum); margin-bottom: 1.2rem; border-bottom: 2px solid var(--border); padding-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
                    <i class="fa-solid fa-user-circle"></i> Profile Details
                </h4>
                <div style="display: flex; flex-direction: column; gap: 0.8rem; font-size: 0.9rem;">
                    <div style="display: flex; justify-content: space-between;"><span style="color: var(--text-muted);">Name:</span> <strong>Altaf Ahmad</strong></div>
                    <div style="display: flex; justify-content: space-between;"><span style="color: var(--text-muted);">Mobile:</span> <strong>+91 98765 43210</strong></div>
                    <div style="display: flex; justify-content: space-between;"><span style="color: var(--text-muted);">Email:</span> <strong>altaf@example.com</strong></div>
                    <div style="display: flex; flex-direction: column; gap: 0.3rem;"><span style="color: var(--text-muted);">Address:</span> <strong style="line-height: 1.4;">Flat 402, Green Meadows, Bandra West, Mumbai - 400050</strong></div>
                </div>
            </div>

            <!-- Orders Info -->
            <div class="account-section">
                <h4 style="font-family: var(--font-heading); color: var(--plum); margin-bottom: 1.2rem; border-bottom: 2px solid var(--border); padding-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
                    <i class="fa-solid fa-box-open"></i> Recent Orders
                </h4>
                <div style="display: flex; flex-direction: column; gap: 1rem;">
                    <div style="background: var(--bg); padding: 1rem; border-radius: 12px; border: 1px solid var(--border);">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                            <span style="font-weight: 700; font-size: 0.85rem;">#ORD-9921</span>
                            <span style="font-size: 0.75rem; color: #22c55e; font-weight: 600;">DELIVERED</span>
                        </div>
                        <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.5rem;">Assorted Gift Box of 6, Walnut Crunch</p>
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span style="font-size: 0.8rem; font-weight: 600;">₹2,148</span>
                            <span style="font-size: 0.7rem; color: var(--text-muted);">Feb 24, 2026</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="cart-footer">
            <button class="checkout-btn" style="background: transparent; color: var(--plum); border: 1px solid var(--plum); box-shadow: none;" onclick="showNotification('Logout Successful', 'fa-sign-out-alt')">
                LOGOUT <i class="fa-solid fa-right-from-bracket"></i>
            </button>
        </div>
    </div>

    <!-- Navigation -->
    <nav class="navbar scrolled" id="navbar" style="background: var(--white); box-shadow: var(--shadow-sm);">
        <div class="container nav-container">
            <a href="index.html" class="logo">
                <img src="assets/beloved_logo.png" alt="Be'Loved" style="height: 45px; width: auto; display: block;">
            </a>
            <ul class="nav-menu" id="navMenu">
                <li><a href="index.html#home" class="nav-link">Home</a></li>
                <li><a href="index.html#bestsellers" class="nav-link">Most Loved</a></li>
                <li><a href="about.html" class="nav-link">About</a></li>
            </ul>
            <div class="nav-actions">
                <button class="nav-icon-btn" id="accountBtn">
                    <i class="fa-regular fa-user"></i>
                    <span>My Account</span>
                </button>
                <button class="cart-icon-btn" id="cartBtn" onclick="toggleCart()">
                    <i class="fa-solid fa-bag-shopping"></i>
                    <span>Cart</span>
                    <span class="cart-count" id="cartCount">0</span>
                </button>
                <button class="hamburger" id="hamburger" onclick="document.getElementById('navMenu').classList.toggle('open')">
                    <span></span><span></span><span></span>
                </button>
            </div>
        </div>
    </nav>

    <!-- Product Detail Section -->
    <section class="product-detail-section">
        <div class="container product-detail-grid">
            <div class="product-detail-img">
                <img src="{product['image']}" alt="{product['name']}">
            </div>
            <div class="product-info">
                <div class="product-badge">{product['badge']}</div>
                <h1 class="product-title">{product['name']}</h1>
                <p class="product-price">{product['price']}</p>
                <p class="product-hook">{product['hook']}</p>
                
                <div class="highlight-box">
                    {product['highlight']}
                </div>
                
                <div class="ingredients-box">
                    <h4><i class="fa-solid fa-seedling" style="color:var(--cta-bg);"></i> Ingredients</h4>
                    <p>{product['ingredients']}</p>
                </div>
                
                <button class="btn-cta product-add-btn" style="width: 100%; max-width: 300px; padding: 1rem; font-size: 1.1rem;" data-name="{product['name']}" data-price="{product['price']}" data-img="{product['image']}">
                    ADD TO CART <i class="fa-solid fa-cart-plus"></i>
                </button>
                <div style="margin-top: 1.5rem; display: flex; gap: 1rem; color: var(--text-muted); font-size: 0.9rem;">
                    <span><i class="fa-solid fa-truck-fast"></i> Same day delivery</span>
                    <span><i class="fa-solid fa-leaf"></i> Freshly baked</span>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer" id="contact">
        <div class="container footer-grid">
            <div class="footer-brand">
                <a href="index.html" class="footer-logo">
                    <img src="assets/beloved_logo.png" alt="Be'Loved"
                        style="height: 60px; width: auto; margin-bottom: 1.5rem; display: block;">
                </a>
                <p>Curating luxury baking experiences across India. Every bite is a memory in the making.</p>
                <div class="social-links">
                    <a href="https://instagram.com/belovd_official" target="_blank" aria-label="Instagram"><i
                            class="fa-brands fa-instagram"></i></a>
                    <a href="https://facebook.com/belovdbakery" target="_blank" aria-label="Facebook"><i
                            class="fa-brands fa-facebook-f"></i></a>
                    <a href="https://twitter.com/belovd_bakery" target="_blank" aria-label="X (Twitter)"><i
                            class="fa-brands fa-x-twitter"></i></a>
                    <a href="https://pinterest.com/belovd_bakery" target="_blank" aria-label="Pinterest"><i
                            class="fa-brands fa-pinterest"></i></a>
                </div>
            </div>
            <div class="footer-links">
                <h4>Quick Links</h4>
                <ul>
                    <li><a href="about.html">Our Story</a></li>
                    <li><a href="index.html#reservations">Reservations</a></li>
                    <li><a href="index.html#contact">Contact</a></li>
                </ul>
            </div>
            <div class="footer-links">
                <h4>Customer Care</h4>
                <ul>
                    <li><a href="#">Order Tracking</a></li>
                    <li><a href="#">Return Policy</a></li>
                    <li><a href="privacy-policy.html">Privacy Policy</a></li>
                    <li><a href="terms-conditions.html">Terms & Conditions</a></li>
                </ul>
            </div>
            <div class="footer-newsletter">
                <h4>Never Miss a Treat</h4>
                <p>Weekly updates on new flavors and exclusive events.</p>
                <div class="newsletter-form">
                    <input type="email" placeholder="Email Address">
                    <button><i class="fa-solid fa-paper-plane"></i></button>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <div class="container">
                <p>&copy; 2026 Be'Loved Patisserie India. Handcrafted Excellence.</p>
            </div>
        </div>
    </footer>
    <script src="script.js"></script>
    <script>
        // Navbar scroll effect
        window.addEventListener('scroll', () => {{
            const nav = document.getElementById('navbar');
            if (window.scrollY > 50) nav.classList.add('scrolled');
            else nav.classList.remove('scrolled');
        }});

        // Mobile menu toggle
        function toggleMenu() {{
            document.getElementById('navMenu').classList.toggle('open');
        }}

        function toggleCart() {{
            var sidebar = document.getElementById('cartSidebar');
            var overlay = document.getElementById('cartOverlay');
            if(sidebar) sidebar.classList.toggle('open');
            if(overlay) overlay.classList.toggle('show');
            if(document.getElementById('accountSidebar').classList.contains('open')) {{
                document.getElementById('accountSidebar').classList.remove('open');
            }}
        }}

        function toggleAccount(forceClose = null) {{
            const sidebar = document.getElementById('accountSidebar');
            const overlay = document.getElementById('cartOverlay');
            
            if(forceClose === false) {{
                sidebar.classList.remove('open');
                return;
            }}

            sidebar.classList.toggle('open');
            overlay.classList.toggle('show');
            
            if(document.getElementById('cartSidebar').classList.contains('open')) {{
                document.getElementById('cartSidebar').classList.remove('open');
            }}
        }}

        document.getElementById('accountBtn').onclick = () => toggleAccount();
        const mAccount = document.getElementById('mobileAccountBtn');
        if(mAccount) mAccount.onclick = () => toggleAccount();
    </script>

    <!-- Mobile Sticky Bottom Bar -->
    <div class="mobile-bottom-bar">
        <a href="index.html#home" class="m-nav-item"><i class="fa-solid fa-house"></i><span>Home</span></a>
        <a href="https://wa.me/919750070001" class="m-nav-item whatsapp" target="_blank"><i class="fa-brands fa-whatsapp"></i><span>Order</span></a>
        <a href="javascript:void(0)" class="m-nav-item" onclick="toggleCart()"><i class="fa-solid fa-bag-shopping"></i><span>Cart</span></a>
        <a href="javascript:void(0)" class="m-nav-item" id="mobileAccountBtn"><i class="fa-regular fa-user"></i><span>Account</span></a>
    </div>
</body>
</html>"""
    with open(filename, "w", encoding="utf-8") as f:
        f.write(html_content)

print("Generated 6 product pages successfully.")
