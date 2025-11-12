// Sabit kullanıcı adı ve şifre belirliyoruz
var validUsername = "hakan";  // Gerçek kullanıcı adınızı buraya yazın
var validPassword = "1235";  // Gerçek şifrenizi buraya yazın

// Oturum süresi için zaman aşımı süresi (10 dakika = 600000 ms)
var timeoutDuration = 10 * 60 * 1000;  // 10 dakika

// Sayfa yenilendiğinde giriş kontrolü yapacağız
window.onload = function() {
    // Eğer kullanıcı daha önce giriş yapmışsa ve zaman aşımına uğramamışsa, giriş formu gösterilmesin
    var lastInteraction = localStorage.getItem('lastInteractionTime');
    var userLoggedIn = localStorage.getItem('userLoggedIn');  // Giriş durumu kontrolü

    if (userLoggedIn === 'true' && lastInteraction && (Date.now() - lastInteraction < timeoutDuration)) {
        // Eğer giriş yapılmışsa ve zaman aşımı süresi geçmemişse, formu gizle, iframe'i göster
        document.getElementById('form-container').style.display = "none";
        document.getElementById('appsheet-container').style.display = "block";
    } else {
        // Eğer zaman aşımı varsa veya giriş yapılmamışsa, giriş formu gösterilsin
        document.getElementById('form-container').style.display = "block";
        document.getElementById('appsheet-container').style.display = "none";
    }

    // Sayfada herhangi bir işlem yapıldığında (tıklama, yazı yazma vb.), zaman aşımını sıfırlıyoruz
    document.addEventListener('click', updateInteractionTime);
    document.addEventListener('keypress', updateInteractionTime);

    // Zaman aşımını kontrol etmek için her 30 saniyede bir fonksiyonu çağırıyoruz
    setInterval(sessionTimeout, 30000);  // 30 saniyede bir kontrol et
};

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
        localStorage.setItem('lastInteractionTime', Date.now());
        localStorage.setItem('userLoggedIn', 'true');  // Giriş yapıldığı bilgisini sakla

        return false; // Formun sayfayı yeniden yüklemesini engelle
    } else {
        alert("Kullanıcı adı veya şifre yanlış.");
        return false; // Formun gönderilmesini engelle
    }
}

// Kullanıcının etkileşimde bulunup bulunmadığını kontrol et
function updateInteractionTime() {
    localStorage.setItem('lastInteractionTime', Date.now());  // Zamanı güncelle
}

// Zaman aşımı fonksiyonu: Eğer 10 dakika boyunca etkileşim yoksa giriş ekranını göster
function sessionTimeout() {
    var lastInteraction = localStorage.getItem('lastInteractionTime');
    var userLoggedIn = localStorage.getItem('userLoggedIn');  // Giriş durumu kontrolü

    if (userLoggedIn === 'true' && lastInteraction && (Date.now() - lastInteraction > timeoutDuration)) {
        // Kullanıcı uzun süre etkileşimde bulunmadığı için giriş formunu göster
        document.getElementById('form-container').style.display = "block";
        document.getElementById('appsheet-container').style.display = "none";
        localStorage.removeItem('lastInteractionTime');  // Eski zaman bilgilerini temizle
        localStorage.removeItem('userLoggedIn');  // Giriş bilgilerini temizle
    }
}
