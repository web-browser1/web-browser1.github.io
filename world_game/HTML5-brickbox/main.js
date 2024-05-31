const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

var cellSize = 80;
var gridWidth = canvas.width / cellSize;
var gridHeight = canvas.height / cellSize;

let inMenu = true;





var utils = new Utils();

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



const levels = [
            [ // Level 1 layout
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 0, 0, 0, 1, 0, 0, 0, 1, 1],
                [1, 0, 3, 0, 4, 0, 2, 0, 1, 1],
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
        
        
        
        

let currentLevel = 0;

let playerLevel = 1;

var completedLevels = [false, false, false, false, false, false, false, false, false, false]; // Assuming there are 3 levels


//var completedLevels = [true, true, true, true, true, true, true, true, true, true]; 




let player, box, finishZone, walls, carpets;

let particles = [];

let GAME_STATE = 0;

let buttons = [];



// Array to hold the audio elements
const tracks = [
                new Audio('/8-bit-dream-land-142093.mp3'),
                new Audio('/8-bit-air-fight-158813.mp3'),
                new Audio('/8-bit-arcade-mode-158814.mp3')
            ];

let currentTrackIndex = 0;

var currentTrack = tracks[currentTrackIndex];

/*

// Function to play the next track in the array
function playNextTrack() {
  // Get the current track
  currentTrack = tracks[currentTrackIndex];

  // Event listener for when the track ends
  currentTrack.addEventListener('ended', () => {
    // Move to the next track index, looping back to 0 if at the end
    currentTrack.pause();
    currentTrack.currentTime = 0;
    
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;

     if(currentTrack.duration > 0) {
       
       
     } else {
       
     }

    // Play the next track
    playNextTrack();
  });
  
  
       if(currentTrack.duration > 0) {
         
       } else {

         
       }

           currentTrack.play();

  // Play the current track

}*/




let isPlaying = false;
let audioPausedAt = 0;

function playNextTrack() {
  currentTrack = tracks[currentTrackIndex];
  
  
  currentTrack.play();
  isPlaying = true;
  
  
  currentTrack.onended = function() {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
      currentTrack.currentTime = 0;

    playNextTrack();
  };
  
}

function pauseAudio() {
  if (isPlaying) {
    currentTrack.pause();
 //   audioPausedAt = currentTrack.currentTime;
    isPlaying = false;
    
  }
}

function resumeAudio() {
  if (!isPlaying) {
   // currentTrack.currentTime = audioPausedAt;
    currentTrack.play();
    isPlaying = true;
    
      

  }
}



function init() {
  playNextTrack();
  showMenuStart();
  animationFrame = requestAnimationFrame(gameLoop);
}


  
  window.addEventListener('load', () => {

       init();

  });
  




const sound = new Audio('beep3-98810.mp3');


// Start the loop


function createParticles(x, y) {
  const numParticles = 20;
  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle(x + cellSize / 2, y + cellSize / 2, '#CCCCCC')); // You can adjust the color as needed
  }
}

function startLevel(level) {

  if (level == 1) {


  }
      
               pauseAudio();
               isPaused = true;
               cancelAnimationFrame(animationFrame);
      
      resumeAudio();
      isPaused = false;
      animationFrame = requestAnimationFrame(gameLoop);
      

  currentLevel = level;
  const layout = levels[currentLevel - 1];
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

  buttons = [];



  inMenu = false;
  draw();

  gameLoop();

}



function getAvailableCells() {
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

    /*  if (!isCollision(newX, newY) && !(newX === box.x && newY === box.y)) {
        availableCells.push({ x: newX, y: newY });
      }*/

    if (!isCollision(newX, newY)) {
      availableCells.push({ x: newX, y: newY });
    }


  });

  return availableCells;
}


function generateWalls(extraWalls) {
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



function showMenu() {
  cancelAnimationFrame(animationFrame);
  inMenu = true;
  draw();
}

function shake(intensity = 8) {
  return {
    x: (Math.random() - 0.5) * intensity,
    y: (Math.random() - 0.5) * intensity
  };
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (inMenu) {
    drawMenu();
  } else {
    drawGame();
  }
}




//showMenuStart();

function showMenuStart() {
  cancelAnimationFrame(animationFrame);
  inMenu = true;
  drawMenuStart();
}


function drawMenuStart() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#444";
  ctx.font = "48px Pacifico";
  ctx.fillText("Brickbox ©", canvas.width / 2 - 100, 100);

  drawButton(2, canvas.width / 2 - 100, 300, 200, 50, "Start Game", () => navigateToLevelSelection());

  GAME_STATE = 0;
}

function navigateToLevelSelection() {
  inMenu = false;
  drawMenu();
}

canvas.addEventListener('click', handleMouseClick);
canvas.addEventListener('touchstart', handleTouchStart);

function handleMouseClick(event) {
  const mouseX = event.clientX - canvas.offsetLeft;
  const mouseY = event.clientY - canvas.offsetTop;
  checkButtonClick(mouseX, mouseY);
}

function handleTouchStart(event) {
  const touchX = event.touches[0].clientX - canvas.offsetLeft;
  const touchY = event.touches[0].clientY - canvas.offsetTop;
  checkButtonClick(touchX, touchY);
}

function checkButtonClick(x, y) {
  for (const button of buttons) {
    if (x >= button.x && x <= button.x + button.width && y >= button.y && y <= button.y + button.height) {
      button.onClick();
     // playNextTrack();

      break;
    }
  }
}

function drawMenu() {


  const layout = levels[2];

  walls = [];

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
  ctx.font = "58px Pacifico";
  ctx.fillText("Brickbox", canvas.width / 2 - 100, 100);




const totalLevels = 10;
const buttonWidth = 1 * cellSize;
const buttonHeight = 1 * cellSize;
const buttonMarginX = 0.2 * cellSize; // Space between buttons horizontally
const buttonMarginY = 0.3 * cellSize; // Space between buttons vertically
const startX = (canvas.width - ((cellSize * 5) + ((0.2 * cellSize) * 5) )) / 2; // Starting X position for the first button
const startY = 220; // Starting Y position for the first button
const maxWidth = 400; // Maximum allowed width for all buttons



for (let i = 0; i < totalLevels; i++) {
  const calculatedX = startX + (i % 5) * (buttonWidth + buttonMarginX); // Calculate X position based on even/odd row
  const calculatedY = startY + Math.floor(i / 5) * (buttonHeight + buttonMarginY); // Calculate Y position based on row number

  drawButtonLevel(1, calculatedX, calculatedY, buttonWidth, buttonHeight, `${i + 1}`, i, () => startLevel(i + 1));
}




/*
 var gx = 100;
 
 var gy = 100;
 var gy1 = 80;
 


  drawButtonLevel(1, gx, gy+(gy1*0), 200, 50, "Level 1", 0, () => startLevel(1));
  drawButtonLevel(1, gx, gy+(gy1*1), 200, 50, "Level 2", 1, () => startLevel(2));
  drawButtonLevel(1, gx, gy+(gy1*2), 200, 50, "Level 3", 2, () => startLevel(3));
  
    drawButtonLevel(1, gx, gy+(gy1*3), 200, 50, "Level 4", 3, () => startLevel(4));

    drawButtonLevel(1, gx, gy+(gy1*4), 200, 50, "Level 5", 4, () => startLevel(5));


   gx += 230;


  drawButtonLevel(1, gx, gy+(gy1*0), 200, 50, "Level 6", 5, () => startLevel(6));
  drawButtonLevel(1, gx, gy+(gy1*1), 200, 50, "Level 7", 6, () => startLevel(7));
  drawButtonLevel(1, gx, gy+(gy1*2), 200, 50, "Level 8", 7, () => startLevel(8));
  
    drawButtonLevel(1, gx, gy+(gy1*3), 200, 50, "Level 9", 8, () => startLevel(9));

    drawButtonLevel(1, gx, gy+(gy1*4), 200, 50, "Level 10", 9, () => startLevel(10));*/




  GAME_STATE = 0;
}






function drawPauseButton() {
  const buttonWidth = 100;
  const buttonHeight = 40;
  const x = (canvas.width / 2) - (buttonWidth / 2);
  const y = 10;

  


    drawButton(2, x, y, buttonWidth, 52, "PAUSE", togglePause);



}









let isPaused = false;
let animationFrame;

function togglePause() {
  if (isPaused) {
    resumeAudio();
    isPaused = false;
    animationFrame = requestAnimationFrame(gameLoop);
  } else {
    pauseAudio();
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
         pauseAudio();
         isPaused = true;
         cancelAnimationFrame(animationFrame);
           console.log("visibilitychange ");
           drawPauseScreen();

  }
});






const pauseOverlay = {
  width: window.innerWidth,
  height: window.innerHeight,
  text: 'Game Paused',
  textX: canvas.width / 2,
  textY: canvas.height / 2 - 50,
  button: {
    text: 'Resume',
    x: canvas.width / 2 - 40,
    y: canvas.height / 2,
    width: 80,
    height: 30
  }
};


function drawPauseScreen() {


  ctx.fillStyle = '#444';
  ctx.font = '40px Arial';
  ctx.fillText(pauseOverlay.text, (canvas.width / 2) - 110,( canvas.height /2 ) - 100);

    drawButton(2, canvas.width / 2 - 110, canvas.height /2, 140, 60, "RESUME", resumeScreen);

}





function resumeScreen() {
  
  updateGame();
  
      resumeAudio();
      isPaused = false;
      animationFrame = requestAnimationFrame(gameLoop);
  
}











function drawButton(state, x, y, width, height, text, onClick) {

 


  ctx.fillStyle = colors.completed;
  // ctx.fillRect(x, y, width, height);
  utils.drawRoundedRect(x, y, width, height, 10);

  ctx.fillStyle = "hsl(0deg 50% 100% / 10%)";
  // ctx.fillRect(x, y, width, height);
  utils.drawRoundedRect(x, y, width, height, 10);


  ctx.fillStyle = "#fff";
  ctx.font = "20px Arial";
  ctx.fillText(text, x + 20, y + 30);

  // Store the button's dimensions and callback for later use in touch events
  buttons.push({ state, x, y, width, height, onClick });
}

function drawButtonLevel(state, x, y, width, height, text, levelIndex, onClick) {
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

  utils.drawRoundedRect(x, y, width, height, 10);

  ctx.fillStyle = "hsl(0deg 50% 100% / 10%)";

  // ctx.fillRect(x, y, width, height);
  utils.drawRoundedRect(x, y, width, height - 10, 10);



  ctx.fillStyle = "#fff";
  ctx.font = (cellSize * 0.3) + "px Arial";
  ctx.fillText(text, x + 20, y + 30);

  if (clickable1) {
    //buttons.push({ x, y, width, height, onClick: () => startLevel(levelIndex + 1) });
    buttons.push({ state, x, y, width, height, onClick });

  }
}

const tutorialSteps = [
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

let currentTutorialStep = 0;

function hasMoved() {
  return player.x > 2;
}

function updateTutorial() {
  if (tutorialSteps[currentTutorialStep].condition()) {
    currentTutorialStep++;
  }
}

function drawTutorial() {
  const message = tutorialSteps[currentTutorialStep].message;
  ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
  ctx.fillRect(10, canvas.height / 2 - 180, canvas.width - 20, 80);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = (cellSize * 0.3) + 'px Arial';
  ctx.fillText(message, 20, canvas.height / 2 - 150);
}





const restartButton = {
  x: 20,
  y: 10,
  width: 120,
  height: 40,
  label: 'RESTART'
};


let isBoxInFinishZone = false;

function checkBoxInFinishZone() {
  if (box.x === finishZone.x && box.y === finishZone.y) {
    isBoxInFinishZone = true;

    if (playerLevel > currentLevel) {
      playerLevel++;
    }


    completedLevels[currentLevel - 1] = true;
  } else {
    isBoxInFinishZone = false;
  }
}


// Game loop
function gameLoop() {
  
    if (isPaused) return;
  
    // Your game loop logic here
  
   // animationFrame = requestAnimationFrame(gameLoop);
  
  
  
  const now = performance.now();
  const delta = now - lastFrameTime;

  if (delta >= frameInterval) {
    updateGame();
    draw();
    lastFrameTime = now - (delta % frameInterval);


  }

  animationFrame = requestAnimationFrame(gameLoop);
}

function updateGame() {
  // Update game logic here (e.g., player movement, collision detection)
  updateCamera();
  updateTutorial();
  checkBoxInFinishZone();

  // Update alpha value for fade in and out effect
  availableCellAlpha += fadeDirection * fadeSpeed;
  if (availableCellAlpha >= 1) {
    availableCellAlpha = 1;
    fadeDirection = -1; // Start fading out
  } else if (availableCellAlpha <= 0) {
    availableCellAlpha = 0;
    fadeDirection = 1; // Start fading in
  }


}

const fps = 30;
const frameInterval = 1000 / fps;
let lastFrameTime = performance.now();

// Start the game loop


let availableCellAlpha = 0;
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

    utils.drawCarpet(ctx, carpet.x, carpet.y, cellSize);

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
  const availableCells = getAvailableCells();
  ctx.fillStyle = '#dddddd';
  ctx.globalAlpha = availableCellAlpha; // Set transparency
  availableCells.forEach(cell => {
    ctx.save();
    ctx.translate((cell.x * cellSize) + shakeOffset.x, (cell.y * cellSize) + shakeOffset.y);
    utils.drawRoundedRect(0, 0, cellSize, cellSize, 10);
    ctx.restore();
  });
  ctx.globalAlpha = 1.0; // Reset transparency



  // Draw player with rounded corners
  ctx.fillStyle = colors.player;
  ctx.save();
  ctx.translate(player.x * cellSize, player.y * cellSize);

  utils.drawRoundedRectPlayer(0, 0, player.width, player.height, 10);

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



  // Draw bunny eyes with animated pupils
  ctx.fillStyle = "#ccc"; // Set eyes color

  // Draw left eye with pupil



  // Inside the rendering loop (drawGame function)
  // Calculate direction vector from player to box
  const directionX = box.x - player.x;
  const directionY = box.y - player.y;
  const magnitude = Math.sqrt(directionX ** 2 + directionY ** 2);
  const normalizedDirectionX = directionX / magnitude;
  const normalizedDirectionY = directionY / magnitude;

  // Calculate the angle of the direction vector
  const angle = Math.atan2(normalizedDirectionY, normalizedDirectionX);

  // Calculate the position of the pupils based on the angle
  const eyeDistance = cellSize / 5; // Distance from the center of the eyes to the pupils
  const eyeOffsetXLeft = Math.cos(angle) * eyeDistance;
  const eyeOffsetYLeft = Math.sin(angle) * eyeDistance;
  const eyeOffsetXRight = Math.cos(angle) * eyeDistance;
  const eyeOffsetYRight = Math.sin(angle) * eyeDistance;

  // Draw bunny eyes with animated pupils
  // Update pupil position based on direction to box
  const eyeXLeft = (player.x + 0.4 + eyeOffsetXLeft) * cellSize;
  const eyeYLeft = (player.y + 0.4 + eyeOffsetYLeft) * cellSize;
  const eyeXRight = (player.x + 0.6 + eyeOffsetXRight) * cellSize;
  const eyeYRight = (player.y + 0.4 + eyeOffsetYRight) * cellSize;

  // Draw left eye with pupil
  ctx.beginPath();
  ctx.arc(eyeXLeft, eyeYLeft, cellSize / 12, 0, Math.PI * 2);
  ctx.fill();

  // Draw right eye with pupil
  ctx.beginPath();
  ctx.arc(eyeXRight, eyeYRight, cellSize / 12, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();




  // Update tutorial
  if (currentLevel == 1) {
    // Draw tutorial
    drawTutorial();
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
    drawCongratulationsUI();
  }


  // Draw menu drawButton
  drawButton(2, canvas.width - 110, 10, 100, 52, "MENU", showMenu);


  // Draw restart button
  drawButton(2, restartButton.x, restartButton.y, restartButton.width, 52, restartButton.label, restartLevel);
  
      drawPauseButton();


}


function restartLevel() {
  // Logic to restart the current level
  //loadLevel(currentLevelIndex); // Assuming loadLevel is a function that loads a level by index

  startLevel(currentLevel);

}

function nextLevel() {
  //  currentLevel++;

  //     playerLevel = playerLevel + 1;

  showMenu();
  
  if(currentLevel > 2) {
  
     showInterstital();
  }
  //    startLevel(currentLevel + 1);
  
  if(currentLevel == 3) {
    updateLevel();
  }

  isBoxInFinishZone = false;
}




function updateLevel() {
  
  
  //let currentLevel = 10;
  GamePix.updateLevel(currentLevel);
  
  if(currentLevel == 10) {
    GamePix.happyMoment();
  }
}


function showInterstital() {
  
  
      pauseAudio();
      isPaused = true;
      cancelAnimationFrame(animationFrame);
      
  
  GamePix.interstitialAd().then(function(res) {
  
        // IMPORTANT: *** RESUME YOUR GAME ***
        
            resumeAudio();
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












function drawCongratulationsUI() {
  const uiX = canvas.width / 2 - 150;
  const uiY = canvas.height / 2 - 50;
  const uiWidth = 300;
  const uiHeight = 100;



  // Draw background
  //  ctx.fillStyle = '#ddd';
  //  ctx.globalAlpha = 0.8;
  //      ctx.fillRect(uiX, uiY, uiWidth, uiHeight);
  //    ctx.globalAlpha = 1.0;

  // Draw text
  ctx.fillStyle = '#555';
  ctx.font = '30px Pacifico';

  ctx.fillText('Level Completed!', (canvas.width / 2) - 130, canvas.height / 2 + 100);

  // Draw next level button
  drawButton(2, canvas.width / 2 - 50, canvas.height / 2 + 140, 160, 52, "Next Level", nextLevel);
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

      createParticles(prevX, prevY);
    }
  } else {
    animatePlayerMovement(newPlayerX, newPlayerY, () => {
      player.x = newPlayerX;
      player.y = newPlayerY;
      player.width = cellSize;
      player.height = cellSize;
    });
    createParticles(prevX, prevY);

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




canvas.addEventListener('touchstart', function(event) {
  const touch = event.touches[0];
  const rect = canvas.getBoundingClientRect();
  const x = touch.clientX - rect.left;
  const y = touch.clientY - rect.top;


  // Check if touch is within any button
  buttons.forEach(button => {
    if (x >= button.x && x <= button.x + button.width && y >= button.y && y <= button.y + button.height) {
      if (button.state == 1 && GAME_STATE == 0) {
        button.onClick();
      } else if (button.state != 1 && GAME_STATE == 1) {
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



class Particle {
  constructor(x, y, color) {
    this.initialX = x;
    this.initialY = y;
    this.x = x;
    this.y = y;
    this.color = color;
    this.alpha = 0.6;
    this.size = 10;
    this.speedX = (Math.random() - 0.5) * 2;
    this.speedY = (Math.random() - 0.5) * 2;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.alpha -= 0.02;
    if (this.alpha < 0) this.alpha = 0;
  }

  draw(ctx, cameraX, cameraY) {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    //  ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.arc(this.x - cameraX, this.y - cameraY, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}






function resizeCanvas() {
  // Set canvas size to window size
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  cellSize = Math.min(window.innerWidth, window.innerHeight) / 10;
   // Call to update the canvas and cellSize initially

  // Recalculate grid dimensions based on new canvas size
  gridWidth = canvas.width / cellSize;
  gridHeight = canvas.height / cellSize;

  // Redraw game elements
  
  window.addEventListener('load', () => {
       draw();

  });
  
}

// Resize the canvas when the window size changes
window.addEventListener('resize', resizeCanvas);

// Initial canvas size setup
resizeCanvas();




console.log("width: " + window.innerWidth + " width: " + window.clientWidth);





