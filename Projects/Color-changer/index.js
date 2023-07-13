// getting all the required elements
const Clickbutton = document.querySelector(".changeBgCol");
const Copybutton = document.querySelector(".copyBgCol");
const colorNameText =document.querySelector(".colorName");

// function to change background color on onClick event of the button
function changeColor(){
    let hash="#";
    let num=Math.floor(Math.random()*16777215);
   let hexVal=num.toString(16)
    let color=hash+hexVal;
    document.body.style.backgroundColor=color

    Copybutton.onclick=()=>{
        navigator.clipboard.writeText(color)
        alert("Copied to clipboard!");
     }
    
     colorNameText.innerHTML=`The Current background color is ${color}`;
}

//refference of the function on click
Clickbutton.addEventListener("click",changeColor);

//init call
changeColor();


