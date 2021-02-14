const word= document.getElementById("word");
const text= document.getElementById("text");
const scoreEl= document.getElementById("score");
const timeEl= document.getElementById("time");
const endgameEl= document.getElementById("end-game-container");
const settingsBtn= document.getElementById("settings-btn");
const settings= document.getElementById("settings");
const settingsForm= document.getElementById("settings-form");
const difficultySelect= document.getElementById("difficulty");

let score=0;
let time=10;
function addWordToDOM(randomWord){
     word.innerHTML=randomWord;
}

async function getRandomWord(){
    const response = await fetch(`http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=true&minCorpusCount=0&minLength=5&maxLength=15&limit=1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5`);
    const data= await  response.json();
    const randomWord=data[0].word;
    addWordToDOM(randomWord);
}
getRandomWord();


text.focus();

function updateScore(){
    score++
    scoreEl.innerHTML=score;
}

function endgame(){
     endgameEl.innerHTML=`
        <h1>Time ran out!</h1>
        <p>Your score is ${score}</p>
        <button onclick="location.reload()">Reload</button>
     `
     endgameEl.style.display="flex";
}


const timeInterval= setInterval(function(){
     time--;
     timeEl.innerHTML=`${time}s`;  
     if(time===0){
         clearInterval(timeInterval);
         endgame();
     }
},1000)


text.addEventListener("input",function(e){
    const typedWord=e.target.value;
    if(typedWord===word.innerText){

       if(difficultySelect.value==="hard"){
           time+=2;
       }
       else if(difficultySelect.value==="medium"){
           time+=3;
       }
       else{
           time+=5;
       }
       updateScore();
       text.value='';
       getRandomWord();      
    }
})

    let difficulty=localStorage.getItem("difficulty");
    difficultySelect.value= difficulty===null ? 'medium' : difficulty;


difficultySelect.addEventListener("change",function(e){
          difficulty = e.target.value;
          localStorage.setItem("difficulty",difficulty);
})