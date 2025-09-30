// GLOBAL.JS

// --- Navbar Toggle Logic (Global) ---
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
const toggleSymbol = document.getElementById('toggleSymbol');

if (navToggle && mobileMenu) {
  navToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('show');
    if (toggleSymbol.textContent === '+') {
      toggleSymbol.textContent = '×';
    } else {
      toggleSymbol.textContent = '+';
    }
  });
}

// --- Cart and Page Redirect Logic (Global) ---
const cartLinks = document.querySelectorAll('#cartCount, .desktop-menu a[href*="#cart"], .mobile-menu a[href*="#cart"]');
const isShopPage = window.location.href.includes("shop.html");

cartLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    if (isShopPage) {
      // On the shop page, open the cart sidebar
      e.preventDefault();
      const cartSidebar = document.getElementById("cart-sidebar");
      if (cartSidebar) {
        cartSidebar.classList.toggle("active");
      }
    } else {
      // On the landing page, redirect to the shop page's cart section
      // This is handled by the HTML href attribute
      // The browser will redirect the user automatically
    }
  });
});

// --- Shop Page Specific Logic (Conditional) ---
if (isShopPage) {
  const cartSidebar = document.getElementById("cart-sidebar");
  const cartToggle = document.getElementById("cart-toggle");
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Add event listener for the floating cart toggle button
  if (cartToggle) {
    cartToggle.addEventListener("click", () => {
      cartSidebar.classList.toggle("active");
    });
  }

  // Add to Cart button logic
  document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", function () {
      const card = this.closest(".menu-card");
      const name = card.getAttribute("data-name");
      const price = parseFloat(card.getAttribute("data-price"));

      const existingItem = cart.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        cart.push({ name, price, quantity: 1 });
      }

      updateCart();
      cartSidebar.classList.add("active"); // Open cart sidebar on adding item
    });
  });

  // Update Cart Display
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
    // You also need to update the cart count on the header
    const headerCartCount = document.getElementById("cartCount");
    if (headerCartCount) {
      headerCartCount.textContent = `(${itemCount})`;
    }
    const floatingCartCount = document.getElementById("cart-count");
    if (floatingCartCount) {
      floatingCartCount.textContent = itemCount;
    }

    // Add this line to save the cart to local storage
    localStorage.setItem('cart', JSON.stringify(cart));


  }

  // Change Quantity
  window.changeQuantity = function(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }
    updateCart();
  };

  // Remove Item
  window.removeItem = function(index) {
    cart.splice(index, 1);
    updateCart();
  };

  // Initial cart update
  updateCart();

  // Add this to your GLOBAL.JS inside the isShopPage block
  // to open the cart sidebar if redirected from a landing page cart link
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('showCart') === 'true') {
      const cartSidebar = document.getElementById("cart-sidebar");
      if (cartSidebar) {
          cartSidebar.classList.add("active");
      }
  }
}

// Prevents pinch zoom on mobile
document.addEventListener('gesturestart', function (e) {
    e.preventDefault();
});