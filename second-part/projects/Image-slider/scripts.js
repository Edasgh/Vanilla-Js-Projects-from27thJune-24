const carousel=document.querySelector(".carousel-container");
const prevBtn=document.getElementById("previous");
const nextBtn=document.getElementById("next");

const image_index=document.querySelector(".image-index");

let index=0;

function setIndex(n){
index=n;
}

prevBtn.onclick=function(){
    setIndex(index===0?4:index-1);
    image_index.textContent=index+1;
    carousel.style.transform=`translateX(-${index*97}vw)`

}

nextBtn.onclick=function(){
    setIndex(index===4?0:index+1);
    image_index.textContent=index+1;
    carousel.style.transform=`translateX(-${index*97}vw)`
 
   

}

