const home = document.getElementById("homeScreen");
const game = document.getElementById("gameScreen");

const playerImage = document.getElementById("playerImage");

const buttons = document.querySelectorAll(".answer");

let currentQuestion = 0;

document.getElementById("startBtn").onclick = startGame;

function startGame(){

    home.style.display="none";

    game.style.display="block";

    loadQuestion();

}

function loadQuestion(){

    const q = questions[currentQuestion];

    playerImage.src = q.image;

    for(let i=0;i<4;i++){

        buttons[i].innerText = q.options[i];

        buttons[i].onclick = ()=>{

            checkAnswer(i);

        };

    }

}

function checkAnswer(index){

    const q = questions[currentQuestion];

    if(buttons[index].innerText===q.answer){

        alert("Correct");

    }else{

        alert("Wrong");

    }

}
