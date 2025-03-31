const modal = document.getElementById('modal');
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const captureBtn = document.getElementById('capture-btn');
const cancelBtn = document.getElementById('cancel-btn');
const capturedPhoto = document.getElementById('captured-photo');
const photo = document.getElementById('photo');

document.getElementById('capture').addEventListener('click', () => {
    modal.style.display = 'block';

    // ✅ Start Camera Stream
    navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
            video.srcObject = stream;
        })
        .catch((error) => {
            console.error("Error accessing the camera:", error);
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


    const stream = video.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach(track => track.stop());
    modal.style.display = 'none';
});


cancelBtn.addEventListener('click', () => {
    const stream = video.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach(track => track.stop());

    modal.style.display = 'none';
});




document.getElementById('verification-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const dob = document.getElementById('dob').value.trim();
    const aadhaar = document.getElementById('aadhaar').value.trim();
    const photoSrc = document.getElementById('photo').src;

    let isValid = true;

    // ✅ DOB Validation
    if (!dob) {
        document.getElementById('dob-error').textContent = "Invalid Date of Birth.";
        isValid = false;
    } else {
        document.getElementById('dob-error').textContent = "";
    }

    // ✅ Aadhaar Validation
    const aadhaarPattern = /^\d{12}$/;
    if (!aadhaarPattern.test(aadhaar)) {
        document.getElementById('aadhaar-error').textContent = "Aadhaar number must be exactly 12 digits.";
        isValid = false;
    } else {
        document.getElementById('aadhaar-error').textContent = "";
    }

    // ✅ Photo Validation
    if (!photoSrc || photoSrc === window.location.href) {
        document.getElementById('photo-error').textContent = "Please capture a photo.";
        isValid = false;
    } else {
        document.getElementById('photo-error').textContent = "";
    }

    if (isValid) {
        try {
            const response = await fetch("/auth/updateSession", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    aadharNo: aadhaar, 
                    sessionId: sessionStorage.getItem("sessionId") // Fetching session ID from session storage
                })
            });
    
            const result = await response.json();
    
            if (response.ok && result.success) {
                alert("Verification Successful! ✅");
                const role = localStorage.getItem("userRole");
                window.location.href = role === "admin" ? "admin.html" : "vote.html";
            } else {
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            alert(`Error updating session ID: ${error.message}`);
        }
    }
});


document.getElementById('aadhaar').addEventListener('input', function () {
    this.value = this.value.replace(/\D/g, '');
});
history.pushState(null, null, window.location.href);
window.addEventListener('popstate', () => {
    history.pushState(null, null, window.location.href);
});
