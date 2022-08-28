
// block scoped variables for different items of the game
let canvas = document.getElementById('canvas');
let multiplyAlienGirl
let moveAlienGirl
let moveLaser
let ship = document.getElementById('rocketship');
let start=1;
let moveBy = 20;
//function to startGame 

function letsPlay() {
  moveAlien();
  multiplyAlien();
}

// multiply aliens at random intervals using math.random
function multiplyAlien() {
   multiplyAlienGirl = setInterval(() => {
    let alien = document.createElement("div");
    alien.classList.add("aliengirl");
    alien.style.left = Math.floor(Math.random() * (window.innerWidth-100)) + "px"; // aliens fall width of screen
    canvas.appendChild(alien);
  },2000)
}

// score increases when aliens are hit
function updateScore(){
  document.getElementById("score").innerHTML = parseInt(document.getElementById("score").innerHTML) + 1; 
}

function kill(b){
  const alienGirls = document.getElementsByClassName("aliengirl");
  for (let i = 0; i < alienGirls.length; i++) {
    if(parseInt(window.getComputedStyle(b).getPropertyValue("top")) >= parseInt(window.getComputedStyle(alienGirls[i]).getPropertyValue("top")) &&
    parseInt(window.getComputedStyle(b).getPropertyValue("top")) <= parseInt(window.getComputedStyle(alienGirls[i]).getPropertyValue("top")) + 50 &&
    parseInt(window.getComputedStyle(b).getPropertyValue("left")) >= parseInt(window.getComputedStyle(alienGirls[i]).getPropertyValue("left")) &&
    parseInt(window.getComputedStyle(b).getPropertyValue("left")) <= parseInt(window.getComputedStyle(alienGirls[i]).getPropertyValue("left")) + 50 
    ) {
      
      alienGirls[i].remove(); // alien disappears when hit 
      b.remove(); // bullet disappears
      updateScore(); // score increases
    }   
  }
}

/*function moveBullet() {
  moveLaser = setInterval(() => {
   const bullets = document.getElementsByClassName("laser");
   for (let i = 0; i < bullets.length; i++) {
    if (parseInt(window.getComputedStyle(bullets[i]).getPropertyValue("top")) >  30) {
      bullets[i].style.top = parseInt(window.getComputedStyle(bullets[i]).getPropertyValue("top")) - 30 + 'px';
    } else {
      bullets[i].remove()
    }
    kill(bullets[i]);
  }
 }, 300);
}*/

// function for bullets to shoot at set interval directed by spacebar
function moveBullet(bull){
  moveLaser = setInterval(() => {
  if (parseInt(window.getComputedStyle(bull).getPropertyValue("top")) >  30) {
       bull.style.top = parseInt(window.getComputedStyle(bull).getPropertyValue("top")) - 30 + 'px';
     } else {
       bull.remove()
     }
     kill(bull);
   
  }, 100);
}
// function for bullet to leave top of ship as spacebar is pushed
function shoot(){
  let bullet = document.createElement("div");
  bullet.classList.add("laser");
  bullet.style.left = parseInt(window.getComputedStyle(ship).getPropertyValue("left")) +35 + "px"; 
  bullet.style.top = parseInt(window.getComputedStyle(ship).getPropertyValue("top")) - 10 + "px"; 
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
   
     if (parseInt(window.getComputedStyle(alienGirls[i]).getPropertyValue("top")) >  window.innerHeight - 100) {
      const el = document.createElement('div');
      el.setAttribute('id', 'splash');
      
      // at game end_ clear to start again when enter is pressed
      el.innerHTML = 'GAME OVER<br />Press Enter to Restart';
      canvas.appendChild(el);
      clearInterval(moveAlienGirl);
      clearInterval(multiplyAlienGirl);
      clearInterval(moveBullet);
      start=0;
     }
   }
  }, 1000);
}


function moveleft() {
  if(parseInt(window.getComputedStyle(ship).getPropertyValue("left")) - moveBy >= 0){
    ship.style.left = parseInt(window.getComputedStyle(ship).getPropertyValue("left")) - moveBy + 'px';
  }
}

function moveright() {
  if(parseInt(window.getComputedStyle(ship).getPropertyValue("left")) + moveBy + 100){
    ship.style.left = parseInt(window.getComputedStyle(ship).getPropertyValue("left")) + moveBy + 'px';  
  }

}

function pressEnter() {
  if(start===1){
    document.getElementById("splash").remove(); // alert the user to press Enter to start game
    letsPlay();                                 // Enter key removes splash
  } else {
    document.location.reload();
  }
}

function pressSpaceBar(){
  shoot();
}

// function to activate controls via arrow tabs on keyboard
// When listener hears arrow keys_ship moves as per key direction
 window.addEventListener('keydown', (e) => {
  
  switch (true) {
    case (e.key === 'ArrowLeft'):
      moveleft();
      break;
    case (e.key === 'ArrowRight'):
    moveright();
      break;
    case (e.key === 'ArrowUp' && parseInt(window.getComputedStyle(ship).getPropertyValue("top")) - moveBy >= 0):
      ship.style.top = parseInt(window.getComputedStyle(ship).getPropertyValue("top")) - moveBy + 'px';
      break;
    case (e.key === 'ArrowDown' && parseInt(window.getComputedStyle(ship).getPropertyValue("top")) + moveBy + 100 <= window.innerHeight):
      ship.style.top = parseInt(window.getComputedStyle(ship).getPropertyValue("top")) + moveBy + 'px';
      break;
    case (e.key === 'Enter'):
      pressEnter();   
      break;
    case (e.key === ' '):
      pressSpaceBar();
    break;
  }
})
