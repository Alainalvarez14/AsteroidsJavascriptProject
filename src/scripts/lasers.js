class Lasers {
    constructor(dimensions, x, y, angle) {
        this.dimensions = dimensions;
        this.angle = angle;
        this.x = x;
        this.y = y;
        this.radius = 3;
        this.changeOnX = 5;
        this.changeOnY = 5;
    }

    drawLasers(ctx) {
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fill();
    }

    moveUp() {
        let laserAngleRadians = (this.angle - 90) * (Math.PI / 180)
        this.y += Math.sin(laserAngleRadians) * 5;
        this.x += Math.cos(laserAngleRadians) * 5;
    }

    animate(ctx) {
        this.drawLasers(ctx);
        this.moveUp();
    }

}

export default Lasers;
