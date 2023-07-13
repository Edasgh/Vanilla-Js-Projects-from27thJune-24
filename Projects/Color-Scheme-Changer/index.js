const clickBtn=document.querySelectorAll("button");
const h2=document.querySelector("h2");

clickBtn.forEach((btn)=>{

    
    btn.addEventListener("click",(e)=>{
        let btnClass=e.target.className
       document.body.style.backgroundColor=btnClass
       h2.innerHTML=`Current background-colour is ${btnClass.slice(0,1).toUpperCase()+btnClass.slice(1)}`
    })
})