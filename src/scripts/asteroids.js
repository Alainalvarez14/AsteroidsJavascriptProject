class Asteroids {
    constructor(dimensions) {
        this.dimensions = dimensions;
        this.x = 0;
        this.y = 0;
        this.radius = 30;
        this.changeOnX = 2;
        this.changeOnY = 4;
    }

    fillCircle(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'black';
        // ctx.stroke()
        ctx.fill();
    }

    animate(ctx) {
        //ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.fillCircle(ctx);
    }
}



export default Asteroids;
