






(function() {

    window.requestAFrame = (function() {

        return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function(callback) {
                    window.setTimeout(callback, 1000 / 60); //60 frames per second
                };

    })();

})();




var WIDTH = 800, HEIGHT = 500;

var canvas;
var ctx;

var keystate;
var ontouch_1 = 0;

window.onload = window.onresize = function () {
    WIDTH = window.innerWidth;

    HEIGHT = window.innerHeight;
    

};


var fscreen = 0; 

  

 var elementd = document.documentElement; 

  

 function fullScreen() { 

      

     if(fscreen == 0) 

        { 

          //  elementd.requestFullscreen(); 

             canvas.requestFullscreen(); 

            fscreen = 1; 

             

             

            } else if(fscreen == 1) { 

                document.exitFullscreen(); 

                 

                fscreen = 0; 

                } 

      

      

     }





function getObjectFitSize(

  contains /* true = contain, false = cover */,

  containerWidth,

  containerHeight,

  width,

  height

) {

  var doRatio = width / height;

  var cRatio = containerWidth / containerHeight;

  var targetWidth = 0;

  var targetHeight = 0;

  var test = contains ? doRatio > cRatio : doRatio < cRatio;

  if (test) {

    targetWidth = containerWidth;

    targetHeight = targetWidth / doRatio;

  } else {

    targetHeight = containerHeight;

    targetWidth = targetHeight * doRatio;

  }

  return {

    width: targetWidth,

    height: targetHeight,

    x: (containerWidth - targetWidth) / 2,

    y: (containerHeight - targetHeight) / 2

  };

}






function main() {

    WIDTH = window.innerWidth;

    HEIGHT = window.innerHeight;

    canvas = document.getElementById('canvas');
    
    const originalHeight = canvas.height;

const originalWidth = canvas.width;
  

    const dimensions = getObjectFitSize(

    true,

    canvas.clientWidth,

    canvas.clientHeight,

    canvas.width,

    canvas.height

  );

  const dpr = window.devicePixelRatio || 1;

  canvas.width = dimensions.width * dpr;

  canvas.height = dimensions.height * dpr;
    
    
    
    
    
  //  canvas.width = WIDTH;
  //  canvas.height = HEIGHT;

    ctx = canvas.getContext("2d");

    

let ratio = Math.min(

    canvas.clientWidth / originalWidth,

    canvas.clientHeight / originalHeight

  );

 // ctx.scale(ratio, ratio); //adjust this!

ctx.scale(ratio * dpr * 0.5F, ratio * dpr 0.5F); //adjust this!


    canvas.addEventListener('touchstart', function(e) {

      
  
          var trhd = WIDTH / 2;
          var pX = e.touches[0].pageX;
  
       
  
  
          if( pX < trhd ) {
              ontouch_1 = 1; //console.log("t1");
          }
          else if( pX > trhd ) {
              ontouch_1 =2; //console.log("t2");
          } 
  
  
        
  
  
  
      } );
  
  
      canvas.addEventListener('touchend', function(e) {
  
          ontouch_1 = 0;
      });
















    keystate = {};

    document.addEventListener("keydown", function(evt) {
        keystate[evt.keyCode] = true;
    });

    document.addEventListener("keyup", function(evt) {
        keystate[evt.keyCode] = false;
    });

    init();


    game_loop();



}
var ontouch_1 = 0;
var c_1 = 0;
var game_state = 1;

var uparrow = 38, downarrow = 40, leftarrow = 37, rightarrow = 39, spacebar = 32;

var gravity = 0.3;

var cameraC = 0;

var startXC = 0;
var cameraXC = 0;

var y_0 = HEIGHT + 150;

var player;


var enemy = [];


var bricks = [];

var brickCount = 1230;

var scale = 0.6;

var mounts = [];
var mountsCount = 30;

var stars = [];
var starsCount = 70;


var startbtn, pausebtn, nextbtn, retrybtn, levels, title, text, menubtn, leveltext;


function init() {


    startbtn = document.getElementById("start");
    pausebtn = document.getElementById("pause");
    nextbtn = document.getElementById("next");
    retrybtn = document.getElementById("retry");

    levels = document.getElementById("levels");


    title = document.getElementById("title");
    text = document.getElementById("text");
    menubtn = document.getElementById("menu");
    leveltext = document.getElementById("leveltext");

    
    text.style.visibility = "hidden";
    nextbtn.style.visibility = "hidden";
    retrybtn.style.visibility = "hidden";
    levels.style.visibility = "hidden";
    pausebtn.style.visibility = "hidden";
    menubtn.style.visibility = "hidden";

    leveltext.style.visibility = "hidden";

    startbtn.style.visibility = "visible";

   


    var rx = 300;
    var ry = 150;


    for (var i = 0; i < starsCount; i++) {

      var r = 400 - Math.random(1)*450;

      var r1 = 200 - (Math.random(1)*330);

      var r3 =  Math.random(1)*2;

      stars.push({
            id: i,
            x: rx,
            y: ry,
            width: 1+r3,
            height: 1+r3,
            radius: 1,
            hsl_l: r

        });

        rx = 200 + r;
        ry = 0 + r1;
    }



    var mx = 0;
    var my = ((HEIGHT/2) + 200);


    for (var i = 0; i < mountsCount; i++) {

      var r = Math.random(1)*10;

        mounts.push({
            id: i,
            x: mx+(r*10),
            y: my,
            width: 40*r*0.2*scale,
            height: 20*r*0.2*scale,
            hsl_l: r

        });

        mx += 300 + 30;

        if( i == 10  ) {
            my = ((HEIGHT/2) + 200) + 30;
            mx = 0;
        }
        if( i == 20  ) {
            my = ((HEIGHT/2) + 200) + 50;
            mx = 0;
        }
        if( i == 23 || i == 16 || i == 4  ) {
            my = ((HEIGHT/2) + 200) + 60;
            mx = 0;
        }
    }





    player = {
        x: null,
        y: null,
        width: 35*scale,
        height: 50*scale,
        speed: 0.3*scale,
        velX: 0,
        velY: 0,
        jumping: false,
        grounded: false
    };


    player.x = 100*scale;
    player.y = 250*scale;


    player.grounded = true;













    b_y = (HEIGHT/2) + 70;

    var bx = 0;
    var by = (HEIGHT/2) + 30;

var s = 0;


    levelBuild(0);


    for (var i = 0; i < brickCount; i++) {


       // brickBuild(bx, diffc);

       /* var r = Math.random(1)*70;

            //s++;

            if( s == 5) {

                s = 0;
            }

            if( r < 7 ) { r = 7; }
        

            bricks.push({
                id: i,
                x: bx,
                y: by+r*2,
                width: 300*scale,
                height: 550*scale,
                velX: 0,
                velY: 0,
                moveY: 40+r*2,
                state: s,
                radius: 14
            });

            bx += 300*scale;*/

    }



}







function levelBuild(level) {


    leveltext.innerHTML = "Level " + level;

    lvl = level;

    paused = 1;


    startXC = 0;

    player.x = 120;
    player.y = 100;

    cameraXC = 0;
    cameraC = 0;

    game_state = 1;

    b_i = 0;b_x = 0; e_c = 0;   b_y = (HEIGHT/2) + 70;
    bricks = [];
    enemy = [];

    enemy.length = 0;
    bricks.length = 0;

    var state = 0;

    if(level == 0 ) {
        brickBuild(0, state);
        brickBuild(0, state);
        brickBuild(0, state);

    }

    if(level == 1) {


        world(1);
        world(6);
        world(3);
        world(1);
        world(2);
        world(1);

    }

    if(level == 2) {
        world(3);
        world(2);
        world(3);
        world(5);
        world(5);
        world(1);
    }

    if(level == 3) {
        world(1);
        world(4);
        world(4);
        world(3);
        world(5);
        world(2);
    }

    if(level == 4) {
        world(1);
        world(3);
        world(3);
        world(3);
        world(5);
        world(2);
    }

    if(level == 5) {
        world(1);
        world(8);
        world(8);
        world(7);
        world(5);
        world(2);
    }

    if(level == 6) {
        world(1);
        world(3);
        world(6);
        world(7);
        world(7);
        world(5);
        world(2);
    }


    if(level == 7) {
        world(1);
        world(3);
        world(3);
        world(3);
        world(3);
        world(3);
    }


    if(level == 8) {
        world(1);
        world(2);
        world(2);
        world(2);
        world(3);
        world(3);
    }

    if(level == 9) {
        world(1);
        world(1);
        world(4);
        world(7);
        world(4);
        world(7);
        world(2);
    }

    if(level == 10) {
        world(1);
        world(3);
        world(4);
        world(4);
        world(7);
        world(2);
        world(2);
        world(2);
    }


    brickBuild(0, state + 10);


    brickCount = b_i;

}




function world(world) {
    var state = 0;

    if(world == 1) {
        brickBuild(0, state);
        brickBuild(0, state);
        brickBuild(0, state + 1);
        brickBuild(0, state);
        brickBuild(0, state + 4);
        brickBuild(0, state);
        brickBuild(0, state + 2);
        brickBuild(0, state);
    
        brickBuild(0, state);
        brickBuild(0, state + 3);
    
        brickBuild(0, state);
        brickBuild(0, state);
    }

    if(world == 2) {
        brickBuild(0, state);
        brickBuild(0, state + 1);
        brickBuild(0, state);
        brickBuild(0, state);
        brickBuild(0, state + 1);
        brickBuild(0, state);
        brickBuild(0, state);
        brickBuild(0, state + 1);
        brickBuild(0, state);

    }
    if(world == 3) {
        brickBuild(0, state);
        brickBuild(0, state + 2);
        brickBuild(0, state + 2);
        brickBuild(0, state + 2);
        brickBuild(0, state);
    }
    if(world == 4) {
        brickBuild(0, state + 1);
        brickBuild(0, state + 2);
        brickBuild(0, state);
        brickBuild(0, state + 2);
        brickBuild(0, state + 1);
    }
    if(world == 5) {
        brickBuild(0, state);
        brickBuild(0, state + 4);
        brickBuild(0, state);
        brickBuild(0, state + 4);

    }

    if(world == 6) {
        brickBuild(0, state + 1);
        brickBuild(0, state + 4);
        brickBuild(0, state);
        brickBuild(0, state + 4);

    }

    if(world == 7) {
        brickBuild(0, state);
        brickBuild(0, state + 5);
        brickBuild(0, state);
        brickBuild(0, state + 5);

    }

    if(world == 8) {

        brickBuild(0, state + 1);
        brickBuild(0, state);
        brickBuild(0, state);
        brickBuild(0, state + 6);

    }

    if(world == 9) {
        brickBuild(0, state);
        brickBuild(0, state + 3);
        brickBuild(0, state + 3);
        brickBuild(0, state + 3);
        brickBuild(0, state);
    }




}



var lvl = 1;

var e_c = 0;

var b_x = 0;

var b_y = 0;

var b_i = 0;

function brickBuild(x, state) {




  

    var diffc = (1/10)*(Math.pow(lvl, 2)) + 0;


    if(state == 1) {

        b_x += (45*scale*diffc);
    }



   

    var w = 300*scale;

    
    if(state == 2) {

        b_x += (45*scale*diffc);

        w = (300*scale)-(20*scale*diffc);
    }
   

    var bCount = 1;

    if(state == 4 || state == 5) {
        bCount = 3;
    }


    var bstate = 0;

    if(state == 10) {
        bstate = 10;
    }


    for (var i = 0; i < bCount; i++) {

        bricks.push({
            id: b_i,

            x: b_x,
            y: b_y,

            width: w,
            height: 50*scale,

            velX: 0,
            velY: 0,

            moveY: 40,
            state: bstate,
            radius: 14*scale
        });


        if(state == 4) {

            if(i < bCount -1)
            {
                b_y -= ((16)*scale*diffc);
                b_x += w/5;
            }
        }

        if(state == 5) {

            if(i < bCount -1)
            {
                b_y += ((16)*scale*diffc);
                b_x += w/5;
            }
        }


        if(state == 6) {

            b_y += ((32)*scale*diffc);
        }



        b_i++;
    }

 

    if(state == 3) {

        enemy.push({
            id: b_i,
    
            x: b_x,
            y: b_y-(40*scale),
    
            width: 40*scale,
            height: 40*scale,

            brickWidth: w,
            brickX: b_x, 

            speed: ((1/3)*scale*diffc),
            velX: 0,
            velY: 0,

            state: 1,
        });


        e_c++;
    }






    b_x += w;


    if(state == 2) {

        b_x += (45*scale*diffc);
    }


 




}












/*
   0   menu

   1 levels

   2 game

   3 game over/next/pause

*/


function start() {
    startbtn.style.visibility = "hidden";

    levels.style.visibility = "visible";

    title.style.visibility = "hidden";

 
}





function next() {
    levelBuild(lvl + 1);

    nextbtn.style.visibility = "hidden";
    menubtn.style.visibility = "hidden";
    nextbtn.style.visibility = "hidden";
    text.style.visibility = "hidden";
}


function gameOver() {
    text.style.visibility = "visible";

    text.innerHTML = "Game Over";

    retrybtn.style.visibility = "visible";
    menubtn.style.visibility = "visible";
    leveltext.style.visibility = "visible";
}


function finishLevel() {
    text.style.visibility = "visible";
    text.innerHTML = "Finish";

    nextbtn.style.visibility = "visible";
    leveltext.style.visibility = "visible";
    menubtn.style.visibility = "visible";
}


function retry() {
    pausebtn.style.visibility = "visible";
    text.style.visibility = "hidden";

    retrybtn.style.visibility = "hidden";
    menubtn.style.visibility = "hidden";
    nextbtn.style.visibility = "hidden";
    leveltext.style.visibility = "hidden";
    paused = 1;


    startXC = 0;

    player.x = 120;
    player.y = 120;

    cameraXC = 0;
    cameraC = 0;

    game_state = 1;

}

var paused = 1;

function pause() {

    if(paused == 1) {
        retrybtn.style.visibility = "visible";
        menubtn.style.visibility = "visible";
        leveltext.style.visibility = "visible";
        paused = 2;
    } else if( paused == 2 ) {
        retrybtn.style.visibility = "hidden";
        menubtn.style.visibility = "hidden";
        leveltext.style.visibility = "hidden";
        paused = 1;
    }

   
}


function menu() {
    pausebtn.style.visibility = "hidden";
    levels.style.visibility = "visible";

    retrybtn.style.visibility = "hidden";
    menubtn.style.visibility = "hidden";
    nextbtn.style.visibility = "hidden";
    text.style.visibility = "hidden";
    leveltext.style.visibility = "hidden";

    levelBuild(0);
}


function levelStart(level) {
    paused = 1;

    pausebtn.style.visibility = "visible";

    levels.style.visibility = "hidden";
    nextbtn.style.visibility = "hidden";
    levelBuild(level);
}


var scale_m = 1.0;


var scale_t = scale_m;

var scale_r = scale_m;



var hsl_h = 34;
var hsl_s = 130;
var hsl_l = 21;

var sunY = 150;
var sunX = 250;





function game_loop() {

    ctx.save();
    var grd = ctx.createLinearGradient(0, 0, 0, HEIGHT);
    grd.addColorStop(0, '#000');
    grd.addColorStop(1, '#000');
   
    ctx.fillStyle = grd;

    ctx.fillRect(0, 0, WIDTH, HEIGHT);


    if( player.grounded == false && game_state == 1 ) {

        // startXC = ((((camera_1+40) - cameraXC) * 0.05) + cameraXC);
        if( scale_t - scale_r < 0 ) {
            scale_r -= 0.6 * 0.001;
            ctx.scale( (( scale_t - scale_r) * 0.01 + scale_r), ((scale_t - scale_r) * 0.01 + scale_r ));
        
        } else {
            ctx.scale((scale_t), (scale_t));
        }
    }
        
        
    if( player.grounded == true && game_state == 1 ) {


  


        if( (scale_t+0.02) - scale_r > 0 ) {
            scale_r += 0.3 * 0.001;

            ctx.scale( ((  (scale_t+0.02) - scale_r) * 0.01 + scale_r), (((scale_t+0.02) - scale_r) * 0.01 + scale_r ));

        } else {
            ctx.scale((scale_t+0.02), (scale_t+0.02));

            /*var scale_h = 1.0 + (player.y / HEIGHT) * 0.5;

            scale_r += scale_h;
            scale_t += scale_h;*/
        }

    }






  






    for( var m = 0; m<mountsCount; m++ ) {

        ctx.beginPath();
        ctx.moveTo(mounts[m].x-(startXC*0.2), mounts[m].y);
        ctx.lineTo(mounts[m].x-(startXC*0.2)+(mounts[m].width/2), mounts[m].y-mounts[m].height);
        ctx.lineTo(mounts[m].x-(startXC*0.2)+mounts[m].width, mounts[m].y);
        ctx.lineTo(mounts[m].x+-(startXC*0.2), mounts[m].y);
        ctx.fillStyle = 'hsl('+hsl_h+'deg '+45+'% '+(hsl_l+mounts[m].hsl_l+25)+'%)';
        ctx.fill();

     }





  /*  var grd2 = ctx.createRadialGradient(sunX, sunY, 30, sunX, sunY, 450);
    grd2.addColorStop(0, 'hsl('+(hsl_h)+'deg '+100+'% '+50+'% / 100%)');
    grd2.addColorStop(1, 'hsl('+(hsl_h)+'deg '+100+'% '+50+'% / 0%)');
 
   
    ctx.beginPath();
    ctx.arc(sunX, sunY, 450, 0, 2 * Math.PI);
  
    ctx.fillStyle = grd2;
    ctx.fill();
*/



    var grd1 = ctx.createRadialGradient(sunX, sunY, 30, sunX, sunY, 32);
    grd1.addColorStop(0, '#FFFFFFFF');
    grd1.addColorStop(1, '#FFFFFF00');
 
    ctx.beginPath();
    ctx.arc(sunX, sunY, 250, 0, 2 * Math.PI);

   // ctx.fillStyle = grd1;
    ctx.fillStyle = '#FFF';
    ctx.fill();





    ctx.fillStyle = '#FFF';
    for( var r = 0; r<starsCount; r++ ) {
        ctx.fillRect(stars[r].x, stars[r].y, stars[r].width, stars[r].height);
    }






    ctx.fillStyle = 'hsl('+hsl_h+'deg '+hsl_s+'% '+(hsl_l+15)+'%)';
    for( var r = 0; r<e_c; r++ ) {

        
        ctx.fillStyle = 'hsl('+hsl_h+'deg '+hsl_s+'% '+(hsl_l+15)+'%)';
        ctx.fillRect(enemy[r].x-startXC, enemy[r].y, enemy[r].width, enemy[r].height);


        ctx.beginPath();
        ctx.moveTo(enemy[r].x-startXC+23*scale, enemy[r].y+10*scale);
        ctx.lineTo(enemy[r].x-startXC+28*scale, enemy[r].y+15*scale);
        ctx.lineTo(enemy[r].x-startXC+23*scale, enemy[r].y+20*scale);
        ctx.lineTo(enemy[r].x-startXC+18*scale, enemy[r].y+15*scale);
    
        ctx.fillStyle = '#FFF';
        ctx.fill();
    


        if(enemy[r].state == 1 ) {

            if(enemy[r].x + enemy[r].width < enemy[r].brickX + enemy[r].brickWidth ) {

                enemy[r].x += enemy[r].speed;
            } else if( enemy[r].x + enemy[r].width >= enemy[r].brickX + enemy[r].brickWidth) {

                enemy[r].state = 2;
            }
        }
        if(enemy[r].state == 2 ) {

            if(enemy[r].x  > enemy[r].brickX ) {

                enemy[r].x -= enemy[r].speed;
            } else if( enemy[r].x <= enemy[r].brickX ) {

                enemy[r].state = 1;
            }
        }


        if( player.x + player.width >  enemy[r].x-(startXC) && 
        player.x < enemy[r].x-(startXC) + enemy[r].width &&   
        player.y + player.height >  enemy[r].y && 
        player.y < enemy[r].y + enemy[r].height   
        
        ) {

           // enemy[r].state = 3;

            gameOver();

        }



    }




       
    if( game_state != 2 ) {
        player.velY += gravity;
     }




    ctx.fillStyle = 'hsl('+hsl_h+'deg '+hsl_s+'% '+(hsl_l+15)+'%)';


    ctx.fillRect(player.x, player.y, player.width, player.height);

    ctx.fillRect(player.x+player.width, player.y, player.width, player.height/6);

    ctx.fillRect(player.x+player.width, player.y+player.height/3, player.width/1, player.height/6);


    ctx.beginPath();
    ctx.moveTo(player.x+23*scale, player.y+10*scale);
    ctx.lineTo(player.x+28*scale, player.y+15*scale);
    ctx.lineTo(player.x+23*scale, player.y+20*scale);
    ctx.lineTo(player.x+18*scale, player.y+15*scale);

    ctx.fillStyle = '#FFF';
    ctx.fill();



    for( var b = 0; b<brickCount; b++ ) {

        /* if( player.x >= (WIDTH/2) ) {
          bricks[b].x -= 1;
         }*/
  
          ctx.fillStyle = 'hsl('+(hsl_h+180)+'deg '+(hsl_s)+'% '+(hsl_l - 0)+'%)';
  
          var b_velY = 0;
  
          b_velY = bricks[b].velY;
  
          
  
         if( bricks[b].state == 1 && bricks[b].velY < bricks[b].moveY ) {
  
              bricks[b].velY += 1;
  
         } else if(  bricks[b].state == 1 && bricks[b].velY >= bricks[b].moveY ) {
  
              bricks[b].state = 2;
         }
  
         
         if( bricks[b].state == 2 && bricks[b].velY > 0 ) {
  
          bricks[b].velY -= 1;
  
     } else if(  bricks[b].state == 2 && bricks[b].velY <= 0 ) {
  
          bricks[b].state = 1;
     }
  
  
  
         var by_1 = bricks[b].y + bricks[b].velY;
  
         var by_2 = bricks[b].y + bricks[b].velY + bricks[b].height;
  
  
  
  
          //ctx.fillRect(bricks[b].x-startXC, bricks[b].y, bricks[b].width, bricks[b].height);
          ctx.beginPath();
          ctx.moveTo(bricks[b].x-startXC, by_1);
          ctx.lineTo(bricks[b].x+bricks[b].width-startXC-bricks[b].radius, by_1);
          ctx.arcTo(bricks[b].x+bricks[b].width-startXC, by_1, bricks[b].x+bricks[b].width-startXC, by_1+bricks[b].radius, bricks[b].radius);
          ctx.lineTo(bricks[b].x+bricks[b].width-startXC, by_2-bricks[b].radius);
          ctx.arcTo(bricks[b].x+bricks[b].width-startXC, by_2, bricks[b].x+bricks[b].width-bricks[b].radius-startXC, by_2, bricks[b].radius);
          ctx.lineTo(bricks[b].x+bricks[b].radius-startXC, by_2);
          ctx.arcTo(bricks[b].x-startXC, by_2, bricks[b].x-startXC, by_2-bricks[b].radius, bricks[b].radius);
          ctx.lineTo(bricks[b].x-startXC, by_1+bricks[b].radius);
          ctx.arcTo(bricks[b].x-startXC, by_1, bricks[b].x+bricks[b].radius-startXC, by_1, bricks[b].radius);
          
  
          ctx.fill();
          //ctx.arcTo(200+10, 200, 200+10, 200+10, 10);
  

        // finish 
        if(bricks[b].state == 10) {

            if(player.x > bricks[b].x-startXC ) {

                finishLevel();

                bricks[b].state = 11;


                player.velX = 0;
                player.velY = 0;
            }

        }




          if( (player.x + player.width+player.velX) > (bricks[b].x-startXC)
            && player.x + player.width> (bricks[b].x-startXC) - 30 && player.x < (bricks[b].x-startXC)  
            && player.y+player.height > by_1 && player.y < by_1 + bricks[b].height ) {

             //player.velX = 0;
             c_1 = 3;
             player.velX = (player.velX - ((player.x + player.velX + player.width)-(bricks[b].x-startXC)));
  
        }
     
          if(  ((player.y + player.velY + player.height) > by_1)  
              && (player.x + player.width + player.velX) > bricks[b].x-startXC  && player.x < (bricks[b].x-startXC+bricks[b].width) ) {
  
              player.velY = (player.velY - ((player.y + player.velY + player.height)-by_1));
  

                if( player.velY < 0) {
                    player.velY = 0;
                }

              player.grounded = true;
  

                  

  
             // ctx.scale(1.0, 1.0);
          } 
  
  
     
  
  
  
      }





      if( cameraC == 0 && player.x < (WIDTH/2)  ) {

        player.x += player.velX;
        
    } else if( cameraC == 0 && player.x >= (WIDTH/2)  ) {

        cameraC = 1;
    }

    if( cameraC == 1 ) {

        

            if(   c_1 == 1 ) {

                startXC += player.velX;
            }

            else if(   c_1 == 2 ) {

                if( startXC < camera_1+40 ) {

                    cameraXC += 3; 
                } else if( startXC >= camera_1+40 ) {
        
                    c_1 = 0;
                }
                startXC = ((((camera_1+40) - cameraXC) * 0.05) + cameraXC);
            }
      //  
    }



    if( cameraC == 1 && startXC <= 0 ) {
        cameraC = 0;
    }


    if( game_state == 1 && player.y > y_0 ) {

        // Game Over

        player.velY = 0;
        player.velX = 0;

        // game state  2 

        game_state = 4;


        gameOver();
    }

  


      if( game_state == 1 ) {


   


        if (keystate[leftarrow] ) {
    
            player.velX -= player.speed;  c_1 = 1;
    
        } else if (keystate[rightarrow] || ontouch_1 == 2) {
            // exponential 
    
            player.velX += player.speed;   c_1 = 1;
    
        } else {
            player.velX = 0; 
    
            if( c_1 == 1 ) {
                c_1 = 2;
    
                cameraXC = startXC;
        
                camera_1 = startXC;
    
            }
            
        }
    
        if( player.velX > 10*scale ) {
    
            player.velX = 10*scale;
        }
    
        if( player.velX < -10*scale ) {
    
            player.velX = -10*scale;
        }
    
        if (keystate[uparrow] || ontouch_1 == 1 ) {
          
            if (player.grounded) {
    
                player.grounded = false;
                
                player.velY = -4 * 2;
    
    
              
    
            }
    
        }
    
    
    
       
       
        if( player.velY > 10 ) {
            player.velY = 10;
        }
        if( player.velY < -10 ) {
            player.velY = -10;
        }
    
    
       }

    player.y += player.velY;


    ctx.restore();

    setTimeout(function() {

        requestAFrame(game_loop);
    }, 0);

}




window.addEventListener("load", function() {
    main();
});

















