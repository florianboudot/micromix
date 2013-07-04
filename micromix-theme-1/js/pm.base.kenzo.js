/* $Id: pm.base.kenzo.js 3023 2012-06-26 12:17:43Z antsan2 $ */
var svn = '$Id: pm.base.kenzo.js 3023 2012-06-26 12:17:43Z antsan2 $';
/* http://ejohn.org/blog/fast-javascript-maxmin/ */
if(typeof(pm) == 'undefined'){var pm = {}}
Array.prototype.max = function() {
    return Math.max.apply(null, this);
};
Array.prototype.min = function(){
    return Math.min.apply(null, this);
};
Array.prototype.keepindex = function(pos){
    var size = this.length;
    var index =  pos >= 0 ? pos%size : size + pos%size;
    return {item:this[index],index:index};
};
Math.random2 = function (min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
Math.rounddec = function (num,numdec){
    var factor = 1;
    for (var i = 0; i < numdec; i++) {
        factor *= 10;
    }
    return Math.round(num * factor) / factor;
};
if (!Array.indexOf) {
    Array.prototype.indexOf = function(obj, start) {
        for (var i = (start || 0); i < this.length; i++) {
            if (this[i] == obj) {
                return i;
            }
        }
        return -1;
    }
}
String.prototype.objectcsstocssstring = function(){
    return this.replace(/[A-Z:]/g,function(match, index, str) {
        return '-' + match.toLowerCase();
    });
};

// Array Remove - By John Resig (MIT Licensed)
if (!Array.remove) {
    Array.prototype.remove = function(from, to) {
        var rest = this.slice((to || from) + 1 || this.length);
        this.length = from < 0 ? this.length + from : from;
        return this.push.apply(this, rest);
    };
}

// Array Random - By Antoine Sanchez
if (!Array.random) {
    Array.prototype.random = function() {
        return this[Math.random2(0, this.length-1)];
    };
}

// Array sort, including specials characters, eg. "états-unis" will not be sortable with native Array.sort()
if (!Array.sort2) {
    Array.prototype.sort2 = function() {
        var aTemp = [];

        // Create new array with reference index (value__i) and cleaning first character (é to e)
        for (var i = 0; i < this.length; i++) {
            aTemp[i] = pm.utils.removeDiacritics(this[i][0]) + this[i].substr(1) + '__' + i;
        }

        // Sorting new array without characters
        aTemp.sort();

        var aOutput = [];

        // Creating output final array from temp array
        for (var j = 0; j < aTemp.length; j++) {
            var originalIndex = parseInt(aTemp[j].split('__')[1], 10);
            aOutput.push(this[originalIndex]);
        }

        delete aTemp;

        return aOutput;
    };
}
(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
    var cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.msCancelAnimationFrame;
    window.cancelAnimationFrame = cancelAnimationFrame;

})();
/* Hex 2 RGB */
function HexToR(h) {
    return parseInt((cutHex(h)).substring(0, 2), 16)
}
function HexToG(h) {
    return parseInt((cutHex(h)).substring(2, 4), 16)
}
function HexToB(h) {
    return parseInt((cutHex(h)).substring(4, 6), 16)
}
function cutHex(h) {
    return (h.charAt(0) == "#") ? h.substring(1, 7) : h
}
var hex2rgb = function (hex, opacity) {//returns rgba(x, x, x, x.x)
    var rgb = hex.replace('#', '').match(/(.{2})/g);
    var i = 3;
    while (i--) {
        rgb[i] = parseInt(rgb[i], 16);
    }
    if (typeof opacity == 'undefined') {
        return 'rgb(' + rgb.join(', ') + ')';
    }
    return 'rgba(' + rgb.join(', ') + ', ' + opacity + ')';
};


/* RGB 2 Hex */
function RGBtoHex(R, G, B) {
    return toHex(R) + toHex(G) + toHex(B)
}
function toHex(N) {
    if (N == null) return "00";
    N = parseInt(N);
    if (N == 0 || isNaN(N)) return "00";
    N = Math.max(0, N);
    N = Math.min(N, 255);
    N = Math.round(N);
    return "0123456789ABCDEF".charAt((N - N % 16) / 16)
        + "0123456789ABCDEF".charAt(N % 16);
}

/* RGB 2 HSL */
function rgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if (max == min) {
        h = s = 0; // achromatic
    }
    else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }

    return [h, s, l];
}

/* HSL 2 RGB */
function hslToRgb(h, s, l) {
    var r, g, b;

    if (s == 0) {
        r = g = b = l; // achromatic
    } else {
        function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return [r * 255, g * 255, b * 255];
}
var declinebordercolors = function (colorlefthex) {
    var R;
    var G;
    var B;

    if(/rgb/.test(colorlefthex)){

        var arrayrgb = /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/.exec(colorlefthex);
        R = arrayrgb[1];
        G = arrayrgb[2];
        B = arrayrgb[3];
        colorlefthex = '#' + RGBtoHex(R,G,B);
    }
    else{
        R = HexToR(colorlefthex);
        G = HexToG(colorlefthex);
        B = HexToB(colorlefthex);
    }

    var colorlefthsl = rgbToHsl(R, G, B);

    var _hue = colorlefthsl[0];
    var _saturation = colorlefthsl[1];
    var _luminosity = colorlefthsl[2];
    var colorrightrgb = hslToRgb(_hue, _saturation, _luminosity * 1.75);
    var colorbottomrgb = hslToRgb(_hue, _saturation, _luminosity * 1.57321);
    var colortoprgb = hslToRgb(_hue, _saturation, _luminosity * 1.34575);

    var colorrighthex = '#' + RGBtoHex(colorrightrgb[0], colorrightrgb[1], colorrightrgb[2]);
    var colorbottomhex = '#' + RGBtoHex(colorbottomrgb[0], colorbottomrgb[1], colorbottomrgb[2]);
    var colortophex = '#' + RGBtoHex(colortoprgb[0], colortoprgb[1], colortoprgb[2]);
    return {top:colortophex, bottom:colorbottomhex, left:colorlefthex, right:colorrighthex};
};
/**
 *
 * @param $elem {Object} jQuery
 * @param ocolors {Object} color of 4 sides
 */
var changeBorderColors = function ($elem, ocolors, duration) {
    var colortop = ocolors.top;
    var colorright = ocolors.right;
    var colorbottom = ocolors.bottom;
    var colorleft = ocolors.left;
    duration = duration ? duration : 300;
    //todo problem with the animation with jquery for old browser

    $elem.animate3({
        'borderTopColor': colortop,
        'borderRightColor': colorright,
        'borderBottomColor': colorbottom,
        'borderLeftColor': colorleft
    },{duration:duration});


//    $elem.css('borderColor', colortop + ' ' + colorright + ' ' + colorbottom + ' ' + colorleft);

};

/**
 * allCookies.setItem(sKey, sValue, vEnd, sPath, sDomain, bSecure)
 *
 * @argument sKey (String): the name of the cookie;
 * @argument sValue (String): the value of the cookie;
 * @optional argument vEnd (Number - finite or Infinity, String, Date object or null): the max-age in seconds (e.g.
 * 31536e3 for a year) or the expires date in GMTString format or in Date Object format; if not specified it will
 * expire at the end of session;
 * @optional argument sPath (String or null): e.g., "/", "/mydir"; if not specified, defaults to the current path
 * of the current document location;
 * @optional argument sDomain (String or null): e.g., "example.com", ".example.com" (includes all subdomains) or
 * "subdomain.example.com"; if not specified, defaults to the host portion of the current document location;
 * @optional argument bSecure (Boolean or null): cookie will be transmitted only over secure protocol as https;
 * @return undefined;
 **/

var allCookies = {
    getItem: function (sKey) {
        if (!sKey || !this.hasItem(sKey)) { return null; }
        return unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));
    },
    setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
        if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return; }
        var sExpires = "";
        if (vEnd) {
            switch (vEnd.constructor) {
                case Number:
                    sExpires = vEnd === Infinity ? "; expires=Tue, 19 Jan 2038 03:14:07 GMT" : "; max-age=" + vEnd;
                    break;
                case String:
                    sExpires = "; expires=" + vEnd;
                    break;
                case Date:
                    sExpires = "; expires=" + vEnd.toGMTString();
                    break;
            }
        }
        document.cookie = escape(sKey) + "=" + escape(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
    },
    removeItem: function (sKey, sPath) {
        if (!sKey || !this.hasItem(sKey)) { return; }
        document.cookie = escape(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sPath ? "; path=" + sPath : "");
    },
    hasItem: function (sKey) {
        return (new RegExp("(?:^|;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
    },
    keys: /* optional method: you can safely remove it! */ function () {
        var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
        for (var nIdx = 0; nIdx < aKeys.length; nIdx++) { aKeys[nIdx] = unescape(aKeys[nIdx]); }
        return aKeys;
    }
};


function getNatural (DOMelement) {
    var img = new Image();
    img.src = DOMelement.src;
    return {width: img.width, height: img.height};
}

var baseKenzo = (function($) {

    var documentlocationhost = document.location.host;
    var debug = /antsan|stecov|flobou|local|192/.test(documentlocationhost);

    var _css_vendor_prefix = '';
    var _transitionend = 'transitionend';
    /*
    if($.browser.webkit || $.browser.chrome){
        _css_vendor_prefix = '-webkit-';
        _transitionend = 'webkitTransitionEnd';
    }
    if($.browser.mozilla){
        _css_vendor_prefix = '-moz-';
        _transitionend = 'transitionend';
    }
    if($.browser.opera){
        _css_vendor_prefix = '-o-';
        _transitionend = 'oTransitionEnd';
    }
    if($.browser.msie){
        _css_vendor_prefix = '-ms-';
        _transitionend = 'MSTransitionEnd';
    }
*/
    var d = document;
    var w = window;
    var $d = $(d);
    var $w = $(w);

    var $scrolled;
    var $body = $('body');
    var $html = $('html');
    if($body.prop('scrollTop')){
        $scrolled = $body;
    }
    else if($html.prop('scrollTop')){
        $scrolled = $html;
    }
    else{

        $scrolled = ($body.css('height',2000).prop('scrollTop', 1).prop('scrollTop') == 1) ? $body : $html;
        $body.css('height', '100%').prop('scrollTop', 0);
    }


    var _is3D = false;
    var _isCSStrsfrm = false; // safari & iOs
    var _isCSSanim = false; // safari & iOs
    var _isios = false;
    var _trsltopen = 'translate' + (_is3D ? '3D(' : '(');
    var _trsltclose = ')';
    var _hasinsertadjc = (!!$body.prop("insertAdjacentHTML"));
    var _istouch = false;
    var _sext = 'mp3';
    var _mext = 'mp4';
    var _animate = (/iphone|ipad/gi).test(navigator.appVersion) ? 'animate3' : 'animate';
    var _historyHTML5 = (history.pushState && typeof window.onpopstate !== 'undefined');
    var _defaultLanguage = 'en';
    var _languagesAvailable = ['en', 'fr']; // TODO : le generer par drupal ?

    var _language = navigator.language ? navigator.language.split('-')[0] : navigator.userLanguage.split('-')[0];

    // Check language in url
    for (var i = 0; i < _languagesAvailable.length; i++) {
        if(document.location.href.indexOf('/' + _languagesAvailable[i] + '/') > -1){
            var lng = _languagesAvailable[i];
            if (_language !== lng) {
                _language = lng;
            }
        }
    }

    var _device = function() {
        if(debug)console.info('_device');

        return /mobile|tablet|desktop/.exec($body[0].className);
    };

    // Check if navigator language available, else use default language (english)
    if(_languagesAvailable.indexOf(_language) === -1){
        _language = _defaultLanguage;
    }

    var _settings = {};
    var _updatesetting = function(){
        if (debug)console.info('_updatesetting');
        _settings = {
            is3D : _is3D,
            isCSStrsfrm : _isCSStrsfrm,
            isCSSanim : _isCSSanim,
            isios : _isios,
            trsltopen : _trsltopen,
            trsltclose : _trsltclose,
            hasinsertadjc : _hasinsertadjc,
            istouch : _istouch,
            sext : _sext,
            mext : _mext,
            animate:_animate,
			historyHTML5: _historyHTML5,
			language: _language,
            languageAvailable: _languagesAvailable,
            device: _device()
        };
        pm.base.settings = _settings;
    };

    var _initbooleanandstuff = function(){
//        _is3D = Modernizr.csstransforms3d && !/ipad/gi.test(navigator.appVersion); //todo if ipad crash when using transform, maybe should use this line
        _is3D = Modernizr.csstransforms3d;
        _isCSStrsfrm = Modernizr.csstransforms;
        _isCSSanim = (/AppleWebKit/gi.test(navigator.appVersion) && navigator.vendor!= "Google Inc."); // safari & iOs + firefox
        _isios = /iphone|ipad/gi.test(navigator.appVersion);
        _trsltopen = 'translate' + (_is3D ? '3D(' : '(');
        _istouch = Modernizr.touch;
        _updatesetting();
        _sizing();
    };

    var _sizing = function () {
        if (debug)console.info('_sizing');
        pm.base.sizing = {
            viewportw: $w.width(),
            viewporth: $w.height()
        };
    };

    var _getdevicemode = function () {
        if (debug)console.info('_getdevicemode');

        var width = pm.base.sizing.viewportw;
        var devicemode = width < 451 ? 'mobile' : width > 960 ? 'desktop' : 'tablet';
        var olddevicemode = pm.base.devicemode;
        pm.base.devicemode = devicemode;
        if(olddevicemode != devicemode){
            $w.trigger({type:'devicemodechange', olddevicemode:olddevicemode, devicemode:devicemode});
        }

    };


    /**
     *
     * @param e touch or mouse event Event
     * @return Object x position x & y
     */
    var _getEventCoord = function(e){
        var issimulate = e.originalEvent == undefined;
        var eventobject = e,
            evttouch = issimulate ? e : (e.originalEvent.touches == undefined) ? e : e.originalEvent,
            rtrn = {};

        var x = eventobject.pageX;
        var y = eventobject.pageY;

        rtrn.x = (x != undefined) ? x : -1;
        rtrn.y = (y != undefined) ? y : -1;

//        pm.debug.log(e);

        if (evttouch.touches != undefined) {

            if(evttouch.touches.length > 1){
                rtrn = [];
                for (var i = 0; i < evttouch.touches.length; i++) {
                    var obj = evttouch.touches[i];
                    rtrn[i] = {};
                    x = obj.pageX;
                    y = obj.pageY;
                    rtrn[i].x = (x != undefined) ? x : -1;
                    rtrn[i].y = (y != undefined) ? y : -1;

                }
            }
            else{
                eventobject = evttouch.touches[0];
                x = eventobject.pageX;
                y = eventobject.pageY;
                rtrn.x = (x != undefined) ? x : -1;
                rtrn.y = (y != undefined) ? y : -1;
            }

        }

        return rtrn;

    };

    /**
     *
     * @param ostart {Object}
     * @param oend {Object}
     */
    var _gesture = function(ostart, oend, dt){

        var _return;
        if(ostart.length == 2 && oend.length == 2){

            var xstart = ostart[0].x - ostart[1].x;
            var ystart = ostart[0].y - ostart[1].y;
            var xend = oend[0].x - oend[1].x;
            var yend = oend[0].y - oend[1].y;
            var dstart = Math.sqrt(xstart * xstart + ystart * ystart);
            var dend = Math.sqrt(xend * xend + yend * yend);
            var delta = dend - dstart;

            var v = delta / dt;

            if(v > 0) _return = 'zoom';
            else if(v < 0) _return = 'unzoom';
            else _return = '';
            //_return = delta > + 50 ? 'zoom' : delta -50 ? 'unzoom' : '';
            //console.log(_return);
        }
        else{
            var deltax = ostart.x - oend.x;
            var deltay = ostart.y - oend.y;
            var whatdeltax = deltax > + 50 ? 'left' : deltax < + -50 ? 'right' : '';
            var whatdeltay = deltay > + 100 ? 'top' : deltay < + -100 ? 'bottom' : '';
            _return = whatdeltax+whatdeltay
        }

        return _return;

    };

    var fakeconsole = false;
    var _console = function(){};

    var _getconsolecolor = function (type) {
//            if (debug)console.info('_getconsolecolor', type);
        var color = 'black';
        switch (type) {
            case 'info':
                color = '#0066CC';
                break;
            case 'error':
                color = '#B63300';
                break;
            case 'warn':
                color = '#FF6600';
                break;
        }
        return color;
    };
    var $tmp = $();
    /**
     *
     * @param type {String}
     * @param args {Array}

     */
    var __console = function (type, args) {
        var color = _getconsolecolor(type);

        if($tmp.length == 0){
            $tmp = $('<div>').css({position:'fixed',top:0,background:'white',padding:'5px',height:150,width:150,overflow:'auto',zIndex:1050,border:'solid 1px #000'});
            $tmp.on('click', function(){this.innerHTML = ''});
            $('body').prepend($tmp);
        }

        var log = '<p style="color:' + color + ';">';
        var argslength = args.length;
        for (var i = 0; i < argslength; i++) {
            log += args[i];
            if(i < argslength-1){
                log += ', ';
            }

        }
        log += '</p>';
        pm.base.addhtml($tmp[0], log);
        $tmp.prop('scrollTop', 99999);

    };
    window._console = __console;

    /* console debug completion */
    if(typeof window.console == 'undefined' || fakeconsole){
        window.console = {
            assert: function assert() {  },
            constructor: function _constructor() {  },
            count: function count() {  },
            debug: function debug() {  },
            dir: function dir() {  },
            dirxml: function dirxml() {  },
            error: function error() { _console('error', arguments) },
            group: function group() {  },
            groupCollapsed: function groupCollapsed() {  },
            groupEnd: function groupEnd() {  },
            info: function info() { _console('info', arguments) },
            log: function log() { _console('log', arguments) },
            markTimeline: function markTimeline() {  },
            profile: function profile() {  },
            profileEnd: function profileEnd() {  },
            time: function time() {  },
            timeEnd: function timeEnd() {  },
            timeStamp: function timeStamp() {  },
            trace: function trace() {  },
            warn: function warn() { _console('warn', arguments) }

        };
    }
    if(fakeconsole){
        _console = __console;
    }


    var _cssopacity = function(i){
        return  $.browser.msie && $.browser.version < 9 ? '-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=' + i*100 + ')";' : 'opacity:' + i + ';'
    };
    /**
     *
     * @param x {Number} left
     * @param y {Number} top
     * @param {Number} [z=0] deep
     * @return {String}
     * @private
     */
    var _csstranslate = function(x,y,z){
//        if(debug)console.info('_csstranslate', x, y, z);
        var _z = (_is3D & !isNaN(z)) ? z : 0;// ~give never 0, !!
        var _x = isNaN(x) ? x : x + 'px';
        var _y = isNaN(y) ? y : y + 'px';
        var value = _is3D ? _x + ',' + _y + ',' + _z:_x + ',' + _y;
        return _trsltopen + value + _trsltclose;
    };
    var _sizevalue = function(distance){
        if(debug)console.info('_sizevalue');
        return typeof(distance) == 'number' ? distance + 'px' : distance
    };

    /**
     *
     * @param domobj {Object} DOM ELEMENT
     * @param shtml {String} HTML String
     */
    var _addhtml = function(domobj,shtml){
//        if(debug)console.info('_addhtml');
        if(_hasinsertadjc){
            domobj.insertAdjacentHTML('beforeend', shtml)
        }
        else{
            domobj.innerHTML += shtml
        }
        return domobj
    };

    var $loaderimgcontainer = $('<div>');
    $body.append($loaderimgcontainer);
    var $loaderprogression = null;

    var _loaderinit = function () {
        if ($loaderimgcontainer === null) {
            $loaderimgcontainer = $('#loader');
            if($loaderimgcontainer.length === 0){
                $loaderimgcontainer = $('<div>').attr('id', 'loader');
                $body.append($loaderimgcontainer);
            }
        }

        if ($loaderprogression === null) {
            $loaderprogression = $loaderimgcontainer.find('.loader-progression');
        }
    };

    var _loadershow = function (callback) {
        if (debug)console.info('_loadershow');

/*
        $loaderprogression.css({
            width: 0
        });
        $loaderimgcontainer.stop().css('display', 'block')[_animate]({opacity:1},{duration:250,complete:callback})
*/

    };
    var _loaderhide = function (callback) {
        if (debug)console.info('_loaderhide — callback ?', typeof(callback));
        var loaderOpacity = $loaderimgcontainer.css('opacity');

        pm.circleloader.dispose();

/*
        if (loaderOpacity == 0) {
            $loaderimgcontainer.hide();
            _postloaderhide(callback);
        } else {
            $loaderimgcontainer[_animate]({opacity:0},{duration:125,complete:function(){$(this).hide();_postloaderhide(callback)}});
        }
*/
    };

    var _oldloaderstep = 0;
    var _loaderprogression = function (ipercent) {
        if (debug)console.info('_loaderprogression');

        _oldloaderstep = ipercent;
        $loaderprogression.stop().animate({width:ipercent + '%'}, {
            duration: 500,
            easing:'linear',
            step: function(i){
//                $loadertextprogression[0].innerHTML = Math.floor(i)
            }
        });

    };

    /**
     *
     * @param $medias {jQuery Object} img or any media that can be loaded (avoid video since old browser don't load them)
     * @param callback {Function}
     * @private call by pm.base.loadermanager
     */
    var _loadermanager = function ($medias, callback, showprogress) {
        if (debug)console.info('_loadermanager');

        showprogress = false; // actually, no progress
//        showprogress = typeof(showprogress) == 'undefined' ? true : showprogress;
/*
        if(showprogress){
            _loaderinit();
        }
*/

        var iloaded = 0;
        var imedialength = $medias.length;
        var count = function (e) {
//            if (debug)console.info('count', this);
            if(e.type == 'error'){
                if (debug)console.warn('loader image error', this);
            }
            var $img = $(this);
            $img.remove();
            iloaded++;
            if(showprogress){
                _loaderprogression(iloaded/imedialength*100);
            }
            if(iloaded == imedialength){
                if (debug)console.info('_loadermanager::count finish', e.type);
                if(showprogress){
                    _loaderhide(callback)
                }
                else{
                    callback();
                }
            }
        };
        if(showprogress){
            _loadershow();
        }

        $medias.each(function(i,o){
            var $ocopy = $(o).clone();
            $ocopy.one('load error', count).hide();
            $loaderimgcontainer.append($ocopy);
        });

    };

    var _postloaderhide = function (callback) {
        if (debug)console.info('_postloaderhide');
        $(this).css('display', 'none').trigger('hided');
        if(typeof(callback) == 'function'){
            callback()
        }
    };

    var _nopointerevents = function($element) {
        $element.bind('click mouseover', function (evt) {
            this.style.display = 'none';
            var x = evt.pageX, y = evt.pageY;
            var under = document.elementFromPoint(x, y);
            this.style.display = '';
            evt.stopPropagation();
            evt.preventDefault();
            $(under).trigger(evt.type);
        });
    };

    var _checkNewsletter = function(){
        if (debug) console.info('_checkNewsletter');
        var $form = $('.form-newsletter');

        $form.each(function(i,o){
            pm.utils.hideLabel($(o));
            var $email = $(o).find('.check-email');

            // clean input on focus
            $email.on('focus',function(){
                $(this).removeClass('error');
            });

            // submit form
            $(o).on('submit', function(){
                var validation  = pm.utils.checkEmailField($email);
                var $response   = $(o).next('.form-ajax-response');
                var formHeight  = $(o).height();

                if (!validation){
                    return false;
                }else{
                    $.ajax({
                        url: $(this).attr('action'),
                        type: $(this).attr('method'),
                        data: $(this).serialize(),
                        dataType: 'json',
                        crossDomain: true,
                        success: function(json) {
                            $(o).hide();
                            $response.html(json.message).css('height',formHeight);
                        },
                        error: function(){
                            $(o).hide();
                            $response.html('Please try again').css('height',formHeight);
                        }
                    });
                }
                return false;
            });
        });
    };

    pm.TimingManager = function () {
        if (debug)console.info('pm.TimingManager');
        var lasttime = new Date();
        var now = function () {
            var _lasttime = lasttime;
            var _nowdate = new Date();
            lasttime = _nowdate;
            return (_nowdate - _lasttime)/1000;
        };

        this.now = now;

    };

    var theeffingpin = function () {
        var e=document.createElement('script');
        e.setAttribute('type','text/javascript');
        e.setAttribute('charset','UTF-8');
        e.setAttribute('src','//assets.pinterest.com/js/pinmarklet.js?r=' + new Date().getTime());
        document.body.appendChild(e);
        return false;
    };

    window.pm = (typeof(window.pm) == 'undefined') ? {} : window.pm;
    window.pm.base = {
        ctx:{path:document.location.pathname},
        geteventcoord: _getEventCoord,
        gesture: _gesture,
        opacity: _cssopacity,
        translate: _csstranslate,
        addhtml: _addhtml,
        updatesetting:_initbooleanandstuff,
        sizing:_sizing,
        devicemode:'',
        settings:_settings,
        css_vendor_prefix:_css_vendor_prefix,
        transitionend:_transitionend,
        loadermanager:_loadermanager,
        loadershow: _loadershow,
        loaderhide: _loaderhide,
        view: { current: null, currentShortName: null, $current: $(), old: null, oldShortName: null, $old: $(), currentSection: null, oldSection: null },
        $loader: $loaderimgcontainer,
        $scrolled : $scrolled,
        sitecolor: typeof(colorframe) == 'string' ? colorframe : '#000000',
        pinterest: theeffingpin
    };

    pm.base.debug = {
        addfntocollection: /stecov|flobou|local|192/.test(documentlocationhost),
        Analytics: /antsan|stecov|flobou|local|192/.test(documentlocationhost),
        Blogmanager: /flobou|stecov|flobou|local|192/.test(documentlocationhost),
        Connexionmanager: /antsan|flobou|local|192/.test(documentlocationhost),
        Contentmanager: /antsan|flobou|local|192/.test(documentlocationhost),
        Footermanager: /stecov|flobou|local|192/.test(documentlocationhost),
        Getters: /stecov|flobou|local|192/.test(documentlocationhost),
        Headermanager: /antsan|stecov|flobou|local|192/.test(documentlocationhost),
        Historymanager: /antsan|stecov|flobou|local|192/.test(documentlocationhost),
        index: /antsan|flobou|stecov|flobou|local|192/.test(documentlocationhost),
        initkenzo: /antsan|stecov|flobou|local|192/.test(documentlocationhost),
        Keymapmanager: /antsan|stecov|flobou|local|192/.test(documentlocationhost),
        Languagemanager: /stecov|flobou|local|192/.test(documentlocationhost),
        Menumanager: /antsan|stecov|flobou|local|192/.test(documentlocationhost),
        Navigationmanager: /antsan|stecov|flobou|local|192/.test(documentlocationhost),
        removefntocollection: /stecov|flobou|local|192/.test(documentlocationhost),
        Resize: /antsan|stecov|flobou|local|192/.test(documentlocationhost),
        Setters: /antsan2|stecov|flobou|local|192/.test(documentlocationhost),
        Sitemanager: /antsan|stecov|flobou|local|192/.test(documentlocationhost),
        Templatemanager: /antsan|stecov|flobou|local|192/.test(documentlocationhost),
        Transitionmanager: /antsan|flobou|local|192/.test(documentlocationhost),
        videomanager: /antsan|stecov|flobou|local|192/.test(documentlocationhost),
        Viewmanager: /antsan|stecov|flobou|local|192/.test(documentlocationhost),
        Widget: /antsan|stecov|flobou|local|192/.test(documentlocationhost)
    };

    return {
        sizing: _sizing,
        getdevicemode: _getdevicemode,
        nopointerevents: _nopointerevents,
        checkNewsletter : _checkNewsletter
    }


})(jQuery);

