// GLOBAL JS

// --- Toggle mobile menu logic ---
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
const toggleSymbol = document.getElementById('toggleSymbol');

if (navToggle && mobileMenu && toggleSymbol) {
    navToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('show');
        if (toggleSymbol.textContent === '+') {
            toggleSymbol.textContent = '×';
        } else {
            toggleSymbol.textContent = '+';
        }
    });
}

// --- Cart redirection and toggle logic ---

// Get cart sidebar and toggle button
const cartSidebar = document.getElementById("cart-sidebar");
const cartToggle = document.getElementById("cart-toggle");


// Get all cart links on the page (for both desktop and mobile)
const allCartLinks = document.querySelectorAll(".desktop-menu a[href*='#cart'], .mobile-menu a[href*='#cart'], #cartCount");

// Function to open the cart sidebar
function openCart() {
    if (cartSidebar) {
        cartSidebar.classList.add("active");
    }
}

// Add click event listeners to all cart links
allCartLinks.forEach(link => {
    link.addEventListener("click", function(e) {
        // Prevent default link behavior if on the shop page
        if (window.location.href.includes("shop.html")) {
            e.preventDefault();
            openCart();
        } else {
            // If on landing page, redirect to shop with a parameter
            window.location.href = "shop/shop.html?openCart=true";
        }
    });
});

// Check for the URL parameter on the shop page
if (window.location.href.includes("shop.html?openCart=true")) {
    window.addEventListener('load', () => {
        // Wait for a moment to ensure all page elements are loaded
        setTimeout(openCart, 500); 
    });
}

// Attach event to floating button (only on shop page)
if (cartToggle) {
    cartToggle.addEventListener("click", () => {
        if (cartSidebar) {
            cartSidebar.classList.toggle("active");
        }
    });
}


const cartSidebarr = document.getElementById("cart-sidebar");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
let cart = [];

// Add to Cart
document.querySelectorAll(".add-to-cart").forEach(button => {
  button.addEventListener("click", function () {
    const card = this.closest(".menu-card");
    const name = card.getAttribute("data-name");
    const price = parseFloat(card.getAttribute("data-price"));

    // Check if item already in cart
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({ name, price, quantity: 1 });
    }

    updateCart();
    cartSidebarr.classList.add("active"); // open cart
  });
});

// Update Cart Display
function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - $${item.price} x ${item.quantity}
      <div>
        <button onclick="changeQuantity(${index}, 1)">+</button>
        <button onclick="changeQuantity(${index}, -1)">-</button>
        <button onclick="removeItem(${index})">❌</button>
      </div>
    `;
    cartItems.appendChild(li);
  });

  cartTotal.textContent = total.toFixed(2);
}

// Change Quantity
function changeQuantity(index, change) {
  cart[index].quantity += change;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  updateCart();
}

// Remove Item
function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}


const cartCountt = document.getElementById("cart-count");


// Update cart count
function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;
  let itemCount = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;
    itemCount += item.quantity;

    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - $${item.price} x ${item.quantity}
      <div>
        <button onclick="changeQuantity(${index}, 1)">+</button>
        <button onclick="changeQuantity(${index}, -1)">-</button>
        <button onclick="removeItem(${index})">❌</button>
      </div>
    `;
    cartItems.appendChild(li);
  });

  cartTotal.textContent = total.toFixed(2);
  cartCountt.textContent = itemCount; // update floating cart count
}
