// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-storage.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPmfHZpxrqIydTHCscX132JsHa0hG8kEI",
  authDomain: "employee-doc-upload.firebaseapp.com",
  projectId: "employee-doc-upload",
  storageBucket: "employee-doc-upload.firebasestorage.app",
  messagingSenderId: "1097461389775",
  appId: "1:1097461389775:web:466b8b9174a021bf1d5aba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Storage
const db = getFirestore(app);
const storage = getStorage(app);

// Export for use in form.js or dashboard.js
export { db, storage };
