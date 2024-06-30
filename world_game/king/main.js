const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

var cellSize = 80;
var gridWidth = canvas.width / cellSize;
var gridHeight = canvas.height / cellSize;

let inMenu = true;


var debug = 0;
//var utils = new Utils();

//  camera = new Camera(shapes, canvas, bricks);


const colors = {
  gameFloor: "#FFF",
  player: "#2F1AE8",
  box: "#5945FF",
  finishZone: "#B400FF",
  bricks: "#0F027A",
  uiText: "#BBB3FF",

  bunnyBody: "#F5A9BC", // Light pink
  bunnyEars: "#FF99CC", // Pink
  bunnyEyes: "#000000", // Black

  lightYellow: '#FFD700', // Example color
  mediumYellow: '#FFC200', // Example color
  darkYellow: '#FFB000', // Example color
  lightBrown: '#D2B48C', // Example color
  mediumBrown: '#C48A3D', // Example color
  darkBrown: '#A0522D', // Example color


  clickable: "#7D24B2",
  nonClickable: "#A9A9A9",
  completed: "#4F1571",
};


var cStart = 1;


let currentLevel = 0;

let playerLevel = 1;

var completedLevels = [false, false, false, false, false, false, false, false, false, false]; // Assuming there are 3 levels


//var completedLevels = [true, true, true, true, true, true, true, true, true, true]; 


let player, box, finishZone, walls, carpets;

let particles = [];

let GAME_STATE = 0;






var tracks = [];
var sound = null;
var font = null;
var utils = null;




function updateLevel() {

  //let currentLevel = 10;
  GamePix.updateLevel(currentLevel);

  if (currentLevel == 10) {
    GamePix.happyMoment();
  }
}


function showInterstital() {

  utils.pauseAudio();
  isPaused = true;
  cancelAnimationFrame(animationFrame);

  GamePix.interstitialAd().then(function(res) {

    // IMPORTANT: *** RESUME YOUR GAME ***
    if (utils.getSound()) {
      utils.resumeAudio();
    }
    isPaused = false;
    animationFrame = requestAnimationFrame(gameLoop);

    if (res.success) {
      // Log the success if you want
      //   info();
    } else {

      // Log the error if you want
      //    errorInfo();

    }


  });


}









function preloadAssets() {
  const audioFiles = [
      './arcade1-142093.mp3',
      './arcade2-158813.mp3',
      './arcade3-158814.mp3'
    ];

  const soundFile = './beep3-98810.mp3';
  const fontName = 'Pacifico';
  const fontUrl = 'url(./Pacifico-Regular.ttf)';

  const loadAudio = (file) => {
    return new Promise((resolve, reject) => {
      const audio = new Audio(file);
      audio.oncanplaythrough = () => {
        resolve(audio);
      };
      audio.onerror = (e) => {
        reject(new Error(`Failed to load audio file: ${file}`));

        displayError("Error audio ");

      };
    });
  };

  const loadFont = (name, url) => {
    return new Promise((resolve, reject) => {
      const font = new FontFace(name, url);
      font.load().then(loadedFont => {
        document.fonts.add(loadedFont);
        resolve(loadedFont);
      }).catch(error => {
        reject(new Error(`Failed to load font: ${name}`));
        displayError("Error fonts ");

      });
    });
  };



  const audioPromises = audioFiles.map(loadAudio);
  const soundPromise = loadAudio(soundFile);
  const fontPromise = loadFont(fontName, fontUrl);
  //  const utilsPromise = loadUtils();

  return Promise.all([...audioPromises, soundPromise, fontPromise])
    .then(results => {
      // Assign loaded assets to the class properties
      tracks = results.slice(0, audioFiles.length);
      sound = results[audioFiles.length];
      font = results[audioFiles.length + 1];
      // utils = results[audioFiles.length + 2];

      displayError("All assets preloaded successfully ");

      //console.log('All assets preloaded successfully.');

      gameLoading = 1;

    })
    .catch(error => {
      console.error('Error preloading assets:', error);

      displayError("error assets " + error);

      if (re < 3) {
        start();
        re += 1;

      }

      gameLoading = 0;


    });
}


var re = 0;

var gameLoading = 0;




// 1
window.addEventListener('load', () => {
  //  init();
  //  window.addEventListener('resize', resizeCanvas);

  setTimeout(function run() {
   // console.log("page load");

    displayError("page load");

    start();

  }, 2000);




});




// 2
function start() {
  preloadAssets()
    .then(() => {
      // Initialize game or show start screen
     //console.log('Game started');
      displayError("Game started");
       init();
    })
    .catch((error) => {
      console.error('Error starting the game:', error);

      displayError("error " + error);

    });
}





var dtext = "";

function displayError(param) {

  dtext += param + "   \n";
  if (debug == 1) {
    document.getElementById('debug').innerText = dtext;
  }

}


var url = "";
// 3

function init() {
  //  utils.playNextTrack();
  //  cStart = 1;

  utils = new Utils(this);


  utils.setTrack(tracks);


   url = window.location.href;
  
//  console.log("url " + url);


  resizeCanvas();

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  document.getElementById('startButton').style.display = 'block';
  
  canvas.style.background = "#F2F2F2";
  

  if (debug == 0) {
    document.getElementById('debug').style.display = 'none';
  }



  drawMenuStart();


  document.getElementById('startButton').addEventListener('click', () => {

    if (gameLoading == 1) {
      utils.playNextTrack();

    }

    //console.log("start click");


    inMenu = true;

    utils.drawMenu(ctx, canvas, cellSize, colors);

    GAME_STATE = 0;

    document.getElementById('startButton').style.display = 'none';

  });



  // Event listener for keydown event
  window.addEventListener('keydown', function(event) {
    movePlayerKeyboard(event);

  });


}







function resizeCanvas() {
  // Set canvas size to window size

   //console.log("canvas width : " + canvas.width + "  canvas height : " + canvas.height);

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  //console.log("2 canvas width : " + canvas.width + "  canvas height : " + canvas.height);


  //  cellSize = Math.min(window.innerWidth, window.innerHeight) / 10;

  cellSize = Math.min(canvas.width, canvas.height) / 10;

  // Call to update the canvas and cellSize initially

  // Recalculate grid dimensions based on new canvas size
  gridWidth = canvas.width / cellSize;
  gridHeight = canvas.height / cellSize;

  if (GAME_STATE == 1) {
    //    movePlayer(0, 0);
  }


  // console.log("window innerWidth: " + window.innerWidth + " innerHeight: " + window.innerHeight + "  cellSize: " + cellSize + " gridWidth: " + gridWidth + "  gridHeight: " + gridHeight);


}




// 4

function drawMenuStart() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);




  const levels1 = [

           [ // Level 1 layout
              [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
              [1, 1, 0, 0, 0, 0, 0, 0, 1, 1],
              [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
              [1, 0, 0, 0, 4, 0, 0, 0, 1, 0],
              [1, 0, 0, 0, 1, 1, 1, 0, 1, 0],
              [1, 3, 1, 0, 5, 5, 5, 2, 1, 1],
              [1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
              [1, 1, 1, 1, 5, 5, 5, 1, 1, 1],
              [1, 1, 1, 0, 0, 0, 0, 1, 1, 0],
              [1, 1, 1, 0, 0, 0, 0, 1, 1, 0],
            ],


              ];


  const layout = levels1[0];



  walls = [];

  for (let y = 0; y < layout.length; y++) {

    for (let x = 0; x < layout[y].length; x++) {
      if (layout[y][x] === 1) {
        walls.push({ x, y });
      }

    }

  }


  walls.forEach(wall => {
    ctx.save();
    ctx.translate((wall.x * cellSize), (wall.y * cellSize));
    //  drawRoundedRect(0, 0, cellSize, cellSize, 10);

    utils.drawBrickPattern(ctx, wall.x, wall.y, cellSize, colors);

    ctx.restore();
  });


  ctx.fillStyle = "#444";

  if (gameLoading == 1) {

    ctx.font = (cellSize * 1) + "px Pacifico";
  } else {
    ctx.font = (cellSize * 1) + "px Arial";
  }

  ctx.fillText("Brickbox", canvas.width / 2 - (cellSize * 1.6), (cellSize * 2));


  GAME_STATE = 0;

}









// Start the loop


function createParticles(x, y) {
  const numParticles = 20;
  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle(x + cellSize / 2, y + cellSize / 2, '#CCCCCC')); // You can adjust the color as needed
  }
}



// 5


function startLevel(level) {

  cStart = 2;


  if (level == 1) {


  }

  if (utils.getSound()) {

    utils.pauseAudio();
    isPaused = true;
    cancelAnimationFrame(animationFrame);

    utils.resumeAudio();
    isPaused = false;
    animationFrame = requestAnimationFrame(gameLoop);

  }



  currentLevel = level;
  const layout = utils.getLevels()[currentLevel - 1];
  finishZone = { x: 4, y: 4 }; // Update according to layout
  walls = [];

  carpets = [];


  GAME_STATE = 1;

  for (let y = 0; y < layout.length; y++) {

    for (let x = 0; x < layout[y].length; x++) {
      if (layout[y][x] === 1) {
        walls.push({ x, y });
      } else if (layout[y][x] === 2) {
        finishZone = { x, y };


      } else if (layout[y][x] === 3) {
        player = { x: x, y: y, width: cellSize, height: cellSize };

      } else if (layout[y][x] === 4) {
        box = { x: x, y: y }; // Update according to layout

      }
      else if (layout[y][x] === 5) {

        carpets.push({ x, y }); // Update according to layout

      }


    }

  }

  animationFrame = requestAnimationFrame(gameLoop);

  //  buttons = [];
  isBoxInFinishZone = false;

  inMenu = false;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //    drawGame();


  gameLoop();

}








// 6


function gameLoop() {

  if (isPaused || inMenu) return;

  // animationFrame = requestAnimationFrame(gameLoop);

  const now = performance.now();
  const delta = now - lastFrameTime;

  if (delta >= frameInterval) {
    updateGame();


    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!inMenu) {
      drawGame();
    }

    lastFrameTime = now - (delta % frameInterval);


  }

  animationFrame = requestAnimationFrame(gameLoop);
}









function showMenu() {
  cancelAnimationFrame(animationFrame);
  inMenu = true;
  GAME_STATE = 0;

  utils.drawMenu(ctx, canvas, cellSize, colors);



}

function shake(intensity = (cellSize * 0.08)) {
  return {
    x: (Math.random() - 0.5) * intensity,
    y: (Math.random() - 0.5) * intensity
  };
}


function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawGame();

}








canvas.addEventListener('click', handleMouseClick);
canvas.addEventListener('touchstart', handleTouchStart);

function handleMouseClick(event) {
  const mouseX = event.clientX - canvas.offsetLeft;
  const mouseY = event.clientY - canvas.offsetTop;
  //  checkButtonClick(mouseX, mouseY);
}

function handleTouchStart(event) {
  const touchX = event.touches[0].clientX - canvas.offsetLeft;
  const touchY = event.touches[0].clientY - canvas.offsetTop;
  checkButtonClick(touchX, touchY);
}

function checkButtonClick(x, y) {
  for (const button of utils.getButtons()) {
    if (button.active && x >= button.x && x <= button.x + button.width && y >= button.y && y <= button.y + button.height) {
      button.onClick();
      // playNextTrack();

      break;
    }
  }
}





let soundC = 2;


function toggleSound() {
  // utils.setSound(!utils.getSound());

  if (soundC == 1) {
    utils.setSoundText('Sound: On');
    utils.resumeAudio();

   console.log("sound on"); 

    soundC = 2;

  } else if (soundC == 2) {
    utils.setSoundText('Sound: Off');
    utils.pauseAudio();

    console.log("sound off"); 

    soundC = 1;

  }

  //drawMenu();

}





let isPaused = false;
let animationFrame;

function togglePause() {
  if (isPaused) {
    if (utils.getSound()) {
      utils.resumeAudio();
    }
    isPaused = false;
    animationFrame = requestAnimationFrame(gameLoop);
  } else {
    utils.pauseAudio();
    isPaused = true;
    cancelAnimationFrame(animationFrame);
  }
}





function pauseGame() {
  //  isPaused = true;

  //console.log("paused ");

}

function resumeGame() {
  //  isPaused = false;
  // gameLoop();

  //console.log("resume ");

}




document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    pauseGame();
    utils.pauseAudio();
    isPaused = true;
    cancelAnimationFrame(animationFrame);
    //console.log("visibilitychange ");

    utils.drawPauseScreen(ctx, cellSize, resumeScreen, colors);

  }
});





function resumeScreen() {

  updateGame();

  if (utils.getSound()) {
    utils.resumeAudio();
  }
  isPaused = false;
  animationFrame = requestAnimationFrame(gameLoop);

}



var currentTutorialStep = 0;


const tutorialSteps3 = [
  {
    message: "Press the grey area that surround the player to move.",
    condition: () => hasMoved()
    },
  {
    message: "Push the diamond to the finish zone.",
    condition: () => box.x === finishZone.x && box.y === finishZone.y
    },
  {
    message: "Well done! You have completed the 1st level.",
    condition: () => false // No more steps after this
    }
];


const tutorialSteps = [
  {
    message: "Direct thy brave knight by tapping <br>the grey tiles surrounding him <br>(Arrowkeys on PC) to advance.",
    condition: () => hasMoved()
  },
  {
    message: "Move the mystical jewel to <br>the destined finish zone.",
    condition: () => box.x === finishZone.x && box.y === finishZone.y
  },
  {
    message: "Congratulations! <br>Thou has conquered the first quest.",
    condition: () => false // No more steps after this
  }
];



function hasMoved() {
  return player.x > 2;
}

function updateTutorial() {
  if (tutorialSteps[currentTutorialStep].condition()) {
    currentTutorialStep++;
  }
}





let isBoxInFinishZone = false;

function checkBoxInFinishZone() {
  if (box.x === finishZone.x && box.y === finishZone.y) {
    isBoxInFinishZone = true;

    if (playerLevel > currentLevel) {
      playerLevel++;
    }

    completedLevels[currentLevel - 1] = true;

    const nextLevelButton = utils.getButtonById('nextLevel');
    if (nextLevelButton) {
      nextLevelButton.active = true;
    }

  } else {
    isBoxInFinishZone = false;
  }
}


function updateGame() {
  // Update game logic here (e.g., player movement, collision detection)
  updateCamera();
  updateTutorial();
  checkBoxInFinishZone();

  // Update alpha value for fade in and out effect
  availableCellAlpha += fadeDirection * fadeSpeed;
  textAlpha += fadeDirectionText * 0.06;

  if (availableCellAlpha >= 1) {
    availableCellAlpha = 1;
    fadeDirection = -1; // Start fading out

  } else if (availableCellAlpha <= 0) {
    availableCellAlpha = 0;
    fadeDirection = 1; // Start fading in
  }


  if (textAlpha >= 1) {
    textAlpha = 1;
    fadeDirectionText = -1; // Start fading out

  } else if (textAlpha <= 0.4) {
    availableCellAlpha = 0.4;
    fadeDirectionText = 1; // Start fading in
  }



}

const fps = 30;
const frameInterval = 1000 / fps;
let lastFrameTime = performance.now();

// Start the game loop


let availableCellAlpha = 0;
let textAlpha = 0;

let fadeDirectionText = 1; // 1 for fade in, -1 for fade out

let fadeDirection = 1; // 1 for fade in, -1 for fade out
const fadeSpeed = 0.06; // Adjust this for speed of the fade


// Define Camera Parameters
let cameraX = 0;
let cameraY = 0;
const interpolationSpeed = 0.03; // Adjust this value for desired interpolation speed

// Update Camera Position
function updateCamera() {
  // Calculate target position to center the player
  const targetX = player.x * cellSize - canvas.width / 2 + cellSize / 2;
  const targetY = player.y * cellSize - canvas.height / 2 + cellSize / 2;

  // Apply linear interpolation to move the camera towards the target position
  cameraX = lerp(cameraX, targetX, interpolationSpeed);
  cameraY = lerp(cameraY, targetY, interpolationSpeed);
}

// Linear Interpolation function
function lerp(start, end, t) {
  return start * (1 - t) + end * t;
}

// Draw with Camera Offset


function drawGame() {


  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update camera position
  updateCamera();

  // Apply camera offset to drawing context
  ctx.save();
  ctx.translate(-cameraX, -cameraY);

  // Draw game elements relative to camera position



  const shakeOffset = shake();

  // Draw walls with rounded corners and pattern

  walls.forEach(wall => {
    ctx.save();
    ctx.translate((wall.x * cellSize) + shakeOffset.x, (wall.y * cellSize) + shakeOffset.y);
    //  drawRoundedRect(0, 0, cellSize, cellSize, 10);

    utils.drawBrickPattern(ctx, wall.x, wall.y, cellSize, colors);

    ctx.restore();
  });



  carpets.forEach(carpet => {
    ctx.save();
    ctx.translate((carpet.x * cellSize) + shakeOffset.x, (carpet.y * cellSize) + shakeOffset.y);
    //  drawRoundedRect(0, 0, cellSize, cellSize, 10);

    utils.drawCarpet(ctx, carpet.x, carpet.y, cellSize, cellSize);

    ctx.restore();
  });




  // Draw finish zone with rounded corners
  ctx.fillStyle = colors.finishZone;
  ctx.save();
  ctx.translate((finishZone.x * cellSize) + shakeOffset.x, (finishZone.y * cellSize) + shakeOffset.y);
  //  drawRoundedRect(0, 0, cellSize, cellSize, 10);

  utils.drawFinish(ctx, finishZone.x, finishZone.y, cellSize);

  ctx.restore();



  // Draw box with rounded corners and pattern

  ctx.save();
  ctx.translate((box.x * cellSize) + shakeOffset.x, (box.y * cellSize) + shakeOffset.y);
  // drawRoundedRect(0, 0, cellSize, cellSize, 10);
  // drawHexagon(ctx, box.x, box.y, cellSize, cellSize);

  utils.drawDiamond(ctx, box.x, box.y, cellSize, cellSize);
  //   drawHexagonWithTriangles(ctx, box.x, box.y, cellSize, cellSize);
  ctx.restore();


  // Draw available cells with rounded corners and fade in/out effect
  const availableCells = utils.getAvailableCells(player);
  ctx.fillStyle = '#dddddd';
  ctx.globalAlpha = availableCellAlpha; // Set transparency
  availableCells.forEach(cell => {
    ctx.save();
    ctx.translate((cell.x * cellSize) + shakeOffset.x, (cell.y * cellSize) + shakeOffset.y);
    utils.drawRoundedRect(0, 0, cellSize, cellSize, cellSize * 0.1);
    ctx.restore();
  });
  ctx.globalAlpha = 1.0; // Reset transparency



  // Draw player with rounded corners
  ctx.fillStyle = colors.player;
  ctx.save();
  ctx.translate(player.x * cellSize, player.y * cellSize);

  utils.drawRoundedRectPlayer(0, 0, player.width, player.height, (cellSize * 0.1));

  ctx.restore();


  // Inside the rendering loop (drawGame function)
  // Calculate player movement direction (dx, dy) based on the previous and current player positions


  // Draw bunny eyes with animated pupils
  // Update pupil position based on player movement
  // Draw bunny eyes
  ctx.fillStyle = "#fff"; // Set eyes color
  ctx.beginPath();
  //   ctx.arc((player.x + 0.2) * cellSize, (player.y + 0.4) * cellSize, cellSize / 10, 0, Math.PI * 2);
  ctx.arc((player.x + 0.7) * cellSize, (player.y + 0.4) * cellSize, cellSize / 10, 0, Math.PI * 2);
  ctx.fill();



  ctx.restore();




  // Update tutorial
  if (currentLevel == 1) {
    // Draw tutorial
    const message = tutorialSteps[currentTutorialStep].message;

    utils.drawTutorial(ctx, cellSize, message, textAlpha);
    updateTutorial();
  }


  particles.forEach((particle, index) => {
    particle.update();
    particle.draw(ctx, cameraX, cameraY);
    if (particle.alpha === 0) {
      particles.splice(index, 1);
    }
  });

  // Check if box is in finish zone
  checkBoxInFinishZone();

  // Show UI if box is in finish zone
  if (isBoxInFinishZone) {


    utils.drawCongratulationsUI(ctx, canvas, colors, nextLevel, cellSize);


    if (GAME_STATE == 1) {

      sound.play();
      GAME_STATE = 3;

    }


    // Set the next level button to active
    const nextLevelButton = utils.getButtonById('nextLevel');
    if (nextLevelButton) {
      nextLevelButton.active = true;
    }


  } else {

    // Set the next level button to active
    const nextLevelButton = utils.getButtonById('nextLevel');
    if (nextLevelButton) {
      nextLevelButton.active = false;
    }



  }


  // Draw menu drawButton
  utils.drawButton('menu', 2, canvas.width - (cellSize * 1.8), cellSize * 0.2, cellSize * 1.6, cellSize * 0.6, "MENU", showMenu, colors, true, cellSize);



  // Draw restart button
  utils.drawButton('restart', 2, cellSize * 0.2, cellSize * 0.2, cellSize * 1.6, cellSize * 0.6, "RESTART", restartLevel, colors, true, cellSize);


  utils.drawButton('pause', 2, (canvas.width / 2) - (cellSize / 2), cellSize * 0.2, cellSize * 1.6, cellSize * 0.6, "PAUSE", togglePause, colors, true, cellSize);

}



function restartLevel() {

  startLevel(currentLevel);

}

function nextLevel() {
  //  currentLevel++;
  //     playerLevel = playerLevel + 1;

  showMenu();

  if (currentLevel > 2) {

    showInterstital();
  }
  //    startLevel(currentLevel + 1);

  if (currentLevel == 3) {
    updateLevel();
  }

  isBoxInFinishZone = false;
}







function isCollision(x, y) {
  return walls.some(wall => wall.x === x && wall.y === y);
}

function movePlayer(dx, dy) {
  const newPlayerX = player.x + dx;
  const newPlayerY = player.y + dy;

  //sound.play();

  if (isCollision(newPlayerX, newPlayerY)) return;

  const prevX = player.x * cellSize;

  const prevY = player.y * cellSize;

  if (newPlayerX === box.x && newPlayerY === box.y) {
    const newBoxX = box.x + dx;
    const newBoxY = box.y + dy;
    if (!isCollision(newBoxX, newBoxY)) {
      box.x = newBoxX;
      box.y = newBoxY;
      animatePlayerMovement(newPlayerX, newPlayerY, () => {
        player.x = newPlayerX;
        player.y = newPlayerY;
        player.width = cellSize;
        player.height = cellSize;
      });

      // createParticles(prevX, prevY);
    }
  } else {
    animatePlayerMovement(newPlayerX, newPlayerY, () => {
      player.x = newPlayerX;
      player.y = newPlayerY;
      player.width = cellSize;
      player.height = cellSize;
    });
    //createParticles(prevX, prevY);

  }
}


function animatePlayerMovement(targetX, targetY, onComplete) {
  const duration = 200;
  const startX = player.x * cellSize;
  const startY = player.y * cellSize;
  const targetPosX = targetX * cellSize;
  const targetPosY = targetY * cellSize;
  const startTime = performance.now();

  const sensitivity = 3;

  function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  function animate(time) {
    const elapsed = time - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeInOutQuad(progress);

    const currentX = startX + (targetPosX - startX) * easedProgress;
    const currentY = startY + (targetPosY - startY) * easedProgress;

    // Subtle squeeze and stretch effect with adjustable sensitivity
    const stretchFactor = 0.1 * sensitivity;
    const squeezeFactor = 0.05 * sensitivity;

    if (progress < 0.5) {
      player.width = cellSize * (1 + easedProgress * stretchFactor);
      player.height = cellSize * (1 - easedProgress * squeezeFactor);
    } else {
      player.width = cellSize * (1 + (1 - easedProgress) * stretchFactor);
      player.height = cellSize * (1 - (1 - easedProgress) * squeezeFactor);
    }

    // Adjust the player position to stretch to all sides
    const adjustedX = currentX - (player.width - cellSize) / 2;
    const adjustedY = currentY - (player.height - cellSize) / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw(adjustedX, adjustedY);

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      onComplete();
      draw(targetPosX, targetPosY);
    }
  }

  requestAnimationFrame(animate);
}



function movePlayerKeyboard(event) {
  switch (event.key) {
    case 'ArrowUp':
      movePlayer(0, -1);

      break;
    case 'ArrowDown':
      movePlayer(0, 1);

      break;
    case 'ArrowLeft':
      movePlayer(-1, 0);

      break;
    case 'ArrowRight':
      movePlayer(1, 0);

      break;
  }

}






canvas.addEventListener('touchstart', function(event) {
  const touch = event.touches[0];
  const rect = canvas.getBoundingClientRect();
  const x = touch.clientX - rect.left;
  const y = touch.clientY - rect.top;


  // Check if touch is within any button
  utils.getButtons().forEach(button => {
    if (x >= button.x && x <= button.x + button.width && y >= button.y && y <= button.y + button.height) {
      if (button.state == 1 && GAME_STATE == 0) {
        button.onClick();
      } else if (button.state == 2 && GAME_STATE == 1) {
        button.onClick();

      } else if (button.state == 3 && GAME_STATE == 3) {
        button.onClick();
      }


    }
  });

  // Handle touch events for moving the player after the camera move
  if (!inMenu) {
    // Calculate grid position relative to camera
    const gridX = Math.floor((x + cameraX) / cellSize);
    const gridY = Math.floor((y + cameraY) / cellSize);

    if (Math.abs(gridX - player.x) + Math.abs(gridY - player.y) === 1) {
      movePlayer(gridX - player.x, gridY - player.y);

     //console.log("move player  x " + (gridX - player.x) + "  y " + (gridY - player.y));
    }
  }
});




// Initial draw to show the menu
//  draw();



function isPushing(player, box) {
  return player.x + player.width >= box.x &&
    player.x + player.width <= box.x + box.width &&
    player.y + player.height > box.y &&
    player.y < box.y + box.height &&
    player.isMovingRight; // Assuming isMovingRight is a boolean indicating the player is moving right
}








class Utils {



  constructor(gameInstance) {

    this.x = 10;


    this.buttons = [];

    this.gameInstance = gameInstance;


    // Array to hold the audio elements
    this.tracks = [];




    //this.currentTrack = this.tracks[this.currentTrackIndex];

    this.isPlaying1 = false;
    this.isPlaying2 = false;
    this.isPlaying3 = false;


    this.audioPausedAt = 0;

    this.currentTrackIndex = 0;



    this.currentTrack1 = null;
    this.currentTrack2 = null;
    this.currentTrack3 = null;



    this.isSoundOn = true;

    this.soundText = "Sound: On";




  }

  setTrack(track) {
    this.tracks = track;
  }


  getSound() {
    return this.isSoundOn;
  }

  setSound(sound) {
    this.isSoundOn = sound;
  }

  setSoundText(text) {
    this.soundText = text;
  }


  getSoundText() {
    return this.soundText;
  }






  getButtons() {
    return this.buttons;
  }


  getButtonById(id) {
    return this.buttons.find(button => button.id === id);
  }

  getSpeedX() {
    return this.x;
  }

  setSpeedX(speed) {
    this.x = speed;
  }









  drawMenu(ctx, canvas, cellSize, colors) {


    ctx.clearRect(0, 0, canvas.width, canvas.height);


    const layout = this.getLevels()[2];

    var walls = [];

    //  GAME_STATE = 1;

    for (let y = 0; y < layout.length; y++) {

      for (let x = 0; x < layout[y].length; x++) {
        if (layout[y][x] === 1) {
          walls.push({ x, y });
        }
      }

    }


    walls.forEach(wall => {
      ctx.save();
      ctx.translate((wall.x * cellSize), (wall.y * cellSize));
      //  drawRoundedRect(0, 0, cellSize, cellSize, 10);

      this.drawBrickPattern(ctx, wall.x, wall.y, cellSize, colors);

      ctx.restore();
    });


    ctx.fillStyle = "#444";

    if (gameLoading == 1) {

      ctx.font = (cellSize * 1) + "px Pacifico";

    } else {
      ctx.font = (cellSize * 1) + "px Arial";

    }

    ctx.fillText("Brickbox", canvas.width / 2 - (cellSize * 1.6), cellSize * 2);


    const totalLevels = 10;
    const buttonWidth = 1 * cellSize;
    const buttonHeight = 1 * cellSize;
    const buttonMarginX = 0.2 * cellSize; // Space between buttons horizontally
    const buttonMarginY = 0.3 * cellSize; // Space between buttons vertically
    const startX = (canvas.width - ((cellSize * 5) + ((0.2 * cellSize) * 5))) / 2; // Starting X position for the first button
    const startY = cellSize * 5; // Starting Y position for the first button
    const maxWidth = 400; // Maximum allowed width for all buttons



    for (let i = 0; i < totalLevels; i++) {
      const calculatedX = startX + (i % 5) * (buttonWidth + buttonMarginX); // Calculate X position based on even/odd row
      const calculatedY = startY + Math.floor(i / 5) * (buttonHeight + buttonMarginY); // Calculate Y position based on row number

      this.drawButtonLevel(1, calculatedX, calculatedY, buttonWidth, buttonHeight, `${i + 1}`, i, () => this.gameInstance.startLevel(i + 1), colors, this.gameInstance.completedLevels, cellSize);

    }


    this.drawButton('sound', 3, cellSize * 0.2, (canvas.height / 2) - (cellSize), cellSize * 1.9, cellSize * 0.6, "Sound: On/Off", this.gameInstance.toggleSound, colors, true, cellSize);




    //GAME_STATE = 0;
  }









  drawPauseScreen(ctx, cellSize, resumeScreen, colors) {

    ctx.fillStyle = '#9b1c31';

    var x = cellSize * 3;
    var y = cellSize * 6;
    var w = cellSize * 4;
    var h = cellSize * 2;


    ctx.fillRect(x, y, w, h);


    ctx.beginPath();
    ctx.moveTo(x + cellSize * 0.2, y + cellSize * 0.2);
    ctx.lineTo(x + w - (cellSize * 0.2), y + cellSize * 0.2);
    ctx.lineTo(x + w - (cellSize * 0.2), y + h - (cellSize * 0.2));
    ctx.lineTo(x + cellSize * 0.2, y + h - (cellSize * 0.2));
    ctx.lineTo(x + cellSize * 0.2, y + (cellSize * 0.2));


    ctx.strokeStyle = '#B3173B';


    ctx.lineWidth = 6;

    ctx.stroke();

    ctx.fillStyle = '#B3173B';

    //  ctx.font = (cellSize * 0.4) + 'px Arial';

    if (gameLoading == 1) {

      ctx.font = (cellSize * 0.32) + 'px Pacifico';

    } else {
      ctx.font = (cellSize * 0.32) + 'px Arial';


    }


    ctx.fillText("Game Paused", x + (cellSize * 1.1), y + cellSize * 0.6);

    this.drawButton('resume', 2, x + (cellSize * 1.3), y + (cellSize * 1.1), cellSize * 1.6, cellSize * 0.6, "RESUME", resumeScreen, colors, true, cellSize);


    // utils.drawButton('menu', 2, canvas.width - (cellSize * 1.8), cellSize * 0.2, cellSize * 1.6, cellSize * 0.6, "MENU", showMenu, colors, true, cellSize);

  }







  drawTutorial(ctx, cellSize, message, availableCellAlpha) {

    ctx.fillStyle = '#9b1c31';

    ctx.fillRect(cellSize * 0.1, cellSize * 3, cellSize * 6, cellSize * 2);

    ctx.beginPath();
    ctx.moveTo(cellSize * 0.2, cellSize * 3.1);
    ctx.lineTo(cellSize * 5.9, cellSize * 3.1);
    ctx.lineTo(cellSize * 5.9, cellSize * 4.9);
    ctx.lineTo(cellSize * 0.2, cellSize * 4.9);

    ctx.strokeStyle = '#B3173B';
    ctx.lineWidth = 6;
    ctx.stroke();
    //utils.drawCarpet(ctx, cellSize * 0.1, cellSize * 3, cellSize * 4, cellSize * 4);

    ctx.globalAlpha = availableCellAlpha; // Set transparency
    ctx.fillStyle = '#FFF';
    ctx.font = (cellSize * 0.2) + 'px Arial';
    //  ctx.fillText(message, cellSize * 0.4, cellSize * 3.4);



    this.drawMultiLineText(ctx, message, cellSize * 0.4, cellSize * 3.4, cellSize, 0.3);




    ctx.globalAlpha = 1.0;

    ctx.fillStyle = '#B3173B';

    //  ctx.font = (cellSize * 0.4) + 'px Arial';


    if (gameLoading == 1) {

      ctx.font = (cellSize * 0.4) + 'px Pacifico';
    } else {
      ctx.font = (cellSize * 0.4) + 'px Arial';
    }



    ctx.fillText("How to Play", (cellSize * 2), cellSize * 4.6);

  }




  drawMultiLineText(ctx, text, x, y, cellSize, lineHeight) { 
      //  const lines = text.split(/<br\s*\/?>/i);

        const lines = text.split('<br>');

    for (var i = 0; i < lines.length; i++) {
      ctx.fillText(lines[i], x, y + (i * (lineHeight * cellSize)));
    }
  }





  playNextTrack() {

    this.currentTrack1 = this.tracks[0];
    this.currentTrack2 = this.tracks[1];
    this.currentTrack3 = this.tracks[2];


    this.currentTrack1.play();
    this.currentTrack2.play();
    this.currentTrack3.play();


    this.currentTrack2.pause();
    this.currentTrack3.pause();


    this.currentTrackIndex = 1;


    this.isPlaying1 = true;

    this.currentTrack1.onended = () => {
      // this.currentTrackIndex = (this.currentTrackIndex + 1) % this.tracks.length;
      this.isPlaying2 = true;

      //    this.currentTrack1.currentTime = 0;
      this.currentTrackIndex = 2;

      this.currentTrack2.play();

      // this.playNextTrack();
    };

    this.currentTrack2.onended = () => {
      // this.currentTrackIndex = (this.currentTrackIndex + 1) % this.tracks.length;
      this.currentTrackIndex = 3;

      //    this.currentTrack2.currentTime = 0;
      this.isPlaying3 = true;

      this.currentTrack3.play();

      // this.playNextTrack();
    };

    this.currentTrack3.onended = () => {
      // this.currentTrackIndex = (this.currentTrackIndex + 1) % this.tracks.length;


      //  this.currentTrack3.currentTime = 0;

      this.playNextTrack();
    };


  }



  
 /*
    playNextTrack() {
      this.currentTrack = this.tracks[this.currentTrackIndex];


      this.currentTrack.play();
      this.isPlaying = true;


      this.currentTrack.onended = function() {
        this.currentTrackIndex = (this.currentTrackIndex + 1) % this.tracks.length;
        this.currentTrack.currentTime = 0;

        this.playNextTrack();
      };

    }*/
  








  pauseAudio() {

    if (this.currentTrackIndex == 1) {
      if (this.isPlaying1) {
        this.currentTrack1.pause();
        //   audioPausedAt = currentTrack.currentTime;
        this.isPlaying1 = false;
      }
    }

    else if (this.currentTrackIndex == 2) {
      if (this.isPlaying2) {
        this.currentTrack2.pause();
        this.isPlaying2 = false;
      }
    }
    else if (this.currentTrackIndex == 3) {
      if (this.isPlaying3) {
        this.currentTrack3.pause();
        this.isPlaying3 = false;
      }
    }

  }


  resumeAudio() {

    if (this.currentTrackIndex == 1) {
      if (!this.isPlaying1) {
        // currentTrack.currentTime = audioPausedAt;
        this.currentTrack1.play();
        this.isPlaying1 = true;
      }
    }
    else if (this.currentTrackIndex == 2) {
      if (!this.isPlaying2) {
        this.currentTrack2.play();
        this.isPlaying2 = true;
      }
    }
    else if (this.currentTrackIndex == 3) {
      if (!this.isPlaying3) {
        this.currentTrack3.play();
        this.isPlaying3 = true;
      }
    }


  }









  
  generateWalls(extraWalls) {
    const walls = [];
    for (let i = 0; i < gridWidth; i++) {
      walls.push({ x: i, y: 0 });
      walls.push({ x: i, y: gridHeight - 1 });
    }
    for (let i = 1; i < gridHeight - 1; i++) {
      walls.push({ x: 0, y: i });
      walls.push({ x: gridWidth - 1, y: i });
    }
    return walls.concat(extraWalls);
  }





  drawCongratulationsUI(ctx, canvas, colors, nextLevel, cellSize) {
    const uiX = canvas.width / 2 - 150;
    const uiY = canvas.height / 2 - 50;
    const uiWidth = 300;
    const uiHeight = 100;


    // Draw text
    ctx.fillStyle = '#555';


    if (gameLoading == 1) {

      ctx.font = (cellSize * 0.3) + 'px Pacifico';
    } else {
      ctx.font = (cellSize * 0.3) + 'px Arial';
    }



    ctx.fillText('Level Completed!', (canvas.width / 2) - (cellSize * 1.2), canvas.height / 2 + (cellSize * 1.2));

    // Draw next level button
    this.drawButton('nextLevel', 3, canvas.width / 2 - (cellSize * 0.8), canvas.height / 2 + (cellSize * 1.4), cellSize * 1.6, cellSize * 0.6, "Next Level", nextLevel, colors, false, cellSize);
  }






  getAvailableCells(player) {
    const directions = [
      { dx: 0, dy: -1 }, // Up
      { dx: 1, dy: 0 }, // Right
      { dx: 0, dy: 1 }, // Down
      { dx: -1, dy: 0 } // Left
    ];

    const availableCells = [];

    directions.forEach(direction => {
      const newX = player.x + direction.dx;
      const newY = player.y + direction.dy;

      // if (!isCollision(newX, newY) && !(newX === box.x && newY === box.y)) {
        //  availableCells.push({ x: newX, y: newY });
      //  }

      if (!isCollision(newX, newY)) {
        availableCells.push({ x: newX, y: newY });
      }


    });

    return availableCells;
  }









  drawButton(id, state, x, y, width, height, text, onClick, colors, active = true, cellSize) {


    ctx.fillStyle = colors.completed;
    // ctx.fillRect(x, y, width, height);
    this.drawRoundedRect(x, y, width, height, cellSize * 0.1);

    ctx.fillStyle = "hsl(0deg 50% 100% / 10%)";
    // ctx.fillRect(x, y, width, height);
    this.drawRoundedRect(x, y, width, height, cellSize * 0.1);


    ctx.fillStyle = "#fff";
    ctx.font = (cellSize * 0.2) + "px Arial";
    ctx.fillText(text, x + (cellSize * 0.35), y + (cellSize * 0.35));

    const button = { id, x, y, width, height, text, onClick, active };

    // Store the button's dimensions and callback for later use in touch events
    this.buttons.push(button);



  }





  drawButtonLevel(state, x, y, width, height, text, levelIndex, onClick, colors, completedLevels, cellSize) {
    let color;
    let clickable1 = false;

    if (completedLevels[levelIndex]) {
      color = colors.completed;
      clickable1 = true;
    } else if (levelIndex === 0 || completedLevels[levelIndex - 1]) {
      color = colors.clickable;
      clickable1 = true;
    }
    else if (state == 2) {
      clickable1 = true;
      color = colors.clickable;

    }
    else {
      color = colors.nonClickable;
    }

    // ctx.fillRect(x, y, width, height);


    ctx.fillStyle = color;

    this.drawRoundedRect(x, y, width, height, cellSize * 0.1);

    ctx.fillStyle = "hsl(0deg 50% 100% / 10%)";

    // ctx.fillRect(x, y, width, height);
    this.drawRoundedRect(x, y, width, height - (cellSize * 0.1), cellSize * 0.1);



    ctx.fillStyle = "#fff";

    if (completedLevels[levelIndex]) {
      ctx.fillStyle = "#fff";

    } else if (levelIndex === 0 || completedLevels[levelIndex - 1]) {
      ctx.fillStyle = "#fff";

    } else {
      ctx.fillStyle = "#999";


    }


    ctx.font = "600 " + (cellSize * 0.4) + "px Arial";
    ctx.fillText(text, x + cellSize * 0.2, y + cellSize * 0.4);

    if (clickable1) {
      //buttons.push({ x, y, width, height, onClick: () => startLevel(levelIndex + 1) });
      this.buttons.push({ state, x, y, width, height, onClick });

    }
  }








  drawRoundedRect(x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + width, y, x + width, y + height, radius);
    ctx.arcTo(x + width, y + height, x, y + height, radius);
    ctx.arcTo(x, y + height, x, y, radius);
    ctx.arcTo(x, y, x + width, y, radius);
    ctx.closePath();
    ctx.fill();
  }





  getLevels() {



    const levels = [
            [ // Level 1 layout
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 0, 0, 0, 1, 0, 0, 0, 1, 1],
                [1, 0, 3, 0, 4, 0, 2, 1, 1, 1],
                [1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
                [1, 5, 5, 5, 1, 1, 1, 1, 1, 0],
                [1, 1, 1, 1, 1, 0, 0, 0, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
                [1, 1, 1, 1, 0, 0, 0, 1, 1, 1],
                [1, 1, 1, 0, 0, 0, 0, 1, 1, 0],
                [1, 1, 1, 0, 0, 0, 0, 1, 1, 0],
            ],
                        [ // Level 1 layout
                                       [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                                        [1, 0, 0, 0, 0, 0, 0, 0, 1, 1],
                                        [1, 3, 0, 1, 0, 0, 0, 1, 1, 1],
                                        [1, 0, 0, 1, 4, 0, 1, 0, 1, 0],
                                        [1, 1, 0, 0, 0, 1, 0, 0, 1, 0],
                                        [1, 1, 1, 0, 5, 2, 5, 0, 1, 1],
                                        [1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
                                        [1, 1, 1, 1, 0, 0, 0, 1, 1, 1],
                                        [1, 1, 1, 0, 0, 0, 0, 1, 1, 0],
                                        [1, 1, 1, 0, 0, 0, 0, 1, 1, 0],

                        ],
           [ // Level 1 layout
              [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
              [1, 1, 0, 0, 0, 0, 0, 0, 1, 1],
              [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
              [1, 0, 0, 0, 4, 0, 0, 0, 1, 0],
              [1, 0, 0, 0, 1, 1, 1, 0, 1, 0],
              [1, 3, 1, 0, 5, 5, 5, 2, 1, 1],
              [1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
              [1, 1, 1, 1, 5, 5, 5, 1, 1, 1],
              [1, 1, 1, 0, 0, 0, 0, 1, 1, 0],
              [1, 1, 1, 0, 0, 0, 0, 1, 1, 0],
            ],

           [ // Level 1 layout
              [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
              [1, 1, 0, 0, 0, 1, 1, 1, 1, 1],
              [1, 1, 1, 1, 1, 1, 1, 0, 0, 1],
              [1, 0, 4, 0, 0, 0, 0, 0, 0, 1],
              [1, 0, 1, 0, 1, 1, 1, 0, 0, 1],
              [1, 0, 1, 5, 5, 5, 0, 0, 0, 1],
              [1, 0, 1, 2, 1, 1, 1, 1, 1, 1],
              [1, 3, 1, 1, 0, 0, 0, 1, 1, 1],
              [1, 1, 1, 0, 0, 0, 0, 1, 1, 0],
              [1, 1, 1, 0, 0, 0, 0, 1, 1, 0],
            ],


           [ // Level 1 layout
              [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
              [1, 1, 0, 0, 1, 1, 3, 1, 1, 1],
              [1, 1, 1, 2, 1, 1, 0, 0, 1, 1],
              [1, 0, 5, 5, 5, 0, 1, 0, 0, 1],
              [1, 0, 0, 0, 1, 1, 1, 1, 0, 1],
              [1, 1, 0, 1, 1, 0, 0, 0, 0, 1],
              [1, 0, 0, 0, 1, 0, 4, 0, 1, 1],
              [1, 0, 0, 0, 0, 5, 5, 5, 1, 1],
              [1, 0, 0, 1, 1, 1, 1, 1, 1, 0],
              [1, 1, 1, 0, 0, 0, 0, 1, 1, 0],
            ],




           [ // Level 6 layout
              [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
              [1, 1, 0, 0, 0, 0, 0, 1, 1, 1],
              [1, 1, 1, 0, 1, 0, 0, 1, 1, 1],
              [1, 0, 0, 4, 0, 0, 1, 0, 1, 1],
              [1, 0, 1, 0, 1, 1, 1, 0, 0, 1],
              [1, 3, 0, 0, 0, 0, 0, 0, 0, 1],
              [1, 0, 1, 1, 1, 0, 1, 0, 0, 1],
              [1, 0, 0, 0, 0, 0, 2, 0, 0, 1],
              [1, 0, 0, 1, 1, 1, 1, 1, 1, 0],
              [1, 1, 1, 0, 0, 0, 0, 1, 1, 0],
            ],




           [ // Level 7 layout
              [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
              [1, 3, 1, 0, 0, 0, 1, 2, 1, 1],
              [1, 0, 1, 0, 0, 0, 0, 0, 1, 1],
              [1, 0, 4, 0, 1, 0, 1, 0, 0, 1],
              [1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
              [1, 0, 1, 0, 1, 0, 0, 0, 0, 1],
              [1, 0, 1, 0, 1, 0, 0, 0, 1, 1],
              [1, 0, 0, 0, 0, 0, 0, 0, 1, 1],
              [1, 0, 0, 1, 1, 0, 0, 1, 1, 0],
              [1, 1, 1, 0, 0, 1, 1, 1, 1, 0],
            ],


           [ // Level 8 layout
              [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
              [1, 0, 0, 1, 0, 0, 0, 0, 1, 1],
              [1, 0, 3, 0, 0, 0, 1, 0, 1, 1],
              [1, 1, 4, 1, 0, 0, 0, 0, 0, 1],
              [1, 0, 0, 0, 0, 1, 1, 0, 0, 1],
              [1, 0, 1, 0, 0, 1, 1, 0, 0, 1],
              [1, 0, 0, 0, 1, 0, 0, 0, 1, 1],
              [1, 0, 0, 1, 0, 0, 0, 2, 1, 1],
              [1, 0, 1, 0, 0, 0, 0, 1, 1, 0],
              [1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
            ],


           [ // Level 9 layout
              [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
              [1, 0, 0, 1, 1, 1, 0, 0, 0, 1],
              [1, 0, 3, 0, 0, 4, 0, 0, 0, 1],
              [1, 0, 0, 0, 1, 1, 1, 1, 1, 1],
              [1, 1, 0, 1, 1, 1, 1, 1, 2, 1],
              [1, 1, 0, 0, 0, 1, 1, 0, 0, 1],
              [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
              [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
              [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
              [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            ],


           [ // Level 10 layout
              [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
              [1, 0, 0, 1, 1, 1, 1, 0, 0, 1],
              [1, 0, 0, 1, 1, 0, 0, 0, 0, 1],
              [1, 0, 0, 2, 1, 3, 4, 1, 1, 1],
              [1, 1, 0, 1, 1, 1, 0, 1, 1, 1],
              [1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
              [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
              [1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
              [1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
              [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            ],







        ];




    return levels;

  }




  drawCarpet(ctx, x, y, width, height) {

    const backgroundColor = '#9b1c31';
    const darkerColor = '#B3173B'; // Adjust this as needed #B3173B , const darkerColor = '#C41842'; // Adjust this as needed #B3173B , 

    const innerRectSizeFactor = 0.75; // Size factor for the first inner rectangle
    const innerMostRectSizeFactor = 0.6; // Size factor for the second inner rectangle



    // Draw the main rectangle
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(x, y, width, height);

    // Draw the first inner rectangle
    const innerRectSizeX = width * innerRectSizeFactor;
    const innerRectSizeY = height * innerRectSizeFactor;

    const innerRectX = x + (width - innerRectSizeX) / 2;
    const innerRectY = y + (height - innerRectSizeY) / 2;
    ctx.fillStyle = darkerColor;
    ctx.fillRect(innerRectX, innerRectY, innerRectSizeX, innerRectSizeY);

    // Draw the second inner rectangle
    const innerMostRectSizeX = width * innerMostRectSizeFactor;
    const innerMostRectSizeY = height * innerMostRectSizeFactor;

    const innerMostRectX = x + (width - innerMostRectSizeX) / 2;
    const innerMostRectY = y + (height - innerMostRectSizeY) / 2;
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(innerMostRectX, innerMostRectY, innerMostRectSizeX, innerMostRectSizeY);
  }




  drawDiamond(ctx, x, y, width, height) {
    // set fill style to blue
    ctx.fillStyle = '#0000FF';

    // Define triangle points (relative coordinates between 0 and 1)
    const triangltePoints = [
      [0.5, 0], // Bottom center
      [1, 1], // Top right
      [0, 1], // Top left
    ];

    // Draw the triangle with black fill, positioned at (50, 25) with width 100 and height 75

    ctx.fillStyle = 'hsl(200deg 100% 50%)';
    var trianglePoints = [[0, 0.2], [1, 0.2], [0.8, 0], [0.2, 0]];
    this.drawShape(ctx, trianglePoints, x, y, width, height);


    ctx.fillStyle = 'hsl(200deg 100% 60%)';
    trianglePoints = [[0, 0.2], [0.3, 0.2], [0.2, 0]];
    this.drawShape(ctx, trianglePoints, x, y, width, height);


    ctx.fillStyle = 'hsl(200deg 100% 65%)';
    trianglePoints = [[0.3, 0.2], [0.7, 0.2], [0.5, 0]];
    this.drawShape(ctx, trianglePoints, x, y, width, height);


    ctx.fillStyle = 'hsl(200deg 100% 70%)';
    trianglePoints = [[0.7, 0.2], [1, 0.2], [0.8, 0]];
    this.drawShape(ctx, trianglePoints, x, y, width, height);





    ctx.fillStyle = 'hsl(200deg 100% 40%)';
    trianglePoints = [[0, 0.2], [0.3, 0.2], [0.5, 0.8]];
    this.drawShape(ctx, trianglePoints, x, y, width, height);

    ctx.fillStyle = 'hsl(200deg 100% 30%)';
    trianglePoints = [[0.3, 0.2], [0.7, 0.2], [0.5, 0.8]];
    this.drawShape(ctx, trianglePoints, x, y, width, height);

    ctx.fillStyle = 'hsl(200deg 100% 20%)';
    trianglePoints = [[0.7, 0.2], [1, 0.2], [0.5, 0.8]];
    this.drawShape(ctx, trianglePoints, x, y, width, height);





  }



  drawShape(ctx, points, x, y, width, height) {
    // Set fill style (optional, modify for desired color)
    //  ctx.fillStyle = '#000000'; // Set to black by default

    // Begin path
    ctx.beginPath();

    // Loop through points and translate to desired position
    for (let i = 0; i < points.length; i++) {
      const pointX = points[i][0] * width + x;
      const pointY = points[i][1] * height + y;
      if (i === 0) {
        ctx.moveTo(pointX, pointY); // Move to first point
      } else {
        ctx.lineTo(pointX, pointY); // Draw line to subsequent points
      }
    }

    // Close path (optional for some shapes)
    // ctx.closePath(); // Uncomment if needed

    // Fill or stroke the shape (modify for desired effect)
    ctx.fill(); // This fills the shape
    // ctx.stroke(); // This strokes the outline

    // Reset path for future drawings (optional)
    ctx.closePath();
  }









  drawFinish(ctx, x, y, size) {

    ctx.fillStyle = "#ddd";
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + size, y);
    ctx.lineTo(x + size, y + size);
    ctx.lineTo(x, y + size);
    ctx.lineTo(x, y);
    ctx.closePath();
    ctx.fill();



    ctx.fillStyle = "#ccc";
    ctx.beginPath();
    ctx.moveTo(x + size / 2, y);
    ctx.lineTo(x + size, y + size / 2);
    ctx.lineTo(x + size / 2, y + size);
    ctx.lineTo(x, y + size / 2);
    ctx.closePath();
    ctx.fill();



    ctx.fillStyle = "#bbb";
    ctx.beginPath();
    ctx.moveTo(x + size / 4, y + size / 4);
    ctx.lineTo(x + size - size / 4, y + size / 4);
    ctx.lineTo(x + size - size / 4, y + size - size / 4);
    ctx.lineTo(x + size / 4, y + size - size / 4);
    ctx.closePath();
    ctx.fill();





  }





  drawRoundedRectPlayer(x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + width, y, x + width, y + height, radius);
    ctx.arcTo(x + width, y + height, x, y + height, radius);
    ctx.arcTo(x, y + height, x, y, radius);
    ctx.arcTo(x, y, x + width, y, radius);
    ctx.closePath();
    ctx.fill();


    var d = width * 0.14;
    var size = width;

    ctx.beginPath();
    ctx.moveTo(x + size / 2, y - d);
    ctx.lineTo(x + size + d, y + size / 2);
    ctx.lineTo(x + size / 2, y + size + d);
    ctx.lineTo(x - d, y + size / 2);
    ctx.closePath();
    ctx.fill();



  }





  drawBrickPattern(ctx, x, y, size, colors) {
    // First triangle (left)
    ctx.fillStyle = colors.lightYellow;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + size / 2, y + size / 2);
    ctx.lineTo(x, y + size);
    ctx.closePath();
    ctx.fill();

    // Second triangle (top)
    ctx.fillStyle = colors.mediumYellow;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + size / 2, y + size / 2);
    ctx.lineTo(x + size, y);
    ctx.closePath();
    ctx.fill();

    // Third triangle (right)
    ctx.fillStyle = colors.darkYellow;
    ctx.beginPath();
    ctx.moveTo(x + size, y);
    ctx.lineTo(x + size / 2, y + size / 2);
    ctx.lineTo(x + size, y + size);
    ctx.closePath();
    ctx.fill();

    // Fourth triangle (bottom)
    ctx.fillStyle = colors.mediumBrown;
    ctx.beginPath();
    ctx.moveTo(x + size, y + size);
    ctx.lineTo(x + size / 2, y + size / 2);
    ctx.lineTo(x, y + size);
    ctx.closePath();
    ctx.fill();
  }




}





