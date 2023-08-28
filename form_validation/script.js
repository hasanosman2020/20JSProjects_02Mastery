const form = document.getElementById('form')
const password1El = document.getElementById('password1')
const password2El = document.getElementById('password2')
const messageContainer = document.querySelector('.message_container')
const message = document.getElementById('message')

let isValid = false

function validateForm () {
  //Using Constraint Validator API
  isValid = form.checkValidity()
  //console.log(isValid)
  //Style main message for an error
  message.textContent = 'Please fill out all fields'
  message.style.color = 'red'
  messageContainer.style.borderColor = 'red'
}
function processFormData (e) {
  //console.log(e)
  e.preventDefault()
  // Validation
  validateForm()
}

//Event Listener
form.addEventListener('submit', processFormData)
