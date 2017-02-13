
(function($) {
    'use strict';

    /* Long Shadow --------------------------------------- */

    flat_long_shadow('.site-title', '.site-branding', 140, -8);
    flat_long_shadow('.site-logo', '.site-branding', 240, -8);
    flat_long_shadow('.featured-image img', '.featured-image', 100, 0);
    flat_long_shadow('.format-quote .post-quote-inner', '.post-quote', 100, -8);
    flat_long_shadow('.format-link .post-link a', '.format-link .post-link', 160, -8);
    flat_long_shadow('.menu-toggle', '.site-branding', 100, -8);

    function flat_long_shadow(box, color, length, light) {

        $(box).each(function() {

            var mthis = $(this);
            var l = 0;
            var t = 0;
            var rgb = $(color).css('backgroundColor');
            var d = light;

            var r1 = parseInt(rgb.substring(4, rgb.indexOf(',')));
            rgb = rgb.substring(rgb.indexOf(',') + 2, rgb.length);
            var r2 = parseInt(rgb.substring(0, rgb.indexOf(',')));
            rgb = rgb.substring(rgb.indexOf(',') + 2, rgb.length);
            var r3 = parseInt(rgb.substring(0, rgb.indexOf(')')));

            r1 = r1 - (18 + d);
            r2 = r2 - (19 + d);
            r3 = r3 - (23 + d);

            var bs = '';
            bs += l + 'px ' + t + 'px 0px rgb(' + r1 + ', ' + r2 + ', ' + r3 + ')';

            for (var r = 0; r < length; r++) {
                l += 1;
                t += 1;
                bs += ', ' + l + 'px ' + t + 'px 0px rgb(' + r1 + ', ' + r2 + ', ' + r3 + ')';
            }
            $(mthis).css('box-shadow', bs);
        });

    }

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

                if (hp > 500) {
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

        $('nav#site-navigation').css('display', 'block');

        $('nav#site-navigation').css('overflow', 'hidden');

        var h = parseInt($('nav#site-navigation').css('height'));
        $('#navigation-header').css('margin-top', '-' + (h) + 'px');
        $('#navigation-header').css('height', h + 'px');

        $('.menu-toggle').attr('data-rel', 'close');

        var winw = $(window).width();

        var duration = 400;

        $(window).resize(function() {

            $('nav#site-navigation').css('overflow', 'hidden');
            h = parseInt($('nav#site-navigation').css('height'));

            $('#navigation-header').css('margin-top', '-' + (h) + 'px');
            $('#navigation-header').css('height', h + 'px');


            $('.menu-toggle').attr('data-rel', 'close');

            winw = $(window).width();
        });

        $('.menu-toggle').click(function() {
            if ($('nav#site-navigation').find('li').length > 0) {

                if ($('.menu-toggle').attr('data-rel') === 'close') {

                    $('#navigation-header').animate({marginTop: 0 + 'px'}, {duration: duration, queue: false});

                    if (winw < 900) {
                        $('.menu ul').animate({left: 30 + 'px'}, {duration: duration + 400, queue: false});
                        $('nav#site-navigation').css('overflow', 'hidden');
                    } else {
                        $('.menu ul').css('left', '');
                        $('nav#site-navigation').css('overflow', '');
                    }
                    $('.menu-toggle').attr('data-rel', 'open');

                } else if ($('.menu-toggle').attr('data-rel') === 'open') {

                    $('#navigation-header').animate({marginTop: '-' + (h) + 'px'}, {duration: duration, queue: false, complete: function() {
                            $('nav#site-navigation').css('overflow', 'hidden');
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