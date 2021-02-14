const balance= document.getElementById("balance");
const money_ElOne= document.getElementById("money-plus");
const money_ElTwo= document.getElementById("money-minus");
const list= document.getElementById("list");
const form= document.getElementById("form");
const textInput= document.getElementById("textEnter");
const numberInput= document.getElementById("number");

let transactions=[];
  function updateLocalStorage(){
       localStorage.setItem("transactions",JSON.stringify(transactions));
  }



 function addTransactionToDOM(transaction){
    const sign= (transaction.amount)<0  ? '-' : '+';
    const item= document.createElement("li");
    // item.setAttribute("id",transaction.id);
    item.classList.add((transaction.amount<0) ?'minus' : 'plus');
    item.innerHTML=`
     ${transaction.text}<span>${sign}${Math.abs(transaction.amount)}</span>
     <button class="delete-btn"  onclick="deleteItemFromList(${transaction.id})">x</button>
    `
    list.append(item);
 }

  function deleteItemFromList(id){
        transactions.forEach((transaction,i)=>{
            if(transaction.id===id){
                transactions.splice(i,1);
            }
        })
        init();
  }


   function updateValues(){
           const amounts= transactions.map(transaction=>transaction.amount);
           const expense=(amounts.filter(amount=>amount<0).reduce((acc,amountValue)=>{
                 return acc+Math.abs(amountValue);
             },0)).toFixed(2);

            const income=(amounts.filter(amount=>amount>0).reduce((acc,amountValue)=>{
                return acc+amountValue
            
            },0)).toFixed(2);
            const total=(income-expense).toFixed(2);

            balance.innerText=`$${total}`;
            money_ElOne.innerText=`$${income}`;
            money_ElTwo.innerText=`$${expense}`;
        }

function init(){
    list.innerHTML='';
    transactions.forEach(addTransactionToDOM);
    updateValues();
    updateLocalStorage();
}

// init();
function showHistory(){
    transactions=JSON.parse(localStorage.getItem("transactions"));
    init();
}

showHistory();

function addTransaction(e){
  e.preventDefault();
  if(textInput.value.trim()==='' || numberInput.value===''){
      alert("Please enter text or amount");
  }
  else{
        const obj={
            id:generateRandomId(),
            text:textInput.value,
            amount:+numberInput.value
        }

        transactions.push(obj);
        init();
        textInput.value='';
        numberInput.value='';
  }

}

 function generateRandomId(){
     return Math.random()*1000000;
 }

form.addEventListener("submit",addTransaction);