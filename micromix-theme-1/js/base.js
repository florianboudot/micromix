jQuery(document).ready(function() {
    var $ = jQuery;


    var Mangethesound = function(){
        var debug = true;
        var $ghettoblaster = $('<div>');
        var $linkwithaudiohref = $('.wpaudio');
        var currentidplay = '';

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

        var _lastupdatetimeprogress = new Date().getTime();
        var _lastupdateloadprogress = new Date().getTime();
        var _updatetimeprogress = function () {
            if (debug)console.info('_updatetimeprogress');
            var now = new Date().getTime();
            if(now - _lastupdatetimeprogress > 5000){
               _lastupdatetimeprogress = new Date().getTime();
                $('#' + this.id.replace('bt-player', 'post')).find('.currenttime').width(this.position / this.duration  *100 + '%')
            }
       };

        var _updateloadprogress = function () {
            if (debug)console.error('_updateloadprogress');
            var now = new Date().getTime();
            if(now - _lastupdateloadprogress > 1000){
                _lastupdateloadprogress = new Date().getTime();
                $('#' + this.id.replace('bt-player', 'post')).find('.loaded').width(this.bytesLoaded/this.bytesTotal  *100 + '%')
            }
       };

        /**
         * @this {Object} refer to dom element
         */
        var inicreatesound = function(){
            var audiosrc = this.href.replace('http://www.micromix.fr', '');
            soundManager.createSound({
                url:audiosrc,
                id: this.parentNode.id
            })

        };

        var _playthissound = function(e){
            e.preventDefault();
            soundManager.pauseAll();
            soundManager.play(this.parentNode.id);
            currentidplay = this.parentNode.id;
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