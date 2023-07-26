//getting all the question-answer divs
const qaDivs = document.querySelectorAll(".qa");

//for each question if user clicks on plus button , show the answer
qaDivs.forEach((div) => {
  const headingBorder = div.querySelector("hr");
  const answerDiv = div.querySelector(".ans");

  const seeAnsBtn = div.querySelector(".plus-icon");

  seeAnsBtn.onclick = function () {
    this.classList.toggle("fa-square-minus");
    this.classList.toggle("fa-square-plus");
    answerDiv.classList.toggle("hide");
    headingBorder.classList.toggle("hide");
  }
})
