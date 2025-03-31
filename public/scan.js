const modal = document.getElementById('modal');
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const captureBtn = document.getElementById('capture-btn');
const cancelBtn = document.getElementById('cancel-btn');
const photo = document.getElementById('photo');
const proceedBtn = document.getElementById('proceed-btn');

window.addEventListener('load', () => {
    sessionStorage.removeItem('capturedImage'); 
});

document.getElementById('capture').addEventListener('click', () => {
    modal.style.display = 'block';

    navigator.mediaDevices.getUserMedia({
        video: { facingMode: { exact: "environment" } } 
    })
    .then((stream) => {
        video.srcObject = stream;
    })
    .catch((error) => {
        console.error("Error accessing the camera:", error);
        alert("Camera access failed. Please check permissions.");
    });
});



captureBtn.addEventListener('click', () => {
    const size = 500;
    canvas.width = size;
    canvas.height = size;
    const xOffset = (video.videoWidth - size) / 2;
    const yOffset = (video.videoHeight - size) / 2;
    canvas.getContext('2d').drawImage(video, xOffset, yOffset, size, size, 0, 0, size, size);

    const imageDataUrl = canvas.toDataURL('image/jpeg');
    photo.src = imageDataUrl;
    localStorage.setItem('capturedImage', imageDataUrl);
    
    stopCamera();
    modal.style.display = 'none';
});

// Cancel capture
cancelBtn.addEventListener('click', () => {
    stopCamera();
    modal.style.display = 'none';
});

// Stop camera stream
function stopCamera() {
    const stream = video.srcObject;
    if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
    }
}



function proceedToVerification() {
    if (photo.src.includes("Ashoka_Chakra.svg")) {
        alert("Please capture a photo before proceeding.");
    } else {
        sessionStorage.removeItem('capturedImage');
        window.location.href = "verify.html";
    }
}
function scanQRCode() {
    const image = document.getElementById("photo");
    if (!image || !image.complete) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const qrCode = jsQR(imageData.data, canvas.width, canvas.height);

    if (qrCode) {
        alert("QR Code Detected: " + qrCode.data);
    } else {
        alert("No QR code found.");
    }
}
document.getElementById("proceed").addEventListener("click", scanQRCode);

