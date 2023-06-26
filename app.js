const playersSection = document.getElementById("players-section");
const gamePage = document.getElementById("game-page");
const indexPage = document.getElementById("index-page");

gamePage.classList = "hidden";

const resetGame = () => {
    window.location = "index.html";
};

const startGame = () => {
    gamePage.classList = "";
    indexPage.classList = "hidden";
};


console.log("playersSection", playersSection);
console.log("gamePage", gamePage);