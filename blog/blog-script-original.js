
$('.circle-svg a').on("click", function(e) {
    var x = e.pageX;
    var y = e.pageY;

    var clickY = y - $(this).offset().top;
    var clickX = x - $(this).offset().left;
    var box = $(this);
    var setX = parseInt(clickX);
    var setY = parseInt(clickY);

    var radius = $(box).outerWidth() / 2;

    if ($(box).find("svg").length === 0) {

        $(box).append('<svg>\n\
                             <circle class="circle-1" cx="' + setX + '" cy="' + setY + '" r="' + (radius - 10) + '"></circle>\n\
                                    <circle class="circle-2" cx="' + setX + '" cy="' + setY + '" r="' + 0 + '"></circle>\n\
                                    </svg>');

    }

    $(box).find('svg').css('opacity', '1');

    $(box).find('svg').animate({
        opacity: '0'
    }, {duration: 800, queue: false});


    var c1 = $(box).find(".circle-1");

    c1.attr('cx', setX);
    c1.attr('cy', setY);


    var addv = radius - 30;

    $(c1).animate({"r": radius}, {
        duration: 350,
        step: function(val) {
            c1.attr("r", (val + addv));
        }
    });

    var c2 = $(box).find(".circle-2");

    c2.attr('cx', setX);
    c2.attr('cy', setY);


    $(c2).animate({"r": (radius - 15)}, {
        duration: 350,
        step: function(val) {

            c2.attr("r", val);
        }
    });


});






$('.menu-social-trigger').on('click', function() {

    $(this).toggleClass('open');

    $('.menu-social ul').toggleClass('open');


});

$('.search-trigger').on('click', function() {

    $(this).toggleClass('open');

    $('.search-form').toggleClass('open');


});



$('.info-trigger').on('click', function() {

    var info = $(this);

    $(info).toggleClass('move-1');

    setTimeout(function() {
        $(info).toggleClass('move-2');
    }, 300);


    $('.author-info').toggleClass('move-3');

    setTimeout(function() {

        $('.site-container').toggleClass('move-1');
    }, 300);

});

$('.author-info span').on('click', function() {

    var info = $('.info-trigger');
    setTimeout(function() {
        $(info).removeClass('move-2');

        setTimeout(function() {
            $(info).removeClass('move-1');
        }, 320);
        setTimeout(function() {

            $('.site-container').removeClass('move-1');
        }, 500);
    }, 250);

    $('.author-info').removeClass('move-3');



});




setTimeout(function() {


    $('.site-title').addClass('is-visible');

}, 1000);


var _eo = 0;
$(".content-index .hentry").each(function(index) {
    _eo++;

    if (_eo % 2 === 0) {
        $(this).addClass('hentry-right');
    } else {
        $(this).addClass('hentry-left');
    }
});





$(".tagcloud a").attr('style', '');


/* Sidebar Columns --------------------------------------- */

$('#secondary').ready(function() {
    var count = 0;
    $('.widget').each(function(index) {
        count++;

        if (count === 1) {
            $('.sidebar-col-1').append($(this).detach());
        } else if (count === 2) {
            $('.sidebar-col-2').append($(this).detach());
        } else if (count === 3) {
            $('.sidebar-col-3').append($(this).detach());
            count = 0;
        }
    });

});




$(".main-navigation li").each(function(index) {
    if ($(this).find('ul').length > 0) {
        $(this).append('<i class="fa fa-chevron-down"></i>');
    }
});








$(".galleryslider").ready(function() {
    function l(l, a) {
        $(l).css("transition", a + "s"), $(l).css("-webkit-transition", a + "s"), $(l).css("-moz-transition", a + "s"), $(l).css("-ms-transition", a + "s"), $(l).css("-o-transition", a + "s")
    }
    function a(l, a) {
        $(l).css("transform", " translate3d(" + a + "px, 0px, 0px)"), $(l).css("-webkit-transform", " translate3d(" + a + "px, 0px, 0px)"), $(l).css("-moz-transform", " translate3d(" + a + "px, 0px, 0px)"), $(l).css("-ms-transform", " translate3d(" + a + "px, 0px, 0px)"), $(l).css("-o-transform", " translate3d(" + a + "px, 0px, 0px)")
    }
    var t = 0;
    $(".hentry .galleryslider").each(function() {
        var r = $(this);
        if ($(r).find(".gallery-inner").css("overflow", "hidden"), $(r).find(".gallery-inner").css("position", "relative"), $(r).find(".gallery-ul").css("width", parseInt($(".gallery-ul").children().length) + 3 + "00%"), l($(r).find(".gallery-ul"), .6), $(r).find(".gallery-ul li").css("float", "left"), $(r).find(".gallery-ul li").css("display", "block"), $(r).find(".gallery-ul").find(".clone").length < 2) {
            var n = $(r).find(".gallery-ul").children().last().clone(), e = $(r).find(".gallery-ul").children().first().clone();
            $(n).addClass("clone"), $(e).addClass("clone"), $(r).find(".gallery-ul").append(e), $(r).find(".gallery-ul").prepend(n)
        }
        var i = parseInt($(r).attr("data-pos")), s = parseInt($(r).attr("data-gw"));
        t = parseInt($(r).find(".gallery-inner").css("width")), $(r).find(".gallery-ul li").css("width", t + "px"), s = t - i * t, $(r).attr("data-gw", s), a($(r).find(".gallery-ul"), s);
        var d = parseInt($(r).find(".gallery-ul li").eq(i - 1).find("img").css("height"));
        $(r).find(".gallery-inner").css("height", d + "px")
    }),
            $(window).resize(function() {
        resize();
    });

    setTimeout(function() {
        resize();
    }, 1000);

    resize();


    function resize() {
        $(".galleryslider").each(function() {
            var r = $(this), n = parseInt($(r).attr("data-pos"));
            t = parseInt($(r).find(".gallery-inner").css("width")), $(r).find(".gallery-ul li").css("width", t + "px"), l($(r).find(".gallery-ul"), 0);
            var e = t - n * t;
            $(r).attr("data-gw", e), a($(r).find(".gallery-ul"), e);
            var i = parseInt($(r).find(".gallery-ul li").eq(n - 1).find("img").css("height"));
            $(r).find(".gallery-inner").css("height", i + "px")
        })
    }
    var r = 1, n = 1;
    $(".gallery-prev").click(function() {
        var n = $(this).closest(".galleryslider");
        if (1 === r) {
            l($(n).find(".gallery-ul"), .6);
            var e = parseInt($(n).attr("data-gw")), i = parseInt($(n).attr("data-pos"));
            a($(n).find(".gallery-ul"), e + t), i--, $(n).attr("data-pos", i);
            var s = parseInt($(n).find(".gallery-ul li").eq(i - 1).find("img").css("height"));
            $(n).find(".gallery-inner").css("height", s + "px"), e = t - i * t, $(n).attr("data-gw", e), 1 === i && (r = 0, setTimeout(function() {
                l($(n).find(".gallery-ul"), 0), i = parseInt($(n).find(".gallery-ul").children().length) - 1, $(n).attr("data-pos", i), e = t - i * t, $(n).attr("data-gw", e), a($(n).find(".gallery-ul"), e), r = 1
            }, 600))
        }
    }), $(".gallery-next").click(function() {
        var r = $(this).closest(".galleryslider");
        if (1 === n) {
            l($(r).find(".gallery-ul"), .6);
            var e = parseInt($(r).attr("data-gw")), i = parseInt($(r).attr("data-pos"));
            a($(r).find(".gallery-ul"), e - t), i++, $(r).attr("data-pos", i);
            var s = parseInt($(r).find(".gallery-ul li").eq(i - 1).find("img").css("height"));
            $(r).find(".gallery-inner").css("height", s + "px"), e = t - i * t, $(r).attr("data-gw", e), i === parseInt($(r).find(".gallery-ul").children().length) && (n = 0, setTimeout(function() {
                l($(r).find(".gallery-ul"), 0), i = 2, $(r).attr("data-pos", i), e = t - i * t, $(r).attr("data-gw", e), a($(r).find(".gallery-ul"), e), n = 1
            }, 600))
        }
    })
});




