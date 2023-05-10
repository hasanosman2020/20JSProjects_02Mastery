const inputContainer = document.getElementById('input_container')
const countdownForm = document.getElementById('countdownForm')
const dateEl = document.getElementById('date_picker')

const countdownEl = document.getElementById('countdown')
const countdownElTitle = document.getElementById('countdown_title')
const countdownDtn = document.getElementById('countdown_button')
const timeElements = document.querySelectorAll('span')

let countdownTitle = ''
let countdownDate = ''
let countdownValue = Date

const second = 1000
const minute = second * 60
const hour = minute * 60
const day = hour * 24

//Set date Input Min with Today's Date
const today = new Date().toISOString().split('T')[0]
console.log(today)
dateEl.setAttribute('min', today)

//Populate Countdown / Complete UI
function updateDOM () {
  const now = new Date().getTime()
  const distance = countdownValue - now
  console.log('distance:', distance)

  const days = Math.floor(distance / day)
  const hours = Math.floor((distance % day) / hour)
  const minutes = Math.floor((distance % hour) / minute)
  const seconds = Math.floor((distance % minute) / second)
  console.log(days, hours, minutes, seconds)

  //Populate Countdown
  countdownElTitle.textContent = `${countdownTitle}`
  timeElements[0].textContent = `${days}`
  timeElements[1].textContent = `${hours}`
  timeElements[2].textContent = `${minutes}`
  timeElements[3].textContent = `${seconds}`

  //Hide Input
  inputContainer.hidden = true
  //Show Countdown
  countdownEl.hidden = false
}

//Countdown
function updateCountdown (e) {
  e.preventDefault()
  // console.log(e);
  countdownTitle = e.srcElement[0].value
  countdownDate = e.srcElement[1].value
  console.log(countdownTitle, countdownDate)

  //Get number version of current Date, updateDOM
  countdownValue = new Date(countdownDate).getTime()
  console.log('countdownValue:', countdownValue)
  updateDOM()
}

//Event Listeners
countdownForm.addEventListener('submit', updateCountdown)
