const startBtn = document.getElementById("start-game");
const scoreSpan = document.querySelector(".score-span");
const squares = document.querySelectorAll(".grid div");

const width = 25;
let currentIndex = 0; // so first div in our grid
let appleIndex = 0; // so first div in our grid
let currentSnake = [2, 1, 0]; // length of the snake => 2 for the head, 0 for the tail and 1 for the body from now on

let direction = 1;
let score = 0;
let speed = 0.99;
let intervalTime = 0;
let interval = 0;

// to start, restart the game

function startGame() {
  currentSnake.forEach((index) => squares[index].classList.remove("snake"));
  squares[appleIndex].classList.remove("apple");
  clearInterval(interval);
  score = 0;
  randomApple();
  direction = 1;
  scoreSpan.innerText = score;
  intervalTime = 1000;
  currentSnake = [2, 1, 0];
  currentIndex = 0;
  currentSnake.forEach((index) => squares[index].classList.add("snake"));
  interval = setInterval(moveOutcomes, intervalTime);
}

//function that deals with ALL the outcomes of the Snake
function moveOutcomes() {
  //deals with snake hitting border and snake hitting self
  if (
    (currentSnake[0] + width >= width * width && direction === width) || //if snake hits bottom
    (currentSnake[0] % width === width - 1 && direction === 1) || //if snake hits right wall
    (currentSnake[0] % width === 0 && direction === -1) || //if snake hits left wall
    (currentSnake[0] - width < 0 && direction === -width) || //if snake hits the top
    squares[currentSnake[0] + direction].classList.contains("snake") //if snake goes into itself
  ) {
    return clearInterval(interval); //this will clear the interval if any of the above happen
  }

  const tail = currentSnake.pop();
  squares[tail].classList.remove("snake"); // removes class of the snake from the TAIL
  currentSnake.unshift(currentSnake[0] + direction); // gives the direction to the head of the array

  //deals with snake getting apple
  if (squares[currentSnake[0]].classList.contains("apple")) {
    squares[currentSnake[0]].classList.remove("apple");
    squares[tail].classList.add("snake");
    currentSnake.push(tail);
    randomApple();
    score++;
    scoreSpan.textContent = score;
    clearInterval(interval);
    intervalTime = intervalTime * speed;
    interval = setInterval(moveOutcomes, intervalTime);
  }

  squares[currentSnake[0]].classList.add("snake");
}

//generate new apple after apple is eaten
function randomApple() {
  do {
    appleIndex = Math.floor(Math.random() * squares.length);
  } while (squares[appleIndex].classList.contains("snake"));
  {
    squares[appleIndex].classList.add("apple");
  }
}

//assign function to keycodes

function control(e) {
  squares[currentIndex].classList.remove("snake");

  if (e.keyCode === 39) {
    //right arrow, snake will go right one div
    direction = 1;
  } else if (e.keyCode === 38) {
    //up arrow, the snake will go back ten divs, appearing to go up
    direction = -width;
  } else if (e.keyCode === 37) {
    //left arrow, the snake will go left one div
    direction = -1;
  } else if (e.keyCode === 40) {
    //down arrow, the snake will go more 10 divs where the snake is now, appearing to go down
    direction = +width;
  }
}

document.addEventListener("keyup", control);
startBtn.addEventListener("click", startGame);
