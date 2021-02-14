const main= document.querySelector("main");
const voiceSelect= document.getElementById("voices");
const textarea= document.getElementById("text");
const readBtn= document.getElementById("read");
const toggleBtn= document.getElementById("toggle");
const closeBtn= document.getElementById("close");
const textBox= document.getElementById("text-box");
const data=[{
      img:"drink.jpg",
      text:"I'm Thirsty"
},{
    img:"food.jpg",
      text:"I'm Hungry"
}
,{
    img:"tired.jpg",
      text:"I'm Tired"
},
{
    img:"hurt.jpg",
      text:"I'm Hurt"
},
{
    img:"happy.jpg",
      text:"I'm Happy"
},
{
    img:"angry.jpg",
      text:"I'm Angry"
},
{
    img:"sad.jpg",
      text:"I'm Sad"
},
{
    img:"scared.jpg",
      text:"I'm Scared"
},{
    img:"outside.jpg",
      text:"I Want To Go Outside"
},{
    img:"home.jpg",
      text:"I Want to Go Home"
},
{
    img:"school.jpg",
      text:"I Want To Go School"
},
{   img:"grandma.jpg",
      text:"I Want To Go To Grandmas"
}
]

let utter = new SpeechSynthesisUtterance();

  function createBox(item){
    const box= document.createElement("div");
    box.classList.add("box");
    const {img ,text}=item;
    box.innerHTML=`
     <img src=${img}></img>
     <p class="info">${text}</p>
    `
    main.appendChild(box);
    box.addEventListener("click",function(){
          utter.text=`${text}`;
          speechSynthesis.speak(utter);          
    })
  }

  data.forEach(createBox);
   
  let voices=[];

 function addVoiceToSelect(voice){
     const option= document.createElement("option");
     option.value=`${voice.name}`
     option.innerText=`${voice.name} ${voice.lang}`;
     voiceSelect.appendChild(option);
 }

  function getVoices(){
        setTimeout(function(){
           voices= speechSynthesis.getVoices();
           voices.forEach(addVoiceToSelect);
        })
       
  }
 
  speechSynthesis.getVoices();
  getVoices();

 toggleBtn.addEventListener("click",function(){
       textBox.classList.toggle("show");
 })

 closeBtn.addEventListener("click",function(){
    textBox.classList.remove("show");
 });

 voiceSelect.addEventListener("change",function(e){
      const voices= speechSynthesis.getVoices();
      utter.voice=voices.find(voice=>voice.name===e.target.value);
})

readBtn.addEventListener("click",function(){
      utter.text=text.value;
      speechSynthesis.speak(utter);
})