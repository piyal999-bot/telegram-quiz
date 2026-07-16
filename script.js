const home = document.getElementById("homeScreen");
const game = document.getElementById("gameScreen");

const playerImage = document.getElementById("playerImage");
const resultText = document.getElementById("resultText");

const buttons = document.querySelectorAll(".answer");

const progressBar = document.getElementById("progressBar");
const questionNumber = document.getElementById("questionNumber");
const totalQuestion = document.getElementById("totalQuestion");

const scoreText = document.getElementById("score");
const lifeText = document.getElementById("life");

let currentQuestion = 0;

let score = 0;
let life = 3;

let timer = 15;
let timerInterval;

document.getElementById("startBtn").addEventListener("click", startGame);

function startGame(){

    home.style.display = "none";
    game.style.display = "block";

    currentQuestion = 0;
    score = 0;
    life = 3;

    totalQuestion.innerHTML = questions.length;

    loadQuestion();

}

function loadQuestion(){

    clearInterval(timerInterval);

    timer = 15;

    progressBar.style.width = "100%";

    scoreText.innerHTML = score;
    lifeText.innerHTML = life;

    questionNumber.innerHTML = currentQuestion + 1;

    const q = questions[currentQuestion];

    playerImage.src = q.image;

    resultText.innerHTML = "";

    buttons.forEach((btn,index)=>{

        btn.disabled = false;
        btn.style.background = "";

        btn.innerHTML = q.options[index];

        btn.onclick = ()=>checkAnswer(index);

    });

    startTimer();

}

function startTimer(){

    timerInterval = setInterval(()=>{

        timer--;

        progressBar.style.width = (timer/15)*100+"%";

        if(timer<=0){

            clearInterval(timerInterval);

            timeUp();

        }

    },1000);

}

function checkAnswer(index){

    clearInterval(timerInterval);

    const q = questions[currentQuestion];

    buttons.forEach(btn=>btn.disabled=true);

    if(buttons[index].innerHTML===q.answer){

        score += 10;

        buttons[index].style.background="#16a34a";

        resultText.innerHTML="✅ Correct";

    }else{

        life--;

        buttons[index].style.background="#dc2626";

        resultText.innerHTML="❌ Wrong";

        buttons.forEach(btn=>{

            if(btn.innerHTML===q.answer){

                btn.style.background="#16a34a";

            }

        });

    }

    scoreText.innerHTML = score;
    lifeText.innerHTML = life;

    playerImage.src = q.reveal;

    setTimeout(nextQuestion,2000);

}

function timeUp(){

    clearInterval(timerInterval);

    life--;

    lifeText.innerHTML = life;

    const q = questions[currentQuestion];

    buttons.forEach(btn=>btn.disabled=true);

    resultText.innerHTML="⏰ Time Up";

    playerImage.src=q.reveal;

    buttons.forEach(btn=>{

        if(btn.innerHTML===q.answer){

            btn.style.background="#16a34a";

        }

    });

    setTimeout(nextQuestion,2000);

}

function nextQuestion(){

    if(life<=0){

        gameOver();

        return;

    }

    currentQuestion++;

    if(currentQuestion>=questions.length){

        currentQuestion=0;

    }

    loadQuestion();

}

function gameOver(){

    alert("Game Over!\n\nFinal Score : "+score);

    location.reload();

}
