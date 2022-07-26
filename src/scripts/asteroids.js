class Asteroids {
    constructor(dimensions) {
        this.dimensions = dimensions;
        this.randomNum = this.randomOption();
        this.x = this.randomX()
        this.y = this.randomY()
        this.radius = Math.random() + 20;
        this.changeOnX = Math.random() * 2;
        this.changeOnY = Math.random() * 2;
        this.angle = 0;
        this.asteroid = new Image();
        this.asteroid.src = 'src/images/Asteroid.png'
    }

    randomOption() {
        let decimal = Math.random() * (3 - 0) + 0;
        let num = Math.round(decimal);
        return num;
    }

    randomX() {
        if (this.randomNum === 0) {
            return Math.random() * (900 - 0) + 0;
        }
        if (this.randomNum === 1) {
            return Math.random() * (900 - 0) + 0;
        }
        if (this.randomNum === 2) {
            return Math.random() * (-50 - (-100)) + (-100); // if y can start anywhere, x must be negative to start from the left
        }
        if (this.randomNum === 3) {
            return Math.random() * (1000 - 950) + 950; // if y can start anywhere, x must be positive to start from the right
        }
    }

    randomY() {
        if (this.randomNum === 0) {
            return Math.random() * ((-20) - (-50)) + (-50); // if x can start anywhere, y must be negative to start from above
        }
        if (this.randomNum === 1) {
            return Math.random() * (780 - 750) + 750;// if x can start anywhere, y must be positive to start from below
        }
        if (this.randomNum === 2) {
            return Math.random() * (700 - 0) + 0;
        }
        if (this.randomNum === 3) {
            return Math.random() * (700 - 0) + 0;
        }
    }

    drawAsteroids(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle * Math.PI / 180);
        ctx.drawImage(this.asteroid, 0 - 108 / 2, 0 - 81 / 2);
        ctx.restore();
    }

    update() {
        if (this.randomNum === 0) {
            this.x += this.changeOnX;
            this.y += this.changeOnY;
        }
        if (this.randomNum === 1) {
            this.x -= this.changeOnX;
            this.y -= this.changeOnY;
        }
        if (this.randomNum === 2) {
            this.x += this.changeOnX;
            this.y -= this.changeOnY;
        }
        if (this.randomNum === 3) {
            this.x -= this.changeOnX;
            this.y += this.changeOnY;
        }
    }

    animate(ctx) {
        this.drawAsteroids(ctx);
        this.update();
        this.angle++;
    }
}



export default Asteroids;
