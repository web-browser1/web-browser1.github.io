console.log('Hello World!');



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


window.onload = window.onresize = function () {
    WIDTH = window.innerWidth;

   if( c_r == 1) {
    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    sunX = WIDTH - (WIDTH*0.2);
   }
    
};

var WIDTH = 800, HEIGHT = 600;

var canvas;
var ctx;


var stars = [];
var starsCount = 70;

var cards; 

var rtX = 60;
var rtZ = -60;

function cplus() {
  //  cards.style.webkit.transform('-webkit-transform: rotateX(70deg) rotateZ(-60deg)');
  //  cards[0].style.transform = 'rotateX(70deg) rotateZ(-60deg)';
  //  cards[1].style.transform = 'rotateX(70deg) rotateZ(-60deg)';
  //  cards[2].style.transform = 'rotateX(70deg) rotateZ(-60deg)';

    rtX += 10;

    document.getElementById('card1').style.transform = 'rotateX('+rtX+'deg) rotateZ('+rtZ+'deg)';
      document.getElementById('card2').style.transform = 'rotateX('+rtX+'deg) rotateZ('+rtZ+'deg)';
      document.getElementById('card3').style.transform = 'rotateX('+rtX+'deg) rotateZ('+rtZ+'deg)';
  

}
function cminus() {
    rtX -= 10;

    document.getElementById('card1').style.transform = 'rotateX('+rtX+'deg) rotateZ('+rtZ+'deg)';
      document.getElementById('card2').style.transform = 'rotateX('+rtX+'deg) rotateZ('+rtZ+'deg)';
      document.getElementById('card3').style.transform = 'rotateX('+rtX+'deg) rotateZ('+rtZ+'deg)';
  


}


function cplusz() {
    
  
      rtZ += 10;
  
      document.getElementById('card1').style.transform = 'rotateX('+rtX+'deg) rotateZ('+rtZ+'deg)';
      document.getElementById('card2').style.transform = 'rotateX('+rtX+'deg) rotateZ('+rtZ+'deg)';
      document.getElementById('card3').style.transform = 'rotateX('+rtX+'deg) rotateZ('+rtZ+'deg)';
  
  
  }
  function cminusz() {
      rtZ -= 10;
  
      document.getElementById('card1').style.transform = 'rotateX('+rtX+'deg) rotateZ('+rtZ+'deg)';
      document.getElementById('card2').style.transform = 'rotateX('+rtX+'deg) rotateZ('+rtZ+'deg)';
      document.getElementById('card3').style.transform = 'rotateX('+rtX+'deg) rotateZ('+rtZ+'deg)';
  
  
  }
  




var c_r = 0;

var greet;

function main() {


    canvas = document.getElementById('canvas');
  
    canvas.width = WIDTH;
  canvas.height = HEIGHT;

    ctx = canvas.getContext("2d");


    c_r = 1;

    var aiSun = document.getElementById('section4sun');


  //  greet = document.getElementById('greet');


     cards = document.getElementsByClassName('td-cards__card');
   
  
  //  grd.addColorStop(0, 'hsl('+(hsl_h)+'deg '+51+'% '+(28-ry*0.1)+'%)');
  //  grd.addColorStop(1, 'hsl('+(200)+'deg '+74+'% '+(42-ry*0.1)+'%)');
   
/*
    sunX = WIDTH - (WIDTH*0.2);


    sunTop = HEIGHT * 0.3;
    
    sunTop = 300;


    sunBottom = HEIGHT - 400;

    sunT = sunBottom - sunTop;*/

    var d = new Date();
    var h = d.getHours();
    
  

    var t = 12 - h;

    if(h < 12) {
        t = 12 - h;

        sunState = 1;
    }
    else {
        t = h - 12;

        sunState = 2;
    }


/*    if( h < 12 && h > 5 ) {
        greet.innerHTML = "|\nGood morning";
    } else if( h > 12 && h < 18 ) {
        greet.innerHTML = "|\nGood afternoon";
    } else if( h >= 18 ) {

        greet.innerHTML = "|\nGood evening";
    }*/

sunX = WIDTH - (WIDTH * 0.3);


    sunTop = HEIGHT * 0.2;

    sunBottom = HEIGHT - (HEIGHT*0.14);

    sunT = sunBottom - sunTop;


    sunY = (sunTop ) + (sunT * (t/10));

 console.log(" sunTop " + sunTop + "  sunBottom " + sunBottom + " sunT" + sunT + "  t " + t + " h " + h +  " sunY " + sunY);

    // 7 

   // sunY = (sunTop + sunT) * (t/10) + 0;

   // sunSpeed = 0.0006;


    // 12 h  * 60 m 

    /*
       12 * 60 = 720


       720 * 60 =  43 200 s


       0.0001929
    */

    sunSpeed = (sunT / (43200 * 60)) * 1;

  //  sunSpeed = 1;

    
  // aiSun.style.background = 'linear-gradient(180deg, #3b4db8, #56b7e6)';

   
  //  grd.addColorStop(0, 'hsl('+(hsl_h)+'deg '+51+'% '+(68-(sunY + ry)*0.1)+'%)');
   // grd.addColorStop(1, 'hsl('+(200)+'deg '+74+'% '+(82-(sunY + ry)*0.1)+'%)');

    var rx1 = 300;
    var ry1 = 150;


    for (var i = 0; i < starsCount; i++) {

      var r = 600 - Math.random(1)*950;

      var r1 = 400 - (Math.random(1)*1730);

      var r3 =  Math.random(1)*2;

   //   console.log("R:" + r + "  R: " + r1);

      stars.push({
            id: i,
            x: rx1,
            y: ry1,
            width: 2+r3,
            height: 2+r3,
            radius: 1,
            hsl_l: r

        });

        rx1 = 200 + r;
        ry1 = 0 + r1;

        /*if( i == 10 || i == 20 ) {
            rx = 0;
            ry = 160;
        }*/

    }







    game_loop();

}


var rx = 0;
var ry = 0;
var sunY = 630;
var sunX = 1030;

var sunTop = 0;
var sunBottom = 0;

var sunT = 0;

var sunState = 0;

var sunSpeed = 0;

var sec = 0;


function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  var c = "";

var hsl_h = 231;
var hsl_s = 50;
var hsl_l = 50;

function game_loop() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);


  var sun2 = ((sunY + ry)- sunTop) / sunT;

// console.log("sun 2 " + sun2 + "   ry " + ry);

    var grd = ctx.createLinearGradient(0, 0, 0, HEIGHT);
    grd.addColorStop(0, 'hsl('+(hsl_h)+'deg '+51+'% '+(58-(sun2*45))+'%)');
    grd.addColorStop(1, 'hsl('+(200)+'deg '+74+'% '+(62-(sun2*50))+'%)');
   
    //  ctx.rotate(20 * Math.PI / 180);
    
    // Fill with gradient
    ctx.fillStyle = grd;
   // ctx.rotate(20 * Math.PI / 180);
    ctx.fillRect(0, 0, WIDTH, HEIGHT);




    rx += 1;

    sec += 1;

    if( sec == 120 ) 
    {
        sec = 0;
    }




  

    if( sunState == 1 && (sunY + ry) < sunTop ) 
    {
        sunState = 2;
    }
    else if(  sunState == 2 && (sunY + ry) > sunBottom )
    {
        sunState = 1;
    }



    if( sunState == 1 ) 
    {
        ry -= sunSpeed;

    } 
    else if( sunState == 2 )
    {
        ry += sunSpeed;

    }
    

   // sunY = sunY + ry;

    /*if( sunY < 120)
    {
        sunY = 0;

    }*/







    ctx.rotate(45 * Math.PI / 180);

    for( var r = 0; r<starsCount; r++ ) {

    
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
      
      ctx.fillStyle = 'hsl(0deg 0% 100% / '+ (r > 13 ? (10+ ry*0.35) : (10 + ry*0.35)) +'%)';
      ctx.fill();

     // (28-ry*0.1)

    }

    ctx.rotate(-45 * Math.PI / 180);






    

    ctx.fillStyle = '#FFF';
   // ctx.fillRect(10 + rx, 10, 40, 40);


    ctx.beginPath();
    ctx.arc(sunX, sunY + ry, 40, 0, 2 * Math.PI);

    ctx.fill();


    ctx.fillStyle = "#FFFFFF99";
    ctx.font = "300 14px verdana";

    ctx.fillText("Real Time Sun", sunX+60+ s_2, (sunY + ry - s_1)+64);

    ctx.fillStyle = "#FFF";
    ctx.font = "300 26px verdana";

    var d = new Date(); /* For absolute positioning of graph elements */




    var h = addZero(d.getHours() > 12 ? d.getHours() - 12 : d.getHours());
    var m = addZero(d.getMinutes());

    var pm = "";

    if( d.getHours() > 12 )
    {
        pm = " PM";
    } else {
        pm = " AM";
    }


    if( sec > 60 )
    {
        c = ":";
    } else {
        c = "";
    }

    ctx.fillText(h+""+c, sunX+60+ s_2, (sunY + ry - s_1)+90);
    ctx.fillText(m + pm, sunX+95+ s_2, (sunY + ry - s_1)+90);



    ctx.fillRect(sunX+46+ s_2, (sunY + ry - s_1)+52, 2, 40);



    setTimeout(function() {

        requestAFrame(game_loop);
    }, 0);
}


var s_1 = 70;
var s_2 = 40;

window.addEventListener("load", function() {
    main();
});
