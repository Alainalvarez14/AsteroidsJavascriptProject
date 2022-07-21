class Asteroids {
    constructor(dimensions) {
        this.dimensions = dimensions;
        // this.canvas = canvas;
        // this.x = Math.random() * canvas.width;
        // this.y = Math.random() * canvas.height;
        this.randomNum = this.randomOption();
        this.x = this.randomX()
        this.y = this.randomY()
        this.radius = Math.random() + 20;
        this.changeOnX = Math.random() * 3;
        this.changeOnY = Math.random() * 3;
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

    randomDirection() {
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
        if (this.randomNum === 2) {
            this.x -= this.changeOnX;
            this.y += this.changeOnY;
        }
    }

    fillCircle(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'black';
        ctx.fill();
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
        if (this.randomNum === 2) {
            this.x -= this.changeOnX;
            this.y += this.changeOnY;
        }
    }

    animate(ctx) {
        this.fillCircle(ctx);
        this.update();
    }
}



export default Asteroids;
