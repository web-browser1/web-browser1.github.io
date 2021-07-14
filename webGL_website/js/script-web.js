const app = new PIXI.Application({ width: 600, height: 600, backgroundColor: 0xDDDDDD });
document.body.appendChild(app.view);


// create a texture from an image path
const texture = PIXI.Texture.from('images/vector.png');

texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

const textureButton = PIXI.Texture.from('images/vector.png');



var rx = 50;
var ry = 50;



const c_rectangle = new PIXI.Graphics();

// Rectangle

c_rectangle.lineStyle(16, 0x9CCC65, 3);

var start_p = 300;


c_rectangle.beginFill(0xEEEEEE);
c_rectangle.drawRect(-start_p, -start_p, start_p*2, start_p*2);
c_rectangle.endFill();



   c_rectangle.x = start_p;
    c_rectangle.y = start_p;


    rx = start_p;
    ry = start_p;


//app.stage.addChild(c_rectangle);

// const c_rectangle = new PIXI.Sprite(texture);



    c_rectangle.interactive = true;

    c_rectangle.buttonMode = true;



    // center the c_rectangle's anchor point
  //  c_rectangle.anchor.set(0.5);


  
    c_rectangle.scale.set(1);





 // setup events for mouse + touch using
    // the pointer events
   c_rectangle
        .on('pointerdown', onDragStart)
        .on('pointerup', onDragEnd)
        .on('pointerupoutside', onDragEnd)
        .on('pointermove', onDragMove);




    app.stage.addChild(c_rectangle);

var cx = 0;
var cy = 0;



function onPanStart(e) {

    var bx = e.deltaX;

    var by = e.deltaY;


console.log("bx: " + bx + "  by: " + by );
}


function onDragStart(event) {
    // store a reference to the data
    // the reason for this is because of multitouch
    // we want to track the movement of this particular touch
    this.data = event.data;
    this.alpha = 0.7;
    this.dragging = true;

    const newPosition = this.data.getLocalPosition(this.parent);

     //  const gPosition =   this.data.getGlobalPosition(this.parent);

    cx = newPosition.x;
    cy = newPosition.y; 


 console.log("cx: " + cx + "  cy: " + cy );
}

function onDragEnd() {
    this.alpha = 1;
    this.dragging = false;

  // rx = this.data.getLocalPosition(this.parent).x;
 //  ry = this.data.getLocalPosition(this.parent).y;

    // set the interaction data to null
    this.data = null;


    rx = c_rectangle.x;
    ry = c_rectangle.y;


   console.log("rx: " + rx + "  ry: " + ry);

}

var dx = 0;
var dy = 0;


function onDragMove() {
    if (this.dragging) {
        const newPosition = this.data.getLocalPosition(this.parent);

    

      //  var gx = Math.abs(cx - rx)


        dx = newPosition.x - (cx );
        dy = newPosition.y - (cy );


      //  this.x = dx;
      //  this.y = dy;


      //  this.x = newPosition.x;
    //   this.y = newPosition.y;


c_rectangle.x = rx + dx;
c_rectangle.y = ry + dy;


	console.log("x: " + newPosition.x + "  y: " + newPosition.y  + 
     "  dx: " + dx   + "  dy: " + dy);

    }
}









    const button = new PIXI.Sprite(textureButton);



    button.anchor.set(0.5);
    button.x = 60;
    button.y = 500;

     button.scale.set(0.4, 0.2);


    button.interactive = true;
    button.buttonMode = true;

    button
        .on('pointerdown', onButtonDown)
        .on('pointerup', onButtonUp)
        .on('pointerupoutside', onButtonUp)
        .on('pointerover', onButtonOver)
        .on('pointerout', onButtonOut);


    app.stage.addChild(button);




 const button2 = new PIXI.Sprite(textureButton);

    button2.anchor.set(0.5);
    button2.x = 170;
    button2.y = 500;

     button2.scale.set(0.4, 0.2);

   
    button2.interactive = true;
    button2.buttonMode = true;

    button2
        .on('pointerdown', onButtonDown2)
        .on('pointerup', onButtonUp)
        .on('pointerupoutside', onButtonUp)
        .on('pointerover', onButtonOver)
        .on('pointerout', onButtonOut);

 
    app.stage.addChild(button2);







const text1 = new PIXI.Text('+');
text1.x = 53;
text1.y = 485;


app.stage.addChild(text1);


const text2 = new PIXI.Text('-');
text2.x = 167;
text2.y = 483;


app.stage.addChild(text2);



const text3 = new PIXI.Text('x1.0');
text3.x = 227;
text3.y = 483;


app.stage.addChild(text3);





var scaleRx = 1;

var scaleRy = 1;



function onButtonDown2() {
    this.isdown = true;
    
    this.alpha = 0.7;

    scaleRx -= 1;
    scaleRy -= 1;

    if( scaleRx < 1 ) {
        scaleRx = 1;
        scaleRy = 1;
    }


text3.text = "x"+ scaleRx + ".0";


c_rectangle.scale.set(scaleRx, scaleRy);

}



function onButtonDown() {
    this.isdown = true;
    
    this.alpha = 0.7;

    scaleRx += 1;
    scaleRy += 1;

    text3.text = "x"+ scaleRx + ".0";

c_rectangle.scale.set(scaleRx, scaleRy);

}

function onButtonUp() {
    this.isdown = false; this.alpha = 1;
    if (this.isOver) {
       
    } else {
       
    }
}

function onButtonOver() {
    this.isOver = true;
    if (this.isdown) {
        return;
    }
      this.alpha = 1;
}

function onButtonOut() {
    this.isOver = false;
    if (this.isdown) {
        return;
    }
     this.alpha = 1;
}











