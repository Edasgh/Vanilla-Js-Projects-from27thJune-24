// getting all the required elements

// game description container
const container = document.querySelector(".container")
const easyGmBtn = document.getElementById("easy");
const hardGmBtn = document.getElementById("hard");


// gameArea 
const gameArea  = document.querySelector(".gameArea");
const noOfValidAttemptsHolder=document.getElementById("no-of-valid-attempts");
const highOrLowValText=document.querySelector(".high-or-low");

const newGameBtn=document.getElementById("newGame");
const gameForm = document.getElementById("gameForm");
const userGuessValInput = document.getElementById("userGuessVal");
const submitBtn=document.getElementById("submitBtn");

const prevAttemptsHolder = document.getElementById("prevAttempts");
const prevGuessesHolder = document.getElementById("prevGuesses");

//hide the game area from screen when user first visits the page
window.onload=function(){
    gameArea.style.display="none"
    newGameBtn.style.display = "none";
}

//initiate userGuess
let userGuesses=[];

//initiate computerGuess
let computerGuess;

// function when the game ends
const endGame=()=>{
    userGuessValInput.setAttribute("disabled",true);
    submitBtn.setAttribute("disabled",true);
}

// function on how to start a new game
const startNewGame=()=>{
   newGameBtn.style.display = "block";
   newGameBtn.addEventListener("click", function () {
      window.location.reload();
     container.style.display="flex";
      gameArea.style.display = "none";
    });
}

// function to start the game and on how to execute the game logic
const startGameAndContinue=(maxAttempts)=>{
  computerGuess=Math.floor(Math.random()*100);
  container.style.display="none"
  gameArea.style.display="flex"

  gameForm.onsubmit=(e)=>{
   e.preventDefault();
    
   let userGuessVal=Number(userGuessValInput.value);

   userGuesses=[...userGuesses,userGuessVal];
   prevAttemptsHolder.innerHTML=userGuesses.length
   prevGuessesHolder.innerHTML=userGuesses

   if(userGuesses.length<maxAttempts){
   
    if(userGuessVal>computerGuess){
        highOrLowValText.innerHTML="Your guess is high!"
        userGuessValInput.value=""
    }else if(userGuessVal<computerGuess){
        highOrLowValText.innerHTML="Your guess is low!"
        userGuessValInput.value=""
    }else{
        highOrLowValText.innerHTML=`Yep! the number is ${userGuessVal} `
        userGuessValInput.value=""
        endGame();
        startNewGame();
       
    }
   }else{
  
    if(userGuessVal>computerGuess){
        highOrLowValText.innerHTML=`You loose! the number was ${computerGuess}`
        userGuessValInput.value=""
        endGame();
        startNewGame();
       
    }else if(userGuessVal<computerGuess){
        highOrLowValText.innerHTML=`You loose! the number was ${computerGuess}`
        userGuessValInput.value=""
        endGame();
        startNewGame();
      
    }else{
        highOrLowValText.innerHTML=`Yep! the number is ${userGuessVal} `
        userGuessValInput.value=""
        endGame();
        startNewGame();
      
    }
   }

  }
  

}

// logic for easy game
const easyGame=()=>{
    let maxAttempts=10;
    noOfValidAttemptsHolder.style.color="#75069e"
    noOfValidAttemptsHolder.innerHTML=`Easy : ${maxAttempts} Attempts`
    startGameAndContinue(maxAttempts);


}

// logic for hard game
const hardGame=()=>{
    let maxAttempts=5;
    noOfValidAttemptsHolder.style.color="#040d90"
    noOfValidAttemptsHolder.innerHTML=`Hard : ${maxAttempts} Attempts`
    startGameAndContinue(maxAttempts);

}


easyGmBtn.onclick=easyGame;
hardGmBtn.onclick=hardGame;




