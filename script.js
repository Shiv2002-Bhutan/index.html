const registeredVoters = [];
const votesCount = { DPT: 0, DTT: 0, DTP: 0, DNT: 0 };
const candidates = ["DPT", "DTT", "DTP", "DNT"];
const maxVoters = 100;

function showVoterRegistrationForm() {
    hideAllSections();
    document.getElementById("voterRegistration").style.display = "block";
}

function showVotingForm() {
    hideAllSections();
    document.getElementById("votingForm").style.display = "block";
}

function showVoteCount() {
    hideAllSections();
    document.getElementById("voteCount").style.display = "block";
    document.getElementById("voteCountSummary").textContent = JSON.stringify(votesCount);
}

function showLeadingCandidate() {
    hideAllSections();
    document.getElementById("leadingCandidate").style.display = "block";
    const leadingCandidate = Object.keys(votesCount).reduce((a, b) => votesCount[a] > votesCount[b] ? a : b);
    document.getElementById("leadingCandidateInfo").textContent = `${leadingCandidate} is leading with ${votesCount[leadingCandidate]} votes.`;
}

function showRegisteredVoters() {
    hideAllSections();
    document.getElementById("registeredVoters").style.display = "block";
    const registeredVotersList = document.getElementById("registeredVotersList");
    registeredVotersList.innerHTML = registeredVoters.map(voter => `<li>CID: ${voter.cid}, Age: ${voter.age}</li>`).join('');
}

function resetVotingProcess() {
    hideAllSections();
    const password = prompt("Enter admin password to reset the voting process.");
    if (password === "1234") {
        registeredVoters.length = 0;
        for (const candidate of candidates) {
            votesCount[candidate] = 0;
        }
        alert("Voting process has been reset.");
    } else {
        alert("Incorrect admin password. Voting process reset denied.");
    }
}

function hideAllSections() {
    const sections = ["voterRegistration", "votingForm", "voteCount", "leadingCandidate", "registeredVoters"];
    for (const section of sections) {
        document.getElementById(section).style.display = "none";
    }
}

function registerVoter() {
    const cid = document.getElementById("cid").value;
    const age = document.getElementById("age").value;

    if (registeredVoters.length >= maxVoters) {
        alert("Maximum number of voters reached. Cannot register new voter.");
        return;
    }

    if (isEligibleVoter(age)) {
        registeredVoters.push({ cid, age });
        alert("Voter registered successfully!");
        document.getElementById("registrationForm").reset();
    } else {
        alert("You are not eligible to vote. Minimum age requirement is 18.");
    }
}

function isEligibleVoter(age) {
    return age >= 18;
}

function castVote() {
    const voterCID = document.getElementById("voterCID").value;
    const candidateChoice = document.getElementById("candidateChoice").value;

    if (!isRegisteredVoter(voterCID)) {
        alert("Voter with CID not found or already voted.");
        return;
    }

    votesCount[candidateChoice]++;
    markVoterAsVoted(voterCID);

    alert(`Vote for ${candidateChoice} has been cast successfully.`);
    document.getElementById("voteForm").reset();
}

function isRegisteredVoter(cid) {
    return registeredVoters.find(voter => voter.cid === cid && !voter.voted);
}

function markVoterAsVoted(cid) {
    const voter = registeredVoters.find(voter => voter.cid === cid);
    if (voter) {
        voter.voted = true;
    }
}

function init() {
    document.getElementById("registrationForm").reset();
    document.getElementById("voteForm").reset();
    hideAllSections();
}

init();
