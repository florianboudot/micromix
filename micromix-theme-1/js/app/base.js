
var $ = jQuery;


/**
 * HIGHLIGHT SEARCH RESULTS plugin
 */
$.fn.extend({
    highlight: function(search, insensitive, hls_class){
        var regex = new RegExp("(<[^>]*>)|(\\b"+ search.replace(/([-.*+?^${}()|[\]\/\\])/g,"\\$1") +")", insensitive ? "ig" : "g");
        return this.html(this.html().replace(regex, function(a, b, c){
            return (a.charAt(0) == "<") ? a : "<span class=\""+ hls_class +"\">" + c + "</span>";
        }));
    }
});


var $window = $(window);
var $body = $('body');
var micromix = {};
$(document).ready(function() {
    /* If search, call highlight */
    if(typeof(hls_query) != 'undefined'){
        $(".result").highlight(hls_query, 1, "hilite");
    }

    micromix.managethisawesomemicromixsound = new Managethesound();
    micromix.managethisawesomemicromixsound.initsound();

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


    // STATS
    // play +=1 in the statistics
	var stachts = {}; // object
    jQuery('.bt-player a').bind('mousedown',function(){
        var postId = jQuery(this).parents('.bt-player')[0].id;

        if (typeof stachts[postId] == 'undefined') {
           
            stachts[postId] = true;
            
            jQuery.ajax({
                type:'POST',
                data: 'postId='+postId,
                url: theme_path + '/ajax.php', //todo make this path dynamic, this won't work if we change the theme folder name
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

    /* -- INIT TAG WALL --  */
    var initTagWall = function(){

        var sketcher = null;
        var $canvas = $("#tagwall");
        var context = $canvas[0].getContext('2d');
        var brush = new Image();

        // fix cursor on canvas
        $canvas.on('hover mousedown onselectstart', function(e){
            e.preventDefault();
            e.stopPropagation();
            e.target.style.cursor = 'url("'+theme_path+'/img/spraycan.png"), auto';
        });

        //init sketcher
        var initSketcker = function(){
            brush.src = theme_path+'/img/spray-red.png';
            brush.onload = function(){
                sketcher = new Sketcher("tagwall", brush );
            };
        };

        // clear Canvas
        var clearCanvas = function(){
            sketcher.clear();
            localStorage.removeItem('savedcanvas');
        };

        // save Canvas
        var saveCanvas = function(){
            var imgBase64 = sketcher.toDataURL();
            localStorage.setItem("savedcanvas",imgBase64);
        };

        // load Saved Canvas
        var loadSavedCanvas = function(){
            var imgBase64 = localStorage.getItem("savedcanvas");
            if (imgBase64){
                var imageObj = new Image();
                imageObj.src = imgBase64;
                imageObj.onload = function() {
                    context.drawImage(this, 0, 0);
                };
            }
        };

        // spray sound
        var spraySound = function(){
            var $tagwall = $('#tagwall');
            var spraysound = document.getElementById('spraysound');

            // looping
            spraysound.addEventListener('ended', function(){
                this.currentTime = 0;
                this.play();
            });

            $tagwall.on('mousedown',function(){
                spraysound.play();
            });

            $tagwall.on('mouseup',function(){
                spraysound.currentTime = 0;
                spraysound.pause();
            });
        };

        // change Brush Color
        var changeBrushColor = function(){
            $('.spray-colors li').each(function(i,o){
                $(o).on('click',function(){
                    var id = $(o).attr('id');
                    brush.src = theme_path+'/img/'+id+'.png';

                    if (id === 'spray-erase'){
                        // erase mode
                        context.globalCompositeOperation = 'destination-out';
                    }else{
                        context.globalCompositeOperation = 'source-over';
                    }
                })
            });
        };

        loadSavedCanvas();
        initSketcker();
        spraySound();
        changeBrushColor();

        $('#save-canvas').on('click',saveCanvas);
        $('#clear-canvas').on('click',clearCanvas);

    };
    initTagWall();
});

/* STICK GHETTOBLASTER TO BOTTOM */
var $ghetto = $();
var fixed = true;
var stickGhettoToBottom = function(){
    if($ghetto.length < 1){
        $ghetto = $('#cassette-player');
    }

    var windowheight = $window.height(),
        scrollTop = $window.scrollTop(),
        bottomLimit = $body.height() - 214,
        isLimitReached = windowheight + scrollTop >= bottomLimit;

    if (isLimitReached && fixed){
        $ghetto.addClass('positionabsolute');
        fixed = false;
    }
    else if(!isLimitReached && !fixed) {
        $ghetto.removeClass('positionabsolute');
        fixed = true;
    }
};


/* CONSOLE COLOR */
var CONSOLE_CSS = 'background:#a4aa0a; color:white; padding:0 4px'; // default

function CustomConsole (prefix, console_css) {
    console_css = console_css || CONSOLE_CSS;// choose passed arg or default constant

    function processArgs () {
        var args = Array.prototype.slice.call(arguments);  // converts Arguments to Array
        args.shift();                                      // remove console method
        args.unshift('%c' + prefix, console_css);          // adds custom css and prefix at the beginning
        return args;
    }

    function handler (type) {
        return console[type].apply(console, processArgs.apply(this, arguments));
    }

    // export public methods: .info(), .warn(), whatever method from console you need...
    ['log', 'info', 'warn'].forEach(function(type) {
        this[type] = handler.bind(handler, type); // IE9+
    }, this);
}
var removethis = function () {
    $(this).remove()
};
var onpostnewcomment = function () {
    var $commentform = $('#commentform');
    var $hide = $('<div>').addClass('comment-mask');
    $commentform.append($hide);
    $hide.velocity({
        opacity:.6
    }, {
        easing: "easeInOut",
        duration: 300
    });

    $.ajax( {
        type: 'POST',
        url: $commentform.attr('action'),
        data: $( "#commentform" ).serialize(),
        success: function(data){
            var $commentlist = $('.commentlist');
            var $newcomment;
            var $appendto;
            var action = '';
            var $data = $(data);
            if($commentlist.length){
                $newcomment = $data.find('.commentlist li:last').addClass('new-comment');
                $commentlist.append($newcomment);
            }
            else{
                $newcomment = $data.find('.commentlist').addClass('new-comment');
                $newcomment.find('li:last').addClass('new-comment');
                $appendto = $('.commentsContainer');
                $appendto.prepend($newcomment);
                $appendto.prepend($data.find('#comments'));
            }

            //
            $commentform.find('.comment-mask').velocity({
                opacity:0
            }, {
                easing: "easeInOut",
                duration: 300
            }).promise().always(removethis);
            setTimeout(function(){$('.new-comment').removeClass('new-comment')}, 1000);
            //todo we should have an array of setTimeout/interval to clear when changing page

        }
    });

    return false;
};

$(window).on('load', function(){
    $('.mini-poster').attr('src', function(){return $(this).data('src')})
});