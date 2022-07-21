import Asteroids from "./asteroids.js";
import Spaceship from "./spaceship.js";

class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.dimensions = { width: this.canvas.width, height: this.canvas.height };
        this.spaceShip = new Spaceship(this.dimensions, this.canvas);
        this.frames = 0;
        this.asteroidArr = [];
        this.startGame();
        this.eventListeners();
    }

    startGame() {
        this.animate();
    }

    eventListeners() {
        document.addEventListener('keydown', this.keyDown.bind(this));
        document.addEventListener('keyup', this.keyUp.bind(this));
    }

    keyDown(e) {
        this.spaceShip.keyDown(e);
    }

    keyUp(e) {
        this.spaceShip.keyUp(e);
    }

    asteroidMultiplier() {
        if (this.frames % 20 === 0) {
            let asteroid = new Asteroids(this.dimensions);
            this.asteroidArr.push(asteroid);
        }
        for (let i = 0; i < this.asteroidArr.length; i++) {
            this.asteroidArr[i].animate(this.ctx);
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height);
        this.asteroidMultiplier();
        this.spaceShip.animate(this.ctx);
        this.frames++;
        requestAnimationFrame(this.animate.bind(this));
    }

}

export default Game;
