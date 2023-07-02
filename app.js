const pikaSounds = [
                    "pika_sounds/pika1.mp3",
                    "pika_sounds/pika2.mp3",
                    "pika_sounds/pika3.mp3",
                    "pika_sounds/pika4.mp3",
                    "pika_sounds/pika5.mp3",
                    "pika_sounds/pika6.mp3",
                    "pika_sounds/pika7.mp3",
                    "pika_sounds/pika8.mp3"
                ];
const settingsPageCard = document.querySelector(".index-card");
const playersSection = document.getElementById("players-section");
const gamePage = document.getElementById("game-page");
const indexPage = document.getElementById("index-page");
const cardGame = document.querySelector(".card-game");
const poke_container = document.querySelector("#poke-container");
const cardsSection = document.querySelector(".cards");
const roundCongrats = document.querySelector(".winners-announcement");
const winnerName = document.querySelector(".winner-name");
const tournamentCongrats = document.querySelector(".tournament-winners-announcement");
const tournamentWinnerName = document.querySelector(".tournament-winner-name");
let cardSetAmount = 9; // NORMAL SETTINGS TOTAL AMOUNT OF MATCHES TO ATTAIN
let cardSelection;

// LIST THAT KEEP TRACK OF FLIPPED CARDS TO DICIPHER SCORING SITUATIONS AND FLIPPING BACK UNMATCHED CARDS
let flippedCardIdList;
let flippedCards;
let shuffledCards=[];

// FLIP ABILITY AND RANDOM PIKACHU SOUND-BITES FOR START SCREEN CARD
settingsPageCard.addEventListener("click", () => {

    // GRAB A RANDOM PIKACHU SOUND-BITE FROM SELECTION
    let sound = new Audio(pikaSounds[Math.floor(Math.random()*pikaSounds.length)]);

    // MAKING SURE THAT THE CARD'S CLASS IS PROPER TO ENSURE CONSTANT FLIP ABILITY
    if (settingsPageCard.classList[2]==="flip-down") {
        settingsPageCard.classList.replace("flip-down", "flip-up");
    } else {
        settingsPageCard.classList.add("flip-up");
    };
    setTimeout(()=>settingsPageCard.id = "", 750);
    setTimeout(()=>sound.play(), 350);
    setTimeout(()=>settingsPageCard.classList.replace("flip-up", "flip-down"), 3000);
    setTimeout(()=>settingsPageCard.id = "face-down", 3750);
});

// SAVE THE WINS INTO LOCAL STORAGE
const storeWins = (tally) => localStorage.setItem("Match Game Wins", JSON.stringify(tally));
const viewFlipped = () => JSON.parse(localStorage.getItem("Match Game Wins"));

// PLAYER OBJECTS TO BETTER CONTROLL THE CURRENT PLAYER, SCORE, WINS, CSS
const player1 = {
    player: document.querySelector(".player1"),
    name: document.querySelector(".player1-name"),
    score: document.querySelector(".player1-score-amount"),
    wins: document.querySelector(".player1-wins-amount"),
};

const player2 = {
    player:document.querySelector(".player2"),
    name:document.querySelector(".player2-name"),
    score: document.querySelector(".player2-score-amount"),
    wins: document.querySelector(".player2-wins-amount"),
};

// INITIALIZING PLAYER 1 AS THE FIRST PLAYER WHEN STARTING TOURNAMENT
player1.player.classList.add("players-turn");

const initializeScores = () => {
    player1.score.innerText = 0;
    player2.score.innerText = 0;
};
const initializeLocalStorage = () => {
    storeWins([`Player 1 - 0`,`Player 2 - 0`]);
};
const initializeWins = () => {
    player1.wins.innerText = viewFlipped()[0].split(" ")[3];
    player2.wins.innerText = viewFlipped()[1].split(" ")[3];
};
const initializePlayersTurn = () => {
    player1.player.classList.add("players-turn");
};
const initializeCardTrackers = () => {
    flippedCardIdList = [];
    flippedCards = [];
};

// HIDING THE GAME PAGE SECTION UPON INITIALIZATION
gamePage.classList = "hidden";

// RESET FUNCTION TO ALLOW PLAYERS TO RESET EVERYTHING AND RETURN TO THE "START-GAME" PAGE
const resetGame = () => {
    window.location = "index.html";
};

// SWITCH SCREENS TO ESCAPE THE "START-GAME" PAGE AND ENTER THE "GAME" PAGE
const startGame = () => {
    gamePage.classList = "";
    indexPage.classList = "hidden";
    initializeLocalStorage();
    initializeScores();
    initializeWins();
    initializePlayersTurn();
    initializeCardTrackers();
};

// const cardSetAmount = 15; // WOULD BE NICE FOR A HARDER LEVEL IN THE FUTURE
const initializeGamePage = () => {
    cardSelection = [];

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

    // DOUBLING THE LIST ITEMS
    cardSelection.push(...cardSelection);

    // CARD SHUFFLING ALGO
    const shuffle = (arr) => {
        arr.sort(() => Math.random() - 0.5);
        return arr;
    };
    shuffledCards = shuffle(cardSelection);
};
initializeGamePage();

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

// --UTILIZED THE POKEDEX CODE-ALONG CODE THEN CHANGED IT TO SUIT THIS PROJECT'S NEEDS
const main_types = Object.keys(colors);
const fetchPokemon = async () => {
    for (let i = 0; i < shuffledCards.length; i++) {
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
    setTimeout(()=>{
        element.id = "";
        element.className =`${num} pokemon`;
    }, 750);
};

// ALGO TO FLIP CARDS FACE-DOWN
const flipCardDown = (element, num) => {
    setTimeout(()=>{
        element.id = "face-down";
        element.className =`${num}`;
    }, 750);
};

const createPokemonCard = (pokemon, id) => {
    const pokemonEl = document.createElement("div");

    // ADDING THE ID TO THE CLASSNAME AS AN EASY IDENTIFIER (MATCH-CHECKING PURPOSES)
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

    pokemonEl.innerHTML = pokemonInnerHTML;
    cardsSection.appendChild(pokemonEl);

    // EVENT LISTENER FOR MATCH-CHECKING, SCORING/LOSE-TURN SITUATION AND TO UNFLIP MISMATCHED CARD SELECTIONS
    pokemonEl.addEventListener("click", () => {

        // MAKING SURE THAT ALREADY FLIPPED CARDS ARE NOT ADDED TO THE LIST WHEN CLICKED
        if (pokemonEl.classList[1] !== "pokemon") {
            flippedCardIdList.push(pokemonEl.classList[0]);
            flippedCards.push(pokemonEl);
        };

        if (flippedCards.length === 2 && flippedCardIdList[0] === flippedCardIdList[1]) {
            flippedCards = [];
            flippedCardIdList = [];
            changeCurrentPlayerScore();
        } else if (flippedCards.length === 2 && flippedCardIdList[0] !== flippedCardIdList[1]) {

            // FUNCTION TO AUTOMATICALLY FLIP BACK UNMATCHED CARDS
            ()=>{
                flippedCards[0].classList.replace("pokemon", "flip-down");
                flippedCards[1].classList.replace("pokemon", "flip-down");
            };
            setTimeout(() => {flipCardDown(flippedCards[0], id);flipCardDown(flippedCards[1], id)}, 1000);
            setTimeout(()=>{flippedCards = [];flippedCardIdList = [];changeCurrentPlayer();}, 2000);
        };
    });
};
fetchPokemon();

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
            players[i].score.innerText++;
        };
    };
        if ((parseInt(players[0].score.innerText) + parseInt(players[1].score.innerText)) >= 9) {

            // WINNER ANOUNCEMENT/ CHANGING OF WIN-TALLY/ RESET OF GAME-PAGE
            changeCurrentPlayerWins();
        };
    };

// FUNCTION TO CHANGE PLAYER'S "WINS"
const changeCurrentPlayerWins = () => {
    if (parseInt(players[0].score.innerText)>parseInt(players[1].score.innerText)) {
        players[0].wins.innerText++;
        storeWins([`Player 1 - ${player1.wins.innerHTML}`,`Player 2 - ${player2.wins.innerHTML}`]);

        // MAKING SURE THE ROUND-WINNER ANNOUNCEMENT DOESN'T PLAY AT THE END OF THE TOURNAMENT
        if (player1.wins.innerHTML < 3) {
        announceRoundWinner();
        };

        // MAKES SURE THE CURRENT ROUND'S WINNER PLAYS FIRST, NEXT ROUND
        if (players[1].player.classList[2] === "players-turn") {
            setTimeout(changeCurrentPlayer, 8000);
        };
    } else if (parseInt(players[1].score.innerText)>parseInt(players[0].score.innerText)) {
        players[1].wins.innerText++;
        storeWins([`Player 1 - ${player1.wins.innerHTML}`,`Player 2 - ${player2.wins.innerHTML}`]);

        // MAKING SURE THE ROUND-WINNER ANNOUNCEMENT DOESN'T PLAY AT THE END OF THE TOURNAMENT
        if (player2.wins.innerHTML < 3) {
        announceRoundWinner();
        };

        // MAKES SURE THE CURRENT ROUND'S WINNER PLAYS FIRST, NEXT ROUND
        if (players[0].player.classList[2] === "players-turn") {
            setTimeout(changeCurrentPlayer, 8000);
        };
    };

    if (parseInt(viewFlipped()[0].split(" ")[3]) >= 3 || parseInt(viewFlipped()[1].split(" ")[3]) >= 3) {
        announceTournamentWinner();
    };
};

const resetGamePage = () => {
    initializeScores();
    cardsSection.innerHTML = "";
    initializeGamePage();
    fetchPokemon();
};

const announceRoundWinner = () => {
    if (player1.score.innerText > player2.score.innerText) {
        winner = player1.name.innerText;
    } else if (player1.score.innerText < player2.score.innerText) {
        winner = player2.name.innerText;
    };
    roundCongrats.classList.toggle("hidden");
    winnerName.innerHTML = winner;

    setTimeout(()=>roundCongrats.classList = "hidden winners-announcement", 7500);
    setTimeout(resetGamePage, 8000);
};

const announceTournamentWinner = () => {
    if (player1.wins.innerText > player2.wins.innerText) {
        winner = player1.name.innerText;
    } else if (player1.wins.innerText < player2.wins.innerText) {
        winner = player2.name.innerText;
    };
    tournamentWinnerName.innerHTML = winner;
    tournamentCongrats.classList.toggle("hidden");

    setTimeout(resetGame, 7000);
};
