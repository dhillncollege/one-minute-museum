window.onload = function () {

const canvas = document.getElementById("pong");
const ctx = canvas.getContext("2d");

// scoring
let playerScore = 0;
let aiScore = 0;

// difficulty
let difficulty = "medium";

//  player items
let playerX = 20;
let aiX = canvas.width - 30;

// Paddle properties
const paddleWidth = 10, paddleHeight = 100;
let playerY = (canvas.height - paddleHeight) / 2;
let aiY = (canvas.height - paddleHeight) / 2;

// Ball properties
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballRadius = 10;
let ballSpeedX = 4;
let ballSpeedY = 4;

// Animation frame tracker
let animationId = null;

function drawRect(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

function drawCircle(x, y, r, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
}

function resetBall() {
    if (ballX < 0) {
        aiScore++;
    } else if (ballX > canvas.width) {
        playerScore++;
    }

    ballX = canvas.width / 2;
    ballY = canvas.height / 2;

    // Define baseSpeed inside this function
    let baseSpeed;
    if (difficulty === "easy") {
        baseSpeed = 3;
    } else if (difficulty === "hard") {
        baseSpeed = 6;
    } else {
        baseSpeed = 4;
    }

    ballSpeedX = (Math.random() > 0.5 ? 1 : -1) * baseSpeed;
    ballSpeedY = (Math.random() > 0.5 ? 1 : -1) * baseSpeed;
}   

function drawScore() {
    ctx.fillStyle = "white";
    ctx.font = "24px Arial";
    ctx.textAlign = "center";
    ctx.fillText(playerScore, canvas.width / 4, 30);
    ctx.fillText(aiScore, (3 * canvas.width) / 4, 30);
}

function drawNet() {
    for (let i = 0; i <= canvas.height; i += 15) {
        drawRect(canvas.width / 2 - 1, i, 2, 10, "white");
    }
}

function draw() {
    drawRect(0, 0, canvas.width, canvas.height, "#222"); // background
    drawNet();
    drawRect(0, playerY, paddleWidth, paddleHeight, "white"); // player paddle
    drawRect(canvas.width - paddleWidth, aiY, paddleWidth, paddleHeight, "white"); // AI paddle
    drawCircle(ballX, ballY, ballRadius, "white"); // ball
    drawScore();
}

function update() {
    // Move ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Wall collision
    if (ballY <= 0 || ballY + ballRadius >= canvas.height) {
        ballSpeedY = -ballSpeedY;
    }

    // Player paddle collision
    if (
        ballX <= playerX + paddleWidth &&
        ballY + ballRadius >= playerY &&
        ballY <= playerY + paddleHeight
    ) {
        ballSpeedX = -ballSpeedX;
    }

    // AI paddle collision
    if (
        ballX + ballRadius >= aiX &&
        ballY + ballRadius >= aiY &&
        ballY <= aiY + paddleHeight
    ) {
        ballSpeedX = -ballSpeedX;
    }

    // Score update
    if (ballX < 0 || ballX > canvas.width) {
        resetBall();
    }

    // -------------------------------
    // AI Movement (with imperfection)
    // -------------------------------

    let aiCenter = aiY + paddleHeight / 2;
    let reaction = 0.08; // default for medium

    if (difficulty === "easy") reaction = 0.03; // slow reaction for easy
    if (difficulty === "hard") reaction = 0.12; // faster reaction for hard

    // Chance for the AI to miss
    let missChance = 0.05;  // 5% chance for AI to miss
    if (difficulty === "easy") missChance = 0.15; // higher miss chance on easy
    if (difficulty === "hard") missChance = 0.02; // lower miss chance on hard

    // AI misses occasionally
    if (Math.random() > missChance && ballSpeedX > 0) {
      let dy = (ballY - aiCenter) * reaction;

      // Limit the AI's paddle movement speed
        dy = Math.max(Math.min(dy, 5), -5);

        aiY += dy;
    }

    // Optional: clamp AI within bounds
    aiY = Math.max(Math.min(aiY, canvas.height - paddleHeight), 0);

    // Redraw
    draw();
}  


function gameLoop() {
    update();
    draw();
    animationId = requestAnimationFrame(gameLoop);
}

function startGame() {
    document.getElementById("startBtn").style.display = "none";
    document.getElementById("stopBtn").style.display = "inline-block";
    canvas.style.display = "block";
    gameLoop();
}

function resetGame() {
    playerScore = 0
    aiScore = 0
    resetBall();
    draw();
}

function stopGame() {
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
    document.getElementById("startBtn").style.display = "inline-block";
    document.getElementById("stopBtn").style.display = "none";
}

canvas.addEventListener("mousemove", e => {
    const rect = canvas.getBoundingClientRect();
    playerY = e.clientY - rect.top - paddleHeight / 2;
});

document.getElementById("startBtn").addEventListener("click", startGame);
document.getElementById("stopBtn").addEventListener("click", stopGame);
document.getElementById("resetBtn").addEventListener("click", resetGame);
document.getElementById("difficulty").addEventListener("change", function (e) {
    difficulty = e.target.value;
    resetGame(); // Optional: apply new difficulty immediately
});

};