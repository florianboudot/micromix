/**
 * @author manrei
 */
if(typeof(pm) == 'undefined'){var pm = {}}
pm.CircleLoader = function(){

    //todo refactor with some function already here like hextorgb

    var myTimeOut = null;
    var myTimeOutCircle2 = null;
    var myTimeOutCircle3 = null;
    var delay = 200;
    var colorCircles = "#0033FF";
    var colorRGB = '';
    var colorRGBAIn = colorRGB + ",1)";
    var colorRGBAOut = colorRGB + ",0)";
    var isrunning = false;

    var $loader = $('<div>').addClass('circle-ctn').css('opacity', 0).hide();
    var $circle = $('<div>').attr('id', 'circle1').addClass('circle');
    var $circle2 = $('<div>').attr('id', 'circle2').addClass('circle');
    var $circle3 = $('<div>').attr('id', 'circle3').addClass('circle');
    $loader.append($circle);
    $loader.append($circle2);
    $loader.append($circle3);
    $('body').append($loader);
    var $circles = $loader.find('.circle');


    var setColor = function (color){
        colorCircles = color;
//        var allrgb = hexToRgb(colorCircles);
//        colorRGB = "rgb("+ allrgb.r + "," + allrgb.g + "," + allrgb.b + ')';
        $circles.css('borderColor', color)
    };

    var startAnim = function (){
        if(!isrunning){
            isrunning = true;
            $loader.css({height: 48, width:48}).show().animate3({opacity: 1},{duration:500/*,complete:function(){
                $(this).animate({height: 100, width:100},{duration:5000});
            }*/});
            launchFadeInEffect();
        }
    };
    var dispose =  function (){
        clearTimeout(myTimeOut);
        clearTimeout(myTimeOutCircle2);
        clearTimeout(myTimeOutCircle3);
        $loader.animate3({opacity: 0},{duration:250,complete:function(){$(this).hide()}});
        isrunning = false;
    };

    var launchFadeInEffect = function (){
        fadeIn($circle);
        myTimeOutCircle2 = setTimeout(function(){fadeIn($circle2)},delay);
        myTimeOutCircle3 = setTimeout(function(){fadeIn($circle3)},delay*2);

        myTimeOut = setTimeout(launchFadeOutEffect,delay*3);
    };

    var launchFadeOutEffect = function (){
        fadeOut($circle);
        myTimeOutCircle2 = setTimeout(function(){fadeOut($circle2)},delay);
        myTimeOutCircle3 = setTimeout(function(){fadeOut($circle3)},delay*2);
        myTimeOut = setTimeout(launchFadeInEffect,delay*3);
    };

    var fadeIn = function ($el){
        $el.css('opacity', 1);
    };

    var fadeOut = function ($el){
        $el.css('opacity', 0);
    };

    /**
     * @deprecated
     * @param hex
     * @return {Object}
     */
    var hexToRgb = function (hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    };

    setColor(colorCircles);

    this.dispose = dispose;
    this.start = startAnim;
    this.setcolor = setColor;
};
