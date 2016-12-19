'use strict';

jQuery.fn.roulette = function (settings) {
    var config = {
        speed: 750
    };
    if (settings) $.extend(config, settings);
    var auto = config.auto;
    var click = true;
    var slide = $(this);
    var count = $(slide).find('li').length;
    config.mini ? count++ : count;

    if (config.mini) {
        if (count <= config.visible + 1)
            $(config.nextSlideControl + ', ' + config.prevSlideControl).hide();
    } else {
        if (count <= config.visible)
            $(config.nextSlideControl + ', ' + config.prevSlideControl).hide();
    }

    var slideLiWidth, slideUlWidth, slideMaxMargin, slideNewMargin = 0;
    slideLiWidth = $(slide).find('ul li').width() + config.liMargin;
    $(slide).find('ul').width(count * slideLiWidth);
    slideUlWidth = $(slide).find('ul').width();
    slideMaxMargin = config.mini ? slideUlWidth - config.visible * slideLiWidth : slideUlWidth;

    $(window).resize(function () {
        slideLiWidth = $(slide).find('ul li').width() + config.liMargin;
        $(slide).find('ul').width(count * slideLiWidth);
        slideUlWidth = $(slide).find('ul').width();
        slideMaxMargin = config.mini ? slideUlWidth - config.visible * slideLiWidth : slideUlWidth;
    });

    if (config.navigation) {
        $(slide).find('.b-nav');
        for (i = 0; i < count; i++)
            $(slide).find('.b-nav').append('<a class="b-nav__item" href="#"></a>');
    }


    // Функция прокручивающая слайды
    function doAnimate(object, value, slideIndex) {
        if (slideIndex == 0) value = 0;
        $(object).stop().animate({
            marginLeft: slideIndex ? -value * slideIndex + 'px' : -value + 'px'
        }, config.speed, function () {
            click = true;
        });
    };


    // Прокрутка больших слайдов
    $(config.nextSlideControl).click(function (e) {
        e.preventDefault();

        if (click == true) {
            click = false;

            slideMargin = parseInt($(slide).find('ul').css('margin-left'));
            slideMargin = slideMargin < 0 ? slideMargin * (-1) : slideMargin;
            slideNewMargin = slideMargin + slideLiWidth;

            if (slideNewMargin < slideMaxMargin && slideNewMargin != slideMaxMargin)
                doAnimate($(slide).find('ul'), slideNewMargin);
            else
                doAnimate($(slide).find('ul'), 0);
        }
    });

    $(config.navSlideControl).click(function (e) {
        e.preventDefault();

        doAnimate($(slide).find('ul'), $(this).index() * slideLiWidth);
    });

    $(config.prevSlideControl).click(function (e) {
        e.preventDefault();

        if (click == true) {
            click = false;

            slideMargin = parseInt($(slide).find('ul').css('margin-left'));
            slideMargin = slideMargin < 0 ? slideMargin * (-1) : slideMargin;
            slideNewMargin = slideMargin - slideLiWidth;

            if (slideMargin == 0)
                doAnimate($(slide).find('ul'), (slideMaxMargin - slideLiWidth));
            else
                doAnimate($(slide).find('ul'), slideNewMargin);
        }
    });

    if (auto) {
        window.setInterval(function () {
            if (config.direction == 'next')
                $(config.nextSlideControl).trigger('click');
            else
                $(config.prevSlideControl).trigger('click');
        }, config.interval);
    }
};
