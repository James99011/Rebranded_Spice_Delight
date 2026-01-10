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

// LOGOUT LOGIC (Optional, but makes the dashboard button work)
document.addEventListener('click', (e) => {
    if (e.target && e.target.id === 'dashLogout') {
        signOut(auth).then(() => {
            window.location.href = '../index.html';
        });
    }
});




