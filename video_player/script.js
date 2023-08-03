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
const playerSpeed = document.querySelector('.player_speed')

/***** Play and Pause *****/

function showPlayIcon () {
  if (video.ended) {
    playBtn.classList.replace('fa-pause', 'fa-play')
    playBtn.setAttribute('title', 'Play')
  } else {
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

/* Click to seek within the video */
function setProgress (e) {
  //console.log(e)
  const newTime = e.offsetX / progressRange.offsetWidth
  console.log(newTime)
  progressBar.style.width = `${newTime * 100}%`
  video.currentTime = newTime * video.duration
}

/***** Volume Controls *****/

let lastVolume = 1

function volumeChange () {
  if (volume > 0.7) {
    volumeIcon.classList.add('fa-solid', 'fa-volume-high')
  } else if (volume < 0.7 && volume > 0) {
    volumeIcon.classList.add('fa-solid', 'fa-volume-low')
  } else if (volume === 0) {
    volumeIcon.classList.add('fa-solid', 'fa-volume-xmark')
  }
}

/* Click to change volume */
function changeVolume (e) {
  let volume = e.offsetX / volumeRange.offsetWidth
  //console.log(volume)

  //Roumd volume up or down
  if (volume < 0.1) {
    volume = 0
  }
  if (volume > 0.9) {
    volume = 1
  }
  volumeBar.style.width = `${volume * 100}%`
  video.volume = volume
  console.log(volume)
  // Change icon depending on volume
  volumeIcon.className = ''
  /*if (volume > 0.7) {
    volumeIcon.classList.add('fa-solid', 'fa-volume-high')
  } else if (volume < 0.7 && volume > 0) {
    volumeIcon.classList.add('fa-solid', 'fa-volume-low')
  } else if (volume === 0) {
    volumeIcon.classList.add('fa-solid', 'fa-volume-xmark')
  }*/
  volumeChange()
  lastVolume = volume
}
// Mute / unmute
function toggleMute () {
  if (video.volume) {
    lastVolume = video.volume
    video.volume = 0
    volumeBar.style.width = 0
    volumeIcon.classList.add('fa-volume-xmark')
    volumeIcon.setAttribute('title', 'Unmute')
  } else {
    video.volume = lastVolume
    volumeBar.style.width = `${lastVolume * 100}%`
    volumeIcon.classList.remove('fa-volume-xmark')
    volumeIcon.setAttribute('title', 'Mute')

    /*if (volume > 0.7) {
      volumeIcon.classList.add('fa-solid', 'fa-volume-high')
    } else if (volume < 0.7 && volume > 0) {
      volumeIcon.classList.add('fa-solid', 'fa-volume-low')
    } else if (volume === 0) {
      volumeIcon.classList.add('fa-solid', 'fa-volume-xmark')
    }*/
    volumeChange()
  }
}

/***** Change Playback Speed *****/
function changeSpeed () {
  //console.log('video playback rate', video.playbackRate)
  //console.log('selected value', playerSpeed.value)
  video.playbackRate = playerSpeed.value
}

/***** Fullscreen *****/

/***** Event Listeners *****/
playBtn.addEventListener('click', togglePlay)
video.addEventListener('click', togglePlay)

/* On video end, show play button icon */
video.addEventListener('ended', showPlayIcon)

/* As video is playing, update progress bar */
video.addEventListener('timeupdate', updateProgress)
video.addEventListener('canplay', updateProgress)

/* Click to seek within video */
progressRange.addEventListener('click', setProgress)

/* Click to change volume */
volumeRange.addEventListener('click', changeVolume)

/* Click to toggle mute */
volumeIcon.addEventListener('click', toggleMute)

/* Click to change playback speed */
playerSpeed.addEventListener('change', changeSpeed)
