// script.js — Firebase (compat) ile uyumlu. index.html içinde firebase init yapıldı ve window.firebaseAuth hazır.

// Debug başlangıcı
console.log('script.js loaded');

// Elementleri al
const loginForm = document.getElementById('login-form');
const formContainer = document.getElementById('form-container');
const appsheetContainer = document.getElementById('appsheet-container');
const usernameField = document.getElementById('username');
const passwordField = document.getElementById('password');

// Kısa helper: email formatına çevirme (kullanıcı adını e-posta gibi kullanıyoruz)
function usernameToEmail(username) {
  // Dilerseniz farklı domain koyabilirsiniz. Bu sadece Firebase'in email requirement'ını karşılamak için.
  return `${username}@example.com`;
}

// Login işlemi
loginForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const username = usernameField.value.trim();
  const password = passwordField.value;

  console.log('Trying login for', username);

  if (!username || !password) {
    alert('Kullanıcı adı ve şifre girin.');
    return;
  }

  const email = usernameToEmail(username);

  // firebaseAuth nesnesi index.html'de window.firebaseAuth olarak ayarlandı
  const auth = window.firebaseAuth;
  if (!auth) {
    console.error('Firebase auth bulunamadı. index.html içindeki init doğru mu?');
    alert('Uygulama henüz hazır değil. Konsolu kontrol edin.');
    return;
  }

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      console.log('Giriş başarılı:', userCredential.user);
      // Oturum başarılı — UI değişikliği
      formContainer.style.display = 'none';
      appsheetContainer.style.display = 'block';
    })
    .catch((err) => {
      console.error('Giriş hatası:', err);
      // Firebase hata kodunu kullanıcıya daha anlaşılır göster
      if (err.code === 'auth/user-not-found') {
        alert('Kullanıcı bulunamadı. Lütfen kayıtlı olduğunuzdan emin olun.');
      } else if (err.code === 'auth/wrong-password') {
        alert('Şifre yanlış.');
      } else {
        alert('Giriş yapılamıyor: ' + (err.message || err.code));
      }
    });
});

// (İsteğe bağlı) auth state observer — sayfa yenilendiğinde oturum açık mı kontrol eder
window.firebaseAuth && window.firebaseAuth.onAuthStateChanged(function(user) {
  console.log('onAuthStateChanged', user);
  if (user) {
    formContainer.style.display = 'none';
    appsheetContainer.style.display = 'block';
  } else {
    formContainer.style.display = 'block';
    appsheetContainer.style.display = 'none';
  }
});
