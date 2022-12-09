const questions = [
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What does CPU stand for?",
    correct_answer: "Central Processing Unit",
    incorrect_answers: [
      "Central Process Unit",
      "Computer Personal Unit",
      "Central Processor Unit",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn't get modified?",
    correct_answer: "Final",
    incorrect_answers: ["Static", "Private", "Public"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "The logo for Snapchat is a Bell.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question:
      "Pointers were not used in the original C programming language; they were added later on in C++.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the most preferred image format used for logos in the Wikimedia database?",
    correct_answer: ".svg",
    incorrect_answers: [".png", ".jpeg", ".gif"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "In web design, what does CSS stand for?",
    correct_answer: "Cascading Style Sheet",
    incorrect_answers: [
      "Counter Strike: Source",
      "Corrective Style Sheet",
      "Computer Style Sheet",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the code name for the mobile operating system Android 7.0?",
    correct_answer: "Nougat",
    incorrect_answers: ["Ice Cream Sandwich", "Jelly Bean", "Marshmallow"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "difficult",
    question: "On Twitter, what is the character limit for a Tweet?",
    correct_answer: "140",
    incorrect_answers: ["120", "160", "100"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "medium",
    question: "Linux was first created as an alternative to Windows XP.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "medium",
    question:
      "Which programming language shares its name with an island in Indonesia?",
    correct_answer: "Java",
    incorrect_answers: ["Python", "C", "Jakarta"],
  },
];

// HINTS
// IF YOU ARE DISPLAYING ALL THE QUESTIONS AT ONCE:
// For each question, create a container for wrapping it; then create a radio button
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio
// with, as options, both the correct answer and the incorrect ones
// (you'll probably need to google how to get the value from a radio button in JS to evaluate the final score)
//
// IF YOU ARE DISPLAYING ONE QUESTION AT A TIME
// Display the first question with the text and the radio buttons
// when the user selects an answer, pick the next question from the array and replace the old one with it
// saving the user's choice in a variable

// How to calculate the result? You can do it in 2 ways:
// If you are presenting all the questions together, just take all the radio buttons and check if the selected answer === correct_answer
// If you are presenting one question at a time, just add one point or not to the user score if the selected answer === correct_answer

let userScore = 0;
let questionIndex = 0;

function loadQuestions() {
  let questionsNode = document.getElementById("questions-container");

  for (let i = questionIndex; i <= questionIndex; i++) {
    let question = questions[i];

    let questionBox = document.createElement("div");
    questionBox.classList.add("question-box");
    questionBox.setAttribute("id", "question-box");
    questionsNode.appendChild(questionBox);

    let questionTitle = document.createElement("div");
    questionTitle.classList.add("question-title");
    questionTitle.innerText = question.question;
    questionBox.appendChild(questionTitle);

    let allAnswerChoices = question.incorrect_answers;
    allAnswerChoices.push(question.correct_answer);

    let answerChoices = document.createElement("div");
    answerChoices.classList.add("answer-choices");
    questionBox.appendChild(answerChoices);

    for (let answerChoice of allAnswerChoices) {
      let choice = document.createElement("div");
      choice.classList.add("answer-choice");
      choice.innerHTML = ` <input type='radio' id='${answerChoice}' name='${questions.indexOf(
        question
      )}' value='${answerChoice}' unchecked/> <label for='${answerChoice}'>${answerChoice}</label>`;

      answerChoices.appendChild(choice);
    }

    let submitButton = document.createElement("button");
    submitButton.classList.add("submit-button");
    submitButton.setAttribute("id", "submit-button");
    submitButton.innerText = "Check Answer";
    submitButton.addEventListener("click", function () {
      getAnswer(question);
    });
    questionBox.appendChild(submitButton);
  }
}

function getAnswer(question) {
  let questionBox = document.getElementById("question-box");
  let submitButton = document.getElementById("submit-button");
  let correctAnswer = question.correct_answer;
  let questionIndex = questions.indexOf(question);
  let radioButtons = document.querySelectorAll(
    `input[type=radio][name='${questionIndex}']`
  );

  let answered;
  for (const radioButton of radioButtons) {
    if (radioButton.checked) {
      answered = radioButton.value;
      break;
    }
  }
  if (correctAnswer === answered) {
    userScore += 1;
    console.log("answer is correct", userScore);
    let explanationField = document.createElement("div");
    explanationField.classList.add("correct-answer");
    explanationField.innerText = "Your answer is correct!";
    questionBox.appendChild(explanationField);
    submitButton.style.display = "none";
    let continueButton = document.createElement("button");
    continueButton.classList.add("continue-button");
    continueButton.innerText = "Continue";
    continueButton.addEventListener("click", nextQuestion);
    questionBox.appendChild(continueButton);
  } else {
    console.log("answer is wrong", userScore);
    let explanationField = document.createElement("div");
    explanationField.classList.add("wrong-answer");
    explanationField.innerText = `Your answer is wrong. The correct answer is ${correctAnswer}`;
    questionBox.appendChild(explanationField);
    submitButton.style.display = "none";
    let continueButton = document.createElement("button");
    continueButton.classList.add("continue-button");
    continueButton.innerText = "Continue";
    continueButton.addEventListener("click", nextQuestion);
    questionBox.appendChild(continueButton);
  }
}

function nextQuestion() {
  questionIndex += 1;
  console.log("index", questionIndex);
  document.getElementById("questions-container").innerHTML = "";
  if (questionIndex < 10) {
    loadQuestions(questionIndex);
  } else {
    showScore();
  }
}

function showScore() {
  document.getElementById("questions-container").innerHTML = "";
  let questionNode = document.getElementById("questions-container");
  let finalScoreScreen = document.createElement("div");
  finalScoreScreen.classList.add("final-score-screen");
  finalScoreScreen.innerText = `🎉 Your final score is ${userScore} 🎉`;
  questionNode.appendChild(finalScoreScreen);
}

function onloadOperator() {
  document.getElementById("questions-container").innerHTML = "";
  loadQuestions(0);
}

function setup() {
  let difficulty = document.getElementById("difficulty").value;
  let questionNum = document.getElementById("question-num").value;
  let welcomeScreen = document.getElementById("welcome-screen");

  welcomeScreen.style.display = "none";
  setQuestions(difficulty, questionNum);
}

function setQuestions(difficulty, questionNum) {
  // let questions = [];
  // let questionIndex = 0;
  // for (let question of questionsOld) {
  //   if (question.difficulty === difficulty && questionIndex < questionNum) {
  //     questions.push(question);
  //     questionIndex++;
  //   }
  // }
  onloadOperator();
}
