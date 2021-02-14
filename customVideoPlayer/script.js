const video= document.getElementById("video");

const play= document.getElementById("play");
const stop= document.getElementById("stop");
const progress= document.getElementById("progress");
const timeStamp = document.getElementById("timeStamp");



video.addEventListener("click",function(){
    if(video.paused){
        video.play();
        play.innerHTML="<i class='fa fa-pause'></i>";
    }
    else{
        video.pause();
        play.innerHTML="<i class='fa fa-play'></i>";
    }
});

play.addEventListener("click",function(){
    if(video.paused){
        video.play();
        play.innerHTML="<i class='fa fa-pause'></i>";
    }
    else{
        video.pause();
        play.innerHTML="<i class='fa fa-play'></i>";
    }
});

video.addEventListener("timeupdate",function(){
    progress.value=(video.currentTime/video.duration)*100;
    
    let mins= Math.floor(video.currentTime/60);
    if(mins<10){
        mins="0"+String(mins);
    }
    let sec= Math.floor(video.currentTime%60);
  if(sec<10){
      sec="0"+String(sec);
  }
     timeStamp.innerHTML=`${mins}:${sec}`;
});

stop.addEventListener("click",function(){
      if(video.paused){
          video.currentTime=0;
          video.pause();
      }
      else{
          video.currentTime=0;
          video.pause();
      }
});

progress.addEventListener("change",function(){
      video.currentTime=(progress.value*video.duration)/100;
});

