const inputContainer = document.getElementById('input_container')
const countdownForm = document.getElementById('countdownForm')
const dateEl = document.getElementById('date_picker')

//Set date Input Min with Today's Date
const today = new Date().toISOString().split('T')[0]
console.log(today)
dateEl.setAttribute('min', today)
