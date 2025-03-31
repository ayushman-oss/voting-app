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

function generateUniqueID() {
    return Math.random().toString(36).substr(2, 9).toUpperCase();
}
document.getElementById('remote-vote-btn').addEventListener('click', () => {
    const uniqueID = generateUniqueID();
    localStorage.setItem('uniqueID', uniqueID);
    alert(`Your Unique ID: ${uniqueID}`);
    window.location.href = "vote.html"; // ✅ Redirect after alert
});

function showVerificationModal() {
    const uniqueID = generateUniqueID();
    localStorage.setItem('voteID', uniqueID);

    // Create the main modal
    const modal = document.createElement('div');
    modal.id = 'verification-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h2>Choose an Option</h2>
            <button id="remote-vote">Go for Remote Voting</button>
            <button id="location-vote">I am at the Location</button>
        </div>
    `;
    document.body.appendChild(modal);

    document.getElementById('remote-vote').addEventListener('click', () => {
        alert(`Your Unique Voting ID: ${uniqueID}`);
        closeModal();
    });
    document.getElementById('location-vote').addEventListener('click', () => {
        showLocationVerificationModal(uniqueID);
        closeModal();
    });
}

function showLocationVerificationModal(uniqueID) {
    const locationModal = document.createElement('div');
    locationModal.id = 'location-verification-modal';
    locationModal.innerHTML = `
        <div class="modal-content">
            <h2>Your Unique ID</h2>
            <p>${uniqueID}</p>
            <button id="close-modal">Close</button>
        </div>
    `;
    document.body.appendChild(locationModal);

    document.getElementById('close-modal').addEventListener('click', () => {
        document.body.removeChild(locationModal);
    });
}
function closeModal() {
    const modal = document.getElementById('verification-modal');
    if (modal) document.body.removeChild(modal);
}

document.getElementById('verification-form').addEventListener('submit', (e) => {
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
        alert("Verification Successful! ✅");
        const role = localStorage.getItem("userRole");
        //window.location.href = role === "admin" ? "admin.html" : "vote.html";
        showVerificationModal();
    }
});

// ✅ Allow only numeric input for Aadhaar
document.getElementById('aadhaar').addEventListener('input', function () {
    this.value = this.value.replace(/\D/g, '');
});
history.pushState(null, null, window.location.href);
window.addEventListener('popstate', () => {
    history.pushState(null, null, window.location.href);
});
