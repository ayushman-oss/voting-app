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

document.getElementById('language-selector').addEventListener('change', function() {
    if (this.value) {
        document.getElementById('welcome-screen').classList.add('hidden');
        document.getElementById('login-container').classList.remove('hidden');
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
