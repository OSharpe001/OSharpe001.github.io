# Welcome to the Pokemon Memory Match Game's Readme.
**Here, we'll discuss issues and resources used to get past them (if any), issues that I could'nt (yet) overcome, technologies used (if any) and cap it all off with a nice little "User Story" of expectations when using the app.**


## Issues that needed research/resource(s) and troubling issues:

**Creating bubble text**
https://www.youtube.com/watch?v=vJtN7vGvmS4

**Placing an arch on my slogan**
https://www.geeksforgeeks.org/how-to-create-a-curve-text-using-css3-canvas/
A lot of work for a lottle design.

**Using JavaScript to navigate to another page within my app**
https://www.tabnine.com/academy/javascript/how-to-redirect-url-javascript/
--Not working for some reason--
Ended up making it a single page app, utilizing CSS to hide the "currently unnecessary page".

**Getting a variable from one JavaScript file to another**
--Using import/export statements is not working. Will probably have to utilize only one JavaScript file for entire app. Also had to incorporate my game onto the main page, index.html (difficulty getting data to transfer between pages. Ended up making a single page app).--

**Rounding up to the nearest number**
https://www.w3schools.com/jsref/jsref_ceil.asp
--The shuffle-cards algorithm I created that utilized this was redundant (shuffle had the same placement with the same number of cards to shuffle)ended up not utilizing "Math.ceil" in this app--

**Figuring out how to shuffle an array**
https://javascript.info/task/shuffle#:~:text=Write%20the%20function%20shuffle(array,%2C%202%5D%20%2F%2F%20...

**GitHub servers went down for more than a few minutes, making my app inoperable**
--I need to collect all the Pokemon data and refactor my code to be able to allow my app to work without any outside dependencies--
Spent a lot of time gathering Pokemon pictures from the web, cleaning the images and making a Javascript file to represent each picture and assosiated info. Did not utilize this, as yet, since it will take a decent amount of refactoring but still considering it.

**Having **


## Technologies Used

**Currently, this app uses JavaScript's "async/await" method to gather new Pokemon info for each refresh (subject to change)**

**Currently, this program utilizes info from a RESTful API, namely "PokeAPI" from GitHub (link:https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/) (subject to change)**

**This app utilizes the client's local storage to keep track of round-wins**



## Live Site Link:
### **https://osharpe001.github.io**


## User Story:
### **Please keep in mind that this is a "best-of-five" tournament game. A player is expected to win three seperate rounds to be considered the winner.**

### 1- As a user, I expect there to be a simple user interface to begin the game.

### 2- As a user, after starting the game, I expect to see a decent number of face-down cards for me and my opponent to take turns matching.

### 3- As a user, when I select a card, I expect it to flip over to reveal the face.

### 4- As a user, after flipping over two cards, I expect to gain a point if the two cards match and gain another turn.

### 5- As a user, after flipping over two cards, I expect to lose my turn to the other player if the two cards didn't match.

### 6- As a user, I expect the computer to tally the points and announce a winner of the round, once all cards are matched.

### 7- As a user, once all cards are matched and the winner of the round is announced, I expect all the cards to be randomized and flipped face-down to begin the next round. (NOT YET ACHIEVED)

### 8- As a user, at the beginning of each subsequent round, I expect that the computer will keep track of all of the prior wins of both my opponent and myself.

### 9- As a user, I expect the winner of the prior round to go first in the current round. (NOT YET ACHIEVED)

### 10- As a user, I expect that the first person to win three rounds will be declared the tournament winner. (NOT YET ACHIEVED)

### 11- As a user, after the tournament is completed, I expect the game to be reset to the first screen (Start Game Screen). (NOT YET ACHIEVED)

### 12- As a user, if I begin another tournament, I expect all of the prior tournament's scores to be reset.

### 13- As a user, I also expect there to be a way to reset the tournament, manually.
