// initializing userTurnChoice, userScore, computerTurnChoice, computerScore

let userTurnChoice;
let userScore = 0;

let computerTurnChoice;
let computerScore = 0;

// setting the score values to the score spans' textContent
const userScore_El = document.querySelector(".user-score");
const computerScore_El = document.querySelector(".comp-score");

userScore_El.textContent = userScore < 10 ? `0${userScore}` : userScore;
computerScore_El.textContent =
  computerScore < 10 ? `0${computerScore}` : computerScore;

//getting the result heading and action-message
const result_h2 = document.querySelector(".result_h2");
const action_msg = document.querySelector(".action-msg");

//creating the game function to get user and computer scores and if the user wins or loses

function game() {

  //creating combinations for the user or the computer to win or for match draw
  const userWins =
    (userTurnChoice == "paper" && computerTurnChoice == "rock") ||
    (userTurnChoice == "scissor" && computerTurnChoice == "paper") ||
    (userTurnChoice == "rock" && computerTurnChoice == "scissor");
  const computerWins =
    (userTurnChoice == "rock" && computerTurnChoice == "paper") ||
    (userTurnChoice == "scissor" && computerTurnChoice == "rock") ||
    (userTurnChoice == "paper" && computerTurnChoice == "scissor");
  const matchDraw =
    (userTurnChoice == "paper" && computerTurnChoice == "paper") ||
    (userTurnChoice == "scissor" && computerTurnChoice == "scissor") ||
    (userTurnChoice == "rock" && computerTurnChoice == "rock");

//initializing the choices text to be shown
  const Turnchoices = `(${userTurnChoice.toUpperCase()})<sub>You</sub> , (${computerTurnChoice.toUpperCase()})<sub>Comp</sub> &nbsp; &nbsp;`;

  // if the user or the computer wins, show their respective messages and increment scores
  if (userWins) {
    const message = `You Win &#128515; !!`;
    action_msg.innerHTML = message;
    result_h2.innerHTML = `${Turnchoices}  ${message}`;
    //updating the score (increment by 1) if user wins
    userScore += 1;
    userScore_El.textContent = userScore < 10 ? `0${userScore}` : userScore;
  }

  if (computerWins) {
    const message = `You loose &#128557; !!`;
    action_msg.innerHTML = message;
    result_h2.innerHTML = `${Turnchoices}  ${message}`;
    //updating the score (increment by 1) if computer wins
    computerScore += 1;
    computerScore_El.textContent =
      computerScore < 10 ? `0${computerScore}` : computerScore;
  }


  //if the result is draw then show its respective messages
  if (matchDraw) {
    const message = `Draw &#128528; !!`;
    action_msg.innerHTML = message;
    result_h2.innerHTML = `${Turnchoices}  ${message}`;
  }


}

//computerTurn function gets the random choice of computer and stores it in a variable
function computerTurn() {
  const choices = ["rock", "paper", "scissor"];
  const randomResult = Math.floor(Math.random() * 3);
  computerTurnChoice = choices[randomResult];
}

//getting all the choice buttons and listening click event for each element
const choice_Buttons = document.querySelectorAll(".choice-button");

//on clicking each choice get the user choice (the button's id) and the computer choice and run the game function to get scores and results
choice_Buttons.forEach((button) => {
  button.onclick = function () {
    userTurnChoice = button.id;
    computerTurn();
    game();
  };
});
