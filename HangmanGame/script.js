const wordEl= document.getElementById("word");
const wrongEl= document.getElementById("wrong-letters");
const figurePart= document.getElementsByClassName("figure-part");
const finalMessage= document.getElementById("final-message");
const popup= document.getElementById("popup");
const notification= document.getElementById("notification-container");
const popupContainer= document.getElementById("popup-container");
const lengthFigure= [...figurePart];
const playAgain= document.getElementById("play-button");
const wrongLettersContainer= document.getElementById("wrong-letters-container");
const letterEl= document.getElementsByClassName("letter");

playAgain.addEventListener("click",function(){
     popupContainer.style.display="none";
     wrongLetters.splice(0);
     selectedWord= words[Math.floor(Math.random()*words.length)];
     displayWord();
})



const words=["application","programming","interface","wizard"];

let selectedWord= words[Math.floor(Math.random()*words.length)];
const correctLetters=['a','r','z','p'];
const wrongLetters=[];
function displayWord(){
       wordEl.innerHTML=`
        
       
       `    
}

displayWord();

function showNotification(){
    notification.classList.add("show");

    setTimeout(()=>{
      notification.classList.remove("show");
    },2000)
    
}

 function updateWrongLetterEl(){
     wrongEl.style.display="block";
     wrongEl.innerHTML=`
     ${wrongLetters.length>0 ? `<p>Wrong</p>` : ''}
     ${wrongLetters.map(letter=>
         `<span>${letter}</span>`
     )}
     `
       const figureParts= [...figurePart];
       const wrongLettersNum= wrongLetters.length;
       figureParts.forEach((part,index)=>{
           if(index<wrongLettersNum){
             part.style.display="block";
           }
       })

       if(figureParts.length===wrongLetters.length){
           popupContainer.style.display="block";
           finalMessage.innerHTML=`Unfortunately you lost.`;
       }
    }

 

  function displayWrongLetter(){
      wrongEl.innerHTML=`
          ${wrongLetters.length>0 ? `<p>Wrong</p>` : ''}
          ${wrongLetters.map(letter=>
              `<span>${letter}</span>`
            )}
      ` 
       const figureParts= [...figurePart];
        const wrongLettersNum= wrongLetters.length;
        for(var i=0;i<wrongLettersNum;i++){
             figureParts[i].style.display="block";
        }

        if(figureParts.length===wrongLetters.length){
            popupContainer.style.display="block";
            finalMessage.innerText=`Unfortunately you lost!`;
        }
  }


    window.addEventListener("keydown",function(e){
         
         if(e.keyCode>=65 && e.keyCode<=90){
            const letter = e.key;

            if(selectedWord.includes(letter)){
               if(correctLetters.includes(letter)){
                   displayWord();
               }
               else{
                   correctLetters.push(letter);
                   displayWord();
               }
            }
            else{
                if(wrongLetters.includes(letter)){
                    displayWrongLetter();
                }
                else{
                    wrongLetters.push(letter);
                }
            }
         }
    })