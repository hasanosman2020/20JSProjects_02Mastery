### Overview ###
Implementing advanced CSS features for the animated navigation of a website. 
 - nav items slide in and slide out one by one
 - use of google fonts, unsplash images and a colour tool which sets colours in a central location and changes them for all elements all at once
 - mobile responsive
 - js to enable everything to be toggled on and off correctly  
 - DRY code

### Set up HTML and CSS ###
[[animated_navigation.html]]
[[animated_navigation.css]]

Each section of the html will match one of the different colours that we assign to the navigation items. 
The CSS first has a bunch of colours which are added as CSS variables (custom property). It is best practice to define custom properties on the root pseudo-class so that it can be applied globally across the html document. Having the colours as CSS variables allows us to apply them to each section of the html using css (section#idofsection). The colour tool used here is Paletton.

**<u>Menu bars:</u>** these are the animated hamburger menu icons. It is adopted from the example in W3Schools.

**<u>Fonts:</u>** 'Cabin Condensed' from Google fonts.

**<u>Menu overlay:</u>** semi-transparent screen behind the navigation and in front of the main content. Create in [[animated_navigation.html]]. Style the menu overlay in [[animated_navigation.css]].

**<u>NAV items:</u>** within the menu overlay we have the nav (or menu) items which will be listed in an unordered list. We create a list item for each nav element - each nav element will have an anchor element with the href referencing the id of the corresponding section. The anchor element is what will make navigation (the nav item) when clicked on by the user jump to the corresponding section. Style the nav/menu items in [[animated_navigation.css]]. The 'nav ul' in [[animated_navigation.css]] is the parent of our navigation.  Use 'nth-of-type()' to select each of our five nav elements. Then give each nav element the corresponding background colour. Then style the 'nav ul' using flexbox.
For the 'nav ul li' the height being 220% means 20% of the parent (the parent being 'nav ul' and defined further up in the document). This will make the nav elements to completely  cover the background image and take over the screen, and each nav item will be equally spaced from the other with each one taking up 20% of the page. 
Then we style the anchor elements by targeting 'nav li a'.

We can introduce user interactivity here by making the nav menu items bigger when the user hovers over them. Here we use the selector 'nav li a:hover' and the property 'transform: scale(1.2)' to make the nav menu items bigger by 20% when hovered on by the user. To make it more interactive we also add a line which appears from the left-hand side when the user hovers on the nav element. The selectors we use here are 'nav li a::before' followed by 'nav li a:hover::before'.


**<u>Hamburger menu (html element 'menu_bar')</u>**

First we create the menu bar element in the html and each of the bars that create the hamburger menu. Style the hamburger menu in [[animated_navigation.css]] under the class selector 'menu_bars'. 
In order to animate the hamburger menu icon we need to either toggle on or off the class '.change'. If it's on then it will turn the three menu bars into an 'X' and vice-versa.
Now we go to the js because we need to select the elements which will be triggered to  make the animation work. 

[[animated_navigation.js]]
- target each of the html elements using getElementById: menubars, overlay, each of the five nav items
- add event listeners so that when we click on any of the items identified above we will actually be launching a function: the menu bars which will toggle on and off the navigation and the same for the nav items where we would want to hide the navigation on those clicks and go into the section that we clicked on
- create the toggleNav() function
```js
function toggleNav(){
menuBars.classList.toggle('change')
}
```
In the above code we use the toggle method to add or remove the parameter which in this case is 'change', i.e. the 'change' defined in [[animated_navigation.css]].
By default we do not have the class 'change' in our html which means that the first time we run the toggleNav() we will be adding the 'change' class which will cause the 'X' to show up. After declaring the function toggleNav() we add an event listener to it.
```js
menuBars.addEventListener('click', toggleNav)
```
Now when we click on the menu bars we will be toggling them on and off which manifests by turning into a 'X' when clicked and back into menu bars when clicked again. If we look at the elements tab in the console we will also see that when we click on the menu bars and they turn to a cross the class change gets added to the div element for the menu bars and when we click it again the class 'change' disappears.

Now what we want to do when we click the hamburger icon is we want to take the navigation off the screen and when we click again we put it back on the screen. In [[animated_navigation.css]], because the navigation is a child of overlay we will work with the overlay specifically.
Add to the overlay class in [[animated_navigation.css]]
```css
.overlay {
transform: translateX(-100vw);
}
```
This will get the full width of the screen off of the page. Test by running code.

The above code slides the nav items to the left of  off of the screen. However, we still need to  view the nav items.

Add a class in [[animated_navigation.css]] of 'overlay_slide_right'. Add a 'transition' to this class thus allowing the translate we have above to be changed in a smooth manner by adding in a duration of 0.4 seconds and an animation style of 'ease-in-out' for the transition. The core of what we aare doing here is the 'transform' which will be translateX(0) meaning that we will bring it back into view.
```css
.overlay_slide_right {
transition: all 0.4 ease-in-out;
transform: translateX(0);
}
```
We need to be able to take the navigation out of view so we add a class 'overlay_slide_lefT'. Allow a longer duration for the navigation to slide off the screen and return the transition to -100vw.
```css
.overlay_slide_left {
transition: all 0.8 ease-in-out;
transform: translateX(-100vw);
}
}

```
We now need to add or remove the two classes above to the overlay. In [[animated_navigation.js]] within the toggleNav() function we toggle the menu to be active or not, meaning that we will show the navigation and we target the overlay element and its class list and we will toggle a class that doesn't exist, 'overly_active' and which we will use as a boolean.
```js
overlay.classList.toggle('overly_active')
```
The thing which will help us to alternate between true and false, showing and hiding our menu, is if the overlay class list contains 'overly_active' then that would mean that we would want to show our menu
```js
if (overlay.classList.contains('overly_active')){
overlay.classList.add('overlay-slide-right')
} else {
overlay.classList.add('overlay-slide-left')
}
```
Now when we click on the hamburger icon, the navigation will either slide into view or out of view. When it is in view, if we click on any of the nav  menu items we will navigate to the corresponding section. 

To summarise, everytime the user clicks on the hamburger icon or any of the menu nav items we are launching the toggleMenu() function. The toggleMenu() function will toggle on and off the 'change' class so that will animate the hamburger menu icon. Then beneath that, whatever the value, if there is an overly_active class it will turn it off and if there isn't an overly_active class it will add it on. Then below that it is reading whether the overly_active class is on or off - if it's on then we show the menu and if it is off then we hide the menu




**<u>CSS animations</u>**
The 'animation' shorthand CSS property applies an animation between styles. 'Animation' is shorthand for
animation-name | animation-duration | animation-timing-function | animation-delay | animation-iteration-count | animation-direction | animation-fill-mode | animation-play-state
The animations here will be triggered using javascript.
For our purposes, we want to slide in items, like the overlay and the menu nav items, but we want them to be staggered looking like they're lining up in order from top to bottom and then sliding out in the same fashion. For this we will need a duration, a delay to make it staggered, it should be linear so the whole of it from start to finish proceeds at an even speed, and fill-mode because that will determine how the animation will fill going left and right and because our animation will be going both ways then we want it to be both forward and backward filled. Also add the name of the animation 'slide-in'.
See 'slide in animation' section in [[animated_navigation.css]] beelow the nav colours.
First we create a class for each of our animations and for each of the nav items. So we have a class of 'slide-in-yellow'. Then within that class we set the animation property which will define the animation's name (slide-in), duration (0.4), the manner in which it is displayed (linear, so that the speed of it is even) and the delaay (0.2 for the first and this will increase for the nav items that follow in order to give the staggering effect), and for the fill-mode we have 'both'. We repeat for each of the nav items.
```css
/* Slide in animation with delay for each nav item */
.slide-in-yellow {
animation: slide-in 0.4s linear 0.2s both; 
}
```
Then we need to create the actual animation and for that we use @keyframes to actually dictate the behaviour of our animation. Here we are declaring an animation (just like declaring a function) and so we declare its name. Then we are going to do like we did with the overlay where we have it off the screen and then on the screen. For this we use the property 'transform: trnslateX' and we have it starting from -100% (we use % because it is not the parent element), i.e. off the screen, to 0, i.e. back fully on the screen. 
```css
@keyframes slide-in {
from{
transform: translateX(-100%);
}
to {
transform: translateX(0);
}
}
```
Now we do the slide-out animation so we can copy and paste amd making it the opposite.

In order to trigger the animation we need to add the slide-in class dealing with the menu nav items to the toggleMenu() function in [[animated_navigation.js]]. So within the function tooggleMenu() and beneath the animation-in for the overlay we add the animation-in for the nav items. 
```js
//Animate In - NAV items
navHome.classList.remove('slide_out_yellow');
navHome.classList.add('slide_in_yellow')
```
Repeat for the remaining menu nav items. Repeat for the slide out of the menu nav items.

### Cleaning up JS ###
1. Instead of having a separate line for removing and for adding a class, we can have a single line and use the replace method. The replace method takes two parameters, the first being the thing that we want to remove and the second the thing that we want to add. So with the 'Animate In - Overlay' we want to remove the class 'overlay_slide_left' and add the 'overlay_slide_right' class.
```js
overlay.classList.replace('overlay_slide_left', 'overlay_slide_right')
```
The same applies to the 'Animate Out - Overlay'
```js
overlay.classList.replace('overlay_slide_right', 'overlay_slide_left')
```
However, if we check we see that now when we click on the hamburger menu nothing happens. If we look at the elements tab in the console we see that when we click the menu icon the active overlay appears but there is no slide_left or slide_right happening. The reason that this is happening is because we cannot replace a class with another class if that first class is not there. So since we want the nav items to slide in, i.e. slide_right, we add the slide_left class to the overlay by default.
```html
<!-- Menu Overlay -->

<div class="overlay overlay_slide_left" id="overlay">

```
Now when we check we see the site functioning as it should with the nav items sliding when the menu icon is clicked. The elements tab in the console also shows that the 'overlay_slide_left' class which is now present by default gets replaced by 'overlay_slide_right' when the menu icon is clicked.

Since we also have the add and the remove methods for the nav items we should replace the add and replace for each colour with the replace method and add the 'slide_out' class to the nav in the html as we did above with the overlay.
```html
<nav>

<ul>

<li id="nav_home" class="slide_out_yellow">

<a href="#home">Home</a>

</li>
.
.
.
</nav>
```
```js
navHome.classList.replace('slide_out_yellow', 'slide_in_yellow')
.
.
.
```

However, there is a more efficient way of dealing with the nav items.

First, change the html as above.
Then create an array of the nav items like so
```js
navItems = ['navHome', 'navAbout', 'navSkills', 'navProjects', 'navContact']
```
Then we create a function for each of the 'Animate In' and the 'Animate Out' each which we will pass in two parameters. Similar to the replace method, the first parameter will be the direction which we want to be replaced and the second parameter the direction that will be the replacement. So for the Animate In the first parameter will be 'out' and the second parameter will be out, and vice versas for the 'Animate Out'.
```js
//Animate In - Nav Items
navAnimation('out', 'in')

//Animate Out - Nav Items
navAnimation('in', 'out')

}
```
Above both of them insert a comment title 'Control Navigation Animation' and declare the function which will have two variables which we will call 'direction1' and 'direction2'. Because we created an array with the nav items above we can use the array method, forEach, to loop through the array and which allows us to run a function on each item within the array. The forEach method will have two parameters, the array item which we will call navItem and the second parameter is 'i' which will signal the index number of each item. Then within the replace method we want to pass in and pass out, for example, the class 'slide_in_yellow' and 'slide_out_yellow'. This means that here we might need to create another array listing the colours so
```js
navColours = ['yellow', 'orange', 'teal', 'blue', 'purple']
```
```js
//Control Navigation Animation
function navAnimation (direction1, direction2) {

navItems.forEach((nav, i) => {

nav.classList.replace(

`slide_${direction1}`._navItems[i],

`slide_${direction2}`._navItems[i]

)

})

}
```
Now we see that the navigation slide in and slide out works but is missing the ratchet effect.