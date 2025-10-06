import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { firebaseConfig } from "../firebase-config.js"; // import your config

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// DOM Elements
const loginForm = document.getElementById("loginForm");
const errorMsg = document.getElementById("errorMsg");

// Redirect to dashboard if already logged in
onAuthStateChanged(auth, (user) => {
  if (user) {
    window.location.href = "dashboard.html";
  }
});

// Handle login form submit
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "dashboard.html"; // Redirect to dashboard on success
  } catch (error) {
    console.error("Login error:", error);
    errorMsg.textContent = "❌ Invalid email or password!";
  }
});
