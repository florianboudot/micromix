/**
 * MANGE THE SOUND
 * BECAUSE I MAKE TYPO
 * @constructor
 */
var Mangethesound = function(){
    var debug = true;
    var $empty = $();
    var $body = $('body');
    var $ghettoblaster = $('<div>');
    var $cassette = $('<div>');
    var $ghettonext = $('<div>');
    var $ghettoprev = $('<div>');
    var $ghettoinfo = $('<a>');
    var $linkwithaudiohref = $('.wpaudio');
    var _currentidplay = '';
    var _lastidplay = '';
    var _currentindexplay = 0;
    var _lastindexplay = 0;
    var $currentplayer = $empty;
    var $currenttimeline = $empty;
    var $currentloadprogress = $empty;
    var _ispostondisplay = false;

    var _playlist = typeof list_all_posts === 'object' ? list_all_posts : [];
    var _mp3byid = {};
    var _mp3byindex = {};
    var _urlbyid = {};
    var _urlbyindex = {};
    var _indexbyid = {};
    var _idbyindex = {};

    var splayingclassname = 'playing';

    (function(){
        for (var index = 0; index < _playlist.length; index++) {
            var obj = _playlist[index];
            var mp3 = obj.mp3;
            var url = obj.url;
            var id = obj.id;
            _mp3byid[id] = mp3;
            _mp3byindex[index] = mp3;
            _urlbyid[id] = url;
            _urlbyindex[index] = url;
            _indexbyid[id] = index;
            _idbyindex[index] = id;
        }
    })();

    var _getmp3byindex = function (index) {
        if (debug)console.info('_getmp3byindex', index);
        return _mp3byindex[index];
    };
    var _getmp3byid = function (id) {
        if (debug)console.info('_getmp3byid', id);
        return _mp3byid[id];
    };
    var _geturlbyindex = function (index) {
        if (debug)console.info('_getmp3byindex', index);
        return _urlbyindex[index];
    };
    var _geturlbyid = function (id) {
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
        $ghettoblaster.addClass(splayingclassname);
        document.title = '♫ ' + document.title;
    };
    var _onpause = function(){
        if (debug)console.info('_onpause');
        $ghettoblaster.removeClass(splayingclassname);
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
        if(_ispostondisplay){
            var position = this.position;
            if(Math.abs(position - _lastupdatetimeprogress) > 5000 || force){
                _lastupdatetimeprogress = position;
                $currenttimeline.width(position / this.duration  *100 + '%')
            }
        }
    };

    var _updateloadprogress = function (force) {
//            if (debug)console.info('_updateloadprogress');//flood
        if(_ispostondisplay){
            var position = this.bytesLoaded;
            if((position - _lastupdateloadprogress) > 0.01 || force){
                _lastupdateloadprogress = position;
                $currentloadprogress.width(position/this.bytesTotal  *100 + '%')
            }
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
        _updatecurrentprogressbars($post);
        _createsound(url, id).play();

        _lastidplay = _currentidplay;
        _lastindexplay = _getindexbyid(_currentidplay);
        _currentidplay = id;
        _currentindexplay = _getindexbyid(_currentidplay);

        $ghettoinfo.html(decodeURI(_getmp3byid(_currentidplay).replace('/upload/', '').replace('.mp3', '')));
        $ghettoinfo.attr('href', _getmp3byid(_currentidplay));

    };

    /**
     *
     * @param $post {jQuery}
     * @private
     */
    var _updatecurrentprogressbars = function ($post) {
        if (debug)console.info('_updatecurrentprogressbars');
        _ispostondisplay = !!$post.length;
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
        $ghettoinfo.addClass('ghettoblaster-info history').html('micromix').attr('href', '/');
        $body.append($ghettoblaster);
        $body.append($cassette);
        $body.append($ghettonext);
        $body.append($ghettoprev);
        $body.append($ghettoinfo);

    };

    var init = function () {
        if (debug)console.info('init');

        soundManager.setup({
            url: theme_path.replace(location.protocol + '//' + location.host, '') + '/swf/', //todo should find a better whay to extract the themepath without http full link
            // optional: prefer HTML5 over Flash for MP3/MP4
            debugMode: true,
            preferFlash: true,
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
