 // Load Candidates
 async function loadCandidates() {
    const response = await fetch('/admin/candidates');
    const candidates = await response.json();

    const display = document.getElementById('candidate-display');
    display.innerHTML = ''; // Clear previous data

    candidates.forEach(candidate => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div>
                <img src="${candidate.symbol}" alt="${candidate.name}" width="50" height="50">
                <span>${candidate.name} (${candidate.votes} votes)</span>
                <button type="button" onclick="deleteCandidate('${candidate._id}')">Delete</button>
            </div>
        `;
        display.appendChild(li);
    });
}

// Handle Image Upload
document.getElementById('candidate-symbol').addEventListener('change', function () {
    const file = this.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const img = document.getElementById('image-preview');
        img.src = e.target.result;
        img.style.display = 'block';
    };

    if (file) {
        reader.readAsDataURL(file);
    }
});

// Add Candidate
document.getElementById('add-candidate-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('candidate-name').value;
    const symbol = document.getElementById('image-preview').src;

    const response = await fetch('/admin/candidate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, symbol }),
    });

    if (response.ok) {
        alert('Candidate added successfully!');
        loadCandidates(); // Refresh list
    } else {
        alert('Failed to add candidate.');
    }
});

// Delete Candidate
async function deleteCandidate(id) {
    const response = await fetch(`/admin/candidate/${id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        alert('Candidate deleted successfully!');
        loadCandidates(); // Refresh list
    } else {
        alert('Failed to delete candidate.');
    }
}

// Load Candidates on Page Load
document.addEventListener('DOMContentLoaded', loadCandidates);  