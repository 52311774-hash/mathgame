const TARGET_SCORE = 5;

const scoreEl = document.getElementById("score");
const questionEl = document.getElementById("question");
const feedbackEl = document.getElementById("feedback");
const answerForm = document.getElementById("answer-form");
const answerInput = document.getElementById("answer-input");
const submitBtn = document.getElementById("submit-btn");
const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");

let score = 0;
let currentAnswer = null;
let gameActive = false;

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeQuestion() {
  const operations = ["+", "-", "*", "/"];
  const op = operations[randomInt(0, operations.length - 1)];

  let a;
  let b;
  let answer;

  if (op === "+") {
    a = randomInt(1, 20);
    b = randomInt(1, 20);
    answer = a + b;
  } else if (op === "-") {
    a = randomInt(1, 20);
    b = randomInt(1, a);
    answer = a - b;
  } else if (op === "*") {
    a = randomInt(1, 12);
    b = randomInt(1, 12);
    answer = a * b;
  } else {
    b = randomInt(1, 12);
    answer = randomInt(1, 12);
    a = b * answer;
  }

  currentAnswer = answer;
  questionEl.textContent = `What is ${a} ${op} ${b}?`;
}

function updateScore() {
  scoreEl.textContent = String(score);
}

function setGameEnabled(enabled) {
  gameActive = enabled;
  answerInput.disabled = !enabled;
  submitBtn.disabled = !enabled;
}

function startGame() {
  score = 0;
  updateScore();
  feedbackEl.textContent = "";

  startBtn.classList.add("hidden");
  restartBtn.classList.add("hidden");

  setGameEnabled(true);
  makeQuestion();
  answerInput.value = "";
  answerInput.focus();
}

function winGame() {
  setGameEnabled(false);
  questionEl.textContent = "You won!";
  feedbackEl.textContent = "Great job! You answered 5 questions correctly.";
  restartBtn.classList.remove("hidden");
}

answerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!gameActive) {
    return;
  }

  const userAnswer = Number(answerInput.value);

  if (Number.isNaN(userAnswer)) {
    feedbackEl.textContent = "Please enter a valid number.";
    return;
  }

  if (userAnswer === currentAnswer) {
    score += 1;
    updateScore();

    if (score >= TARGET_SCORE) {
      winGame();
      return;
    }

    feedbackEl.textContent = "Correct! Next question:";
    makeQuestion();
  } else {
    feedbackEl.textContent = `Not quite. The correct answer was ${currentAnswer}. Try another!`;
    makeQuestion();
  }

  answerInput.value = "";
  answerInput.focus();
});

startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", startGame);
