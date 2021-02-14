const container= document.getElementById("container");
const text= document.getElementById("text");


const totalTime=7500;
const holdTime=1500;//hold time 1.5s
const breatheTime=(totalTime-holdTime)/2;

function breathAnimation(){
     text.innerText="Breathe In!";
     container.className="container grow";
     setTimeout(function(){
        text.innerText="Hold On!";
        setTimeout(function(){
          text.innerText="Breathe Out!";
          container.className="container shrink";
        },holdTime)
     },breatheTime)
}

setInterval(function(){
 breathAnimation();
},totalTime)