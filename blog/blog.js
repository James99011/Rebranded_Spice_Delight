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



// Robust blog search (auto-detects your cards and inserts search if missing)
// Paste at end of blog.js or inside a script tag before </body>

document.addEventListener('DOMContentLoaded', () => {
  // Find or create search input inside hero
  let searchInput = document.getElementById('blogSearchInput');
  const hero = document.querySelector('.blog-hero');

  if (!searchInput) {
    // create container + input (won't duplicate if user already added)
    const wrapper = document.createElement('div');
    wrapper.className = 'blog-search-container';
    wrapper.innerHTML = `
      <input type="text" id="blogSearchInput" placeholder="Search blog posts..." aria-label="Search blog posts">
      <span class="search-icon" aria-hidden="true">🔍</span>
    `;
    // put it under hero content (if hero exists) otherwise at top of body
    if (hero) hero.querySelector('.hero-content')?.appendChild(wrapper);
    else document.body.insertBefore(wrapper, document.body.firstChild);
    searchInput = document.getElementById('blogSearchInput');
  }

  // Find posts container elements. Support both .post and .blog-card naming.
  const posts = Array.from(document.querySelectorAll('.post, .blog-card'));
  // create "no results" element
  let noResults = document.getElementById('blog-no-results');
  if (!noResults) {
    noResults = document.createElement('div');
    noResults.id = 'blog-no-results';
    noResults.style.display = 'none';
    noResults.style.textAlign = 'center';
    noResults.style.marginTop = '18px';
    noResults.style.color = '#fff';
    noResults.style.fontWeight = '600';
    // insert after the posts grid if possible
    const postsSection = document.querySelector('.blog-posts .container') || document.querySelector('.container') || document.querySelector('.blog-posts');
    if (postsSection) postsSection.parentNode.insertBefore(noResults, postsSection.nextSibling);
    else document.body.appendChild(noResults);
  }

  // Build searchable index for each post
  const index = posts.map(post => {
    // title: look for h2 or h3 or element with .blog-title
    const titleEl = post.querySelector('h2, h3, .blog-title');
    const title = titleEl ? titleEl.textContent.trim() : '';

    // excerpt: first paragraph or .post-content p
    const excerptEl = post.querySelector('p') || post.querySelector('.post-content p') || post.querySelector('.blog-excerpt');
    const excerpt = excerptEl ? excerptEl.textContent.trim() : '';

    // image alt
    const img = post.querySelector('img');
    const alt = img ? (img.alt || img.getAttribute('data-alt') || '') : '';

    // tags (optional data-tags attribute on the post element, comma separated)
    const tags = post.dataset.tags || '';

    // full searchable string
    const searchable = (title + ' ' + excerpt + ' ' + alt + ' ' + tags).toLowerCase();

    return { element: post, title, excerpt, searchable };
  });

  // Helper: show all posts (reset)
  function showAll() {
    index.forEach(i => i.element.style.display = '');
    noResults.style.display = 'none';
  }

  // Core filter function
  function filterPosts(query) {
    const q = String(query || '').toLowerCase().trim();
    if (!q) {
      showAll();
      return;
    }
    let matches = 0;
    index.forEach(i => {
      if (i.searchable.includes(q)) {
        i.element.style.display = '';
        matches++;
      } else {
        i.element.style.display = 'none';
      }
    });
    if (matches === 0) {
      noResults.textContent = `No posts found for "${query}"`;
      noResults.style.display = 'block';
    } else {
      noResults.style.display = 'none';
    }
  }

  // Live filtering as the user types, debounce quick typing
  let debounceTimer;
  searchInput.addEventListener('input', (e) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => filterPosts(e.target.value), 150);
  });

  // Enter key behaviour: focus/scroll to first match and open it (if modal bound)
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const firstMatch = index.find(i => i.element.style.display !== 'none');
      if (firstMatch) {
        // scroll into view smoothly and highlight briefly
        firstMatch.element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstMatch.element.style.transition = 'box-shadow 0.3s ease';
        firstMatch.element.style.boxShadow = '0 6px 24px rgba(0,123,255,0.18)';
        setTimeout(() => firstMatch.element.style.boxShadow = '', 1200);

        // try to open the post modal if the card has a read-more button linked via data-post or data-modal
        const btn = firstMatch.element.querySelector('.read-more');
        if (btn) btn.click();
      }
    }
  });

  // Optional: expose function for other scripts
  window.spiceSearchFilter = filterPosts;
});








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