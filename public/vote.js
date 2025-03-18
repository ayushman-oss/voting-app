async function loadCandidates() {
    try {
        const response = await fetch('https://3000-idx-voting-app-1740145835392.cluster-fu5knmr55rd44vy7k7pxk74ams.cloudworkstations.dev/voter/candidates');
        const candidates = await response.json();

        const container = document.getElementById("candidates");
        container.innerHTML = ''; 

        candidates.forEach(candidate => {
            const label = document.createElement("label");
            label.innerHTML = `
                <input type="radio" name="vote" value="${candidate._id}">
                <img src="${candidate.symbol}" alt="Candidate Symbol" style="width: 5vw; height: 5vw; object-fit:cover; border-radius: 15%;" >
                <span style="font-size:large; background-color: #ffffff; padding: 12px; border-radius: 8px;margin-left:2vw; font-weight: 500; color: #333;">  ${candidate.name}</span>
            `;
            container.appendChild(label);
        });
    } catch (error) {
        console.error("Failed to load candidates:", error);
        alert("Failed to load candidates. Please try again.");
    }
}

async function submitVote() {
    const selected = document.querySelector('input[name="vote"]:checked');
    if (selected) {
        const candidateId = selected.value;

        try {
            const userId = localStorage.getItem("userId");
            const response = await fetch(`/voter/vote/${candidateId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ userId })
            });

            if (response.ok) {
                alert(`Vote submitted successfully!`);
                window.location.href = 'final.html';
            } else {
                alert('Failed to submit vote.');
                //window.location.href = 'index.html';
            }
        } catch (error) {
            console.error("Error submitting vote:", error);
            alert("Error submitting vote. Please try again.");
            //window.location.href = 'index.html';
        }
    } else {
        alert("Please select a candidate before submitting.");
    }
}

document.addEventListener("DOMContentLoaded", loadCandidates);
history.pushState(null, null, window.location.href);
window.addEventListener('popstate', () => {
    history.pushState(null, null, window.location.href);
});
