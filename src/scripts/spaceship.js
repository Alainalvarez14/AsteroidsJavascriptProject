import Lasers from "./lasers";

class Spaceship {

    constructor(dimensions, canvas) {
        this.dimensions = dimensions;
        this.canvas = canvas;
        this.x = 300;
        this.y = 300;
        this.lasersArr = [];
        this.newLaser = false;
        this.width = 80;
        this.height = 68;
        this.speed = 2;
        this.changeOnX = 0;
        this.changeOnY = 0;
        this.angle = 0;
        this.circleRadius = 38
        this.spaceShip = new Image();
        this.spaceShip.src = 'src/images/SpaceShipSmall.png';
    }

    rotateShip(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle * Math.PI / 180);
        ctx.drawImage(this.spaceShip, 0 - 100 / 2, 0 - 68 / 2);
        ctx.restore();
    }

    newPosition() {
        this.x += this.changeOnX;
        this.y += this.changeOnY;
        this.detectWalls();
    }

    createLasers(ctx) {
        if (this.newLaser) {
            let laser = new Lasers(this.dimensions, this.x, this.y, this.angle);
            this.lasersArr.push(laser);
            this.newLaser = false;
        }

        for (let i = 0; i < this.lasersArr.length; i++) {
            this.lasersArr[i].animate(ctx);
        }
    }

    // drawCircleShip(ctx) {
    //     ctx.strokeStyle = 'red'
    //     ctx.lineWidth = '4'
    //     ctx.beginPath();
    //     ctx.arc(this.x, this.y, this.circleRadius, this.angle, Math.PI * 2);
    //     ctx.stroke();
    // }

    detectWalls() {
        if (this.y + this.height / 2 > this.canvas.height) {
            this.y = this.canvas.height - this.height / 2;
        }
        if (this.x + this.width / 2 > this.canvas.width) {
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
            this.changeOnX = this.speed;
        }
        if (e.key === 'ArrowLeft' || e.key === 'Left') {
            e.preventDefault();
            this.changeOnX = -this.speed;
        }
        if (e.key === 'ArrowUp' || e.key === 'Up') {
            e.preventDefault();
            this.changeOnY = -this.speed;
        }
        if (e.key === "r") {
            e.preventDefault();
            this.angle += 15;
        }
        if (e.key === "l") {
            e.preventDefault();
            this.angle -= 15;
        }
        if (e.key === ' ' || e.code === 'Space' || e.which === '32' || e.key === 'Spacebar' || e.key === 'space' || e.key === 'Space') {
            this.newLaser = true;
        }
    }

    keyUp(e) {
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === "ArrowLeft" || e.key === "ArrowUp" || e.key === "r") {
            this.changeOnX = 0;
            this.changeOnY = 0;
        }

        if (e.key === 'SpaceBar' || e.key === 'space' || e.key === 'Space' || e.key === ' ') {
            this.newLaser = false;
        }
    }

    animate(ctx) {
        this.rotateShip(ctx);
        // this.drawCircleShip(ctx);
        this.newPosition();
        this.createLasers(ctx);
    }
}



export default Spaceship;
