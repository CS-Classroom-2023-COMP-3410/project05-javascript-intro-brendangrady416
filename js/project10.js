/* script */

const textDisplay = document.getElementById("textDisplay");
const textInput = document.getElementById("textInput");
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const difficultySelect = document.getElementById("difficulty");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");

let startTime, interval, textToType, errors, typedChars;

const texts = {
  easy: ["apple banana", "orange grape", "banana pear", "kiwi mango", "grape lemon"],
  medium: ["keyboard trainer test", "javascript programming fun", "random text typing words"],
  hard: [
    "Lorem ipsum dolor sit amet consectetur adipiscing elit",
    "The quick brown fox jumps over the lazy dog",
    "Complexity is the enemy of execution in programming"
  ],
};

function getRandomText(difficulty) {
  const pool = texts[difficulty];
  return pool[Math.floor(Math.random() * pool.length)];
}

function updateResults() {
  const elapsedTime = (Date.now() - startTime) / 1000 / 60; // in minutes
  const wordsTyped = textInput.value.trim().split(/\s+/).length;
  const wpm = Math.round(wordsTyped / elapsedTime);
  const accuracy = Math.max(
    0,
    Math.round(((typedChars - errors) / typedChars) * 100)
  );

  wpmDisplay.textContent = wpm || 0;
  accuracyDisplay.textContent = accuracy || 0;
}

function startTrainer() {
  textToType = getRandomText(difficultySelect.value);
  textDisplay.textContent = textToType;
  textInput.value = "";
  textInput.focus();
  startTime = Date.now();
  errors = 0;
  typedChars = 0;

  textInput.removeAttribute("disabled");
  interval = setInterval(updateResults, 100);
  document.getElementById("trainer").classList.remove("hidden");
}

function checkInput() {
  typedChars++;
  const userInput = textInput.value.trim();
  const textWords = textToType.split(" ");
  const userWords = userInput.split(" ");

  let formattedText = "";
  errors = 0;

  for (let i = 0; i < textWords.length; i++) {
    if (userWords[i] === undefined) {
      formattedText += `<span>${textWords[i]}</span> `;
    } else if (userWords[i] === textWords[i]) {
      formattedText += `<span style="color: green;">${textWords[i]}</span> `;
    } else {
      formattedText += `<span style="color: red;">${textWords[i]}</span> `;
      errors++;
    }
  }

  textDisplay.innerHTML = formattedText.trim();

  if (userInput === textToType) {
    clearInterval(interval); // Stop the timer
    textInput.setAttribute("disabled", "true");
    updateResults(); // Display final results
  }
}

function restartTrainer() {
  clearInterval(interval);
  document.getElementById("trainer").classList.add("hidden");
}

startBtn.addEventListener("click", startTrainer);
textInput.addEventListener("input", checkInput);
restartBtn.addEventListener("click", restartTrainer);
