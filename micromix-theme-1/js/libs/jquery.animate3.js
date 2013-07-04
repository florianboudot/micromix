/*!
 * jQuery animate3 - CSS3 transitions and transformations
 */

(function ($) {
    "use strict";
    var debug = false;

    var _transition;
    var _transitionDelay;
    var _transform;
    var _transformOrigin;
    var _transform3d;
    var _transitionend;




    //since we need Modernizr, should test it before execute the following stuff
    var init = function () {
        if (debug)console.warn('init');
        if(window.Modernizr == undefined){
            setTimeout(init,5);
        }
        else{
            _transition = Modernizr.csstransitions;
            _transitionDelay = _transition;
            _transform = Modernizr.csstransforms;
            _transformOrigin = _transform;
            _transform3d = Modernizr.csstransforms3d;

            var transEndEventNames = {
                'WebkitTransition' : 'webkitTransitionEnd',
                'MozTransition'    : 'transitionend',
                'OTransition'      : 'oTransitionEnd',
                'msTransition'     : 'MSTransitionEnd',
                'transition'       : 'transitionend'
            };
            _transitionend = transEndEventNames[ Modernizr.prefixed('transition') ];
        }

    };
    init();

    var CUBIC_BEZIER_OPEN = 'cubic-bezier(',
        CUBIC_BEZIER_CLOSE = ')';

    // ## $.cssEase
    // List of easing aliases that you can use with `$.fn.transition`.
    var _getease = function (type) {
//        if (debug)console.info('_getease', pm.manager.timing.now());
        var ease = _ease[type];
        return ease ? ease : '';
    };
    var _ease = {
        _default:'ease',
        'in':'ease-in',
        out:'ease-out',
        'in-out':'ease-in-out',
        snap:'cubic-bezier(0,1,.5,1)',
        easeInQuad:CUBIC_BEZIER_OPEN + '0.550, 0.085, 0.680, 0.530' + CUBIC_BEZIER_CLOSE,
        easeInCubic:CUBIC_BEZIER_OPEN + '0.550, 0.055, 0.675, 0.190' + CUBIC_BEZIER_CLOSE,
        easeInQuart:CUBIC_BEZIER_OPEN + '0.895, 0.030, 0.685, 0.220' + CUBIC_BEZIER_CLOSE,
        easeInQuint:CUBIC_BEZIER_OPEN + '0.755, 0.050, 0.855, 0.060' + CUBIC_BEZIER_CLOSE,
        easeInSine:CUBIC_BEZIER_OPEN + '0.470, 0.000, 0.745, 0.715' + CUBIC_BEZIER_CLOSE,
        easeInExpo:CUBIC_BEZIER_OPEN + '0.950, 0.050, 0.795, 0.035' + CUBIC_BEZIER_CLOSE,
        easeInCirc:CUBIC_BEZIER_OPEN + '0.600, 0.040, 0.980, 0.335' + CUBIC_BEZIER_CLOSE,
        easeInBack:CUBIC_BEZIER_OPEN + '0.600, -0.280, 0.735, 0.045' + CUBIC_BEZIER_CLOSE,
        easeOutQuad:CUBIC_BEZIER_OPEN + '0.250, 0.460, 0.450, 0.940' + CUBIC_BEZIER_CLOSE,
        easeOutCubic:CUBIC_BEZIER_OPEN + '0.215, 0.610, 0.355, 1.000' + CUBIC_BEZIER_CLOSE,
        easeOutQuart:CUBIC_BEZIER_OPEN + '0.165, 0.840, 0.440, 1.000' + CUBIC_BEZIER_CLOSE,
        easeOutQuint:CUBIC_BEZIER_OPEN + '0.230, 1.000, 0.320, 1.000' + CUBIC_BEZIER_CLOSE,
        easeOutSine:CUBIC_BEZIER_OPEN + '0.390, 0.575, 0.565, 1.000' + CUBIC_BEZIER_CLOSE,
        easeOutExpo:CUBIC_BEZIER_OPEN + '0.190, 1.000, 0.220, 1.000' + CUBIC_BEZIER_CLOSE,
        easeOutCirc:CUBIC_BEZIER_OPEN + '0.075, 0.820, 0.165, 1.000' + CUBIC_BEZIER_CLOSE,
        easeOutBack:CUBIC_BEZIER_OPEN + '0.175, 0.885, 0.320, 1.275' + CUBIC_BEZIER_CLOSE,
        easeInOutQuad:CUBIC_BEZIER_OPEN + '0.455, 0.030, 0.515, 0.955' + CUBIC_BEZIER_CLOSE,
        easeInOutCubic:CUBIC_BEZIER_OPEN + '0.645, 0.045, 0.355, 1.000' + CUBIC_BEZIER_CLOSE,
        easeInOutQuart:CUBIC_BEZIER_OPEN + '0.770, 0.000, 0.175, 1.000' + CUBIC_BEZIER_CLOSE,
        easeInOutQuint:CUBIC_BEZIER_OPEN + '0.860, 0.000, 0.070, 1.000' + CUBIC_BEZIER_CLOSE,
        easeInOutSine:CUBIC_BEZIER_OPEN + '0.445, 0.050, 0.550, 0.950' + CUBIC_BEZIER_CLOSE,
        easeInOutExpo:CUBIC_BEZIER_OPEN + '1.000, 0.000, 0.000, 1.000' + CUBIC_BEZIER_CLOSE,
        easeInOutCirc:CUBIC_BEZIER_OPEN + '0.785, 0.135, 0.150, 0.860' + CUBIC_BEZIER_CLOSE,
        easeInOutBack:CUBIC_BEZIER_OPEN + '0.680, -0.550, 0.265, 1.550' + CUBIC_BEZIER_CLOSE

    };

    var _empty = function () {/*empty*/};

    var _ontransitionend = function (e) {
//        if (debug)console.error(this, '_ontransitionend');
//        if (debug)console.error('______pm.manager.timing.now', pm.manager.timing.now());
        var $item = $(this);
        if(!e.originalEvent.propertyName in $item.data('animate3_cssproperty')){
            return false;
        }
        $item.css('transition', '');
        var callback = $item.data('animate3_callback');

        var istransform = $item.data();
        if(istransform.animate3_istransform){
            var left = $item.data('_animate3_oldleft');
            var top = $item.data('_animate3_oldtop');
            top = top ? top : 0;
            left = left ? left : 0;
            $item.css({left:left,top:top,transform:''}).data('animate3_istransform', false)
        }

        callback = callback ? callback : _empty;
        callback.apply(this, arguments);
        $.removeData($item, 'animate3_callback');
        $.removeData($item, 'animate3_cssproperty');

    };


    //todo write docs
    //todo add an option to bypass transition if needed
    //todo : manage height animation between 'auto' and 'px'

    $.fn.animate3 = function (properties, paramoptions) {
//        if (debug)console.info('____________________________ ____________________________');
        var $item = this;
        var delay = 0;
        var queue = true;
        var duration = 250;
        var easing = '_default';
        var _properties = properties;
        var dotransform = paramoptions.dotransform ? true : false;
//        if (debug)console.error('paramoptions', paramoptions, paramoptions.dotransform);
        var options = {
            duration:duration,
            easing:easing,
            complete:_empty
        };
        $.extend(options, paramoptions);
//        if (debug)console.info('OPTIONS', options);
        $item.data('animate3_istransform', false);

        if(_transition){
            var animduration = options.duration;
            var _prop = '';
            if(animduration){

                duration = toMS(animduration);


                var _ease = options.easing;
                var _callback = options.complete;
                var animease = _ease ? ' ' + _getease(_ease) : '';
                var isleft = 'left' in _properties;
                var istop = 'top' in _properties;
                var _top;
                var _left;

                // if we have at least left or top, we use translate
                if(_transition && dotransform && (isleft || istop)){
//                    if (debug)console.error('animate3_istransform', _transition, dotransform, isleft, istop);
                    $item.data('animate3_istransform', true);
                    _top = _properties['top'];
                    _left = _properties['left'];
                    var actualleft = $item.css('left');
                    var actualtop = $item.css('top');
                    if(_left != undefined){
                        $item.data('_animate3_oldleft', _left).css('left', '');
                    }
                    else{
                        _left = 0;
                    }
                    if(_top != undefined){
                        $item.data('_animate3_oldtop', _top).css('top', '');
                    }
                    else{
                        _top = 0;
                    }
                    _properties['transform'] = pm.base.translate(_left, _top);

                    //todo add preserve 3D
                    $item.css({left:0,top:0,transform:pm.base.translate(actualleft,actualtop)});

                    delete _properties['left'];
                    delete _properties['top'];

                }

                for(var key in _properties){
                    var _key = key.objectcsstocssstring();
                    _key = _key.replace(/(transform)/g, pm.base.css_vendor_prefix + '$1');
                    _prop += _key + ' ' + duration + animease + ',';
                }
                _prop = _prop.slice(0,-1);

            }
            $item.data('animate3_cssproperty',_properties).off(_transitionend, _ontransitionend).one(_transitionend, _ontransitionend);
            if(_callback){

                $item.data('animate3_callback', _callback);

            }

            //BIOHAZARDOUNESS a timeout is need, otherwise, browser execute the properties before transition
            setTimeout(function(){
                if(_prop != ''){
                    $item.css('transition', _prop);
                }
                $item.css(_properties);
            },0);

        }
        else{

            $item.animate(_properties, paramoptions);

        }


        return this;
    };


    // ### unit(number, unit)
    // Ensures that number `number` has a unit. If no unit is found, assume the
    // default is `unit`.
    //
    //     unit(2, 'px')          //=> "2px"
    //     unit("30deg", 'rad')   //=> "30deg"
    //
    function unit(i, units) {
        if ((typeof i === "string") && (!i.match(/^[\-0-9\.]+$/))) {
            return i;
        } else {
            return "" + i + units;
        }
    }

    // ### toMS(duration)
    // Converts given `duration` to a millisecond string.
    //
    //     toMS('fast')   //=> '400ms'
    //     toMS(10)       //=> '10ms'
    //
    function toMS(duration) {
        var i = duration;

        // Allow for string durations like 'fast'.
        if ($.fx.speeds[i]) {
            i = $.fx.speeds[i];
        }

        return unit(i, 'ms');
    }

    // Export some functions for testable-ness.
//    $.transit.getTransitionValue = getTransition;
})(jQuery);
