jQuery(document).ready(function() {
    var $ = jQuery;


    var Mangethesound = function(){
        var debug = true;
        var $ghettoblaster = $('<div>');
        var $linkwithaudiohref = $('.wpaudio');
        var currentidplay = '';
        var $empty = $();
        var $currentplayer = $empty;
        var $currenttimeline = $empty;
        var $currentloadprogress = $empty;

        var _onplay = function(){
            if (debug)console.error('onplay');
            $ghettoblaster.css({background:'green'})
        };
        var _onpause = function(){
            $ghettoblaster.css({background:'red'})
        };
        var _onresume = function(){
            $ghettoblaster.css({background:'green'})
        };

        var _lastupdatetimeprogress = 0;
        var _lastupdateloadprogress = 0;

        var _updatetimeprogress = function (force) {
//            if (debug)console.info('_updatetimeprogress');//flood
            var position = this.position;
            if(Math.abs(position - _lastupdatetimeprogress) > 5000 || force){
               _lastupdatetimeprogress = position;
                $currenttimeline.width(position / this.duration  *100 + '%')
            }
       };

        var _updateloadprogress = function (force) {
//            if (debug)console.info('_updateloadprogress');//flood
            var position = this.bytesLoaded;
            if((position - _lastupdateloadprogress) > 0.01 || force){
                _lastupdateloadprogress = position;
                $currentloadprogress.width(position/this.bytesTotal  *100 + '%')
            }
        };

        var _gotothistime = function (e) {
            if (debug)console.info('_gotothistime');

            var positionratio = e.offsetX / this.clientWidth;
            var actualplayingsound = soundManager.sounds[currentidplay];
            var totalduration = actualplayingsound.duration * positionratio;
            actualplayingsound.setPosition(totalduration);
        };

        /**
         * @this {Object} refer to dom element
         */
        var inicreatesound = function(){
            var audiosrc = this.href.replace('http://www.micromix.fr', '');
            soundManager.createSound({
                url:audiosrc,
                id: this.parentNode.id
            });
        };

        var _playthissound = function(e){
            e.preventDefault();
            soundManager.pauseAll();
            soundManager.play(this.parentNode.id);
            currentidplay = this.parentNode.id;

            $currentplayer.off('click', _gotothistime); // before update current

            var $post = $(this).parents('.article').first();
            $currentplayer       = $post.find('.player');
            $currentloadprogress = $currentplayer.find('.loaded');
            $currenttimeline     = $currentplayer.find('.currenttime');
            $currentplayer.on('click', _gotothistime);
        };

        var pauseall = function(){
            soundManager.pauseAll();
        };

        var togglepause = function(){
            soundManager.togglePause(currentidplay);
        };


        var _onsoundmanagerready = function () {
            if (debug)console.info('_onsoundmanagerready');

            $linkwithaudiohref.each(inicreatesound).bind('click', _playthissound);
            $ghettoblaster.bind('click', togglepause);
            $ghettoblaster.addClass('ghettoblaster');
            $('body').append($ghettoblaster);

        };

        var init = function () {
            if (debug)console.info('init');

            soundManager.setup({
                url: '/wp-content/plugins/wpaudio-mp3-player/sm2/', // where to find flash audio SWFs, as needed
                // optional: prefer HTML5 over Flash for MP3/MP4
                debugMode: false,
                preferFlash: false,
                onready: _onsoundmanagerready,
                defaultOptions: {
                    // set global default volume for all sound objects
                    volume: 100,
                    onplay: _onplay,
                    onpause: _onpause,
                    onresume: _onresume,
                    whileloading: _updateloadprogress,
                    whileplaying: _updatetimeprogress
                }

            });

        };

        this.addaudiopost = inicreatesound;
        this.initsound = init;

    };

    var managethisawesomemicromixsound = new Mangethesound();
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
            if (debug)console.info('_bindevents');

            clearTimeout(TIMEOUTactivity);
            isactiv = true;
            TIMEOUTactivity = setTimeout(_setinactiv, 10*1000*60); // 10 minutes

        };
        $(window).on(events, _bindevents);

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