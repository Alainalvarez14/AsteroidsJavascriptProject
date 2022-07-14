import Game from "./scripts/game";

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    canvas.height = 900;
    canvas.width = 1100;
    new Game(canvas);
});
