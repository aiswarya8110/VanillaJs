const rulesBtn= document.getElementById("rules-btn");
const closeBtn= document.getElementById("close-btn");
const rulesDiv= document.getElementById("rules")
const score= document.getElementById("score");
const canvas= document.getElementById("canvas");
const ctx= canvas.getContext("2d");

let scoreUpdate=0;

//create ball properties

const ball={
    x:canvas.width/2,
    y:canvas.height/2,
    size:10,
    speed:4,
    direction_x:4,
    direction_y:-4
}

const paddle={
    x:canvas.width/2-40,
    y:canvas.height-20,
    w:80,
    h:10,
    speed:8,
    direction_x:0
}

const bricksRowCount=9;
const bricksColumnCount=5;
const brickInfo={
     w:70,
     h:20,
     offsetX:45,
     offsetY:60,
     padding:10,
     visible:true
}

const bricks=[];

for(let i=0;i<bricksRowCount;i++){
    bricks[i]=[];
    for(let j=0;j<bricksColumnCount;j++){
      const x= i *(brickInfo.w+ brickInfo.padding)+ brickInfo.offsetX;
      const y=j*(brickInfo.h+ brickInfo.padding)+ brickInfo.offsetY;
        bricks[i][j]={x,y, ...brickInfo};
    }
}

function drawBricks(){
    bricks.forEach(column=>{
        column.forEach(brick=>{
            ctx.beginPath();
            ctx.rect(brick.x, brick.y, brick.w, brick.h);
            ctx.fillStyle=brick.visible ? "#0095dd" :"transparent";
            ctx.fill();
            ctx.closePath();
        })
    })
}


function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddle.x,paddle.y,paddle.w, paddle.h);
    ctx.fillStyle="#0095dd";
    ctx.fill();
    ctx.closePath();
}

function drawBall(){
    ctx.beginPath();
    ctx.arc(ball.x, ball.y,ball.size, 0 , Math.PI*2);
    ctx.fillStyle='#0095dd';
    ctx.fill();
    ctx.closePath();
}

function draw(){
    drawBall();
    drawPaddle();
    drawBricks();
}

function update(){
    moveBall();
    clearRectangle();
    movePaddle();
    draw();
    requestAnimationFrame(update);
}

requestAnimationFrame(update);

function clearRectangle(){
      ctx.clearRect(0,0,canvas.width,canvas.height);
}

function movePaddle(){
    paddle.x=paddle.x+paddle.direction_x;
    console.log(paddle.x);
    if(paddle.x+ paddle.w> canvas.width){
        paddle.x=canvas.width-paddle.w;
    }
    if(paddle.x<0){
        paddle.x=0;
    }
}

function moveBall(){
     ball.x= ball.x+ball.direction_x;
     ball.y=ball.y+ball.direction_y;
    //  console.log(ball.y);
   if(ball.x<0){
       ball.direction_x=ball.speed;
   }
   else if(ball.x+ball.size> canvas.width){
      ball.direction_x=-ball.direction_x;
   }
   if(ball.y<0 ||  ball.y>canvas.height){
       ball.direction_y=-ball.direction_y;
   }
   
   //paddle collision

    if(ball.x-ball.size<paddle.x+paddle.w &&
        ball.x+ball.size>paddle.x &&
          ball.y+ball.size>paddle.y
        ){
        ball.direction_y=-ball.direction_y;
    }
       
    bricks.forEach(column=>{
        column.forEach(brick=>{
            if(brick.visible){
                if(ball.x-ball.size<brick.x+brick.w && ball.x+ball.size>brick.x && 
                    ball.y+ball.size> brick.y && ball.y-ball.size<brick.y+brick.h){
                    ball.direction_y=-ball.direction_y;
                    brick.visible=false;
                    scoreUpdate+=1;
                    score.innerText=`${scoreUpdate}`;
                }
                updateScore();
            }
        })
    })
}

function updateScore(){
    if(scoreUpdate===bricksColumnCount*bricksRowCount || ball.y>canvas.height){
        bricks.forEach(column=>{
            column.forEach(brick=>{
                brick.visible=true;
                scoreUpdate=0;
                score.innerText=`${scoreUpdate}`;
                ball.direction_y=-ball.direction_y;
            })
        })
    }
}

function keydown(e){
      if(e.key==="ArrowRight"){
          paddle.direction_x=paddle.speed;
      }
      else if(e.key==="ArrowLeft"){
         paddle.direction_x=-paddle.speed;
      }
}

function keyup(){
   paddle.direction_x=0;
}


window.addEventListener("keydown",keydown);
window.addEventListener("keyup",keyup);

rulesBtn.addEventListener("click",function(){
     rulesDiv.classList.add("show");
});

closeBtn.addEventListener("click",function(){
    rulesDiv.classList.remove("show");
})