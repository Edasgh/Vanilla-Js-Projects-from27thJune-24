// GETTING ALL THE CARDS AND THE CARDS-CONTAINER 
const cards = document.querySelectorAll(".review-card");
const cardsContainer = document.querySelector(".reviews");


// initiating the index and defining a setter function
let index = 0;
function setIndex(n) {
  index = n;
}


// defining onclick functions of next and previous buttons for each card
cards.forEach((card)=>{
  // previous and next buttons for each card
  const prevBtn = card.querySelector(".prev");
const nextBtn = card.querySelector(".next");

// on clicking the next button increase the index till 3 (0-3) and transform the cards-container
  nextBtn.onclick = function(){
    setIndex(index === 3 ? 0 : index + 1);
    cardsContainer.style.transform = `translateX(-${index * 461}px)`;
    
  
};

// on clicking the previous button decrease the index till 0 (3-0) and transform the cards-container

prevBtn.onclick = function(){
  setIndex(index === 0 ? 3 : index - 1);
  cardsContainer.style.transform = `translateX(-${index * 461}px)`;
  
};

})