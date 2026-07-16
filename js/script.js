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

// ==========================
// Part 2
// ==========================

function loadQuestion(){

    clearInterval(timerInterval);

    timer = 15;

    progressBar.style.width = "100%";

    resultText.innerHTML = "";

    questionNumber.innerHTML = currentQuestion + 1;

    scoreText.innerHTML = score;

    lifeText.innerHTML = life;

    const q = gameQuestions[currentQuestion];



    // Emoji

    emoji1.innerHTML = q.emoji[0];

    emoji2.innerHTML = q.emoji[1];

    emoji3.innerHTML = q.emoji[2];



    // Random Options

    let options = [q.answer];



    while(options.length < 4){

        const randomPlayer = questions[Math.floor(Math.random()*questions.length)];

        if(!options.includes(randomPlayer.answer)){

            options.push(randomPlayer.answer);

        }

    }



    options = shuffleArray(options);



    buttons.forEach((btn,index)=>{

        btn.disabled = false;

        btn.style.background = "#334155";

        btn.innerHTML = options[index];

        btn.onclick = ()=>checkAnswer(index);

    });



    startTimer();

}



// ==========================

function startTimer(){

    timerInterval = setInterval(()=>{

        timer--;

        progressBar.style.width = (timer/15)*100 + "%";



        if(timer<=0){

            clearInterval(timerInterval);

            timeUp();

        }

    },1000);

}

// ==========================
// Part 3
// ==========================

function checkAnswer(index){

    clearInterval(timerInterval);

    const q = gameQuestions[currentQuestion];

    buttons.forEach(btn => btn.disabled = true);

    const selected = buttons[index].innerHTML;

    if(selected === q.answer){

        score += 10;

        revealTitle.innerHTML = "✅ Correct!";

        revealTitle.style.color = "#22c55e";

    }else{

        life--;

        revealTitle.innerHTML = "❌ Wrong!";

        revealTitle.style.color = "#ef4444";

    }

    scoreText.innerHTML = score;
    lifeText.innerHTML = life;

    revealImage.src = q.image;
    revealName.innerHTML = q.answer;

    revealScreen.style.display = "flex";

    setTimeout(()=>{

        revealScreen.style.display = "none";

        nextQuestion();

    },2000);

}



// ==========================

function timeUp(){

    clearInterval(timerInterval);

    const q = gameQuestions[currentQuestion];

    life--;

    lifeText.innerHTML = life;

    revealTitle.innerHTML = "⏰ Time Up!";
    revealTitle.style.color = "#f59e0b";

    revealImage.src = q.image;

    revealName.innerHTML = q.answer;

    revealScreen.style.display = "flex";

    setTimeout(()=>{

        revealScreen.style.display = "none";

        nextQuestion();

    },2000);

}



// ==========================

function nextQuestion(){

    if(life <= 0){

        gameOver();

        return;

    }

    currentQuestion++;

    if(currentQuestion >= gameQuestions.length){

        gameOver();

        return;

    }

    loadQuestion();

}
