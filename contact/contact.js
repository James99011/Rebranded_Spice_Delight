// Initialize EmailJS
(function () {
  emailjs.init("0wOnx6oV21FxdPyOX"); // Your Public Key
})();

const form = document.getElementById("contact-form");
const sendBtn = document.getElementById("send-btn");
const modalBackdrop = document.getElementById("modal-backdrop");
const modalTitle = document.getElementById("modal-title");
const modalMessage = document.getElementById("modal-message");
const modalClose = document.getElementById("modal-close");

function showModal(title, message, isError = false, autoCloseMs = 3500) {
  modalTitle.textContent = title;
  modalMessage.textContent = message;
  modalBackdrop.classList.add("show");

  modalTitle.style.color = isError ? "#b71c1c" : "#00695c";

  if (autoCloseMs > 0) {
    clearTimeout(showModal._timer);
    showModal._timer = setTimeout(() => closeModal(), autoCloseMs);
  }
}

function closeModal() {
  modalBackdrop.classList.remove("show");
}

modalClose.addEventListener("click", closeModal);
modalBackdrop.addEventListener("click", function (e) {
  if (e.target === modalBackdrop) closeModal();
});

// Handle Submission
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const subject = document.getElementById("subject").value;
  if (!subject) {
    showModal("Subject Required", "Please choose a subject.", true, 3000);
    return;
  }

  sendBtn.disabled = true;
  sendBtn.textContent = "Sending...";

  emailjs
    .sendForm("default_service", "template_bhyaums", "#contact-form")
    .then(
      function () {
        showModal(
          "Message Sent",
          "Your message was successfully delivered to Spice Delight.",
          false,
          3000
        );
        form.reset();
      },
      function (error) {
        console.error("EmailJS error:", error);
        showModal(
          "Send Failed",
          "Could not send message. Please try again later.",
          true,
          5000
        );
      }
    )
    .finally(function () {
      sendBtn.disabled = false;
      sendBtn.textContent = "Send Message";
    });
});




// Custom responsive select replacement (keeps original select for form submission)
(function () {
  const nativeSelect = document.querySelector('select[name="subject"]');
  if (!nativeSelect) return;

  // Create wrapper
  const wrapper = document.createElement('div');
  wrapper.className = 'custom-select';
  nativeSelect.parentNode.insertBefore(wrapper, nativeSelect);
  wrapper.appendChild(nativeSelect);

  // Hide the native select but keep it for form submission
  nativeSelect.classList.add('select-hidden');

  // Create trigger
  const trigger = document.createElement('button');
  trigger.type = 'button';
  trigger.className = 'custom-select__trigger';
  trigger.setAttribute('aria-haspopup', 'listbox');
  trigger.setAttribute('aria-expanded', 'false');
  trigger.textContent = nativeSelect.options[nativeSelect.selectedIndex]?.text || 'Choose a subject';

  // caret icon (simple SVG)
  const caret = document.createElement('span');
  caret.className = 'custom-select__caret';
  caret.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false"><path d="M7 10l5 5 5-5" stroke="#0b2b3a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  trigger.appendChild(caret);

  wrapper.appendChild(trigger);

  // Create options container
  const optionsContainer = document.createElement('div');
  optionsContainer.className = 'custom-select__options hidden';
  optionsContainer.setAttribute('role', 'listbox');
  optionsContainer.setAttribute('tabindex', '-1');

  // Populate options from native select
  Array.from(nativeSelect.options).forEach((opt, idx) => {
    if (!opt.value) return; // skip placeholder empty option
    const item = document.createElement('div');
    item.className = 'custom-select__option';
    item.setAttribute('role', 'option');
    item.setAttribute('data-value', opt.value);
    item.setAttribute('aria-selected', opt.selected ? 'true' : 'false');
    item.innerHTML = opt.textContent;
    item.addEventListener('click', function (e) {
      // update native select and trigger text
      nativeSelect.value = opt.value;
      // mark selected
      Array.from(optionsContainer.children).forEach(ch => ch.setAttribute('aria-selected', 'false'));
      item.setAttribute('aria-selected', 'true');
      trigger.firstChild.textContent = opt.textContent;
      closeOptions();
      // dispatch change event on native select (in case any code listens)
      nativeSelect.dispatchEvent(new Event('change', { bubbles: true }));
    });
    optionsContainer.appendChild(item);
  });

  wrapper.appendChild(optionsContainer);

  // Open / close helpers
  function openOptions() {
    optionsContainer.classList.remove('hidden');
    trigger.setAttribute('aria-expanded', 'true');
    // make sure dropdown fits inside viewport vertically on small screens
    optionsContainer.style.maxHeight = Math.min(window.innerHeight - wrapper.getBoundingClientRect().bottom - 24, 320) + 'px';
    // focus for keyboard support
    optionsContainer.focus();
  }
  function closeOptions() {
    optionsContainer.classList.add('hidden');
    trigger.setAttribute('aria-expanded', 'false');
  }

  trigger.addEventListener('click', function (e) {
    e.stopPropagation();
    if (optionsContainer.classList.contains('hidden')) openOptions(); else closeOptions();
  });

  // Close on outside click
  document.addEventListener('click', function (e) {
    if (!wrapper.contains(e.target)) closeOptions();
  });

  // Keyboard navigation (basic)
  let focusedIndex = -1;
  wrapper.addEventListener('keydown', function (e) {
    const options = Array.from(optionsContainer.querySelectorAll('.custom-select__option'));
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (optionsContainer.classList.contains('hidden')) { openOptions(); focusedIndex = 0; options[0]?.focus(); }
      else { focusedIndex = Math.min(focusedIndex + 1, options.length - 1); options[focusedIndex]?.focus(); }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      focusedIndex = Math.max(focusedIndex - 1, 0); options[focusedIndex]?.focus();
    } else if (e.key === 'Escape') {
      closeOptions();
      trigger.focus();
    } else if (e.key === 'Enter' || e.key === ' ') {
      if (document.activeElement.classList.contains('custom-select__option')) {
        document.activeElement.click();
      } else {
        // open if closed
        if (optionsContainer.classList.contains('hidden')) openOptions();
      }
    }
  });

  // Ensure option elements are focusable for keyboard nav
  Array.from(optionsContainer.children).forEach(el => el.setAttribute('tabindex', '0'));

  // If the native select value changes elsewhere, update the trigger
  nativeSelect.addEventListener('change', function () {
    const sel = nativeSelect.options[nativeSelect.selectedIndex];
    if (sel) trigger.firstChild.textContent = sel.text;
    // update aria-selected
    Array.from(optionsContainer.children).forEach(ch => ch.setAttribute('aria-selected', ch.getAttribute('data-value') === nativeSelect.value ? 'true' : 'false'));
  });

  // close on resize to avoid odd positioning
  window.addEventListener('resize', closeOptions);
})();






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