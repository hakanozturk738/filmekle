// Firebase Authentication ile giriş yapmak için kullanacağımız fonksiyonlar

const loginForm = document.getElementById('login-form');
const formContainer = document.getElementById('form-container');
const appsheetContainer = document.getElementById('appsheet-container');
const usernameField = document.getElementById('username');
const passwordField = document.getElementById('password');

// Kullanıcı girişini doğrulama
loginForm.onsubmit = function(event) {
    event.preventDefault();  // Sayfanın yenilenmesini engelle

    const username = usernameField.value;  // Kullanıcı adı (email'e çevrilecek)
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
