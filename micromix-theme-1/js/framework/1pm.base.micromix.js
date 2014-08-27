/* http://ejohn.org/blog/fast-javascript-maxmin/ */
if(typeof(pm) == 'undefined'){var pm = {}}
Array.prototype.max = function() {
    return Math.max.apply(null, this);
};
Array.prototype.min = function(){
    return Math.min.apply(null, this);
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

(function() {
    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.msCancelAnimationFrame;

})();

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

var basemicroonde = (function($) {

    var documentlocationhost = document.location.host;
    var debug = /antsan|stecov|flobou|local|192/.test(documentlocationhost);

    var d = document;
    var w = window;
    var $d = $(d);
    var $w = $(w);

    var $body = $('body');
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


    };
    var _loaderhide = function (callback) {
        if (debug)console.info('_loaderhide — callback ?', typeof(callback));
        var loaderOpacity = $loaderimgcontainer.css('opacity');

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
     * @param $medias {jQuery} img or any media that can be loaded (avoid video since old browser don't load them)
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

    window.pm = (typeof(window.pm) == 'undefined') ? {} : window.pm;
    window.pm.base = {
        ctx:{path:document.location.pathname},
        loadermanager:_loadermanager,
        loadershow: _loadershow,
        loaderhide: _loaderhide,
        view: { current: null, currentShortName: null, $current: $(), old: null, oldShortName: null, $old: $(), currentSection: null, oldSection: null },
        $loader: $loaderimgcontainer
    };

    pm.base.debug = {
        addfntocollection: /stecov|flobou|local|192/.test(documentlocationhost),
        Analytics: /antsan|stecov|flobou|local|192/.test(documentlocationhost),
        Connexionmanager: /antsan|flobou|local|192/.test(documentlocationhost),
        Contentmanager: /antsan|flobou|local|192/.test(documentlocationhost),
        Getters: /stecov|flobou|local|192/.test(documentlocationhost),
        Historymanager: /antsan|stecov|flobou|local|192/.test(documentlocationhost),
        index: /antsan|flobou|stecov|flobou|local|192/.test(documentlocationhost),
        Navigationmanager: /antsan|stecov|flobou|local|192/.test(documentlocationhost),
        removefntocollection: /stecov|flobou|local|192/.test(documentlocationhost),
        Resize: /antsan|stecov|flobou|local|192/.test(documentlocationhost),
        Setters: /antsan2|stecov|flobou|local|192/.test(documentlocationhost),
        Transitionmanager: /antsan|flobou|local|192/.test(documentlocationhost),
        Viewmanager: /antsan|stecov|flobou|local|192/.test(documentlocationhost)
    };

})(jQuery);

