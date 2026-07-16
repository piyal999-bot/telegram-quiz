const home = document.getElementById("homeScreen");
const game = document.getElementById("gameScreen");

const playerImage = document.getElementById("playerImage");
const resultText = document.getElementById("resultText");

const buttons = document.querySelectorAll(".answer");

let currentQuestion = 0;

document.getElementById("startBtn").addEventListener("click", startGame);

function startGame() {

    home.style.display = "none";
    game.style.display = "block";

    currentQuestion = 0;

    loadQuestion();

}

function loadQuestion() {

    const q = questions[currentQuestion];

    playerImage.src = q.image;

    resultText.innerHTML = "";

    for (let i = 0; i < buttons.length; i++) {

        buttons[i].disabled = false;

        buttons[i].innerHTML = q.options[i];

        buttons[i].style.background = "";

        buttons[i].onclick = () => checkAnswer(i);

    }

}

function checkAnswer(index) {

    const q = questions[currentQuestion];

    buttons.forEach(btn => btn.disabled = true);

    if (buttons[index].innerHTML === q.answer) {

        buttons[index].style.background = "#16a34a";

        resultText.innerHTML = "✅ Correct";

    } else {

        buttons[index].style.background = "#dc2626";

        resultText.innerHTML = "❌ Wrong";

        for (let i = 0; i < buttons.length; i++) {

            if (buttons[i].innerHTML === q.answer) {

                buttons[i].style.background = "#16a34a";

            }

        }

    }

    playerImage.src = q.reveal;

    setTimeout(nextQuestion, 2000);

}

function nextQuestion() {

    currentQuestion++;

    if (currentQuestion >= questions.length) {

        currentQuestion = 0;

    }

    loadQuestion();

}
