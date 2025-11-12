// Sabit kullanıcı adı ve şifre belirliyoruz
var validUsername = "hakan";  // Gerçek kullanıcı adınızı buraya yazın
var validPassword = "1235";  // Gerçek şifrenizi buraya yazın

// Formu doğrulama fonksiyonu
function validateForm() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Doğru kullanıcı adı ve şifreyi kontrol et
    if (username === validUsername && password === validPassword) {
        // Giriş başarılıysa formu gizle ve AppSheet iframe'ini göster
        document.getElementById('form-container').style.display = "none";
        document.getElementById('appsheet-container').style.display = "block";  // iframe'i göster

        return false; // Formun sayfayı yeniden yüklemesini engelle
    } else {
        alert("Kullanıcı adı veya şifre yanlış.");
        return false; // Formun gönderilmesini engelle
    }
}
