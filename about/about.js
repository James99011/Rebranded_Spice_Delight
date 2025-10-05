
let lastTouch = 0;
document.addEventListener('touchend', function(event) {
  const now = Date.now();
  if (now - lastTouch <= 300) {
    event.preventDefault();
  }
  lastTouch = now;
}, { passive: false });





    // Assuming 'updateHeaderCartCount' is the function that reads localStorage and updates the header count.
    // This is the function that should be available from your global.js.
    if (typeof updateHeaderCartCount === 'function') {
        updateHeaderCartCount();
    } else {
        // Fallback code if the function is not defined globally (less likely, but a good check)
        const headerCartCount = document.getElementById("cartCount");
        if (headerCartCount) {
            const savedCart = localStorage.getItem('cart');
            const cart = savedCart ? JSON.parse(savedCart) : [];
            const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
            headerCartCount.textContent = `(${itemCount})`;
        }
    }
