const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");

const generateRandomCol = () => {
  let hash = "#";
  let num = Math.floor(Math.random() * 16777215);
  let hexVal = num.toString(16);
  let color = hash + hexVal;
  return color;
};

let intervalId

function startChangingColor() {
  function changeBgCol() {
    document.body.style.backgroundColor = generateRandomCol();
  }

  intervalId = setInterval(changeBgCol, 1000);

  
}

function stopChangingColor() {
  clearInterval(intervalId);
}

startBtn.addEventListener("click", startChangingColor);

stopBtn.addEventListener("click", stopChangingColor);
