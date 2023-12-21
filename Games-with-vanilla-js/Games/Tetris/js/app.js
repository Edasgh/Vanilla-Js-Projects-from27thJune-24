const startBtn = document.querySelector(".start-btn");
const displaySquares = document.querySelectorAll(".prev-grid div");

const grid = document.querySelector(".grid");
let squares = Array.from(grid.querySelectorAll("div"));

const grid_width = 10;
const grid_height = 20;
const grid_size = grid_width * grid_height;
//current position of the tetromino
let currentPosition = 4;
let currentRotation = 0;

let timerId;

//assign keys to the function
function control(e) {
  if (e.keyCode === 39) {
    moveRight();
  } else if (e.keyCode === 38) {
    rotate();
  } else if (e.keyCode === 37) {
    moveLeft();
  } else if (e.keyCode === 40) {
    moveDown();
  }
}

document.addEventListener("keyup", control);

//The Tetrominoes
const lTetromino = [
  [1, grid_width + 1, grid_width * 2 + 1, 2],
  [grid_width, grid_width + 1, grid_width + 2, grid_width * 2 + 2],
  [1, grid_width + 1, grid_width * 2 + 1, grid_width * 2],
  [grid_width, grid_width * 2, grid_width * 2 + 1, grid_width * 2 + 2],
];

const zTetromino = [
  [0, grid_width, grid_width + 1, grid_width * 2 + 1],
  [grid_width + 1, grid_width + 2, grid_width * 2, grid_width * 2 + 1],
  [0, grid_width, grid_width + 1, grid_width * 2 + 1],
  [grid_width + 1, grid_width + 2, grid_width * 2, grid_width * 2 + 1],
];

const tTetromino = [
  [1, grid_width, grid_width + 1, grid_width + 2],
  [1, grid_width + 1, grid_width + 2, grid_width * 2 + 1],
  [grid_width, grid_width + 1, grid_width + 2, grid_width * 2 + 1],
  [1, grid_width, grid_width + 1, grid_width * 2 + 1],
];

const oTetromino = [
  [0, 1, grid_width, grid_width + 1],
  [0, 1, grid_width, grid_width + 1],
  [0, 1, grid_width, grid_width + 1],
  [0, 1, grid_width, grid_width + 1],
];

const iTetromino = [
  [1, grid_width + 1, grid_width * 2 + 1, grid_width * 3 + 1],
  [grid_width, grid_width + 1, grid_width + 2, grid_width + 3],
  [1, grid_width + 1, grid_width * 2 + 1, grid_width * 3 + 1],
  [grid_width, grid_width + 1, grid_width + 2, grid_width + 3],
];

const theTetrominoes = [
  lTetromino,
  zTetromino,
  tTetromino,
  oTetromino,
  iTetromino,
];

// randomly select tetromino
let random = Math.floor(Math.random() * theTetrominoes.length);
let current = theTetrominoes[random][currentRotation];

//draw the current tetromino
function draw() {
  if (current.length !== 0) {
    current.forEach((index) => {
      squares[currentPosition + index].classList.add("block");
    });
  }
}

//undraw the tetromino
function undraw() {
  if (current.length !== 0) {
    current.forEach((index) => {
      squares[currentPosition + index].classList.remove("block");
    });
  }
}

// move the shape down
const moveDown = () => {
  undraw();
  currentPosition = currentRotation += grid_width;
  draw();
  freeze();
};

// move the shape left and prevent collisions with the shapes while moving left

const moveRight = () => {
  undraw();
  const isAtRightEdge = current.some(
    (index) => (currentPosition + index) % grid_width === grid_width - 1
  );
  if (!isAtRightEdge) currentPosition += 1;
  if (
    current.some((index) =>
      squares[currentPosition + index].classList.contains("block2")
    )
  ) {
    currentPosition -= 1;
  }

  draw();
};

const moveLeft = () => {
  undraw();
  const isAtLeftEdge = current.some(
    (index) => (currentPosition + index) % grid_width === 0
  );
  if (!isAtLeftEdge) currentPosition -= 1;
  if (
    current.some((index) =>
      squares[currentPosition + index].classList.contains("block2")
    )
  ) {
    currentPosition += 1;
  }
  draw();
};

// rotate tetromino
function rotate() {
  undraw();
  currentRotation++;
  if (currentRotation === current.length) {
    currentRotation = 0;
  }
  current = theTetrominoes[random][currentRotation];
  draw();
}

// show the coming tetromino in displaySquares
const displayWidth = 4;
const displayIndex = 0;
let nextRandom = 0;

const smallTetrominos = [
  [1, displayWidth + 1, displayWidth * 2 + 1, 2], //lTetromino
  [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], //zTetromino
  [1, displayWidth, displayWidth + 1, displayWidth + 2], // tTetromino
  [0, 1, displayWidth, displayWidth + 1], //oTetromino
  [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1], //iTetromino
];

function displayShape() {
  displaySquares.forEach((square) => {
    square.classList.remove("block");
  });
  smallTetrominos[nextRandom].forEach((index) => {
    displaySquares[displayIndex + index].classList.add("block");
  });
}

// displayShape();

function freeze() {
  // if block has settled
  if (
    current.some(
      (index) =>
        squares[currentPosition + index + grid_width].classList.contains(
          "block3"
        ) ||
        squares[currentPosition + index + grid_width].classList.contains(
          "block2"
        )
    )
  ) {
    // make it block2
    current.forEach((index) =>
      squares[index + currentPosition].classList.add("block2")
    );
    // start a new tetromino falling
    random = nextRandom;
    nextRandom = Math.floor(Math.random() * theTetrominoes.length);
    current = theTetrominoes[random][currentRotation];
    currentPosition = 4;
    draw();
    displayShape();
  }
}

startBtn.addEventListener("click", () => {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  } else {
    draw();
    timerId = setInterval(moveDown, 1000);
    nextRandom = Math.floor(Math.random() * theTetrominoes.length);
    displayShape();
  }
});
