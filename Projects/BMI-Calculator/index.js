// getting all the required elements
const bmiForm = document.querySelector(".bmiCalc");
const heightInput = document.getElementById("heightInput");
const weightInput = document.getElementById("weightInput");

const outputPg = document.getElementById("output");

// function to execute on submitting the form
bmiForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // initiate the output text here
  let outputText;
  // getting the input fields' values
  const heightVal = parseFloat(heightInput.value);
  const weightVal = parseFloat(weightInput.value);

  // bmi as output | making it till 2nd decimal place
  const bmi = (weightVal / ((heightVal / 100) ** 2)).toFixed(1);

  
// logic to show the result if bmi is not a number
  if (isNaN(bmi)) {
    outputText = "&nbsp; &nbsp;"
  } else {
    //logic to show result as per bmi guide
    switch (true) {
      case bmi < 18.6:
        outputPg.style.color = "#b357b3"
        outputText = `Your BMI is ${bmi} , you are underweight`
        break;

    //   case 18.6 <= bmi <= 24.9: code wasn't executing
      case bmi>=18.6 && bmi<=24.9:
        outputPg.style.color = "#008000"
        outputText = `Your BMI is ${bmi} , your BMI is normal`
        break;

      case bmi > 24.9:
        outputPg.style.color = "#cd2222"
        outputText = `Your BMI is ${bmi} , you are overweight`
        break;

      default:
    
        break;
    }
  }

  //adding the output text to the result paragraphs innerHTML
  outputPg.innerHTML = outputText;
});
