// search.js — full-site overlay search
// Requires: search-index.json in same root (or update path below)
// Uses document.getElementById for DOM selections per your style preference.

(function () {
  const BASE_PATH = '';
  const INDEX_PATH = 'search-index.json'; // update if you place it elsewhere
  const trigger = document.getElementById('site-search-trigger');
  const overlay = document.getElementById('site-search-overlay');
  const input = document.getElementById('siteSearchInput');
  const closeBtn = document.getElementById('search-close');
  const resultsEl = document.getElementById('search-results');

  let index = []; // loaded JSON index array [{title, body, tags, url, img}]
  // helper: fetch index
  function loadIndex() {
    return fetch(INDEX_PATH, {cache: "no-cache"})
      .then(res => {
        if (!res.ok) throw new Error('Search index not found: ' + res.status);
        return res.json();
      })
      .then(json => {
        index = json.pages || [];
      })
      .catch(err => {
        console.error('Search index load error', err);
        index = [];
      });
  }

  // open/close
  function openSearch() {
    overlay.style.display = 'flex';
    overlay.setAttribute('aria-hidden', 'false');
    // focus input after tiny delay (animation)
    setTimeout(()=> input.focus(), 120);
    document.body.style.overflow = 'hidden';
  }
  function closeSearch() {
    overlay.style.display = 'none';
    overlay.setAttribute('aria-hidden', 'true');
    input.value = '';
    resultsEl.innerHTML = '';
    document.body.style.overflow = '';
  }

  // Render results (array of items)
  function renderResults(items, q) {
    resultsEl.innerHTML = '';
    if (!items || items.length === 0) {
      resultsEl.innerHTML = '<div class="search-noresults">No results found</div>';
      return;
    }
    const fragment = document.createDocumentFragment();
    items.forEach(item => {
      const div = document.createElement('div');
      div.className = 'search-item';
      div.tabIndex = 0;

      // thumb (if provided)
      const img = document.createElement('img');
      img.className = 'thumb';
      img.alt = item.title;
      img.src = item.img || 'images/default-thumb.jpg';
      div.appendChild(img);

      // meta
      const meta = document.createElement('div');
      meta.className = 'meta';
      const h4 = document.createElement('h4');
      h4.textContent = item.title;
      meta.appendChild(h4);

      // snippet - highlight match quickly (simple)
      const snippet = document.createElement('p');
      snippet.textContent = makeSnippet(item.content || '', q);
      meta.appendChild(snippet);

      const url = document.createElement('div');
      url.className = 'url';
      url.textContent = item.url.replace(/^\/+/,''); // show relative
      meta.appendChild(url);

      div.appendChild(meta);

     div.addEventListener('click', () => {
       window.location.href = BASE_PATH + item.url;
     });

      div.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          window.location.href = BASE_PATH + item.url;
        }
      });

      fragment.appendChild(div);
    });
    resultsEl.appendChild(fragment);
  }

  // Simple snippet generator centered on first match
  function makeSnippet(text, q) {
    if (!q) return text.slice(0, 140) + (text.length>140? '…':'');
    const lct = text.toLowerCase();
    const idx = lct.indexOf(q.toLowerCase());
    if (idx === -1) return text.slice(0,140) + (text.length>140? '…':'');
    const start = Math.max(0, idx - 40);
    const snippet = text.slice(start, start + 140);
    return (start>0? '…':'') + snippet + (text.length > start+140? '…':'');
  }

  // Search scoring: simple but effective: title match > body match > tags
  function searchIndex(q) {
    if (!q || q.trim().length === 0) return [];
    const Q = q.toLowerCase();
    // Map each item to score
    const scored = index.map(item => {
      const title = (item.title||'').toLowerCase();
      const body = (item.content || '').toLowerCase();
      const tags = (item.tags||'').toLowerCase();
      let score = 0;
      if (title.includes(Q)) score += 50;
      if (body.includes(Q)) score += 20;
      if (tags.includes(Q)) score += 10;
      // partial word matches (fuzzy)
      const words = Q.split(/\s+/);
      words.forEach(w => {
        if (title.includes(w)) score += 8;
        if (body.includes(w)) score += 3;
      });
      return { item, score };
    }).filter(x => x.score > 0)
      .sort((a,b) => b.score - a.score)
      .map(x => x.item);
    return scored;
  }

  // init: load index then enable triggers
  loadIndex().then(() => {
    // show overlay on icon click / key
   if (trigger) {
    trigger.addEventListener('click', openSearch);
    trigger.addEventListener('keydown', function(e){
      if (e.key === 'Enter' || e.key === ' ') openSearch();
    });
   }
    closeBtn.addEventListener('click', closeSearch);
    // click outside to close
    overlay.addEventListener('click', function(e){
      if (e.target === overlay) closeSearch();
    });
    // Escape to close
    document.addEventListener('keydown', function(e){
      if (e.key === 'Escape') closeSearch();
    });

    // Live search with debounce
    let timer;
    input.addEventListener('input', function(e){
      clearTimeout(timer);
      timer = setTimeout(()=>{
        const q = input.value.trim();
        if (!q) {
          resultsEl.innerHTML = '';
          return;
        }
        const results = searchIndex(q);
        renderResults(results, q);
      }, 160);
    });

    // Enter key: open first result (if exists)
    input.addEventListener('keydown', function(e){
      if (e.key === 'Enter') {
        const first = resultsEl.querySelector('.search-item');
        if (first) first.click();
      }
    });
  });


  // --- FEATURE 1: Voice Recognition ---
  const voiceBtn = document.getElementById('voice-search-btn');

  if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    voiceBtn.addEventListener('click', () => {
      recognition.start();
      voiceBtn.classList.add('listening');
    });

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      input.value = transcript;
      voiceBtn.classList.remove('listening');
      // Trigger the search automatically
      const results = searchIndex(transcript);
      renderResults(results, transcript);
    };


    recognition.onstart = () => {
      console.log("Voice recognition started");
    };

    recognition.onend = () => {
      console.log("Voice recognition ended");
    };

    recognition.onerror = () => voiceBtn.classList.remove('listening');
    recognition.onend = () => voiceBtn.classList.remove('listening');
  } else {
    voiceBtn.style.display = 'none'; // Hide if browser doesn't support it
  }

  // --- FEATURE 2: Highlighting Matches ---
  // Replace your existing renderResults logic for the h4 and p tags with this highlight logic:
  function highlightText(text, q) {
    if (!q) return text;
    const regex = new RegExp`((${q}), 'gi')`;
    return text.replace(regex, '<span class="highlight">$1</span>');
  }

  // Inside your renderResults item loop:
  // h4.innerHTML = highlightText(item.title, q);
  // snippet.innerHTML = highlightText(makeSnippet(item.content || '', q), q);


  
  




})();








