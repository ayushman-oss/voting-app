async function loadCandidates() {
    try {
        const response = await fetch('/voter/candidates');
<<<<<<< HEAD
                const candidates = await response.json();
=======
        const candidates = await response.json();
>>>>>>> origin/main

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
            const uid = sessionStorage.getItem("sessionId");

            const verifyResponse = await fetch('/voter/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ uid })
            });

            const verifyResult = await verifyResponse.json();
            if (!verifyResult.success) {
                alert(`Verification failed: ${verifyResult.message}`);
                return;
            }

            const response = await fetch('/voter/vote', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ candidateId })
            });


            const result = await response.json();
            if (response.ok && result.success) {
                alert(`Vote submitted successfully for ${candidateId}!`);
                window.location.href = 'final.html';

                await fetch('/voter/updateVoted', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({ uid })
                });

            } else {
                alert(`Failed to submit vote: ${result.message}`);
            }
        } catch (error) {
            console.log("Error submitting vote:", error);
            alert("Error submitting vote. Please try again.");
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
