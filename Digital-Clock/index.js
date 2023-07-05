const clockDiv= document.getElementById("clock");

setInterval(()=>{
    let date = new Date();
    clockDiv.innerHTML=date.toLocaleTimeString();
},1000)