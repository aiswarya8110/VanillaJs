const postContainer= document.getElementById("post-container");
const loading= document.querySelector(".loader");
const filter= document.getElementById("filter");

let limit=3;
let page=1;

 function getPosts(){
        fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`)
        .then(res=>res.json())
        .then(data=>{
            const posts= data;
            console.log(posts);
            showPosts(posts);
        })
        
 }
 getPosts();

 function showPosts(posts){
         posts.forEach(post=>{
            const postEl= document.createElement("div"); 
            postEl.classList.add("post");
            postEl.innerHTML=
            `
              <div class="number">${post.id}</div>
              <div class="post-info">
              <h2 class="post-title">${post.title}</h2>
              <div class="post-body">${post.body}</div>
              </div>
             `
             postContainer.appendChild(postEl);
         })}

   function showLoading(){
         loading.classList.add("show");
         setTimeout(function(){
             page++;
            getPosts();
         },0);
         setTimeout(function(){
           loading.classList.remove("show");
         },3000)

   }

  window.addEventListener("scroll",function(){
        const{scrollHeight, scrollTop, clientHeight}=  document.documentElement;           
          
        if(scrollTop+ clientHeight >=scrollHeight-1){
            showLoading();
        }
})
function filterPosts(e){
    const term= e.target.value.toLowerCase();
    const posts=postContainer.querySelectorAll(".post");

    posts.forEach(post=>{
        const title=post.querySelector(".post-title").innerText.toLowerCase();
        const body= post.querySelector(".post-body").innerText.toLowerCase();
        if(title.indexOf(term) >-1 || body.indexOf(term)> -1){
            post.style.display="block";
        }
        else{
            post.style.display="none";
        }
    })
}

filter.addEventListener("input",filterPosts);