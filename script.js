const drinkSlider = document.querySelector('.drink-slider');
const leftBtn = document.querySelector('.left-btn');
const rightBtn = document.querySelector('.right-btn');

function updateScrollButtons() {
  const scrollLeft = drinkSlider.scrollLeft;
  const maxScrollLeft = drinkSlider.scrollWidth - drinkSlider.clientWidth;

  const reachedStart = scrollLeft <= 1;
  const reachedEnd = scrollLeft + 2 >= maxScrollLeft

  leftBtn.style.opacity = reachedStart ? '0' : '1';
  leftBtn.style.pointerEvents = reachedStart ? 'none' : 'auto';

  rightBtn.style.opacity = reachedEnd ? '0' : '1';
  rightBtn.style.pointerEvents = reachedEnd ? 'none' : 'auto';
} 


// Function to calculate card width (with margin/gap)
function getCardWidth() {
  const card = document.querySelector('.drink-card');
  const cardStyle = window.getComputedStyle(card);
  const gap = parseInt(cardStyle.marginRight) || 0; // default 20px gap
  return card.offsetWidth + gap;
}

leftBtn.addEventListener('click', () => {
  const scrollAmount = getCardWidth();
  drinkSlider.scrollBy({
    left: -scrollAmount,
    behavior: 'smooth'
  });
  setTimeout(updateScrollButtons, 400);  
});

rightBtn.addEventListener('click', () => {
  const scrollAmount = getCardWidth();
  drinkSlider.scrollBy({
    left: scrollAmount,
    behavior: 'smooth'
  });
    setTimeout(updateScrollButtons, 400); 
});



drinkSlider.addEventListener('scroll', updateScrollButtons);
window.addEventListener('load', updateScrollButtons); 


// FOOD SECTION
const foodSlider = document.querySelector('.food-slider');
const leftButton = document.querySelector('.left-button');
const rightButton = document.querySelector('.right-button');

function updateScrollBtn() {
  const scrollLeft = foodSlider.scrollLeft;
  const maxScrollLeft = foodSlider.scrollWidth - foodSlider.clientWidth;

  const reachedStart = scrollLeft <= 1;
  const reachedEnd = scrollLeft + 2 >= maxScrollLeft

  leftButton.style.opacity = reachedStart ? '0' : '1';
  leftButton.style.pointerEvents = reachedStart ? 'none' : 'auto';

  rightButton.style.opacity = reachedEnd ? '0' : '1';
  rightButton.style.pointerEvents = reachedEnd ? 'none' : 'auto';
} 


// Function to calculate card width (with margin/gap)
function getFoodCardWidth() {
  const card = document.querySelector('.food-card');
  const cardStyle = window.getComputedStyle(card);
  const gap = parseInt(cardStyle.marginRight) || 0; // default 20px gap
  return card.offsetWidth + gap;
}

leftButton.addEventListener('click', () => {
  const scrollAmount = getFoodCardWidth();
  foodSlider.scrollBy({
    left: -scrollAmount,
    behavior: 'smooth'
  });
  setTimeout(updateScrollBtn, 400);  
});

rightButton.addEventListener('click', () => {
  const scrollAmount = getFoodCardWidth();
  foodSlider.scrollBy({
    left: scrollAmount,
    behavior: 'smooth'
  });
    setTimeout(updateScrollBtn, 400); 
});



foodSlider.addEventListener('scroll', updateScrollBtn);
window.addEventListener('load', updateScrollBtn); 



// This prevents quick double taps from zooming or shifting the screen and safari can't override it
let lastTouch = 0;
document.addEventListener('touchend', function(event) {
  const now = Date.now();
  if (now - lastTouch <= 300) {
    event.preventDefault();
  }
  lastTouch = now;
}, { passive: false });




document.addEventListener('DOMContentLoaded', () => {
  const drinkSlider = document.querySelector('.drink-slider');
  const leftBtn = document.getElementById('drink-left');
  const rightBtn = document.getElementById('drink-right');

  const scrollToPosition = (element, to, duration) => {
    const start = element.scrollLeft;
    const change = to - start;
    let currentTime = 0;
    const increment = 20; // Time in ms between each step of the animation

    const animateScroll = () => {
      currentTime += increment;
      const val = Math.easeInOutQuad(currentTime, start, change, duration);
      element.scrollLeft = val;
      if (currentTime < duration) {
        requestAnimationFrame(animateScroll);
      }
    };

    // Easing function for a smooth start and end
    Math.easeInOutQuad = (t, b, c, d) => {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    };

    animateScroll();
  };

  leftBtn.addEventListener('click', () => {
    const cardWidth = drinkSlider.querySelector('.drink-card').offsetWidth;
    const scrollDistance = cardWidth + 16;
    const newScrollPos = drinkSlider.scrollLeft - scrollDistance;
    
    // Set a duration in milliseconds (e.g., 500ms for a slower scroll)
    scrollToPosition(drinkSlider, newScrollPos, 200);
  });

  rightBtn.addEventListener('click', () => {
    const cardWidth = drinkSlider.querySelector('.drink-card').offsetWidth;
    const scrollDistance = cardWidth + 16;
    const newScrollPos = drinkSlider.scrollLeft + scrollDistance;
    
    // Set a duration in milliseconds (e.g., 500ms for a slower scroll)
    scrollToPosition(drinkSlider, newScrollPos, 200);
  });
});





document.addEventListener('DOMContentLoaded', () => {
  const foodSlider = document.querySelector('.food-slider');
  const leftBtn = document.getElementById('food-left');
  const rightBtn = document.getElementById('food-right');

  const scrollToPosition = (element, to, duration) => {
    const start = element.scrollLeft;
    const change = to - start;
    let currentTime = 0;
    const increment = 20; // Time in ms between each step of the animation

    const animateScroll = () => {
      currentTime += increment;
      const val = Math.easeInOutQuad(currentTime, start, change, duration);
      element.scrollLeft = val;
      if (currentTime < duration) {
        requestAnimationFrame(animateScroll);
      }
    };

    // Easing function for a smooth start and end
    Math.easeInOutQuad = (t, b, c, d) => {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    };

    animateScroll();
  };

  leftBtn.addEventListener('click', () => {
    const cardWidth = foodSlider.querySelector('.food-card').offsetWidth;
    const scrollDistance = cardWidth + 35;
    const newScrollPos = foodSlider.scrollLeft - scrollDistance;
    
    // Set a duration in milliseconds (e.g., 500ms for a slower scroll)
    scrollToPosition(foodSlider, newScrollPos, 200);
  });

  rightBtn.addEventListener('click', () => {
    const cardWidth = foodSlider.querySelector('.food-card').offsetWidth;
    const scrollDistance = cardWidth + 35;
    const newScrollPos = foodSlider.scrollLeft + scrollDistance;
    
    // Set a duration in milliseconds (e.g., 500ms for a slower scroll)
    scrollToPosition(foodSlider, newScrollPos, 200);
  });
});







window.addEventListener('load', function () {
  AOS.init({
  duration: 1000, // time in ms
  easing: 'ease-in-out', // animation style
  once: true, // whether animation should happen only once
  offset: 0, // adjust trigger point
});
});


const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    scrollTopBtn.classList.add("show");
  } else {
    scrollTopBtn.classList.remove("show");
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});












