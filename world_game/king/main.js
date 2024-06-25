const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

var cellSize = 80;
var gridWidth = canvas.width / cellSize;
var gridHeight = canvas.height / cellSize;

let inMenu = true;


var debug = 1;
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
      '/arcade1-142093.mp3',
      '/arcade2-158813.mp3',
      '/arcade3-158814.mp3'
    ];

  const soundFile = '/beep3-98810.mp3';
  const fontName = 'Pacifico';
  const fontUrl = 'url(Pacifico-Regular.ttf)';

  const loadAudio = (file) => {
    return new Promise((resolve, reject) => {
      const audio = new Audio(file);
      audio.oncanplaythrough = () => {
        resolve(audio);
      };
      audio.onerror = (e) => {
        reject(new Error(`Failed to load audio file: ${file}`));
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
      });
    });
  };

  const loadUtils = () => {
    return new Promise((resolve, reject) => {
      try {
        const utils = new Utils(this);
        resolve(utils);
      } catch (error) {
        reject(new Error('Failed to load Utils'));
      }
    });
  };

  const audioPromises = audioFiles.map(loadAudio);
  const soundPromise = loadAudio(soundFile);
  const fontPromise = loadFont(fontName, fontUrl);
  const utilsPromise = loadUtils();

  return Promise.all([...audioPromises, soundPromise, fontPromise, utilsPromise])
    .then(results => {
      // Assign loaded assets to the class properties
      tracks = results.slice(0, audioFiles.length);
      sound = results[audioFiles.length];
      font = results[audioFiles.length + 1];
      utils = results[audioFiles.length + 2];

      utils.setTrack(tracks);

                  displayError("All assets preloaded successfully ");

      console.log('All assets preloaded successfully.');
    })
    .catch(error => {
      console.error('Error preloading assets:', error);
      
                  displayError("error assets " + error);

    });
}







// 1
window.addEventListener('load', () => {
  //  init();
  //  window.addEventListener('resize', resizeCanvas);
  start();

  console.log("page load");
  
        displayError("page load");

});




// 2
function start() {
  preloadAssets()
    .then(() => {
      // Initialize game or show start screen
      console.log('Game started');
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
   if(debug == 1) {
      document.getElementById('debug').innerText = dtext;
   } 

}



// 3

function init() {
  //  utils.playNextTrack();
//  cStart = 1;

  resizeCanvas();

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    document.getElementById('startButton').style.display = 'block';

   if(debug == 0) {
      document.getElementById('debug').style.display = 'none';
   } 


  
  drawMenuStart();


  document.getElementById('startButton').addEventListener('click', () => {
    
    
    utils.playNextTrack();
    
    console.log("start click");


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

//  console.log("canvas width : " + canvas.width + "  canvas height : " + canvas.height);

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  console.log("2 canvas width : " + canvas.width + "  canvas height : " + canvas.height);


  //  cellSize = Math.min(window.innerWidth, window.innerHeight) / 10;

  cellSize = Math.min(canvas.width, canvas.height) / 10;

  // Call to update the canvas and cellSize initially

  // Recalculate grid dimensions based on new canvas size
  gridWidth = canvas.width / cellSize;
  gridHeight = canvas.height / cellSize;

  if (GAME_STATE == 1) {
    //    movePlayer(0, 0);
  }


   console.log("window innerWidth: " + window.innerWidth + " innerHeight: " + window.innerHeight + "  cellSize: " + cellSize + " gridWidth: " + gridWidth + "  gridHeight: " + gridHeight);


}




// 4

function drawMenuStart() {
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);


  const layout = utils.getLevels()[2];

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

  ctx.font = (cellSize * 1) + "px Pacifico";
  ctx.fillText("Brickbox", canvas.width / 2 - (cellSize * 1.6), (cellSize * 2));

  /*  utils.drawButton('startGame', 1, canvas.width / 2 - 100, 100, cellSize * 3, cellSize, "Start Game", () => navigateToLevelSelection(), colors, true);
   */
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

   if(!inMenu) {
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

    console.log("sound on"); //

    soundC = 2;

  } else if (soundC == 2) {
    utils.setSoundText('Sound: Off');
    utils.pauseAudio();

    console.log("sound off"); //

    soundC = 1;

  }

    drawMenu();

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

  console.log("paused ");

}

function resumeGame() {
  //  isPaused = false;
  // gameLoop();

  console.log("resume ");

}




document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    pauseGame();
    utils.pauseAudio();
    isPaused = true;
    cancelAnimationFrame(animationFrame);
    console.log("visibilitychange ");

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
      
      console.log("move player  x " + (gridX - player.x) +  "  y " + (gridY - player.y));
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


