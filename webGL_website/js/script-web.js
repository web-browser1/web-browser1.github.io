const app = new PIXI.Application({ width: window.innerWidth, height: window.innerHeight, backgroundColor: 0xDDDDDD });
document.body.appendChild(app.view);




window.onload = window.onresize = function () {
    app.view.width = window.innerWidth;

    app.view.height = window.innerHeight;
    

};


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


       
evCache.push(event);
 log("pointerDown", event);

      //  console.log("event touches: " +   event.targetTouches[0].pageY );



}

function onDragEnd(ev) {
    this.alpha = 1;
    this.dragging = false;

  // rx = this.data.getLocalPosition(this.parent).x;
 //  ry = this.data.getLocalPosition(this.parent).y;

    // set the interaction data to null
    this.data = null;


    rx = c_rectangle.x;
    ry = c_rectangle.y;


   console.log("rx: " + rx + "  ry: " + ry);



   dx_s = dc_x;


   r_x = c_rectangle.x ;





// remove_event(ev);
  

  
  if (evCache.length < 2) {
    prevDiff = -1;
  }



}

var dx = 0;
var dy = 0;

var dx_s = 0;

var dc_x = 0;

var r_x = 0;



var evCache = new Array();
var prevDiff = -1;



function onDragMove(ev) {

 

 

for (var i = 0; i < evCache.length; i++) {
   if (ev.pointerId == evCache[i].pointerId) {
      evCache[i] = ev;
   break;
   }
 }


if (evCache.length == 2) {
   
   var curDiff = Math.abs(evCache[0].clientX - evCache[1].clientX);

   if (prevDiff > 0) {
     if (curDiff > prevDiff) {
       
    scaleRx += scale_r;
        scaleRy += scale_r;
    
        text3.text = "x"+ scaleRx.toFixed(1);
    
    c_rectangle.scale.set(scaleRx, scaleRy);
       
     }
     if (curDiff < prevDiff) {
       scaleRx -= scale_r;
        scaleRy -= scale_r;
    
        if( scaleRx < 1 ) {
            scaleRx = 1;
            scaleRy = 1;
        }
    
        text3.text = "x"+ scaleRx.toFixed(1);
    
        c_rectangle.scale.set(scaleRx, scaleRy);

     }
   }

   
   prevDiff = curDiff;
 }








    if (this.dragging) {
        const newPosition = this.data.getLocalPosition(this.parent);

    


        var b_x = ((scaleRx * start_p) - start_p)/2;

      //  var gx = Math.abs(cx - rx)


        dx = newPosition.x - (cx );
        dy = newPosition.y - (cy );



        var cx1 = Math.abs((rx + dx) - start_p);

        if( cx1 < b_x ) {

           // dc_x = dx;

         //  dx = 0;
       
        }


       
       



        c_rectangle.x = rx + dx;
        c_rectangle.y = ry + dy;
        
        

      //  this.x = dx;
      //  this.y = dy;


      //  this.x = newPosition.x;
    //   this.y = newPosition.y;


	  console.log("x: " + newPosition.x + "  y: " + newPosition.y  + "  dx: " + dx   + "  dy: " + dy
       + "  rx: " + rx  + "   ry: " + ry + "  cx1: " + cx1 );

    }
}








/*
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

*/




/*
const text1 = new PIXI.Text('+');
text1.x = 53;
text1.y = 485;


app.stage.addChild(text1);


const text2 = new PIXI.Text('-');
text2.x = 167;
text2.y = 483;


app.stage.addChild(text2);*/



const text3 = new PIXI.Text('x1.0');
text3.x = 67;
text3.y = 483;


app.stage.addChild(text3);






var scale_r = 0.2;




window.addEventListener("gestureend", function(e) {

    console.log(" e scale: " + e.scale );

    if( e.scale < 1.0 ) {


    } else if ( e.scale > 1.0 ) {


    }



});





var scroll_c = 0;

window.addEventListener("wheel", event => {
 event.preventDefault();
    const value = event.deltaY;

    if( value > 0 ) {
        scroll_c += 1;

        scaleRx -= scale_r;
        scaleRy -= scale_r;
    
        if( scaleRx < 1 ) {
            scaleRx = 1;
            scaleRy = 1;
        }
    
        text3.text = "x"+ scaleRx.toFixed(1);
    
        c_rectangle.scale.set(scaleRx, scaleRy);


    } else if( value < 0 ) {
        scroll_c -= 1;


        scaleRx += scale_r;
        scaleRy += scale_r;
    
        text3.text = "x"+ scaleRx.toFixed(1);
    
    c_rectangle.scale.set(scaleRx, scaleRy);

    }




if( value < 50 ) {

scaleRx += scale_r;
        scaleRy += scale_r;
    
        text3.text = "x"+ scaleRx.toFixed(1);
    
    c_rectangle.scale.set(scaleRx, scaleRy);

}





    console.log("value:" + value + " scroll c: " + scroll_c);


   





});









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











