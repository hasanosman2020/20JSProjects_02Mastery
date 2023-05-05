Create a music player app with controls, album art, track name, artists's name and the timer or progress bar of the track being played. The user is able to scrub through the song by clicking on the progress bar. The user can loop through the songs by clicking either the backward or forward buttons. The artwork and details of the track and artist playing change with each track to reflect the correct information of the song being played.

Add image folder and music folder to hold mp3 files (plus the normal html, css and js).

[[music_player.html]]
- div.player_container (container containing the whole player so user is able to move it around the page)

track properties
	- div.img_container
		- image tag - insert image
	- h2#title insert song title
	- h3#artist insert name of artist
	- audio tag src=music folder controls [note: add 'controls initially so that we can see the element on the page but then remove so we can customise the controls)

[[music_player.css]]
- Google fonts - Spartan - regular and bold (embed and import)
- add font to body
- style 'player_container'
	- width @ 400px - most phones with large screens have screen sizes just above 400px so this will fit into most phone screens without media queries
	- background-color slightly lighter than that of the body
	- border-radius (v. important and makes it look more  modern)
	- #box-shadow provides a shadow to elements that makes the element look like it is floating on the page
		- horizontal offset - shadow goes left or right of the element
		- vertical offset - shadow directly below the object
		- blur -amount of opacity added to the shadow, so if 0 then we will have a solid colour
		- spread - how far out from the element the shadow is 
		- color - rgba
- style album image
	- object-fit: cover - allows us to use any size image and that image will fit in the space available without distorting the image
	- image container to be slightly smaller than the player container
	- image container wider than vertical screen of iPhone X, so amend width of player-container to be 95vw 

[[music_player.html]]
	- progress bar: div.progress_container#progress_container
		- div.progress#progress (the actual bar that will move along with the song)
	- div.duration_wrapper
		- span#current_time (hard code 0:00)
		- span#duration

insert styling to the progress container/ bar

- button controls
- div.player_controls
	- i.fas.fa-backward id=prev title="Previous"
	- i.fas.fa-play.main_button id=play title="Play"
	- i.fas.fa-forward #next title="Next"

[[music_player.css]]
- style .fas
- insert user-select:none to prevent it being selected by the user like any other font is selected


### Play/Pause functionality ###

When we insert the controls we have the ability to play / pause the track. Now we need to transfer that ability to the custom play/pause icon. Go to MDN 'HTML Audio and Video DOM Reference'. We see a play() method and a pause method(), and we need to trigger both of these on the audio element.

[[music_player.js]]
We target the audio element, which we'd want to control, and the control buttons as they will allow us to be able to control the audio element. 

#### Functions for play/pause functionality ####
Create function playSong() for play. Then target the audio element and pass in the method of play(). Do the same with the pause. 
```js
//Play
function playSong(){
audioelement.play()
}

//PAUSE
function pauseSong(){
audioelement.pause()
}
```
	
Then we need to trigger play if the music is paused and trigger pause if the music is playing. To do that we need to add a boolean that we will set within each of those functions to show whether or not they are playing. When we first open the page isPlaying will be false because the music will not start playing until the user hits the play button. So

```js
//Check if playing
let isPlaying = false

//Play
function playSong(){
isPlaying = true;
audioelement.play()
}

//PAUSE
function pauseSong(){
isPlaying = false;
audioelement.pause()
}
```
Next we go through the event listener functionality. Based on whether isPlaying is true or false we would want to launch the opposite function. Use a ternary operator. The syntax for ternary operators is
```js
condition ? exprIfTrue : exprIfFalse
```
Here, if isPlaying we launch the pauseSong() function and if the boolean isPlaying is false we launch the playSong() function. We add the event listener like so
```js
//Play or pause event listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()))
})
```
The play button should turn into a pause button when the music is playing and vice-versa. We add this in the playSong() function by replacing the class list from fa-play to fa-pause and the same in the pauseSong() function. So, 
```js
//Play
function playSong(){
isPlaying = true;
playBtn.classList.replace('fa-play', 'fa-pause')
audioelement.play()
}

//PAUSE
function pauseSong(){
isPlaying = false;
pauseBtn.classList.replace('fa-pause', 'fa-play')
audioelement.pause()
}
```

The title attribute of each of the buttons should also change. We can do this with using setAttribute, so
```js
//Play
function playSong(){
isPlaying = true;
playBtn.classList.replace('fa-play', 'fa-pause')
playBtn.setAttribute('title', 'Pause')
audioelement.play()
}

//PAUSE
function pauseSong(){
isPlaying = false;
pauseBtn.classList.replace('fa-pause', 'fa-play')
pauseBtn.setAttribute('title', 'Play')
audioelement.pause()
}
```

### Previous/Next functionality ###
Unlike play() and pause() there are no methods for previous and next. 

When clicking on the next or previous button we need to change the image, the names of the artist and title, the duration, and the actual audio itself. 

Start with targeting the image (using query selector to target img),  and the artist and tile using their ids. Then we have to add the songs that we have within our folders - the way to do that is to have an array of objects with each object containing all the relevant information of one track. The information we will include here of every track and held in each object is name - the name of the file, displayName - the name of the song, and artist which is artist's name. We use the name property as the source for the audio and image elements  
```js
//Music
const songs = [
{name: INSERT NAME OF FILE,
displayName: INSERT NAME OF SONG,
artist: INSERT NAME OF ARTIST}
]
```
#### Update DOM - insert song info in DOM elements ####

Comment out a title 'Update DOM' and create a function called loadSong which will take 'song' as a parameter. Inside the loadSong() function we want to change the title of the track, the name of the artist, the music source, and the image source.
```js
//Update DOM
function loadSong(aong){
title.textContent = song.displayName;
artist.textContent = song.artist;
music.src = `music/${song.name}.mp3`;
image.src = `img/${song.name}.jpg`
}
```
Next we will need a function that on start-up will pass in one of the songs from the array. 
```js
//On Load - select first song
loadSong(songs[3]) //if we pass the firt one then nothing will change so include a random song
```
#### Control song loaded with prev and next buttons ####
Start by adding event listeners. The previous button will launch , on click, a function prevSong() and the next button nextSong() (we have not yet created those two functions).
```js
//Event listeners
previousButton.addEventListener('click', prevSong);
nextButton.addEventListener('click', nextSong);

```
Go back to the loadSong() function. We would not hardcode a number in the loadSong(songs[]) function call and so we need to be able to control it dynamically. So we need to create a variable to replace the hardcoded number we have inserted. Above it we comment out title 'current song' and insert
```js
//Current Song
let songIndex = 0;
``` 
Then we pass that variable in where the number is, so
```js
loadSong(songs[songIndex])
```
If we check it we see that we are at the first song. 

Every time we click on the previous or next buttons we want to change the value of songIndex, then we want to load that song and then play that song.  
```js
//Previous Song
function prevSong(){
songIndex--;
console.log(songIndex);
loadSong(songs[songIndex]);
playSong()
}

//Next Song
function nextSong(){
songIndex++;
console.log(songIndex);
loadSong(songs[songIndex]);
playSong()
}
```
The music player now works and if we look at the console we see the number index of the song being played. But if we try to go before the first song or after the last song we see an error in the console because we do not have a -1 in the index of songs and the song index cannot be higher than the number of songs that we have. 

Insert an if statement in the previousSong() function such that if the current song is less than 0 then the song to be played next should be the last song in the list.
Insert an if statement in the nextSong() function such that if the songIndex is greater than 4 then the songIndex (or the next song to be played) should be the first one in the list.
```js
//Previous Song
function prevSong(){
songIndex--;
if (songIndex < 0){
songIndex = songs.length - 1;
}
//console.log(songIndex)
loadSong(songs[songIndex])
playSong();
}

//Next Song
function nextSong(){
songIndex++;
if (songIndex > songs.length - 1){
songIndex = 0
}
//console.log(songIndex);
loadSong(songs[songIndex]);
playSong()
}
```

### Progress Bar ###
#### Populate the progress bar with the % of the song that is complete. Update current time and duration for each song as we load it. ####

First we go to [[music_player.css]] and to the '.progress' selector - change its width from 66% to 0%. The next time we go to the music player we see that there is no progress made. 

Go to MDN. Look at the audio element events - target the 'timeupdate' event which will fire when the current playback position has changed. We use this to update our values and to set our progress with. First however we create a constant for each of them in the javascript. Beneath the const music target create and target the progress container. Then create and target const progress (this is the dark colour which will change the width based on how far along the song we are).

Go to bottom of code and create an event listener with the target being 'audio' and the event being listened for is 'timeupdate' and callback function 'updateProgressBar'. We only want to update the progress bar if something is playing. Pass in 'e' as a parameter to the function updateProgressBar()
```js
//Update Progress Bar and Time
function updateProgressBBar(e){
if (isPlaying){
console.log(e)
}
}
```
In the console go to 'srcElement', i.e. the actual audio. Then find the properties 'currentTime' and 'duration'. Extract these two values using destructuring. This allows us to apply a constant and pull out certain parts of that object by just equalling the object that we are pulling it from. This looks as follows
```js
const {duration, currentTime} = e.srcElement
console.log(duration, currentTime)
```
We console log these elements just to make sure that we are getting the values that we expect to see. 

#### Update width of progress bar ####

Within the updateProgressBar() function we comment out a title 'update progress bar width', then create a constant to represent the percentage of progress and which will equal currentTime divided by the duration multiplied by 100. We then check by console logging the variable created earlier 'progressPercent'
```js
//Update progress bar width
const progressPercent = (currentTime / durartion) * 100
console.log(progressPercent)
```
The console will show the percentage progress of the song - the console will show the percentage in numbers but we have to convert them into strings to be able to style the progress by using these figures in the CSS. We style the percentage progress (must remember to add the % sign because that is how it is expressed in CSS otherwise it will break)
```js
progress.style.width = `${progressPercent}%`;
```
Go to Elements tab in the console and the progress bar will show the styling that we have added to it and the width will be changing dynamically as the song progresses to reflect the correct percentage progress. If we change that number in the Elements tab the player will jump to the corresponding point in the song. 

### Populating duration and currentTime UI elements

The duration and currentTime were in seconds and so they need to be formatted to appear in minutes. Create constants for the duration and currentTime and target them using id.

Within the function updateProgressBar(e) comment out a title 'Calculate display for duration'. Divide the duration by 60 to convert from seconds to minutes then console log to see number in minutes. To avoid any decimals in the number representing the amount of minutes we use the maths method Math.floor() which returns the largest integer which is less than or equal to a given number. So
```js
//Calculate display for duration
const durationMinutes = Math.floor(duration /60)
console.log('minutes': durationMinutes)
```
Now we want to get the remainder of the whole number obtained in durationMinutes to represent the seconds.For that we use the remainder(%) operator which returns the remainder left over when one operand is divided by a second operand and we use a % to call this.

Create a let statement with variable 'durationSeconds' being equal to Math.floor(duration % 60). With seconds we two digits if less than 10 so add an if statement where if it is less than 10 we change it to a string and use a template string '0${durationSeconds}'
```js
let durationSeconds = Math.floor(duration % 60);
if (durationSeconds < 10){
durationSeconds = `0${durationSeconds}`
}
console.log('seconds:' durationSeconds)
```

Then we need to pass the above minutes and seconds to our duration element in the format minutes:seconds (00:00)
```js
durationEl.textContent = `${durationMinutes}:${durationSeconds}`
```

When a track starts, before the duration shows there appears a flash of the expression NaN, i.e. Not a Number. To prevent NaN from popping up at the start of every track we will need to delay setting the duration until the maths of calculating that time has been completed. So the if statement will be that if we have a value (in this case, it is if we have a durationSeconds) then we want to pass in or amend the durationEl.textContent, so that it is moved beneath the console.log(durationSeconds)
```js 
console.log('seconds:', durationSeconds)
//Delay switching duration element to avoid NaN appearing
if (durationSeconds){
durationEl.textContent = `${durationMinutes}:${durationSeconds}`
}
```
Now when we click play for each track the NaN does not appear at the start. 

**<u>Calculate display for current time</u>**
To calculate the current time we do the same thing as we did to calculate the duration above. We can copy and paste the code above but making sure that we have the correct variables
```js
//Calculate display for current time
const currentMinutes = Math.floor(currentTime /60)
console.log('minutes', currentMinutes);
let currentSeconds = Math.floor(currentTime % 60)
if(currentSeconds < 10){
currentSeconds = `0${currentSeconds}`
}
console.log('seconds', currentSeconds);
currentTimeEl.textContent = `${currentMinutes}:`${currentSeconds}`
}
}
```
Now we see that the numbers are working for the current time. 

### Control music by clicking on progress bar ###

The final part of the music player's functionality is the ability to jump to different points within the song by clicking on the progress bar. 

First we create an event listener on the progress container which will be listening for a click event and will run a function called setProgressBar
```js
progressContainer.addEventListener('click', setProgressBar())
```
Above the section 'Event Listeners' we create the function setProgressBar and pass in the event, 'e', as a parameter. Then we console log it to see what happens. 
```js
//Set Progress Bar
function setProgressBar(e){
console.log(e)
}
```
Click on the progress bar and we see in the console that we have a pointer event. Go to the source element, 'srcElememnt', and we want to find the width of the progress bar because we will need the total width of the progress bar divided by what position we are at in order to get a percentage. We scroll down srcElement and see that clientWidth equals 360(pixels). Now we need to pull that value out and we do that using the 'this' keyword. 'This' here refers to the element that received the event. So we create a constant for it and call it 'width' then we console log it
```js
const width = this.clientWidth;
console.log('width',width)
```
We see in the console the number 360.

Now we want to know where we clicked on the progress bar and the property for this is 'offsetX'. OffsetX is showing in the console as 141 (near the start it will be closer to 0 and near the end it woll be closer to 360). So we also create a constant for this (if we want to pull the value out) and then console log it. We will call it 'clickX'
```js
const clickX = e.offsetX
console.log(clickX)
```
As the code stands so far, we see the duration increasing as the song plays but nothing happens if we click on the progress bar where usually with music players the song will skip to the point at where the user clicked on the progress bar. To rectify that we need to replace the value of our current time with where we clicked on the progress bar. This means that we need to create a constant for the duration and then find the percentage of the song which has been completed and which is equal to clickX, i.e. where we clicked on the progress bar, divided by the width of the progress bar. 
```js
const {duration} = audio
console.log(clickX / width)
```
In the console we see the percentage (less than 1) for the console log above and we need to turn that number into a percentage in order to pass on to the progress width. Instead of multiplying by 100 we multiply by the duration and that will give us the progress of the song in seconds. 
```js
console.log((clickX / width) * duration)
```
So now we click anywhere on the progress bar and the final number we see is the duration of the song which has been completed in seconds. It is the value that we will use to jump in our song. 

Go to the MDN Audio documentation and look at attributes (instead of events). We find the 'currentTime' attribute which sets or returns the current playback position in the audio/video (in seconds). So now we just need to set this attribute on the audio element and make it equal to clickX/width * duration that we just set above
```js
audio.currentTime = (clickX/width) * duration
```
Now if we play a track and jump forward by clicking anywhere on the progress bar we see that the track will jump around to the location where we clicked and that the timers update accordingly. This works because our update progress bar function is thrown whenever our time event update is fired, and that is happening because we are changing the current time attribute. 


### Continue to next track after end of current track ###

Go tp the MDN Audio documentation and find the 'ended' event which fires when the current playlist is ended, which in this case will be when the current song has ended because it is not a playlist - each song is an individual audio element with a changing source. So all we need to do is to add an event listener to the audio element and the 'ended' event happens, i.e. when the song has finished playing it will fire the function nextSong.
```js
audio.addEventListener('ended', nextSong);
```