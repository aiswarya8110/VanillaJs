const musicContainer= document.getElementById("music-container");
const playBtn= document.getElementById("play");
const nextBtn= document.getElementById("next");
const prevBtn= document.getElementById("prev");

const audio= document.getElementById("audio");
const progress= document.getElementById("progress");
const progressContainer= document.getElementById("progress-container");
const title= document.getElementById("title");
const img= document.getElementById("cover");

const songs=["hey","summer","ukulele"];
let songIndex= 0;
function loadSong(songName){
title.innerText=`${songName}`;
  img.src=`images/${songName}.jpg`;
  audio.src=`songs/${songName}.mp3`; 
}
loadSong(songs[songIndex]);

function pauseSong(){
    musicContainer.classList.remove("play"); 
    playBtn.innerHTML=`<i class='fa fa-play'></i>`;
    audio.pause();
}

function playSong(){
    musicContainer.classList.add("play");
    playBtn.innerHTML=`<i class='fa fa-pause'></i>`;
    audio.play();
}

function playPrevSong(){
    songIndex--;
    if(songIndex<0){
        songIndex=songs.length-1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

function playnextSong(){
    songIndex++;
    if(songIndex>songs.length-1){
        songIndex=0;
    }
    loadSong(songs[songIndex])
    playSong();
}

function updateProgress(){
    progress.style.width=  `${(audio.currentTime/audio.duration)*100}%`;
    
}

function updateAudio(e){
    const pointClicked= e.offsetX;
    const width= progressContainer.clientWidth;
    audio.currentTime= (pointClicked/width)*audio.duration;
}


playBtn.addEventListener('click',function(){
    musicContainer.classList.contains("play") ? pauseSong() : playSong();
});

prevBtn.addEventListener("click",playPrevSong);
nextBtn.addEventListener("click",playnextSong);
audio.addEventListener("timeupdate",updateProgress);
progressContainer.addEventListener("click",updateAudio);