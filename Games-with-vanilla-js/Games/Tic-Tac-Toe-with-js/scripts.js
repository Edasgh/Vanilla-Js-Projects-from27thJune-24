// getting the divs (children of the ".grid-board" div)
const grid_boxes = document.querySelectorAll(".grid-board div"),
  array_of_grid_boxes = Array.from(grid_boxes);

// the turn-showing / result showing text (paragraph element), the score-showing "p" element and the game-start button
const turn_text = document.querySelector(".turn-text"),
  score_text = document.querySelector(".score-text"),
  start_btn = document.querySelector(".start");

const values = ["X", "O"];
//putting "X" and "O" values to an array to randomly get a value by using randomIndex( can be 0 or 1)

let turns = 0, // set turns to 0 at first, when no one tapped any box and set turns to 9 or 9++ when all the boxes are filled=>game over
  randomIndex = Math.floor(Math.random() * values.length),
  prevTurnInfos = [];

let generatedVal = values[randomIndex]; // "X" or "O"
turn_text.textContent = `Turn for "${generatedVal}"`;
//initiating the currentTurn, xWins & oWins (if the xWins or oWins when turns<=9), xScores & oScores (the scores of "X" and "O" at that time), isAnyWin (if any user already won currently or not; returns boolean value)
let currentTurn,
  xWins,
  xScores = 0,
  oWins,
  oScores = 0,
  isAnyWin = xWins || oWins;

// initiating the score-text
score_text.innerHTML = ` <span title="X's score : ${xScores}">"X" :<b> ${xScores} </b></span> and <span title="O's score: ${oScores}"> "O" : <b> ${oScores}</b></span>`;

const winning_combinations = [
  //winning_combinations_by_col
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  //winning_combinations_by_row
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  //winning_combination_by_diagonals
  [2, 4, 6],
  [0, 4, 8],
];

start_btn.addEventListener("click", startOrRestartGame);

// function which resets all the required values and restart the game if it has already been started
function startOrRestartGame() {
  turns = 0;
  randomIndex = Math.floor(Math.random() * values.length);
  prevTurnInfos = [];

  generatedVal = values[randomIndex];
  turn_text.textContent = `Turn for "${generatedVal}"`;
  xWins = false;
  oWins = false;
  isAnyWin = xWins || oWins;

  array_of_grid_boxes.forEach((box) => {
    box.textContent = "";
  });
}

// function to access the values to know who won and if anybody won or not
function winGame() {
  //creating the xIndexes array
  let xIndexes = prevTurnInfos.map((obj) => (obj.val === "X" ? obj.i : null));
  xIndexes = xIndexes.filter((element) => typeof element === "number"); // indexes of boxes where user put "X" value

  // check if every element in any array in the winning_combinations array includes in the definded indexes array
  function isEveryElementInxIndexes(combination) {
    if (xIndexes.length >= 3) {
      // checks if every element in the array includes in xIndexes array
      return combination.every((element) => xIndexes.includes(element));
    }
  }

  // Check if any array inside winning_combinations satisfies the condition defined in the function
  xWins = winning_combinations.some(isEveryElementInxIndexes);

  //////////////////////////////////////////////////////////

  // creating the oIndexes array
  let oIndexes = prevTurnInfos.map((obj) => (obj.val === "O" ? obj.i : null));
  oIndexes = oIndexes.filter((element) => typeof element === "number"); //indexes of boxes where user put "O" value

  // check if every element in any array in the winning_combinations array includes in the definded indexes array
  function isEveryElementInoIndexes(combination) {
    if (oIndexes.length >= 3) {
      // checks if every element in the array includes in oIndexes array
      return combination.every((element) => oIndexes.includes(element));
    }
  }

  // Check if any array inside winning_combinations satisfies the condition defined in the function
  oWins = winning_combinations.some(isEveryElementInoIndexes);

  //increase the score and show on the screen who won the game
  if (xWins) {
    xScores++;
    score_text.innerHTML = ` <span title="X's score : ${xScores}">"X" :<b> ${xScores} </b></span> and <span title="O's score: ${oScores}"> "O" : <b> ${oScores}</b></span>`;
    turn_text.textContent = "X won the game!";
    oWins = false;
  } else if (oWins) {
    oScores++;
    score_text.innerHTML = ` <span title="X's score : ${xScores}">"X" :<b> ${xScores} </b></span> and <span title="O's score: ${oScores}"> "O" : <b> ${oScores}</b></span>`;
    turn_text.textContent = "O won the game!";
    xWins = false;
  }

  isAnyWin = xWins || oWins; //true if not draw
}

// get the current turn and show on the screen
function getCurrentTurn(generatedVal) {
  if (turns < 9) {
    if (generatedVal === values[0]) {
      currentTurn = values[1];
      turn_text.textContent = `Turn for "${currentTurn}"`;
    } else {
      currentTurn = values[0];
      turn_text.textContent = `Turn for "${currentTurn}"`;
    }
  } else {
    if (!xWins || !oWins) {
      turn_text.textContent = "Match draw!";
    }
  }
}

//play function runs when user clicks on any box
function play(generatedVal, box, index) {
  if (box.textContent === "") {
    box.textContent = generatedVal;
    turns++; //increse the number per turn;
    //push the index of the box and the value as entries of an obj to the array per turn;
    prevTurnInfos.push({ i: index, val: generatedVal });
    //show the current Turn value or if at last, the match is draw; runs everytime user clicks any box
    getCurrentTurn(generatedVal);
    winGame();
  }
}

array_of_grid_boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    if (turns <= 9 && !isAnyWin) {
      if (turns === 0) {
        play(generatedVal, box, index);
      } else if (turns > 0) {
        let prevTurn = prevTurnInfos[turns - 1].val;
        if (prevTurn === values[0]) {
          generatedVal = values[1];
          play(generatedVal, box, index);
        } else {
          generatedVal = values[0];
          play(generatedVal, box, index);
        }
      }
    }
  });
});
