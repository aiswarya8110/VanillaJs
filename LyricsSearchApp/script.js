const form= document.getElementById("form");
const search= document.getElementById("search");
const result= document.getElementById("result");
const more= document.getElementById("more");

function showData(data){
result.innerHTML=`
<ul class="songs">

${data.data.map(song=>
      `<li>
      <span><strong>${song.artist.name}</strong> - ${song.title}
      </span>
      <button class="btn" artist=${song.artist.name}  songTitle=${song.title}>Get Lyrics</button>
      </li>`
    ).join('')
}

</ul>
`
 
more.innerHTML=`
${data.prev? '<button class="btn">Prev</button>': ''}  
${data.next ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>` : ''}
  
`
}




async function getMoreSongs(url){
    const res=await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
    console.log(res);
    const dat=await res.json();
    showData(dat);
}


async function searchSong(songName){
       const response= await fetch(`https://api.lyrics.ovh/suggest/${songName}`)
       const data =  await response.json();
       console.log(data);
       showData(data);
}



form.addEventListener("submit",function(e){
    e.preventDefault();
    const term= search.value;

    if(!term.trim()){
        alert("Please enter artist or name of song");
    }
    else{
        searchSong(term);
    }
    
})

 async function getLyrics(artist,songTitle){
       const response= await fetch(`https://api.lyrics.ovh/v1/${artist}/${songTitle}`);
       const data = await response.json();
       const lyrics=data.lyrics.replace(/\n/g,'<br>');
       result.innerHTML=`<h1><strong>${artist}</strong>-${songTitle}</h1>
       <p>${lyrics}</p>
       `;
 }


result.addEventListener("click",function(e){
     if(e.target.tagName==="BUTTON"){
        const artist=e.target.getAttribute("artist");
        const songTitle= e.target.getAttribute("songTitle");
        console.log(artist,songTitle);
        getLyrics(artist,songTitle);
     }
})