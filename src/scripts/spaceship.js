class Spaceship {

    constructor(dimensions, canvas) {
        this.dimensions = dimensions;
        this.canvas = canvas;
        this.x = 300;
        this.y = 300;
        //Why do i need a height and width here??
        this.width = 80;
        this.height = 68;
        // Why do i need a speed?
        // Also, How does the program know that speed is movement? it originally doesnt, its because we set the value of speed to the value of changeInX
        this.speed = 2;
        this.changeOnX = 0;
        this.changeOnY = 0;
        this.angle = 1;
        this.spaceShip = new Image();
        this.spaceShip.src = 'src/images/SpaceShipSmall.png';
    }

    rotateShip(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle * Math.PI / 360);
        // ctx.drawImage(this.spaceShip, 0, 0, 0 - 100 / 2, 0 - 68 / 2);
        ctx.drawImage(this.spaceShip, 0 - 100 / 2, 0 - 68 / 2);
        ctx.restore();
    }

    // clear(ctx) {
    //     ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // }

    newPosition() {
        this.x += this.changeOnX;
        this.y += this.changeOnY;
        this.detectWalls();
    }

    detectWalls() {
        if (this.y + this.height / 2 > this.canvas.height) { //////why > and not <
            // this.y = this.canvas.height - this.height;
            this.y = this.canvas.height - this.height / 2;
        }
        if (this.x + this.width / 2 > this.canvas.width) {
            // this.x = this.canvas.width - this.width;
            this.x = this.canvas.width - this.width / 2;
        }
        if (this.x - this.width / 2 < 0) {
            this.x = 0 + this.width / 2;
        }
        if (this.y - this.height / 2 < 0) {
            this.y = 0 + this.height / 2;
        }
    }

    keyDown(e) {
        if (e.key === 'ArrowDown' || e.key === 'Down') {
            e.preventDefault(); //////passing parameter call//////// why not this.e.preventDefuat
            this.changeOnY = this.speed;
        }
        if (e.key === 'ArrowRight' || e.key === 'Right') {
            e.preventDefault();
            // this.heroMoveRight();
            this.changeOnX = this.speed;
        }
        if (e.key === 'ArrowLeft' || e.key === 'Left') {
            e.preventDefault();
            // this.heroMoveLeft();
            this.changeOnX = -this.speed;
        }
        if (e.key === 'ArrowUp' || e.key === 'Up') {
            e.preventDefault();
            // this.heroMoveUp();
            this.changeOnY = -this.speed;
        }
        if (e.key === "r") {
            // this.rotateRight();
            this.angle += 15;
        }
        if (e.key === "l") {
            // this.rotateLeft();
            this.angle -= 15;
        }
    }

    keyUp(e) {
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === "ArrowLeft" || e.key === "ArrowUp" || e.key === "r") {
            this.changeOnX = 0;
            this.changeOnY = 0;
        }
    }

    animate(ctx) {
        // this.clear(ctx);
        this.rotateShip(ctx);
        this.newPosition();
    }
}



export default Spaceship;
