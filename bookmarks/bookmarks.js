const modal = document.getElementById('modal')
const showModal = document.getElementById('show_modal')
const modalContainer = document.querySelector('modal_container')
const websiteNameEl = document.getElementById('website_name')
const websiteUrlEl = document.getElementById('website_url')
const closeModal = document.getElementById('close_modal')
const bookmarksContainer = document.getElementById('bookmarks_container')
const bookmarksForm = document.getElementById('bookmark_form')

const bookmarks = []

/* Functions */
function modalShow () {
  modal.classList.add('show_modal')
  websiteNameEl.focus()
}

/*function modalClose () {
  modal.classList.remove('show_modal')
}*/

/* Modal Event Listeners */
showModal.addEventListener('click', modalShow)
closeModal.addEventListener('click', () => modal.classList.remove('show_modal'))

window.addEventListener('click', e =>
  e.target === modal ? modal.classList.remove('show_modal') : false
)
//Fetch bookmarks
function fetchBookmarks () {
  //Get bookmarks from local storage if available
  if (localStorage.getItem('bookmark')) {
    bookmarks = JSON.parse(localStorage.getItem('bookmark'))
  } else {
    //Create bookmarks array in local storage
    bookmarks = [
      {
        name: 'Hasan Osman',
        url: 'https://hasanosman.design'
      }
    ]
    localStorage.setItem('bookmark', JSON.stringify(bookmarks))
  }
  console.log(bookmarks)
}

// Handle data from form

function storeBookmarks (e) {
  e.preventDefault()
  console.log(e)

  const websiteName = websiteNameEl.value
  let websiteUrl = websiteUrlEl.value
  console.log(websiteName, websiteUrl)
  if (!websiteUrl.includes('http') || !websiteUrl.includes('https')) {
    websiteUrl = `https://${websiteUrl}`
  }
  console.log(websiteName, websiteUrl)

  //Validate website url
  const pattern =
    /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g
  const regexUrl = `${websiteUrl}`
  console.log(pattern.test(regexUrl))

  //Local Storage
  const bookmark = {
    name: websiteName,
    url: websiteUrl
  }
  bookmarks.push(bookmark)
  console.log(bookmarks)
  localStorage.setItem('bookmark', JSON.stringify(bookmarks))
  console.log(JSON.stringify(bookmarks))
  bookmarksForm.reset()
  websiteNameEl.focus()
}

//Event Listeners
bookmarksForm.addEventListener('submit', storeBookmarks)
