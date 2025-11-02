// Initialize EmailJS
(function() {
  emailjs.init("0wOnx6oV21FxdPyOX");
})();

// Scroll to form when "Reserve Now" is clicked
document.getElementById("scrollToForm").addEventListener("click", function() {
  document.getElementById("reservation-form-section").scrollIntoView({ behavior: "smooth" });
});

// Handle form submission
const form = document.getElementById("reservationForm");
const popup = document.getElementById("popup");
const submitBtn = document.getElementById("submitBtn");

form.addEventListener("submit", function(e) {
  e.preventDefault();
  submitBtn.textContent = "Booking...";
  submitBtn.disabled = true;

  const formData = {
    name: form.name.value,
    email: form.email.value,
    phone: form.phone.value,
    guests: form.guests.value,
    date: form.date.value,
    time: form.time.value,
    message: form.message.value
  };

  emailjs.send("service_wh6kqqw", "template_bhyaums", formData)
    .then(() => {
      popup.textContent = "✅ Reservation sent successfully!";
      popup.style.color = "green";
      popup.style.display = "block";
      form.reset();

      // ⏰ Make it vanish after 3 seconds
      setTimeout(() => {
        popup.style.display = "none";
      }, 3000);
    })
    .catch(() => {
      popup.textContent = "❌ Failed to send reservation. Please try again.";
      popup.style.color = "red";
      popup.style.display = "block";
    })
    .finally(() => {
      submitBtn.textContent = "Book Now";
      submitBtn.disabled = false;
    });
});





// ====== Convert native select#guests into a custom responsive dropdown ======
(function () {
  const native = document.getElementById('guests');
  if (!native) return;

  // create wrapper and insert before native
  const wrapper = document.createElement('div');
  wrapper.className = 'custom-select';
  native.parentNode.insertBefore(wrapper, native);
  wrapper.appendChild(native);

  // hide native select visually but keep it for submission
  native.classList.add('select-hidden');

  // create trigger
  const trigger = document.createElement('button');
  trigger.type = 'button';
  trigger.className = 'custom-select__trigger';
  // show current or placeholder
  const currentText = (native.options[native.selectedIndex] && native.options[native.selectedIndex].text) || 'Select guests';
  trigger.textContent = currentText;
  wrapper.appendChild(trigger);

  // caret
  const caret = document.createElement('span');
  caret.innerHTML = '▾';
  caret.style.marginLeft = '8px';
  trigger.appendChild(caret);

  // create options container
  const opts = document.createElement('div');
  opts.className = 'custom-select__options hidden';
  opts.setAttribute('role', 'listbox');

  // populate
  Array.from(native.options).forEach(opt => {
    if (!opt.value) return; // skip placeholder empty value
    const item = document.createElement('div');
    item.className = 'custom-select__option';
    item.setAttribute('data-value', opt.value);
    item.textContent = opt.textContent;
    if (opt.selected) item.setAttribute('aria-selected', 'true');
    item.addEventListener('click', function () {
      // set native select value
      native.value = opt.value;
      // update trigger
      trigger.childNodes[0].nodeValue = opt.textContent;
      // mark aria-selected
      Array.from(opts.children).forEach(c => c.setAttribute('aria-selected', 'false'));
      item.setAttribute('aria-selected', 'true');
      closeOptions();
      // trigger change event for any listeners
      native.dispatchEvent(new Event('change', { bubbles: true }));
    });
    opts.appendChild(item);
  });
  wrapper.appendChild(opts);

  function openOptions() {
    opts.classList.remove('hidden');
    trigger.setAttribute('aria-expanded', 'true');
    // ensure it fits viewport
    opts.style.maxHeight = Math.min(window.innerHeight - wrapper.getBoundingClientRect().bottom - 16, 280) + 'px';
  }
  function closeOptions() {
    opts.classList.add('hidden');
    trigger.setAttribute('aria-expanded', 'false');
  }

  trigger.addEventListener('click', function (e) {
    e.stopPropagation();
    if (opts.classList.contains('hidden')) openOptions(); else closeOptions();
  });

  document.addEventListener('click', function (e) {
    if (!wrapper.contains(e.target)) closeOptions();
  });

  // basic keyboard nav
  wrapper.addEventListener('keydown', function (e) {
    const items = Array.from(opts.querySelectorAll('.custom-select__option'));
    const focused = items.findIndex(i => i === document.activeElement);
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (opts.classList.contains('hidden')) openOptions();
      const next = Math.min(Math.max(focused, 0) + 1, items.length - 1);
      items[next]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = Math.max(focused - 1, 0);
      items[prev]?.focus();
    } else if (e.key === 'Escape') {
      closeOptions();
      trigger.focus();
    } else if (e.key === 'Enter') {
      if (document.activeElement.classList.contains('custom-select__option')) {
        document.activeElement.click();
      }
    }
  });

  // make option focusable
  Array.from(opts.children).forEach(ch => ch.setAttribute('tabindex', '0'));

  // ensure trigger text follows any programmatic change
  native.addEventListener('change', function () {
    const sel = native.options[native.selectedIndex];
    if (sel) trigger.childNodes[0].nodeValue = sel.textContent;
    Array.from(opts.children).forEach(c => c.setAttribute('aria-selected', c.getAttribute('data-value') === native.value ? 'true' : 'false'));
  });

  // close on resize
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