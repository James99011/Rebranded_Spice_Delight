const navToggle = document.getElementById('toggleSymbol');
const mobileMenu = document.getElementById('mobileMenu');

navToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('show');

  // Toggle between + and ×
  if (navToggle.textContent === '+') {
    navToggle.textContent = '×';
  } else {
    navToggle.textContent = '+';
  }
});


  
let cartCount = 0;
let menuOpen = false;

const toggleSymbol = document.getElementById('toggleSymbol');
const cartCountSpan = document.getElementById('cartCount');
const navTogglee = document.getElementById('navToggle');

function updateCartCount() {
  cartCountSpan.textContent = `(${cartCount})`;
}

function addToCart() {
  cartCount++;
  updateCartCount();
}


// Initialize count on load
updateCartCount();


document.addEventListener('gesturestart', function (e) {
    e.preventDefault();
});




const cartSidebar = document.getElementById("cart-sidebar");
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
    cartSidebar.classList.add("active"); // open cart
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


const cartToggle = document.getElementById("cart-toggle");
const cartCountt = document.getElementById("cart-count");

// Toggle cart sidebar
cartToggle.addEventListener("click", () => {
  cartSidebar.classList.toggle("active");
});

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

// Get cart sidebar and toggle button
const cartSidebarr = document.getElementById("cart-sidebar");

// Mobile header cart (0)
const mobileCartBtn = document.getElementById("cartCount");

// Dropdown nav bar 🛒
const dropdownCartLinks = document.querySelectorAll(".mobile-menu a[href='#cart']");

// Laptop header cart 🛒
const desktopCartLink = document.querySelector(".desktop-menu a[href='#cart']");

// Toggle sidebar function
function openCart() {
  cartSidebarr.classList.add("active");
}

function closeCart() {
  cartSidebarr.classList.remove("active");
}

// Attach events
if (mobileCartBtn) {
  mobileCartBtn.addEventListener("click", openCart);
}
if (desktopCartLink) {
  desktopCartLink.addEventListener("click", function(e) {
    e.preventDefault();
    openCart();
  });
}
dropdownCartLinks.forEach(link => {
  link.addEventListener("click", function(e) {
    e.preventDefault();
    openCart();
  });
});