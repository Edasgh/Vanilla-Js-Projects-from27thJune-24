//getting all the div elements of nav-list
const navlistDivs = document.querySelectorAll(".navbar>ul>div")

//getting each div and setting margin-left to 5rem on each div on hover
navlistDivs.forEach((div) => {
  const anchorTag = div.querySelector("a")

  div.onmouseover = function () {
    anchorTag.style.marginLeft = "3rem"
  }

  div.onmouseout = function () {
    anchorTag.style.marginLeft = "1rem"
  }
})

//getting the sidebar, menubar and cross-icon
const sideBar = document.querySelector(".sidebar"),
  menuBar = document.querySelector(".menu-bar"),
  crossIcon = document.querySelector(".cross-icon");
//adding the hide class to sidebar if not hidden
menuBar.onclick=function() {
    sideBar.classList.toggle("hide")
}

crossIcon.onclick=function () {
    sideBar.classList.toggle("hide")
}


