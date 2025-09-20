// Function to save the cart to local storage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to load the cart from local storage
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// Function to update the cart display on the shop page
function updateShopCartDisplay() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    
    if (cartItems && cartTotal) {
        cartItems.innerHTML = "";
        let total = 0;
        let itemCount = 0;

        cart.forEach((item, index) => {
            total += item.price * item.quantity;
            itemCount += item.quantity;

            const li = document.createElement("li");
            li.innerHTML = `
                ${item.name} - $${item.price.toFixed(2)} x ${item.quantity}
                <div>
                    <button onclick="changeQuantity(${index}, 1)">+</button>
                    <button onclick="changeQuantity(${index}, -1)">-</button>
                    <button onclick="removeItem(${index})">❌</button>
                </div>
            `;
            cartItems.appendChild(li);
        });

        cartTotal.textContent = total.toFixed(2);
        updateHeaderCartCount(itemCount);
    }
}

// Function to update the cart count in the header on all pages
function updateHeaderCartCount(count) {
    const headerCartCount = document.getElementById("cartCount");
    const floatingCartCount = document.getElementById("cart-count");

    if (headerCartCount) {
        headerCartCount.textContent = `(${count})`;
    }
    if (floatingCartCount) {
        floatingCartCount.textContent = count;
    }
}

// Function to add an item to the cart
function addItemToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    saveCart();
    updateHeaderCartCount(getCartItemCount());
}

// Function to change item quantity
function changeQuantity(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    saveCart();
    updateShopCartDisplay();
}

// Function to remove an item
function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    updateShopCartDisplay();
}

// Function to get total item count
function getCartItemCount() {
    return cart.reduce((total, item) => total + item.quantity, 0);
}

let cart = []; // Global cart array

// Load cart on page load
loadCart();
updateHeaderCartCount(getCartItemCount());