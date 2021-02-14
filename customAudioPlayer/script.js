const audio= document.getElementById("audio");
const play= document.getElementById("play");
const stop= document.getElementById("stop");
const time= document.getElementById("time");
const inputRange= document.getElementById("progress");


play.addEventListener("click",function(){
     if(audio.paused){
         audio.play();
         play.innerHTML="<i class='fa fa-pause'></i>"
     }
     else{
         audio.pause();
         play.innerHTML="<i class='fa fa-play'></i>";
     }
});

audio.addEventListener("timeupdate",function(){
   inputRange.value= (audio.currentTime/audio.duration)*100;
      let mins=Math.floor(audio.currentTime /60);
      if(mins<10){
          mins="0"+mins;
      }
      
      let secs= Math.floor(audio.currentTime%60);

      if(secs<10){
          secs="0"+secs;
      }

      time.innerHTML=`${mins}:${secs}`;
});

inputRange.addEventListener("change",function(){
    audio.currentTime=(inputRange.value*audio.duration)/100;
});

stop.addEventListener("click",function(){
     if(audio.played){
         audio.currentTime=0;
         audio.pause();
     }
     else{
         audio.currentTime=0;
         audio.pause();
     }
});