const startButton = document.getElementById("start");
const nextButton = document.getElementById("next");
const submitButton = document.getElementById("submit");
const introContainer = document.getElementById("intro-container");
const questionContainer = document.getElementById("question-container");
const answerContainer = document.getElementById("answer-container");
const hintContainer = document.getElementById("hint-container");
const scoreEl = document.getElementById("score");
let questionIndex = 0,
  score = 0;

const questions = [
  {
    question: "JavaScript is an _ _ _ _ language?",
    answers: [
      { ans: "Object-Oriented", correct: true },
      { ans: "Object-Based", correct: false },
      { ans: "Procedural", correct: false },
      { ans: "None of the above", correct: false },
    ],
    hint: "Javascript is an Object-Oriented Language.",
  },
  {
    question:
      "Which of the following keywords is used to define a variable in JavaScript?",
    answers: [
      { ans: "var", correct: false },
      { ans: "let", correct: false },
      { ans: "Both A and B", correct: true },
      { ans: "None of the above", correct: false },
    ],
    hint: "Both var and let keywords are used to define a variable in JavaScrpit",
  },
];

submitButton.addEventListener("click", () => {
  const element = questions[questionIndex];
  const answerEl = document.querySelectorAll(".ans");
  handleSubmit(element.answers, Object.entries(answerEl), element.hint);
});

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  questionIndex++;
  hintContainer.classList.add("hide");
  nextButton.classList.add("hide");
  if (questionIndex >= questions.length) {
    questionIndex = -1;
    score = 0;
    questionContainer.classList.add("hide");
    answerContainer.classList.add("hide");
    nextButton.classList.remove("hide");
    nextButton.innerText = "Play again";
    scoreEl.innerText = `Score: ${score}`;
  } else {
    nextButton.innerText = "Next";
    startGame();
  }
});

function resetState(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function startGame() {
  resetState(answerContainer);
  const element = questions[questionIndex];
  startGameController();

  const questionEl = document.getElementById("question");
  questionEl.innerText = element.question;
  for (let i = 0; i < element.answers.length; i++) {
    const btnTarget = element.answers[i];
    const btn = document.createElement("button");
    btn.classList.add("btn");
    btn.classList.add("ans");
    btn.innerText = btnTarget.ans;
    answerContainer.appendChild(btn);
  }

  const answerEl = document.querySelectorAll(".ans");
  answerEl.forEach((ans) => {
    ans.addEventListener("click", (e) => {
      chosenAnswer(e, answerEl);
      submitButton.classList.remove("hide");
    });
  });
}

function handleSubmit(answers, answerEl, hint) {
  let correctAns;
  const chosenEl = document.querySelector(".chosen");
  const hintEl = document.getElementById("hint");
  hintEl.innerText = hint;
  hintContainer.classList.remove("hide");

  Array.from(answers, (ans) => {
    if (ans.correct) {
      correctAns = ans.ans;
    }
  });

  Array.from(answerEl, (a) => {
    a[1].classList.add("disabled-btn");
    a[1].disabled = true;
    if (a[1].innerText === correctAns) {
      a[1].classList.add("correct");
      a[1].classList.remove("wrong");
    } else {
      a[1].classList.remove("correct");
      a[1].classList.add("wrong");
    }
  });

  submitButton.classList.add("hide");
  nextButton.classList.remove("hide");

  if (chosenEl.innerText === correctAns) {
    chosenEl.classList.remove("chosen-wrong");
    chosenEl.classList.add("chosen-correct");
    score++;
  } else {
    chosenEl.classList.add("chosen-wrong");
    chosenEl.classList.remove("chosen-correct");
  }

  scoreEl.classList.remove("hide");
  scoreEl.innerText = `Score: ${score}`;
}

function chosenAnswer(e, answerEl) {
  const targetAns = e.target;
  const arrayAnsEl = Object.entries(answerEl);
  Array.from(arrayAnsEl, (ans) => {
    if (ans[1].innerText === targetAns.innerText) {
      ans[1].classList.add("chosen");
    } else {
      ans[1].classList.remove("chosen");
    }
  });
}

function startGameController() {
  introContainer.classList.add("hide");
  startButton.classList.add("hide");
  questionContainer.classList.remove("hide");
  answerContainer.classList.remove("hide");
}