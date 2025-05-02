window.onload = function () {

const canvas = document.getElementById("pong");
const ctx = canvas.getContext("2d");

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
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX;
    ballSpeedY = 4 * (Math.random() > 0.5 ? 1 : -1);
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
}

function update() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Player paddle collision
    if (ballX - ballRadius < paddleWidth &&
        ballY > playerY && ballY < playerY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    // AI paddle collision
    if (ballX + ballRadius > canvas.width - paddleWidth &&
        ballY > aiY && ballY < aiY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    // Top/bottom wall bounce
    if (ballY - ballRadius < 0 || ballY + ballRadius > canvas.height) {
        ballSpeedY = -ballSpeedY;
    }

    // Ball out of bounds – reset
    if (ballX < 0 || ballX > canvas.width) {
        resetBall();
    }

    // AI movement (follows ball with delay)
    aiY += (ballY - (aiY + paddleHeight / 2)) * 0.08;
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
};