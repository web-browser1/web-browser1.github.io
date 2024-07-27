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
  ctx.font = (cellSize * 1) + "px Pacifico";
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


  this.drawButton('sound', 3, cellSize * 0.2, (canvas.height / 2) - (cellSize), cellSize * 1.8, cellSize * 0.6, "Sound: On/Off", this.gameInstance.toggleSound, colors, true, cellSize);




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
      ctx.font = (cellSize * 0.32) + 'px Pacifico';

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
  
  
  
    this.drawMultiLineText(ctx, message, cellSize * 0.4, cellSize * 3.4, cellSize);


  
  
  ctx.globalAlpha = 1.0; 
  
      ctx.fillStyle = '#B3173B'; 

//  ctx.font = (cellSize * 0.4) + 'px Arial';
      ctx.font = (cellSize * 0.4) + 'px Pacifico';

  ctx.fillText("How to Play", (cellSize * 2), cellSize * 4.6);

}




drawMultiLineText(ctx, text, x, y, cellSize, lineHeight = 0.3) { // Adjust lineHeight as needed
  const lines = text.split(/<br\s*\/?>/i); // Split by HTML line breaks
  for (let i = 0; i < lines.length; i++) {
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

    }
  */








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





  drawCongratulationsUI(ctx, canvas, colors, nextLevel, cellSize) {
    const uiX = canvas.width / 2 - 150;
    const uiY = canvas.height / 2 - 50;
    const uiWidth = 300;
    const uiHeight = 100;


    // Draw text
    ctx.fillStyle = '#555';
    ctx.font = (cellSize * 0.3) + 'px Pacifico';

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

      /*  if (!isCollision(newX, newY) && !(newX === box.x && newY === box.y)) {
          availableCells.push({ x: newX, y: newY });
        }*/

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