class Utils {



  constructor() {

    this.x = 10;

  }


  getSpeedX() {
    return this.x;
  }

  setSpeedX(speed) {
    this.x = speed;
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







 drawCarpet(ctx, x, y, cellSize) {
  
  const backgroundColor = '#9b1c31';
const darkerColor = '#B3173B'; // Adjust this as needed #B3173B , const darkerColor = '#C41842'; // Adjust this as needed #B3173B , 

const innerRectSizeFactor = 0.75; // Size factor for the first inner rectangle
const innerMostRectSizeFactor = 0.6; // Size factor for the second inner rectangle


  
  // Draw the main rectangle
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(x, y, cellSize, cellSize);

  // Draw the first inner rectangle
  const innerRectSize = cellSize * innerRectSizeFactor;
  const innerRectX = x + (cellSize - innerRectSize) / 2;
  const innerRectY = y + (cellSize - innerRectSize) / 2;
  ctx.fillStyle = darkerColor;
  ctx.fillRect(innerRectX, innerRectY, innerRectSize, innerRectSize);

  // Draw the second inner rectangle
  const innerMostRectSize = cellSize * innerMostRectSizeFactor;
  const innerMostRectX = x + (cellSize - innerMostRectSize) / 2;
  const innerMostRectY = y + (cellSize - innerMostRectSize) / 2;
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(innerMostRectX, innerMostRectY, innerMostRectSize, innerMostRectSize);
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


      var d = 10;
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