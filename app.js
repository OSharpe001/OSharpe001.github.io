const playersSection = document.getElementById("players-section");
const gamePage = document.getElementById("game-page");
const indexPage = document.getElementById("index-page");
const cardGame = document.querySelector(".card-game");
const poke_container = document.querySelector("#poke-container");


gamePage.classList = "hidden";

const resetGame = () => {
    window.location = "index.html";
};

const startGame = () => {
    gamePage.classList = "";
    indexPage.classList = "hidden";
};

// const cardSetAmount = 15;
const cardSetAmount = 9;
const cardSelection = [];

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
    }
};
cardSelection.push(...cardSelection);
const shuffle = (arr) => {
     arr.sort(() => Math.random() - 0.5);
     return arr
};
const shuffledCards = shuffle(cardSelection);


// ----------------------------------------------------
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
const main_types = Object.keys(colors);
const fetchPokemon = async () => {
    for (let i = 0; i < shuffledCards.length; i++) {
        console.log(shuffledCards[i]);
        await getPokemon(shuffledCards[i]);
    };
};
const getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    createPokemonCard(data, id);
};
const createPokemonCard = (pokemon, id) => {
    const pokemonEl = document.createElement("div");
    // pokemonEl.classList.add("pokemon");
    pokemonEl.className = `${id}`;
    pokemonEl.id = `face-down`;
    pokemonEl.addEventListener("click", () => {
        // pokemonEl.classList.add("pokemon");
        pokemonEl.id = "flip-up";
        setTimeout(()=>{pokemonEl.id = ""; pokemonEl.classList.add("pokemon")}, 1000)
    })

    const poke_types = pokemon.types.map(type => type.type.name);
    console.log("poke_types", poke_types);

    const type = main_types.find(type => poke_types.indexOf(type) > -1);
    const color = colors[type];
    pokemonEl.style.backgroundColor = color;

    const pokemonInnerHTML = `
        <div class="image-container">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="">
        </div>
    `;

    pokemonEl.innerHTML = pokemonInnerHTML;
    poke_container.appendChild(pokemonEl);

};
fetchPokemon();
// ----------------------------------------------------

// console.log("playersSection", playersSection);
// console.log("gamePage", gamePage);
// console.log("poke_container", poke_container);
// console.log("cardSelection", cardSelection);
console.log("shuffledCards", shuffledCards);