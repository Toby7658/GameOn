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
//see Readme credit line 15, 13, for reference
function letsPlay() {
  moveAlien();
  multiplyAlien();
}

// sound for blast when alien is hit
// see Readme credit line 15, 25, 46 for reference
function playAudio(what) {
  if (what === "blast") {
    document.getElementById('blast').play();

  }
}

// multiply aliens at random intervals using math.random
// see Readme credit line 7, 15, 17, 29, 43, 45 for reference
function multiplyAlien() {
  multiplyAlienGirl = setInterval(() => {
    let alien = document.createElement("div"); // created a new div element for alien
    alien.classList.add("aliengirl"); // css classname & adds set of space separated tokens to the list (list of class names of an element)
    alien.style.left = Math.floor(Math.random() * (window.innerWidth - 100)) + "px"; // left property of alien, same as, random numbers x width of screen
    canvas.appendChild(alien); // minus width of alien + the set pixel size
  }, 2000);
}

// score increases when aliens are hit
// see Readme credit line 8, 15, 26, 32 for reference
function updateScore() {
  document.getElementById("score").innerHTML = parseInt(document.getElementById("score").innerHTML) + 1;
}

// for loops through a block of code a number of times
// see Readme credit line 6, 14, 15, 25, 32 for reference
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
// see Readme credit line 7, 15, 33 for reference
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
// see Readme credit line 7, 12, 15, 43, 45 for reference
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
// see Readme credit line 15, 42 for reference
function moveAlien() {
  moveAlienGirl = setInterval(() => {
    const alienGirls = document.getElementsByClassName("aliengirl");
    for (let i = 0; i < alienGirls.length; i++) {
      alienGirls[i].style.top = parseInt(window.getComputedStyle(alienGirls[i]).getPropertyValue("top")) + 30 + 'px';

      if (parseInt(window.getComputedStyle(alienGirls[i]).getPropertyValue("top")) > window.innerHeight - 100) {
        const el = document.createElement('div');
        el.setAttribute('id', 'splash');

        // at game end_ clear to start again when enter is pressed
        // see Readme credit line 15, 17, 41 for reference
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

// function for arrow buttons to direct movement of hero rocketship
// if a specified condition is true get style & property value of ship (css & default) & (right side of ship) + 20 (moveBy)
// get style & property value ship width, less or = to css & default/property value of canvas width
// set right position of ship = style of ship & propertyValue of right position + 20 + pixels
// including canvas width so width will adapt as per canvas and not inputted number

// see Readme credit line 15, 39 for reference
function moveLeft() {
  if (parseInt(window.getComputedStyle(ship).getPropertyValue("right")) + moveBy +
    parseInt(window.getComputedStyle(ship).getPropertyValue("width")) <= parseInt(window.getComputedStyle(canvas).getPropertyValue("width"))) {
    ship.style.right = parseInt(window.getComputedStyle(ship).getPropertyValue("right")) + moveBy + 'px';
  }
}

// if a specified condition is true get style & property value of ship right value minus 20 (moveBy) is greater or equal to 0
// the style right value is the same as the computed style & property of ship minus 20 plus pixcel
function moveRight() {
  if (parseInt(window.getComputedStyle(ship).getPropertyValue("right")) - moveBy >= 0) {
    ship.style.right = parseInt(window.getComputedStyle(ship).getPropertyValue("right")) - moveBy + "px";
  }
}

function moveUp() {
  if (parseInt(window.getComputedStyle(ship).getPropertyValue("top")) - moveBy >= 
    parseInt(window.getComputedStyle(canvas).getPropertyValue("height"))) {
    // parseInt(window.getComputedStyle(ship).getPropertyValue("top"));
    // parseInt(window.getComputedStyle(canvas).getPropertyValue("height"));
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
// see Readme credit line 15, 17, 24, 30 for reference
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