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




// Drink buttons
const drinkScrollLeftBtn = document.getElementById("drink-left");
const drinkScrollRightBtn = document.getElementById("drink-right");
const drinkBox = document.querySelector('.drink-slider');

/* function getDrinkScrollAmount() {
  const drinkCard = drinkBox.querySelector('.drink-card');
  const cardStyles = getComputedStyle(drinkCard);
  
  const marginLeft = parseFloat(cardStyles.marginLeft);
  const marginRight = parseFloat(cardStyles.marginRight);
  
  return drinkCard.offsetWidth + marginLeft + marginRight;
} */

  
  function getDrinkScrollAmount() {
  const drinkCard = drinkBox.querySelector('.drink-card');
  const cardStyle = window.getComputedStyle(drinkCard);
  const gap = parseInt(cardStyle.marginRight) || 0; 
  return drinkCard.offsetWidth + gap;
}


drinkScrollLeftBtn.addEventListener("click", () => {
  drinkBox.scrollBy({ left: -getDrinkScrollAmount(), behavior: "smooth" });
});

drinkScrollRightBtn.addEventListener("click", () => {
  drinkBox.scrollBy({ left: getDrinkScrollAmount(), behavior: "smooth" });
});






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



// Food buttons
const foodScrollLeftBtn = document.getElementById("food-left");
const foodScrollRightBtn = document.getElementById("food-right");
const foodBox = document.querySelector('.food-slider');

/* function getDrinkScrollAmount() {
  const foodCard = foodBox.querySelector('.food-card');
  const cardStyles = getComputedStyle(foodCard);
  
  const marginLeft = parseFloat(cardStyles.marginLeft);
  const marginRight = parseFloat(cardStyles.marginRight);
  
  return foodCard.offsetWidth + marginLeft + marginRight;
} */


  function getDrinkScrollAmount() {
  const foodCard = foodBox.querySelector('.food-card');
  const cardStyle = window.getComputedStyle(foodCard);
  const gap = parseInt(cardStyle.marginRight) || 0; 
  return foodCard.offsetWidth + gap;
}



foodScrollLeftBtn.addEventListener("click", () => {
  foodBox.scrollBy({ left: -getDrinkScrollAmount(), behavior: "smooth" });
});

foodScrollRightBtn.addEventListener("click", () => {
  foodBox.scrollBy({ left: getDrinkScrollAmount(), behavior: "smooth" });
});














window.addEventListener('load', function () {
  AOS.init({
  duration: 1000, // time in ms
  easing: 'ease-in-out', // animation style
  once: true, // whether animation should happen only once
  offset: 0, // adjust trigger point
});
});














