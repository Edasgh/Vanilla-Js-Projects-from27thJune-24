const numCount = document.querySelector(".numCount");

const IncrBtn = document.getElementById("increase")
const ResetBtn=document.getElementById("reset")
const DecrBtn = document.getElementById("decrease")

// initialize count
let count=0;

numCount.innerHTML=count

IncrBtn.addEventListener("click",()=>{
    count++
    numCount.innerHTML=count
})

ResetBtn.addEventListener("click",()=>{
    count=0
    numCount.innerHTML=count
})


DecrBtn.addEventListener("click",()=>{
    count--
    numCount.innerHTML=count
})