// Sabit kullanıcı adı ve şifre belirliyoruz
var validUsername = "hakan";  // Gerçek kullanıcı adınızı buraya yazın
var validPassword = "1235";  // Gerçek şifrenizi buraya yazın

// Formu doğrulama fonksiyonu
function validateForm() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Doğru kullanıcı adı ve şifreyi kontrol et
    if (username === validUsername && password === validPassword) {
        // Yönlendirmek istediğiniz AppSheet URL'ini buraya ekleyin
        window.location.href = "https://www.appsheet.com/start/4ae2c219-2ac4-461f-908d-9f29b3f3092e"; // AppSheet projenizin URL'sini buraya koyun
        return false; // Formun sayfayı yeniden yüklemesini engelle
    } else {
        alert("Kullanıcı adı veya şifre yanlış.");
        return false; // Formun gönderilmesini engelle
    }
}
