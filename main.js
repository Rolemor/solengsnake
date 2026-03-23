let blockSize = 25;
let total_row = 17; //total row number
let total_col = 17; //total column number
let board;
let context;

let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

// Set the total number of rows and columns
let speedX = 0;  //speed of snake in x coordinate.
let speedY = 0;  //speed of snake in Y coordinate.

let snakeBody = [];
let score;

let foodX;
let foodY;

let gameOver = false;
let rotationCounter = 0;
let currentRotation = '';

//Define food image
let food_img = new Image();
food_img.src = 'apple.png';

let snakeHead = new Image();
let snake = new Image();

document.addEventListener("keyup", function (e) {
    if (e.code === "KeyR") {
        gameReset();
    }
});

window.onload = function () {
    // Set board height and width
    board = document.getElementById("board");
    board.height = total_row * blockSize;
    board.width = total_col * blockSize;
    context = board.getContext("2d");

    
    placeFood();
    initGame();
    document.addEventListener("keyup", changeDirection);  //for movements
    // Set snake speed
    setInterval(update, 1000 / 10);
}

function update() {
    if (gameOver) {
        return;
    }

    score = snakeBody.length;

    // Background of a Game
    context.fillStyle = "green";
    context.fillRect(0, 0, board.width, board.height);

    // Set score board
    context.fillStyle = "white";
    context.font = "20px Arial";
    context.fillText("Score: " + score, 10, 25);
    context.fillText("currentRotation: " + currentRotation, 10, 50)
    // Set food color and position
    
    context.drawImage(food_img, foodX, foodY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
    }

    // body of snake will grow
    for (let i = snakeBody.length - 1; i > 0; i--) {
        // it will store previous part of snake to the current part
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle = "white";
    snakeX += speedX * blockSize; //updating Snake position in X coordinate.
    snakeY += speedY * blockSize;  //updating Snake position in Y coordinate.
    switch(currentRotation){
        case 'Down': 
        snakeHead.src = 'snakeHeadDown.png';
        context.drawImage(snakeHead, snakeX, snakeY, blockSize, blockSize);
        case 'Up': 
        snakeHead.src = 'snakeHeadUp.png';
        context.drawImage(snakeHead, snakeX, snakeY, blockSize, blockSize);
        case 'Left': 
        snakeHead.src = 'snakeHeadLeft.png';
        context.drawImage(snakeHead, snakeX, snakeY, blockSize, blockSize);
        case 'Right': 
        snakeHead.src = 'snakeHeadRight.png';
        context.drawImage(snakeHead, snakeX, snakeY, blockSize, blockSize);
        case '': 
        snakeHead.src = 'snakeHeadDown.png';
        context.drawImage(snakeHead, snakeX, snakeY, blockSize, blockSize);
    }
    
    for (let i = 0; i < snakeBody.length; i++) {
        switch (currentRotation){
        case 'Up':
            snake.src = 'snakeBodyUp.png';
            context.drawImage(snake,snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
        case 'Down':
            snake.src = 'snakeBodyDown.png';
            context.drawImage(snake,snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
        case 'Left':
            snake.src = 'snakeBodyLeft.png';
            context.drawImage(snake,snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
        case 'Right':
            snake.src = 'snakeBodyRight.png';
            context.drawImage(snake,snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }
    }

    if (snakeX < 0 
        || snakeX > total_col * blockSize 
        || snakeY < 0 
        || snakeY > total_row * blockSize) { 
        
        // Out of bound condition
        gameOver = true;
        alert("Game Over");
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) { 
            
            // Snake eats own body
            gameOver = true;
            alert("Game Over");
        }
    }
}

// Movement of the Snake - We are using addEventListener
function changeDirection(e) {
    if (e.code == "ArrowUp" && speedY != 1) { 
        // If up arrow key pressed with this condition...
        // snake will not move in the opposite direction
        speedX = 0;
        speedY = -1;
        rotationCounter = 0;
        currentRotation = 'Up';
    }
    else if (e.code == "ArrowDown" && speedY != -1) {
        //If down arrow key pressed
        speedX = 0;
        speedY = 1;
        rotationCounter = 0;
        currentRotation = 'Down';
    }
    else if (e.code == "ArrowLeft" && speedX != 1) {
        //If left arrow key pressed
        speedX = -1;
        speedY = 0;
        rotationCounter = 0;
        currentRotation = 'Left';
    }
    else if (e.code == "ArrowRight" && speedX != -1) { 
        //If Right arrow key pressed
        speedX = 1;
        speedY = 0;
        rotationCounter = 0;
        currentRotation = 'Right';
    }
}

// Randomly place food
function placeFood() {

    // in x coordinates.
    foodX = Math.floor(Math.random() * total_col) * blockSize; 
    
    //in y coordinates.
    foodY = Math.floor(Math.random() * total_row) * blockSize; 
}

function initGame() {
    snakeX = blockSize * 5;
    snakeY = blockSize * 5;

    speedX = 0;
    speedY = 0;

    score = 0;

    snakeBody = [];
    gameOver = false;

    placeFood();

    // Optional: clear the board immediately
    context.fillStyle = "green";
    context.fillRect(0, 0, board.width, board.height);
}

function gameReset() {
    initGame();
}