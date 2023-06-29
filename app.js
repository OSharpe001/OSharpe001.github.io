const playersSection = document.getElementById("players-section");
const gamePage = document.getElementById("game-page");
const indexPage = document.getElementById("index-page");
const cardGame = document.querySelector(".card-game");
const poke_container = document.querySelector("#poke-container");

// LIST THAT KEEP TRACK OF FLIPPED CARDS TO DICIPHER SCORING SITUATIONS AND FLIPPING BACK UNMATCHED CARDS (THOUGH IT'S NOT HELPING WITH THE LATTER, FOR SOME REASON)
let flippedCardIdList = [];
let flippedCards = [];

// ##DIDN'T WORK WELL BUT I'LL NEED SOMETHING SIMILAR TO SAVE THE WINS
// const storeFlipped = (flipped) => localStorage.setItem("flipped", JSON.stringify(flipped));
// const viewFlipped = () => JSON.parse(localStorage.getItem("flipped"));

// PLAYER OBJECTS TO BETTER CONTROLL THE CURRENT PLAYER, SCORE, WINS, CSS
const player1 = {
    player: document.querySelector(".player1"),
    name: document.querySelector(".player1-name"),
    score: document.querySelector(".player1-score-amount"),
    wins: document.querySelector(".player1-wins-amount"),
}
const player2 = {
    player:document.querySelector(".player2"),
    name:document.querySelector(".player2-name"),
    score: document.querySelector(".player2-score-amount"),
    wins: document.querySelector(".player2-wins-amount"),
}
player1.score.innerText = 0;
player1.wins.innerText = 0;
player2.score.innerText = 0;
player2.wins.innerText = 0;
player1.player.classList.add("players-turn");

// HIDING THE GAME PAGE SECTION UPON INITIALIZATION
gamePage.classList = "hidden";

// SIMPLE FUNCTION TO ALLOW PLAYERS TO RESET EVERYTHING AND RETURN TO SETTINGS PAGE
const resetGame = () => {
    window.location = "index.html";
};

// SWITCH SCREENS TO ESCAPE (WHAT WAS SUPPOSED TO BE THE) MENU PAGE AND ENTER THE GAME PAGE
const startGame = () => {
    gamePage.classList = "";
    indexPage.classList = "hidden";
};

// const cardSetAmount = 15; // WOULD BE NICE FOR A HARDER LEVEL IN THE FUTURE WHEN THE MINIMAL VIABLE PRODUCT IS COMPLETED
// NORMAL SETTINGS TOTAL AMOUNT OF MATCHES TO ATTAIN
const cardSetAmount = 9;

const cardSelection = [];

// PUSHING RANDOM NUMBERS TO GET DIFFERENT POKEMON EACH TIME WITH MINIMAL DUPLICATES
for (i = 0; i < cardSetAmount; i++) {
    num = Math.ceil(Math.random()*150);
    if (cardSelection.indexOf(num) < 0 && num > 0) {
        cardSelection.push(num);
    } else if (cardSelection.indexOf(num+1) < 0 && (num + 1) <= 150) {
        cardSelection.push(num+1);
    } else if (cardSelection.indexOf(num-1) < 0 && (num - 1) >= 1) {
        cardSelection.push(num-1);
    } else if (cardSelection.indexOf(num-2) < 0 && (num - 2) >= 1) {
        cardSelection.push(num-2);
    } else {
        cardSelection.push(25);
    };
};

// DOUBLING THE LIST, OVER
cardSelection.push(...cardSelection);

// CARD SHUFFLING ALGO
const shuffle = (arr) => {
     arr.sort(() => Math.random() - 0.5);
     return arr;
};
const shuffledCards = shuffle(cardSelection);


// BACKGROUND COLORS FOR FLIPPED CARDS
const colors = {
    fire: '#f94e28',
    grass: '#1df148',
	electric: '#fcf351',
	water: '#417dff',
	ground: '#d67f29',
	rock: '#949492',
	fairy: '#ea9cc7',
	poison: '#d163ed',
	bug: '#84f89d',
	dragon: '#34fcff',
	psychic: '#e551fc',
	flying: '#d4f0fd',
	fighting: '#fa7777',
	normal: '#d2e4f5'
};
// ----------------------------------------------------
// UTILIZED THE POKEDEX CODE-ALONG CODE THEN CHANGED IT TO SUIT THIS PROJECT'S NEEDS
const main_types = Object.keys(colors);
const fetchPokemon = async () => {
    for (let i = 0; i < shuffledCards.length; i++) {
        // console.log(shuffledCards[i]);
        await getPokemon(shuffledCards[i]);
    };
};
const getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    createPokemonCard(data, id);
};
// ALGO TO ANIMATE THE "FLIPPING FACE-UP" OF CARDS
const flipCardUp = (element, num) => {
    element.className = `${num} flip-up`;
    setTimeout(()=>{element.id = ""; element.className =`${num} pokemon`}, 750);
};

// ALGO TO ANIMATE THE "FLIPPING FACE-DOWN" OF CARDS
const flipCardDown = (element, num) => {
    element.className = `${num}`;
    setTimeout(()=>{element.id = "face-down"; element.className =`${num}`}, 750);
};
const createPokemonCard = (pokemon, id) => {
    const pokemonEl = document.createElement("div");

    // ADDING THE ID TO THE CLASSNAME AS IN EASY IDENTIFIER (MATCH-CHECKING PURPOSES)
    pokemonEl.className = `${id}`;

    // INITIALIZING THE CARD AS "FACE-DOWN"
    pokemonEl.id = "face-down";

    // ##MAKING SURE THAT IF THE CARD IS ALREADY FACE-UP, IT CAN'T BE MANUALLY FLIPPED
    pokemonEl.addEventListener("click", () => {
        if (pokemonEl.classList.length === 1) {
            flipCardUp(pokemonEl, id);
        };
    });

    // ORIGINAL POKEDEX CODE TO ADD BACKGROUND COLORS IN ACCORDANCE TO POKEMON'S MAIN TYPE
    const poke_types = pokemon.types.map(type => type.type.name);
    const type = main_types.find(type => poke_types.indexOf(type) > -1);
    const color = colors[type];
    pokemonEl.style.backgroundColor = color;

    // PART OF POKEDEX CODE - MODIFIED SINCE I ONLY NEED THE PICTURE
    const pokemonInnerHTML = `
        <div class="image-container">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png" alt="">
        </div>
    `;

    // ORIGINAL POKEDEX CODE TO APPEND ALL INDIVIDUAL POKEMON CARDS TO THE DOM
    pokemonEl.innerHTML = pokemonInnerHTML;
    poke_container.appendChild(pokemonEl);

    // EVENT LISTENER FOR MATCH-CHECKING, SCORING/LOSE-TURN SITUATION AND (TRYING) TO UNFLIP MISMATCHED SELECTIONS
    pokemonEl.addEventListener("click", (e) => {

        // MAKING SURE THAT ALREADY FLIPPED CARDS ARE NOT ADDED TO THE LIST WHEN CLICKED
        if (pokemonEl.classList[1] !== "pokemon") {
            flippedCardIdList.push(pokemonEl.classList[0]);
            flippedCards.push(pokemonEl);
        }
        // console.log("flippedCards: ", flippedCards)
        console.log("pokemonEl; ", pokemonEl);
        // console.log("pokemonEl.classList[0]; ", pokemonEl.classList[0]);
        console.log("FLIPPEDCardIdLIST: ", flippedCardIdList);
        if (flippedCards.length === 2 && flippedCardIdList[0] === flippedCardIdList[1]) {
            flippedCards = []; //DO NOT ERASE!!-------------
            flippedCardIdList = []; //DO NOT ERASE!!-------------
            changeCurrentPlayerScore();
        } else if (flippedCards.length === 2 && flippedCardIdList[0] !== flippedCardIdList[1]) {
            console.log("##--MISMATCHED CHECK FOR THE LATEST CARD: ", e.target)
            // console.log("---NONMATCHING CARDS -- FLIPPEDCARDS#2---: ", flippedCards[1]);
            // ***CREATE A FUNCTION TO AUTOMATICALLY FLIP BACK UNMATCHED CARDS!!
            flippedCards[0].classList.replace("pokemon", "flip-down");
            flippedCards[1].classList.replace("pokemon", "flip-down");
            setTimeout(flipCardDown(flippedCards[0], id), 1750);
            // setTimeout(flipCardDown(flippedCards[1], id), 1750);
            // setTimeout(flipCardDown(e.target, id), 1750); // ***CURRENTLY WORKING ON THIS! E- THE PARTICULAR EVENT (AND ATTRIBUTES THEREOF) THAT TRIGGERED THIS FUNCTION

            flippedCards = []; //DO NOT ERASE!!-------------
            flippedCardIdList = []; //DO NOT ERASE!!-------------
            changeCurrentPlayer(); //DO NOT ERASE!!-------------
        };
    });
};
fetchPokemon();
// ----------------------------------------------------

const players = [player1, player2];

// CHANGE PLAYER FUNCTION
const changeCurrentPlayer = () => {
    player1.player.classList.toggle("players-turn");
    player2.player.classList.toggle("players-turn");
};

// CHANGE CURRENT PLAYER'S SCORE FUNCTION
const changeCurrentPlayerScore = () => {
    for (i = 0; i < players.length; i++) {
        if (players[i].player.classList[2] === "players-turn") {
            // console.log(players[i].name.innerText);
            players[i].score.innerText++;
            // console.log(`${players[i].name.innerText}'s SCORE:`, players[i].score.innerText);
        };
    };
};

// CHANGE THE CURRENT PLAYERS "WINS" FUNCTION
const changeCurrentPlayerWins = () => {
    for (i = 0; i < players.length; i++) {
        if (players[i].player.classList[2] === "players-turn") {
            // console.log(players[i].name.innerText);
            players[i].wins.innerText++;
            // console.log(`${players[i].name.innerText}'s WINS:`, players[i].wins.innerText);
        };
    };
};


// const cards = document.querySelector(".poke-container").innerHTML;
// console.log("CARDS SECTION: ", cards);

// console.log(players);
// console.log("PLAYER1: ", player1);
// console.log("PLAYER1: ", player2);
// console.log("player1.classList", player1.classList);
// console.log("PLAYER1: ", player1.name.innerText);
// console.log("PLAYER1: ", player2);
// console.log("player1.classList[2]", player1.classList[2]);
// console.log("playersSection", playersSection);
// console.log("gamePage", gamePage);
// console.log("poke_container", poke_container);
// console.log("cardSelection", cardSelection);
// console.log("shuffledCards", shuffledCards);
console.log("Global - flippedCardIdList", flippedCardIdList);
console.log("Global - flippedCards", flippedCards)