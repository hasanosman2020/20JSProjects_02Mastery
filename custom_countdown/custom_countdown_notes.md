### Overview ###
Users are presented with an input space where they can write the name of an event they are counting down to. The second input space is for the user to enter that date which they can do by either using the date-picker or entering it manually. The countdown information is stored in local storage which means that the user can refresh the page or  close the browser and return to it at a later time and the countdown will be running. 
The background is a video image and the UI is mobile responsive.

### Video Background  ###

The first thing to do is to add the video background
- [Pixabay](https://pixabay.com/videos/)
- [YOUCOMPRESS](https://www.youcompress.com/)
- Download video from Pixabay and compress using YOUCOMPRESS site (to 720).

### index.html ###

Insert comment 'Video Background' after body opening tag.
Insert video tag with class = 'video_background'.
We want the video to play continuously and non-stop so we add the attribute 'loop', to be muted so attribute 'mute' and to play immediately as soon as the page loads so attribute 'autoplay'.
Add the source 'time.mp4' inside this video tag.

Add a new div with class = 'video_overlay' - this is a transparent screen over the video to hide any imperfections or poor quality.

```html
<body>

<!!--Video Background-->

<video class="video_background" loop muted autoplay>

<source src="time.mp4"></source>

</video>

<div class="video_overlay"></div>

<script src="script.js"></script>

</body>
```
When running the code as above we see that the image is too big. 
Add the following css:
```css
.video_background {

position: fixed;

right: 0;

bottom: 0;

}

video {

position: absolute;

top: 50;

left: 50%;

transform: translate(-50%, -50%);

}
```
When running the code as above we see that the image is too big. 
Add width and height of 100vw and auto respectively to .video_background.  Also add the video overlay and some more css styling. 
```html
<!DOCTYPE html>

<html lang="en">

<head>

<meta charset="UTF-8">

<meta http-equiv="X-UA-Compatible" content="IE=edge">

<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Custom Countdown</title>

<link rel="stylesheet" href="styles.css">

</head>

<body>

<!!--Video Background-->

<video class="video_background" loop muted autoplay>

<source src="time.mp4"></source>

</video>

<div class="video_overlay"></div>

<script src="script.js"></script>

</body>

</html>
```

```css
/** Video Background **/

.video_background {

position: fixed;

right: 0;

bottom: 0;

width: 100vw;

height: auto;

}

video {

position: absolute;

top: 50%;

left: 50%;

transform: translate(-50%, -50%);

}

.video_overlay {

position: fixed;

left: 0;

top: 0;

height: 100vh;

width: 100vw;

background-color: rgba(250, 250, 250, 0.35)

}

  

/** Media Query large smartphone (vertical) **/

@media screen and (max-width: 600px){

.video_background {

height: 100vh;

width: 100vw;

}

video {

object-fit: cover;

object-position: 75%;

margin-top: -1px;

}

}
```
#### index.html ####
Create a parent container below the video background.  Within that container create an input form (class="form" id="countdownForm") with. two input tags for the title of the user's countdown and for the date. Add a submit button.
```html
<!DOCTYPE html>

<html lang="en">

<head>

<meta charset="UTF-8">

<meta http-equiv="X-UA-Compatible" content="IE=edge">

<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Custom Countdown</title>

<link rel="stylesheet" href="styles.css">

</head>

<body>

<!--Video Background-->

<video class="video_background" loop muted autoplay>

<source src="time.mp4"></source>

</video>

<div class="video_overlay"></div>

  

<!-- Container -->

<div class="container">

<div class="input_container" id="input_container">

<h1>Create a Custom Countdown Timer</h1>

<form class="form" id="countdownForm">

<label for="title">Title</label>

<input type="text" id="title" placeholder="what are you counting down to?">

<label for="date">Select a Date</label>

<input type="date" id="date">

<button type="Submit">Submit</button>

</form>

</div>

</div>

<script src="script.js"></script>

</body>

</html>
```
#### styles.css ####
```css
@import url('https://fonts.googleapis.com/css2?family=Nunito&display=swap');

html {

box-sizing: border-box;

}

body {

margin: 0;

min-height: 100vh;

overflow-y: hidden;

display: flex;

align-items: center;

font-family: 'Nunito', sans-serif;

}

/** Video Background **/

.video_background {

position: fixed;

right: 0;

bottom: 0;

width: 100vw;

height: auto;

}

video {

position: absolute;

top: 50%;

left: 50%;

transform: translate(-50%, -50%);

}

.video_overlay {

position: fixed;

left: 0;

top: 0;

height: 100vh;

width: 100vw;

background-color: rgba(255, 255, 255, 0.35)

}

/** Container **/

.container {

min-width: 580px;

min-height: 304px;

color: black;

margin: 0 auto;

padding: 25px 50px;

border-radius: 5px;

z-index: 2;

display: flex;

justify-content: center;

background-color: rgba(255, 255, 255, 0.85);

}

.input_container {

position: relative;

top: 20px;

}

h1 {

font-size: 35px;

text-align: center;

margin-top: 0;

margin-bottom: 10px;

}

/* Form */

.form {

width: 480px;

}

label {

font-weight: bold;

margin-left: 10px;

}

input {

width: 95%;

margin-bottom: 10px;

padding: 10px;

border: 1px solid #ccc;

border-radius: 20px;

background: #fff;

outline: none;

font-family: 'Nunito', sans-serif; 

}

/* Button */

button {

width: 100%;

height: 40px;

border-radius: 20px;

margin-top: 15px;

border: none;

text-transform: uppercase;

background: #006959;

color: white;

cursor: pointer;

outline: none;

}

button:hover {

filter: brightness(120%);

}

/* Countdown */

ul {

margin-left: -45px;

}

li {

font-size: 30px;

list-style-type: none;

padding: 10px;

text-transform: uppercase;

}

li span {

display: block;

font-size: 80px;

text-align: center;

}

/* Complete */

.complete {

position: relative;

top: 60px;

}

/** Media Query large smartphone (vertical) **/

@media screen and (max-width: 600px){

.video_background {

height: 100vh;

width: 100vw;

}

video {

object-fit: cover;

object-position: 75%;

margin-top: -1px;

}

.container {

min-width: unset;

width: 95vw;

min-height: 245px;

padding: 20px;

margin: 10px;

}

.input-container {

top: unset;

}

.countdown {

position: relative;

top: 10px;

}

.form {

width: unset;

}

input {

width: 93%;

}

h1 {

font-size: 20px;

}

li {

font-size: 15px;

}

li span {

font-size: 40px;

}

}
```

Thyere are 3 different views of the UI.
1. user's input (code above)
2. countdown
3. completed countdown.
The 3 UI views are always shown separately and never at the at the same time.

Create the countdown UI.  Add the hidden attribute to the input container above.  The title and the numbers or values of the list items will be dynamic (include any numbers here so we see how the UI looks).
```html
<!!-- Countdown -->

<div class="countdown" id="countdown">

<h1 id="countdown_title">Countdown Title</h1>

<ul>

<li><span>3</span>Days</li>

<li><span>3</span>Hours</li>

<li><span>3</span>Minutes</li>

<li><span>3</span>Seconds</li>

</ul>

<button id="countdown_button">Reset</button>

</div>
```