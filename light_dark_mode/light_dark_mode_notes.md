### <u> Project Overview </u>###
Build a basic website with a patterned background from [Hero Patterns]('https://heropatterns.com/')and custom [Google fonts]('https://developers.google.com/fonts').
The navigation changes colour if we hover over it and if we click on any of the links on the navbar the website will smoothly scroll to that section / page of the website. The font awesome icons also change colour when we hover over them.
On the top right there is an image of a sun. If we flip the switch next to that image we get the dark mode and an image of the moon and the text 'Dark Mode' instead of 'Light Mode'. The background changes to black and the primary colour changes from orange to purple. Hovering changes elements to white. The text box background is now grey-ish, the button colours have changed and the Undraw Illustrations on the 'About' page have also changed.

See [[The Ultimate Guide on Designing a Dark Theme for your Android app.pdf]] for explanation on choosing a dark / light palette.
Create [[light_dark_mode.html]].

We build the project with the default colours. Later on, after building the website, we switch to the dark theme using JS.
The last thing we build on the we bsite is the custom switch on the top right-hand corner. We test by clicking it snd it will move to the right and change colour to orange. 
Now we move to functionality.

[[light_dark_mode.js]]
The first thing we want to do is to add an event listener to listen on the toggle switch element for whenever it is checked or unchecked. Then we want to be able to run a function from there. 
We target the toggle switch element within the JS and create the variable 'toggleSwitch' using querySelector.
```js
const toggleSwitch = document.querySelector('.toggle_switch')
```
For the event listener we use a 'change' event instead of a 'click' event. A change event occurs when a check state has been changed. Following the MDN example
```js
toggleSwitch.addEventListener('change', switchTheme)
```
Now we create the function switchTheme which will later switch our theme dynamically. We pass in the event and console log the event to see what we get when we click on the switch.
```js
function switchTheme(event){
console.log(event)
}
```
In the console we see that the event is first registered with the type of event being a 'change' event and that the input is target and the currentTarget is also input. We then click on the downward arrow then click on 'target: input' and we look at the 'checked' property which we will see is true because we have the switch checked. 
We can be more specific and get to the target.checked value, so we console.log(event.target.checked.
```js
function switchTheme(event){
//console.log(checked)
console.log(event.target.checked)
}
```
Now when we click the switch we see 'true' in the console. If we click it again to switch it back we seew 'false'. 
That means that we are now tracking the value of our checked boolean. When the boolean is checked we want our dark modew and when the boolean is unchecked we want our light mode, i.e. the default mode. 
So when the boolean is checked with checked value 'true' we want to use the second set of colours in our css where [data-theme='dark'].
In order to do this we have to set the attribute [data-theme='dark'] at the highest level of our html.
[This MDN article]('obsidian://open?vault=WebDev_projects&file=20_js_projects%2Flight_dark_mode%2Fdeveloper.mozilla.org-DocumentdocumentElement.pdf') explains how document.element returns the element that is the root of the document, e.g. the \<html> element for HTML documents. So that will allow us to have the highest level element and we will neewd to set the attribute of the dark theme on that element. 

Comment out the console.log statements and add an if statement where if the event.target.checked is true then we want the dark mode, else we want the light mode. To do this we set the attribute of dark on the document.documentElement.
```js
function switchTheme(event){
//console.log(event);
//console.log(event.target.checked);
if(event.target.checked){
document.documentElement.setAttribute('data-theme', 'dark')
} else {
document.documentElement.setAttribute('data-theme','light')
}
}
```
When we nos click on the switch we are able to see our dark mode colours. The undraw illustrations, the text box and the icons have not changed. The background colour and the navigation have both changed and the switch changes colour according to which primary colour is active.

Now we make constants for all the elements that we want to see change colour when we click the switch, i.e. the nav, the toggle icon, the three images and the text box.
```js
const nav = document.getElementById('nav')

const toggleIcon = document.getElementById('toggle_icon')

const imageSoftDev = document.getElementById('image_softdev_light')

const imageVC = document.getElementById('image_vc_light')

const imagePC = document.getElementById('image_pc_light')

const textBox = document.getElementById('text_box')z
```
Then we use our switchTheme() function to call two separate functions: darkMode() and lightMode(). The purpose of both functions is to change the colour of the elements which remain unchanged after the if statement, so we call each function immediately after the relevant condition.
```js
function switchTheme(event){
//console.log(event);
//console.log(event.target.checked);
if(event.target.checked){
document.documentElement.estAttribute('data-theme', 'dark')
darkMode()
} else {
document.documentElement.setAttribute('data-theme', 'light')
}
```
Then we create the darkMode() function. The first thing to change is the background colour of the navigation and the text box. 
```js
//Dark Mode styles
function darkMode(){
nav.style.backgroundColor = 'rgb(0 0 0 / 50%)'
textBox.style.backgroundColor = 'rgb(255 255 255 / 50%)'
}
```
The next thing to change is the text which says 'light mode / dark mode' and the sun/moon icon.
In the html we see that the span element with id 'toggle_icon' is made up of those two elements, meaning that those two elements are its children. Console log toggleIcon.children and view the console in the webpage.
```js
function darkMode(){
nav.style.backgroundColor = 'rgb(0 0 0 / 50%)'
textBox.style.backgroundColor = 'rgb(255 255 255 / 50%)'
console.log(toggleIcon.children)
```
We see that the console.log above has returned the span and the icon as two separate objects within an array. So to target them we use the square bracket notation.
```js
toggleIcon.children[0].textContent = 'Dark Mode';
toggleIcon.children[1].classList.remove('fa-sun');
toggleIcon.children[1].classList.add('fa-moon');
```
Now we change the colour of the images.
```js
imagePC.src = './images/undraw_proud_coder_dark.svg'

imageVC.src = './images/undraw_version_control_dark.svg'

imageSoftDev.src = './images/undraw_software_engineer_dark.svg'
```
Now if we flip the switch back we see that not everything has  changed back, e.g the illustration colours and the text 'Dark Mode'. This is because we have not made the light mode function yet. Copy and paste the dark mode and change a few things around as shown in the code below.
```js
//Light Mode Styles

function lightMode () {

nav.style.backgroundColor = 'rgb(255 255 255 / 50%)'

textBox.style.backgroundColor = 'rgb(0 0 0 / 50%)'

console.log(toggleIcon.children)

toggleIcon.children[0].textContent = 'Light Mode'

toggleIcon.children[1].classList.remove('fa-moon')

toggleIcon.children[1].classList.add('fa-sun')

imagePC.src = './images/undraw_proud_coder_light.svg'

imageVC.src = './images/undraw_version_control_light.svg'

imageSoftDev.src = './images/undraw_software_engineer_light.svguu'

}
```
Now we can see that everything is working and changes its colour to either the dark mode or the light mode. 

The above code can be refactored by
 1. replacing the two lines adding and replacing the toggle icon by the code below. Copy to the lightMode() function and swap over 'fa-sun' and 'fa-moon'.
```js
toggleIcon.children[1].classList.replace('fa-sun', 'fa-moon')
```
 2. insert the code dealing with the images in a separate function, imageMode(), delete the lines then call that function from the darkMode() and lightMode() functions. 
  ```js
function imageMode(colour){
imagePC.src = `./images/undraw_proud_coder_${color}.svg`

imageVC.src = `./images/undraw_version_control_${color}.svg`

imageSoftDev.src = `./images/undraw_software_engineer_${color}.svg`

 }
```
 ### Local Storage To Save User Data ###
 Local storage allows the user to store data between sessions meaning that if they come back a week later after leaving their computer, their local storage data will still be there. 
 Here we are simply storing a string value that will be a theme of 'dark' or 'light'. 
 Local storage, like the console, exists within the window object and can be called directly. We first 'set' the value on local storage and then we 'get' the value from local storage. We start by setting the value to show what actually happens when you do that.
Within the switchTheme() we will set a local value for each of the two conditions of the if statement. If it is the dark theme we use the setItem() method to set the local storage with a key value pair of 'theme' and 'dark' respectively (and 'theme' and 'light' for the light theme).
```js
// Switch Theme Dynamically

function switchTheme (event) {

//console.log(event)

//console.log(event.target.checked)

  

//console.log(event.target.checked)

if (event.target.checked) {

document.documentElement.setAttribute('data-theme', 'dark')

localStorage.setItem('theme', 'dark')

darkMode()

} else {

document.documentElement.setAttribute('data-theme', 'light')

localStorage.setItem('theme', 'light')

lightMode()

}

}
```
Go to the webpage console and click on the Applications  tab. Then click on the http address in Storage / Local Storage. We see that we have a table of key /value and that one of the keys is theme and its value switches from light to dark depending on when we click the switch. (Clear the key theme for now.)
Now we want to retrieve this value and this is where we use the get() method of local storage. 

First we check the local storage for theme and then we create a constant for it called currentTheme. The const currentTheme will be equal to the local storage dot getItem('theme'). Then console log it.
```js
//Check Local Storage for Theme
const currentTheme = localStorage.getItem('theme')
console.log(currentTheme)
```
Because we have cleared the theme earlier from the local storage, now we see that the code above gives us a value of null. When we first visit a website we will not have anyting in local storage. 

In order to address this we have an if statement for our current theme. Whenever using local storage, we should check first to see if it exists before we try to retrieve it. 
```js
if (currentTheme){
document.documentElement.setAttribute('data-theme', currentTheme)

if(cuurentTheme === 'dark'){
toggleSwitch.checked = true;
darkMode();

}
}
```