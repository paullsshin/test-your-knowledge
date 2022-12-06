var head = document.querySelector(".heading");
var start = document.querySelector("#start-btn");
var score = document.querySelector("#high-score");
var wins = document.querySelector("#wins");
var question = document.querySelector("#questions");
var choices = Array.from(document.querySelectorAll(".choice-text"));
var progressText = document.querySelector("#progressText");
var scoreText = document.querySelector("#score-tracker");
var lose = document.querySelector("#losses");
var reset = document.querySelector("#reset");
var time = document.querySelector("#timer");
var timerText = document.querySelector("#timer-count");
var questions = [];
var winCounter = 0;
var loseCounter = 0;
var timer;
var timerCount;

var currentQuestion = {};
var acceptingAnswers = true;
var score = 0;
var questionCounter = 0;
var availableQuestions = [];

var questions = [
    {
        questions: "In Finding Nemo, who says, 'Fish are friends, not food.'?",
        choice1: "Sharkbait Oooh Ha Ha ",
        choice2: "Nemo",
        choice3: "Gill",
        choice4: "Bruce",
        answer: 4,
    },
    {
        questions: "Who played the orignal voice of the genie in Disney's Aladdin?",
        choice1: "Will Smith",
        choice2: "Robin Williams",
        choice3: "Jim Carrey",
        choice4: "Jack Black",
        answer: 2,
    },
    {
        questions: "Attempting to explain himself to Donkey, Shrek compares himself to what?",
        choice1: "Onions",
        choice2: "Green Onions",
        choice3: "Lettuce",
        choice4: "Cabbage",
        answer: 1,
    },
    {
        questions: "Which actor stars as Deadpool in Marvel's Deadpool?",
        choice1: "Ryan Gosling",
        choice2: "Ryan Philippe",
        choice3: "Ryan Reynolds",
        choice4: "Ryan Seacrest",
        answer: 3,
    },
    {
        questions: "Gloablly, What is the current highest-grossing film of all time?",
        choice1: "Avatar",
        choice2: "Avengers: Endgame",
        choice3: "Titanic",
        choice4: "Spider-Man: No Way Home",
        answer: 1,
    }
]

var SCORE_POINTS = 100;
var MAX_QUESTIONS = 5;



function getNewQuestion () {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score)

        return window.location.assign("/highscore.html")
    }

    questionCounter++
   
    progressText.innerText = "Question " + questionCounter + " of " + MAX_QUESTIONS

    var questionsIndex = Math.floor(Math.random()* availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.questions

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
