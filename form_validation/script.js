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
  if (!isValid) {
    message.textContent = 'Please fill out all fields'
    message.style.color = 'red'
    messageContainer.style.borderColor = 'red'
  }
  //Check to see if passwords match
  if (password1El.value === password2El.value) {
    passwordsMatch = true
    password1El.style.borderColor = 'green'
    password2El.style.borderColor = 'green'
  } else {
    passwordsMatch = false
    message.textContent = 'Make sure passwords match.'
    message.style.color = 'red'
    messageContainer.style.borderColor = 'red'
    password1El.style.borderColor = 'red'
    password2El.style.borderColor = 'red'
  }
  //If form is valid and passwords match
  if (isValid && passwordsMatch) {
    message.textContent = 'Successfully Registered'
    message.style.color = 'green'
    messageContainer.style.borderColor = 'green'
  }
}
function storeFormData () {
  const user = {
    firstname: form.firstname.value,
    lastname: form.lastname.value,
    email: form.email.value,
    phone: form.phone.value,
    website: form.website.value,
    password: form.password.value
  }
  console.log(user)
}

function processFormData (e) {
  //console.log(e)
  e.preventDefault()
  // Validation
  validateForm()
  //Submit Data if Valid
  if (isValid && passwordsMatch) {
    storeFormData()
  }
}

//Event Listener
form.addEventListener('submit', processFormData)
