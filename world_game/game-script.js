

(function() {

    window.requestAFrame = (function() {

        return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function(callback) {
                    window.setTimeout(callback, 1000 / 30); //60 frames per second
                };

    })();

})();


window.onload = window.onresize = function () {
  //  WIDTH = window.innerWidth;

   // HEIGHT = window.innerHeight;
    
   // canvas = document.getElementById('canvas');
   // canvas.width = WIDTH;
   // canvas.height = HEIGHT;

  //  init();

};


var rscreen = 2;


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

var WIDTH = 800, HEIGHT = 500;

var canvas;
var ctx;

var keystate;

var ontouch_1 = 0;




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


var m_sc = 0;

var title_sq;

function main() {
    setCookie("start1", 2300, 365);


    var ck = getCookie("start1");
   
    console.log("ck: " + ck);
    
    m_sc = 0.03 * (window.innerWidth/100);
    
    
    f_sc = 0.3; //* (window.innerWidth/100);
      


   // checkCookie();

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
    
    
    WIDTH = canvas.width;
    HEIGHT = canvas.height;
    
    
  //  canvas.width = WIDTH;
  //  canvas.height = HEIGHT;

    ctx = canvas.getContext("2d");

    

let ratio = Math.min(

    canvas.clientWidth / originalWidth,

    canvas.clientHeight / originalHeight

  );

 // ctx.scale(ratio, ratio); //adjust this!

ctx.scale(ratio * dpr * m_sc, ratio * dpr * m_sc); //adjust this!


    
    
    
    
    

    var loading = document.getElementById("loading");
    
    
     scale = 0.6 * (window.innerWidth / 1000);
    
    
    loading.style.visibility = "hidden";
    
    /*
 WIDTH = window.innerWidth * 0.7;
    HEIGHT = 400;
    if( window.innerWidth  > window.innerHeight ) {
       

         // window.innerHeight;
    } else {
     
        
        
    }
    
     if( window.innerWidth < 700 ||  window.innerHeight < 700 ) {
          if( window.innerWidth  > window.innerHeight ) {
               WIDTH = window.innerWidth * 0.9;
              
               HEIGHT = window.innerHeight * 0.9;
          } else {
               WIDTH = window.innerWidth * 0.9;
              
               HEIGHT = window.innerHeight * 0.4;
          }
         
         
     }
    
    
    
    if( rscreen > 1 ) {
        
        //  WIDTH = window.innerWidth;
        //  HEIGHT = window.innerHeight;
        
        
           WIDTH = window.screen.width;
          HEIGHT = window.screen.height;
        
    }
    
    
    
  

    canvas.width = WIDTH;
    canvas.height = HEIGHT;*/

    ctx = canvas.getContext("2d");

    
    tapToStart_btn = document.getElementById("btn1");


 
    tapToStart_btn.style.visibility = "visible";


    title_sq = document.getElementById("title");
    title_sq.style.left = (WIDTH/Math.pow(1.618, 1)) + 'px';

    title_sq.style.top = (WIDTH/Math.pow(1.618, 5)) + 'px';
    title_sq.style.fontSize = (WIDTH/Math.pow(1.618, 4)) + 'px';

    
   // document.getElementById('c1').style.backgroundColor = 'hsl('+hsl_h+'deg '+hsl_s+'% '+(hsl_l)+'%)';;

   // document.getElementById('c2').style.backgroundColor = 'hsl('+(hsl_h+120)+'deg '+hsl_s+'% '+(hsl_l)+'%)';;
  //  document.getElementById('c3').style.backgroundColor = 'hsl('+(hsl_h+240)+'deg '+hsl_s+'% '+(hsl_l)+'%)';;


    canvas.addEventListener('touchstart', function(e) {

      //  console.log("touch start  x: " + e.touches[0].pageX + "  y: " + e.touches[0].pageY);


        var trhd = WIDTH / 3;
        var pX = e.touches[0].pageX;

      //  console.log("touch start  px: " + pX + "  tthrdr: " + trhd);



        if( pX < trhd ) {
            ontouch_1 = 1; //console.log("t1");
        }
        else if( pX > trhd*2 ) {
            ontouch_1 = 3; //console.log("t2");
        } else {

            ontouch_1 = 2;
        }


        if( game_state == 0 || game_state == 2 ) {

            ontouch_1 = 4;
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


    var r = Math.random(1)*10;

      //  hsl_h =  (r*13);


    init();


    game_loop();

}


    var f_sc = 0.5;

var player;

var bricks = [];

var brickCount = 1230;

var brickCurrent = 0;

var clouds = [];
var cloudCount = 130;


var mounts = [];
var mountsCount = 70;


var mounts_f = [];
var mountsCount_f = 100;



var coins = [];
var coinsCount = 30;

var stars = [];
var starsCount = 70;


var scale = 0.5;

var tapToStart_btn;


function left() {
    ontouch_1 = 0;
    }
function right() {
ontouch_1 = 3;
    

    }
function jump() {
    ontouch_1 = 2;
    }





function init() {


    coins = [];
    stars = [];
    mounts_f = [];
    mounts = [];
    clouds = [];
    bricks = [];


    
 


    var rx = 300;
    var ry = 150;


    for (var i = 0; i < starsCount; i++) {

      var r = 400 - Math.random(1)*450;

      var r1 = 200 - (Math.random(1)*330);

      var r3 =  Math.random(1)*2;

   //   console.log("R:" + r + "  R: " + r1);

      stars.push({
            id: i,
            x: rx,
            y: ry,
            width: 3+r3,
            height: 3+r3,
            radius: 1,
            hsl_l: r

        });

        rx = 200 + r;
        ry = 0 + r1;

        /*if( i == 10 || i == 20 ) {
            rx = 0;
            ry = 160;
        }*/

    }







    var mx = 0;
    var my = (((HEIGHT*f_sc)/2) + 200);


    for (var i = 0; i < mountsCount; i++) {

      var r = Math.random(1)*10;



        mounts.push({
            id: i,
            x: mx+(r*10),
            y: my,
            width: 600*r*0.2*scale,
            height: 170*r*0.2*scale,
            hsl_l: r

        });

        mx += 300 + 30;

        if( i == 10  ) {
            my = (((HEIGHT*f_sc)/2) + 200) + 30;
            mx = 0;
        }
        if( i == 20  ) {
            my = (((HEIGHT*f_sc)/2) + 200) + 50;
            mx = 0;
        }
        if( i == 23 || i == 16 || i == 4  ) {
            my = (((HEIGHT*f_sc)/2) + 200) + 60;
            mx = 0;
        }
    }


    var fx = 0;
    var fy = (HEIGHT*f_sc) + 70;


    for (var c = 0; c < mountsCount_f; c++) {

        var r = Math.random(1)*30;

        mounts_f.push({
            id: c,
            x: fx,
            y: fy-((10+r)),
            width: 700*r*0.06*scale,
            height: 150*r*0.06*scale,
            hsl_l: r*0.3
        });

        fx += 60*scale + r*6;

    }




    var clx = 0;
    var cly = (((HEIGHT*f_sc)/2) + 100);


    for (var c = 0; c < cloudCount; c++) {

        var r = Math.random(1)*100;

        clouds.push({
            id: c,
            x: clx,
            y: cly-((10+r)),
            width: 100*scale,
            height: 250*scale,
            velX: 0,
            velY: 0,
            radius: 10+r
        });

        clx += 10*scale + r*1;

    }






    var tlx = 0;
    var tly = (((HEIGHT*f_sc)/2) + 100);


    for (var c = 0; c < coinsCount; c++) {

        var r = Math.random(1)*100;

        coins.push({
            id: c,
            x: tlx,
            y: tly,
            width: 14*scale,
            height: 14*scale,
            state: 1
        });

        tlx += 300*scale;

    }







    var bx = 0;
    var by = ((HEIGHT*f_sc)) - 120;

var s = 0;


    for (var i = 0; i < brickCount; i++) {

        var r = Math.random(1)*100;

        if( i > 12 ) {
            s++;

            if( s == 5) {

                s = 0;
            }
            
        }
        
        if(i < 6) {
            r = 0;
            }

            if( r < 7 ) { r = 7; }
          //  console.log("R:" + r );

        bricks.push({
            id: i,
            x: bx,
            y: by+r*2,
            width: 300*scale*r*0.2,
            height: 550*scale,
            velX: 0,
            velY: 0,
            moveY: 40+r*2,
            state: s,
            radius: 14
        });

        bx += 300*scale + r;

    }






    player = {
        x: null,
        y: null,
        width: 35*scale,
        height: 50*scale,
        radius: 9*scale,
        speed: 0.3,
        velX: 0,
        velY: 0,
        jumping: false,
        grounded: false
    };

    start_y = by;

    player.x = 100*scale;
    player.y = 250*scale;


    player.grounded = true;

}


var uparrow = 38, downarrow = 40, leftarrow = 37, rightarrow = 39, spacebar = 32;

var gravity = 0.3;


var cameraC = 0;

var startXC = 0;


var cameraXC = 0;

var camera_1 = 0;

// 200   260   blue

var hsl_h = 36;  // 36
var hsl_s = 50;  // 40
var hsl_l = 21;   // 21

var hsl_l1 = 21;

var count = 0;

var sunY = 150;

var sunB = 0;

var sunC = 0;

var count1 = 0;

var score = 0;

var c_1 = 0;

var game_state = 0;


function tapToStart() {
    
  //  console.log("tap to start");

    

    tapToStart_btn.style.visibility = "hidden";

    game_state = 1;

    
     if( rscreen == 2) {
               canvas.requestFullscreen();
                fscreen = 1;
         }
}






function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  
  function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  
  function checkCookie() {
    let user = getCookie("username");
    if (user != "") {
      alert("Welcome again " + user);
    } else {
      user = prompt("Please enter your name:", "");
      if (user != "" && user != null) {
        setCookie("username", user, 365);
      }
    }
  }
















var player_y2 = 0;


var start_y = 0;

var py = 0;



var scale_r = 1.0;

var level_player = 1;


function game_loop() {

    ctx.save();
    ctx.fillStyle = 'rgba(130, 130, 130, 1)';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

   
   
   // ctx.scale(0.6, 0.6);

   
  // ctx.scale(0.8, 0.8);

 // Create gradient

 var grd = ctx.createLinearGradient(0, 0, 0, canvas.height);
 grd.addColorStop(0, 'hsl('+((hsl_h-180))+'deg '+(hsl_s+30)+'% '+((hsl_l-sunB*0.1)+45)+'%)');
 grd.addColorStop(1, 'hsl('+(hsl_h)+'deg '+(hsl_s+30+sunB)+'% '+((hsl_l+sunB*0.2)+45)+'%)');

 //  ctx.rotate(20 * Math.PI / 180);
 
 // Fill with gradient
 ctx.fillStyle = grd;
// ctx.rotate(20 * Math.PI / 180);
 ctx.fillRect(0, 0, WIDTH, HEIGHT);




  if( game_state == 1 ) {
   
    ctx.font = "700 23px Raleway";
    ctx.fillStyle = "#FFFFFF66";
    ctx.fillText("S C O R E", ((WIDTH*f_sc))-144, 100);
 
 
    var score_1 = 0;
 
    var score_2 = 0;
 
    var score_3 = 0;
 
     
 
    if( score > 9 ) {
 
        score_2 = parseInt(score / 10);
 
        score_3 = score - (score_2*10); 
    } else {
        score_3 = score;
    }
 
 
    var score_t = score_1 + " " + score_2 + " " + score_3;
 
 
    ctx.font = "700 45px Raleway";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText(score_t, (WIDTH*f_sc)-146, 136);
 
 
 
 
    }
 
  //  ctx.scale(1.1, 1.1);

  //  ctx.scale(1.0004, 1.0004);
    //ctx.fillStyle = "#444";

    // hue  360
    // 360 / 3   ,   360 / 2

    if( player.grounded == false && game_state == 1 ) {


        // startXC = ((((camera_1+40) - cameraXC) * 0.05) + cameraXC);
        if( 1.00 - scale_r < 0 ) {
                scale_r -= 0.6 * 0.001;
                
                        ctx.scale( (( 1.00 - scale_r) * 0.01 + scale_r), ((1.00 - scale_r) * 0.01 + scale_r ));
                
         }
     }
        

        if( player.grounded == true && game_state == 1 ) {

            if( 1.02 - scale_r > 0 ) {
            scale_r += 0.3 * 0.001;

            ctx.scale( ((  1.02 - scale_r) * 0.01 + scale_r), ((1.02 - scale_r) * 0.01 + scale_r ));

            } else {

                ctx.scale(1.02, 1.02);
            }

        }

   // ctx.rotate(10 * Math.PI / 180);

  if(game_state == 1) {
      
      player_y2 = player.y + player.height;
       
     py = (start_y - player_y2) * 0.03 + py;
      
    
      /*  if((start_y - py) < 0) {
         
         start_y = py;
        }*/


     }





        var grd1 = ctx.createRadialGradient(500, sunY, 30, 500, sunY, 32);
        grd1.addColorStop(0, '#FFFFFFFF');
        grd1.addColorStop(1, '#FFFFFF00');
     
        //  ctx.rotate(20 * Math.PI / 180);
        
        // Fill with gradient
       
        ctx.beginPath();
        ctx.arc((WIDTH/Math.pow(1.618, 1)), sunY,(WIDTH/Math.pow(1.618, 4)) , 0, 2 * Math.PI);
      //  ctx.stroke();
      ctx.fillStyle = '#FFF';
      ctx.fill();



      var grd2 = ctx.createRadialGradient(500, sunY, 30, 500, sunY, 150);
      grd2.addColorStop(0, '#FFFFFF77');
      grd2.addColorStop(1, '#FFFFFF00');
   
      //  ctx.rotate(20 * Math.PI / 180);
      
      // Fill with gradient
     
      ctx.beginPath();
      ctx.arc((WIDTH/Math.pow(1.618, 1)), sunY,(WIDTH/Math.pow(1.618, 4)) , 0, 2 * Math.PI);
    //  ctx.stroke();
    ctx.fillStyle = grd2;
    ctx.fill();


      /*  ctx.beginPath();
        ctx.arc(500, sunY, 30, 0, 2 * Math.PI);
      //  ctx.stroke();
      ctx.fillStyle = "#FFFFFF";
      ctx.fill();*/




        if( sunC == 0 && sunY < 300 ) {

            sunB += 0.03;

            sunY += 0.05;

            hsl_l -= 0.005;
        } else if( sunY >= 300 ) {
            sunC = 1;
        }

        if( sunC == 1 && sunY > 150 ) {

            sunY -= 0.05;

            hsl_l += 0.005;

        } else if( sunY <= 150 ) {
            sunC = 0;
        }




        // clouds 

        for( var r = 0; r<cloudCount; r++ ) {


        ctx.beginPath();

        ctx.arc(clouds[r].x + clouds[r].velX, clouds[r].y, clouds[r].radius, 0, 2 * Math.PI);

      //  ctx.stroke();

      clouds[r].velX -= 0.4;

      //  ctx.fillStyle = "#FFFFFF77";
      ctx.fillStyle = 'hsl(0deg 100% '+100+'% / '+ hsl_l +'%)';


        ctx.fill();


        }








        ctx.rotate(45 * Math.PI / 180);

      for( var r = 0; r<starsCount; r++ ) {

       

        /*ctx.beginPath();
        ctx.moveTo(stars[r].x, stars[r].y);

        ctx.lineTo(stars[r].x+(stars[r].width/2), stars[r].y+(stars[r].width/2));
        ctx.lineTo(stars[r].x, stars[r].y+(stars[r].width));
        ctx.lineTo(stars[r].x-(stars[r].width/2), stars[r].y+(stars[r].width/2));

        ctx.lineTo(stars[r].x, stars[r].y);*/




        ctx.beginPath();
        ctx.moveTo(stars[r].x, stars[r].y);
        ctx.lineTo(stars[r].x+stars[r].width-stars[r].radius, stars[r].y);
        ctx.arcTo(stars[r].x+stars[r].width, stars[r].y, stars[r].x+stars[r].width, stars[r].y+stars[r].radius, stars[r].radius);
        ctx.lineTo(stars[r].x+stars[r].width, stars[r].y+stars[r].height-stars[r].radius);
        ctx.arcTo(stars[r].x+stars[r].width, stars[r].y+stars[r].height, stars[r].x+stars[r].width-stars[r].radius, stars[r].y+stars[r].height, stars[r].radius);
        ctx.lineTo(stars[r].x+stars[r].radius, stars[r].y+stars[r].height);
        ctx.arcTo(stars[r].x, stars[r].y+stars[r].height, stars[r].x, stars[r].y+stars[r].height-stars[r].radius, stars[r].radius);
        ctx.lineTo(stars[r].x, stars[r].y+stars[r].radius);
        ctx.arcTo(stars[r].x, stars[r].y, stars[r].x+stars[r].radius, stars[r].y, stars[r].radius);
        
        ctx.fillStyle = 'hsl(0deg 0% 100% / '+ (r > 13 ? 90 : 50) +'%)';
        ctx.fill();







        //ctx.arcTo(200+10, 200, 200+10, 200+10, 10);


        
        /* ctx.quadraticCurveTo(240, 210, 250, 210);
        ctx.lineTo(260, 210);
        ctx.quadraticCurveTo(270, 200, 280, 200);*/



       
       // ctx.fill();

      }

      ctx.rotate(-45 * Math.PI / 180);
     

     // hsl_l = hsl_l1 - (count*0.02);



  

    // ctx.rotate(45 * Math.PI / 180);

     for( var t = 0; t<coinsCount; t++ ) {


        if( coins[t].state == 1 ) {

            ctx.fillStyle = 'hsl('+(hsl_h+120)+'deg '+(hsl_s-50)+'% '+(hsl_l+15)+'%)';

ctx.beginPath();

        ctx.arc(coins[t].x-(startXC), coins[t].y , coins[t].width, 0, 2 * Math.PI);
ctx.fill();
            
            
            


           // ctx.fillRect(coins[t].x-(startXC), coins[t].y, coins[t].width, coins[t].height);

              /*  ctx.beginPath();
        ctx.moveTo(mounts[m].x-(startXC*0.2), mounts[m].y);
        ctx.lineTo(mounts[m].x-(startXC*0.2)+(mounts[m].width/2), mounts[m].y-mounts[m].height);
      
        ctx.lineTo(mounts[m].x+-(startXC*0.2), mounts[m].y);
        ctx.fillStyle = 'hsl('+hsl_h+'deg '+5+'% '+(hsl_l+mounts[m].hsl_l+25)+'%)';
        ctx.fill();*/


            if( player.x + player.width >  coins[t].x-(startXC) && 
                player.x < coins[t].x-(startXC) + coins[t].width &&   
                player.y + player.height >  coins[t].y && 
                player.y < coins[t].y + coins[t].height   
                
                ) {

                    coins[t].state = 0;

                    score += 1;

            }
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

     var y_0 = HEIGHT + 350;
   
     ctx.fillStyle = 'hsl(120deg 53% 32%)';
     ctx.fillRect(0, y_0, WIDTH, 10);



     if( game_state == 1 && player.y > y_0 ) {

            // Game Over

            player.velY = 0;
            player.velX = 0;

            // game state  2 

            game_state = 2;

     }


     level_player = startXC / 1000;

     
        player.width = level_player;
        player.height = level_player;


    ctx.fillStyle = "#edfbff";
    ctx.font = "700 10px Raleway";
    ctx.fillText("L e v e l  " + level_player, player.x+ 30, player.y-10);


     /// ctx.fillStyle = 'hsl(120deg 53% 32%)';


    ctx.fillStyle = 'hsl('+hsl_h+'deg '+95+'% '+(hsl_l+15)+'%)';


  //  ctx.fillRect(player.x, player.y, player.width, player.height);

        ctx.beginPath();

        ctx.moveTo(player.x, player.y + py);

        ctx.lineTo(player.x+player.width-player.radius, player.y + py);

        ctx.arcTo(player.x+player.width, player.y + py, player.x+player.width, player.y + py+player.radius, player.radius);

        ctx.lineTo(player.x+player.width, player.y + py+player.height-player.radius);

        ctx.arcTo(player.x+player.width, player.y + py+player.height, player.x+player.width-player.radius, player.y + py+player.height, player.radius);

        ctx.lineTo(player.x+player.radius, player.y + py+player.height);

        ctx.arcTo(player.x, player.y + py+player.height, player.x, player.y + py+player.height-player.radius, player.radius);

        ctx.lineTo(player.x, player.y + py+player.radius);

        ctx.arcTo(player.x, player.y + py, player.x+player.radius, player.y + py, player.radius);

        
      //  ctx.fillStyle = 'hsl(0deg 0% 100% / '+ (r > 13 ? 90 : 50) +'%)';

        ctx.fill();
    
    
    
    
    
    
    ctx.beginPath();

        ctx.arc(player.x+26*scale, py +  player.y+15*scale, 5*scale, 0, 2 * Math.PI);



      ctx.fillStyle = '#FFF';

        ctx.fill();
    
    /*
    ctx.beginPath();
    ctx.moveTo(player.x+23*scale, player.y+10*scale);
    ctx.lineTo(player.x+28*scale, player.y+15*scale);
    ctx.lineTo(player.x+23*scale, player.y+20*scale);
    ctx.lineTo(player.x+18*scale, player.y+15*scale);

    ctx.fillStyle = '#FFF';
    ctx.fill();
    
    */



    if (keystate[spacebar] || ontouch_1 == 4 ) {


        if( game_state == 2 ) {
            startXC = 0;
            player.x = 120;
            player.y = 200;
        
        }

        tapToStart();

           


    }



    if( game_state == 1 ) {


   


    if (keystate[leftarrow] || ontouch_1 == 1) {

        player.velX -= player.speed;  c_1 = 1;

    } else if (keystate[rightarrow] || ontouch_1 == 3) {
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

    if( player.velX > 5 ) {

        player.velX = 5;
    }

    if( player.velX < -5 ) {

        player.velX = -5;
    }

    if (keystate[uparrow] || ontouch_1 == 2 ) {
      
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

   if( game_state != 2 ) {
      player.velY += gravity;
   }



   /* if( player.x < (WIDTH/2) ) {
        player.x = player.velX;
    } else {

        startXC = -(player.velX - (WIDTH/2)); 

    }*/

    /*if( cameraC == 0 && player.x > (WIDTH/2) ) {

        player.x = (WIDTH/2);

        startXC = player.velX - (WIDTH/2); 

        cameraC = 0;

    }*/

    if( cameraC == 0 && player.x < ((WIDTH*f_sc)/2)  ) {

        player.x += player.velX;
        
    } else if( cameraC == 0 && player.x >= ((WIDTH*f_sc)/2)  ) {

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












    count++;


    ctx.font = "16px Raleway";

   // ctx.fillText("count: " + count, 30, 130);

   // ctx.fillText("startXC: " + startXC, 30, 100);



    for( var b = 0; b<brickCount; b++ ) {

        
        if(b < (brickCurrent+24) && b > (brickCurrent-24)) {
           
           
        
      /* if( player.x >= (WIDTH/2) ) {
        bricks[b].x -= 1;
       }*/

        ctx.fillStyle = 'hsl('+(hsl_h+180)+'deg '+(85)+'% '+(10)+'%)';

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



       var by_1 = bricks[b].y + py + bricks[b].velY;

       var by_2 = bricks[b].y + py + bricks[b].velY + bricks[b].height;




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


   
        if( ((player.y + py + player.velY + player.height) > by_1)  
            && (player.x + player.width) > bricks[b].x-startXC  && player.x < (bricks[b].x-startXC+bricks[b].width) ) {

            player.velY = (player.velY - ((player.y + py + player.velY + player.height)-by_1));

            player.grounded = true;


            brickCurrent = b; 
           // ctx.scale(1.0, 1.0);
        } 


        if( player.x + player.width > bricks[b].x-startXC && player.x > bricks[b].x - 30 && player.x < bricks[b].x  
            && player.y+py+player.height > by_1+10 && player.y+py < by_1 + bricks[b].height-4 ) {

             player.velX = 0;
        }


        }

    }


    player.y += player.velY;

    var grd3 = ctx.createLinearGradient(0, HEIGHT-100, 0, HEIGHT+60);
    grd3.addColorStop(1, '#FFFFFFCC');
    grd3.addColorStop(0, '#FFFFFF00');
 
    ctx.fillStyle = grd3;
 
    ctx.fillRect(0, HEIGHT-100, WIDTH, 100);



    for( var m = 0; m<mountsCount_f; m++ ) {

        ctx.beginPath();
        ctx.moveTo(mounts_f[m].x-(startXC*1.1), mounts_f[m].y);
        ctx.lineTo(mounts_f[m].x-(startXC*1.1)+(mounts_f[m].width/2), mounts_f[m].y-mounts_f[m].height);
        ctx.lineTo(mounts_f[m].x-(startXC*1.1)+mounts_f[m].width, mounts_f[m].y);
        ctx.lineTo(mounts_f[m].x-(startXC*1.1), mounts_f[m].y);
        ctx.fillStyle = 'hsl('+hsl_h+'deg '+95+'% '+(5)+'%)';
        ctx.fill();
//       ctx.fillStyle = 'hsl('+hsl_h+'deg '+85+'% '+(hsl_l+mounts[m].hsl_l+15)+'%)';
     }






   // 

   if( game_state == 0 ) {

  // ctx.fillStyle = "#FFF";
 //  ctx.font = "700 30px Raleway";
  // ctx.fillText("W O R L D", ((WIDTH*f_sc)/2)-110, 100);
  // ctx.font = "700 17px Raleway";
   //ctx.fillText("A D V E N T U R E", ((WIDTH*f_sc)/2)-106, 124);



   


   }




   
   if( game_state == 1 && startXC < 50 ) {

    ctx.fillStyle = "#FFF";
    ctx.font = "700 14px Raleway";
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
        
      /* your code here */
 
    
 
    ctx.fillRect((WIDTH*f_sc)/3, 100, 3, (HEIGHT*f_sc)-200);
    ctx.fillText("GO BACK", (WIDTH*f_sc*0.1), (HEIGHT*f_sc)/2);
 
 
    ctx.fillText("JUMP", ((WIDTH*f_sc)/3)+(WIDTH*f_sc*0.1), (HEIGHT*f_sc)/2);
 
    ctx.fillRect(((WIDTH*f_sc)/3)*2, 100, 3, (HEIGHT*f_sc)-200);
 
    ctx.fillText("GO FORWARD", ((WIDTH*f_sc)/3)*2+(WIDTH*f_sc*0.1), (HEIGHT*f_sc)/2);
     } else {
 
         ctx.fillText("- U s e  a r r o w k e y s  t o  m o v e  p l a y e r", ((WIDTH*f_sc)/3)+0, (HEIGHT*f_sc)/2);
     }
   }








   
   if( game_state == 2 ) {

    ctx.fillStyle = "#edfbff";
    ctx.font = "700 60px Raleway";
    ctx.fillText("G A M E", ((WIDTH*f_sc)/2)-110, (f_sc*HEIGHT)-150+120);
    ctx.font = "700 63px Raleway";
    ctx.fillText("O V E R", ((f_sc*WIDTH)/2)-110, (f_sc*HEIGHT)-100+120);

   }

  



   ctx.restore();

   ctx.fillStyle = "#FFFFFF";
   ctx.font = "20px Raleway";

    setTimeout(function() {

        requestAFrame(game_loop);
    }, 0);

}







window.addEventListener("load", function() {
    main();
});





