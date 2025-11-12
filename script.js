// Firebase Authentication ile giriş yapmak için kullanacağımız fonksiyonlar
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// Firebase Config (Firebase Console'dan aldığınız ayarları buraya yerleştirin)
const firebaseConfig = {
    apiKey: "AIzaSyD9MbTqWGXLLYrp4x8nwu9mYx0y_t8dpJA",
    authDomain: "filmler-4a09c.firebaseapp.com",
    projectId: "filmler-4a09c",
    storageBucket: "filmler-4a09c.firebasestorage.app",
    messagingSenderId: "779802018978",
    appId: "1:779802018978:web:03563cf09a7316ae1503fb",
    measurementId: "G-47T9LZNDV4"
};

// Firebase'i başlatıyoruz
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Giriş formu ve elementlerin bağlantıları
const loginForm = document.getElementById('login-form');
const formContainer = document.getElementById('form-container');
const appsheetContainer = document.getElementById('appsheet-container');
const usernameField = document.getElementById('username');
const passwordField = document.getElementById('password');

// Kullanıcı girişini doğrulama
loginForm.onsubmit = function(event) {
    event.preventDefault();  // Sayfanın yenilenmesini engelle

    const username = usernameField.value;  // Kullanıcı adı (email olarak alınacak)
    const password = passwordField.value;  // Şifre

    const email = `${username}@example.com`;  // Firebase'de kullanıcı adı yerine email kullanmamız lazım

    // Firebase Authentication ile giriş yapalım
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Giriş başarılı olduğunda yapılacak işlemler
            const user = userCredential.user;
            console.log('Kullanıcı giriş yaptı:', user);
            // Giriş başarılı, formu gizleyip AppSheet iframe'ini gösterelim
            formContainer.style.display = 'none';
            appsheetContainer.style.display = 'block';
        })
        .catch((error) => {
            // Hata durumu
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Giriş hatası:', errorCode, errorMessage);
            alert("Kullanıcı adı veya şifre yanlış.");
        });
};
