const clickSound = new Audio("./click.wav");

let startBtn = document.querySelector("#startBtn");
let timeDisplay = document.querySelector("#timeDisplay");
let scoreDisplay = document.querySelector("#scoreDisplay");
let gameScore = document.querySelector("#gameScore");
let playground = document.querySelector("#playground");
let overlay = document.querySelector(".overlay");
let points = overlay.querySelector("#points");
let box = document.createElement("div");
box.classList.add("box");

let interval;
let time = 0;
let score = 0;
let totalScore = 0;

let canScore = true;
let isPlaying = false;

function randomBox() {
    playground.append(box);

    let height = playground.clientHeight - box.offsetHeight;
    let width = playground.clientWidth - box.offsetWidth;

    let posX = Math.floor(Math.random() * height);
    let posY = Math.floor(Math.random() * width);

    box.style.top = `${posX}px`;
    box.style.left = `${posY}px`;

    canScore = true;
}

function updateScore() {
    score++;
    scoreDisplay.textContent = score;
}

function gameOver() {
    startBtn.textContent = "Play Again";
    isPlaying = false;
    canScore = false;

    gameScore.textContent = score;
    totalScore += score;

    if (totalScore <= 0) {
        points.textContent = `${totalScore} Total Points 🥹`;
    } else if (totalScore <= 5) {
        points.textContent = `${totalScore} Total Points 😀`;
    } else if (totalScore <= 10) {
        points.textContent = `${totalScore} Total Points 🤩`;
    } else if (totalScore <= 15) {
        points.textContent = `${totalScore} Total Points 🌟`;
    } else if (totalScore <= 30) {
        points.textContent = `${totalScore} Total Points 🥳`;
    } else {
        points.textContent = `${totalScore} Total Points 😎`;
    }

    box.style.display = "none"
    overlay.style.display = "flex";
}

function start() {
    if (isPlaying) return;

    isPlaying = true;
    time = 0;
    score = 0;
    timeDisplay.textContent = time;
    scoreDisplay.textContent = score;
    overlay.style.display = "none";
    box.style.display = "flex";

    startBtn.textContent = "Playing...";

    randomBox();

    interval = setInterval(() => {
        time++;
        timeDisplay.textContent = time;

        if (time >= 10) {
            clearInterval(interval);
            gameOver();
            return;
        }
        randomBox();
    }, 1000);
}

box.addEventListener("click", () => {
    if (canScore && isPlaying) {
        
        clickSound.currentTime = 0;
        clickSound.play();

        updateScore();

        canScore = false;
    }
});

startBtn.addEventListener("click", (event) => {
    start();
});


