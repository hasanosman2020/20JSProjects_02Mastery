const video = document.querySelector('video')
const progressRange = document.querySelector('.progress_range')
const progressBar = document.querySelector('.progress_bar')
const playBtn = document.getElementById('play_btn')
const volumeIcon = document.getElementById('volume_icon')
const volumeRange = document.querySelector('.volume_range')
const volumeBar = document.querySelector('.volume_bar')
const currentTime = document.querySelector('.time_elapsed')
const duration = document.querySelector('.time_duration')
const fullScreen = document.querySelector('.fullscreen')

/***** Play and Pause *****/
function togglePlay () {
  if (video.paused) {
    video.play()
    playBtn.classList.replace('fa-play', 'fa-pause')
    playBtn.setAttribute('title', 'Pause')
  } else {
    video.pause()
    playBtn.classList.replace('fa-pause', 'fa-play')
    playBtn.setAttribute('title', 'Play')
  }
}

/***** Progress Bar *****/

/***** Volume Controls *****/

/***** Change Playback Speed *****/

/***** Fullscreen *****/

/***** Event Listeners *****/
playBtn.addEventListener('click', togglePlay)
video.addEventListener('click', togglePlay)
