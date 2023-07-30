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

function showPlayIcon () {
  if (video.ended) {
    playBtn.classList.replace('fa-pause', 'fa-play')
    playBtn.setAttribute('title', 'Play')
  }
}

function togglePlay () {
  if (video.paused) {
    video.play()
    playBtn.classList.replace('fa-play', 'fa-pause')
    playBtn.setAttribute('title', 'Pause')
  } else {
    video.pause()
    showPlayIcon()
  }
}

/***** Progress Bar *****/
/* Calculate display time format */
function displayTime (time) {
  let minutes = Math.floor(time / 60)
  let seconds = Math.floor(time % 60)
  /* Make minutes and seconds double digits */
  minutes = minutes > 9 ? minutes : `0${minutes}`
  seconds = seconds > 9 ? seconds : `0${seconds}`
  //console.log('minutes:', minutes, 'seconds:', seconds)
  return `${minutes}:${seconds}`
}

/* Update progress bar as video is playing */
function updateProgress () {
  //console.log('current time', video.currentTime, 'duration', video.duration)
  progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`
  if (video.ended) {
    progressBar.style.width = 0
    //displayTime(64)
  }
  currentTime.textContent = `${displayTime(video.currentTime)} /`
  duration.textContent = `${displayTime(video.duration)}`
}

/***** Volume Controls *****/

/***** Change Playback Speed *****/

/***** Fullscreen *****/

/***** Event Listeners *****/
playBtn.addEventListener('click', togglePlay)
video.addEventListener('click', togglePlay)

/* On video end, show play button icon */
video.addEventListener('ended', showPlayIcon)

/* As video is playing, update progress bar */
video.addEventListener('timeupdate', updateProgress)
video.addEventListener('canplay', updateProgress)
