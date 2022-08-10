import Game from "./scripts/game";

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const startGame = document.getElementById('startGame');
    const startButton = document.getElementById('startButton');
    const count = document.getElementById('count');
    const introduction = document.getElementById('introduction');
    const startTitle = document.getElementById('startTitle');

    setTimeout(() => {
        introduction.style.display = "none";
        startGame.style.display = "block";
        startButton.style.display = "block";
    }, 5000)

    startButton.addEventListener("click", e => {
        startGame.style.display = "none";
        startButton.style.display = "none";
        count.style.display = "block";
        canvas.style.display = "block";
        new Game(canvas);
    });

});
