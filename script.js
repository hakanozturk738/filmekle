// Sabit kullanıcı adı ve şifre belirliyoruz
var validUsername = "hakan";  // Gerçek kullanıcı adınızı buraya yazın
var validPassword = "1235";  // Gerçek şifrenizi buraya yazın

// Oturum süresi için zaman aşımı süresi (10 dakika = 600000 ms)
var timeoutDuration = 10 * 60 * 1000;  // 10 dakika

// Zaman aşımı fonksiyonu: Eğer 10 dakika boyunca etkileşim yoksa giriş ekranını göster
function sessionTimeout() {
    // Eğer sessionStorage'da son etkileşim zamanı yoksa (ilk başta)
    if (!sessionStorage.getItem('lastInteractionTime')) {
        sessionStorage.setItem('lastInteractionTime', Date.now());
    }

    // Eğer süre bitmişse (10 dakika geçmediyse)
    var lastInteraction = sessionStorage.getItem('lastInteractionTime');
    if (lastInteraction && (Date.now() - lastInteraction > timeoutDuration)) {
        // Kullanıcı uzun süre etkileşimde bulunmadığı için giriş formunu göster
        document.getElementById('form-container').style.display = "block";
        document.getElementById('appsheet-container').style.display = "none";
        sessionStorage.removeItem('lastInteractionTime');  // Eski zaman bilgilerini temizle
    }
}

// Formu doğrulama fonksiyonu
function validateForm() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Doğru kullanıcı adı ve şifreyi kontrol et
    if (username === validUsername && password === validPassword) {
        // Giriş başarılıysa formu gizle ve AppSheet iframe'ini göster
        document.getElementById('form-container').style.display = "none";
        document.getElementById('appsheet-container').style.display = "block";  // iframe'i göster

        // Kullanıcı başarılı giriş yaptı, son etkileşim zamanını kaydediyoruz
        sessionStorage.setItem('lastInteractionTime', Date.now());

        return false; // Formun sayfayı yeniden yüklemesini engelle
    } else {
        alert("Kullanıcı adı veya şifre yanlış.");
        return false; // Formun gönderilmesini engelle
    }
}

// Kullanıcının etkileşimde bulunup bulunmadığını kontrol et
function updateInteractionTime() {
    sessionStorage.setItem('lastInteractionTime', Date.now());  // Zamanı güncelle
}

// Sayfada herhangi bir işlem yapıldığında (tıklama, yazı yazma vb.), zaman aşımını sıfırlıyoruz
document.addEventListener('click', updateInteractionTime);
document.addEventListener('keypress', updateInteractionTime);

// Zaman aşımını kontrol etmek için her 30 saniyede bir fonksiyonu çağırıyoruz
setInterval(sessionTimeout, 30000);  // 30 saniyede bir kontrol et

// İlk başta oturum durumunu kontrol et
sessionTimeout();
