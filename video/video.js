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

