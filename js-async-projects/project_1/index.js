// getting the start and stop button elements
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");

//the function to generate a random color
const generateRandomCol = () => {
  let hash = "#";
  let num = Math.floor(Math.random() * 16777215);
  let hexVal = num.toString(16);
  let color = hash + hexVal;
  return color;
};

// initiate the intervalId
let intervalId

// function to start changing color
function startChangingColor() {
  function changeBgCol() {
    document.body.style.backgroundColor = generateRandomCol();
  }

  intervalId = setInterval(changeBgCol, 1000);

  
}

// function to stop changing color
function stopChangingColor() {
  clearInterval(intervalId);
}


// referrencing the functions to the button click events

startBtn.addEventListener("click", startChangingColor);

stopBtn.addEventListener("click", stopChangingColor);
