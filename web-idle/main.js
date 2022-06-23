


var money = 40;

var hq = 0;


var price = 30;

var price_g = 30;
var price_d = 70;
var price_e = 170;
var price_s = 670;
var price_b = 1270;



var value_g = 1.0;
var value_d = 2.3;
var value_e = 4.3;
var value_s = 5.3;
var value_b = 6.4;


var price_hq_d = 17000;
var price_hq_e = 700000;
var price_hq_s = 1700000;
var price_hq_b = 3700000;



var station_c = 0;

var station_g = 0;
var station_d = 0;
var station_e = 0;
var station_s = 0;
var station_b = 0;

var q = "hidden";
var r = "visible"

var z = "position: absolute; left: 3000px;";
var re = "position: relative; left: 0px;";

var cars = [];
var carsCount = 300;

var trucks = [];
var trucksCount = 100;

var electrics = [];
var electricsCount = 100;

var scooters = [];
var scootersCount = 100;

var bikes = [];
var bikesCount = 100;



init();

var start = 0;



function init() {

   // var g1 = document.getElementById("g1"); g1.style.visibility = q;
   // var g2 = document.getElementById("g2"); g2.style.visibility = q;
   // var g3 = document.getElementById("g3"); g3.style.visibility = q;


    document.getElementById("price_g").innerHTML = price_g + "$";
    document.getElementById("price_d").innerHTML = price_d + "$";
    document.getElementById("price_e").innerHTML = price_e + "$";

    document.getElementById("price_s").innerHTML = price_s + "$";
    document.getElementById("price_b").innerHTML = price_b + "$";

    document.getElementById("price_dhq").innerHTML = price_hq_d + "$";
    document.getElementById("price_ehq").innerHTML = price_hq_e + "$";
    document.getElementById("price_shq").innerHTML = price_hq_s + "$";
    document.getElementById("price_bhq").innerHTML = price_hq_b + "$";




    document.getElementById("game").style.visibility = r;
    document.getElementById("diesel").style = z;
    document.getElementById("electric").style = z;
    document.getElementById("scooter").style = z;
    document.getElementById("bike").style = z;


   // document.getElementById("car2").style.visibility = q;
   // document.getElementById("car3").style.visibility = q;

   document.getElementById("btn_bus").style.visibility = q;
   document.getElementById("btn_electric").style.visibility = q;
  
   document.getElementById("btn_scooter").style.visibility = q;
   document.getElementById("btn_bike").style.visibility = q;
  
 //  var station_g_c = 6;

   var station_gc1 = parseInt(getCookie("gas"));
   var station_dc1 = parseInt(getCookie("diesel"));
   var station_ec1 = parseInt(getCookie("electric"));
   var station_sc1 = parseInt(getCookie("scooter"));
   var station_bc1 = parseInt(getCookie("bike"));


   var station_gc2 = 0;
   var station_dc2 = 0;
   var station_ec2 = 0;
   var station_sc2 = 0;
   var station_bc2 = 0;


   var hqc = parseInt(getCookie("hq"));
   
   var moneyc = parseInt(getCookie("money"));
   

   if(!isNaN(moneyc)) {   //console.log("cookie 1 " + isNaN(moneyc));
       money = moneyc;
   }

   start = 1;

   if(!isNaN(hqc)) {  
      // hq = hqc;
      hq = 0;
      for(var g = 1; g<hqc+1; g++) {
          buyHQUpgrade(g);
      }
   }
   
   if(!isNaN(station_gc1)) {  
        station_gc2 = parseInt(getCookie("gas"));

        for(var g = 1; g<station_gc2+1; g++) {
            buyGasStation(1);
         }
    }
    if(!isNaN(station_dc1)) {  
        station_dc2 = parseInt(getCookie("diesel"));
        for(var g = 1; g<station_dc2+1; g++) {
            buyGasStation(2);
        }

    }
    if(!isNaN(station_ec1)) {  
        station_ec2 = parseInt(getCookie("electric"));
        for(var g = 1; g<station_ec2+1; g++) {
            buyGasStation(3);
        }
    }
    if(!isNaN(station_sc1)) {
        station_sc2 = parseInt(getCookie("scooter"));
        for(var g = 1; g<station_sc2+1; g++) {
            buyGasStation(4);
        }
    }
    if(!isNaN(station_bc1)) {
        station_bc2 = parseInt(getCookie("bike"));
        for(var g = 1; g<station_bc2+1; g++) {
            buyGasStation(5);
        }
    }

    start = 0;


     var station_gf = 6;
   





   // var r = Math.random(1)*100;


    for (var c = 0; c < carsCount; c++) {

        cars.push({
            id: c,
            start: 0,
            end: 0,
            station: 0,
            state: 1,
            delay: 4
        });

    }

    for (var c = 0; c < trucksCount; c++) {

        trucks.push({
            id: c,
            start: 0,
            end: 0,
            station: 0,
            state: 1,
            delay: 4
        });

    }

    for (var c = 0; c < electricsCount; c++) {

        electrics.push({
            id: c,
            start: 0,
            end: 0,
            station: 0,
            state: 1,
            delay: 4
        });

    }

    for (var c = 0; c < scootersCount; c++) {

        scooters.push({
            id: c,
            start: 0,
            end: 0,
            station: 0,
            state: 1,
            delay: 7
        });

    }

    for (var c = 0; c < bikesCount; c++) {

        bikes.push({
            id: c,
            start: 0,
            end: 0,
            station: 0,
            state: 1,
            delay: 7
        });

    }

    var t = setInterval(runGame, 100);












   // console.log("cookie: " + document.cookie);

   // var ck = getCookie("start1");
   
   // console.log("ck: " + ck);


}






function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  
  function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  






var sec = 0;

var msec = 0;


function runGame() {

  //  console.log("run gas station "  + sec);
    sec += 0.1;

    msec = Math.floor(sec);


   /* if(msec >= 1) {
        sec += 1;

    }*/

    for(var b = 0; b<station_g; b++) {

        var d = b + 1;
   

    if(d <= station_g) {

        cars[b].station = d;

        if( cars[b].state == 1) {
            cars[b].start = msec;
            cars[b].state = 2;

            document.getElementById("pie" + d).style.background = "conic-gradient(#04e500 0%, #FFF 0%)";    

        }

        if(cars[b].state == 2 && msec == cars[b].start+cars[b].delay) {
            document.getElementById("pie" + d).style.visibility = r;
            document.getElementById("car" + d).style.visibility = r;
            cars[b].state = 3;

            cars[b].start = msec;
        }

        if( cars[b].state == 3 && msec <= cars[b].start+10) {

            money += (value_g / 10);

            var p = 100 - (((cars[b].start+10) - sec)*10);


            document.getElementById("pie" + d).style.background = "conic-gradient(#04e500 "+p+"%, #FFF 0%)";    


        } else if( cars[b].state == 3 && msec > cars[b].start+10 ) {
            document.getElementById("car" + d).style.visibility = q;
            document.getElementById("pie" + d).style.visibility = q;
            cars[b].delay = Math.floor( Math.random() * (7 )) + 6;

            cars[b].state = 1;
        }

    }


    }





    for(var b = 0; b<station_d; b++) {

        var d = b + 1;
   

    if(d <= station_d) {

        trucks[b].station = d;

        if( trucks[b].state == 1) {
            trucks[b].start = msec;
            trucks[b].state = 2;

            document.getElementById("pie_d" + d).style.background = "conic-gradient(#04e500 0%, #FFF 0%)";    

        }

        if(trucks[b].state == 2 && msec == trucks[b].start+trucks[b].delay) {
            document.getElementById("pie_d" + d).style.visibility = r;
            document.getElementById("truck" + d).style.visibility = r;
            trucks[b].state = 3;

            trucks[b].start = msec;
        }

        if( trucks[b].state == 3 && msec <= trucks[b].start+10) {

            money += (value_d / 10);

            var p = 100 - (((trucks[b].start+10) - sec)*10);


            document.getElementById("pie_d" + d).style.background = "conic-gradient(#04e500 "+p+"%, #FFF 0%)";    


        } else if( trucks[b].state == 3 && msec > trucks[b].start+10 ) {
            document.getElementById("truck" + d).style.visibility = q;
            document.getElementById("pie_d" + d).style.visibility = q;
            trucks[b].delay = Math.floor( Math.random() * 12);

            trucks[b].state = 1;
        }

    }


    }




    for(var b = 0; b<station_e; b++) {

        var d = b + 1;
   

    if(d <= station_e) {

        electrics[b].station = d;

        if( electrics[b].state == 1) {
            electrics[b].start = msec;
            electrics[b].state = 2;

            document.getElementById("pie_e" + d).style.background = "conic-gradient(#04e500 0%, #FFF 0%)";    

        }

        if(electrics[b].state == 2 && msec == electrics[b].start+electrics[b].delay) {
            document.getElementById("pie_e" + d).style.visibility = r;
            document.getElementById("electric" + d).style.visibility = r;
            electrics[b].state = 3;

            electrics[b].start = msec;
        }

        if( electrics[b].state == 3 && msec <= electrics[b].start+10) {

            money += (value_e / 10);

            var p = 100 - (((electrics[b].start+10) - sec)*10);


            document.getElementById("pie_e" + d).style.background = "conic-gradient(#04e500 "+p+"%, #FFF 0%)";    


        } else if( electrics[b].state == 3 && msec > electrics[b].start+10 ) {
            document.getElementById("electric" + d).style.visibility = q;
            document.getElementById("pie_e" + d).style.visibility = q;
            electrics[b].delay = Math.floor( Math.random() * 12);

            electrics[b].state = 1;
        }

    }


    }





    for(var b = 0; b<station_s; b++) {
        var d = b + 1;

        if(d <= station_s) {
            scooters[b].station = d;

            if( scooters[b].state == 1) {
                scooters[b].start = msec;
                scooters[b].state = 2;
                document.getElementById("pie_s" + d).style.background = "conic-gradient(#04e500 0%, #FFF 0%)";    
            }
            if(scooters[b].state == 2 && msec == scooters[b].start+scooters[b].delay) {
                document.getElementById("pie_s" + d).style.visibility = r;
                document.getElementById("scooter" + d).style.visibility = r;
                scooters[b].state = 3;
                scooters[b].start = msec;
            }
            if( scooters[b].state == 3 && msec <= scooters[b].start+10) {
                money += (value_s / 10);
                var p = 100 - (((scooters[b].start+10) - sec)*10);
                document.getElementById("pie_s" + d).style.background = "conic-gradient(#04e500 "+p+"%, #FFF 0%)";    

            } else if( scooters[b].state == 3 && msec > scooters[b].start+10 ) {
                document.getElementById("scooter" + d).style.visibility = q;
                document.getElementById("pie_s" + d).style.visibility = q;
                scooters[b].delay = Math.floor( Math.random() * 12);

                scooters[b].state = 1;
            }
        }
    }





    for(var b = 0; b<station_b; b++) {
        var d = b + 1;

        if(d <= station_b) {
            bikes[b].station = d;

            if( bikes[b].state == 1) {
                bikes[b].start = msec;
                bikes[b].state = 2;
                document.getElementById("pie_b" + d).style.background = "conic-gradient(#04e500 0%, #FFF 0%)";    
            }
            if(bikes[b].state == 2 && msec == bikes[b].start+bikes[b].delay) {
                document.getElementById("pie_b" + d).style.visibility = r;
                document.getElementById("bike" + d).style.visibility = r;
                bikes[b].state = 3;
                bikes[b].start = msec;
            }
            if( bikes[b].state == 3 && msec <= bikes[b].start+10) {
                money += (value_b / 10);
                var p = 100 - (((bikes[b].start+10) - sec)*10);
                document.getElementById("pie_b" + d).style.background = "conic-gradient(#04e500 "+p+"%, #FFF 0%)";    

            } else if( bikes[b].state == 3 && msec > bikes[b].start+10 ) {
                document.getElementById("bike" + d).style.visibility = q;
                document.getElementById("pie_b" + d).style.visibility = q;
                bikes[b].delay = Math.floor( Math.random() * 12);

                bikes[b].state = 1;
            }
        }
    }













    document.getElementById("money").innerHTML = Math.floor(money) + "$";


    document.getElementById("btn_gas").classList.remove("buttong-a");
    document.getElementById("btn_bus").classList.remove("buttong-a");
    document.getElementById("btn_electric").classList.remove("buttong-a");
    document.getElementById("btn_scooter").classList.remove("buttong-a");
    document.getElementById("btn_bike").classList.remove("buttong-a");


    document.getElementById("btn_hq_diesel").classList.remove("buttong-a");
    document.getElementById("btn_hq_electric").classList.remove("buttong-a");
    document.getElementById("btn_hq_scooter").classList.remove("buttong-a");
    document.getElementById("btn_hq_bike").classList.remove("buttong-a");



    if( money >= price_g ) {
        document.getElementById("btn_gas").classList.add("buttong-a");
    }
    if( money >= price_d ) {
        document.getElementById("btn_bus").classList.add("buttong-a");
    }
    if( money >= price_e ) {
        document.getElementById("btn_electric").classList.add("buttong-a");
    }
    if( money >= price_s ) {
        document.getElementById("btn_scooter").classList.add("buttong-a");
    }
    if( money >= price_b ) {
        document.getElementById("btn_bike").classList.add("buttong-a");
    }





   // document.getElementById("btn_hq_electric").classList.add("buttong-g");
         


}
















function buyHQUpgrade(u) {

    var hq_price = 0;

    if(u == 1) {
        hq_price = 17000;
    } else if(u == 2) {
        hq_price = 700000;
    } else if(u == 3) {
        hq_price = 1700000;
    } else if(u == 4) {
        hq_price = 3700000;
    }


    if(u != hq ) {

        if(money >= hq_price || start == 1) {

            if( start == 0 ) {
                money -= hq_price;

                document.getElementById("money").innerHTML = Math.floor(money) + "$";
            }


            if(u == 1) {
                document.getElementById("btn_bus").style.visibility = r;
                hq = 1;
                document.getElementById("btn_hq_diesel").classList.add("buttong-g");

                document.getElementById("diesel").style.visibility = re;
               
            } else if(u == 2) {
                document.getElementById("btn_electric").style.visibility = r;
                hq = 2;

                document.getElementById("btn_hq_electric").classList.add("buttong-g");
                document.getElementById("electric").style.visibility = re;

            } else if(u == 3) {
                document.getElementById("btn_scooter").style.visibility = r;
                hq = 4;

                document.getElementById("btn_hq_scooter").classList.add("buttong-g");
                
                document.getElementById("scooter").style.visibility = re;
            } else if(u == 4) {
                document.getElementById("btn_bike").style.visibility = r;
                hq = 5;

                document.getElementById("btn_hq_bike").classList.add("buttong-g");
                
                document.getElementById("bike").style.visibility = re;
            }

            if( start == 0 ) {
                setCookie("money", money, 365);

                setCookie("hq", hq, 365);
            }

        }

    }

   
}


var station_re = 0;

function buyGasStation(s) {

    console.log("buy gas station");

    var max_c = 0;

if(s == 1) {
    price = price_g;
    station_c = station_g;  max_c = carsCount;
} else if( s == 2) {
    price = price_d;
    station_c = station_d;   max_c = trucksCount;

} else if( s == 3 ) {
    price = price_e;
    station_c = station_e;   max_c = electricsCount;
} else if( s == 4 ) {
    price = price_s;
    station_c = station_s;   max_c = scootersCount;
} else if( s == 5 ) {
    price = price_b;
    station_c = station_b;  max_c = bikesCount;
}


if( (money >= price || start == 1) && station_c < max_c ) {

    if( start == 0 ) {

    money -= price;

    document.getElementById("money").innerHTML = Math.floor(money) + "$";

    station_c += 1;

    }

    if(start == 1) {
        //station_c = station_re;


        station_c += 1;
    }



/*
if(station_c == 1) {
    document.getElementById("g1").style.visibility = r;
}
if(station_c == 2) {
    document.getElementById("g2").style.visibility = r;
}
if(station_c == 3) {
    document.getElementById("g3").style.visibility = r;
}*/
    


var div = document.createElement("div");
div.setAttribute("id", "g" + station_c);

div.className = "g g" + station_c;



var span = document.createElement("span");

var pie = document.createElement("div");
pie.className = "pie";



var span1 = document.createElement("span");

if(s == 1) {
    span1.setAttribute("id", "car" + station_c);
    span1.className = "material-symbols-outlined car";
    
    span1.innerHTML = "directions_car";
    span.innerHTML = "local_gas_station";
    span.className = "material-symbols-outlined station";

    pie.setAttribute("id", "pie" + station_c);

} else if(s == 2) {
    span1.setAttribute("id", "truck" + station_c);
    span1.className = "material-symbols-outlined car";
    
    span1.innerHTML = "directions_bus";
    span.innerHTML = "local_gas_station";
    span.className = "material-symbols-outlined station-d";

    pie.setAttribute("id", "pie_d" + station_c);
} else if(s == 3 ) {
    span1.setAttribute("id", "electric" + station_c);
    span1.className = "material-symbols-outlined car";
    
    span1.innerHTML = "electric_car";
    span.innerHTML = "ev_station";
    span.className = "material-symbols-outlined station-e";

    pie.setAttribute("id", "pie_e" + station_c);
} else if(s == 4 ) {
    span1.setAttribute("id", "scooter" + station_c);
    span1.className = "material-symbols-outlined car";
    
    span1.innerHTML = "electric_scooter";
    span.innerHTML = "ev_station";
    span.className = "material-symbols-outlined station-s";

    pie.setAttribute("id", "pie_s" + station_c);
} else if(s == 5 ) {
    span1.setAttribute("id", "bike" + station_c);
    span1.className = "material-symbols-outlined car";
    
    span1.innerHTML = "electric_bike";
    span.innerHTML = "ev_station";
    span.className = "material-symbols-outlined station-b";

    pie.setAttribute("id", "pie_b" + station_c);
}











var pie2 = document.createElement("div");
pie2.className = "pie2";
pie.appendChild(pie2);


div.appendChild(pie);
div.appendChild(span);
div.appendChild(span1);



if(s == 1) {
    document.getElementById("game").appendChild(div);
   
    
    station_g = station_c;

    setCookie("gas", station_g, 365);
} else if(s == 2) {
    document.getElementById("diesel").appendChild(div);
    station_d = station_c;

    setCookie("diesel", station_d, 365);
} else if(s == 3 ) {
    station_e = station_c;
    document.getElementById("electric").appendChild(div);

    setCookie("electric", station_e, 365);
} else if(s == 4 ) {
    station_s = station_c;
    document.getElementById("scooter").appendChild(div);

    setCookie("scooter", station_s, 365);
} else if(s == 5 ) {
    station_b = station_c;
    document.getElementById("bike").appendChild(div);

    setCookie("bike", station_b, 365);
}



/*
if(start == 1) {
    station_re = station_c;

}*/


setCookie("money", money, 365);



//div.style.visibility = r;
span1.style.visibility = q;
pie.style.visibility = q;



           
          


}



}