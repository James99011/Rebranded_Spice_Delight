const modal = document.getElementById("blog-modal");
const modalTitle = document.getElementById("modal-title");
const modalBody = document.getElementById("modal-body");
const closeBtn = document.querySelector(".close-btn");

const posts = {
  1: {
    title: "The Art of Balancing Spices",
    body: "Spices are the heart of every dish. Knowing how to balance them can elevate even simple meals. Begin by understanding their strength: cumin is earthy, chili adds heat, and cinnamon gives warmth. The secret? Taste as you go, and always combine contrasting flavors — sweet with spicy, or tangy with creamy."
  },
  2: {
    title: "5 Healthy Meals You Can Cook in 20 Minutes",
    body: "Cooking healthy doesn’t mean spending hours in the kitchen. Try grilled salmon with steamed veggies, avocado toast with boiled eggs, or spicy chicken wraps. Always include a protein source, some greens, and complex carbs for balance."
  },
  3: {
    title: "Chef’s Secret: How to Keep Meals Fresh",
    body: "Freshness is everything. Always store your ingredients in airtight containers, use glass jars for sauces, and refrigerate leftovers within two hours. Add herbs last to preserve flavor, and avoid overcooking to maintain texture."
  }
};

// Open modal
document.querySelectorAll(".read-more").forEach(button => {
  button.addEventListener("click", e => {
    const postId = e.target.dataset.post;
    modalTitle.textContent = posts[postId].title;
    modalBody.textContent = posts[postId].body;
    modal.style.display = "flex";
  });
});

// Close modal
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", e => {
  if (e.target === modal) modal.style.display = "none";
});




// Dynamic modal elements (the single modal used before)
const dynamicModal = document.getElementById("blog-modal");        // single dynamic modal
const dynamicTitle = document.getElementById("modal-title");
const dynamicBody = document.getElementById("modal-body");
const dynamicClose = document.querySelector(".close-btn");

// Utility: open a static modal element by id (modal4, modal5, modal6)
function openStaticModal(modalId) {
  const m = document.getElementById(modalId);
  if (!m) return;
  m.style.display = "flex";
  // ensure scroll is locked optionally
  document.body.style.overflow = "hidden";
}

// Utility: close a static modal element by id
function closeStaticModal(modalEl) {
  if (!modalEl) return;
  modalEl.style.display = "none";
  document.body.style.overflow = "";
}

// Utility: open the dynamic modal with post content
function openDynamicModal(postId) {
  const post = posts[postId];
  if (!post || !dynamicModal) return;
  dynamicTitle.textContent = post.title;
  dynamicBody.textContent = post.body;
  dynamicModal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

// Utility: close dynamic modal
function closeDynamicModal() {
  if (!dynamicModal) return;
  dynamicModal.style.display = "none";
  document.body.style.overflow = "";
}

// Attach click handlers for all read-more buttons (both types)
document.querySelectorAll(".read-more").forEach(button => {
  button.addEventListener("click", (e) => {
    const postId = button.dataset.post;    // original dynamic posts: data-post="1"
    const modalId = button.dataset.modal;  // new static modals: data-modal="modal4"
    if (postId) {
      openDynamicModal(postId);
      return;
    }
    if (modalId) {
      openStaticModal(modalId);
      return;
    }
    // fallback: do nothing
  });
});


// Close handlers for dynamic modal
if (dynamicClose) {
  dynamicClose.addEventListener("click", () => closeDynamicModal());
}
if (dynamicModal) {
  window.addEventListener("click", (e) => {
    if (e.target === dynamicModal) closeDynamicModal();
  });
}

// Wire up all static modal close buttons (they use: <span class="close" data-close="modal4">)
document.querySelectorAll('span.close[data-close]').forEach(closeBtn => {
  closeBtn.addEventListener('click', function () {
    const modalId = this.getAttribute('data-close');
    const modalEl = document.getElementById(modalId);
    if (modalEl) closeStaticModal(modalEl);
  });
});

// Close static modals when clicking outside (any element with class "modal")
document.querySelectorAll('.modal').forEach(modalEl => {
  modalEl.addEventListener('click', function (e) {
    if (e.target === modalEl) {
      // this is a static modal or dynamic modal — close appropriately
      // If it's the dynamic modal (id="blog-modal") we already have closeDynamicModal
      if (modalEl.id === 'blog-modal') closeDynamicModal();
      else closeStaticModal(modalEl);
    }
  });
});

// Close modals on Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    // close dynamic modal if open
    if (dynamicModal && dynamicModal.style.display === 'flex') closeDynamicModal();
    // close any static modals if open
    document.querySelectorAll('.modal').forEach(modalEl => {
      if (modalEl.id !== 'blog-modal' && modalEl.style.display === 'flex') closeStaticModal(modalEl);
    });
  }
});