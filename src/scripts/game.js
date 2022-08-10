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
        this.count = 0;
        this.divisor = 30;
        this.previousCount = 0;
        this.gameOver = false;
        this.gamePause = false;
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

        if (e.key === "p") {
            // console.log("before" + this.gamePause);
            this.gamePause = !this.gamePause;
            // console.log("after" + this.gamePause);
        }
    }

    keyUp(e) {
        this.spaceShip.keyUp(e);
    }

    asteroidMultiplier() {
        if (this.count > 0 && this.count % 10 === 0) {
            if (this.previousCount !== this.count) {
                this.previousCount = this.count
                this.divisor -= 5;
                console.log(this.divisor);
            }
        }

        if (this.frames % this.divisor === 0) {
            let asteroid = new Asteroids(this.dimensions);
            this.asteroidArr.push(asteroid);
        }
        for (let i = 0; i < this.asteroidArr.length; i++) {
            this.asteroidArr[i].animate(this.ctx);
        }
    }

    collisionDetectionShipAsteroid() {
        if (this.asteroidArr) {
            for (let i = 0; i < this.asteroidArr.length; i++) {
                let dx = this.asteroidArr[i].x - this.spaceShip.x;
                let dy = this.asteroidArr[i].y - this.spaceShip.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                let sumRadius = this.asteroidArr[i].circleAsteroid.radius + this.spaceShip.circleShip.radius
                //let sumRadius = 61;

                //asteroid 23
                //spaceship 38 
                

                if ( distance <= -15 || 
                     distance <= 15 ||
                     distance < 61 ||
                     distance === 61 ) {
                        console.log(`distance ${distance}`);
                        console.log(`sumRadius ${sumRadius}`);
                        console.log(this.asteroidArr[i]);
                        console.log(this.spaceShip.x);
                        console.log(this.spaceShip.y);
                    this.asteroidArr.splice(i, 1);
                    // const endGame = document.getElementById('gameOver');
                    // endGame.style.display = "block";
                    // this.gameOver = true;
                }
            }
        }
    }

    collisionDetectionLaserAsteroid() {
        if (this.asteroidArr && this.spaceShip.lasersArr) {
            for (let i = 0; i < this.asteroidArr.length; i++) {
                for (let j = 0; j < this.spaceShip.lasersArr.length; j++) {
                    let dx = this.asteroidArr[i].x - this.spaceShip.lasersArr[j].x;
                    let dy = this.asteroidArr[i].y - this.spaceShip.lasersArr[j].y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    let sumRadius = this.asteroidArr[i].circleAsteroid.radius + this.spaceShip.lasersArr[j].circleLaser.radius

                    if (sumRadius >= distance) {
                        // console.log(this.spaceShip.lasersArr);
                        this.asteroidArr.splice(i, 1);
                        this.spaceShip.lasersArr.splice(j, 1);
                        this.count++;
                        console.log(this.count);
                        // console.log(this.spaceShip.lasersArr);
                    }
                }
            }
        }
    }

    count2() {
        let score = document.getElementById("count");
        score.innerText = `Count: ${this.count}`;
    }

    animate() {
        if (!this.gameOver && !this.gamePause) {
            this.ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height);
            this.asteroidMultiplier();
            this.spaceShip.animate(this.ctx);
            this.collisionDetectionShipAsteroid();
            this.collisionDetectionLaserAsteroid();
            this.count2();
            this.frames++;
        }
        requestAnimationFrame(this.animate.bind(this));
    }
}

export default Game;
