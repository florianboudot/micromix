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
                url: theme_path + '/ajax.php',
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

    postToFeedback();
});

/* POST COMMENT TO FEEDBACK PAGE */
var postToFeedback = function () {
    var $feedback_container = $('#feedback-container');

    if($feedback_container.length > 0){

        var feedback_titles = '' +
            '<h4 class="title">Feedback</h4>' +
            '<p class="subtitle">Tell us if something is broken or can be better, thanks !</p>';
        var feedback_messages = '' +
            '<p class="message loading">wait...</p>' +
            '<p class="message success">Thank you ! Your message has been successfully sent</p>' +
            '<p class="message error">Error sending the message :( <br>please try again <br></p>';

        // get the <form> from the /feedback page
        $.ajax({
            url: '/feedback',
            type: 'GET',
            dataType: 'html'
        }).done(function(data) {
            // inject html form into feedback zone
            var html_form = $(data).find('#commentform');
            $feedback_container.html(html_form);

            // on submit => ajax post
            var $form = $feedback_container.find('form');

            // rename id (to avoid duplicate id)
            $form.attr('id', 'feedback-form');

            // add some titles and hidden messages
            $form.prepend(feedback_messages + feedback_titles);


            $form.on('submit', function(e){
                e.preventDefault();

                // hide all messages
                $feedback_container.find('.message').removeClass('active');

                // wait...
                $feedback_container.find('.loading').addClass('active');

                // get form values
                var form_data = $form.serialize();
                var url = this.action;

                // freeze the form (important : after serialize)
                $form.find('input, textarea').prop('disabled', true);

                // ajax post form
                $.post(url, form_data)
                    .done(function(){
                        // display success message
                        $feedback_container.find('.message').removeClass('active');
                        $feedback_container.find('.success').addClass('active');

                        // remove success message after a while
                        setTimeout(function(){
                            $feedback_container.find('.message').removeClass('active');

                            // unfreeze the form
                            $form.find('input, textarea').prop('disabled', false);
                        }, 5000);
                    })
                    .fail(function(params){
                        // display error message
                        $feedback_container.find('.message').removeClass('active');
                        $feedback_container.find('.error').append('error '+ params.status).addClass('active');

                        // unfreeze the form
                        $form.find('input, textarea').prop('disabled', false);
                    });
            });
        });
    }
};

/* STICK GHETTOBLASTER TO BOTTOM */
var $ghetto = $();
var fixed = true;
var stickGhettoToBottom = function(scrollTop){
    if($ghetto.length < 1){
        $ghetto = $('#cassette-player');
    }

    var windowheight = $window.height(),
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

var parallolaxe = function (scrollTop) {
    $('#bricks').css('background-position', 'center ' + scrollTop / 20 + 'px')
};
var onscroll = function () {
    var scrolltop = $window.scrollTop();
    stickGhettoToBottom(scrolltop);
    parallolaxe(scrolltop);
};
$(window).on('scroll', onscroll);

var parallolaxe = function (scrollTop) {
    $('#bricks').css('background-position', 'center ' + (scrollTop / 9) + 'px')
};
var onscroll = function () {
    var scrolltop = $window.scrollTop();
    stickGhettoToBottom(scrolltop);
    parallolaxe(scrolltop);
};
$(window).on('scroll', onscroll);


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
    $('.mini-poster').each(function(i,o){
        setTimeout(function(){
            $(o).attr('src', function(){return $(this).data('src')});
        },i*10);
    })
});

var hide_form_native_value = function (e) {
    var defaultvalue = $(this).data('default-value');
    if(e.type === 'focus'){
        this.value = (this.value==defaultvalue) ? '': this.value
    }
    else{
        this.value = (this.value=='') ? defaultvalue : this.value
    }

};
$('.JS_hide_default_value').on('focus blur', hide_form_native_value);
var newsletter_check = function (f) {
    var re = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-]{1,})+\.)+([a-zA-Z0-9]{2,})+$/;
    var message = '';
    if (!re.test(f.elements["ne"].value)) {
        message = 'what\'s your email address please ?';
    }
    if (f.elements["nn"] && (f.elements["nn"].value == "" || f.elements["nn"].value == f.elements["nn"].defaultValue)) {
        message = 'what\'s your name please ?';
    }
    if (f.elements["ny"] && !f.elements["ny"].checked) {
        message ='You must accept the privacy statement';
    }
    return message;
};
$('#newletter_form').on('submit', function(e){
    var check_form = newsletter_check(this);
    var check_ok = check_form.length === 0;
    if(check_ok){
        var $form = $(this);
        var url = $form.attr('action');
        var data = $form.serialize();
        console.info(url);
        $.ajax({
            url:url,
            method: 'POST',
            data: data
        }).done(function(){
            console.info('done')
        }).fail(function(){
            console.info('fail')
        }).always(function(){
            console.info('always')
        });
    }
    else {
        console.info(check_form)
    }

    e.preventDefault();

});