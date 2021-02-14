const days= document.getElementById("days");
const hours= document.getElementById("hours");
const minutes= document.getElementById("minutes");
const seconds= document.getElementById("seconds");
const countDown= document.getElementById("countdown");
const load= document.getElementById("img");
const nextYear=document.getElementById("next-year");
const newYear= new Date(`${new Date().getFullYear()+1}`);


function loading(){
     load.style.display="block";
     countDown.style.display="none";
     setTimeout(function(){
         countDown.style.display="flex";
         load.style.display="none";
     }
         ,2000);
}

loading();



function updateTimee(){
    const currentYear= new Date();
    const diff= newYear.getTime()-currentYear.getTime();

    if(diff<0){
        nextYear.innerText=`${currentDate.getFullYear()+1}`;
    }
         
    
    const s=Math.floor(diff/1000)%60;
    const m=Math.floor(diff/1000/60%60);
    const h=Math.floor(diff/1000/60/60%60);
    const d=Math.floor(diff/1000/60/60/24)

    days.innerHTML=(d>9 || d===0)?`${d}` :`0${d}`;
    hours.innerText=(h>9 || h===0) ?`${h}`:`0${h}`;
    minutes.innerText=(m>9 || m===0) ? `${m}`:`0${m}`;
    seconds.innerText=(s>9 || s===0) ? `${s}` :`0${s}`;
}

setInterval(function(){
    updateTimee();
},1000);



