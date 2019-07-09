(function ($) {
        'use strict';

        var eagc = {
            init: function () {
                this.stickyHeader();
                this.masonry();
                this.navigationMenu();
                this.slider();
                this.select2();
                this.animations();
            },
            masonry: function () {
                var $container = $('.grid');
                $container.imagesLoaded(function () {
                    var $grid = $('.grid').masonry({
                        itemSelector: '.grid-item',

                    });

                    $('.grid-item .img-wpr> img').Lazy({
                        // your configuration goes here
                        effect: "fadeIn",
                        delay: 5000,
                        effectTime: 5000,
                        threshold: 0,
                        onError: function (element) {
                            console.log('error loading ' + element.data('src'));
                        }
                    });
                });
                

            },
            navigationMenu: function () {
                $('.hamburger').on('click', function () {
                    $('html').toggleClass('no-overflow');
                    $(this).find('.hamburger--line').toggleClass('hamburger--line__x');
                    $(this).next('.nav-right').find('#navigation').slideToggle();
                });
            },
            stickyHeader: function () {
                $(document).scroll(function (e) {
                    var scrollTop = $(document).scrollTop();

                    if (scrollTop > 120) {
                        //console.log(scrollTop);
                        $('.main-header').addClass('sticky');

                    } else {
                        $('.main-header').removeClass('sticky');

                    }
                });
            },
            slider: function () {
                $("#owl-one").owlCarousel({
                    margin: 0,
                    nav: !1,
                    items: 1,
                    dots: !0,
                    loop: !0,
                    autoplay: !0,
                    smartSpeed: 1e3,
                    autoplayTimeout: 1e4,
                    touchDrag: !1,
                    mouseDrag: !1,
                    animateOut: "fadeOut",
                    autoHeight:true
                });
            },
            select2:function(){
               $('select').select2();
            },
            animations:function(){
                AOS.init({
                    easing: 'ease',
                    duration: 1000
                });
            }


        }

        eagc.init();
    }
    (jQuery));