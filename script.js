const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
document.body.appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//canvas commands  https://www.w3schools.com/tags/ref_canvas.asp



// //___________________ mouse input___________________

// let mouse = {
//   down: false,
//   x: 0,
//   y: 0
// };
// canvas.addEventListener("mousemove", event => {
//   mouse.x = event.clientX;
//   mouse.y = event.clientY;
// });
// canvas.addEventListener("mousedown", event => {
//   mouse.down = true;
//   // console.log(mouse);
// });
// canvas.addEventListener("mouseup", event => {
//   mouse.down = false;
// });


// //___________________ key input___________________
// let left = false
// let right = false
// let up = false
// let down = false

// window.addEventListener("keyup", function(event) {
//     switch (event.code) {
//         case "ArrowRight":
//             right = false
//             break;
//         case "ArrowLeft":
//             left = false
//             break;
//         case "ArrowUp":
//             up = false
//             break;
//         case "ArrowDown":
//             down = false
//             break;
//     }
// });

// window.addEventListener("keydown", function(event) {
//        switch (event.code) {
//         case "ArrowRight":
//             right = true
//             break
//         case "ArrowLeft":
//             left = true
//             break
//         case "ArrowUp":
//             up = true
//             break
//         case "ArrowDown":
//             down = true
//             break
//     }
// })





// //___________________animation loop ___________________

// let count = 0

// function cycle(){ //this runs 60 times a sedcond
//   ctx.clearRect(0, 0, canvas.width, canvas.height); //clears everything

//   // your drawing go here
//   ctx.fillStyle = "SeaGreen"
//   ctx.beginPath();
//   count+=0.01
//   ctx.arc(50, 50 + 100 * Math.sin(count), 30, 0, 2 * Math.PI);
//   ctx.fill();



//   requestAnimationFrame(cycle);
// }
// requestAnimationFrame(cycle);




// -----------------Actual Game Code--------------------------

const ball = {
  position: {
    x: 150,
    y: canvas.height - 200
  },
  speed: {
    x: 0,
    y: 0
  },
  radius: 20,
  inventory: {

  }
};

const cannonball = {
  a: {
    x: 220,
    y: canvas.height - 370,
    radius: 10
  },
  b: {
    x: 220,
    y: canvas.height - 320,
    radius: 10
  },

};

let shouldJump = true
let detect = false
let left = false
let right = false
let up = false
let down = false
let respawn = false
let jump = false
let reload = false
let interact = false

let count = 0
let gravity = 0
let shouldJumpCount = 0
let jumpCount = 0
let laserCount = 0
let cannonCount1 = 0
let cannonCount2 = 0
let cannonSpeedCount = 0


// Ball Function

function cycle() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  count += 10
  gravity += 10

  if (right) ball.position.x += 10
  if (left) ball.position.x -= 10
  // if (up) ball.position.y -= 15
  // if (down) ball.position.y += 15
  // if (respawn) ball.position.x /= 10
  // if (respawn) ball.position.y /= 10
  if (jump) ball.position.y -= 30
  if (gravity) ball.position.y += 10
  if (cannonCount1) cannonball.a.x += 5
  if (cannonCount2) cannonball.b.x += 5

  ctx.fillStyle = "Blue";
  ctx.beginPath();
  ctx.arc(ball.position.x, ball.position.y, ball.radius, 0, Math.PI * 2);
  ctx.fill();


  if (ball.position.x > 0
    && ball.position.x < 20) {
    ball.position.x = 20;
  }
  if (ball.position.x < canvas.width - 0
    && ball.position.x > canvas.width - 20) {
    ball.position.x = canvas.width - 20;
  }
  if (ball.position.y < 40) {
    ball.position.y = 40;
  }


  if (jump === true) {
    jumpCount++;
    shouldJumpCount++;
  }
  if (jumpCount > 6) {
    jump = false;
    jumpCount = 0;
    shouldJumpCount = 10;
  }
  // if (shouldJumpCount >= 10 &&
  //   shouldJumpCount <= 20) {
  //   detect = true;
  // } else {
  //   detect = false;
  // }
  // if (detect === true) {
  //   shouldJump = false;
  // }
  // if (shouldJumpCount > 20) {
  //   shouldJumpCount = 0;
  // }

  // shouldJumpCount ++;
  // if (shouldJumpCount > 100
  //    && shouldJumpCount < 200) {
  //   shouldJump = false;
  // } else {
  //   shouldJump = true;
  // }


  //Platforms and Walls

  // Ground Level
  ctx.fillStyle = "ForestGreen";
  ctx.fillRect(0, canvas.height - 100, canvas.width, 15)
  ctx.fillStyle = "SaddleBrown";
  ctx.fillRect(0, canvas.height - 85, canvas.width, 85)

  if (ball.position.y > canvas.height - 130) {
    ball.position.y = canvas.height - 130;
  }
  // if (ball.position.y > canvas.height - 130) {
  //   shouldJump = true;
  // } else {
  //   shouldJump = false;
  // }

  // Spawn Point Wall
  ctx.fillStyle = "Black";
  ctx.fillRect(200, canvas.height - 100, 10, -350)
  ctx.beginPath();
  ctx.moveTo(200, canvas.height - 450);
  ctx.lineTo(205, canvas.height - 470);
  ctx.lineTo(210, canvas.height - 450);
  ctx.closePath();
  ctx.stroke();
  ctx.strokeStyle = "Grey";
  ctx.fillStyle = "Grey";
  ctx.fill();

  if ((ball.position.y >= canvas.height - 454
    && ball.position.y <= canvas.height - 100)
    && (ball.position.x > 180
      && ball.position.x < 200)) {
    ball.position.x = 180;
  }
  if ((ball.position.y >= canvas.height - 454
    && ball.position.y <= canvas.height - 100)
    && (ball.position.x > 210
      && ball.position.x < 230)) {
    ball.position.x = 230;
  }
  //Spike
  if ((ball.position.y >= canvas.height - 480
    && ball.position.y <= canvas.height - 450)
    && ball.position.x >= 200
    && ball.position.x <= 210) {
    ball.position.x = 100
    ball.position.y = canvas.height - 150;
  }

  // Platform Sides
  if (((ball.position.y >= canvas.height - 400
    && ball.position.y <= canvas.height - 390)
    || (ball.position.y >= canvas.height - 200
    && ball.position.y <= canvas.height - 190))
    && (ball.position.x > 70
      && ball.position.x < 90)) {
    ball.position.x = 90;
  }
  if ((ball.position.y >= canvas.height - 300
    && ball.position.y <= canvas.height - 290)
    && (ball.position.x > 110
      && ball.position.x < 130)) {
    ball.position.x = 110;
  }
  if ((ball.position.y >= canvas.height - 400
    && ball.position.y <= canvas.height - 390)
    && (ball.position.x > 500
      && ball.position.x < 520)) {
    ball.position.x = 520;
  }
  if ((ball.position.y >= canvas.height - 300
    && ball.position.y <= canvas.height - 290)
    && (ball.position.x > 380
      && ball.position.x < 400)) {
    ball.position.x = 380;
  }

  // Bottom Left Wall
  ctx.fillStyle = "Black";
  ctx.fillRect(390, canvas.height - 100, 10, -80)
  if ((ball.position.y >= canvas.height - 180
    && ball.position.y <= canvas.height - 100)
    && (ball.position.x > 370
      && ball.position.x < 390)) {
    ball.position.x = 370;
  }
  if ((ball.position.y >= canvas.height - 180
    && ball.position.y <= canvas.height - 100)
    && (ball.position.x > 400
      && ball.position.x < 420)) {
    ball.position.x = 420;
  }
  if ((ball.position.y > canvas.height - 210
    && ball.position.y < canvas.height - 190)
    && (ball.position.x >= 390
      && ball.position.x <= 400)) {
    ball.position.y = canvas.height - 210;
  }

  // Spike Pit
  ctx.beginPath();
  ctx.moveTo(210, canvas.height - 100)
  ctx.lineTo(210, canvas.height - 110);
  ctx.lineTo(220, canvas.height - 140);
  ctx.lineTo(230, canvas.height - 110);
  ctx.lineTo(240, canvas.height - 140);
  ctx.lineTo(250, canvas.height - 110);
  ctx.lineTo(260, canvas.height - 140);
  ctx.lineTo(270, canvas.height - 110);
  ctx.lineTo(280, canvas.height - 140);
  ctx.lineTo(290, canvas.height - 110);
  ctx.lineTo(300, canvas.height - 140);
  ctx.lineTo(310, canvas.height - 110);
  ctx.lineTo(320, canvas.height - 140);
  ctx.lineTo(330, canvas.height - 110);
  ctx.lineTo(340, canvas.height - 140);
  ctx.lineTo(350, canvas.height - 110);
  ctx.lineTo(360, canvas.height - 140);
  ctx.lineTo(370, canvas.height - 110);
  ctx.lineTo(380, canvas.height - 140);
  ctx.lineTo(390, canvas.height - 110);
  ctx.lineTo(390, canvas.height - 100);
  ctx.closePath();
  ctx.stroke();
  ctx.strokeStyle = "Grey";
  ctx.fillStyle = "Grey";
  ctx.fill();
  if ((ball.position.y >= canvas.height - 140
    && ball.position.y <= canvas.height - 100)
    && ball.position.x >= 210
    && ball.position.x <= 390) {
    ball.position.x = 100
    ball.position.y = canvas.height - 150;
  }
  

  // 1st Level Platforms
  ctx.fillStyle = "Black";
  ctx.fillRect(0, canvas.height - 200, 70, 10)
  ctx.fillStyle = "Black";
  ctx.fillRect(canvas.width - 150, canvas.height - 200, -250, 10)

  if ((ball.position.y > canvas.height - 230
    && ball.position.y < canvas.height - 210)
    && ((ball.position.x >= 0
      && ball.position.x <= 70)
      || (ball.position.x >= canvas.width - 400
        && ball.position.x <= canvas.width - 150))) {
    ball.position.y = canvas.height - 230;
  }
  if ((ball.position.y < canvas.height - 160
    && ball.position.y > canvas.height - 190)
    && ((ball.position.x >= 0
      && ball.position.x <= 70)
      || (ball.position.x >= canvas.width - 400
        && ball.position.x <= canvas.width - 150))) {
    ball.position.y = canvas.height - 160;
  }

  // 2nd Level Platforms
  ctx.fillStyle = "Black";
  ctx.fillRect(130, canvas.height - 300, 70, 10)
  ctx.fillStyle = "Black";
  ctx.fillRect(400, canvas.height - 300, canvas.width - 800, 10)

  if ((ball.position.y > canvas.height - 330
    && ball.position.y < canvas.height - 310)
    && ((ball.position.x >= 130
      && ball.position.x <= 200)
      || (ball.position.x >= 400
        && ball.position.x <= canvas.width - 400))) {
    ball.position.y = canvas.height - 330;
  }
  if ((ball.position.y < canvas.height - 260
    && ball.position.y > canvas.height - 290)
    && ((ball.position.x >= 130
      && ball.position.x <= 200)
      || (ball.position.x >= 400
        && ball.position.x <= canvas.width - 400))) {
    ball.position.y = canvas.height - 260;
  }

  // 3rd Level Platforms
  ctx.fillStyle = "Black";
  ctx.fillRect(0, canvas.height - 400, 70, 10)
  ctx.fillStyle = "Black";
  ctx.fillRect(200, canvas.height - 400, 300, 10)
  ctx.fillStyle = "Black";
  ctx.fillRect(canvas.width - 500, canvas.height - 400, 300, 10)

  if ((ball.position.y > canvas.height - 430
    && ball.position.y < canvas.height - 410)
    && ((ball.position.x >= 0
      && ball.position.x <= 70)
      || (ball.position.x >= 195
        && ball.position.x <= 500)
      || (ball.position.x >= canvas.width - 500
        && ball.position.x <= canvas.width - 200))) {
    ball.position.y = canvas.height - 430;
  }
  if ((ball.position.y < canvas.height - 360
    && ball.position.y > canvas.height - 390)
    && ((ball.position.x >= 0
      && ball.position.x <= 70)
      || (ball.position.x >= 190
        && ball.position.x <= 500)
      || (ball.position.x >= canvas.width - 500
        && ball.position.x <= canvas.width - 200))) {
    ball.position.y = canvas.height - 360;
  }

  // 4th Level Platform
  ctx.fillStyle = "Black";
  ctx.fillRect(400, canvas.height - 500, canvas.width - 800, 10)

  if (ball.position.y > canvas.height - 530
    && ball.position.y < canvas.height - 510
    && ball.position.x >= 400
    && ball.position.x <= canvas.width - 400) {
    ball.position.y = canvas.height - 530;
  }
  if (ball.position.y < canvas.height - 460
    && ball.position.y > canvas.height - 490
    && ball.position.x >= 390
    && ball.position.x <= canvas.width - 390) {
    ball.position.y = canvas.height - 460;
  }

  // Top Left Wall
  ctx.fillStyle = "Black";
  ctx.fillRect(400, canvas.height - 500, 10, -canvas.height)

  if ((ball.position.y >= -canvas.height
    && ball.position.y <= canvas.height - 490)
    && (ball.position.x > 380
      && ball.position.x < 400)) {
    ball.position.x = 380;
  }
  if ((ball.position.y >= -canvas.height
    && ball.position.y <= canvas.height - 490)
    && (ball.position.x > 410
      && ball.position.x < 430)) {
    ball.position.x = 430;
  }

  // Top Right Wall
  ctx.fillStyle = "Black";
  ctx.fillRect(canvas.width - 400, canvas.height - 500, -10, -canvas.height)

  if ((ball.position.y >= -canvas.height
    && ball.position.y <= canvas.height - 490)
    && (ball.position.x < canvas.width - 380
      && ball.position.x > canvas.width - 400)) {
    ball.position.x = canvas.width - 380;
  }
  if ((ball.position.y >= -canvas.height
    && ball.position.y <= canvas.height - 490)
    && (ball.position.x < canvas.width - 410
      && ball.position.x > canvas.width - 430)) {
    ball.position.x = canvas.width - 430;
  }

  // Middle Wall
  ctx.fillStyle = "Black";
  ctx.fillRect(canvas.width / 2 - 5, canvas.height - 500, 10, 200)

  if ((ball.position.y >= canvas.height - 500
    && ball.position.y <= canvas.height - 300)
    && (ball.position.x > canvas.width / 2 - 25
      && ball.position.x < canvas.width / 2 - 5)) {
    ball.position.x = canvas.width / 2 - 25;
  }
  if ((ball.position.y >= canvas.height - 500
    && ball.position.y <= canvas.height - 300)
    && (ball.position.x > canvas.width / 2 + 5
      && ball.position.x < canvas.width / 2 + 25)) {
    ball.position.x = canvas.width / 2 + 25;
  }

  // Laser
  ctx.fillStyle = "Grey";
  ctx.fillRect(canvas.width / 2 - 105, canvas.height - 290, 10, 10)
  ctx.fillRect(canvas.width / 2 - 105, canvas.height - 100, 10, -10)
  ctx.fillRect(canvas.width / 2 - 5, canvas.height - 290, 10, 10)
  ctx.fillRect(canvas.width / 2 - 5, canvas.height - 100, 10, -10)
  ctx.fillRect(canvas.width / 2 + 95, canvas.height - 290, 10, 10)
  ctx.fillRect(canvas.width / 2 + 95, canvas.height - 100, 10, -10)

  laserCount++;
  if (laserCount < 20) {

    ctx.fillStyle = "Red";
    ctx.fillRect(canvas.width / 2 - 103, canvas.height - 290, 6, 190)
    ctx.fillStyle = "Red";
    ctx.fillRect(canvas.width / 2 - 3, canvas.height - 290, 6, 190)
    ctx.fillStyle = "Red";
    ctx.fillRect(canvas.width / 2 + 97, canvas.height - 290, 6, 190)
    ctx.fillStyle = "Grey";
    ctx.fillRect(canvas.width / 2 - 105, canvas.height - 290, 10, 10)
    ctx.fillRect(canvas.width / 2 - 105, canvas.height - 100, 10, -10)
    ctx.fillRect(canvas.width / 2 - 5, canvas.height - 290, 10, 10)
    ctx.fillRect(canvas.width / 2 - 5, canvas.height - 100, 10, -10)
    ctx.fillRect(canvas.width / 2 + 95, canvas.height - 290, 10, 10)
    ctx.fillRect(canvas.width / 2 + 95, canvas.height - 100, 10, -10)

    if ((ball.position.y >= canvas.height - 300
      && ball.position.y <= canvas.height - 100)
      && (ball.position.x > canvas.width / 2 - 123
        && ball.position.x < canvas.width / 2 - 77)) {
      ball.position.x = 100
      ball.position.y = canvas.height - 150;
    }
    if ((ball.position.y >= canvas.height - 300
      && ball.position.y <= canvas.height - 100)
      && (ball.position.x > canvas.width / 2 - 23
        && ball.position.x < canvas.width / 2 + 23)) {
      ball.position.x = 100
      ball.position.y = canvas.height - 150;
    }
    if ((ball.position.y >= canvas.height - 300
      && ball.position.y <= canvas.height - 100)
      && (ball.position.x > canvas.width / 2 + 77
        && ball.position.x < canvas.width / 2 + 123)) {
      ball.position.x = 100
      ball.position.y = canvas.height - 150;
    }

  }
  if (laserCount > 40) {
    laserCount = 0;
  }

  // Cannons
  cannonSpeedCount++;
  ctx.fillStyle = "Black";
  ctx.fillRect(210, canvas.height - 380, 10, 20)
  ctx.fillStyle = "Black";
  ctx.fillRect(210, canvas.height - 310, 10, -20)

  cannonCount1++;
  if (cannonCount1 > 0) {
    ctx.fillStyle = "Grey";
    ctx.beginPath();
    ctx.arc(cannonball.a.x, cannonball.a.y, cannonball.a.radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "Black";
    ctx.fillRect(210, canvas.height - 380, 10, 20)
  }
  if (cannonball.a.x >= canvas.width / 2 - 15) {
    cannonCount1 = 0
    cannonball.a.x = 220;
  }
  if ((ball.position.x > cannonball.a.x - 20
      && ball.position.x < cannonball.a.x + 20)
     && (ball.position.y > cannonball.a.y - 20
      && ball.position.y < cannonball.a.y + 20)) {
    ball.position.x = 100
    ball.position.y = canvas.height - 150;
  }

  cannonCount2++;
  if (cannonCount2 > 0) {
    ctx.fillStyle = "Grey";
    ctx.beginPath();
    ctx.arc(cannonball.b.x, cannonball.b.y, cannonball.b.radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "Black";
    ctx.fillRect(210, canvas.height - 310, 10, -20)
  }
  if (cannonball.b.x >= canvas.width / 2 - 15) {
    cannonCount2 = 0
    cannonball.b.x = 220;
  }
  if ((ball.position.x > cannonball.b.x - 20
      && ball.position.x < cannonball.b.x + 20)
     && (ball.position.y > cannonball.b.y - 20
      && ball.position.y < cannonball.b.y + 20)) {
    ball.position.x = 100
    ball.position.y = canvas.height - 150;
  }

  requestAnimationFrame(cycle);
}
requestAnimationFrame(cycle);


// Bullet Function

// const bullet = {
//   position: {
//     x: ball.position.x + 20,
//     y: ball.position.y
//   }, 
//   speed: 0

// }

// function cycleA() {
//   speed += 1
//   if (speed) bullet.position.x
//   if (mouse.down) {
//     // shootSpeed += .20
//     // let ballAPositionX = ballPositionX + 20
//     // let ballAPositionY = ballPositionY
//     // if (shootSpeed) {
//     //   ballAPositionX += 10
//     // }

//     ctx.fillStyle = "Black";
//     ctx.beginPath();
//     ctx.arc(bullet.position.x, bullet.position.y, 10, 0, Math.PI * 2);
//     ctx.fill();
//   }
//   requestAnimationFrame(cycleA);
// }
// requestAnimationFrame(cycleA);


// Key and Mouse Inputs

window.addEventListener("keyup", function(event) {
  switch (event.code) {
    case "ArrowRight":
      right = false
      break;
    case "ArrowLeft":
      left = false
      break;
    // case "ArrowUp":
    //   up = false
    //   break;
    case "ArrowDown":
      down = false
      break;
    case "KeyD":
      right = false
      break;
    case "KeyA":
      left = false
      break;
    // case "KeyW":
    //   up = false
    //   break;
    case "KeyS":
      down = false
      break;
    // case "KeyE":
    //   respawn = false
    //   break;
    case "KeyR":
      reload = false
      break;
  }
});

window.addEventListener("keydown", function(event) {
  switch (event.code) {
    case "ArrowRight":
      right = true
      break;
    case "ArrowLeft":
      left = true
      break;
    // case "ArrowUp":
    //   up = true
    //   break;
    case "ArrowDown":
      down = true
      break;
    case "KeyD":
      right = true
      break;
    case "KeyA":
      left = true
      break;
    // case "KeyW":
    //   up = true
    //   break;
    case "KeyS":
      down = true
      break;
    // case "KeyE":
    //   respawn = true
    //   break;
    case "KeyR":
      reload = true
      break;
  }
});

window.addEventListener("keypress", function(event) {
  if (shouldJump === true) {
    switch (event.code) {
      case "Space":
        jump = true
        break;
    }
  }
});

// window.addEventListener("keypress", function(event) {
//   switch (event.code) {
//     case "Space":
//       jump = true
//       break;
//   }
// });

// window.addEventListener("keypress", function(event) {
//   switch (event.code) {
//     case "KeyE":
//       interact = true
//       break;
//   }
// });

// window.addEventListener("keypress", function(event) {
//   switch (event.code) {
//     case "Space":
//       jump = true
//       break;
//     case "KeyW":
//       jump = true
//       break;
//     // case "ArrowUp":
//     //   jump = true
//     //   break;
//   }
// });

// window.addEventListener("keypress", function(event) {
//   switch (event.code) {
//     case "Space":
//       jump = true
//       break;
//     // if (detect = true) {
//     //   case "Space":
//     //     jump = true
//     //     break;
//     // } 
//   }
// });


let mouse = {
  down: false,
  x: 0,
  y: 0
};
canvas.addEventListener("mousemove", event => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});
canvas.addEventListener("mousedown", event => {
  mouse.down = true;
  // console.log(mouse);
});
// canvas.addEventListener("mouseup", event => {
//   mouse.down = false;
// });

