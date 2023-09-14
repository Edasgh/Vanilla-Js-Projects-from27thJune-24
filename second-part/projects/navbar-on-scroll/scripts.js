//getting the year span of the footer and adding current-year to update the copyright section
const currentYear = document.querySelector(".year");
currentYear.innerHTML = new Date().getFullYear();

// getting the navbar and back-to-top button
const navbar = document.querySelector(".navbar");

const backToTopBtn = document.querySelector(".back-to-top");

// Don't show the back-to-top button on loading the page (cause it's on home section at first)
window.onload = function () {
  backToTopBtn.style.display = "none";
};

// listen the scroll event and show the navbar's white background if user passes a height larger than the navbar's height and fix the navbar on top
window.addEventListener("scroll", () => {
  // Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
  const navbarHeight = navbar.getBoundingClientRect().height;
  const scrollHeight = window.scrollY;
  if (scrollHeight > navbarHeight) {
    navbar.classList.add("fixed-nav");
  } else {
    navbar.classList.remove("fixed-nav");
  }

  //    if user scrolls more than 350px of height, show the back-to-top button
  if (scrollHeight > 350) {
    backToTopBtn.style.display = "";
  } else {
    backToTopBtn.style.display = "none";
  }
});
