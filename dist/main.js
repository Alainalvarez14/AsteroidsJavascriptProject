/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/asteroids.js":
/*!**********************************!*\
  !*** ./src/scripts/asteroids.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
class Asteroids {
  constructor(dimensions) {
    this.dimensions = dimensions;
    this.randomNum = this.randomOption();
    this.x = this.randomX();
    this.y = this.randomY();
    this.changeOnX = Math.random() * 1;
    this.changeOnY = Math.random() * 1;
    this.angle = 0;
    this.circleRadius = 23;
    this.asteroid = new Image();
    this.asteroid.src = 'src/images/Asteroid.png';
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
      return Math.random() * (-50 - -100) + -100; // if y can start anywhere, x must be negative to start from the left
    }

    if (this.randomNum === 3) {
      return Math.random() * (1000 - 950) + 950; // if y can start anywhere, x must be positive to start from the right
    }
  }

  randomY() {
    if (this.randomNum === 0) {
      return Math.random() * (-20 - -50) + -50; // if x can start anywhere, y must be negative to start from above
    }

    if (this.randomNum === 1) {
      return Math.random() * (780 - 750) + 750; // if x can start anywhere, y must be positive to start from below
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
  } // drawCircleAsteroid(ctx) {
  //     ctx.strokeStyle = 'blue'
  //     ctx.beginPath();
  //     ctx.arc(this.x, this.y, this.circleRadius, this.angle, Math.PI * 2);
  //     ctx.stroke();
  // }


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
    // this.drawCircleAsteroid(ctx);
    this.drawAsteroids(ctx);
    this.update();

    if (this.angle === 360) {
      this.angle = 0;
    }

    this.angle++;
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Asteroids);

/***/ }),

/***/ "./src/scripts/game.js":
/*!*****************************!*\
  !*** ./src/scripts/game.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _asteroids_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./asteroids.js */ "./src/scripts/asteroids.js");
/* harmony import */ var _spaceship_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./spaceship.js */ "./src/scripts/spaceship.js");



class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.dimensions = {
      width: this.canvas.width,
      height: this.canvas.height
    };
    this.spaceShip = new _spaceship_js__WEBPACK_IMPORTED_MODULE_1__["default"](this.dimensions, this.canvas);
    this.frames = 0;
    this.asteroidArr = [];
    this.count = 0;
    this.divisor = 30;
    this.previousCount = 0;
    this.gameOver = false;
    this.gamePause = false;
    this.startGame();
    this.eventListeners();
    this.counter = 0;
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
      this.gamePause = true;
      const pausedText = document.getElementById('pausedText');
      const restartButton = document.getElementById('restartButton');
      const resumeGameButton = document.getElementById('resumeGameButton');
      pausedText.style.display = "block";
      restartButton.style.display = "block";
      resumeGameButton.style.display = "block";
    }

    resumeGameButton.addEventListener('click', e => {
      pausedText.style.display = "none";
      resumeGameButton.style.display = "none";
      restartButton.style.display = "none";
      this.gamePause = false;
    });
    restartButton.addEventListener('click', e => {
      pausedText.style.display = "none";
      resumeGameButton.style.display = "none";
      restartButton.style.display = "none";
      this.restart();
    });
  }

  restart() {
    this.spaceShip = new _spaceship_js__WEBPACK_IMPORTED_MODULE_1__["default"](this.dimensions, this.canvas);
    this.frames = 0;
    this.asteroidArr = [];
    this.count = 0;
    this.divisor = 30;
    this.previousCount = 0;
    this.gameOver = false;
    this.gamePause = false;
  }

  keyUp(e) {
    this.spaceShip.keyUp(e);
  }

  asteroidMultiplier() {
    if (this.count > 0 && this.count % 10 === 0) {
      if (this.previousCount !== this.count) {
        this.previousCount = this.count;
        this.divisor -= 5;
      }
    }

    if (this.frames % this.divisor === 0) {
      let asteroid = new _asteroids_js__WEBPACK_IMPORTED_MODULE_0__["default"](this.dimensions);
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
        let sumRadius = this.asteroidArr[i].circleRadius + this.spaceShip.circleRadius;

        if (sumRadius >= distance) {
          this.asteroidArr.splice(i, 1);
          const endGame = document.getElementById('gameOver');
          endGame.style.display = "block";
          setTimeout(() => {
            endGame.style.display = "none";
            const endGameImg = document.getElementById('gameOverImg');
            endGameImg.style.display = "block";
          }, [1500]);
          this.gameOver = true;
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
          let distance = Math.sqrt(dx * dx + dy * dy); // let sumRadius = this.asteroidArr[i].circleAsteroid.radius + this.spaceShip.lasersArr[j].circleLaser.radius

          let sumRadius = this.asteroidArr[i].circleRadius + this.spaceShip.lasersArr[j].circleRadius;

          if (sumRadius >= distance) {
            this.asteroidArr.splice(i, 1);
            this.spaceShip.lasersArr.splice(j, 1);
            i--;
            j--;
            this.count++;
          }
        }
      }
    }
  }

  count2() {
    let score = document.getElementById("count");
    score.innerText = "Score: ".concat(this.count);
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

/* harmony default export */ __webpack_exports__["default"] = (Game);

/***/ }),

/***/ "./src/scripts/lasers.js":
/*!*******************************!*\
  !*** ./src/scripts/lasers.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
class Lasers {
  constructor(dimensions, x, y, angle) {
    this.dimensions = dimensions;
    this.angle = angle;
    this.x = x;
    this.y = y;
    this.radius = 3;
    this.changeOnX = 5;
    this.changeOnY = 5;
    this.circleRadius = 3;
    this.circleLaser = {
      x: this.x,
      y: this.y,
      radius: this.circleRadius
    };
  }

  drawLasers(ctx) {
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fill();
  }

  moveUp() {
    let laserAngleRadians = (this.angle - 90) * (Math.PI / 180);
    this.y += Math.sin(laserAngleRadians) * 5;
    this.x += Math.cos(laserAngleRadians) * 5;
  }

  drawCircleLaser(ctx) {
    ctx.strokeStyle = 'transparent';
    ctx.lineWidth = '3';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.circleRadius, this.angle, Math.PI * 2);
    ctx.stroke();
  }

  animate(ctx) {
    this.drawLasers(ctx);
    this.drawCircleLaser(ctx);
    this.moveUp();
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Lasers);

/***/ }),

/***/ "./src/scripts/spaceship.js":
/*!**********************************!*\
  !*** ./src/scripts/spaceship.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lasers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lasers */ "./src/scripts/lasers.js");


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
    this.circleRadius = 38;
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
      let laser = new _lasers__WEBPACK_IMPORTED_MODULE_0__["default"](this.dimensions, this.x, this.y, this.angle);
      this.lasersArr.push(laser);
      this.newLaser = false;
    }

    for (let i = 0; i < this.lasersArr.length; i++) {
      this.lasersArr[i].animate(ctx);
    }
  } // drawCircleShip(ctx) {
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
    this.rotateShip(ctx); // this.drawCircleShip(ctx);

    this.newPosition();
    this.createLasers(ctx);
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Spaceship);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
!function() {
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scripts_game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scripts/game */ "./src/scripts/game.js");

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvas');
  const startGame = document.getElementById('startGame');
  const startButton = document.getElementById('startButton');
  const count = document.getElementById('count');
  const introduction = document.getElementById('introduction');
  const playAgainButton = document.getElementById('playAgainButton');
  const gameOver = document.getElementById('gameOver');
  const gameOverImg = document.getElementById('gameOverImg');
  setTimeout(() => {
    introduction.style.display = "none";
    startGame.style.display = "block";
    startButton.style.display = "block"; // instructions.style.display = "block";
    // instructionsDropdown.display = "block"
  }, 500);
  startButton.addEventListener("click", e => {
    startGame.style.display = "none";
    startButton.style.display = "none";
    count.style.display = "block";
    canvas.style.display = "block";
    new _scripts_game__WEBPACK_IMPORTED_MODULE_0__["default"](canvas);
  });
  playAgainButton.addEventListener('click', e => {
    gameOver.style.display = "none";
    gameOverImg.style.display = "none";
    count.style.display = "block";
    canvas.style.display = "block";
    new _scripts_game__WEBPACK_IMPORTED_MODULE_0__["default"](canvas);
  });
});
}();
// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
!function() {
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

}();
/******/ })()
;
//# sourceMappingURL=main.js.map