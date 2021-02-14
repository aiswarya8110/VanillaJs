const navMenu= document.getElementById("toggle");
const signUpBtn= document.getElementById("open");
const closeBtn=document.getElementById("close");
const modalContainer=document.getElementById("modal-container");
const nav= document.querySelector("nav");
console.log(nav);
navMenu.addEventListener("click",function(){
     document.body.classList.toggle("show-nav");
});