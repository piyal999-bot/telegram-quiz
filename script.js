const home = document.getElementById("homeScreen");
const game = document.getElementById("gameScreen");

const playerImage = document.getElementById("playerImage");

const buttons = document.querySelectorAll(".answer");

let currentQuestion = 0;

document.getElementById("startBtn").onclick = () => {

    home.style.display = "none";
    game.style.display = "block";

    loadQuestion();

};

function loadQuestion(){

    const q = questions[currentQuestion];

    playerImage.src = q.zoomImage;

    for(let i=0;i<4;i++){

        buttons[i].innerText = q.options[i];

    }

}
