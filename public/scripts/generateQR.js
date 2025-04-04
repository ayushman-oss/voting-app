const qrCodeCanvas = document.getElementById("qr-code");
const timerElement = document.getElementById("time-left");
const generateQRBtn = document.getElementById("generate-qr");
let qr;
let countdownInterval;
let timeLeft = 15;

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}


function initializeQRCode() {
    qr = new QRious({
        element: qrCodeCanvas,
        size: 250,
        value: generateUUID() 
    });
}

// Generate and update QR code
function generateQRCode() {
    const newQRData = generateUUID();
    qr.value = newQRData;
    console.log("New QR Code Generated: " + newQRData);
    resetCountdown();
}

// Reset the countdown timer
function resetCountdown() {
    clearInterval(countdownInterval);
    timeLeft = 15;
    updateTimerDisplay();
    countdownInterval = setInterval(updateCountdown, 1000);
}

// Update the countdown timer display
function updateTimerDisplay() {
    timerElement.textContent = timeLeft + " seconds";
}

// Update the countdown and reload QR code when expired
function updateCountdown() {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft <= 0) {
        generateQRCode();
    }
}

// Event listener for manual generation
generateQRBtn.addEventListener("click", generateQRCode);

// Initial QR code generation and countdown start
initializeQRCode();
generateQRCode();
