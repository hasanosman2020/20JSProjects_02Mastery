const modal = document.getElementById('modal')
const showModal = document.getElementById('show_modal')
const modalContainer = document.querySelector('modal_container')
const websiteNameEl = document.getElementById('website_name')
const websiteUrlEl = document.getElementById('website_url')
const closeModal = document.getElementById('close_modal')

/* Functions */
function modalShow () {
  modal.classList.add('show_modal')
  websiteNameEl.focus()
}

function modalClose () {
  modal.classList.remove('show_modal')
}

/* Event Listeners */
showModal.addEventListener('click', modalShow)
closeModal.addEventListener('click', modalClose)
