// Modal Logic
const modal = document.getElementById('videoModal');
const videoFrame = document.getElementById('videoFrame');
const closeBtn = document.querySelector('.close');

// Open modal when video item clicked
document.querySelectorAll('.video-item').forEach(item => {
  item.addEventListener('click', () => {
    const videoUrl = item.getAttribute('data-video') + "?autoplay=1";
    videoFrame.src = videoUrl;
    modal.style.display = 'block';
  });
});

// Close modal
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
  videoFrame.src = "";
});

// Close modal on backdrop click
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
    videoFrame.src = "";
  }
});

// 🔹 Filter Logic
const filterBtns = document.querySelectorAll('.filter-btn');
const videoItems = document.querySelectorAll('.video-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    videoItems.forEach(item => {
      if (filter === 'all' || item.getAttribute('data-category') === filter) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
});




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





let visibleVideos = 4; // Show first 4 initially
const loadMoreBtn = document.getElementById("loadMoreBtn");
const videoItemss = document.querySelectorAll(".video-item");

loadMoreBtn.addEventListener("click", () => {
  visibleVideos += 4;
  videoItemss.forEach((item, index) => {
    if (index < visibleVideos) {
      item.style.display = "block";
    }
  });

  if (visibleVideos >= videoItemss.length) {
    loadMoreBtn.style.display = "none";
  }
});

// Initially hide videos beyond 4
videoItemss.forEach((item, index) => {
  if (index >= 4) item.style.display = "none";
});


