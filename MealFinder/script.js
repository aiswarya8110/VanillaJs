const search= document.getElementById("search");
const submit= document.getElementById("submit");
const random= document.getElementById("random");
const resultHeading= document.getElementById("result-heading");
const mealsEl= document.getElementById("meals");
const singleMeal_El= document.getElementById("single-meal");

function searchMeal(e){
    e.preventDefault();
    if(search.value===''){
        alert("Enter a meal to search");
    }
    else{
     const mealName= search.value;
     fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
     .then(res=>res.json())
     .then(data=>{
          if(data.meals===null){
            resultHeading.innerHTML=`<h2>Search results for ${search.value} not found! Try Again.</h2>`
          }
          else{
              mealsEl.innerHTML=`
                   ${data.meals.map(meal=>
                     `<div class="meal">
                      <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                      <div class="meal-info"  mealId="${meal.idMeal}">
                      <h3>${meal.strMeal}</h3>
                      </div>
                      </div>
                     `)}`
              
          }  
          search.value='';
     });
    }  
}

  function addMealToDOM(meal){
      const ingredients=[];
      singleMeal_El.innerHTML=`
        
      <h2>${meal.strMeal}</h2>     
      <div class='single-meal'>
           <img src='${meal.strMealThumb}' alt='${meal.strMeal}'>
           </div>

           <div class='single-meal-info' >
           ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
           ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
           </div>

           <main>
           
           ${meal.strInstructions ? `<p>${meal.strInstructions}</p>` : ''}

           <h2>Ingredients</h2>
           <ul>
             ${ingredients.map(ing=>
                `<li>${ing}</li>`
                )}
           </ul>
           </main>
        `
  }

function getMealById(mealID){
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
        .then(res=>res.json())
        .then(data=>{
            const meal= data.meals[0];
            addMealToDOM(meal);
        })
  }

function showMealById(e){
    const mealInfo=e.path.find(item=>{
            if(item.classList){
                return item.classList.contains("meal-info");
            }
            else{
                return false;
            }
        })
        const mealID= mealInfo.getAttribute("mealId");
        getMealById(mealID);
}

function getRandomMeal(){
    resultHeading.innerHTML='';
    mealsEl.innerHTML='';
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then(res=>res.json())
    .then(data=>{
        const meal=  data.meals[0];
        addMealToDOM(meal);
    })
}


submit.addEventListener("submit",searchMeal);
mealsEl.addEventListener("click",showMealById);
random.addEventListener("click",getRandomMeal);