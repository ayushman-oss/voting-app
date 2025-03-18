// Generate a simple CAPTCHA
function generateCaptcha() {
    const captcha = Math.random().toString(36).substring(2, 8); // Generate random 6-character string
    document.getElementById('captcha-display').textContent = captcha; // Display the captcha
    return captcha;
}

// Store the generated captcha
let currentCaptcha = generateCaptcha();

// Check captcha input
document.getElementById('captcha-input').addEventListener('input', function() {
    const input = this.value;
    const submitBtn = document.getElementById('submit-btn');
    const captchaError = document.getElementById('captcha-error');

    if (input === currentCaptcha) {
        submitBtn.disabled = false; // Enable submit button if captcha matches
        captchaError.textContent = ''; // Clear any previous error message
    } else {
        submitBtn.disabled = true; // Keep submit button disabled
        captchaError.textContent = 'Captcha does not match! Please try again.'; // Show error
    }
});

// Re-generate CAPTCHA when the page loads
window.onload = function() {
    generateCaptcha();
};
