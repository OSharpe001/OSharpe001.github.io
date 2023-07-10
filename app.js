// SOUNDS SECTIION
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
const cheering = [
    "game_sounds/cheering_crowd.mp3",
    "game_sounds/cheering_kids.mp3",
];
const shortApplause = new Audio("game_sounds/2sec_applause.mp3");
const longApplause = new Audio("game_sounds/applause.mp3");
const sad = new Audio("game_sounds/aww.mp3");
const correctBell = new Audio("game_sounds/bell.mp3");
const wrongBuzzer = new Audio("game_sounds/buzzer.mp3");

const settingsPageCard = document.querySelector(".index-card");
const playersSection = document.querySelector("#players-section");
const gamePage = document.getElementById("game-page");
const indexPage = document.getElementById("index-page");
const cardGame = document.querySelector(".card-game");
const pokeContainer = document.querySelector("#poke-container");
const cardsSection = document.querySelector(".cards");
const roundCongrats = document.querySelector(".winners-announcement");
const winnerName = document.querySelector(".winner-name");
const tournamentCongrats = document.querySelector(".tournament-winners-announcement");
const tournamentWinnerName = document.querySelector(".tournament-winner-name");
const menu = document.querySelector("form");
const settingsButton = document.querySelector("#open-menu");
const gameStyle = document.querySelector("#game-style");
const amountOfPlayers = document.querySelector("#amount-of-players");
const singleOrTournament = document.getElementsByName("single-or-tournament");
const difficultyLevel = document.getElementsByName("difficulty-level");
const player1Rename = document.querySelector("#player1-rename");
const player2Rename = document.querySelector("#player2-rename");
const player1Name = document.querySelector(".player1-name");
const player2Name = document.querySelector(".player2-name");
const player2NameLabel = document.querySelector(".player2-name-label");
const soundOptions = document.querySelector("#sound-options");
const soundOn = document.querySelector("#toggle-sound-on");
const soundOff = document.querySelector("#toggle-sound-off");
const footer = document.querySelector("footer");

// LOCAL STORAGE GET AND SET FUNCTIONS
const storeWins = (tally) => localStorage.setItem("Match Game Wins", JSON.stringify(tally));
const viewWins = () => JSON.parse(localStorage.getItem("Match Game Wins"));

let cardMatchAmount;
let cardSelection;
let level;
let playerAmount;
let tournamentType;

// LIST THAT KEEP TRACK OF FLIPPED CARDS TO DICIPHER SCORING SITUATIONS AND FLIPPING BACK UNMATCHED CARDS
let flippedCardIdList;
let flippedCards;
let shuffledCards = [];
let soundIsOn = true;

// ** SET UP FOR FUTURE POSSIBILITY OF A SINGLE PLAYER GAME (BEAT THE CLOCK)
// function handlePlayerAmountChange(value) {
//     value = parseInt(value);
//     // console.log("handlePlayerAmountChange VALUE: ", value);
//     if (value === 2) {
//         gameStyle.className = "";
//         player2Rename.className = "";
//         player2NameLabel.className = "player2-name-label";
//     } else {
//         gameStyle.className = "hidden";
//         player2Rename.className = "hidden";
//         player2NameLabel.className = "player2-name-label hidden";
//     };
//     playerAmount = value;
// };

const toggleSound = () => {
    soundOn.classList.toggle("hidden");
    soundOff.classList.toggle("hidden");
    soundIsOn = !soundIsOn;
}

// CHANGING AMOUNT OF ROUNDS TO WIN TO WIN THE TOURNAMENT
const handleGameTypeChange = (value) => {
    value = parseInt(value);
    tournamentType = value;
};

// CHANGING AMOUNT OF MATCHES ACCORDING TO "DIFFICULTY"
const handleDifficultyChange = (value) => {
    value = parseInt(value);
    cardMatchAmount = value;
    if (value === 15) {
        level = "E";
    } else if (value === 9) {
        level = "N";
    };
};

const openMenu = () => {
    settingsButton.classList.add("hidden");
    menu.classList = "menu";
};

const closeMenu = () => {
    settingsButton.className = "form-button";
    menu.classList = "menu hidden";
    resetGame();
};

const submitForm = () => {
    // if (!playerAmount || !cardMatchAmount || (playerAmount === 2 && !tournamentType)) {
    if (!cardMatchAmount || !tournamentType) {
        alert("Please choose tournament type and difficulty");
    // } else if (playerAmount === 1) {
    //     window.alert("Sorry. The single player game is not yet available. . .")
    //     // singlePlayerGame();
    } else {
        indexPage.classList = "hidden";
        menu.classList = "menu hidden";
        playersSection.className = "";
        if (level === "E") {
            pokeContainer.id = `poke-container${level}`;
        };
        initializeGamePage();
        fetchPokemon();
        startGame();
    };

    // RENAMING PLAYER 1 AND PLAYER 2
    if (player1Rename.value) {
        player1Name.innerHTML = player1Rename.value;
    };
    if (player2Rename.value) {
        player2Name.innerHTML = player2Rename.value;
    };
};

// FLIP ABILITY AND RANDOM PIKACHU SOUND-BITES FOR SETTINGS SCREEN CARD
settingsPageCard.addEventListener("click", () => {

    // GRAB A RANDOM PIKACHU SOUND-BITE FROM SELECTION
    let pikaSound = new Audio(pikaSounds[Math.floor(Math.random()*pikaSounds.length)]);

    // MAKING SURE THAT THE STARTING PAGE CARD'S CLASS IS PROPER TO ENSURE CONSTANT FLIP ABILITY
    if (settingsPageCard.classList[2]==="flip-down") {
        settingsPageCard.classList.replace("flip-down", "flip-up");
    } else {
        settingsPageCard.classList.add("flip-up");
    };
    setTimeout(()=>settingsPageCard.id = "", 750);
    setTimeout(()=>pikaSound.play(), 350);
    setTimeout(()=>settingsPageCard.classList.replace("flip-up", "flip-down"), 3000);
    if (level === "E") {
        setTimeout(()=>settingsPageCard.id = `face-down${level}`, 3750);
    } else {
        setTimeout(()=>settingsPageCard.id = "face-down", 3750);
    };
});

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

const initializeScores = () => {
    player1.score.innerText = 0;
    player2.score.innerText = 0;
};

const initializeLocalStorage = () => {
    storeWins([`Player 1 - 0`,`Player 2 - 0`]);
};

// SETTING THE PLAYER WINS (IN THE DOM) BASED OFF OF THE LOCAL STORAGE VALUES
const initializeWins = () => {
    player1.wins.innerText = viewWins()[0].split(" ")[3];
    player2.wins.innerText = viewWins()[1].split(" ")[3];
};

// INITIALIZING PLAYER 1 AS THE FIRST PLAYER (FOR WHEN STARTING TOURNAMENT)
const initializePlayersTurn = () => {
    player1.player.classList.add("players-turn");
};

const initializeCardTrackers = () => {
// KEEPING TRACK OF THE PARTICULAR CARDS AND THE CARDS' ID'S FOR THE RECENTLY FLIPPED CARD(S)
    flippedCardIdList = [];
    flippedCards = [];
};

// HIDING THE GAME PAGE SECTION UPON INITIALIZATION/RESET
gamePage.classList = "hidden";

// RESET FUNCTION TO ALLOW PLAYERS TO RESET EVERYTHING AND RETURN TO THE "START-GAME" PAGE
const resetGame = () => {
    window.location = "index.html";
};

// SWITCH SCREENS TO ESCAPE THE "START-GAME" PAGE AND ENTER THE "GAME" PAGE
function startGame() {
    gamePage.classList = "";
    soundOptions.classList = "";
    indexPage.classList = "hidden";
    initializeLocalStorage();
    initializeScores();
    initializeWins();
    initializePlayersTurn();
    initializeCardTrackers();
};

const initializeGamePage = () => {
    cardSelection = [];

    // PUSHING RANDOM NUMBERS TO GET DIFFERENT POKEMON EACH TIME WITH MINIMAL DUPLICATES
    for (i = 0; i < cardMatchAmount; i++) {
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
        await getPokemon(shuffledCards[i], level);
    };
};

const getPokemon = async (id, level) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    createPokemonCard(data, id, level);
};

// ALGO TO ANIMATE THE "FLIPPING FACE-UP" OF CARDS
const flipCardUp = (element, num, level) => {
    element.className = `${num} ${level} flip-up`;
    setTimeout(()=>{
        element.id = "";
        element.className =`${num} ${level} pokemon`;
    }, 750);
};

// ALGO TO FLIP CARDS FACE-DOWN
const flipCardDown = (element, num, level) => {
    setTimeout(()=>{
        if (level === "E") {
            element.id = `face-down${level}`;
        } else {
            element.id = "face-down";
        };
        element.className =`${num} ${level}`;
    }, 750);
};

const createPokemonCard = (pokemon, id, level) => {
    const pokemonEl = document.createElement("div");

    // ADDING THE ID TO THE CLASSNAME AS AN EASY IDENTIFIER (MATCH-CHECKING PURPOSES)
    pokemonEl.className = `${id} ${level}`;

    // INITIALIZING THE CARD AS "FACE-DOWN"
    if (level === "E") {
        pokemonEl.id = `face-down${level}`;
    } else {
        pokemonEl.id = "face-down";
    };

    // ##MAKING SURE THAT IF THE CARD IS ALREADY FACE-UP, IT CAN'T BE MANUALLY FLIPPED-UP, AGAIN
    pokemonEl.addEventListener("click", () => {
        // **"flippedCards.length < 2" MAKES SURE THAT A PLAYER CAN'T FLIP ANOTHER CARD IF TWO CARDS ARE FLIPPED UP, WAITING TO BE CHECKED FOR A MATCH
        if (pokemonEl.classList.length === 2 && flippedCards.length < 2) {
            flipCardUp(pokemonEl, id, level);
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

        // MAKING SURE THAT ALREADY FLIPPED CARDS ARE NOT ADDED TO THE LIST WHEN CLICKED AGAIN
        if (pokemonEl.classList[2] !== "pokemon") {
            flippedCardIdList.push(pokemonEl.classList[0]);
            flippedCards.push(pokemonEl);
        };

        if (flippedCards.length === 2 && flippedCardIdList[0] === flippedCardIdList[1]) {
            initializeCardTrackers();
            changeCurrentPlayerScore();
            if (soundIsOn) {
                setTimeout(()=>correctBell.play(), 350);
            };
        } else if (flippedCards.length === 2 && flippedCardIdList[0] !== flippedCardIdList[1]) {

            // FUNCTION TO AUTOMATICALLY FLIP BACK UNMATCHED CARDS
            ()=>{
                flippedCards[0].classList.replace("pokemon", "flip-down");
                flippedCards[1].classList.replace("pokemon", "flip-down");
            };
            setTimeout(() => {flipCardDown(flippedCards[0], id, level);flipCardDown(flippedCards[1], id, level)}, 1000);
            setTimeout(()=>{initializeCardTrackers();changeCurrentPlayer();}, 2000);
            if (soundIsOn) {
                wrongBuzzer.volume = .2;
                setTimeout(()=>wrongBuzzer.play(), 1250);
            };
        };
    });
};

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
    if ((parseInt(players[0].score.innerText) + parseInt(players[1].score.innerText)) >= cardMatchAmount) {

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
        if (player1.wins.innerHTML < tournamentType) {
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
        if (player2.wins.innerHTML < tournamentType) {
            announceRoundWinner();
        };

        // MAKES SURE THE CURRENT ROUND'S WINNER PLAYS FIRST, NEXT ROUND
        if (players[0].player.classList[2] === "players-turn") {
            setTimeout(changeCurrentPlayer, 8000);
        };
    };

    if (parseInt(viewWins()[0].split(" ")[3]) >= tournamentType || parseInt(viewWins()[1].split(" ")[3]) >= tournamentType) {
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
    if (soundIsOn) {
        shortApplause.play();
    };

    setTimeout(()=>roundCongrats.classList = "hidden winners-announcement", 7500);
    setTimeout(resetGamePage, 8000);
};

const announceTournamentWinner = () => {
    let cheeringSound = new Audio(cheering[Math.floor(Math.random()*cheering.length)]);
    if (player1.wins.innerText > player2.wins.innerText) {
        winner = player1.name.innerText;
    } else if (player1.wins.innerText < player2.wins.innerText) {
        winner = player2.name.innerText;
    };
    tournamentWinnerName.innerHTML = winner;
    tournamentCongrats.classList.toggle("hidden");
    if (soundIsOn) {
    longApplause.play();
    cheeringSound.play();
    };

    setTimeout(resetGame, 7000);
};
