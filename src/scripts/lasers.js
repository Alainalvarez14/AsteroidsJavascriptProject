const MAX = 10;
const LASERSPEED = 500; //pixels per second

class Lasers {
    constructor(dimensions, spaceship) {
        this.dimensions = dimensions;
        this.spaceship = spaceship;
        this.x = this.spaceship.x;
        this.y = this.spaceship.y;
        this.lasers = [];
        this.canShoot = true;
        this.radius = 10;
        this.changeOnX = 5;
        this.changeOnY = 5;
    }

    drawLasers(ctx) {
        // for (let i = 0; i < lasers.length; i++) {
        //     ctx.beginPath();
        //     ctx.arc(lasers[i].x, lasers[i].y, this.radius, 0, Math.PI * 2);
        //     ctx.fillStyle = 'red';
        //     ctx.fill();
        // }

        ctx.beginPath();
        ctx.arc(this.spaceship.x, this.spaceship.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'red';
        ctx.fill();
    }

    shootLasers() {
        // if (this.canShoot && this.lasers.length < MAX) {
        //     this.lasers.push({ //nose of ship
        //         x: this.spaceship.x + 4 / 3 * this.spaceship.radius * Math.cos(this.spaceship.angle),
        //         y: this.spaceship.y + 4 / 3 * this.spaceship.radius * Math.sin(this.spaceship.angle),
        //         xVelocity: LASERSPEED * Math.cos(this.spaceship.angle) / FPS,
        //         yVelocity: LASERSPEED * Math.sin(this.spaceship.angle) / FPS
        //     });
        // }

        // this.canShoot = false;
        this.x += this.changeOnX;
        this.y += this.changeOnY;
    }

    keyDown(e) {
        if (e.key === 'SpaceBar' || e.key === 'space') {
            e.preventDefault();
            this.shootLasers();
        }
    }

    keyUp(e) {
        if (e.key === 'SpaceBar' || e.key === 'space') {
            this.canShoot = true;
        }
    }

    animate(ctx) {
        this.drawLasers(ctx);
        this.shootLasers();
    }

}

export default Lasers;
