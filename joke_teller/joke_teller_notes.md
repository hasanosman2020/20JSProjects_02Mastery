The animated gif tells the user a joke when the user asks  it to, i.e. clicks on it.
We do that by first calling a joke API to get a random joke. Then we pass that joke to a text-to-speech API and it will tell us that joke.

Create [[joke_teller.html]].
Style using [[joke_teller.css]].

[[joke_teller.js]]
We want the user experience to be such that he presses the button 'Tell Me A Joke' and they hear a random joke.

#### <u>Speech: Text-to-Speech API</u> ####  
We need to feed text that we get from the API and get audio in return. For this we need to have a text-to-speech API.
Go to [rapidapi](https://rapidapi.com)
Use the [Text-toSpeech API](https://rapidapi.com/voicerss/api/text-to-speech-1/). When we try to 'test endpoint' we are directed to get an API Key.
Go to [Voice RSS](https://www.voicerss.org/). Register personal details to get an API key.
Activate account.
Go back to [rapidapi](https://rapidapi.com).
Copy and paste the API Key.
Click on 'Test Endpoint'. We now see that we have an audio element in the body.
Go to  [Voice RSS](https://www.voicerss.org/). Read through the documentation and take note, for example, of the following:
- the sort of request, i.e. POST or GET or both
- the url format by which we can make a request
- examples of request
- the available parameters, in particular the mandatory parameters such as the API key, the source, and the language.
- SDK - software development kit, and here there is one for js. This means that there is a minified js file that will handle the core functionality.
- Download the javascript text-to-speech SDK.
-In the SDK we see that there is a speech method. Inside it we are passing the parameters - the API key, the source etc.
Copy the content within the script tag in the SDK.
Go to code. Create a function called test and insert it within the function. Then call the test() function.

#### <u>SDK</u> #### 
We start with the speech function.
This calls a validate function and a request function.
The validate function is mostly in charge of throwing errors.
The request function beneath it starts with building the request, so it is actually passing in the parameters that we are setting. The request function eventually creates a new audio element and is passing in 't.reponseText.play()'.
Open the web page and go to the Network tab in the console - you will see that the audio data has been passed in as a string. But the problem is that it didn't pass it into the audio element. 
The reason this is a problem is because we want to have more control over the audio that is returned from our API because we want to be able to call an event on it.
In order to fix this replace 
```js
new Audio(t.responseText).play()
```
with
```js
audioElement.src = t.responseText, 
audioElement.play()
```
Then assign constants to the audio and button html elements.
Test by going to web page and clicking on the audio element. You should hear 'Hello World'.

#### **<u>Joke: Joke API</u> ####

Google Joke API. Read through it as above with the Speech-to-Text API.
Customise if desired.
In the customisation options, we see that there are two types of jokes - a single joke and a twopart joke.
Choose both - then click on send request. 
We get back a json file. We see that for the single type joke there is a joke value and for the twopart joke, instead of a joke value, we have the joke being split into two different levelseach with its own value - the setup part and the delivery part. 
We need to handle this because we want all our jokes to be delivered in one uniform wqay to the text-to-speech API.
First we turn the url given, 'https://v2.jpkeapi.dev/jpke/Any', into a joke within our application.
We can use the fetch method as below
```js
fetch('https://v2.jokeapi.dev/joke/Any')
.then(response => response.json())
.then(data => console.log(data))
```
The above fetch method is passing in the one argument, which is the path of the resource we want to fetch and it will return a promise containing the response, which is the json object. Then we extract the jSon data from that response by turning the response into a json object. Then finally we get the data. This is the promise format of returning data.
An alternative method is to use an asynchronous function along with a try catch statement.
```js
async function logFetch(url){
try{
const response = await fetch(url);
console.log(await response.text());
}
catch(err){
console.log('fetch failed', err)
}
}
```
In the code above, we are going to try and fetch and if we are unsuccessful the catch statement will initialize it and will console log the error. 
If it is successful the const 'response' will not be set until the fetch has completed. And then from there we will have another constant for the data which will wait to be set until we have the response in json format.
```js
async function getJokes(){
try{ 

} catch(error){
console.log('whoops', error)
}
}
```
Test the error is working (same as above error test, i.e. add 'something'mwithin try).

Got to Joke API website and copy the url. Assign the constant 'apiUrl' to the url. 
```js
const apiUrl = 'https://v2.jokeapi.dev/joke/Any'
```
In the try statement, we first set assign a constant 'response' the value of the fetch apiUrl. Then we assign a constant 'data' the value of that response after that response has beewn converted to json format. And before that, the response will not be set until the fetch has completed. Then we console log the data
```js
try {
const response = await fetch(apiUrl);
const data = await response.json();
console.log(data)
}
```
Now we are able to see the jokes in our browser console. 

#### **<u>How do we get only the joke part of the json file to display on the screen?</u>** ####
If we console.log data.joke instead of just data we can end up with undefined. The reason is because we also have two-part jokes which are composaed of a setup and a delivery, unlike the single joke which only has a joke. So we need to set up our own joke variable which will either equal the joke of a single joke or the setup and the delivery of a twopart joke. So create a variable joke and then beneath the try statement insert an if statement covering the condition just mentioned.
```js
if (data.setup){
joke = `${data.setup}...${data.delivery}`;
else {
joke = `${data.joke}`
}
}
```

#### <u>Connecting the 2 APIs</u> ####
The text-to-speech API starts with calling the speech function.
It passes in the parameters for the API key and for the src, i.e. the text (which currently is ‘Hello World’).
We pass these parameters through the VoiceRSS SDK, which is the minified javascript.
This is then connecting to their server, i.e. the VoiceRSS TTS Server.
We then receive a response from the VoiceRSS TTS Server in the form of audio data. 
The VoiceRSS SDK has been modified to pass this audio data into our audio element as its source. 
Then we trigger the play() method on that audio element. 
Then we are able to hear something. 

With the jokes functionality, we start with an asynchronous function “getJokes()”.
This is using the fetch method to pass in the API url.
The API url contains the query strings, the types of jokes and everything else required.
This is then passed on to the JokeAPI server. 
The JokeAPI Server is giving us a response which we convert into json format because we only want the body of the response. 
Then we pass that response, after having been converted to json, to a data constant.
From there we obtain the single joke from data.joke and the two part joke from data.setup and data.delivery. Within our functionality we have an if statement which populates the joke variable from the single and the twopart jokes.
Finally, we are outputting our joke variable with the string of the joke that we got from the API. 

To connect the 2 APIs we create another function, tellMe(), and that will take the parameter of joke. 
We call that tellMe() function inside of our getJokes() function so that we can pass our joke variable. 
Then we call the speech() function from inside of our tellMe() function. 
We pass in the joke as the source.

Start by making a function above our getJokes() function - this will be passing our joke to the VoiceRSS API.
Create the function tellMe and pass in joke as its parameter. Then to make sure that we are getting our joke within this next function from our first function, we console.log as shown in the code below.
```js
function tellMe(joke){
console.log('tell me:', joke)
}
```
Delete the console.log in the getJokes function and replace with tellMe(joke). Test the code and we see in the console that we are getting the joke.
So we have successfully passed the joke from one function to another. 

The next stewp is to put back the speech function so that we are actually passing the joke to the text-to-speech API.
Copy and paste the speech function and move it to within the tellMe(joke) function. Instead of passing in Hello World, make sure to replace it with joke.
Go to the web page and you will hear a joke. So we have successfully called the JokeAPI and passed it through our text-to-speech and it returned an audio in the audio element. 

Now we need to get the button to play the audio.
Add the event listeners at the bottom of the page because it is good practice to declare a function before calling it.
Add an event listener to the button that listens to a click event and a callback function of getJokes().
```js
button.addEventListener('click', getJokes)
```
Now when we go to the web page we see that the jokes do not play automatically and that there is nothing in the audio timer. However, when we click the button we hear a joke.

What do we do in the case of an over zealous user? We would want to disable the button until the joke ends so that it is not interrupted and once the audio finishes we would want to enable it again.
The audio 'ended' event fires whenever the current playlist is ended, i.e. in our case, when the joke is done being told. From there we can launch a function which will disable and enable the button.
So we add another event listener on the audio element which will listen to an ended event and a callback function 'toggleButton()'.
Within the toggleButton() function we will use the disabled attribute on the button element. An easy way to toggle the button wouuld be to say that button.disabled = !button.disabled.
```js
button.addEventListener('click', getJokes)
audioElement.addEventListener('ended', toggleButton)

function toggleButton(){
button.disabled = !button.disabled
}
```
In the above code the ended event will fire when the joke ends so what will actually happen is that the button will be disabled when the joke ends. Call toggleButton() within the geJokes() function after calling tellMe() and before the catch statement.

Finally, hide the audio element. All html elements have a hidden attribute. Add hidden attribute to html audio element. 

#### Code Review ####
Refactoring by inserting the VoiceRSS SDK code in a separate file 'voicerss.js' and referencing that in the html.
Comment out the VoiceRSS SDK from script.js and insert it in voicerss.js. Reference voicerss.js in the html.

