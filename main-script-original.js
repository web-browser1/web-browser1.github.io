
(function($) {
    'use strict';

    $('.site-menu a').on('click', function() {

        var href = $(this).attr('href');

        var anchor = $(href).offset();

        $('body, html').animate({ scrollTop: anchor.top }, { duration: 500 });

    });

    $('.d-trigger').on('click', function() {
        
         $('body, html').animate({ scrollTop: $('#works').offset().top }, { duration: 500 });
        
        
    });




    setTimeout(function() {

        $('.top-image').addClass('fade');

        $('.image-featured-wb ').addClass('fade');

        $('.image-featured').addClass('fade');

        $('.down-trigger').addClass('show');

        $('.site-content').addClass('show');

    }, 500);

    /* Top Image */


    var imageSection = $('.top-image');

    var imageSectionHeight = imageSection.height();

    scaleTopImage();
    $(window).on('resize', function() {

        scaleTopImage();
    });

    function scaleTopImage() {

        $(window).on('scroll', function() {

            window.requestAnimationFrame(animateImage);
        });

    }

    var scaleSpeed = 0.1;

    var opacitySpeed = 0.4;

    function animateImage() {

        var scrollPrecentage = ($(window).scrollTop() / imageSectionHeight).toFixed(5);

        var minScale = (scrollPrecentage * scaleSpeed);

        var scaleValue = 1 - minScale;

        if ($(window).scrollTop() < imageSectionHeight) {

            imageSection.css({
                '-webkit-transform': 'scale(' + scaleValue + ') translateZ(0)',
                '-moz-transform': 'scale(' + scaleValue + ') translateZ(0)',
                '-ms-transform': 'scale(' + scaleValue + ') translateZ(0)',
                '-o-transform': 'scale(' + scaleValue + ') translateZ(0)',
                'transform': 'scale(' + scaleValue + ') translateZ(0)',
                'opacity': 1 - scrollPrecentage * opacitySpeed

            });

        }

    }

    $('.view-move-ul li').toggleClass('pseudo-one');
    $('.view-title').toggleClass('pseudo-one');
    $('.view-move-ul li .view-image').toggleClass('pseudo-one');


    var move = $('.view-move-ul');

    move.on('click', function() {

        move.toggleClass('move-1');

        setTimeout(function() {

            move.toggleClass('move-2');

            setTimeout(function() {
                $('.view-move-ul li').toggleClass('pseudo-one');
                $('.view-title').toggleClass('pseudo-one');

                move.toggleClass('move-3');
            }, 300);

        }, 500);


    });


    $('.circle-svg a').on("click", function(e) {
        var x = e.pageX;
        var y = e.pageY;

        var clickY = y - $(this).offset().top;
        var clickX = x - $(this).offset().left;
        var box = $(this);
        var setX = parseInt(clickX);
        var setY = parseInt(clickY);

        var radius = $(box).outerWidth() / 2;

        var width = $(box).outerWidth();

        if ($(box).find("svg").length === 0) {

            $(box).append('<svg>\n\
                             <circle class="circle-1" cx="' + setX + '" cy="' + setY + '" r="' + (radius - 10) + '"></circle>\n\
                                    <circle class="circle-2" cx="' + setX + '" cy="' + setY + '" r="' + 0 + '"></circle>\n\
                                    </svg>');

        }

        $(box).find('svg').css('opacity', '1');

        $(box).find('svg').animate({
            opacity: '0',
        }, {duration: 800, queue: false});


        var c1 = $(box).find(".circle-1");

        c1.attr('cx', setX);
        c1.attr('cy', setY);


        var addv = radius - (radius * 0.2);

        $(c1).animate({"r": radius}, {
            duration: 350,
            step: function(val) {
                c1.attr("r", (val + addv));
            }
        });

        var c2 = $(box).find(".circle-2");

        c2.attr('cx', setX);
        c2.attr('cy', setY);


        $(c2).css('height', '100%');

        var addv2 = radius - (radius * 0.6);

        $(c2).animate({"r": (radius - 5)}, {
            duration: 350,
            step: function(val) {

                c2.attr("r", (val + addv2));
            }
        });


    });




    setTimeout(function() {

        $('.site-title').addClass('show');

    }, 500);

    $('.cd-click').on("click", function(e) {
        var x = e.pageX;
        var y = e.pageY;

        var clickY = y - $(this).offset().top;
        var clickX = x - $(this).offset().left;
        var box = $(this);
        var setX = parseInt(clickX);
        var setY = parseInt(clickY);

        if ($(this).find("svg").length === 0) {

            $(this).append('<svg><circle cx="' + setX + '" cy="' + setY + '" r="' + 0 + '"></circle></svg>');

        }

        var c = $(box).find("circle");

        c.attr('cx', setX);
        c.attr('cy', setY);


        $(box).find('circle').animate({"r": $(box).outerWidth()}, {
            duration: 400,
            step: function(val) {
                c.attr("r", val);
            }
        }
        );
    });



})(jQuery);
