const message = document.getElementById("message");
const submitBtn = document.getElementById("submitBtn");

submitBtn.addEventListener("click", async (e) => {
    e.preventDefault();
        const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const rePassword = document.getElementById("re-password").value;
    const aadharNo = document.getElementById("aadharNo").value;
    const dob = document.getElementById("dob").value;
    const role = "voter"; 

    if (password !== rePassword) {
        message.textContent = `Passwords do not match! You entered: ${password}`;
        message.style.color = "red";
        document.getElementById("re-password").value = "";
        return;
    }

    
    if (!/^\d{12}$/.test(aadharNo)) {
        message.textContent = "Aadhar number must be exactly 12 digits!";
        message.style.color = "red";
        return;
    }

    
    const dobDate = new Date(dob);
    const currentDate = new Date();
    const minYear = 2008;

    if (dobDate > currentDate) {
        message.textContent = "Date of Birth cannot be in the future!";
        message.style.color = "red";
        return;
    }

    if (dobDate.getFullYear() > minYear) {
        message.textContent = "Date of Birth must be before 2008!";
        message.style.color = "red";
        return;
    }

    try {
        const response = await fetch("/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password, role, aadharNo, dob }),
        });

        const data = await response.json();
        if (data.success) {
            alert("Registration successful!");
            window.location.href = "index.html"; 
        } else {
            alert("Registration Failed!");
            window.location.href = "register.html"; 
            message.textContent = data.message || "Registration failed!";
            message.style.color = "red";
        }
    } catch (error) {
        message.textContent = "Server error!";
        message.style.color = "red";
    }
});
