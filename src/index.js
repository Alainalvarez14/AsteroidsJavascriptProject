import Game from "./scripts/game";

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    canvas.height = 700;
    canvas.width = 900;
    new Game(canvas);
});
