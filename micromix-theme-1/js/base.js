/* highlight plugin */
$.fn.extend({
    highlight: function(search, insensitive, hls_class){
        var regex = new RegExp("(<[^>]*>)|(\\b"+ search.replace(/([-.*+?^${}()|[\]\/\\])/g,"\\$1") +")", insensitive ? "ig" : "g");
        return this.html(this.html().replace(regex, function(a, b, c){
            return (a.charAt(0) == "<") ? a : "<span class=\""+ hls_class +"\">" + c + "</span>";
        }));
    }
});


var $ = jQuery;
var $window = $(window);
var $body = $('body');
jQuery(document).ready(function() {


    /* If search, call highlight */
    if(typeof(hls_query) != 'undefined'){
        $(".result").highlight(hls_query, 1, "hilite");
    }

    var managethisawesomemicromixsound = new Managethesound();
    managethisawesomemicromixsound.initsound();

    var Inactivity = function(options){
        var debug = true;
        var events = options.events;

        var isactiv = false;
        var TIMEOUTactivity = 0;

        var getstatus = function () {
            if (debug)console.info('getstatus');

            return isactiv;

        };

        var _setinactiv = function () {
            if (debug)console.info('_setinactiv');
            isactiv = false;
        };
        var _bindevents = function () {
//            if (debug)console.info('_bindevents');

            clearTimeout(TIMEOUTactivity);
            isactiv = true;
            TIMEOUTactivity = setTimeout(_setinactiv, 10*1000*60); // 10 minutes

        };
        $window.on(events, _bindevents);

        this.isactiv = getstatus;

    };

    var activity = new Inactivity({events:'mousemove keydown click touchend'});

	var stachts = {}; // object
    jQuery('.bt-player a').bind('mousedown',function(){
        var postId = jQuery(this).parents('.bt-player')[0].id;

        if (typeof stachts[postId] == 'undefined') {
           
            stachts[postId] = true;
            
            jQuery.ajax({
                type:'POST',
                data: 'postId='+postId,
                url: '/wp-content/themes/micromix-theme-1/ajax.php',
                success : function(obj) {
                    //console.info('success');
                    //console.info(obj);
                },
                error : function(obj) {
                    //console.error('faiiiiil');
                    //console.error(obj);
                }
            });
        }
    });
});



/* STICK GHETTOBLASTER TO BOTTOM */
var $ghetto = $();
var fixed = true;
var stickGhettoToBottom = function(){
    if($ghetto.length < 1){
        $ghetto = $('.ghettoblaster');
    }

    var windowheight = $window.height();
    var scrollTop = $window.scrollTop();
    var bottomLimit = $body.height() - 214;
    var isLimitReached = windowheight + scrollTop >= bottomLimit;

    if (isLimitReached && fixed){
        $ghetto.addClass('positionabsolute');
        fixed = false;
    }
    else if(!isLimitReached && !fixed) {
        $ghetto.removeClass('positionabsolute');
        fixed = true;
    }
};