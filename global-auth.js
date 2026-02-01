import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// 1. YOUR FIREBASE CONFIGURATION
// Replace the placeholders below with your actual keys from your Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyCVZmtWiBu6YRVnnq7vAKrZErX8iekE1BA",
  authDomain: "spicedelight-c96bd.firebaseapp.com",
  projectId: "spicedelight-c96bd",
  storageBucket: "spicedelight-c96bd.firebasestorage.app",
  messagingSenderId: "898228423976",
  appId: "1:898228423976:web:244815d2ec76cc19ebd41d"
};

// 2. INITIALIZE FIREBASE
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
    // Target the Laptop ID and Mobile Class from your HTML
    const desktopLogin = document.getElementById('loginBtn'); 
    const mobileIcon = document.querySelector('.fa-user-circle');
    const containers = [document.getElementById('authBtnContainer'), document.getElementById('auth-status-container')];
    
    // Target Dashboard IDs
    const dashPic = document.getElementById('dashUserPic');
    const dashName = document.getElementById('dashUserName');
    const welcomeMsg = document.getElementById('welcomeName');

    if (user) {

        // 1. Define the fallbacks so no account looks "empty"
        const userPhoto = user.photoURL || '../images/default-avatar.png'; 
        const userName = user.displayName || user.email.split('@')[0]; // Uses part of email if name is missing

        // 2. Update your Dashboard IDs (Fixes the "..." email bug)
        const dashPic = document.getElementById('dashUserPic');
        const dashName = document.getElementById('dashUserName');
        const dashEmail = document.getElementById('dashUserEmail'); // Targets the email p tag
        const welcomeMsg = document.getElementById('welcomeName');

        if (dashPic) dashPic.src = userPhoto;
        if (dashName) dashName.textContent = userName;
        if (dashEmail) dashEmail.textContent = user.email; // This replaces the "..." with the real email

        if (welcomeMsg) {
            welcomeMsg.innerHTML = `Welcome back, <span style="color:#e67e22;">Chef ${userName.split(' ')[0]}</span>!`;
        }

        // --- LANDING PAGE LOGIC ---
        const isSubfolder = window.location.pathname.includes('/shop/') || window.location.pathname.includes('/dashboard/');
        const dashPath = isSubfolder ? '../dashboard/dashboard.html' : 'dashboard/dashboard.html';

        const userHTML = `
            <div class="nav-user-info" style="display: flex; align-items: center; gap: 10px; cursor: pointer;" onclick="window.location.href='${dashPath}'">
                <img src="${user.photoURL}" style="width: 35px; height: 35px; border-radius: 50%; border: 2px solid #e67e22; object-fit: cover;">
                <span class="nav-name" style="font-size: 14px; font-weight: 600; color: inherit;">${user.displayName.split(' ')[0]}</span>
            </div>
        `;

        if (desktopLogin) { desktopLogin.parentElement.innerHTML = userHTML; }
        if (mobileIcon) { mobileIcon.parentElement.innerHTML = userHTML; }

        // --- DASHBOARD EXTRACTION LOGIC ---
        // This part ensures your Dashboard photo/name also show up using this same script
        if (dashPic) dashPic.src = user.photoURL;
        if (dashName) dashName.textContent = user.displayName;
        if (welcomeMsg) {
            const firstName = user.displayName ? user.displayName.split(' ')[0] : "Chef";
            welcomeMsg.innerHTML = `Welcome back, <span style="color:#e67e22;">Chef ${firstName}</span>!`;
        }
    } else {
        // If not logged in and trying to view dashboard, redirect home
        if (window.location.pathname.includes('dashboard.html')) {
            window.location.href = '../index.html';
        }
    }

    // Show the containers once logic is complete to prevent flickering
    containers.forEach(c => { if(c) c.style.visibility = 'visible'; });
});

// LOGOUT LOGIC
document.addEventListener('click', (e) => {
    if (e.target && e.target.id === 'dashLogout') {
        signOut(auth).then(() => {
            // 1. First, tell the browser to forget where it was
            window.history.pushState(null, null, window.location.href);
            // 2. Then, send them to the home page
            window.location.href = '../index.html';
        }).catch((error) => {
            console.error("Logout error:", error);
        });
    }
});