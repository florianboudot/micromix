/* highlight plugin */
$.fn.extend({
    highlight: function(search, insensitive, hls_class){
        var regex = new RegExp("(<[^>]*>)|(\\b"+ search.replace(/([-.*+?^${}()|[\]\/\\])/g,"\\$1") +")", insensitive ? "ig" : "g");
        return this.html(this.html().replace(regex, function(a, b, c){
            return (a.charAt(0) == "<") ? a : "<span class=\""+ hls_class +"\">" + c + "</span>";
        }));
    }
});


jQuery(document).ready(function() {
    var $ = jQuery;


    /* If search, call highlight */
    if(typeof(hls_query) != 'undefined'){
        $(".result").highlight(hls_query, 1, "hilite");
    }


    var Mangethesound = function(){
        var debug = true;
        var $empty = $();
        var $body = $('body');
        var $ghettoblaster = $('<div>');
        var $cassette = $('<div>');
        var $ghettonext = $('<div>');
        var $ghettoprev = $('<div>');
        var $ghettoinfo = $('<div>');
        var $linkwithaudiohref = $('.wpaudio');
        var _currentidplay = '';
        var _lastidplay = '';
        var _currentindexplay = 0;
        var _lastindexplay = 0;
        var $currentplayer = $empty;
        var $currenttimeline = $empty;
        var $currentloadprogress = $empty;

        var _playlist = typeof list_all_posts === 'object' ? list_all_posts : [];
        var _urlbyid = {};
        var _urlbyindex = {};
        var _indexbyid = {};
        var _idbyindex = {};

        (function(){
            for (var index = 0; index < _playlist.length; index++) {
                var obj = _playlist[index];
                var url = obj.url;
                var id = obj.id;
                _urlbyid[id] = url;
                _urlbyindex[index] = url;
                _indexbyid[id] = index;
                _idbyindex[index] = id;
            }
        })();

        var _getmp3byindex = function (index) {
            if (debug)console.info('_getmp3byindex', index);
            return _urlbyindex[index];
        };

        var _getmp3byid = function (id) {
            if (debug)console.info('_getmp3byid', id);
            return _urlbyid[id];
        };
        var _getidbyindex = function (index) {
            if (debug)console.info('_getidbyindex');
            return _idbyindex[index]
        };
        var _getindexbyid = function (id) {
            if (debug)console.info('_getindexbyid');
            return _indexbyid[id]
        };

        var _onplay = function(){
            if (debug)console.info('_onplay');
            $ghettoblaster.css({background:'green'});
            document.title = '♫ ' + document.title;
        };
        var _onpause = function(){
            if (debug)console.info('_onpause');
            $ghettoblaster.css({background:'red'});
            document.title = document.title.replace('♫ ', '');
        };
        var _onresume = function(){
            if (debug)console.info('_onresume');
            _onplay();
        };
        var _ondestroy = function(){
            if (debug)console.info('_ondestroy');
            _onpause();
        };
        var _onfinishsound = function () {
            if (debug)console.info('_onfinishsound');
            _playnextsound();
        };
        var _onload = function (isloaded) {
            if (debug)console.info('_onload', isloaded);
            if(isloaded === false){
                _onloadfail();
            }
        };
        var _onloadfail = function () {
            if (debug)console.info('_onloadfail');
            _onpause();
            console.error('network error or mp3 missing');

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
            var actualplayingsound = soundManager.sounds[_currentidplay];
            var totalduration = actualplayingsound.duration * positionratio;
            actualplayingsound.setPosition(totalduration);
        };

        /**
         * maybe wont be used
         * @private
         */
        var _deleteplaylist = function () {
            if (debug)console.info('_deleteplaylist');

            var sounds = soundManager.soundIDs;
            for (var i = 0; i < sounds.length; i++) {
                var id = sounds[i];
                _deletesound(id)
            }
        };

        var _deletesound = function (id) {
            if (debug)console.info('_deletesound');

            var sound = soundManager.sounds[id];
            if(sound){
                sound.unload();
                soundManager.destroySound(id);
                _ondestroy();
            }
        };
        /**
         *
         * @param url
         * @param id
         * @private
         * @return {Object} the current added sound of soundManager
         */
        var _createsound = function (url, id) {
            if (debug)console.info('_createsound', id);
            soundManager.createSound({
                url:url,
                id: id
            });
            return soundManager.sounds[id];
        };
        /**
         * @deprecated
         * @this {Object} refer to dom element
         */
        var _inicreatesound = function(){
            var audiosrc = this.href.replace('http://www.micromix.fr', '');
            _createsound(audiosrc, this.parentNode.id)
        };

        var _playnextsound = function () {
            if (debug)console.info('_playnextsound',_currentindexplay, _playlist.length);

            if(_currentindexplay+1 < _playlist.length){
                _playthissound(_getmp3byindex(_currentindexplay+1), _getidbyindex(_currentindexplay+1));
            }
            else{
                console.warn('no more sound, shall we play the first sound?')
            }
        };
        var _playprevsound = function () {
            if (debug)console.info('_playprevsound');

            if(_currentindexplay-1 >= 0){
                _playthissound(_getmp3byindex(_currentindexplay-1), _getidbyindex(_currentindexplay-1));
            }
            else{
                console.warn('no more sound, shall we play the last sound?')
            }
        };

        /**
         * will create a sound in soundmanager and play it
         * set the vars of currenttimer
         * @param url
         * @param id
         * @private
         */
        var _playthissound = function (url, id) {
            if (debug)console.info('_playthissound');

            _deletesound(_currentidplay);

            var $post = $('#post-' + id);
            console.warn('#post-' + id);
            _updatecurrentprogressbars($post);

            _createsound(url, id).play();
            _lastidplay = _currentidplay;
            _lastindexplay = _getindexbyid(_currentidplay);
            _currentidplay = id;
            _currentindexplay = _getindexbyid(_currentidplay);
            $ghettoinfo.html(decodeURI(_getmp3byid(_currentidplay).replace('/upload/', '').replace('.mp3', '')));

            console.warn(_lastidplay, _lastindexplay, _currentidplay, _currentindexplay);
        };

        /**
         *
         * @param $post {jQuery}
         * @private
         */
        var _updatecurrentprogressbars = function ($post) {
            if (debug)console.info('_updatecurrentprogressbars');
            $currentplayer.off('click', _gotothistime); // before update current
            $currentplayer       = $post.find('.player');
            $currentloadprogress = $currentplayer.find('.loaded');
            $currenttimeline     = $currentplayer.find('.currenttime');
            $currentplayer.on('click', _gotothistime);
        };

        var _getandplaythissound = function(e){
            e.preventDefault();
            soundManager.pauseAll();

            var thisid = $(this).data('postid');
            _playthissound(_getmp3byid(thisid), thisid);
        };

        var pauseall = function(){
            soundManager.pauseAll();
        };

        var togglepause = function(){
            soundManager.togglePause(_currentidplay);
        };


        var _onsoundmanagerready = function () {
            if (debug)console.info('_onsoundmanagerready');

            $linkwithaudiohref.bind('click', _getandplaythissound);
            $ghettoblaster.bind('click', togglepause);
            $ghettoblaster.addClass('ghettoblaster');
            $ghettonext.bind('click', _playnextsound);
            $ghettonext.addClass('ghettoblaster-next').html('▐►');
            $cassette.addClass('cassette');
            $ghettoprev.bind('click', _playprevsound);
            $ghettoprev.addClass('ghettoblaster-prev').html('◄▌');
            $ghettoinfo.addClass('ghettoblaster-info').html('micromix');
            $body.append($ghettoblaster);
            $body.append($cassette);
            $body.append($ghettonext);
            $body.append($ghettoprev);
            $body.append($ghettoinfo);

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
                    whileplaying: _updatetimeprogress,
                    onfinish: _onfinishsound,
                    onload: _onload
                }

            });

        };

        this.addaudiopost = _inicreatesound;
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
//            if (debug)console.info('_bindevents');

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