const main= document.getElementById("main");
const addUserBtn= document.getElementById("add-user");
const doubleBtn= document.getElementById("double");
const showMillionairesBtn= document.getElementById("show-millionaires");
const sortBtn= document.getElementById("sort");
const calculateWealthBtn= document.getElementById("calculate-wealth");

let data=[];

 async function getRandomUser(){
    let response=  await fetch("https://randomuser.me/api");
    let data=await  response.json();
        let user=data.results[0];
        const obj= {
          name:`${user.name.first} ${user.name.last}`,
          money: Math.floor(Math.random()*1000000)
        }
        inputUserData(obj);
 }

  function inputUserData(obj){
    data.push(obj);
    updateDom();
  }
  
  function updateDom(providedData=data){
     main.innerHTML=`<h2><strong>Person</strong>Wealth</h2>`;

     data.forEach((user)=>{
      const div=  document.createElement("div");
      div.classList.add("person");
      div.innerHTML=`<strong>${user.name}</strong>${convertNumtoCurrency(user.money)}`;
      main.appendChild(div);
     })
  }

   function convertNumtoCurrency(num){
    return "$"+num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
   }

  getRandomUser();
  getRandomUser();
  getRandomUser();

   function doubleMoney(){
      data=  data.map(function(user){
          return {...user,money:user.money*2};
        });
        updateDom();
   }


   function sortByRichest(){
     data= data.sort(function(a,b){
         return a.money-b.money;
      })

      data= data.reverse();
      updateDom();
   }

 function showOnlyMillionaires(){
      data= data.filter((user)=>user.money>1000000);
      updateDom();
 }

 function calculateWealth(){
    const totalWealth =data.reduce((total,user)=>{
       return total+user.money;
    },0)
   let h3= document.createElement("h3");
   h3.innerHTML=`<strong>Total Wealth </strong>${convertNumtoCurrency(totalWealth)}`;
   main.appendChild(h3);
 }


addUserBtn.addEventListener("click",getRandomUser);
doubleBtn.addEventListener("click",doubleMoney);
sortBtn.addEventListener("click",sortByRichest);
showMillionairesBtn.addEventListener("click",showOnlyMillionaires);
calculateWealthBtn.addEventListener("click",calculateWealth);