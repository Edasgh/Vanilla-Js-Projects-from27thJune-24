// Getting the video, play and pause button and the switch button
const video=document.querySelector(".video-container");
const playBtn=document.querySelector(".play");
const pauseBtn=document.querySelector(".pause");

const switchBtn=document.querySelector(".switch");

// If the play-button in clicked switch button will cover the "play" name and the video will be played if paused
playBtn.onclick=function(){
    switchBtn.style.transform=`translateX(-5rem)`
    video.play();
}

// If the pause-button in clicked switch button will cover the "pause" name and the video will be paused if played 
pauseBtn.onclick=function(){
    switchBtn.style.transform=`translateX(0rem)`
    video.pause();
}

