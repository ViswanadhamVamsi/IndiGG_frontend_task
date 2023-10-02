const questions = [
  {
    question: "Which is the biggest continent in the world?",
    answers: [
      { text: "North America", correct: false },
      { text: "Asia", correct: true },
      { text: "Africa", correct: false },
      { text: "Australia", correct: false },
    ],
  },
  {
    question: "Which is the longest river in the world?",
    answers: [
      { text: "Great Ganga", correct: false },
      { text: "Amazon", correct: false },
      { text: "Nile", correct: true },
      { text: "Niger", correct: false },
    ],
  },
  {
    question: "Which is the largest ocean in the world?",
    answers: [
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Atlantic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which bank is called bankers Bank of India?",
    answers: [
      { text: "Reserve Bank of India", correct: true },
      { text: "Punjab National Bank", correct: false },
      { text: "State Bank of India", correct: false },
      { text: "ICICI Bank", correct: false },
    ],
  },
  {
    question: "Which is the largest animal in the world?",
    answers: [
      { text: "Shark", correct: false },
      { text: "Blue whale", correct: true },
      { text: "Elephant", correct: false },
      { text: "Giraffe", correct: false },
    ],
  },
];

const questionEle = document.getElementById("question");
const answerBtn = document.getElementById("answers");
const nextBtn = document.getElementById("nextBtn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  (nextBtn.innerHTML = "Next"), showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionEle.innerHTML = `${questionNo} . ${currentQuestion.question}`;

  currentQuestion.answers.forEach((answers) => {
    const button = document.createElement("button");
    button.innerHTML = answers.text;
    button.setAttribute("class", "btn");
    answerBtn.appendChild(button);
    if (answers.correct) {
      button.dataset.correct = answers.correct;
    }
    button.addEventListener("click", (e) => {
      const selectedBtn = e.target;
      const isCorrect = selectedBtn.dataset.correct === "true";
      if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
      } else {
        selectedBtn.classList.add("incorrect");
      }
      // To Display the correct option and to disable the selection of another option
      Array.from(answerBtn.children).forEach((button) => {
        if (button.dataset.correct === "true") {
          button.classList.add("correct");
        }
        button.disabled = true;
      });
      nextBtn.style.display = "block";
    });
  });
}

  // // Set timer for each question
  // let count = 15; // time in seconds
  // let interval = setInterval(function() {
  //   document.getElementById('count').innerHTML = count + ' sec';
  //   count--;
  //   if (count === 0) {
  //       clearInterval(interval);
  //       handelNextButton();
  //   }
  // }, 1000);

function resetState() {
  nextBtn.style.display = "none";
  while (answerBtn.firstChild) {
    answerBtn.removeChild(answerBtn.firstChild);
  }
}

function showScore(){
    resetState();
    questionEle.innerHTML = `You scored ${score} out of ${questions.length}`;
    nextBtn.innerHTML = "Retake Quiz"
    nextBtn.style.display = "block"
}

function handelNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


nextBtn.addEventListener("click",() =>{
    if(currentQuestionIndex < questions.length){
        handelNextButton();
    }else{
        // Here we can set to close the quiz or reStart the quiz
        startQuiz();
    }
})

startQuiz();
