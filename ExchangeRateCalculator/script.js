const currencyElOne= document.getElementById("currency-one");
const amount_one= document.getElementById("amount-one");
const currencyElTwo= document.getElementById("currency-two");
const amount_two= document.getElementById("amount-two");
const rateEl= document.getElementById("rate");
const swap = document.getElementById("swap"); 

function calculate(){
     const selectedCurrencyOne= currencyElOne.value;
     const selectedCurrencyTwo= currencyElTwo.value;
     (async function(){
     let response=await fetch(`https://api.exchangeratesapi.io/latest?base=${selectedCurrencyOne}`)
     let data=await response.json();
     let rate=data.rates[selectedCurrencyTwo]

         rateEl.innerHTML=`1 ${selectedCurrencyOne}=${rate} ${selectedCurrencyTwo}`;
         amount_two.value= (amount_one.value*rate).toFixed(2);
     })()
 }

  function swapCurrencyElValue(){
      const temp= currencyElOne.value;
      currencyElOne.value= currencyElTwo.value;
      currencyElTwo.value=temp;

      calculate();
  }


 swap.addEventListener("click",swapCurrencyElValue);
  


currencyElOne.addEventListener("change",calculate);
amount_one.addEventListener("input",calculate);
currencyElTwo.addEventListener("change",calculate);
