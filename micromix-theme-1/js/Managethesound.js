/**
 * MANGE THE SOUND
 * BECAUSE I MAKE TYPO
 * @constructor
 */
var Managethesound = function(){
    var debug = true;
    var $empty = $();
    var $footer = $('#footer');
    var $ghettoblaster = $('<div>');
    var $cassette = $('<div>');
    var $ghettonext = $('<div>');
    var $ghettoplay = $('<div>');
    var $ghettopause = $('<div>');
    var $ghettostop = $('<div>');
    var $ghettobuttonscontainer = $('<div>');
    var $ghettoprev = $('<div>');
    var $ghettoinfo = $('<a>');
    var $listsitems = $('#posts-year-month .list-item');
    var $currentsoundplayer = $empty;
    var classnamecurrentlistitem = 'currentsoundplayed';
    var $linkplaysoundbyid = $('.JSplaysoundbyid');
    var $linkpreviewsoundbyid = $('.JSpreviewsoundbyid');
    var _currentidplay = '';
    var _maybecurrentidplay = '';
    var _lastidplay = '';
    var _currentindexplay = 0;
    var _maybecurrentindexplay = 0;
    var _lastindexplay = 0;
    var $currentplayer = $empty;
    var DOMcurrenttimeline = null;
    var DOMcurrentloadprogress = null;
    var DOMcurrenttimetext = null;
    var DOMcurrenttotaltimetext = null;
    var _ispostondisplay = false;

    var _playlist = typeof list_all_posts === 'object' ? list_all_posts : [];
    var _mp3byid = {};
    var _mp3byindex = {};
    var _urlbyid = {};
    var _urlbyindex = {};
    var _indexbyid = {};
    var _idbyindex = {};

    var timelineevents = 'mousedown mousemove'; // add touch if touch

    var splayingclassname = 'active';
    var _sound = null;
    var _soundpreview = null;
    var _soundpreviewid = null;
    var _starttime = null;
    var _autoplay = false;

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
    var TIMEOUTanimatewindowtitle = 0;
    var _actualchardocumenttitle = '♫';
    var _animatedocumenttitle = function () {
        if (debug)console.info('_animatedocumenttitle');
        var oldchar = _actualchardocumenttitle;
        _actualchardocumenttitle = _actualchardocumenttitle === '♪' ? '♫' : '♪';
        if(/[♪|♫]/.test(document.title)){
            document.title = document.title.replace(oldchar, _actualchardocumenttitle);
        }
        else{
            document.title = _actualchardocumenttitle + ' ' + document.title;
        }
        TIMEOUTanimatewindowtitle = setTimeout(_animatedocumenttitle, 2000);

    };

    var _cancelanimatedocumenttitle = function () {
        if (debug)console.info('_cancelanimatedocumenttitle');
        clearTimeout(TIMEOUTanimatewindowtitle);
        document.title = document.title.replace(/[♫|♪] /, '');
    };

    var _onplay = function(){
        if (debug)console.info('_onplay');
        if(this.readyState == 2){
            _onmp3fail();
            togglepause();
        }
        else{
            $ghettoplay.addClass(splayingclassname);
            _animatedocumenttitle();
            $currentsoundplayer.removeClass(classnamecurrentlistitem);
            $currentsoundplayer = $listsitems.eq(_currentindexplay).addClass(classnamecurrentlistitem);
        }
    };
    var _onpause = function(){
        if (debug)console.info('_onpause');
        $ghettoplay.removeClass(splayingclassname);
        _cancelanimatedocumenttitle();
    };
    var _onresume = function(){
        if (debug)console.info('_onresume');
        _onplay.apply(this);
    };
    var _onstop = function(){
        if (debug)console.info('_onstop');
    };
    var _onid3 = function(){
        if (debug)console.info('_onid3', this.id3);
    };
    var _ondestroy = function(){
        if (debug)console.info('_ondestroy');
        _onpause();
    };
    var _onfinishsound = function () {
        if (debug)console.info('_onfinishsound');
        _playnextsound();
    };
    var _ondataerror = function () {
        if (debug)console.error('_ondataerror');

    };
    var _onload = function (isloaded) {
        if (debug)console.info('_onload', isloaded);
        if(!isloaded){
            _onloadfail.apply(this, arguments);
        }
        if(_starttime){
            _playsoundattime(_starttime, _sound);
        }
        _starttime = null;
        _autoplay = false;

    };

    /**
     *
     * @param starttime
     * @param sound
     * @private
     */
    var _playsoundattime = function (starttime, sound) {
        if (debug)console.warn('_playsoundattime', sound);
        if(starttime){
            var attemp = 0;
            var done = false;
            _setvolume(0,sound);
            var _interval = setInterval(function(){
                attemp++;// about 10s
                if(!sound){
                    sound = {};
                    done = true;
                }
                if(sound.position < starttime){
                    _gotoposition(starttime, sound);
                }
                else{
                    done = true;
                }
                if(attemp > 200 || done){
                    _setvolume(100,sound);
                    clearInterval(_interval);
                }
            },50);
        }

    };

    var _onloadfail = function () {
        if (debug)console.info('_onloadfail');
        togglepause();
        console.error('network error or mp3 missing');

    };
    var _onmp3fail = function () {
        if (debug)console.info('_onmp3fail');
        $.get('/').always(function(data, status, xhr){
            if(status === 'error') {
                console.error('OUPS, ' + location.host + ' IS UNREACHABLE, DO YOU STILL PAY FOR YOU INTENRET MEMBERSHIP? LOLOLOLOLOLOL');
                //show a status to tell that intenret has gone, and will never be back :(
            }
            else if(status === 'success'){
                console.error('MP3 IS DEAD, PLEASE REFRESH OR FREEZE ON THE DANCEFLOOR OR PLAY NEXT');
                //show a status somewhere (over the rainbow) to refresh, play next or play a funky gif of that stop dancing
            }
        });
    };

    /**
     *
     * @param fullseconds {Number} full seconds
     * @private
     */
    var _getminutesandseconds = function (fullseconds) {
        if (debug)console.info('_getminutesandseconds');
        var minVar = Math.floor(fullseconds/60);
        var seconds = (fullseconds % 60) >> 0;
        return {s:seconds,m:minVar};
    };

    var _lastupdatetimeprogress = 0;
    var _lastupdateloadprogress = 0;

    var _updatetimeprogress = function (force) {
//            if (debug)console.info('_updatetimeprogress');//flood
        if(_ispostondisplay){
            var position = this.position;
            if(Math.abs(position - _lastupdatetimeprogress) > 1000 || force){
                _lastupdatetimeprogress = position;
                DOMcurrenttimeline.style.cssText = 'width:' + (position / this.duration  *100 + '%;');
                var otime = _getminutesandseconds(position / 1000);
                DOMcurrenttimetext.textContent = otime.m + 'm:' + otime.s + 's';
            }
        }
    };

    var _updateloadprogress = function (force) {
//            if (debug)console.info('_updateloadprogress');//flood
        if(_ispostondisplay){
            var position = this.bytesLoaded;
            if((position - _lastupdateloadprogress) > 0.01 || force){
                _lastupdateloadprogress = position;
                DOMcurrentloadprogress.style.cssText = 'width:' + (position/this.bytesTotal  *100 + '%;');
                var otime = _getminutesandseconds(this.duration / 1000);
                DOMcurrenttotaltimetext.textContent = otime.m + 'm:' + otime.s + 's';
            }
        }
    };

    var _gotothistime = function (e) {
        if (debug)console.info('_gotothistime');
        if(e.which === 1){
            var eventtarget = e.target;
            var offsetx = this != eventtarget ? e.offsetX + eventtarget.offsetLeft : e.offsetX;
            var positionratio = offsetx / this.clientWidth;
            var totalduration = _sound.duration * positionratio;
            _sound.setPosition(totalduration);
        }
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
            _sound = null;
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
            id: id,
            onplay: _onplay,
            onpause: _onpause,
            onresume: _onresume,
            onstop: _onstop,
            onid3: _onid3,
            whileloading: _updateloadprogress,
            whileplaying: _updatetimeprogress,
            onfinish: _onfinishsound,
            ondataerror: _ondataerror,
            onload: _onload
        });
        _sound = soundManager.sounds[id];
        return _sound;
    };
    /**
     * @deprecated
     * @this {Object} refer to dom element
     */
    var _inicreatesound = function(){
        var audiosrc = this.href.replace('http://www.micromix.fr', '');
        _createsound(audiosrc, this.parentNode.id)
    };
    var TIMEOUTusergoprevnext = 0;

    var _usergonextprevanimation = function (sclass) {
        if (debug)console.info('_usergonextprevanimation');

        var $k7 = $cassette.clone();
        $k7.width(100).addClass(sclass);
        $ghettobuttonscontainer.append($k7);
        setTimeout(function(){$k7.addClass('loading')},0);
        $k7.on('transitionend webkitTransitionEnd msTransitionEnd mozTransitionEnd oTransitionEnd', function(){
            var $this = $(this);
            setTimeout(function(){
                $this.remove();
            },500);
        })

    };

    var _usergonext = function () {
        if (debug)console.info('_usergonext');
        _usergoprevnext('next');
        _usergonextprevanimation('toloadnext');
    };
    var _usergoprev = function () {
        if (debug)console.info('_usergoprev');
        _usergoprevnext('prev');
        _usergonextprevanimation('toloadprev');
    };

    var _usergoprevnext = function (direction) {
        if (debug)console.info('_usergoprevnext');
        var fn;
        if(direction === 'next'){
            fn = _playnextsound;
        }
        else if(direction === 'prev'){
            fn = _playprevsound;
        }

        if(fn){
            fn(true);
        }

    };
    /**
     *
     * @param wait {Boolean} wait to play next sound
     * @private
     */
    var _playnextsound = function (wait) {
        if (debug)console.info('_playnextsound', wait);

        if(_maybecurrentindexplay+1 < _playlist.length){
            _playthissound(_getmp3byindex(_maybecurrentindexplay+1), _getidbyindex(_maybecurrentindexplay+1), wait);
        }
        else{
            console.warn('no more sound, shall we play the first sound?')
        }
    };
    var _playprevsound = function (wait) {
        if (debug)console.info('_playprevsound');

        if(_maybecurrentindexplay-1 >= 0){
            _playthissound(_getmp3byindex(_maybecurrentindexplay-1), _getidbyindex(_maybecurrentindexplay-1), wait);
        }
        else{
            console.warn('no more sound, shall we play the last sound?')
        }
    };
    /**
     *
     * @param time {Number}
     * @private
     */
    var _goforward = function (time) {
        if (debug)console.info('_goforward', time);
        if(_sound){
            var position = _sound.position;
            var _time = time ? time : 1000;
            _gotoposition(position+_time);
        }
    };
    /**
     *
     * @param time {Number}
     * @private
     */
    var _gobackward = function (time) {
        if (debug)console.info('_gobackward', time);
        if(_sound){
            var position = _sound.position;
            var _time = time ? time : 1000;
            _gotoposition(position-_time);
        }
    };

    /**
     *
     * @param position {Number}
     * @private
     */
    var _gotoposition = function (position, sound) {
        if (debug)console.info('_gotoposition', position);
        var __sound = sound ? sound : _sound;
        if(__sound && position){
            __sound.setPosition(position);
        }
    };

    /**
     *
     * @param volume {Number}
     * @private
     */
    var _setvolume = function (volume, sound) {
        if (debug)console.info('_setvolume', sound);
        var __sound = sound ? sound : _sound;
        if(__sound && volume <= 100 && volume >= 0){
            __sound.setVolume(volume);
        }
    };
    /**
     * will create a sound in soundmanager and play it
     * set the vars of currenttimer
     * @param url
     * @param id
     * @private
     */
    var _playthissound = function (url, id, wait) {
        if (debug)console.warn('_playthissound', id, _maybecurrentindexplay, wait);

        _maybecurrentidplay = id;
        _maybecurrentindexplay = _getindexbyid(_maybecurrentidplay);
        clearTimeout(TIMEOUTusergoprevnext);
        if(wait){
            TIMEOUTusergoprevnext = setTimeout(function(){
                _playthissound(_getmp3byid(_maybecurrentidplay), _maybecurrentidplay, false);
            },500);
            return false;
        }
        else{

            _lastidplay = _currentidplay;
            _lastindexplay = _getindexbyid(_currentidplay);
            _currentidplay = _maybecurrentidplay = id;
            _currentindexplay = _maybecurrentindexplay = _getindexbyid(_currentidplay);

            _deletesound(_lastidplay);
            _updatecurrentprogressbars(id);
            _createsound(url, id).play();
        }



        _updatehtmlinfo();

    };

    var _updatehtmlinfo = function () {
        if (debug)console.info('_updatehtmlinfo');
        $ghettoinfo.html(decodeURI(_getmp3byid(_currentidplay).replace('/upload/', '').replace('.mp3', '')));
        $ghettoinfo.attr('href', _geturlbyid(_currentidplay));
        pm.manager.history.bindLinks($ghettoblaster);
    };

    /**
     *
     */
    var _updatecurrentprogressbars = function () {
        if (debug)console.info('_updatecurrentprogressbars');

        var $post = $('#post-' + _currentidplay);
        _ispostondisplay = !!$post.length;
        $currentplayer.off(timelineevents, _gotothistime); // before update current
        $currentplayer          = $post.find('.player');
        DOMcurrentloadprogress  = $currentplayer.find('.loaded')[0];
        DOMcurrenttimeline      = $currentplayer.find('.currenttime')[0];
        DOMcurrenttimetext      = $currentplayer.find('.timetext')[0];
        DOMcurrenttotaltimetext = $currentplayer.find('.totaltime')[0];
        $currentplayer.on(timelineevents, _gotothistime);
    };

    var _getandplaythissound = function(e){
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        soundManager.pauseAll();

        var thisid = $(this).data('soundid');
        _playthissound(_getmp3byid(thisid), thisid, false);
    };

    var pauseall = function(){
        soundManager.pauseAll();
    };
    /**
     *
     * @param sound {Object}
     * @return {Boolean}
     * @private
     */
    var _pausesound = function (sound) {
        if (debug)console.info('_pausesound');
        var __sound = sound ? sound : _sound;
        var hasbeenpaused = false;
        if(__sound){
            hasbeenpaused = !__sound.paused;
            __sound.pause();
        }
        return hasbeenpaused;
    };
    /**
     *
     * @param sound {Object}
     * @return {Boolean}
     * @private
     */
    var _resumesound = function (sound) {
        if (debug)console.info('_resumesound');
        var __sound = sound ? sound : _sound;
        var hasbeenresumed = false;
        if(__sound){
            hasbeenresumed = __sound.paused;
            __sound.resume();
        }
        return hasbeenresumed;
    };
    var togglepause = function(){
        if (debug)console.info('togglepause');
        if(soundManager.soundIDs.length){
            soundManager.togglePause(_currentidplay);
        }
        else{
            _playtheveryfirstsoundinpage();
        }
    };
    var _playtheveryfirstsoundinpage = function () {
        if (debug)console.info('_playtheveryfirstsoundinpage');
        var soundid = $('.wpaudio').first().data('soundid');
        _playthissound(_getmp3byid(soundid), soundid, false)
    };
    var _keyboardshortcuts = function (e) {
//        if (debug)console.info('_keyboardshortcuts');
        var fuckyeah = false;
        var keyCode = e.keyCode;
        var isshift = e.shiftKey;
        var isctrl = e.ctrlKey;
        var leftkey = keyCode === 37;
        var rightkey = keyCode === 39;

        if(keyCode === 32 || keyCode === 179){
            if(!_sound){
                //todo what happend if _sound but not on first sound play?
                _playtheveryfirstsoundinpage()
            }
            else{
                togglepause();
            }
            fuckyeah = true;
        }
        else if(!isshift && !isctrl && leftkey){
            _gobackward();
            fuckyeah = true;
        }
        else if(!isshift && !isctrl && rightkey){
            _goforward();
            fuckyeah = true;
        }
        else if(!isshift && isctrl && leftkey){
            _gobackward(10000);
            fuckyeah = true;
        }
        else if(!isshift && isctrl && rightkey){
            _goforward(10000);
            fuckyeah = true;
        }
        else if(isshift && leftkey){
            _usergoprev();
            fuckyeah = true;
        }
        else if(isshift && rightkey){
            _usergonext();
            fuckyeah = true;
        }
        if(fuckyeah){
            e.preventDefault();
        }
    };

    var _unbindplaybyid = function ($elem) {
        if (debug)console.info('_unbindplaybyid');
        $elem.off('click', _getandplaythissound);
    };
    var _bindplaybyid = function ($elem) {
        if (debug)console.info('_bindplaybyid');
        $elem.on('click', _getandplaythissound);

    };
    var previewhaspausedcurrentsound = false;
    var _previewsound = function ($elem) {
        if (debug)console.info('_previewsound');

        previewhaspausedcurrentsound = false;
        _unbindplaybyid($elem);

        $elem.on('mouseup mouseout', _previewend);

        var id = $elem.data('soundid');

        _soundpreviewid = 'preview' + id;
        soundManager.createSound({
            url:_getmp3byid(id),
            id: _soundpreviewid,
            autoPlay: true,
            autoLoad: true,
            onplay: function(){
                previewhaspausedcurrentsound = _pausesound();
            }
        });
        _soundpreview = soundManager.sounds[_soundpreviewid];
        _playsoundattime(10*1000, _soundpreview);

    };
    var _previewend = function () {
        if (debug)console.info('_previewend');
        var $elem = $(this);

        if(_soundpreview){
            soundManager.destroySound(_soundpreviewid);
            _soundpreview = null;
            _soundpreviewid = null;
        }
        if(previewhaspausedcurrentsound){
            previewhaspausedcurrentsound = false;
            _resumesound();
        }
        _bindplaybyid($elem);
        $elem.off('mouseup mouseout', _previewend);


    };
    var _previewsoundbyidctrl = function (e) {
        if (debug)console.info('_previewsoundbyidctrl');
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        // settimout unbind
        var $elem = $(this);
        setTimeout(function(){_previewsound($elem)}, 500);

    };

    var _onsoundmanagerready = function () {
        if (debug)console.info('_onsoundmanagerready');

        $linkplaysoundbyid.bind('click', _getandplaythissound);

        $linkpreviewsoundbyid.on('mousedown', _previewsoundbyidctrl);

        $cassette.addClass('cassette');
        $ghettoblaster.addClass('ghettoblaster');


        $ghettoinfo.addClass('ghettoblaster-info history').html('micromix').attr('href', '/');

        // ghettoblaster
        $footer.append($ghettoblaster);

        // cassette
        $ghettoblaster.append($cassette);

        // buttons
        $ghettobuttonscontainer.addClass('buttons-container');
        $ghettoblaster.append($ghettobuttonscontainer);
        $ghettonext.bind('click', _usergonext);
        $ghettonext.addClass('button next');
        $ghettoplay.bind('click', togglepause);
        $ghettoplay.addClass('button play');


        $ghettopause.bind('click', togglepause);
        $ghettopause.addClass('button pause');
        $ghettostop.bind('click', togglepause);
        $ghettostop.addClass('button stop');

        $ghettoprev.bind('click', _usergoprev);
        $ghettoprev.addClass('button prev');

        $ghettobuttonscontainer.append($ghettonext);
        $ghettobuttonscontainer.append($ghettostop);
        $ghettobuttonscontainer.append($ghettoplay);
        $ghettobuttonscontainer.append($ghettopause);
        $ghettobuttonscontainer.append($ghettoprev);

        // info
        $ghettoblaster.append($ghettoinfo);

        // bind
        $(window).on('keydown', _keyboardshortcuts);
        $(window).on('scroll', stickGhettoToBottom);

        if(_autoplay){
            _playtheveryfirstsoundinpage();
        }


    };

    var init = function () {
        if (debug)console.info('init');

        //todo externalize this hash extract
        var hashsplit = location.hash.split('#')[1];
        var hashs = hashsplit ? hashsplit.split('&') : [];
        if(hashs.length){

            for (var i = 0; i < hashs.length; i++) {
                var hashrequest = hashs[i].split('=');
                var hashparam = hashrequest[0];
                var hashvalue = hashrequest[1];
                if(hashparam === 't'){
                    _starttime = eval(hashvalue.replace('s', '* 1000').replace('m', '* 1000 * 60'));
                    _starttime = typeof _starttime === 'number' ? _starttime : null;
                }
                else if(hashparam === 'autoplay'){
                    _autoplay = hashvalue === "true";
                }

            }
            if(_starttime !== null){
                _autoplay = true;
            }
        }

        soundManager.setup({
            url: theme_path.replace(location.protocol + '//' + location.host, '') + '/swf/', //todo should find a better whay to extract the themepath without http full link
            // optional: prefer HTML5 over Flash for MP3/MP4
            debugMode: false,
            preferFlash: true,
            onready: _onsoundmanagerready,
            defaultOptions: {
                // set global default volume for all sound objects
                volume: 100
            }

        });

    };



    this.initsound = init;
    this.refreshprogressbar = _updatecurrentprogressbars;
};
