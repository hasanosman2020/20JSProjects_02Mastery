### Goal:

to implement a mobile-responsive infinite scroll functionality. This happens on social media - as the user scrolls near the bottom of the page but before he reaches the bottom, another network request is made. This allows the user experience to be seamless scrolling through an unlimited amount of items.
The images for this project are fetched from the Unsplash API. The project tracks the moment all the images are loaded in order to dynamically hide the loading animation.
It is one long column of images with a margin on the left and on the right. The scroll bar on the right jumps up when a network request is made and more images are being fetched.
When the user hovers over an image they see its description. When the user clicks on an image they see that image on the Unsplash site where they also can also see the name of the artist and have the option of downloading it.

### Custom Animated Loading Icon

see [Loading.io](https://loading.io)

### Centering Elements

- copy loader (created above) into folder
- background colour is whitesmoke
- Google fonts - 'Babas Neue', embed, @import, copy code and add at top of CSS doc, update font-family with back-up sans-serif
- title on webpage is h1
- title to be centered with an even margin on the top and bottom compared to the image below it
- letter-spacing is 5px
- integrate loader into the project - Style the loader by having an opaque background on the entire page and centering it on the horizontal and vertical axes in the centre of the page. - The opaque background is achieved by targeting the class ‘loader’ - In order to centre the image we target ‘.loader img’ which is an image that is a child of the class ‘loader’ - without the transform:translate, the top left of the picture will be in the centre rather than the picture itself being in the centre. - Add hidden attribute to the loader in the html.

### Responsive Layout

- Go to unsplash.com.
- Select any picture by clicking on it.
- Right click on the picture and select 'Copy Image Address'
  Below the 'Loader' heading comment out a new title for the image container.
  Insert a div with class and id of image_container and within that dv insert img tag with the address of the picture selected from Unsplash. Insert twice.
  The image from Unsplash is likely too wide so we style it by styling the image container.
  Comment out image container title in css and give the class a margin of 10px 30%, meaning the margin takes up 60% of the page and the picture takes up 40%.
  Then target the image element that is a child of the image container class and give it a width of 100%.
  Also add a margin-top to separate the pictures.

For mobile, change the font size and give margin of just 10px (all the way round)

### Fetching Data

In order to set up the functionality of our project we will connect with the Unsplash API.
This is going to allow us to return high quality random images that will allow us to showcase our infinite scroll functionality.
Go to unsplash.com/documentation
First we join the Unsplash API.

Look at ‘Schema’. We see that the server’s location is at https://api.Unsplash.com/
The responses are sent as JSON.

There are different kinds of requests but we will only be using a GET request which we will use our Fetch API for.

In the ‘Authorization’ section of the document, we can see how we can pass the API key
Copy the API url in the us document as const apiUrl. Copy it as a template string because later on we will populate it with some variables. (For now just copy as is)

Then we find how to get a random photo and we can see that we have to pass ‘random’ after ‘photos’ within our API.
There are different parameters which allow us to filter random phots by different collections or different users.

For our purposes the main thing we will filter is the count because we want to switch to the maximum of 30 from the default of 1.

So to finalise our apiUrl we will need to add ’random’ and ’count’.
Make a const of count so we can change it if we want and for now make it as 10.
Also, make a const for apiKey.
So change count and apiKey to be equal to \${}.

Copy your public API key into the us.

Then set up a fetch request so we can see what data is returned from the API.

Create an async function called ‘getPhotos’

```js
async function getPhotos () {}
```

Inside of this function we use a try /catch statement

```js
async function getPhotos () {
  try {
  } catch (error) {
    //catch error here
  }
}
```

For the try function we create a const for our response and we await the response from our fetch request, which is going to fetch from our API url that we set earlier in the document.

```js
async function getPhotos () {
  try {
    const response = await fetch(apiUrl)
  } catch (error) {}
}
```

We also set a const ‘data’ to await the response - the response will run through the JSON method and be returned as json, hence response.json

```js
async function getPhotos () {
  try {
    const response = await fetch(apiUrl)
    const data = await response.json()
  } catch (error) {}
}
```

Then we console.log(data)

```js
async function getPhotos () {
  try {
    const response = await fetch(apiUrl)
    const data = await response.json()
    console.log(data)
  } catch (error) {
    //catch error here
  }
}
```

We also need to make sure that the function is running when the page loads so at the end of the document comment out title ‘On load’ and add the function getPhotos()

Right-click on a picture and go to Network tab. Press command and R, go to the fetch request and we can see a preview of the response. Click on one of the items for more details of the picture.
Use the alt_description for the html alt, use the html link and choose url regular for the source of the attribute for our image element. Decide how to use the information about the pic to suit your own purposes.

### JavaScript To Display Data

- So far, we have the getPhotos() method using our fetch request with the parameter 'apiUrl' which we built to include our API key.
- We are contacting the Unsplash server and that is returning a response that we set to a constant of data (const data).
- Looking ahead: - we create a global variable called 'photosArray', - we pass the data received from the Unsplash server into that photosArray, - we have a displayPhotos() method and within that method we will also call the photosArray(), - and we use the forEach method on it to run a function for every element within the array, - and then we use that to create our html elements for each object.
  ```javascript
  photosArray.forEach(photo) => {
  <a href='photo.links.html'>
  <img src='photo.urls.regular' alt='photo.alt_description' author='photo.user.name'>
  </a>
  }
  ```

````
Above, the anchor element is wrapping an image element.

The anchor element is pointed to the 'links.html' which means that when the user clicks on it they will be taken to the image on the Unsplash website.

The image itself is having its source dictated by the regular url (so we can get a different sized image if we want to).

The alt and title attributes are poulated with the alt_description so when a user hovers over the image they will see the description.

In script.js, start by creating the following constants at the very top:
image_container
loader, and
the photos array (we use a let instead of const here because the value within the photos array is going to change every time we make a request) which will equal [ ] meaning that it is an empty array.

Now go to the function getPhotos:
- get rid of 'console.log(data)',
- replace the 'const data' with 'photosArray',
- insert a console.log(photosArray) just to make sure we are getrting our photos array
- go to the Network tab in the console and check that we are getting an array of photos

Now we create our second function.
Within our getPhotos() method, after 'photosArray' we call the  function displayPhotos().
We then create that function above the getPhotos() function and start by commenting out a title with the intended functionality, i.e. 'Create elements for links and photos, and add to dom'.

Within the displayPhotos() function, we start with the forEach() method on our photosArray.
Here we pass in our variable names so that means that each object is going to be assigned to the photo variable as we are running through our forEach() method. So the forEach() method with the commented out title,
```javascript
//Create elements for links and photos and add to DOM
function displayPhotos(){
//Run function for each object in photosArray
photosArray.forEach((photo) => {

});
}
````

Now we can go about creating our elements with what we had in our photosArray.

First we create an anchor element to link to the Unsplash website. - Create a const item and create element ('a') - Then we set attributes on that item href and provide what we will set it with which in this case is 'photos.link.html' - Set another attribute so that the link can open in a new window so the attribute is target and we set it on '_blank_'.

```javascript
//Create <a> to link to Unsplash
const item = document.createElement('a')
item.setAttribute('href', photos.link.html)
item.setAttribute('target', '_blank_')
```

Then we create a similar process for our image. - Create an image for the photo - Set const img and create element ('img') - Set src attribute and set it at photo.urls.regular - Set alt attribute to alt and title and set at photo.alt_description.

```javascript
//Create <img> for photo
const img = document.createElement('img')
img.setAttribute('src', photo.urls.regular)
img.setAttribute('alt', photo.alt_description)
img.setAttribute('title', photo.alt_description)
```

Then we put the image inside the anchor element, and then put both the image and the anchor element inside the imageContainer.
-Start with 'item' that will be the parent of our image and we append the child which is the img const. - Then the imageContainer is the parent and we append the child which will be the item.

```javascript
//Put <img> inside <a> then put both inside imageContainer
item.appendChild(img)
imageContainer.appendChild(item)
```

So for each item in this array, we are going to run through the above every single time -
create an item
create an image
put image into our item
then put item into the image container.

Now delete the placeholder images because we will populate it dynamically in our javascript.

#### DRY

Here, instead of repeatedly typing out the set attribute method, we can create a helper function that will do this for us.

Create the function above the displayPhotos() function. - Call the function setAttributes() - pass in two parameters - element and attributes - use a for in loop to loop through for each of the attributes you want to set - start by assigning the key constant, which is going to be the href, src, alt and title, in attributes which is going to be an object containing both the key and the value we actually want to set.

```javascript
//Helper function to set attributes on DOM elements
function setAttributes (element, attributes) {
  for (const key in attributes) {
  }
}
```

Then we pass in the elements which will be the item or the image and we run the regular setAttribute method,
and we pass in the key as well as the attribute with the index of that specific key

```javascript
function setAttributes (element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key])
  }
}
```

So now we need to make some changes within our displayPhotos() method - comment out the lines of item.setAttribute and img.setAttribute - call the setAttributes() function created above - first, pass in item, then comma then curly brackets to create our object - then insert the attributes and we're they are set as key:value pairs

```javascript
setAttributes(item, {
href: photo.links.html,
target: '_blank'_
})
```

Repeat for img.

```javascript
setAttributes(img, {
  src: photo.urls.regular,
  alt: photo.alt_description,
  title: photo.alt_description
})
```

### Infinite Scroll Functionality

The Unsplash photos are being loaded onto the DOM.

Now we implement the infinite scroll functionality. - As the user scrolls and before they reach the bottom of the page, we want an event to trigger our getPhotos() method so that the pictures load belowbefore we have a chance to scroll pas them. - (At present we reach the bottom of the page because that is what we have implemented.)

#### HTML DOM Events: scroll

HTML DOM events allow the JavaScript to register different event handlers on elements in an HTML element.
The scroll event occurs when an element's scrollbar is being scrolled. This means that we can apply the scroll event to any element.

Here, we will apply the scroll event to our window - the window is the parent of the document and the grandparent of the body.
So we are applying the scroll event to the window which is the highest level of the DOM tree.
We target the scroll event and then we make an arrow function and create the function within the event listener

```javascript
window.addEventListener('scroll', () => {})
```

So what do we want to do on that scroll event? For now we will simply console.log('scrolled') in order to get an idea of how often the scroll event is triggered.

```javascript
window.addEventListener('scroll', () => {
  console.log('scrolled')
})
```

(scrolling to the bottom of the page, the console shows the scroll event being triggered 505 times)

For our purposes, we only need the scroll event to be triggered once when we are near the bottom of the page.
(see [[Infinite+Scroll+Functionality.png]] for visual explanation of the below)

#### Implementing Infinite Scroll Functionality

As explained above, the window is the parent of the document and the grandparent of the body.
The window is where the event listener is attached and the window represents the entire browser window.
We need 2 values from the window:

1. total height of the browser window, a number which stays constant unless the browser window is resized

```javascript
window.innerHeight
```

2. the distance from the top of the page that the user has scrolled, a number which will keep going up as the user scrolls further down the page

```javascript
window.scrollY
```

We add the height of the browser window and the distance that the user has scrolled, i.e.

```javascript
window.innerHeight + window.scrollY
```

Compare the result above with the offsetHeight i.e. the height of everything in the body, including what is not within the view, i.e. the combined height of all of the images

```javascript
document.body.offsetHeight
```

Then we modify the offsetHeight by a pixel amount by subtracting it from such amount in order to trigger the event before the bottom is reached. Here we use 1000 pixels because most window inner heights are less than a thousand pixels.

Looking at the diagram we see that this means that the event will be triggered when the user scrolls to a point which is just above the window innerHeight but within the offsetHeight.

We implement this in the code by writing an if statement where if how high the user is from the top of the page is greater than or equal to the modified height of everything in the body then the scroll event is triggered.

```javascript
window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >=
    document.body.offsetHeight - 1000
  ) {
  }
})
```

For learning purposes, insert the following console.logs within the curly brackets of the above if statement

```javascript
console.log('window.innerHeight:', window.innerHeight)
console.log('window.scrollY:', window.scrollY)
console.log(
  'window.innerHeight + window.scrollY:',
  window.innerHeight + window.scrollY
)
console.log(
  'document.body.offsetHeight - 1000:',
  document.body.offsetHeight - 1000
)
```

If we look at the console, we see that the window.innerHeight is constant at 371.
The window.scrollY is a number that increases in value.
The document.body.offsetHeight - 1000 is also a constant number because once the page has loaded we have the full height of all the images.
Most importantly, the event is only triggered once the if statement above is satisfied, with the first instance being when the two numbers are 3653 and 3652.

The issue here is that once the scroll event has been triggered it keeps on getting triggered and we end up loading more than we would like.
Ideally we would load once and then wait until we hit the bottom and then load it again.
To do this, we create a 'ready' boolean which will only be true once the images have finished loading.

First, we need to know exactly when all of our images have finished loading after each call.
A 'load' event occurs when an object has loaded.

Within the displayPhotos() method, before appending the elements, we use an event listener to check when each image has finished loading.
So we attach the event listener to the image (img) and the callback function is called imageLoaded().

```javascript
//Event listener to check when each image has finish
//Event listener to check when each image has finished loading
img.addEventListener('load', imageLoaded)
```

Create the function imageLoaded() at the top of the page and, for now, console.log('image loaded'). This is going to run on each individual image.
Change the count to 30.

```javascript
//Check if all images were loaded
function imageLoaded () {
  console.log('image loaded')
}
```

For the above, the console will show the number of pictures being loaded increase to the number of such pictures (by the number of times 'image loaded' is repeated).

Now we need to set two variables:

1. a variable for this number, and
2. a variable for the total amount of images,
   so that when we load the total number of images we can set a ready boolean to be true again.

We set the ready boolean to be false so that when the page first loads we want it to be false, so let ready = false.
Set a variable for the number ticking upwards counting the number of images being loaded, as in the console.log above, so let imagesLoaded =0.
Keep a track on the number of total images so that we know when it is done loading so set, let totalImages = 0.

In order to count the number of images loaded, in the imageLoaded function we increment the variable imagesLoaded with every individual picture that is loaded, so

```javascript
function imageLoaded () {
  console.log('image loaded')
  imagesLoaded++
}
```

Then we have an if statement such that if the number of images loaded is exactly equivalent to total images then that means the pages are ready so ready = true. So

```javascript
function imageLoaded () {
  console.log('image loaded')
  imagesLoaded++
  if (imagesLoaded === totalImages) {
    ready = true
    console.log('ready =', ready)
  }
}
```

We also need to set within the displayPhotos() function the total Images to be equal to photosArray.length, which is a number value of the amount of objects within the array and then we console.log(totalImages)

```javascript
function displayPhotosd(){
totalImages = photosArray.length;
console.log('total images,' totalImages)
//Run function for each object in photosArray
}
```

From the above we can see that the number of images loaded increased very quickly to 30, the number of total images equals 30 and that ready = true. This means that the ready bullion is working.

Now we need to adjust the scroll listener to make it run only when ready = true.
To do that, add the condition '&& ready' like so

```javascript
//Check to see if scrolling near bottom of pag
window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    console.log('load more')
    ready = false
    getPhotos
  }
})
```

The problem here is that in the console we see that ready = true up to where the imagesLoaded equals 30 but after that, even though the images keep on loading we do not see ready = true.
That should make sense given that the if statement is asking if the imagesLoaded are equal to the number of total images - once we pass 30 then the number of images loaded will be higher than the total number of images.
The fix to that is to go into the displayPhotos function and reset the imagesLoaded to zero every time we launch the displayPhotos() function.

```javascript
//Create eddlements for links and photos
function displayPhotos(){
imagesLoaded = 0;
totalImages = photosArray.length

}
}
```

Finally, add back in the loading animation but only when the page first loads and not on subsequent page loads because we want to have the illusion that the user is just scrolling continuously.
In the html, remove the hidden attribute for the loader.
We want to have the image in our js and we want to hide it after our images have loaded for the first time.
Below 'ready = true' add 'loader.hidden = true'.

In production code, remove the console.logs
