// getting the inputfield and three output paragraphs

const InputField =document.getElementById("InputField");
const outputText1 = document.getElementById("output1");
const outputText2 = document.getElementById("output2");
const outputText3 = document.getElementById("output3");

// function to show output on typing on the inputfield

InputField.addEventListener("keydown",(event)=>{
    outputText1.innerHTML=`You are pressing the <span>"${event.key===" "?"Space":event.key}"</span>  key`
    outputText2.innerHTML=`<span> Code : ${event.code}</span>`
    outputText3.innerHTML=`<span> keyCode : ${event.keyCode}</span>`
})