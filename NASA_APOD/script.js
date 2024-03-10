const loader = document.querySelector('.loader');
const resultsNav = document.getElementById('resultsNav');
const favouritesNav = document.getElementById('favouritesNav');
const imagesContainer = document.querySelector('.images_container');
const saveConfirmed = document.querySelector('.save_confirmed');

function createDOMNodes(page) {
    //console.log(page);
    const currentArray = page === 'results' ? resultsArray : Object.values(favourites)
    console.log('current array', page, currentArray)
    currentArray.forEach((result) => {
        //Card Container
        const card = document.createElement('div');
        card.classList.add('card');
        //Link
        const link = document.createElement('a');
        link.href = result.hdurl;
        link.title = 'View Full Image';
        link.target = '_blank';
        //Image
        const image = document.createElement('img');
        image.src = result.url;
        image.alt = 'NASA Picture of the Day';
        image.loading = 'lazy';
        image.classList.add('card_img');
        //Card Body
        const cardInfo = document.createElement('div');
        cardInfo.classList.add('card_info');
        //Card Title
        const cardTitle = document.createElement('h3');
        cardTitle.classList.add('card_title');
        cardTitle.textContent = result.title;
        //Save Text
        const saveText = document.createElement('p');
        saveText.classList.add('clickable');
        if (page === 'results') {
            saveText.textContent = 'Add to Favourites';
            saveText.setAttribute('onclick', `saveFavourite('${result.url}')`)
        } else {
            saveText.textContent = 'Remove Favourite';
            saveText.setAttribute('onclick', `removeFavourite('${result.url}')`);

        }
        

        //Save Icon
        const saveIcon = document.createElement('i');
        saveIcon.classList.add('far', 'fa-heart');
        //Text Content
        const cardText = document.createElement('p');
        cardText.textContent = result.explanation;
        //Footer Container
        const footer = document.createElement('small');
        footer.classList.add('text_muted');
        //Date
        const date = document.createElement('strong');
        date.textContent = result.date;
        //Copyright
        const copyrightResult = result.copyright === undefined ? '' : result.copyright 
        const copyright = document.createElement('span');
        copyright.textContent = ` ${copyrightResult}`;
        


        //Append
        card.appendChild(link);
        link.appendChild(image);
        card.appendChild(cardInfo);
        cardInfo.appendChild(cardTitle);
        cardInfo.appendChild(saveText);
        saveText.appendChild(saveIcon);
        cardInfo.appendChild(cardText);
        card.appendChild(footer);
        footer.append(date, copyright);
        //Append to Images Container
        imagesContainer.appendChild(card);

    })
}

function updateDom(page) {
    

    // Get Favourites from localStorage
    if (localStorage.getItem('nasaFavourites')) {
        favourites = JSON.parse(localStorage.getItem('nasaFavourites'))
        console.log('favourites from local storage', favourites)
    }
    imagesContainer.textContent = '';
    createDOMNodes(page);
    }
    


// NASA API
const count = 10;
const apiKey= config.NASA_API_KEY;
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultsArray = [];
let favourites = {};


//Get 10 images from NASA API
async function getNasaPictures() {
    try {
        const response = await fetch (apiUrl);
        resultsArray = await response.json();
        console.log(resultsArray);
        updateDom('favourites')
    }
    catch (error) {
        console.log('error', error);
    }
}

// Add result to Favourites
function saveFavourite(itemUrl) {
    //console.log(itemUrl);
    //Loop through Results Array to select Favourite
    resultsArray.forEach((item) => {
        if (item.url.includes(itemUrl) && !favourites[itemUrl]) {
            //console.log(item);
            favourites[itemUrl] = item;
            console.log(favourites)
            console.log(JSON.stringify(favourites))

            // Show save confirmation for 3 seconds
            saveConfirmed.hidden = false;
            setTimeout(() => {
                saveConfirmed.hidden = true;
            }, 3000)

            // Set Favourites in Local Storage
            localStorage.setItem('nasaFavourites', JSON.stringify(favourites))

        }

    })
}

//Remove Favourite from Favourites
function removeFavourite(itemUrl) {
    if (favourites[itemUrl]) {
        delete favourites[itemUrl];
        //Set Favourites in Local Storage
        localStorage.setItem('nasaFavourites', JSON.stringify(favourites));
        updateDom('favourites');


    }
}


//On Load
getNasaPictures();
