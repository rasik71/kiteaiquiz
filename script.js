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
    question: "What is the primary focus of the Kite AI?",
    answers: ["Decentralized finance for gaming", "A Layer 1 blockchain for the AI economy,enabling autonomous AI agents", "A social media platform integrated with crypto", "NFT marketplace for digital art"],
    correct: 1
  },
  {
    question: "Which blockchain framework is Kite AI built on, and is it EVM compatible?",
    answers: ["Ethereum", "Solana", "Avalanche", "Polkadot"],
    correct: 3
  },
  {
    question: "What is the utility of the KITE token within the ecosystem?",
    answers: ["Only for trading on exchanges", "Governance, staking, paying for AI transactions, and rewarding contributors", "Solely for NFT minting", "As a stablecoin for payments"],
    correct: 2
  },
  {
    question: "What major milestone did Kite AI achieve in September 2025?",
    answers: ["Mainnet launch", "Token airdrop to all users", "Partnership with Ethereum Foundation", "Raised $18M in Series A funding"],
    correct: 4
  },
  {
    question: "Who are two key founders of Kite AI?",
    answers: ["Vitalik Buterin and Changpeng Zhao", "Scott Shi and Chi Zhang", "Elon Musk and Sam Altman", "Anatoly Yakovenko and Raj Gokal"],
    correct: 2
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
