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
  /* c_rectangle
        .on('pointerdown', onDragStart)
        .on('pointerup', onDragEnd)
        .on('pointerupoutside', onDragEnd)
        .on('pointermove', onDragMove);*/



        window.addEventListener("pointerdown", handleStart, false);
        window.addEventListener("pointerup", handleEnd, false);

        window.addEventListener("pointerupoutside", handleEnd, false);
        window.addEventListener("pointermove", handleMove, false);


        var scale_s = 0;

        function handleStart(evt) {
         
            ongoingTouches.push(copyTouch(evt));



            if( ongoingTouches.length == 2 ) {

                scale_s = Math.sqrt( Math.pow( Math.abs( ongoingTouches[0].pageX - ongoingTouches[1].pageX ), 2) 
                 + Math.pow( Math.abs( ongoingTouches[0].pageY - ongoingTouches[1].pageY ), 2 ) );
            }



         
          }



          var ongoingTouches = new Array();

          function copyTouch(touch) {
              return { identifier: touch.pointerId, pageX: touch.clientX, pageY: touch.clientY };
            }
          
            function ongoingTouchIndexById(idToFind) {
              for (var i = 0; i < ongoingTouches.length; i++) {
                var id = ongoingTouches[i].identifier;
            
                if (id == idToFind) {
                  return i;
                }
              }
              return -1;    // not found
            }


            var scale_e = 0;

        function handleMove(evt) {
         
            var idx = ongoingTouchIndexById(evt.pointerId);
          
          
           // console.log("event touches: " +   ongoingTouches[ongoingTouchIndexById(evt.pointerId)].pageX  + " id:" + evt.pointerId + " ongoingTouches.length:" + ongoingTouches.length );


           console.log("event touches 0: " +   ongoingTouches[0].pageX );


            if( ongoingTouches.length == 2 ) {

                console.log("event touches 1: " +   ongoingTouches[1].pageX );


                var scale_f = Math.sqrt( Math.pow( Math.abs( ongoingTouches[0].pageX - ongoingTouches[1].pageX ), 2) 
                + Math.pow( Math.abs( ongoingTouches[0].pageY - ongoingTouches[1].pageY ), 2 ) );


                scale_e = scale_f - scale_s;


  scaleRx = (scale_a + (scale_e * 0.01)) < 1 ? 1 : (scale_a + (scale_e * 0.01));
                scaleRy = (scale_a + (scale_e * 0.01)) < 1 ? 1 : (scale_a + (scale_e * 0.01));
            
                text3.text = "x"+ scaleRx.toFixed(1);
            
            c_rectangle.scale.set(scaleRx, scaleRy);

            }



        //  console.log("event touches 1: " +   evt.touches[0].pageX );

  // console.log("event touches: " +   ongoingTouches[ongoingTouchIndexById(evt.pointerId)].pageX );



            textl.text = " log:     r0 " +  ongoingTouches[0].pageX    + 
              "  r1:  " + (ongoingTouches.length == 2 ?  ongoingTouches[1].pageX : 0) +
               "  scale_s: " + scale_s + "   scale_e: " + scale_e;
           

            if (idx >= 0) {
            
             
             
              ongoingTouches.splice(idx, 1, copyTouch(evt));  // swap in the new touch record
             
            } else {
             
            }
          }



        function handleEnd(evt) {
           
            scale_s = 0;
		
 		scale_a = scaleRx;

            var idx = ongoingTouchIndexById(evt.pointerId);
          
            if (idx >= 0) {
             
              ongoingTouches.splice(idx, 1);  // remove it; we're done
            } else {
            
            }
          }









    app.stage.addChild(c_rectangle);

var cx = 0;
var cy = 0;



function onPanStart(e) {

    var bx = e.deltaX;

    var by = e.deltaY;


console.log("bx: " + bx + "  by: " + by );
}




var f1x = 0; var f1y = 0;


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
	
// log("pointerDown", event);

     
ongoingTouches.push(copyTouch(event));

      console.log("event start x: " +  this.data.getLocalPosition(this.parent).x );

      if (evCache.length == 1) {

        f1x = this.data.getLocalPosition(this.parent).x;
        f1y = this.data.getLocalPosition(this.parent).y;
      }



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


    f1x = 0;   f1y = 0;


 remove_event(ev);
  


 scale_a = scaleRx;


  
  if (evCache.length < 2) {
    prevDiff = -1;
  }



}




function remove_event(ev) {
    // Remove this event from the target's cache
    for (var i = 0; i < evCache.length; i++) {
      if (evCache[i].pointerId == ev.pointerId) {
        evCache.splice(i, 1);
        break;
      }
    }
   }





var dx = 0;
var dy = 0;

var dx_s = 0;

var dc_x = 0;

var r_x = 0;



var evCache = new Array();
var prevDiff = -1;




const textl = new PIXI.Text('log');
textl.x = 67;
textl.y = 183;

textl.scale.set(0.4, 0.4);


app.stage.addChild(textl);

var scale_c = 0;

var scale_a = 1;


var curDiff = 0;



function onDragMove(ev) {

 
//  console.log("event touches: " +   ev.targetTouches[0].pageX );

  // console.log("event touches: " +   ongoingTouches[ongoingTouchIndexById(ev.pointerId)].pageX );

 

for (var i = 0; i < evCache.length; i++) {
   if (ev.pointerId == evCache[i].pointerId) {
      evCache[i] = ev;
   break;
   }
 }





if (evCache.length == 2) {

    
   
  /// curDiff = Math.abs( f1 - evCache[1].data.getLocalPosition(this.parent).x );


 // curDiff = Math.sqrt(Math.pow(Math.abs( f1x - evCache[1].data.getLocalPosition(this.parent).x ), 2) +
 // Math.pow(Math.abs( f1y - evCache[1].data.getLocalPosition(this.parent).y ), 2) );

  



   console.log(" evCache 2 run   curDiff: " + curDiff +
    "   prevDiff: " + prevDiff + " clientX: " + evCache[0].data.getLocalPosition(this.parent).x
    + " clientX2: " + evCache[1].data.getLocalPosition(this.parent).x
    );



    textl.text = " evCache 2 run   curDiff: " + curDiff +
    "  \n prevDiff: " + prevDiff + " clientX: " + evCache[0].data.getLocalPosition(this.parent).x
    + " clientX2: " + evCache[1].data.getLocalPosition(this.parent).x +  "  f1: " + f1 +
    
    " \n  pointer-id:   " + evCache[0].pointerId +  " pointer-id2: " + evCache[1].pointerId +
     " \n pointeridc: " + ev.pointerId + "  cache length: " + evCache.length;
   
    
    // scale_c = (dx * 0.1);

        scale_c = dx < 0 ? -Math.sqrt( Math.pow(Math.abs(dx), 2) + Math.pow(Math.abs(dy), 2) ) 
        : Math.sqrt( Math.pow(Math.abs(dx), 2) + Math.pow(Math.abs(dy), 2) );


     scaleRx = (scale_a + (scale_c * 0.01)) < 1 ? 1 : (scale_a + (scale_c * 0.01));
     scaleRy = (scale_a + (scale_c * 0.01)) < 1 ? 1 : (scale_a + (scale_c * 0.01));
 
     text3.text = "x"+ scaleRx.toFixed(1);
 
 c_rectangle.scale.set(scaleRx, scaleRy);


/*
   if (prevDiff > 0) {
     if (curDiff > prevDiff) {
       
    scaleRx += scale_c;
        scaleRy += scale_c;
    
        text3.text = "x"+ scaleRx.toFixed(1);
    
    c_rectangle.scale.set(scaleRx, scaleRy);
       
     }
     if (curDiff < prevDiff) {
       scaleRx -= scale_c;
        scaleRy -= scale_c;
    
        if( scaleRx < 1 ) {
            scaleRx = 1;
            scaleRy = 1;
        }
    
        text3.text = "x"+ scaleRx.toFixed(1);
    
        c_rectangle.scale.set(scaleRx, scaleRy);

     }
   }

   prevDiff = curDiff;
   */





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
 //event.preventDefault();
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











