let gameSeq = [];
let userSeq = [];

let btns = ["green", "red", "yellow", "blue"];
let started = false;
let level = 0;

let startText = document.getElementById("start-text");
let scoreDisplay = document.querySelector(".score h2");
let message = document.getElementById("message");

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => btn.classList.remove("flash"), 300);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(() => btn.classList.remove("userflash"), 300);
}

function startGame() {
    if (!started) {
        started = true;
        startText.style.visibility = "hidden"; 
        message.innerText = "Game Started!";
        levelUp();
    }
}

function levelUp() {
    userSeq = [];
    level++;
    scoreDisplay.innerText = level;

    let randColor = btns[Math.floor(Math.random() * 4)];
    gameSeq.push(randColor);

    playSequence();
}

function playSequence() {
    let i = 0;
    let interval = setInterval(() => {
        gameFlash(document.querySelector("." + gameSeq[i]));
        i++;
        if (i >= gameSeq.length) clearInterval(interval);
    }, 600);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 800);
        }
    } else {
        gameOver();
    }
}

function btnPress() {
    startGame();

    let btn = this;
    userFlash(btn);

    userSeq.push(btn.classList[1]);
    checkAns(userSeq.length - 1);
}

document.querySelectorAll(".btn").forEach(btn =>
    btn.addEventListener("click", btnPress)
);

function gameOver() {
    message.innerHTML = `Game Over!<br>Your score was <b>${level}</b><br>Click any button to restart`;

    document.body.style.backgroundColor = "red";
    setTimeout(() => document.body.style.backgroundColor = "black", 200);

    reset();
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    scoreDisplay.innerText = "0";
    startText.style.visibility = "visible";
}
