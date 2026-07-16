// ==========================
// Football IQ Challenge
// Part 1
// ==========================

const homeScreen = document.getElementById("homeScreen");
const gameScreen = document.getElementById("gameScreen");

const startBtn = document.getElementById("startBtn");

const hint1 = document.getElementById("hint1");
const hint2 = document.getElementById("hint2");
const hint3 = document.getElementById("hint3");

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



// Hint Images

hint1.src = q.hints[0];

hint2.src = q.hints[1];

hint3.src = q.hints[2];



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

// ==========================
// Part 4
// ==========================

function gameOver(){

    clearInterval(timerInterval);

    let win = life > 0 && currentQuestion >= gameQuestions.length - 1;
let rank = "";

if(score === 300){

    rank = "🐐 GOAT";

}else if(score >= 260){

    rank = "👑 Football IQ Master";

}else if(score >= 180){

    rank = "🥇 Football Expert";

}else if(score >= 100){

    rank = "🥈 Rising Star";

}else{

    rank = "🥉 Rookie";

}

    gameScreen.style.display = "none";

    revealScreen.style.display = "flex";

    if(win){

    revealTitle.innerHTML = "🏆 Congratulations!";

}else{

    revealTitle.innerHTML = "💀 Game Over";

}

    revealTitle.style.color = "#ffffff";

    revealImage.style.display = "none";

    if(win){

    revealName.innerHTML = `
        ⭐ Final Score: ${score}/300<br><br>
        ❤️ Lives Left: ${life}<br><br>
        🏅 ${rank}<br><br>
        🎉 You completed all 30 questions!
    `;

}else{

    revealName.innerHTML = `
        ⭐ Final Score: ${score}<br><br>
        🏅 ${rank}<br><br>
        Better luck next time!
    `;

}

    document.getElementById("nextText").innerHTML = `
        <br>
        <button id="restartBtn">🔄 Play Again</button>
    `;

    setTimeout(()=>{

        const restartBtn = document.getElementById("restartBtn");

        restartBtn.onclick = ()=>{

            revealImage.style.display = "block";

            document.getElementById("nextText").innerHTML = "Next Question...";

            revealScreen.style.display = "none";

            gameScreen.style.display = "block";

            startGame();

        };

    },100);

}
