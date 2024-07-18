//const canvas = document.getElementById("gameCanvas");
// const ctx = canvas.getContext("2d");

// const box = 20;
// const canvasSize = 400;
// const initialSnakeLength = 3;
// let snake = [];
// for (let i = initialSnakeLength - 1; i >= 0; i--) {
//     snake.push({ x: i * box, y: 0 });
// }

// let food = {
//     x: Math.floor(Math.random() * (canvasSize / box)) * box,
//     y: Math.floor(Math.random() * (canvasSize / box)) * box,
// };

// let direction = "RIGHT";
// let score = 0;

// document.addEventListener("keydown", changeDirection);

// function changeDirection(event) {
//     const key = event.keyCode;
//     if (key === 37 && direction !== "RIGHT") {
//         direction = "LEFT";
//     } else if (key === 38 && direction !== "DOWN") {
//         direction = "UP";
//     } else if (key === 39 && direction !== "LEFT") {
//         direction = "RIGHT";
//     } else if (key === 40 && direction !== "UP") {
//         direction = "DOWN";
//     }
// }

// function collision(newHead, snake) {
//     for (let i = 0; i < snake.length; i++) {
//         if (newHead.x === snake[i].x && newHead.y === snake[i].y) {
//             return true;
//         }
//     }
//     return newHead.x < 0 || newHead.y < 0 || newHead.x >= canvasSize || newHead.y >= canvasSize;
// }

// function draw() {
//     ctx.clearRect(0, 0, canvasSize, canvasSize);

//     for (let i = 0; i < snake.length; i++) {
//         ctx.fillStyle = i === 0 ? "green" : "white";
//         ctx.fillRect(snake[i].x, snake[i].y, box, box);
//         ctx.strokeStyle = "red";
//         ctx.strokeRect(snake[i].x, snake[i].y, box, box);
//     }

//     ctx.fillStyle = "red";
//     ctx.fillRect(food.x, food.y, box, box);

//     let snakeX = snake[0].x;
//     let snakeY = snake[0].y;

//     if (direction === "LEFT") snakeX -= box;
//     if (direction === "UP") snakeY -= box;
//     if (direction === "RIGHT") snakeX += box;
//     if (direction === "DOWN") snakeY += box;

//     if (snakeX === food.x && snakeY === food.y) {
//         score++;
//         food = {
//             x: Math.floor(Math.random() * (canvasSize / box)) * box,
//             y: Math.floor(Math.random() * (canvasSize / box)) * box,
//         };
//     } else {
//         snake.pop();
//     }

//     let newHead = { x: snakeX, y: snakeY };

//     if (collision(newHead, snake)) {
//         clearInterval(game);
//         alert("Game Over");
//         return;
//     }

//     snake.unshift(newHead);

//     ctx.fillStyle = "black";
//     ctx.font = "20px Arial";
//     ctx.fillText("Score: " + score, 10, canvasSize - 10);
// }

// let game = setInterval(draw, 100);

//============================================================================//
const gameBoard = document.getElementById("gameBoard");
const context = gameBoard.getContext("2d");
const scoreText = document.getElementById("scoreVal");

const WIDTH = gameBoard.width;
const HEIGHT = gameBoard.height;
// food width and height
const UNIT = 25;

let foodX;
let foodY;
let xVel = 1;
let yVel = 0;
let score = 0;
let Started = false;
let active = true;
let snake = [
  { x: UNIT * 3, y: 0 },
  { x: UNIT * 2, y: 0 },
  { x: UNIT, y: 0 },
  { x: 0, y: 0 },
];
window.addEventListener("keydown", keyPress);

startGame();

function startGame() {
  context.fillStyle = "black";
  context.fillRect(0, 0, WIDTH, HEIGHT);
  createFood();
  displayFood();
  drawSnake();
}

function clearBoard() {
  context.fillStyle = "black";
  context.fillRect(0, 0, WIDTH, HEIGHT);
}

function createFood() {
  foodX = Math.floor((Math.random() * WIDTH) / UNIT) * UNIT;
  foodY = Math.floor((Math.random() * HEIGHT) / UNIT) * UNIT;
}

function displayFood() {
  context.fillStyle = "red";
  context.fillRect(foodX, foodY, UNIT, UNIT);
}

function drawSnake() {
  context.fillStyle = "aqua";
  context.strokeStyle = "black";
  snake.forEach((snakePart) => {
    context.fillRect(snakePart.x, snakePart.y, UNIT, UNIT);
    context.strokeRect(snakePart.x, snakePart.y, UNIT, UNIT);
  });
}

function moveSnake() {
  const head = {
    x: snake[0].x + xVel * UNIT,
    y: snake[0].y + yVel * UNIT,
  };
  snake.unshift(head);
  if (snake[0].x === foodX && snake[0].y === foodY) {
    score += 1;
    scoreText.textContent = score;
    createFood();
  } else {
    snake.pop();
  }
}

function nextTick() {
  if (active) {
    setTimeout(() => {
      clearBoard();
      displayFood();
      moveSnake();
      drawSnake();
      checkGameOver();
      nextTick();
    }, 350);
  } else {
    clearBoard();
    context.font = "bold 50px serif";
    context.fillStyle = "white";
    context.textAlign = "center";
    context.fillText("Game Over", WIDTH / 2, HEIGHT / 2);
  }
}

function keyPress(event) {
  if (!Started) {
    Started = true;
    nextTick();
  }
  const LEFT = 37;
  const UP = 38;
  const RIGHT = 39;
  const DOWN = 40;

  switch (true) {
    case event.keyCode === LEFT && xVel !== 1:
      xVel = -1;
      yVel = 0;
      break;
    case event.keyCode === RIGHT && xVel !== -1:
      xVel = 1;
      yVel = 0;
      break;
    case event.keyCode === UP && yVel !== 1:
      xVel = 0;
      yVel = -1;
      break;
    case event.keyCode === DOWN && yVel !== -1:
      xVel = 0;
      yVel = 1;
      break;
  }
}

function checkGameOver() {
  switch (true) {
    case snake[0].x < 0:
    case snake[0].x >= WIDTH:
    case snake[0].y < 0:
    case snake[0].y >= HEIGHT:
      active = false;
      break;
  }
}
