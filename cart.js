// cart.js

// Add product to cart
function addToCart(productId, productName, productPrice) {
    const quantity = document.getElementById(`quantity-${productId}`).value;
    const cart = JSON.parse(localStorage.getItem('cart')) || {};

    if (cart[productId]) {
        cart[productId].quantity += parseInt(quantity);
    } else {
        cart[productId] = {
            name: productName,
            price: productPrice,
            quantity: parseInt(quantity)
        };
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${productName} added to cart`);
}

// Load cart and update the cart page
function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    const cartSection = document.querySelector('.cart');
    let total = 0;

    // Clear previous cart items
    cartSection.innerHTML = '<h2>Your Cart</h2>';

    for (const [productId, product] of Object.entries(cart)) {
        const productTotal = product.price * product.quantity;
        total += productTotal;

        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)} x ${product.quantity}</p>
            <p>$${productTotal.toFixed(2)}</p>
            <button onclick="removeFromCart(${productId})" class="button">Remove</button>
        `;
        cartSection.appendChild(cartItem);
    }

    // Add total
    const totalElement = document.createElement('p');
    totalElement.innerHTML = `<strong>Total:</strong> $${total.toFixed(2)}`;
    cartSection.appendChild(totalElement);
}

// Remove item from cart
function removeFromCart(productId) {
    const cart = JSON.parse(localStorage.getItem('cart')) || {};

    delete cart[productId];

    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

// Call loadCart function when the cart page is loaded
if (document.querySelector('.cart')) {
    loadCart();
}
