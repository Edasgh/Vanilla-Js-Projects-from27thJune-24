const video=document.querySelector(".video-container");
const playBtn=document.querySelector(".play");
const pauseBtn=document.querySelector(".pause");

const switchBtn=document.querySelector(".switch");

playBtn.onclick=function(){
    switchBtn.style.transform=`translateX(-5rem)`
    video.play();
}

pauseBtn.onclick=function(){
    switchBtn.style.transform=`translateX(0rem)`
    video.pause();
}