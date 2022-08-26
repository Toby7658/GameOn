let canvas = document.getElementById('canvas');
let multiplyAlienGirl
let moveAlienGirl
let moveLaser
let ship = document.getElementById('rocketship');
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

function kill(b){
  const alienGirls = document.getElementsByClassName("aliengirl");
  for (let i = 0; i < alienGirls.length; i++) {
    if(parseInt(window.getComputedStyle(b).getPropertyValue("top")) >= parseInt(window.getComputedStyle(alienGirls[i]).getPropertyValue("top")) &&
    parseInt(window.getComputedStyle(b).getPropertyValue("top")) <= parseInt(window.getComputedStyle(alienGirls[i]).getPropertyValue("top")) + 50 &&
    parseInt(window.getComputedStyle(b).getPropertyValue("left")) >= parseInt(window.getComputedStyle(alienGirls[i]).getPropertyValue("left")) &&
    parseInt(window.getComputedStyle(b).getPropertyValue("left")) <= parseInt(window.getComputedStyle(alienGirls[i]).getPropertyValue("left")) + 50 
    ) {
      
      alienGirls[i].remove();  
    }   
  }
}

function moveBullet() {
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
}


function shoot(){
  let bullet = document.createElement("div");
  bullet.classList.add("laser");
  bullet.style.left = parseInt(window.getComputedStyle(ship).getPropertyValue("left")) +35 + "px"; 
  bullet.style.top = parseInt(window.getComputedStyle(ship).getPropertyValue("top")) - 10 + "px"; 
  canvas.appendChild(bullet);
  moveBullet();
}

function moveAlien() {
   moveAlienGirl = setInterval(() => {
    const alienGirls = document.getElementsByClassName("aliengirl");
    //var alienGirlTop = window.getComputedStyle(alienGirl).getPropertyValue("top");
    //var alienGirlTopAsInteger = parseInt(alienGirlTop);
    for (let i = 0; i < alienGirls.length; i++) {
     alienGirls[i].style.top = parseInt(window.getComputedStyle(alienGirls[i]).getPropertyValue("top")) + 30 + 'px';
   
     if (parseInt(window.getComputedStyle(alienGirls[i]).getPropertyValue("top")) >  window.innerHeight - 100) {
       alert("Game Over");
       clearInterval(moveAlienGirl);
       clearInterval(multiplyAlienGirl);
       document.location.reload();
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
      document.getElementById("splash").remove();
      letsPlay();
      break;
    case (e.key === ' '):
      shoot();
    break;
  }
})














/*if (rocktop >=  window.innerHeight - 100) {
     alert("Game Over");
     document.location.reload();
     clearInterval(moverocks);
     clearInterval(creatrocks);
   } */



//   if (e.key == "ArrowUp" || e.keyCode == 32) {
//     //32 is for space key
//     var bullets = document.createElement("div");
//     bullet.classList.add("laser");
//     game.appendChild(bullet);

//     var movebullet = setInterval(() => {    //repeated
//       var rocks = document.getElementsByClassName("aliengirl");

//       for (var i = 0; i < rocks.length; i++) {
//         var rock = rocks[i];
//         if (rock != undefined) {
//           var rockbound = rock.getBoundingClientRect();
//           var bulletbound = bullet.getBoundingClientRect();

//           //Condition to check whether the rock/alien and the bullet are at the same position..!
//           //If so,then we have to destroy that rock

//           if (
//             bulletbound.left >= rockbound.left &&
//             bulletbound.right <= rockbound.right &&
//             bulletbound.top <= rockbound.top &&
//             bulletbound.bottom <= rockbound.bottom
//           ) {
//             rock.parentElement.removeChild(rock); //Just removing that particular rock;
//             //Scoreboard
//             document.getElementById("score").innerHTML =
//               parseInt(document.getElementById("score").innerHTML) + 1;
//           }
//         }
//       }
//       var bulletbottom = parseInt(
//         window.getComputedStyle(bullet).getPropertyValue("bottom")
//       );

//       //Stops the bullet from moving outside the gamebox
//       if (bulletbottom >= 800) {
//         clearInterval(movebullet);
//       }

//       bullet.style.left = left + "px"; //bullet should always be placed at the top of my ship..!
//       bullet.style.bottom = bulletbottom + 10 + "px";
//     });
//   }
// });

// var generaterocks = setInterval(() => {
//   var rock = document.createElement("div");
//   rock.classList.add("aliengirl");
//   //Just getting the left of the rock to place it in random position...
//   var rockleft = parseInt(
//     window.getComputedStyle(rock).getPropertyValue("left")
//   );
//   //generate value between 0 to 450 where 450 => gameboard width - rock width
//   rock.style.left = Math.floor(Math.random() * 3450) + "px";

//   canvas.appendChild(rock);
// }, 1000);

// var moverocks = setInterval(() => {
//   var rocks = document.getElementsByClassName("aliengirl");

//   if (rocks != undefined) {
//     for (var i = 0; i < rocks.length; i++) {
//       //Now I have to increase the top of each rock,so that the rocks can move downwards..
//       var rock = rocks[i]; //getting each rock
//       var rocktop = parseInt(
//         window.getComputedStyle(rock).getPropertyValue("top")
//       );
//       //475 => game board height - rockheight + 25
//       if (rocktop >= 800) {
//         alert("Game Over");
//         clearInterval(moverocks);
//         window.location.reload();
//       }

//       rock.style.top = rocktop + 25 + "px";
//     }
//   }
// }, 450);  // speed of alien 