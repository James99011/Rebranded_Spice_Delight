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


// Prevent pinch zoom (gesture start)
document.addEventListener('gesturestart', function (e) {
    e.preventDefault();
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