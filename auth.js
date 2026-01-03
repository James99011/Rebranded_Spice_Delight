// Import sendPasswordResetEmail at the very top of your file from firebase-auth
import { sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

document.getElementById('forgotPassword').onclick = async () => {
  const email = document.getElementById("userEmail").value.trim();
  
  if (!email) {
    showErrorMessage("auth/invalid-email");
    authError.textContent = "Please enter your email address first.";
    return;
  }

  try {
    await sendPasswordResetEmail(auth, email);
    
    // SUCCESS MESSAGE (Green)
    authError.style.display = 'block';
    authError.style.backgroundColor = '#e8f5e9'; 
    authError.style.color = '#2e7d32';
    authError.textContent = "Reset link sent! Check your inbox (and Spam).";

    // Optional: Hide after 5 seconds so it doesn't stay there
    setTimeout(() => { authError.style.display = 'none'; }, 5000);

  } catch (error) {
    // ERROR HANDLING
    if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-email') {
      showErrorMessage('auth/user-not-found');
      authError.textContent = "This email is not registered. Please create an account.";
    } else {
      // Handles other errors like network issues
      showErrorMessage(error.code);
    }
  }
};
 

 




 
 
 // --- FIREBASE CONFIGURATION ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCVZmtWiBu6YRVnnq7vAKrZErX8iekE1BA",
  authDomain: "spicedelight-c96bd.firebaseapp.com",
  projectId: "spicedelight-c96bd",
  storageBucket: "spicedelight-c96bd.firebasestorage.app",
  messagingSenderId: "898228423976",
  appId: "1:898228423976:web:244815d2ec76cc19ebd41d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// --- UI ELEMENTS ---
const authModal = document.getElementById('authModal');
const authForm = document.getElementById('authForm');
const authTitle = document.getElementById('authTitle');
const authSubtitle = document.getElementById('authSubtitle');
const mainAuthBtn = document.getElementById('mainAuthBtn');
const authLoader = document.getElementById('authLoader');
const authError = document.getElementById('authError');
const toggleAuthText = document.getElementById('toggleAuthText');

let isLoginMode = false; // Default to Create Account for all screens

// --- HELPERS: LOADER & ERROR ---
function toggleLoader(show) {
  authLoader.style.display = show ? 'flex' : 'none';
  mainAuthBtn.disabled = show;
  mainAuthBtn.style.opacity = show ? '0.5' : '1';
}

function showErrorMessage(code) {
  let message = "An unexpected error occurred. Please try again.";
  
  // Specific red messages for users
  switch (code) {
    case 'auth/invalid-credential': // Newer Firebase code for wrong email/password
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      message = "Incorrect email or password. Please try again.";
      break;
    case 'auth/email-already-in-use':
      message = "This email is already registered. Try logging in.";
      break;
    case 'auth/invalid-email':
      message = "Please enter a valid email address.";
      break;
    case 'auth/network-request-failed':
      message = "Connection failed. Please check your internet.";
      break;
  }

  authError.textContent = message;
  authError.style.display = 'block';
  authError.style.backgroundColor = '#ffebee'; // Light red background
  authError.style.color = '#c62828'; // Dark red text
}

// --- UI MODE SWITCHER ---
function updateModeUI() {
  authError.style.display = 'none'; // Clear errors when switching
  if (isLoginMode) {
    authTitle.textContent = "Welcome Back";
    authSubtitle.textContent = "Please enter your details to continue";
    mainAuthBtn.textContent = "Continue";
    toggleAuthText.innerHTML = `Don't have an account? <span id="switchAuth" class="link-style">Sign Up</span>`;
  } else {
    authTitle.textContent = "Create Account";
    authSubtitle.textContent = "Join SpiceDelight for a personalized experience";
    mainAuthBtn.textContent = "Create Account";
    toggleAuthText.innerHTML = `Already have an account? <span id="switchAuth" class="link-style">Login</span>`;
  }

  // Bind the dynamic link
  document.getElementById('switchAuth').onclick = () => {
    isLoginMode = !isLoginMode;
    updateModeUI();
  };
}


// --- AUTH SUBMISSION ---
authForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById("userEmail").value.trim();
  const password = document.getElementById("userPassword").value;
  const strengthMsg = document.getElementById("passwordStrengthMsg");

  // 1. CLEAR previous errors so the box shrinks back to normal size
  authError.style.display = 'none';
  strengthMsg.textContent = "";
  strengthMsg.style.display = "none";

 
  // --- Inside authForm.addEventListener ---

if (!isLoginMode) {
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[@$!%*?&]/.test(password);
  const isLongEnough = password.length >= 8;

  if (!(hasUpper && hasLower && hasNumber && hasSymbol && isLongEnough)) {
    strengthMsg.textContent = "Weak! Use 8+ chars (Uppercase, Number & Symbol)";
    strengthMsg.className = "strength-text strength-weak";
    strengthMsg.style.display = "block";
    return; // STOP here
  }
}

// If it passes all checks, hide the message and move to Firebase
strengthMsg.style.display = "none";
toggleLoader(true);





  try {
     // ... your existing Firebase code (createUserWithEmailAndPassword) ...
  } catch (error) {
     toggleLoader(false);
     showErrorMessage(error.code); // This will catch "Email already in use"
  }



  try {
    if (!isLoginMode) {
      // --- SIGN UP FLOW ---
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user);
      
    // Transition to Verification UI
    document.getElementById('authContent').innerHTML = `
      <div class="verification-view" style="text-align: center; padding: 20px;">
        <h2 style="color: #2c3e50;">Verify Your Email</h2>
        <p>We sent a link to <b>${email}</b>.</p>
        <p>Please check your inbox to activate your account.</p>
        <button id="verifiedBtn" class="verified-success-btn">I've Verified My Email</button>
      </div>
    `;

        document.getElementById('verifiedBtn').onclick = () => {
        // This reloads the page with a "login" instruction in the URL
        window.location.href = window.location.pathname + "?mode=login";
      };
    } else {
      // --- LOGIN FLOW ---
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      if (!userCredential.user.emailVerified) {
        toggleLoader(false);
        showErrorMessage('custom/not-verified');
        authError.textContent = "Please verify your email first. Check your inbox!";
        await auth.signOut();
        return;
      }
      showSuccessAnimation();
    }
  } catch (error) {
    toggleLoader(false);
    showErrorMessage(error.code);
  }
});

// --- SUCCESS UI ---
function showSuccessAnimation() {
  const content = document.getElementById('authContent');
  content.innerHTML = `
    <div class="success-checkmark active">
      <div class="check-icon">
        <span class="icon-line line-tip"></span>
        <span class="icon-line line-long"></span>
      </div>
    </div>
    <h2>Welcome Back!</h2>
    <p>Success! Redirecting to your dashboard...</p>
  `;
  setTimeout(() => { window.location.href = "dashboard.html"; }, 2500);
}

// Initialize UI
updateModeUI();

// Toggle Password Visibility
const passwordInput = document.getElementById("userPassword");
const togglePassword = document.getElementById("togglePassword");
if (togglePassword) {
  togglePassword.onclick = () => {
    passwordInput.type = passwordInput.type === "password" ? "text" : "password";
  };
}





// --- MODAL TOGGLE LOGIC ---

// 1. Get the trigger buttons from your HTML
const loginBtn = document.getElementById('loginBtn'); // Laptop Button
const mobileAuthTrigger = document.getElementById('authTriggerMobile'); // Mobile Circle
const closeAuthBtn = document.getElementById('closeAuth'); // The 'X' button

// 2. Function to open modal
const openModal = () => {
  authModal.style.display = 'flex';
  // Optional: Reset to Create Account mode whenever it opens
  isLoginMode = false; 
  updateModeUI();
};

// 3. Function to close modal
const closeModal = () => {
  authModal.style.display = 'none';
};

// 4. Attach Event Listeners
if (loginBtn) loginBtn.addEventListener('click', openModal);
if (mobileAuthTrigger) mobileAuthTrigger.addEventListener('click', openModal);
if (closeAuthBtn) closeAuthBtn.addEventListener('click', closeModal);

// 5. Close if user clicks the dark background overlay
window.addEventListener('click', (e) => {
  if (e.target === authModal) {
    closeModal();
  }
});




// --- THE MAGIC LINK FIX (CLEAN VERSION) ---
if (window.location.search.includes('mode=login')) {
    // 1. Set mode to login
    isLoginMode = true;
    
    // 2. Show the modal
    if (authModal) {
        authModal.style.display = 'flex';
    }
    
    // 3. Update the text to "Welcome Back"
    updateModeUI();
    
    // 4. THE CRITICAL PART: This removes "?mode=login" from the URL bar 
    // without refreshing the page. 
    // Now, if you refresh, the URL is clean and the modal stays closed!
    window.history.replaceState({}, document.title, window.location.pathname);
}




const googleProvider = new GoogleAuthProvider();

document.getElementById('googleAuth').onclick = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // We can show your success checkmark animation immediately
    showSuccessAnimation();
    
    console.log("Google User Logged In:", user.displayName);
  } catch (error) {
    if (error.code !== 'auth/popup-closed-by-user') {
      showErrorMessage(error.code);
    }
  }
};