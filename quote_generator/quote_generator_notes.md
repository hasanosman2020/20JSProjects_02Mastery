### Quote Generator ###
In this project, we make an asynchronous fetch request to a rest API in order to generate the quotes. 
We encounter the CORS error and we solve it by using a proxy API.

#### Description of Interface ####
background: hero patterns vector background,
rectasngular box in the centre of the screen containing the quote,
a custom google font,
two buttons on either side at the bottom of the quote-container - the left button allows the user to tweet the quote and the right button generates a new quote,
a loader that loads between quotes so if it takes a long time the user will be reassured that a new quote is being generated
contrasting colours,
mobile responsive.


#### [[quote_generator.html]] ####
First, we create a container for the quotes with a class and id of 'quote_container'. This will be the box inside of which all the content will be inserted.
The text has a class of 'qupte_text' which we will also use to style the text, e.g. font-size, font-family etc...

The text itself will have a span tag because it will not take up any space on the page other than the text itself. 
It will have an id of 'quote' so that we can target this element in the javascript and dynamically change the inner text. (To start we hard-code a quote until we do our functionality in the javascript.)

The same logic of the paragraph above applies to the author field. First, we have a class of 'quote_author' and then the author's name will have a span tag and id of 'author'.

Lastly we have the two buttons at the bottom of the quote container. 
They will be contained in their own container which will be a flex box and which is different from the flex box contained within the body. 
The container will have a class of 'button_container'.
Being a flexbox will allow us to have the two buttons as far apart as possible. 
First we have the twitter button - the title attribute provides an explanation to the user when they hover over it. The twitter button will have a class of 'twitter_button' and an id of 'twitter' and a title of 'Tweet This!'.
The second button will have an id of 'new_quote'.

#### [[style.css]] ####
- font awesome: for the icons used and we use a CDN to simplify the process
- CDN URL = "https://cdnjs.com/libraries/font-awesome"
- copy the first url on the page and insert with a link tag as a stylesheet before our own css. 

The html is our parent element and we add a box-sizing of border-box. Every time we add padding to an element the padding can stretch the page. So, for example, if we have a page with width 100vw, if we then add padding to any element that will stretch the page to more than 100% and will force a horizontal scroll bar. 

"box sizing: border-box" - this prevents the padding from adding extra width or extra height to the screen. 

Remove any margins applied by the browser.
Add minimum height of 100 viewport height (vh) - this means that we want to always stretch our background to at least the full height of the screen. 

The body here is using flexbox and everything is centred on the horizontal and vertical axes.

#### Styling the Quote Container ####
This shall be as follows"
	1. add background colour,
	2. give container maximum width so that when the quote is long it wraps the next line instead of expanding wider and wider
	3. increase the font size of the quote and make it bigger than the font-size for the author text

***quote_container***: 
- width and max-width so that the text does not keep expanding and remains centred on the screen, and also so that the lines of the quote wrap to multiple lines
- padding will automatically space out the quote and the buttons and all other content in the container
- 





#### quote_generator.js ####
Having done the html and the css we now have to write the code to get the quotes from an outside source, and we will also learn how to get quotes locally.
The API we use is called Inspirational Quotes and is found at  "quotes-react.netlify.app".

This API returns a list of quotes when the user clicks on the button 'Fetch Quotes'.
This means that the data is being sent back in an entire array of quotes. What our code needs to do is to take that array, store it and then pick one quote randomly at a given event. 

Go to 'https://type.fit/api/quotes'. Here we see the format that the data is being returned in. T/his is also the link to the API itself. 
The data is an array of objects with each object containing the properties 'text' and 'author'.



<mark>**Pulling in the data from the API**</mark>

We do this by using an asynchronous fetch request within a try catch statement. 
	- an asynchronous function can run independently at any time and does not stop the browser from completing the loading of a page
	- the fetch request is made from inside a try catch statement
	- a try catch allows us to attempt to complete a fetch request but if it doesn't work then we can catch the error information and do something with it. 
Now we set up our fetch request inside of the try catch statement.
We start with a const for a response equal to the apiUrl (as defined above it). 
The "await fetch(apiUrl)" means that the constant 'response' will not be populated until it has some data fetched from the apiUrl. That means that if we did not set the function getQuotes() to be an asynchronous function and did not set await it would try to set the response value before it had a chance to fetch and that would cause an error.
So here we are only setting the response constant when we actually have data which we can set the response with. 
Then we pass that response into a global variable which we call 'apiQuotes'.

The two lines in the try statement mean:
- we get the data from our api and we store it in the constant 'response'
- then we convert that response into a JSON object and pass that on to the global variable 'apiQuotes'.
Because it is a global variable, we will have to create the variable 'apiQuotes ' outside the asynchronous function getQuotes() so that it can be available to every function and not just the getQuotes() function.

We use a let statement to create the variable 'apiQuotes' because it starts off as an empty array but then further down we see that we are changing the value of it to pass in apiQuotes.
(we only use constant if the value never changes like the constant 'apiUrl').

Then we want to see the data that we have just fetched from the api so we write a console.log(apiQuotes).

And finally we would want to run this function when the page loads, so we invoke the function getQuotes().

Open the index.html and in the console we see that we have returned an array with 1643 items.If we expand that area we see that they are all objects which have been indexed and which have a text value and an author value. 

We have successfully pulled in the required api data. 


<mark>**Displaying the quotes randomly and singularly**</mark>

We now have all the quotes from the API but we want to display them only one at a time and in a random manner.

In the console.log we can specify to see a single quote by adding the index number of such quote inside square brackets. 
Type "console.log(apiQuotes[52])", go to the app and view the console - you will see the quote with index 52 displayed.

In order to get a single random quote from the array we will create another function, newQuote(), that will randomly pull a single quote from the local API. It is this newQuote() function that will be called every time the user hits the new quote button. 

Invoke the new function, newQuote(), before the catch and then add it to the top of the code making it global and therefore accessible from within the getQuotes() function. 

To get a random quote we use the following Math method:
**[Math.floor(Math.random() * apiQuotes.length)]**
This is the formula used to obtain a random number.

Now if we console.log(quote) we will see that we get a different quote and if we refresh the page we get another different quote.

#### [[quotes.js]] ####

<mark>**How do we accomplish a similar thing as above but using an array that exists locally in our project.**</mark>

[[quotes.js]] is a number of quotes taken from the apiQuotes array and in the same format. The number of quotes is much less.

The benefit of using something like this is that you can customize the quotes yourself and there is no fetch request.

When using an array that exists locally in our project, we can comment out the whole of the getQuotes() function
This also means that on page load we invoke the function newQuote() instead of the function getQuotes().
We also remove the global variable 'apiQuotes'.
For const quote we replace 'apiQuotes' with the name of the array in quotes.js and which is 'localQuotes'.

So here, the only code we need is
"function newQuote() {
const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
console.log(quote);
}

//On load
newQuote();

(the added benefit of this is that it will load quicker because we are not pulling it locally from a fetch request but pulling it locally)
#### Populating the UI ####
[Note: all amendments mentioned here are in git commit '']

Now we need to populate the UI with the dynamic quote text and quote author, and enable the twitter button and the 'new quote' button.

First, we target the html elements which we want the user to be interacting with i.e. those with IDs quote_container, quote_text,  quote_author, twitter button and the new quote button. 
Go to app.js and write a corresponding constant to each of those elements (using document.getElementById()).
Then we go to the html and delete the hard-coded quote and author's name because they will be dynamically populated. 

Now we want to populate the text content of our author and quote elements. 
In app.js, go to newQuote() function. 
The textContent property allows us to pass in a string that is then shown in that element. The relevant elements here are those that we have created as constants above.

So here we want that whenever the user refreshes the page or hits the 'new quote' button, the object (with properties 'author' and 'text') randomly chosen by the quotes API () (after the Math.random method which does the random choosing) will be passed into our 'quote' and 'author' html elements. 
We have targetted the 'quote' and 'author' elements above and given them the const names 'quoteText' and 'authorName' respectively. The 'quoteText.textContent' and 'authorName.textContent' mean the string that will be passed into each of those elements.

We want that string to be equal to the author or text property of the selected quotes API object.
We have each object of the quotes API assigned to the variable 'quote'. So we take that object and attach the name of the property (as that property is written or defined in the API) that we would like to extract its value. That would mean for the quote we write author.text and for the name of the author we write quote.author (because 'text' and 'author' are the property names as found in the API). 

So the string that will be passed into our quote and author elements will be quote.text and quote.author respectively.
Hence,  `quoteText.textContent = quote.author` and `authorName.textContent = quote.author`.

Inside the body of the newQuote() function we add two more tasks:
- in some instances in the quotes API the author is unknown and is given a value of null. If quote.author, i.e. the author's name, in the quotes API is given as null then we would like 'Anonymous' to appear in our UI for the author's name,
- if the quote exceeds a character length of 120 then we would want the font to be smaller and so we apply the css class of 'long_quote' to it.

This completes the functionality part of the app where when the user presses refresh they will be presented with a new quote along with the name of the author of that quote. 

#### Enabling functionality of buttons ####
**Twitter button**
We are able to tweet a quote we have on Twitter by pre-populating the tweet with the quote.text and quote.author. 

We start by creating a function tweetQuote. We then create a constant 'twitterUrl'.
The 'twitterUrl' constant will be the link that will allow us to tweet our quote. It is a template string and is constructed as follows:

First we insert the url: https://twitter.com/intent/tweet.
Then we pass the query parameter of text and then inside of that text parameter we will pass in the variables that feature our quote and our author values separated by a space and a dash.
So,
```js
const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorName.textContent}`;

window.open(twitterUrl, '_blank');
```
In the code above, we use the backticks as it is a template string
- first we insert the given url
- second we insert a question mark which shows that here we have a query parameter
- that query parameter is text 
- because we are using a template string we are able to pass in a variable which will be converted into a string
- these variables must be written within curly brackets preceded by a dollar sign, i.e. ${ }
- so we are able to pass in quoteText.textContent and authorName.textContent and have them converted into strings.  

Then we need to open a window using our twitterUrl so we do window.open and pass in the parameter twitterUrl. 
We also pass in a second parameter '\_blank' - this will allow the twitter window to open in a new tab. 

**Event Listeners**
We need to add event listeners to both our buttons in order to get them to work - the newQuote button the newQuote() function, and the twitter button the tweetQuote() function. 

#### Loader Animation ####
Use the W3Schools guidance notes to create a loader which we show at the beginning when making our fetch request and is then hidden once we have finished with that fetch request and are able to show a quote. 

Copy and complete the html and the css following the example given in W3Scjhools.

In app.js we first create a const for loader.
The way the animation works is that it is shown at the beginning and whenever a new quote is being fetched - the animation and a quote should never be on the screen at the same time. 

We create two functions loading() and completeLoading() where the two elements alternate between appearing on the screen (the 'hidden' we see in 'loader.hidden' is an attribute on any html element and can be used for anything).

To test the loading() and completeLoading() functions, go to the bottom of the code and comment out the getQuotes() function and instead call the loading() function. We should see the spinning loader in the middle of the page and no quote container. 

Now restore the getQuotes() function
call the loading() function at the beginning of the getQuotes() function
we see that it goes into the newQuote() function so we go to the newQuote() function and also add it at the top of that function
(this is because when we press the button we are bypassing the first getQuotes() function and we are launching the newQuote() function so on the second and third times the user presses the button he bypasses the getQuotes() function altogether. This makes sure that if it does take some time to load we allow for the spinner to appear and indicate that it is loading)

Right after we set the quote in our UI we would want to call our completeLoading() function. 
We can include the completeLoading() function at the end of the newQuote() function.
So we start the newQuote() function with loading() and end it with completeLoading()
#### [[script.js]] ####
This is a different approach to making the app function as expected where we use a different API and resolve a CORS error by using a proxy API.

The API we use is forismatic.com.

We need to copy the API’s url,
Add a method GET quote
Format json
Language en

We accomplish this using an asynchronous fetch function.
Call the async function getQuote. We want our function to run when we load our page so we comment it out at the bottom of the code and also because we always want our functions to be declared before we call them (then we go back to writing the function).

First create the const for our API url and call it apiUrl (following api instructions).
Then we set up a try catch statement. 
Build the catch statement first and pass in the parameter error in the parentheses.

The try statement:
- start by setting the response as a constant
- this response will equal awaiting the fetch request to complete from our apiUrl above
- then create a const for the data
- the data will await the response that we set above in json format
- console log the data

***Because we have an asynchronous function, the const response will not be set until fetch finishes fetching the apiUrl,
and the data will not be set until it finshes returning this data in json format. 

#### CORS Error ####
When we console.log(data), however, we get an error in the console.
The fetch request that we are using uses a CORS policy. This means that by default, if you are calling an API from a different origin (in our case here, it is localhost trying to call api.forismatic) by default that will not work. The CORS policy will block it.
(This might happen when using free APIs because the API may not be properly configured to send CORS header, which is what it would allow it to work on most APIs.)

The solution is to call a proxy API first and then call our quote API after that.

Start with adding a const for the proxy url.

Then combine the two urls so that we are essentially making our API call ,using the headers from the proxy call.
In my case, this method still threw an error.

**Demo Server**
An alternative solution is to use the temporary CORS demo server.  
(see notes on accessing the CORS demo server, see github for code)
However, as the descrip;tion suggests, this is only a temporary solution and one that is better suited to testing and development. 
My preferred method is to create my own proxy server. 


#### Create own proxy server ####
We will launch a node server aplication on Heroku for free.

Heroku is a platform that allows you to deploy projects on their cloud network, including back-end code and databases.

**Why use Heroku?**
We are using this bcause it will allow us to build and deploy a node server to handle our network requests. 

**How to use**
First, sign up with Heroku and complete all the necessary steps before you are prompted to verify your email. 

Then go to Heroku Dev Center and download Heroku CLI using the following command on Terminal:
*$ brew tap heroku/brew && brew install heroku*

Then install npm and node.js

Check to see both installations in terminal using commands:
*$ heroku -v*
*$ npm -v*

Then log on to Heroku
*$ heroku login*

Open new Terminal and clone the git:
*github.com/Rob--W/cors-anywhere/

Run *npm install* - this will install all the packages that are in the package.json file that this project relies on in order to function.

The above git is the project that we use to create our own CORS server (we clone it and then launch it in our own Heroku deployment).
The point of this project is to allow for CORS headers to be added to a request.
So the problem with our quote generator is that the API does not pass CORS header. By using this project, its going to pass those CORS headers for us by first calling our proxy server and then our API server.

Now in Terminal run *heroku create* - this allows us to create a new Heroku app.  
It will pick a random name for the serve.
Run *$ git push heroku master*
Message on Terminal 'build succeeded' means it is deployed and if we go to Heroku dashboard we see the project deployed.s

Assign the url of the app to proxyUrl in the quote gernerator app.
The app should be displaying quotes in the console.




