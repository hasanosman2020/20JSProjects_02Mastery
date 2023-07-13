const modal = document.getElementById('modal')
const showModal = document.getElementById('show_modal')
const modalContainer = document.querySelector('modal_container')
const websiteNameEl = document.getElementById('website_name')
const websiteUrlEl = document.getElementById('website_url')
const closeModal = document.getElementById('close_modal')
const bookmarksContainer = document.getElementById('bookmarks_container')
const bookmarksForm = document.getElementById('bookmark_form')

let bookmarks = []

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

//Validate Form
function validate (websiteName, websiteUrl) {
  const expression =
    /(https)?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g
  const regex = new RegExp(expression)

  if (!websiteName || !websiteUrl) {
    alert('Please submit values for both fields.')
    return false
  }
  if (!websiteUrl.match(regex)) {
    alert('Please provide a valid web address.')
    return false
  }
  //Valid
  return true
}

//Build Bookmarks DOM
function buildBookmarks () {
  //Remove all bookmark elements before appending
  bookmarksContainer.textContent = ''
  //Build items
  bookmarks.forEach(bookmark => {
    const { name, url } = bookmark
    //console.log(name, url)
    //Item
    const item = document.createElement('div')
    item.classList.add('item')
    //Close Icon
    const closeIcon = document.createElement('i')
    closeIcon.classList.add('fa-solid', 'fa-xmark')
    closeIcon.setAttribute('title', 'Delete Bookmark')
    closeIcon.setAttribute('onclick', `deleteBookmark('${url}')`)

    //Favcicon / Link Container
    const linkInfo = document.createElement('div')
    linkInfo.classList.add('name')

    //Favicon
    const image = document.createElement('img')
    image.setAttribute(
      'src',
      `https://s2.googleusercontent.com/s2/favicons?domain=${url}`
    )
    image.setAttribute('alt', 'Favicon')
    image.style.width = '1.5rem'

    //Link
    const link = document.createElement('a')
    link.setAttribute('href', `${url}`)
    link.setAttribute('target', '_blank')
    link.textContent = name
    link.style.fontSize = '1.5rem'

    //Append to bookmarks container
    linkInfo.append(image, link)
    item.append(closeIcon, linkInfo)
    bookmarksContainer.appendChild(item)
    /*
    const closeIcon = document.createElement('i')
    closeIcon.classList.add('fas', 'fa-xmark')
    closeIcon.setAttribute('title', 'Delete Bookmark')
    closeIcon.setAttribute('onclick', `deleteBookmark('${websiteUrlEl.value}')`)

    //Favicon / Link Container
    const linkInfo = document.createElement('div')
    linkInfo.classList.add('name')
    //Favicon
    const favicon = document.createElement('img')
    favicon.setAttribute(
      'src',
      `https://s2.googleusercontent.com/s2/favicons?domain=${websiteUrlEl.value}`
    )
    favicon.setAttribute('alt', 'Favicon')

    //Link
    link = document.createElement('a')
    link.setAttribute('href', `${websiteUrlEl.value}`)
    link.setAttribute('target', '_blank')
    link.textContent = name

    //Append to bookmarks container
    linkInfo.append(favicon, link)
    item.append(closeIcon, linkInfo)
    bookmarksContainer.appendChild(item)
  })
}
*/
    /*Build Bookmarks DOM
function buildBookmarks () {
  //Build items
  bookmarks.forEach(bookmark => {
    const { name, url } = bookmark
    console.log(name, url)*/
  })
}

//Fetch bookmarks
function fetchBookmarks () {
  //Get bookmarks from.  local storage if available
  if (localStorage.getItem('bookmarks')) {
    bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
  } else {
    //Create bookmarks array in local storage
    bookmarks = [
      {
        name: 'Hasan Osman',
        url: 'https://github.com/hasanosman2020'
      }
    ]
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
    fetchBookmarks()
  }
  //console.log(bookmarks)
  buildBookmarks()
}
//Delete bookmarks
function deleteBookmark (url) {
  //loop through the bookmarks array
  bookmarks.forEach((bookmark, i) => {
    if (bookmark.url === url) {
      bookmarks.splice(i, 1)
    } else {
      console.log('No bookmarks to show')
    }
    if (bookmark === null) {
      bookmarks.splice(i, 1)
    }
  })
  //Update bookmarks array in local storage, re-populate DOM
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
  fetchBookmarks()
}

// Handle data from form

function storeBookmark (e) {
  e.preventDefault()
  console.log(e)

  const websiteName = websiteNameEl.value
  let websiteUrl = websiteUrlEl.value
  //console.log(websiteName, websiteUrl)
  if (!websiteUrl.includes('https://') && !websiteUrl.includes('http://')) {
    websiteUrl = `https://${websiteUrl}`
  }
  //console.log(websiteName, websiteUrl)

  //Validate
  if (!validate(websiteName, websiteUrl)) {
    return false
  }

  /*
    //Validate website url
    const pattern =
      /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g
    const regexUrl = `${websiteUrl}`
    console.log(pattern.test(regexUrl))
  */
  //Set bookmark object, add to array
  const bookmark = {
    name: websiteName,
    url: websiteUrl
  }
  bookmarks.push(bookmark)
  //console.log(bookmarks)

  //Set bookmarks in localStorage, fetch, rest input fields
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
  //console.log(JSON.stringify(bookmarks))
  buildBookmarks()
  bookmarksForm.reset()
  websiteNameEl.focus()
}
//Validate form
function validate (websiteName, websiteUrl) {
  const expression =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g
  const regex = new RegExp(expression)
  if (!websiteName || !websiteUrl) {
    alert('Please fill in both fields')
    return false
  }
  if (!websiteUrl.match(regex)) {
    alert('Please provide a valid web address')
    return false
  }
  //Bookmark is valid
  return true
}
//Modal Event Listeners
showModal.addEventListener('click', modalShow)
closeModal.addEventListener('click', () => {
  modal.classList.remove('show_modal')
})
window.addEventListener('click', e => {
  e.target === modal ? modal.classList.remove('show_modal') : false
})
bookmarksForm.addEventListener('submit', storeBookmark)

//On Load
fetchBookmarks()
