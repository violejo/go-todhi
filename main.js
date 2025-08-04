let connected = false;
let tokensRemaining = 500000;
let countdownTarget = new Date();
countdownTarget.setHours(countdownTarget.getHours() + 4); // 4-hour timer

document.getElementById("connectWallet").onclick = async () => {
  if (window.ethereum) {
    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      document.getElementById("walletAddress").textContent = accounts[0];
      connected = true;
    } catch (error) {
      alert("Connection rejected.");
    }
  } else {
    alert("MetaMask not found.");
  }
};

document.getElementById("buyButton").onclick = () => {
  if (!connected) {
    alert("Please connect your wallet first.");
    return;
  }

  const amount = parseInt(document.getElementById("tokenAmount").value);
  if (isNaN(amount) || amount <= 0) {
    alert("Enter a valid token amount.");
    return;
  }

  if (amount > tokensRemaining) {
    alert("Not enough tokens left.");
    return;
  }

  tokensRemaining -= amount;
  document.getElementById("tokensRemaining").textContent = tokensRemaining.toLocaleString();
  alert(`You "bought" ${amount} GoToshi tokens!`);
};

function updateCountdown() {
  const now = new Date();
  const diff = countdownTarget - now;
  if (diff <= 0) {
    document.getElementById("countdown").textContent = "00:00:00";
    return;
  }

  const hours = Math.floor(diff / 1000 / 60 / 60);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  document.getElementById("countdown").textContent =
    `${hours.toString().padStart(2, '0')}:` +
    `${minutes.toString().padStart(2, '0')}:` +
    `${seconds.toString().padStart(2, '0')}`;
}

setInterval(updateCountdown, 1000);
