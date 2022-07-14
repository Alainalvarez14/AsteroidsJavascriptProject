// import Asteroids from "./asteroids.js";
import Spaceship from "./spaceship.js";

class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.dimensions = { width: canvas.width, height: canvas.height };
        // this.asteroid = new Asteroids(this.dimensions);
        this.spaceShip = new Spaceship(this.dimensions);
        this.startGame();
    }

    startGame() {
        this.animate();
    }

    animate() {
        // this.asteroid.animate(this.ctx);
        this.ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height);
        this.spaceShip.animate(this.ctx);
        requestAnimationFrame(this.animate.bind(this));
    }
}


export default Game;
