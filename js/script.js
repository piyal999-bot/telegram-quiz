// ==========================
// Football IQ Challenge
// Part 1
// ==========================

const homeScreen = document.getElementById("homeScreen");
const gameScreen = document.getElementById("gameScreen");

const startBtn = document.getElementById("startBtn");

const emoji1 = document.getElementById("emoji1");
const emoji2 = document.getElementById("emoji2");
const emoji3 = document.getElementById("emoji3");

const questionNumber = document.getElementById("questionNumber");
const totalQuestion = document.getElementById("totalQuestion");

const scoreText = document.getElementById("score");
const lifeText = document.getElementById("life");

const progressBar = document.getElementById("progressBar");

const resultText = document.getElementById("resultText");

const buttons = document.querySelectorAll(".answer");

const revealScreen = document.getElementById("revealScreen");
const revealTitle = document.getElementById("revealTitle");
const revealImage = document.getElementById("revealImage");
const revealName = document.getElementById("revealName");



let score = 0;
let life = 3;

let currentQuestion = 0;

let timer = 15;
let timerInterval;

let gameQuestions = [];



startBtn.addEventListener("click", startGame);



function startGame(){

    homeScreen.style.display = "none";

    gameScreen.style.display = "block";

    score = 0;

    life = 3;

    currentQuestion = 0;

    scoreText.innerHTML = score;

    lifeText.innerHTML = life;

    totalQuestion.innerHTML = questions.length;

    gameQuestions = shuffleArray([...questions]);

    loadQuestion();

}



// Shuffle

function shuffleArray(array){

    for(let i=array.length-1;i>0;i--){

        const j=Math.floor(Math.random()*(i+1));

        [array[i],array[j]]=[array[j],array[i]];

    }

    return array;

}
