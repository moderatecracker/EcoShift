// Store cart and wishlist items
let cart = [];
let wishlist = [];

// Load products from localStorage (in a real app, this would come from a backend)
let products = JSON.parse(localStorage.getItem('products')) || [];

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const cartModal = document.getElementById('cartModal');
const wishlistModal = document.getElementById('wishlistModal');
const cartItems = document.getElementById('cartItems');
const wishlistItems = document.getElementById('wishlistItems');
const cartCount = document.getElementById('cartCount');
const wishlistCount = document.getElementById('wishlistCount');
const cartTotal = document.getElementById('cartTotal');

// Display products
function displayProducts() {
    productsGrid.innerHTML = '';
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <p>${product.description}</p>
            <div class="product-actions">
                <button class="btn" onclick="addToCart(${product.id})">Add to Cart</button>
                <button class="btn" onclick="addToWishlist(${product.id})">Add to Wishlist</button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Cart functions
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        updateCartCount();
    }
}

function updateCartCount() {
    cartCount.textContent = cart.length;
}

function displayCart() {
    cartModal.style.display = 'block';
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach((item, index) => {
        total += parseFloat(item.price);
        const itemElement = document.createElement('div');
        itemElement.innerHTML = `
            <p>${item.name} - $${item.price}
            <button onclick="removeFromCart(${index})">Remove</button></p>
        `;
        cartItems.appendChild(itemElement);
    });
    
    cartTotal.textContent = total.toFixed(2);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    displayCart();
}

// Wishlist functions
function addToWishlist(productId) {
    const product = products.find(p => p.id === productId);
    if (product && !wishlist.find(item => item.id === productId)) {
        wishlist.push(product);
        updateWishlistCount();
    }
}

function updateWishlistCount() {
    wishlistCount.textContent = wishlist.length;
}

function displayWishlist() {
    wishlistModal.style.display = 'block';
    wishlistItems.innerHTML = '';
    
    wishlist.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.innerHTML = `
            <p>${item.name}
            <button onclick="removeFromWishlist(${index})">Remove</button>
            <button onclick="moveToCart(${index})">Move to Cart</button></p>
        `;
        wishlistItems.appendChild(itemElement);
    });
}

function removeFromWishlist(index) {
    wishlist.splice(index, 1);
    updateWishlistCount();
    displayWishlist();
}

function moveToCart(index) {
    const item = wishlist[index];
    cart.push(item);
    wishlist.splice(index, 1);
    updateCartCount();
    updateWishlistCount();
    displayWishlist();
}

// Modal functions
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Event listeners
document.getElementById('cartBtn').addEventListener('click', displayCart);
document.getElementById('wishlistBtn').addEventListener('click', displayWishlist);

// Close modals when clicking outside
window.onclick = function(event) {
    if (event.target === cartModal) {
        cartModal.style.display = 'none';
    }
    if (event.target === wishlistModal) {
        wishlistModal.style.display = 'none';
    }
}

function checkout() {
    alert('Thank you for your purchase!');
    cart = [];
    updateCartCount();
    closeModal('cartModal');
}

// Initial load
displayProducts();
updateCartCount();
updateWishlistCount();