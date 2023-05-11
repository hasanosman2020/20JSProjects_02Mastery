const inputContainer = document.getElementById('input_container')
const countdownForm = document.getElementById('countdownForm')
const dateEl = document.getElementById('date_picker')

const countdownEl = document.getElementById('countdown')
let countdownElTitle = document.getElementById('countdown_title')
const countdownBtn = document.getElementById('countdown_button')
const timeElements = document.querySelectorAll('span')

let countdownTitle = ''
let countdownDate = ''
let countdownValue = Date
let countdownActive

const completeEl = document.getElementById('complete')
const completeElInfo = document.getElementById('complete_info')
const completeBtn = document.getElementById('complete_button')

const second = 1000
const minute = second * 60
const hour = minute * 60
const day = hour * 24

//Set date Input Min with Today's Date
const today = new Date().toISOString().split('T')[0]
console.log('today', today)
dateEl.setAttribute('min', today)

//Populate Countdown / Complete UI
function updateDOM () {
  countdownActive = setInterval(() => {
    const now = new Date().getTime()
    const distance = countdownValue - now
    console.log('distance:', distance)

    const days = Math.floor(distance / day)
    const hours = Math.floor((distance % day) / hour)
    const minutes = Math.floor((distance % hour) / minute)
    const seconds = Math.floor((distance % minute) / second)
    console.log(days, hours, minutes, seconds)

    //Hide Input
    inputContainer.hidden = true

    //If the countdown has ended, show complete
    if (distance < 0) {
      countdownEl.hidden = true
      clearInterval(countdownActive)

      completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`
      completeEl.hidden = false
    } else {
      //Else, show the countdown in progress
      //Populate Countdown
      countdownElTitle.textContent = `${countdownTitle}`
      timeElements[0].textContent = `${days}`
      timeElements[1].textContent = `${hours}`
      timeElements[2].textContent = `${minutes}`
      timeElements[3].textContent = `${seconds}`
      completeEl.hidden = true
      countdownEl.hidden = false
    }
  }, second)
}

//Countdown
function updateCountdown (e) {
  e.preventDefault()
  // console.log(e);
  countdownTitle = e.srcElement[0].value
  countdownDate = e.srcElement[1].value
  console.log(countdownTitle, countdownDate)

  //Check for valid date
  if (countdownDate === '') {
    alert('Please select a date for the countdown.')
  } else {
    //Get number version of current Date, updateDOM
    countdownValue = new Date(countdownDate).getTime()
    console.log('countdownValue:', countdownValue)
    updateDOM()
  }
}

//Reset all values
function reset () {
  //Hide input container, show countdown
  countdownEl.hidden = true
  inputContainer.hidden = false
  completeEl.hidden = true

  //Stop the countdown
  clearInterval(countdownActive)
  //Reset values
  countdownTitle = ''
  countdownDate = ''
}
//Event Listeners
countdownForm.addEventListener('submit', updateCountdown)
countdownBtn.addEventListener('click', reset)
completeBtn.addEventListener('click', reset)
