// var head = document.querySelector(".heading");
// var start = document.querySelector("#start-btn");
// var score = document.querySelector("#high-score");
// var wins = document.querySelector("#wins");
var question = document.querySelector("#questions");
var choices = Array.from(document.querySelectorAll(".choice-text"));
var progressText = document.querySelector("#progressText");
var scoreText = document.querySelector("#score-tracker");
var timerBarFull = document.querySelector("#timer-bar-full");
// var lose = document.querySelector("#losses");
// var reset = document.querySelector("#reset");
// var time = document.querySelector(".timer");
// var timerText = document.querySelector("#timer-text");
// var questions = [];
// var winCounter = 0;
// var loseCounter = 0;
// var timer;
// var timerCount;

var currentQuestion = {};
var acceptingAnswers = true;
var score = 0;
var questionCounter = 0;
var availableQuestions = [];

var questions = [
    {
        questions: "What is 2+2?",
        choice1: "2",
        choice2: "4",
        choice3: "21",
        choice4: "100",
        answer: 2,
    },
    {
        questions: "What is 2+2?",
        choice1: "2",
        choice2: "4",
        choice3: "21",
        choice4: "100",
        answer: 2,
    },
    {
        questions: "What is 2+2?",
        choice1: "2",
        choice2: "4",
        choice3: "21",
        choice4: "100",
        answer: 2,
    },
    {
        questions: "What is 2+2?",
        choice1: "2",
        choice2: "4",
        choice3: "21",
        choice4: "100",
        answer: 2,
    },
    {
        questions: "What is 2+2?",
        choice1: "2",
        choice2: "4",
        choice3: "21",
        choice4: "100",
        answer: 2,
    }
]

var SCORE_POINTS = 100;
var MAX_QUESTIONS = 4;

function startGame () {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

function getNewQuestion () {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score)

        return window.location.assign("/end.html")
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter}" of ${MAX_QUESTIONS}`
    timerBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) *100}%`

    var questionsIndex = Math.floor(Math.random()* availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        var number = choice.dataset["number"]
        choice.innerText = currentQuestion["choice" + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener("click", e =>{
        if (!acceptingAnswers)
        return
        acceptingAnswers = false
        var selectedChoice = e.target
        var selectAnswer = selectedChoice.dataset["number"]

        var classToApply = selectAnswer == currentQuestion.answer ? "correct" : "incorrect"

        if (classToApply === "correct") {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(()=> {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion();
        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()