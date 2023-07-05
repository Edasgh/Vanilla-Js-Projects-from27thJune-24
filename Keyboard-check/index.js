const InputField =document.getElementById("InputField");
const outputText = document.getElementById("output");

InputField.addEventListener("keydown",(event)=>{
    outputText.innerHTML=`You are pressing the <span>"${event.key}"</span>  key`
})