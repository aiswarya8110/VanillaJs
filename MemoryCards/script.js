const addCard= document.getElementById("show");
const prevBtn= document.getElementById("prev");
const nextBtn= document.getElementById('next');
const hide= document.getElementById("hide");
const currentCard= document.getElementById("current");
const addNewCard= document.getElementById("add-card");
const clearBtn= document.getElementById("clear");
const questionEl= document.getElementById("question");
const answerEl= document.getElementById("answer");
const cardsContainer= document.getElementById("cards-container");
const addContainer= document.getElementById("add-container");

let cardsEl=[];

function getcards(){
    const cards=  JSON.parse(localStorage.getItem("cards"));
    return (cards===null) ? [] : cards;
}
function setData(cardsArray){
    localStorage.setItem("cards",JSON.stringify(cardsArray));
}
let currentActiveCard=0;
function updateCurrentText(){
    currentCard.innerText=`${currentActiveCard+1}/${cardsData.length}`;
}

 function createCards(cards){
     cards.forEach((data,index)=>{
         const card=document.createElement("div");
         card.classList.add("card");
         if(index===0){
             card.classList.add("active");
         }
         card.innerHTML=`
         <div class="inner-card">
         <div class="inner-card-front">
             <p>${data.question}</p>
         </div>
         <div class="inner-card-back">
             <p>${data.answer}</p>
         </div>
     </div>
         `;
         cardsContainer.appendChild(card);
         card.addEventListener("click",function(){
             card.classList.toggle("show-answer");
         })
         updateCurrentText();
         cardsEl.push(card);
     })
 }

let cardsData=[];

function displayCards(){
     cardsData = JSON.parse(localStorage.getItem("cards"));
    if(cardsData){
        createCards(cardsData);
    }
}
displayCards();

addCard.addEventListener("click",function(){
    addContainer.classList.add("show");
})

hide.addEventListener("click",function(){
    addContainer.classList.remove("show");
})

addNewCard.addEventListener("click",function(){
  const question= questionEl.value;
  const answer= answerEl.value;
  if(question.trim() && answer.trim()){
     cardsData.push({
         question:question,
         answer:answer
     })
     addContainer.classList.remove("show");
     localStorage.setItem("cards",JSON.stringify(cardsData))
     window.location.reload();

  }
  else{
      alert("Please enter question or answer");
  }
})

nextBtn.addEventListener("click",function(){
  cardsEl[currentActiveCard].className="card left";
  currentActiveCard++;

   if(currentActiveCard> cardsData.length-1){
       currentActiveCard=cardsData.length-1;
   }


   cardsEl[currentActiveCard].className="card active";
   updateCurrentText();
})


prevBtn.addEventListener("click",function(){
    cardsEl[currentActiveCard].className="card right";
    currentActiveCard--;
    if(currentActiveCard<0){
        currentActiveCard=0;
    }
    cardsEl[currentActiveCard].className="card active";
     updateCurrentText();
})

clearBtn.addEventListener("click",function(){
    localStorage.clear();
    window.location.reload();
})
console.log(location);