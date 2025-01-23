/* script */
const quizData = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        correct: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        correct: "Mars"
    },
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        correct: "4"
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        options: ["Harper Lee", "J.K. Rowling", "Ernest Hemingway", "Mark Twain"],
        correct: "Harper Lee"
    },
    {
        question: "What is the capital of Japan?",
        options: ["Beijing", "Seoul", "Tokyo", "Bangkok"],
        correct: "Tokyo"
    },
    {
        question: "What is the chemical symbol for gold?",
        options: ["Au", "Ag", "Pb", "Fe"],
        correct: "Au"
    },
    {
        question: "Which element has the atomic number 1?",
        options: ["Oxygen", "Helium", "Hydrogen", "Carbon"],
        correct: "Hydrogen"
    }
];

const quizContainer = document.getElementById('quiz');
const submitButton = document.getElementById('submit');
const resultsContainer = document.getElementById('results');
let currentQuestionIndex = 0;
let score = 0;
let shuffledQuizData = [];
let userAnswers = [];

function shuffleQuestions() {
    shuffledQuizData = quizData.sort(() => Math.random() - 0.5).slice(0, 5);
}

function loadQuiz() {
    if (currentQuestionIndex < shuffledQuizData.length) {
        quizContainer.innerHTML = `
            <div class="question">${shuffledQuizData[currentQuestionIndex].question}</div>
            ${shuffledQuizData[currentQuestionIndex].options.map(option => `
                <label>
                    <input type="radio" name="q${currentQuestionIndex}" value="${option}"> ${option}
                </label>
            `).join('')}
        `;
    } else {
        showResults();
    }
}

function nextQuestion() {
    const selectedOption = document.querySelector(`input[name=q${currentQuestionIndex}]:checked`);
    if (selectedOption) {
        userAnswers.push({
            question: shuffledQuizData[currentQuestionIndex].question,
            selected: selectedOption.value,
            correct: shuffledQuizData[currentQuestionIndex].correct
        });
        if (selectedOption.value === shuffledQuizData[currentQuestionIndex].correct) {
            score++;
        } else {
            alert(`Incorrect! The correct answer is ${shuffledQuizData[currentQuestionIndex].correct}`);
        }
        currentQuestionIndex++;
        loadQuiz();
    } else {
        alert("Please select an answer");
    }
}

function showResults() {
    quizContainer.innerHTML = '';
    let reviewHTML = `<h3>You scored ${score} out of ${shuffledQuizData.length}</h3>`;
    userAnswers.forEach(answer => {
        reviewHTML += `<p><strong>Question:</strong> ${answer.question}</p>`;
        reviewHTML += `<p><strong>Your answer:</strong> ${answer.selected}</p>`;
        reviewHTML += `<p><strong>Correct answer:</strong> ${answer.correct}</p>`;
        reviewHTML += '<hr>';
    });
    resultsContainer.innerHTML = reviewHTML;
    submitButton.textContent = 'Restart Quiz';
    submitButton.removeEventListener('click', nextQuestion);
    submitButton.addEventListener('click', restartQuiz);
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    resultsContainer.innerHTML = '';
    submitButton.textContent = 'Submit';
    submitButton.removeEventListener('click', restartQuiz);
    submitButton.addEventListener('click', nextQuestion);
    shuffleQuestions();
    loadQuiz();
}

submitButton.addEventListener('click', nextQuestion);

shuffleQuestions();
loadQuiz();
