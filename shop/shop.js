document.addEventListener('gesturestart', function (e) {
    e.preventDefault();
});





const cartToggle = document.getElementById("cart-toggle");
const cartCountt = document.getElementById("cart-count");

// Toggle cart sidebar
cartToggle.addEventListener("click", () => {
  cartSidebar.classList.toggle("active");
});




/* 
const cartSidebarr = document.getElementById("cart-sidebar");


const mobileCartBtn = document.getElementById("cartCount");


const dropdownCartLinks = document.querySelectorAll(".mobile-menu a[href='#cart']");


const desktopCartLink = document.querySelector(".desktop-menu a[href='#cart']");


function openCart() {
  cartSidebarr.classList.add("active");
}

function closeCart() {
  cartSidebarr.classList.remove("active");
}


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
}); */