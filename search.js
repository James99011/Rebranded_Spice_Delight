(function () {
  const BASE_PATH = '';
  const INDEX_PATH = 'search-index.json';
  
  const trigger = document.getElementById('site-search-trigger');
  const overlay = document.getElementById('site-search-overlay');
  const input = document.getElementById('siteSearchInput');
  const closeBtn = document.getElementById('search-close');
  const resultsEl = document.getElementById('search-results');
  const voiceBtn = document.getElementById('voice-search-btn');

  let index = []; 
  let searchTimer;
  let selectedIndex = -1;

  // 1. Load the Index
  function loadIndex() {
    return fetch(INDEX_PATH, {cache: "no-cache"})
      .then(res => {
        if (!res.ok) throw new Error('Search index not found: ' + res.status);
        return res.json();
      })
      .then(json => { index = json.pages || []; })
      .catch(err => { console.error('Search index load error', err); });
  }

  // 2. Open/Close
  function openSearch() {
    overlay.style.display = 'flex';
    overlay.setAttribute('aria-hidden', 'false');
    setTimeout(() => input.focus(), 120);
    document.body.style.overflow = 'hidden';
  }

  function closeSearch() {
    overlay.style.display = 'none';
    overlay.setAttribute('aria-hidden', 'true');
    input.value = '';
    resultsEl.innerHTML = '';
    selectedIndex = -1;
    document.body.style.overflow = '';
  }

  // 3. Highlight Helper
  function highlightText(text, q) {
    if (!q) return text;
    const regex = new RegExp(`(${q})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
  }

  // 4. Snippet Helper
  function makeSnippet(text, q) {
    if (!q) return text.slice(0, 140) + '...';
    const lct = text.toLowerCase();
    const idx = lct.indexOf(q.toLowerCase());
    if (idx === -1) return text.slice(0, 140) + '...';
    const start = Math.max(0, idx - 40);
    return (start > 0 ? '...' : '') + text.slice(start, start + 140) + '...';
  }

  // 5. Professional "No Results" Renderer
  function renderNoResults(q) {
    resultsEl.innerHTML = `
      <div class="search-no-results-container">
        <div style="font-size: 40px; margin-bottom: 10px;">🍽</div>
        <h3>Oops! No matches for "${q}"</h3>
        <p>We couldn't find that, but you might find these interesting:</p>
        <div class="popular-suggestions">
          <a href="shop/shop.html" class="suggestion-chip">Today's Menu</a>
          <a href="reservation/reservation.html" class="suggestion-chip">Book a Table</a>
          <a href="blog/blog.html" class="suggestion-chip">Chef's Blog</a>
          <a href="video/video.html" class="suggestion-chip">Cooking Videos</a>
        </div>
      </div>
    `;
  }

  // 6. Render Logic
  function renderResults(items, q) {
    resultsEl.innerHTML = '';
    selectedIndex = -1; 

    if (!items || items.length === 0) {
      renderNoResults(q);
      return;
    }

    const fragment = document.createDocumentFragment();
    items.forEach((item, idx) => {
      const div = document.createElement('div');
      div.className = 'search-item';
      div.tabIndex = 0;

      div.innerHTML = `
        <img class="thumb" src="${item.img || 'images/default-thumb.jpg'}" alt="${item.title}">
        <div class="meta">
          <h4>${highlightText(item.title, q)}</h4>
          <p>${highlightText(makeSnippet(item.content || '', q), q)}</p>
          <div class="url">${item.url.replace(/^\/+/,'')}</div>
        </div>
      `;

      div.addEventListener('click', () => {
        window.location.href = BASE_PATH + item.url;
      });

      fragment.appendChild(div);
    });
    resultsEl.appendChild(fragment);
  }

  // 7. Search Logic
  function searchIndex(q) {
    if (!q || q.trim().length === 0) return [];
    const Q = q.toLowerCase();
    return index.map(item => {
      const title = (item.title || '').toLowerCase();
      const body = (item.content || '').toLowerCase();
      let score = 0;
      if (title.includes(Q)) score += 50;
      if (body.includes(Q)) score += 20;
      return { item, score };
    }).filter(x => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(x => x.item);
  }

  // 8. Navigation Helper
  function updateSelection(items) {
    items.forEach((item, index) => {
      if (index === selectedIndex) {
        item.classList.add('selected');
        item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      } else {
        item.classList.remove('selected');
      }
    });
  }

  // --- Initialize Event Listeners ---
  loadIndex().then(() => {
    if (trigger) trigger.addEventListener('click', openSearch);
    closeBtn.addEventListener('click', closeSearch);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closeSearch(); });

    // Main Search Input Listener
    input.addEventListener('input', (e) => {
      const q = input.value.trim();
      const loader = document.getElementById('search-loader');
      clearTimeout(searchTimer);

      if (!q) {
        resultsEl.innerHTML = '';
        if (loader) loader.style.display = 'none';
        return;
      }

      if (loader) {
        loader.style.display = 'block';
        resultsEl.innerHTML = '';
        resultsEl.appendChild(loader);
      }

      searchTimer = setTimeout(() => {
        const results = searchIndex(q);
        if (loader) loader.style.display = 'none';
        renderResults(results, q);
      }, 400);
    });

    // Keyboard Navigation Listener
    input.addEventListener('keydown', (e) => {
      const items = resultsEl.querySelectorAll('.search-item');
      if (items.length === 0) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        selectedIndex = Math.min(selectedIndex + 1, items.length - 1);
        updateSelection(items);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        selectedIndex = Math.max(selectedIndex - 1, 0);
        updateSelection(items);
      } else if (e.key === 'Enter') {
        if (selectedIndex > -1) {
          items[selectedIndex].click();
        } else {
          items[0].click(); // Default to first result
        }
      } else if (e.key === 'Escape') {
        closeSearch();
      }
    });

    // Voice Search
    if (voiceBtn && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';

      voiceBtn.addEventListener('click', () => {
        recognition.start();
        voiceBtn.classList.add('listening');
      });

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        input.value = transcript;
        voiceBtn.classList.remove('listening');
        renderResults(searchIndex(transcript), transcript);
      };
      
      recognition.onend = () => voiceBtn.classList.remove('listening');
      recognition.onerror = () => voiceBtn.classList.remove('listening');
    }
  });
})();