// Verbinding met Firebase maken. Andere bestanden halen `auth` en `db` hier op.

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

/* =========================
   FIREBASE
========================= */

const firebaseConfig = {
    apiKey: "AIzaSyB1QXpsoRwmdYpHZ3DR9QsRGMHO5IzIp9M",
    authDomain: "loic-codelab.firebaseapp.com",
    projectId: "loic-codelab",
    storageBucket: "loic-codelab.firebasestorage.app",
    messagingSenderId: "917916738460",
    appId: "1:917916738460:web:7c38975c604dd4a0e91e59"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);


console.log("🔥 Firebase is verbonden!");

// =====================================
// 🔥 FIREBASE BESCHIKBAAR MAKEN
// =====================================

window.codelabAuth = auth;
window.codelabDB = db;
export { auth, db };
