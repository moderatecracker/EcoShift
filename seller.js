// Get stored products or initialize with demo products
let defaultProducts = [
    {
        id: 1,
        name: "Bamboo Water Bottle",
        price: 24.99,
        description: "Eco-friendly bamboo water bottle with stainless steel interior. 100% biodegradable exterior.",
        image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500"
    },
    {
        id: 2,
        name: "Organic Cotton Tote",
        price: 19.99,
        description: "Reusable shopping bag made from 100% organic cotton. Perfect for grocery shopping.",
        image: "https://images.unsplash.com/photo-1597836225744-27d79749d755?w=500"
    },
    {
        id: 3,
        name: "Solar Power Bank",
        price: 39.99,
        description: "10000mAh power bank with solar charging capability. Sustainable power on the go.",
        image: "https://images.unsplash.com/photo-1620827552635-da0756cf6c2b?w=500"
    },
    {
        id: 4,
        name: "Bamboo Cutlery Set",
        price: 15.99,
        description: "Portable bamboo cutlery set including fork, knife, spoon, and chopsticks. Zero waste dining.",
        image: "https://images.unsplash.com/photo-1584346133934-a3afd2a99c84?w=500"
    }
];

let products = JSON.parse(localStorage.getItem('products')) || defaultProducts;

// Save default products if none exist
if (!localStorage.getItem('products')) {
    localStorage.setItem('products', JSON.stringify(defaultProducts));
}

// DOM Elements
const productForm = document.getElementById('productForm');
const sellerProducts = document.getElementById('sellerProducts');

// Handle form submission
productForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const productName = document.getElementById('productName').value;
    const productPrice = document.getElementById('productPrice').value;
    const productDescription = document.getElementById('productDescription').value;
    const productImageFile = document.getElementById('productImage').files[0];
    
    // Create a FileReader to handle the image
    const reader = new FileReader();
    reader.onload = function(e) {
        const newProduct = {
            id: Date.now(),
            name: productName,
            price: productPrice,
            description: productDescription,
            image: e.target.result
        };
        
        // Add new product to array
        products.push(newProduct);
        
        // Save to localStorage
        localStorage.setItem('products', JSON.stringify(products));
        
        // Reset form and update display
        productForm.reset();
        displaySellerProducts();
        
        alert('Product added successfully!');
    };
    
    // Read the image file
    reader.readAsDataURL(productImageFile);
});

// Display seller's products
function displaySellerProducts() {
    sellerProducts.innerHTML = '';
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <p>${product.description}</p>
            <button class="btn" onclick="deleteProduct(${product.id})">Delete</button>
        `;
        sellerProducts.appendChild(productCard);
    });
}

// Delete a product
function deleteProduct(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
        products = products.filter(product => product.id !== productId);
        localStorage.setItem('products', JSON.stringify(products));
        displaySellerProducts();
    }
}

// Initial load
displaySellerProducts();