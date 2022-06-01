//All Selector
const audio = document.querySelector(".audio");
const playPauseBtn = document.querySelector("#play_pause");
const startTime = document.querySelector(".music_player_play .left");
const endTime = document.querySelector(".music_player_play .right");
const progress = document.querySelector(".progress");
const music_popup = document.querySelector(".music_popup");
const listBtn = document.querySelector(".list");
const volbtn = document.querySelector("#volbtn");
const volume_popup = document.querySelector(".volume_popup");
const volume = document.querySelector(".volume");

//Global Variable
let is_playing = false;

//Format Current Time
const timeFormat = (time) => {
  return Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2);
};

//When User Click Play button it's play music if user click again then pause the music
const playPause = () => {
  if (is_playing) {
    audio.pause();
    is_playing = false;
    playPauseBtn.innerHTML = `Play`;
  } else {
    audio.play();
    is_playing = true;
    playPauseBtn.innerHTML = `Pause`;
  }
};

playPauseBtn.addEventListener("click", playPause);

//Set Start And End Time
audio.addEventListener("loadedmetadata", () => {
  console.log("run");
  console.log(timeFormat(audio.currentTime));
  //COnvert Sec to mins
  endTime.innerHTML = timeFormat(audio.duration);
  startTime.innerHTML = timeFormat(audio.currentTime);
});

// UpdateProgress
const updateProgress = () => {
  var styleElem = document.head.appendChild(document.createElement("style"));
  styleElem.innerHTML = `.progress:after{width:${
    (audio.currentTime / audio.duration) * 100
  }%}`;
};

// Update Current Time
audio.addEventListener("timeupdate", () => {
  startTime.innerHTML = timeFormat(audio.currentTime);
  updateProgress();
});

// Update Volume
volume.addEventListener("change", (e) => {
  audio.volume = e.target.value / 100;
});

// When User Click Music Popup Button Fire This function

listBtn.addEventListener("click", () => {
  music_popup.classList.toggle("active");
});

//When User click volme Button Fire this function
volbtn.addEventListener("click", () => {
  volume_popup.classList.toggle("active");
});
