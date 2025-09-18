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



const cartSidebar = document.getElementById("cart-sidebar");




const cartToggle = document.getElementById("cart-toggle");
const cartCountt = document.getElementById("cart-count");

// Toggle cart sidebar
cartToggle.addEventListener("click", () => {
  cartSidebar.classList.toggle("active");
});




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