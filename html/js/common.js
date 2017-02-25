$(function() {

    'use strict';
    var w = $(window).width();

    //-------------------------------
    //Lang
    //-------------------------------

    var $headerLang = $('.header__lang'),
        $headerLangList = $('.header__lang-list');
    $headerLang.click(function() {
        var $this = $(this);
        if ($this.hasClass('active') == false) {
            $this.addClass('active');
            $headerLangList.slideDown(200);
        } else {
            $this.removeClass('active');
            $headerLangList.slideUp(200);
        }
    });

    //-------------------------------
    //Выключение интерактива при клике по странице
    //-------------------------------

    $(document).on('click', function(e) {
        if (!$(e.target).closest('.header__lang').length) {
            $headerLang.removeClass('active');
            $headerLangList.slideUp(200);
        }
        e.stopPropagation();
    });

    //-------------------------------
    //Меню
    //-------------------------------

    var $headerMenuBtn = $('.header__menu-btn'),
        $headerMenu = $('.header__menu');

    $headerMenuBtn.click(function() {
        var $this = $(this);
        if (!$this.hasClass('active')) {
            $this.addClass('active').html('<span></span>Закрыть');
            $headerMenu.fadeIn(500);
        } else {
            $this.removeClass('active').html('<span></span>Меню');
            $headerMenu.fadeOut(500);
        }
    });
    $headerMenu.on('click', 'a', function() {
        $headerMenuBtn.removeClass('active').html('<span></span>Меню');
        $headerMenu.fadeOut(500);
    });

    //------------------------------------------------------
    //Счетчик времени
    //------------------------------------------------------
    var $registrationCounterBox = $('.registration__counter-box');
    $registrationCounterBox.TimeCircles({
        animation: "ticks",
        circle_bg_color: "#ea0a3a",
        use_background: true,
        fg_width: 0.05,
        bg_width: .8,
        direction: "Clockwise",
        text_size: 0.09,
        number_size: 0.22,
        time: {
            Days: {
                show: true,
                text: "Дней",
                color: "#e6e7f1"
            },
            Hours: {
                show: true,
                text: "Часов",
                color: "#e6e7f1"
            },
            Minutes: {
                show: true,
                text: "Минут",
                color: "#e6e7f1"
            },
            Seconds: {
                show: false
            }
        }
    });
    $(window).resize(function() {
        $registrationCounterBox.TimeCircles().rebuild();
    });

    //---------------------------------------------
    //Видеопопап
    //---------------------------------------------
    $('.popup-youtube').magnificPopup({
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });

    //------------------------------------
    //popup
    //------------------------------------
    $('.popup-with-move-anim').magnificPopup({
        type: 'inline',

        fixedContentPos: false,
        fixedBgPos: true,

        overflowY: 'auto',

        closeBtnInside: true,
        preloader: false,

        midClick: true,
        removalDelay: 300,
        mainClass: 'my-mfp-slide-bottom'
    });



    //---------------------------------
    //Адаптивный слайдер
    //---------------------------------
    var $speakersBox = $(".speakers__box"),
        $speakersItem = $(".speakers__item");

    function speakersCarousel() {
        var w = $(window).width();
        if (w <= 640) {
            $speakersBox.addClass('owl-carousel').owlCarousel({
                loop: false,
                nav: true,
                navText: '',
                autoplayTimeout: 5000,
                autoplay: false,
                smartSpeed: 600,
                responsiveClass: true,
                responsive: {
                    0: {
                        items: 1
                    },
                    361: {
                        items: 2
                    }
                }
            });
            if(w <= 360) {
                $speakersItem.css({
                    'width': '72%',
                    'margin': '0 14%'
                })
            } else if (w > 360 && w < 481) {
                $speakersItem.css({
                    'width': '96%',
                    'margin': '0 2%'
                })
            } else if (w > 480 && w < 641) {
                $speakersItem.css({
                    'width': '76%',
                    'margin': '0 12%'
                })
            }
        } else {
            $speakersBox.removeClass('owl-carousel').trigger('destroy.owl.carousel');
            $speakersItem.removeAttr('style');
        }
    }
    speakersCarousel();
    $(window).resize(function() {
        speakersCarousel();
    });

    //------------------------------------
    //Выравнивание блоков по высоте
    //------------------------------------

    $(".speakers__preview-name").equalHeight();
    $(".direction__item-name").equalHeight();
    $(".direction__item-position").equalHeight();

    //------------------------------------------------
    // Плавный скролл
    //------------------------------------------------

    $('.scroll').click(function(e) {
        e.preventDefault();
        var thisSect = $($(this).attr('href')).offset().top;
        $('html, body').animate({scrollTop: thisSect }, (Math.abs(thisSect - $(window).scrollTop()) * 0.5), 'linear');
    });


    //-------------------------------------
    //Яндекс карта
    //-------------------------------------
    ymaps.ready(function() {
        var myMap = new ymaps.Map('map', {
            center: [55.817883, 37.440213],
            zoom: 15,
            controls: ['zoomControl'],
            behaviors: ["drag", "dblClickZoom", "rightMouseButtonMagnifier", "multiTouch"]
        }, {
            searchControlProvider: 'yandex#search'
        });
        var myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
            hintContent: '',
            balloonContent: ''
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#image',
            // Своё изображение иконки метки.
            iconImageHref: 'img/icon-map.png',
            // Размеры метки.
            iconImageSize: [57, 57],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-29, -57]
        });
        function disableDrag() {
            var w = $(window).width();
            if (w < 768) {
                myMap.behaviors.disable('drag');
            } else {
                myMap.behaviors.enable('drag');
            }
        }
        disableDrag();
        $(window).resize(function() {
            disableDrag();
        });

        myMap.geoObjects.add(myPlacemark);
    });

    //------------------------------------------------------
    //Chrome Smooth Scroll
    //------------------------------------------------------
    try {
        $.browserSelector();
        if ($("html").hasClass("chrome")) {
            $.smoothScroll();
        }
    } catch (err) {

    };

    $("img, a").on("dragstart", function(event) {
        event.preventDefault();
    });
});
