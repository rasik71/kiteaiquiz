const startBtn = document.getElementById("start-btn");
const discordInput = document.getElementById("discord");
const quizDiv = document.getElementById("quiz");
const questionContainer = document.getElementById("question-container");
const nextBtn = document.getElementById("next-btn");
const resultDiv = document.getElementById("result");
const startScreen = document.getElementById("start-screen");
const timeDisplay = document.getElementById("time");

let currentQuestion = 0;
let score = 0;
let timeLeft = 60;
let timer;

const questions = [
  {
    question: "What does Kite AI aim to decentralize?",
    answers: ["Data storage", "AI compute", "Social media", "Web browsers"],
    correct: 1
  },
  {
    question: "Which network helps secure AI payments in the Kite ecosystem?",
    answers: ["Polygon", "Brevis", "Base", "Optimism"],
    correct: 1
  },
  {
    question: "Kite AI enables which kind of economy?",
    answers: ["Autonomous", "Traditional", "Manual", "Local"],
    correct: 0
  },
  {
    question: "Kite’s identity infrastructure ensures what?",
    answers: ["Anonymity", "Trust & Verification", "Entertainment", "Marketing"],
    correct: 1
  },
  {
    question: "Kite AI supports fair rewards through?",
    answers: ["Centralized banks", "Smart contracts", "Manual payments", "Paper checks"],
    correct: 1
  }
];

startBtn.addEventListener("click", () => {
  const user = discordInput.value.trim();
  if (user === "") {
    alert("Please enter your Discord username.");
    return;
  }

  startScreen.classList.add("hidden");
  quizDiv.classList.remove("hidden");
  startTimer();
  showQuestion();
});

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timeDisplay.textContent = timeLeft;
    if (timeLeft <= 0) endQuiz();
  }, 1000);
}

function showQuestion() {
  nextBtn.classList.add("hidden");
  const q = questions[currentQuestion];
  questionContainer.innerHTML = `
    <h3>${q.question}</h3>
    ${q.answers.map((a, i) => `
      <button class="answer-btn" onclick="checkAnswer(${i})">${a}</button>
    `).join("")}
  `;
}

function checkAnswer(index) {
  const q = questions[currentQuestion];
  const buttons = document.querySelectorAll(".answer-btn");
  buttons.forEach(b => b.disabled = true);

  if (index === q.correct) {
    score++;
    buttons[index].style.background = "green";
  } else {
    buttons[index].style.background = "red";
    buttons[q.correct].style.background = "green";
  }

  nextBtn.classList.remove("hidden");
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
});

function endQuiz() {
  clearInterval(timer);
  questionContainer.innerHTML = "";
  nextBtn.classList.add("hidden");
  resultDiv.classList.remove("hidden");
  resultDiv.innerHTML = `<h2>Your Score: ${score}/${questions.length}</h2><p>Thanks for playing!</p>`;
}
