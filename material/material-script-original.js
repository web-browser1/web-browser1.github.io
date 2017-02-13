
(function($) {
    'use strict';



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


        var addv = radius - 10;

        $(c1).animate({"r": radius}, {
            duration: 350,
            step: function(val) {
                c1.attr("r", (val + addv));
            }
        });

        var c2 = $(box).find(".circle-2");

        c2.attr('cx', setX);
        c2.attr('cy', setY);


        $(c2).animate({"r": (radius - 5)}, {
            duration: 350,
            step: function(val) {

                c2.attr("r", val);
            }
        });


    });



    /* Menu Btn --------------------------------------- */


    $('.main-navigation .menu li a').on('click', function(e) {
        var a = $(this);

        $(a).toggleClass('shadow');
        setTimeout(function() {

            $(a).toggleClass('shadow');

        }, 500);

    });








    /* Menu Btn Has Children UL --------------------------------------- */

    $('.main-navigation .menu > .menu-item-has-children a').on('click', function(e) {

        $(this).closest('li').find('ul').css('margin-top', '0');

    });



    $('.main-navigation .menu > .menu-item-has-children > ul').each(function(index) {

        var tc = $(this).find('ul');
        $(tc).css('display', 'none');


        var t = $(this);
        var h = $(t).height();
        $(t).css('margin-top', '-' + (h + 16) + 'px');

        setTimeout(function() {
            $(t).css('position', 'relative');
        }, 100);


        $(tc).css('display', 'block');

        var hc = $(tc).height();
        $(tc).css('margin-top', '-' + (hc + 16) + 'px');

        setTimeout(function() {

            $(tc).css('position', 'relative');
        }, 100);


    });





    $('.theme-info .menu-social li').each(function(index) {
        $(this).addClass('content-pa');
    });

    $('.main-navigation .menu li').each(function(index) {
        $(this).addClass('content-p');
    });

    /* Menu Trigger --------------------------------------- */

    $('.menu-toggle a').on('click', function(e) {
        e.preventDefault();


        $('body').toggleClass('open-navigation');


        if ($('body').hasClass('open-navigation')) {

        } else {
            
        }

    });



    /* Contents --------------------------------------- */









    /* Sidebar Columns --------------------------------------- */

    $('#primary').ready(function() {
        $('.hentry').each(function(index) {

            if (index % 2 === 0) {
                $('.hentry-col-1').append($(this).detach());
            } else {
                $('.hentry-col-2').append($(this).detach());
            }
        });

    });



    /* Sidebar Columns --------------------------------------- */

    $('#secondary').ready(function() {
        $('.widget').each(function(index) {

            if (index % 2 === 0) {
                $('.sidebar-col-1').append($(this).detach());
            } else {
                $('.sidebar-col-2').append($(this).detach());
            }
        });

    });

    /* Tag Cloud Reset --------------------------------------- */

    $('.tagcloud>a').attr('style', '');

    /* Content Limit --------------------------------------- */

    $('.site-main .content-limit').ready(function() {

        $('.content-limit').each(function() {

            var hp = 0;
            var on = 0;

            $(this).children().each(function(index) {

                var h = parseInt($(this).css('height'));
                hp += h;

                if (hp > 200) {
                    $(this).css('display', 'none');
                    if (on === 0) {
                        on = 1;
                    }
                }
                if (on === 1) {
                    var nh = parseInt($(this).closest('.content-limit').children().eq(index - 1).css('height'));
                    if (nh < 100) {
                        $(this).closest('.content-limit').children().eq(index - 1).css('display', 'none');
                    }
                    on = 2;
                }

            });

        });
    });

    /* Gallery Slider --------------------------------------- */

    $('.galleryslider').ready(function() {
        var w = 0;

        $('.hentry .galleryslider').each(function() {

            var gallery = $(this);

            $(gallery).find('.gallery-inner').css('overflow', 'hidden');
            $(gallery).find('.gallery-inner').css('position', 'relative');

            $(gallery).find('.gallery-ul').css('width', (parseInt($('.gallery-ul').children().length) + 3) + '00%');

            flat_gallery_transition($(gallery).find('.gallery-ul'), 0.6);

            $(gallery).find('.gallery-ul li').css('float', 'left');
            $(gallery).find('.gallery-ul li').css('display', 'block');

            if ($(gallery).find('.gallery-ul').find('.clone').length < 2) {

                var first = $(gallery).find('.gallery-ul').children().last().clone();
                var last = $(gallery).find('.gallery-ul').children().first().clone();

                $(first).addClass('clone');
                $(last).addClass('clone');

                $(gallery).find('.gallery-ul').append(last);
                $(gallery).find('.gallery-ul').prepend(first);
            }

            var pos = parseInt($(gallery).attr('data-pos'));
            var gw = parseInt($(gallery).attr('data-gw'));

            w = parseInt($(gallery).find('.gallery-inner').css('width'));

            $(gallery).find('.gallery-ul li').css('width', w + 'px');

            gw = (w - ((pos) * w));

            $(gallery).attr('data-gw', gw);

            flat_gallery_transform($(gallery).find('.gallery-ul'), gw);

            var h = parseInt($(gallery).find('.gallery-ul li').eq(pos - 1).find('img').css('height'));
            $(gallery).find('.gallery-inner').css('height', h + 'px');

        });

        $(window).resize(function() {
            resize();
        });

        setTimeout(function() {
            resize();
        }, 1000);

        resize();

        function resize() {
            $('.galleryslider').each(function() {
                var gallery = $(this);

                var pos = parseInt($(gallery).attr('data-pos'));

                w = parseInt($(gallery).find('.gallery-inner').css('width'));

                $(gallery).find('.gallery-ul li').css('width', w + 'px');

                flat_gallery_transition($(gallery).find('.gallery-ul'), 0);

                var gw = (w - ((pos) * w));

                $(gallery).attr('data-gw', gw);

                flat_gallery_transform($(gallery).find('.gallery-ul'), gw);

                var h = parseInt($(gallery).find('.gallery-ul li').eq(pos - 1).find('img').css('height'));
                $(gallery).find('.gallery-inner').css('height', h + 'px');

            });

        }


        var prev = 1;
        var next = 1;

        $('.gallery-prev').click(function() {
            var gallery = $(this).closest('.galleryslider');
            if (prev === 1) {

                flat_gallery_transition($(gallery).find('.gallery-ul'), 0.6);

                var gw = parseInt($(gallery).attr('data-gw'));
                var pos = parseInt($(gallery).attr('data-pos'));

                flat_gallery_transform($(gallery).find('.gallery-ul'), (gw + w));

                pos--;
                $(gallery).attr('data-pos', pos);
                var h = parseInt($(gallery).find('.gallery-ul li').eq(pos - 1).find('img').css('height'));
                $(gallery).find('.gallery-inner').css('height', h + 'px');

                gw = (w - ((pos) * w));
                $(gallery).attr('data-gw', gw);
                if (pos === 1) {
                    prev = 0;
                    setTimeout(function() {
                        flat_gallery_transition($(gallery).find('.gallery-ul'), 0);
                        pos = parseInt($(gallery).find('.gallery-ul').children().length) - 1;
                        $(gallery).attr('data-pos', pos);
                        gw = (w - ((pos) * w));
                        $(gallery).attr('data-gw', gw);
                        flat_gallery_transform($(gallery).find('.gallery-ul'), gw);
                        prev = 1;
                    }, 600);
                }

            }
        });


        $('.gallery-next').click(function() {
            var gallery = $(this).closest('.galleryslider');
            if (next === 1) {

                flat_gallery_transition($(gallery).find('.gallery-ul'), 0.6);

                var gw = parseInt($(gallery).attr('data-gw'));
                var pos = parseInt($(gallery).attr('data-pos'));

                flat_gallery_transform($(gallery).find('.gallery-ul'), (gw - w));

                pos++;
                $(gallery).attr('data-pos', pos);
                var h = parseInt($(gallery).find('.gallery-ul li').eq(pos - 1).find('img').css('height'));
                $(gallery).find('.gallery-inner').css('height', h + 'px');

                gw = (w - ((pos) * w));
                $(gallery).attr('data-gw', gw);
                if (pos === parseInt($(gallery).find('.gallery-ul').children().length)) {
                    next = 0;
                    setTimeout(function() {
                        flat_gallery_transition($(gallery).find('.gallery-ul'), 0);
                        pos = 2;
                        $(gallery).attr('data-pos', pos);
                        gw = (w - ((pos) * w));
                        $(gallery).attr('data-gw', gw);
                        flat_gallery_transform($(gallery).find('.gallery-ul'), gw);
                        next = 1;
                    }, 600);
                }
            }

        });

        function flat_gallery_transition(element, duration) {
            $(element).css('transition', duration + 's');
            $(element).css('-webkit-transition', duration + 's');
            $(element).css('-moz-transition', duration + 's');
            $(element).css('-ms-transition', duration + 's');
            $(element).css('-o-transition', duration + 's');
        }

        function flat_gallery_transform(element, left) {
            $(element).css('transform', ' translate3d(' + left + 'px, 0px, 0px)');
            $(element).css('-webkit-transform', ' translate3d(' + left + 'px, 0px, 0px)');
            $(element).css('-moz-transform', ' translate3d(' + left + 'px, 0px, 0px)');
            $(element).css('-ms-transform', ' translate3d(' + left + 'px, 0px, 0px)');
            $(element).css('-o-transform', ' translate3d(' + left + 'px, 0px, 0px)');
        }

    });

    /* Menu Toggle --------------------------------------- */

    $('nav#site-navigation').ready(function() {







        var h = parseInt($('nav#site-navigation').css('height'));
        h = h + 120;

        $('.menu-toggle').attr('data-rel', 'close');

        var winw = $(window).width();

        var duration = 400;

        $(window).resize(function() {


            $('.menu-toggle').attr('data-rel', 'close');

            winw = $(window).width();
        });

        $('.menu-toggle').click(function() {
            if ($('nav#site-navigation').find('li').length > 0) {

                if ($('.menu-toggle').attr('data-rel') === 'close') {



                    if (winw < 900) {

                        $('.menu ul').animate({left: 30 + 'px'}, {duration: duration + 400, queue: false});
                       
                    } else {

                        $('.menu ul').css('left', '');

                    }
                    $('.menu-toggle').attr('data-rel', 'open');

                } else if ($('.menu-toggle').attr('data-rel') === 'open') {

                    $('#navigation-header').animate({marginTop: '0px'},
                    {duration: duration, queue: false, complete: function() {
                            
                        }
                    });

                    if (winw < 900) {
                        $('.menu ul').animate({left: '0px'}, {duration: duration, queue: false});
                    }
                    else {
                        $('.menu ul').css('left', '');
                    }
                    $('.menu-toggle').attr('data-rel', 'close');
                }
            }
        });

    });

})(jQuery);