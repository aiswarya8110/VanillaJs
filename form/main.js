const username= document.getElementById("username");
const email= document.getElementById("email");
const password= document.getElementById("password");
const password2= document.getElementById("password2");
const form= document.getElementById("form");

   function showErrorMessage(input,message){
        input.className="error";
        const small=input.parentElement.querySelector("small");
        small.className="errorVisibility";
        small.innerText=message;
        
    
}

function showSuccessMessage(input){
        input.className="success";     
    
}
//validating email
  function validEmail(email){
   const reg=/[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
    if( reg.test(String(email.value).toLowerCase())){
        showSuccessMessage(email);
    }
    else{
        showErrorMessage(email,`Invalid email`);
    }

  }

//matching both passwords
  function matchConfirmPassword(password2){
     if(password2===password.value){
        showSuccessMessage(password2); 
        }
     else{
        showErrorMessage(password2,`Password didn't match. Re-type password `); 
     }
  }
// converting name field to uppercase
   function firstLetterUpperCase(nameField){
        return  nameField.charAt(0).toUpperCase()+nameField.slice(1);
   }
//checking the required fields
     function checkRequired(...inputArray){
        inputArray.forEach(function(input){
              if(input.value===""){
                  showErrorMessage(input,`${firstLetterUpperCase(input.id)} is required`);
              }
              else{
                checkLengthUsername(username,3,10);
                checkLengthPassword(password,4,15);
                validEmail(email);
                matchConfirmPassword(password2.value);
              }
        })
    }

    //check length of username
   function checkLengthUsername(username,min,max){
           if(username.value.length<min || username.value.length>max){
               showErrorMessage(username,`${firstLetterUpperCase(username.id)} should be between ${min} - ${max} characters`);
           }
           else{
               showSuccessMessage(username);
           }
   }
//check length of password
   function checkLengthPassword(password,min,max){
         if((password.value.length>0 && password.value.length<min) || password.value.length>max ){
             showErrorMessage(password,`${firstLetterUpperCase(password.id)} should be between ${min} and ${max} characters`);
         }
         else{
             showSuccessMessage(password);
         }
   }

//adding Event Listener to form
form.addEventListener("submit",function(e){
    e.preventDefault();
     checkRequired(username,email,password,password2);
     
});

