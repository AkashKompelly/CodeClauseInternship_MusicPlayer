var container = document.querySelector(".container");
var songName = container.querySelector("#songName");
var artist = container.querySelector("#artist");
var songImg = container.querySelector("#song-img");
var song = container.querySelector("#song");
var playBtn = container.querySelector("#play");
var nextBtn = container.querySelector("#next");
var backBtn = container.querySelector("#back");
var range = container.querySelector("#progress");
var playlist = container.querySelector("#playlist");
var playlistMenu = container.querySelector("#playlistMenu");
var songListBottom = container.querySelector(".songsPlaylist");
var closeBtn = container.querySelector("#closeBtn");
var ulTag = container.querySelector("ul");
var musicBtn = container.querySelector("#music");

musicIndex = 1;

window.addEventListener("load", () => {
  loadMusicData(musicIndex);
});

// loadmusic method
function loadMusicData(indexNum) {
  songName.innerHTML = songs[indexNum - 1].songName;
  artist.innerHTML = songs[indexNum - 1].artistName;
  artist.innerHTML = songs[indexNum - 1].artistName;
  songImg.src = songs[indexNum - 1].songImg;
  song.src = songs[indexNum - 1].songSrc;
}

// playMusic funtion
function playMusic() {
  playBtn.classList.remove("fa-circle-play");
  playBtn.classList.add("fa-circle-pause");
  song.play();
  var previouslyPlaying = document.querySelector(".playing");
  if (previouslyPlaying) {
    previouslyPlaying.classList.remove("playing");
  }
  for (var i = 0; i < liList.length; i++) {
    if (liList[i].getAttribute("li-index") == musicIndex) {
      liList[i].classList.add("playing");
      break;
    }
  }
}

// pause music function
function pauseMusic() {
  playBtn.classList.add("fa-circle-play");
  playBtn.classList.remove("fa-circle-pause");
  song.pause();
  
}

// play btn addEventListener
playBtn.addEventListener("click", () => {
  if (playBtn.classList.contains("fa-circle-play")) {
    song.currentTime = range.value;
    playMusic();
  } else {
    song.currentTime = range.value;
    pauseMusic();
  }
});

// next Btn addEventListener
nextBtn.addEventListener("click", () => {
  musicIndex++;
  if (musicIndex > songs.length) {
    musicIndex = 1;
  } else {
    musicIndex = musicIndex;
  }
  loadMusicData(musicIndex);
  playMusic();
});

// back btn addEventListener
backBtn.addEventListener("click", () => {
  musicIndex--;
  if (musicIndex < 1) {
    musicIndex = songs.length;
  } else {
    musicIndex = musicIndex;
  }
  loadMusicData(musicIndex);
  playMusic();
});

// setting range on loading song
song.addEventListener("loadeddata", () => {
  range.max = song.duration;
});

// changing range value when song time updated
song.addEventListener("timeupdate", (e) => {
  range.value = song.currentTime;
});

// changing song time on range change
range.addEventListener("change", () => {
  song.currentTime = range.value;
  playMusic();
});

// playlist btn event
playlist.addEventListener("click", () => {
  if (playlist.classList.contains("fa-repeat")) {
    playlist.classList.remove("fa-repeat");
    playlist.classList.add("fa-shuffle");
  } else {
    playlist.classList.add("fa-repeat");
    playlist.classList.remove("fa-shuffle");
  }
});

// when song completed automatically playing nxt song
song.addEventListener("ended", () => {
  if (playlist.classList.contains("fa-repeat")) {
    musicIndex++;
    if (musicIndex > songs.length) {
      musicIndex = 1;
    } else {
      musicIndex = musicIndex;
    }
    loadMusicData(musicIndex);
    playMusic();
  } else if(playlist.classList.contains("fa-shuffle")) {
    song.currentTime = 0;
    var rindex = Math.floor(Math.random() * songs.length + 1);
    loadMusicData(rindex + 1);
    playMusic();
  }
});

// playlistMenu event
playlistMenu.addEventListener("click", () => {
  songListBottom.classList.add("show");
});

// closeBtn event
closeBtn.addEventListener("click", () => {
  songListBottom.classList.remove("show");
});

// loading songs to playlist
for (var i = 0; i < songs.length; i++) {
  let liTag = `<li li-index=${i + 1}>
  <h3 id="songName">${songs[i].songName}</h3>
  <p id="artist">${songs[i].artistName}</p>
  <audio id="song">
        <source src="${songs[i].songSrc}" type="audio/mpeg" />
      </audio>
</li>`;
  ulTag.insertAdjacentHTML("beforeend", liTag);
}

var liList = container.querySelectorAll("li");

// add event to all the songs in playlist
liList.forEach((element) => {
  element.addEventListener("click", () => {
    musicIndex = element.getAttribute("li-index");

    loadMusicData(musicIndex);
    playMusic();
    for (var j = 0; j < liList.length; j++) {
      var playing = liList[j];

      if (playing.classList.contains("playing")) {
        liList[j].classList.remove("playing");
      }
    }
    element.classList.add("playing");
  });
});

// music btn event ( mute and unmute song)
musicBtn.addEventListener("click", () => {
  if (musicBtn.classList.contains("fa-volume-xmark")) {
    musicBtn.classList.remove("fa-volume-xmark");
    musicBtn.classList.add("fa-volume-high");
    song.muted = false;
  } else {
    musicBtn.classList.add("fa-volume-xmark");
    musicBtn.classList.remove("fa-volume-high");
    song.muted = true;
  }
});
