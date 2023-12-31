# Welcome to the Pokemon Memory Match Game's Readme.
**Here, we'll discuss issues and resources used to get past them, issues that I couldn't (yet) overcome, technologies used, a nice little "User Story" of expectations when using the app and cap it all off with my future goals for this app.**

---

## Issues that needed research/resource(s) and troubling issues:

- ### Creating bubble text
[YouTube](https://www.youtube.com/watch?v=vJtN7vGvmS4)

- ### Placing an arch on my slogan
[GeeksforGeeks.org](https://www.geeksforgeeks.org/how-to-create-a-curve-text-using-css3-canvas/)

- ### Rounding up to the nearest number
[W3Schools.com](https://www.w3schools.com/jsref/jsref_ceil.asp)

- ### Figuring out how to shuffle an array
[JavaScript.info](https://javascript.info/task/shuffle#:~:text=Write%20the%20function%20shuffle)

- ### GitHub servers went down for more than a few minutes, making my app inoperable
I need to collect all the Pokemon data and refactor my code to be able to allow my app to work without any outside dependencies.
Spent a lot of time gathering Pokemon pictures from the web, cleaning the images and making a JavaScript file to represent each picture and associated info. Did not utilize this, as yet, since it will take a decent amount of time to refactor but still considering it.

- ### Having an issue getting the winner anouncements to show, consistently
Currently, only the first round's winner announcement appears. I've come to realize that calling the fetchPokemon function (used to initialize the face-down cards, on screen) is what stops subseqent round winner announcements and the tournament winner announcement from displaying. I don't understand why, though, especially since I've tried placing a reset for these announcements within the fetchPokemon function, as well...

-- (SOLVED!) I had the hidden winner announcements hard-coded into the html in the game page. When the game page resets, I was effectively erasing the hard coded "winner announcements". Created another div to wrap the game page and set the announcements as siblings to the game page.

### Playing audio files in JavaScript
[YouTube](https://www.youtube.com/watch?v=p4OHVJxd2FI)

### Converting m4a files to mp3 format
[YouTube](https://www.youtube.com/watch?v=bXVrr2XPRCQ&t=70s)

---

## Technologies Used

- Currently, this app uses JavaScript's "async/await" method to gather new Pokemon info for each refresh. **(subject to change)**

- Currently, this program utilizes info from a RESTful API, from [PokeAPI](https://pokeapi.co). **(subject to change)**
Also importing two Google fonts from [fonts.googleapis.com](https://fonts.googleapis.com/css?family=Oregano:300,400&display=swap) and [fonts.googleapis.com](https://fonts.googleapis.com/css?family=Sedgwick Ave:300,400&display=swap).

- This app utilizes the client's local storage to keep track of round-wins.

---

## Live Site Link:
- [Pokemon Memory Match Game](https://osharpe001.github.io)

---

## User Story:
### **Please keep in mind that this is a "best-of-five" tournament game. A player is expected to win three seperate rounds to be considered the winner.**

1. As a user, I expect there to be a simple user interface to begin the game.

2. As a user, after starting the game, I expect to see a decent number of face-down cards for me and my opponent to take turns matching.

3. As a user, when I select a card, I expect it to flip over to reveal the face.

4. As a user, after flipping over two cards, I expect an audible signal and to gain a point if the two cards match. I also expect to gain another turn.

5. As a user, after flipping over two cards, I expect an audible signal and to lose my turn to the other player if the two cards didn't match.

6. As a user, I expect the computer to tally the points and announce a winner of the round, once all cards are matched.

7. As a user, once all cards are matched and the winner of the round is announced, I expect all the cards to be randomized and flipped face-down to begin the next round.

8. As a user, at the beginning of each subsequent round, I expect that the computer will keep track of all of the prior round-wins of both my opponent and myself.

9. As a user, I expect the winner of the prior round to go first in the current round.

10. As a user, I expect that the first person to win three rounds will be announced as the tournament winner.

11. As a user, after the tournament is completed, I expect the game to be reset to the first screen (Start Game Screen).

12. As a user, if I begin another tournament, I expect all of the prior tournament's scores to be reset.

13. As a user, I also expect there to be a way to reset the tournament, manually (the slogan at the top of the page).

---

## Stretch Goals

6. **Redesign the "Start Game Page" (and game algorithm) to include a menu that has a single player option and format where the player has to "beat the clock" (different times depending on difficulty).**
