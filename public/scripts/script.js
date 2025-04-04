setTimeout("preventBack()", 0);

window.onunload = function () { null };
document.getElementById("login-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include"
    });

    const data = await response.json();

    if (data.success) {
        alert("Login Successful! 🚀");
        sessionStorage.setItem("userId", data.userId);
        localStorage.setItem("userId", data.userId);
        sessionStorage.setItem("userRole", data.role);  
        window.location.href = "scan.html";  
    } else {
        alert("Invalid username or password!");
    }
});

document.getElementById('select-language').addEventListener('click', function() {
    var languageSelector = document.getElementById('language-selector');
    var selectedLanguage = languageSelector.value;
    
    if (selectedLanguage) {
        var welcomeScreen = document.getElementById('welcome-screen')
        welcomeScreen.classList.add('hidden');
        var loginContainer = document.getElementById('login-container');
        loginContainer.classList.remove('hidden');

        var greeting = "";
        switch (selectedLanguage) {
            case "English": 
                greeting = "Hello";
                break;
            case "Hindi":   
                greeting = "नमस्ते";
                break;
            case "Bengali":  
                greeting = "নমস্কার";
                break;
            case "Telugu":  
                greeting = "నమస్కారం";
                break;
            case "Tamil":   
                greeting = "வணக்கம்";
                break;
            case "Marathi":  
                greeting = "नमस्कार";
                break;
            case "Urdu":   
                greeting = "آداب";
                break;
            case "Gujarati":
                greeting = "નમસ્તે";
                break; 
            case "Kannada":
                greeting = "ನಮಸ್ಕಾರ";
                break;
            case "Odia":
                greeting = "ନମସ୍କାର";
                break;
            case "Punjabi":
                greeting = "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ";
                break;
        } 

        document.querySelector('.login-container h2').textContent = greeting;
    }
});

history.pushState(null, null, window.location.href);
window.addEventListener('popstate', () => {
    history.pushState(null, null, window.location.href);
});

function myFunction() {
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }
