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

let score = 0;
let life = 3;

let currentQuestion = 0;

let timer = 15;
let timerInterval;

let gameQuestions = [];

document.getElementById("startBtn").onclick = startGame;

function startGame(){

    home.style.display="none";
    game.style.display="block";

    score=0;
    life=3;

    createQuestions();

    totalQuestion.innerHTML=gameQuestions.length;

    currentQuestion=0;

    loadQuestion();

}

function createQuestions(){

    gameQuestions=[];

    players.forEach(player=>{

        gameQuestions.push({

            mode:"blur",

            image:player.images.blur,

            reveal:player.images.normal,

            answer:player.name,

            options:createOptions(player.name)

        });

        gameQuestions.push({

            mode:"zoom",

            image:player.images.zoom,

            reveal:player.images.normal,

            answer:player.name,

            options:createOptions(player.name)

        });

        gameQuestions.push({

            mode:"pixel",

            image:player.images.pixel,

            reveal:player.images.normal,

            answer:player.name,

            options:createOptions(player.name)

        });

    });

}

function createOptions(correct){

    let names=players.map(p=>p.name);

    let options=[correct];

    while(options.length<4){

        let random=names[Math.floor(Math.random()*names.length)];

        if(!options.includes(random)){

            options.push(random);

        }

    }

    options.sort(()=>Math.random()-0.5);

    return options;

}

function loadQuestion(){

    clearInterval(timerInterval);

    timer=15;

    progressBar.style.width="100%";

    scoreText.innerHTML=score;
    lifeText.innerHTML=life;

    questionNumber.innerHTML=currentQuestion+1;

    const q=gameQuestions[currentQuestion];

    playerImage.src=q.image;

    resultText.innerHTML="";

    buttons.forEach((btn,index)=>{

        btn.disabled=false;

        btn.style.background="";

        btn.innerHTML=q.options[index];

        btn.onclick=()=>checkAnswer(index);

    });

    startTimer();

}

function startTimer(){

    timerInterval=setInterval(()=>{

        timer--;

        progressBar.style.width=(timer/15)*100+"%";

        if(timer<=0){

            clearInterval(timerInterval);

            timeUp();

        }

    },1000);

}

function checkAnswer(index){

    clearInterval(timerInterval);

    const q=gameQuestions[currentQuestion];

    buttons.forEach(btn=>btn.disabled=true);

    if(buttons[index].innerHTML===q.answer){

        score+=10;

        resultText.innerHTML="✅ Correct";

        buttons[index].style.background="#16a34a";

    }else{

        life--;

        resultText.innerHTML="❌ Wrong";

        buttons[index].style.background="#dc2626";

    }

    buttons.forEach(btn=>{

        if(btn.innerHTML===q.answer){

            btn.style.background="#16a34a";

        }

    });

    playerImage.src=q.reveal;

    setTimeout(nextQuestion,2000);

}

function timeUp(){

    clearInterval(timerInterval);

    life--;

    const q=gameQuestions[currentQuestion];

    resultText.innerHTML="⏰ Time Up";

    playerImage.src=q.reveal;

    buttons.forEach(btn=>{

        btn.disabled=true;

        if(btn.innerHTML===q.answer){

            btn.style.background="#16a34a";

        }

    });

    setTimeout(nextQuestion,2000);

}

function nextQuestion(){

    if(life<=0){

        alert("Game Over\n\nScore : "+score);

        location.reload();

        return;

    }

    currentQuestion++;

    if(currentQuestion>=gameQuestions.length){

        currentQuestion=0;

    }

    loadQuestion();

}
