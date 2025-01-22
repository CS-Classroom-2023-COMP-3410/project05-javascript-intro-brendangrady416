const board = document.getElementById("board");
const movesElement = document.getElementById("moves");
const timerElement = document.getElementById("timer");
const restartButton = document.getElementById("restart");

let cards = [];
let flippedCards = [];
let matchedCards = 0;
let moves = 0;
let timer = null;
let timeElapsed = 0;

const cardValues = ["A", "B", "C", "D", "E", "F", "G", "H"];

function initializeGame() {
    // Reset game state
    moves = 0;
    timeElapsed = 0;
    matchedCards = 0;
    flippedCards = [];
    movesElement.textContent = moves;
    timerElement.textContent = "0:00";

    // Shuffle and create cards
    const shuffledValues = [...cardValues, ...cardValues].sort(() => Math.random() - 0.5);
    board.innerHTML = "";
    shuffledValues.forEach(value => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.value = value;
        card.textContent = "";
        card.addEventListener("click", handleCardClick);
        board.appendChild(card);
    });

    // Start the timer
    if (timer) clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
}

function handleCardClick(event) {
    const card = event.target;

    if (card.classList.contains("flipped") || card.classList.contains("matched") || flippedCards.length === 2) {
        return;
    }

    card.classList.add("flipped");
    card.textContent = card.dataset.value;
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        moves++;
        movesElement.textContent = moves;
        checkForMatch();
    }
}

function checkForMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.value === card2.dataset.value) {
        card1.classList.add("matched");
        card2.classList.add("matched");
        matchedCards += 2;
        flippedCards = [];

        if (matchedCards === cardValues.length * 2) {
            clearInterval(timer);
            alert(`Congratulations! You completed the game in ${moves} moves and ${formatTime(timeElapsed)}.`);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
            card1.textContent = "";
            card2.textContent = "";
            flippedCards = [];
        }, 1000);
    }
}

function updateTimer() {
    timeElapsed++;
    timerElement.textContent = formatTime(timeElapsed);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
}

restartButton.addEventListener("click", initializeGame);

// Start the game on page load
initializeGame();
