let loanAmount = 585;
let daysPassed = 0;
const correctPassword = "gautamlodu"; // Hardcoded password

function calculateCurrentAmount() {
    return (loanAmount * Math.pow(1.08, daysPassed)).toFixed(2);
}

function updateDisplay() {
    const currentAmount = calculateCurrentAmount();
    document.getElementById('current-amount').innerText = currentAmount;
    document.getElementById('loan-amount').innerText = loanAmount;
    document.getElementById('days-passed').innerText = daysPassed;
    document.getElementById('current-date').innerText = new Date().toLocaleDateString();
}

function incrementDay() {
    daysPassed++;
    updateDisplay();
}

document.getElementById('edit-amount-btn').addEventListener('click', function() {
    const enteredPassword = prompt("Enter your password:");
    if (enteredPassword === correctPassword) {
        const newAmount = parseFloat(prompt("Enter new loan amount:"));
        if (!isNaN(newAmount) && newAmount > 0) {
            loanAmount = newAmount;
            daysPassed = 0; // Reset days passed when loan amount changes
            updateDisplay();
        } else {
            alert("Please enter a valid loan amount.");
        }
    } else {
        alert("Incorrect password.");
    }
});

document.getElementById('calculate-future-btn').addEventListener('click', function() {
    const selectedDate = new Date(document.getElementById('future-date').value);
    const today = new Date();
    const futureDays = Math.ceil((selectedDate - today) / (1000 * 60 * 60 * 24));
    
    if (futureDays > 0) {
        const futureAmount = (loanAmount * Math.pow(1.08, futureDays)).toFixed(2);
        document.getElementById('future-amount').innerText = futureAmount;
    } else {
        alert("Please select a future date.");
    }
});

// Increment the day at the start of each new day
setInterval(() => {
    const newDate = new Date();
    const lastDate = new Date(new Date().setDate(newDate.getDate() - 1));
    if (newDate.getDate() !== lastDate.getDate()) {
        incrementDay();
    }
}, 1000 * 60 * 60 * 24); // Check every 24 hours

updateDisplay();