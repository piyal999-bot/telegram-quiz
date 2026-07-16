const home = document.getElementById("homeScreen");
const game = document.getElementById("gameScreen");

const playerImage = document.getElementById("playerImage");
const resultText = document.getElementById("resultText");
const timerText = document.getElementById("timer");

const buttons = document.querySelectorAll(".answer");

let currentQuestion = 0;
let timer = 15;
let timerInterval;

document.getElementById("startBtn").addEventListener("click", startGame);

function startGame() {

    home.style.display = "none";
    game.style.display = "block";

    currentQuestion = 0;

    loadQuestion();

}

function loadQuestion() {

    clearInterval(timerInterval);

    timer = 15;
    timerText.innerHTML = timer;

    const q = questions[currentQuestion];

    playerImage.src = q.image;

    resultText.innerHTML = "";

    for (let i = 0; i < buttons.length; i++) {

        buttons[i].disabled = false;
        buttons[i].style.background = "";

        buttons[i].innerHTML = q.options[i];

        buttons[i].onclick = () => checkAnswer(i);

    }

    startTimer();

}

function startTimer() {

    timerInterval = setInterval(() => {

        timer--;

        timerText.innerHTML = timer;

        if (timer <= 0) {

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

        buttons[index].style.background="#16a34a";

        resultText.innerHTML="✅ Correct";

    }else{

        buttons[index].style.background="#dc2626";

        resultText.innerHTML="❌ Wrong";

        buttons.forEach(btn=>{

            if(btn.innerHTML===q.answer){

                btn.style.background="#16a34a";

            }

        });

    }

    playerImage.src=q.reveal;

    setTimeout(nextQuestion,2000);

}

function timeUp(){

    const q=questions[currentQuestion];

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

    currentQuestion++;

    if(currentQuestion>=questions.length){

        currentQuestion=0;

    }

    loadQuestion();

}
