/*jshint esversion: 6 */

// block scoped variables for different elements of the game
let canvas = document.getElementById('canvas');
let multiplyAlienGirl;
let moveAlienGirl;
let moveLaser;
let ship = document.getElementById('rocketship');
let start = 1;
let moveBy = 20; // amount of px I want to move my ship

//function to startGame  
function letsPlay() {
  moveAlien();
  multiplyAlien();
}

// sound for blast when alien is hit
function playAudio(what) {
  if (what === "blast") {
    document.getElementById('blast').play();

  }
}

// multiply aliens at random intervals using math.random
function multiplyAlien() {
  multiplyAlienGirl = setInterval(() => {
    let alien = document.createElement("div"); // created a new div element for alien
    alien.classList.add("aliengirl"); // css classname & adds set of space separated tokens to the list (list of class names of an element)
    alien.style.left = Math.floor(Math.random() * (window.innerWidth - 100)) + "px"; // left property of alien, same as, random numbers x width of screen
    canvas.appendChild(alien); // minus width of alien + the set pixel size
  }, 2000);
}

// score increases when aliens are hit
function updateScore() {
  document.getElementById("score").innerHTML = parseInt(document.getElementById("score").innerHTML) + 1;
}

// for loops through a block of code a number of times
function kill(b) {
  const alienGirls = document.getElementsByClassName("aliengirl");
  for (let i = 0; i < alienGirls.length; i++) {
    if (parseInt(window.getComputedStyle(b).getPropertyValue("top")) >= parseInt(window.getComputedStyle(alienGirls[i]).getPropertyValue("top")) &&
      parseInt(window.getComputedStyle(b).getPropertyValue("top")) <= parseInt(window.getComputedStyle(alienGirls[i]).getPropertyValue("top")) + 50 &&
      parseInt(window.getComputedStyle(b).getPropertyValue("left")) >= parseInt(window.getComputedStyle(alienGirls[i]).getPropertyValue("left")) &&
      parseInt(window.getComputedStyle(b).getPropertyValue("left")) <= parseInt(window.getComputedStyle(alienGirls[i]).getPropertyValue("left")) + 50
    ) {
      playAudio('blast'); // alien blast sound
      alienGirls[i].remove(); // alien disappears when hit 
      b.remove(); // bullet disappears
      updateScore(); // score increases
    }
  }
}

// function for bullets to shoot at set interval directed by spacebar
function moveBullet(bull) {
  moveLaser = setInterval(() => {
    if (parseInt(window.getComputedStyle(bull).getPropertyValue("top")) > 30) {
      bull.style.top = parseInt(window.getComputedStyle(bull).getPropertyValue("top")) - 30 + 'px';
    } else {
      bull.remove();
    }
    kill(bull);

  }, 100);
}
// function for bullet to leave top of ship as spacebar is pushed
function shoot() {
  let bullet = document.createElement("div");
  bullet.classList.add("laser");
  bullet.style.left = parseInt(window.getComputedStyle(ship).getPropertyValue("left")) + 10 + "px";
  bullet.style.top = parseInt(window.getComputedStyle(ship).getPropertyValue("top")) - 20 + "px";
  canvas.appendChild(bullet);

  // move bullet
  moveBullet(bullet);
}

// function for alien to move from top to bottom of screen
function moveAlien() {
  moveAlienGirl = setInterval(() => {
    const alienGirls = document.getElementsByClassName("aliengirl");
    for (let i = 0; i < alienGirls.length; i++) {
      alienGirls[i].style.top = parseInt(window.getComputedStyle(alienGirls[i]).getPropertyValue("top")) + 30 + 'px';

      if (parseInt(window.getComputedStyle(alienGirls[i]).getPropertyValue("top")) > window.innerHeight - 100) {
        const el = document.createElement('div');
        el.setAttribute('id', 'splash');

        // at game end_ clear to start again when enter is pressed
        el.innerHTML = 'GAME OVER<br/>Press Enter to Restart';
        document.getElementById('gameover').play(); // sound when game is over
        canvas.appendChild(el);
        clearInterval(moveAlienGirl);
        clearInterval(multiplyAlienGirl);
        clearInterval(moveBullet);
        start = 0;
      }
    }
  }, 1000);
}

// functions to move elements in each direction
function moveLeft() {
  if (parseInt(window.getComputedStyle(ship).getPropertyValue("right")) + moveBy +
    parseInt(window.getComputedStyle(ship).getPropertyValue("width")) <= parseInt(window.getComputedStyle(canvas).getPropertyValue("width"))) {
    ship.style.right = parseInt(window.getComputedStyle(ship).getPropertyValue("right")) + moveBy + 'px';
  }
}

// if a specified condition is true get style & property value of ship right value minus 20 (moveBy) is greater or equal to 0
// if style right value is the same as the computed style & property of ship minus 20 plus pixcel

// function to move right the ship using the current (at that point in time) value of the property "right" - 20 px. 
// this will  happen only if the condition in the if statement is true, which checks whether the move wil go out of the canvas
function moveRight() {
  if (parseInt(window.getComputedStyle(ship).getPropertyValue("right")) - moveBy >= 0) {
    ship.style.right = parseInt(window.getComputedStyle(ship).getPropertyValue("right")) - moveBy + "px";
  }
}

function moveUp() {
  if (parseInt(window.getComputedStyle(ship).getPropertyValue("top")) - moveBy >= 
    parseInt(window.getComputedStyle(canvas).getPropertyValue("height"))) {;
    ship.style.top = parseInt(window.getComputedStyle(ship).getPropertyValue("top")) - moveBy + 'px';
  }
}

function moveDown() {
  if (parseInt(window.getComputedStyle(ship).getPropertyValue("top")) + moveBy + 100 <= window.innerHeight) {
    ship.style.top = parseInt(window.getComputedStyle(ship).getPropertyValue("top")) + moveBy + 'px';
  }
}

function pressEnter() {
  if (start === 1) {
    document.getElementById("splash").remove(); // alert the user to press Enter to start game
    letsPlay(); // Enter key removes splash
  } else {
    document.location.reload();
  }
}

function pressSpaceBar() {
  shoot();
}

// function to activate controls via arrow tabs on keyboard
// When listener hears arrow keys, the ship moves as per key direction
// set to true as is a multi function
window.addEventListener('keydown', (e) => {
  switch (true) {
    case (e.key === 'ArrowLeft'):
      moveLeft();
      break;
    case (e.key === 'ArrowRight'):
      moveRight();
      break;
    case (e.key === 'ArrowUp'):
      moveUp();
      break;
    case (e.key === 'ArrowDown'):
      moveDown();
      break;
    case (e.key === 'Enter'):
      pressEnter();
      break;
    case (e.key === ' '):
      pressSpaceBar();
      break;
  }
});