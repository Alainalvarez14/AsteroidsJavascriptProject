import Game from "./scripts/game";

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const startGame = document.getElementById('startGame');
    const startButton = document.getElementById('startButton');
    const count = document.getElementById('count');
    const introduction = document.getElementById('introduction');
    const playAgainButton = document.getElementById('playAgainButton');
    const gameOver = document.getElementById('gameOver');
    const gameOverImg = document.getElementById('gameOverImg');

    setTimeout(() => {
        introduction.style.display = "none";
        startGame.style.display = "block";
        startButton.style.display = "block";
        // instructions.style.display = "block";
        // instructionsDropdown.display = "block"
    }, 500)

    startButton.addEventListener("click", e => {
        startGame.style.display = "none";
        startButton.style.display = "none";
        count.style.display = "block";
        canvas.style.display = "block";
        new Game(canvas);
    });

    playAgainButton.addEventListener('click', e => {
        gameOver.style.display = "none";
        gameOverImg.style.display = "none";
        count.style.display = "block";
        canvas.style.display = "block";
        new Game(canvas);
    });


});
