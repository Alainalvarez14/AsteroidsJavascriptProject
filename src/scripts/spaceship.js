class Spaceship {

    constructor(dimensions) {
        this.dimensions = dimensions;
        this.x = 50;
        this.y = 50;
        //Why do i need a height and width here??
        this.width = 120;
        this.height = 80;
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
        ctx.drawImage(this.spaceShip, 200, 200, 0 - 100 / 2, 0 - 68 / 2);
        ctx.restore();
    }

    clear(ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    // newPosition() {
    //     this.x += this.changeOnX;
    //     this.y += this.changeOnY;
    //     this.detectWalls();
    // }

    // detectWalls() {
    //     if (this.y + this.height > canvas.height) { //////why > and not <
    //         this.y = canvas.height - this.height;
    //     }
    //     if (this.x + this.width > canvas.width) {
    //         this.x = canvas.width - this.width;
    //     }
    //     if (this.x < 0) {
    //         this.x = 0;
    //     }
    //     if (this.y < 0) {
    //         this.y = 0;
    //     }
    // }

    keyDown(e) {
        if (e.key === 'ArrowDown' || e.key === 'Down') {
            e.preventDefault();
            heroMoveDown();
        }
        if (e.key === 'ArrowRight' || e.key === 'Right') {
            e.preventDefault();
            heroMoveRight();
        }
        if (e.key === 'ArrowLeft' || e.key === 'Left') {
            e.preventDefault();
            heroMoveLeft();
        }
        if (e.key === 'ArrowUp' || e.key === 'Up') {
            e.preventDefault();
            heroMoveUp();
        }
        if (e.key === "r") {
            rotateRight();
        }
        if (e.key === "l") {
            rotateLeft();
        }
    }


    heroMoveDown() {
        console.log('up')
        this.changeOnY = this.speed;
    }
    heroMoveRight() {
        this.changeOnX = this.speed;
    }
    heroMoveLeft() {
        this.changeOnX = -this.speed;
    }
    heroMoveUp() {
        this.changeOnY = -this.speed; //why is Y axis up negative instead of positive???
    }
    rotateRight() {
        this.angle += 15;
    }
    rotateLeft() {
        this.angle -= 15;
    }


    keyUp(e) {
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === "ArrowLeft" || e.key === "ArrowUp" || e.key === "r") {
            this.changeOnX = 0;
            this.changeOnY = 0;
        }
        console.log(e.key)
    }

    animate(ctx) {
        ctx.drawImage(this.spaceShip, 200, 200, 0 - 100 / 2, 0 - 68 / 2);
        // this.clear(ctx);
        // this.rotateShip(ctx);
        // this.newPosition();
        //requestAnimationFrame(this.animate(ctx));
    }
}



export default Spaceship;
