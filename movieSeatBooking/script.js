const seatContainer= document.querySelector(".seat-container");
const count= document.getElementById("count");
const total= document.getElementById("total");
const select= document.querySelector("select");
const seats= document.querySelectorAll(".row .seat");
function updateSeatsCount(){
    const selectedSeats= document.querySelectorAll(".row .seat.selected");
    const numOfSeats= selectedSeats.length;
    count.innerText=numOfSeats;
    total.innerText=numOfSeats*select.value;
    
    const selectedSeatsIndexes= [...selectedSeats].map(function(seat){
        return [...seats].indexOf(seat); 
     });
     localStorage.setItem("selectedSeatIndex",JSON.stringify(selectedSeatsIndexes));
}

 function movieIndexandPrice(target){
      const selectedMovieIndex= target.selectedIndex;
      const price= target.value;

      localStorage.setItem("selectedMovieIndex",selectedMovieIndex);
      localStorage.setItem("moviePrice",price);
 }

select.addEventListener("change",function(e){
     updateSeatsCount();
     movieIndexandPrice(e.target);
})

seatContainer.addEventListener("click",function(e){
    if(e.target.classList.contains("seat") && !e.target.classList.contains(".occupied")){
        e.target.classList.toggle("selected");
    }
    updateSeatsCount();
})


populateUI();

function populateUI(){
    const selectedSeatIndx= JSON.parse(localStorage.getItem("selectedSeatIndex"));
    if(selectedSeatIndx !==null && selectedSeatIndx.length !==0){
       [...seats].forEach(function(seat,index){
          if(selectedSeatIndx.indexOf(index)>-1){
              seat.classList.add("selected");
          }
       });
    }
    const selectedMovieIndx= localStorage.getItem("selectedMovieIndex");
    select.selectedIndex= selectedMovieIndx;
    updateSeatsCount();
}


