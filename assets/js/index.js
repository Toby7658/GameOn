let canvas = document.getElementById('canvas');
let multiplyAlienGirl
let moveAlienGirl
let moveLaser
let ship = document.getElementById('rocketship');
let start=1;
//function startGame() {}

function letsPlay() {
  moveAlien();
  multiplyAlien();
}

function multiplyAlien() {
   multiplyAlienGirl = setInterval(() => {
    let alien = document.createElement("div");
    alien.classList.add("aliengirl");
    alien.style.left = Math.floor(Math.random() * (window.innerWidth-100)) + "px"; // aliens fall width of screen
    canvas.appendChild(alien);
  },2000)
}

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
      
      alienGirls[i].remove(); 
      b.remove();
      updateScore();
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

function shoot(){
  let bullet = document.createElement("div");
  bullet.classList.add("laser");
  bullet.style.left = parseInt(window.getComputedStyle(ship).getPropertyValue("left")) +35 + "px"; 
  bullet.style.top = parseInt(window.getComputedStyle(ship).getPropertyValue("top")) - 10 + "px"; 
  canvas.appendChild(bullet);
  //moveBullet();
  moveBullet(bullet);
}

function moveAlien() {
   moveAlienGirl = setInterval(() => {
    const alienGirls = document.getElementsByClassName("aliengirl");
    for (let i = 0; i < alienGirls.length; i++) {
     alienGirls[i].style.top = parseInt(window.getComputedStyle(alienGirls[i]).getPropertyValue("top")) + 30 + 'px';
   
     if (parseInt(window.getComputedStyle(alienGirls[i]).getPropertyValue("top")) >  window.innerHeight - 100) {
      const el = document.createElement('div');
      el.setAttribute('id', 'splash');
      
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

 window.addEventListener('keydown', (e) => {
  let moveBy = 20;
  switch (true) {
    case (e.key === 'ArrowLeft' && parseInt(window.getComputedStyle(ship).getPropertyValue("left")) - moveBy >= 0):
      ship.style.left = parseInt(window.getComputedStyle(ship).getPropertyValue("left")) - moveBy + 'px';
      break;
    case (e.key === 'ArrowRight' && parseInt(window.getComputedStyle(ship).getPropertyValue("left")) + moveBy + 100 <= window.innerWidth):
      ship.style.left = parseInt(window.getComputedStyle(ship).getPropertyValue("left")) + moveBy + 'px';
      break;
    case (e.key === 'ArrowUp' && parseInt(window.getComputedStyle(ship).getPropertyValue("top")) - moveBy >= 0):
      ship.style.top = parseInt(window.getComputedStyle(ship).getPropertyValue("top")) - moveBy + 'px';
      break;
    case (e.key === 'ArrowDown' && parseInt(window.getComputedStyle(ship).getPropertyValue("top")) + moveBy + 100 <= window.innerHeight):
      ship.style.top = parseInt(window.getComputedStyle(ship).getPropertyValue("top")) + moveBy + 'px';
      break;
    case (e.key === 'Enter'):
      if(start===1){
        document.getElementById("splash").remove();
        letsPlay();
      } else {
        document.location.reload();
      }
      break;
    case (e.key === ' '):
      shoot();
    break;
  }
})
