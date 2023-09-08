const currentYear = document.querySelector(".year");
currentYear.innerHTML=new Date().getFullYear();

const navbar=document.querySelector(".navbar");

const backToTopBtn=document.querySelector(".back-to-top");

window.onload=function(){
    backToTopBtn.style.display="none"
}

window.addEventListener("scroll",()=>{
    const navbarHeight=navbar.getBoundingClientRect().height;
    const scrollHeight=window.scrollY;
   if(scrollHeight>navbarHeight){
    navbar.classList.add("fixed-nav")
   }else{
    navbar.classList.remove("fixed-nav")
   }

   if(scrollHeight>350){
   backToTopBtn.style.display=""
   }else{
    backToTopBtn.style.display="none"
   }
   
})