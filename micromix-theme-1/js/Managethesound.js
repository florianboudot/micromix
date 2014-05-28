/**
 * MANGE THE SOUND
 * BECAUSE I MAKE TYPO
 * @constructor
 */
var Managethesound = function(){

    // DAT LIST
    var debug = true;
    var counter = null;
    var $empty = $();
    var $ghettoblaster = $('<div>');
    var $ghettoplay = $('<div>');
    var $infos_text = $('#infos-text');
    var $cassette_player = $('#cassette-player');
    var $controls_all = $cassette_player.find('.control');
    var $controls_pushed_all = $cassette_player.find('.control-pushed');
    var $listsitems = $('#posts-year-month .list-item');
    var $previewtitle = $('<span>').addClass('sound-preview-title');
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
        console.info('_getmp3byindex', index);
        return _mp3byindex[index];
    };
    var _getmp3byid = function (id) {
        console.info('_getmp3byid', id);
        return _mp3byid[id];
    };
    var _geturlbyindex = function (index) {
        console.info('_getmp3byindex', index);
        return _urlbyindex[index];
    };
    var _geturlbyid = function (id) {
        console.info('_geturlbyid', id);
        return _urlbyid[id];
    };
    var _getidbyindex = function (index) {
        console.info('_getidbyindex');
        return _idbyindex[index]
    };
    var _getindexbyid = function (id) {
        console.info('_getindexbyid');
        return _indexbyid[id]
    };


    var TIMEOUTanimatewindowtitle = 0;
    var _actualchardocumenttitle = '♫';
    var _animatedocumenttitle = function () {
//        console.info('_animatedocumenttitle');
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
        console.info('_cancelanimatedocumenttitle');
        clearTimeout(TIMEOUTanimatewindowtitle);
        document.title = document.title.replace(/[♫|♪] /, '');
    };

    var _onplay = function(){
        console.info('_onplay');
        if(this.readyState == 2){
            _onmp3fail();
            playSound();
        }
        else{
            $ghettoplay.addClass(splayingclassname);
            _animatedocumenttitle();
            $currentsoundplayer.removeClass(classnamecurrentlistitem);
            $currentsoundplayer = $listsitems.eq(_currentindexplay).addClass(classnamecurrentlistitem);

        }
    };
    var _onpause = function(){
        console.info('_onpause');
        $ghettoplay.removeClass(splayingclassname);
        _cancelanimatedocumenttitle();
    };
    var _onresume = function(){
        console.info('_onresume');
        _onplay.apply(this);
    };
    var _onstop = function(){
        console.info('_onstop');
    };
    var _onid3 = function(){
        console.info('_onid3', this.id3);
    };
    var _ondestroy = function(){
        console.info('_ondestroy');
        _onpause();
    };
    var _onfinishsound = function () {
        console.info('_onfinishsound');
        _playnextsound();
    };
    var _ondataerror = function () {
        console.error('_ondataerror');

    };
    var _onload = function (isloaded) {
        console.info('_onload', isloaded);

        if(!isloaded){
            _onloadfail.apply(this, arguments);
        }
        _playsoundattime(1, _sound); // "0" won't play the sound in flash player 9 mode. dunno why
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
        console.warn('_playsoundattime', sound);
        if(typeof starttime === "number"){
            var attemp = 0;
            var done = false;
            _setvolume(0,sound);
            var _interval = setInterval(function(){
                if(!sound){
                    sound = {};
                    done = true;
                }
                if(typeof sound.position === 'number'){
                    if(sound.position < starttime){
                        _gotoposition(starttime, sound);
                    }
                    else{
                        done = true;
                    }
                }
                attemp++;// about 10s
                if(attemp > 200 || done){
                    _setvolume(100,sound);
                    clearInterval(_interval);
                }
            },50);
        }

    };

    var _onloadfail = function () {
        console.info('_onloadfail');
        playSound();
        console.error('network error or mp3 missing');

    };
    var _onmp3fail = function () {
        console.info('_onmp3fail');
        $.get('/').always(function(data, status, xhr){
            if(status === 'error') {
                console.error('OUPS, ' + location.host + ' IS UNREACHABLE, Y U NO PAY INTENRET CONNEXION ? LOLOLOLOLOLOL');
                //show a status to tell that intenret has gone, and will never be back :(
            }
            else if(status === 'success'){
                console.error('MP3 IS DEAD, PLEASE PLAY NEXT, REFRESH OR FREEZE ON THE DANCEFLOOR');
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
        console.info('_getminutesandseconds');
        var minVar = Math.floor(fullseconds/60);
        var seconds = (fullseconds % 60) >> 0;
        return {s:seconds,m:minVar};
    };


    /* VU METER : LEDS ANIMATION */
    var $vu_meter = $('#vu-meter');
    var $left_leds = $vu_meter.find('.left .led');
    var $right_leds = $vu_meter.find('.right .led');
    var volume_factor = 1.7; // cheat to pump up the volume peak
    var updateVuMeter = function (peak_data, $elements, old_leds_total) {
        var leds_total = Math.ceil((peak_data / 20) * volume_factor), // between 1 and 5
            is_going_up = leds_total > old_leds_total,
            start_led = is_going_up ? old_leds_total : leds_total, // default is 0
            end_led = is_going_up ? leds_total : old_leds_total;

        // lights on or off the leds
        for (var i = start_led; i <= end_led; i++) {
            $elements.eq(i)[is_going_up ? 'addClass' : 'removeClass']('active');
        }

        // return current total leds
        return leds_total;
    };

    var _lastupdatetimeprogress = 0;
    var _lastupdateloadprogress = 0;
    var save_peak_data_left = 0;
    var save_peak_data_right = 0;
    var _updatetimeprogress = function () {
        //console.info('_updatetimeprogress',force, this.peakData);//flood

        // RUN VU METER
        var peak_data_left = parseInt(this.peakData.left * 100);
        var peak_data_right = parseInt(this.peakData.right * 100);
        save_peak_data_left = updateVuMeter(peak_data_left, $left_leds, save_peak_data_left);
        save_peak_data_right = updateVuMeter(peak_data_right, $right_leds, save_peak_data_right);

        if(_ispostondisplay){
            var position = this.position;
            if(Math.abs(position - _lastupdatetimeprogress) > 1000){
                _lastupdatetimeprogress = position;
                var progression = position / this.duration * 100;
                DOMcurrenttimeline.style.cssText = 'width:' + (progression + '%;');


                counter.update(progression);
                var otime = _getminutesandseconds(position / 1000);
                DOMcurrenttimetext.textContent = otime.m + 'm:' + otime.s + 's';
            }
        }
    };

    var _updateloadprogress = function (force) {
//            console.info('_updateloadprogress');//flood
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
        console.info('_gotothistime');
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
        console.info('_deleteplaylist');

        var sounds = soundManager.soundIDs;
        for (var i = 0; i < sounds.length; i++) {
            var id = sounds[i];
            _deletesound(id)
        }
    };

    var _deletesound = function (id) {
        console.info('_deletesound');

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
        if (debug)console.info('_createsound', id, url);
        soundManager.createSound({
            url:url,
            id: id,
            usePeakData: true,
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
        console.info('_usergonextprevanimation');



    };

    var _usergonext = function () {
        console.info('_usergonext');
        _usergoprevnext('next');
        _usergonextprevanimation('toloadnext');
    };

    var _usergoprev = function () {
        console.info('_usergoprev');
        _usergoprevnext('prev');
        _usergonextprevanimation('toloadprev');
    };

    var _usergoprevnext = function (direction) {
        console.info('_usergoprevnext');
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
        console.info('_playnextsound', wait);

        if(_maybecurrentindexplay+1 < _playlist.length){
            _playthissound(_getmp3byindex(_maybecurrentindexplay+1), _getidbyindex(_maybecurrentindexplay+1), wait);
        }
        else{
            console.warn('no more sound, shall we play the first sound ?')
        }
    };


    var _playprevsound = function (wait) {
        console.info('_playprevsound');

        if(_maybecurrentindexplay-1 >= 0){
            _playthissound(_getmp3byindex(_maybecurrentindexplay-1), _getidbyindex(_maybecurrentindexplay-1), wait);
        }
        else{
            console.warn('no more sound, shall we play the last sound? ')
        }
    };
    /**
     *
     * @param time {Number}
     * @private
     */
    var _fastForward = function (time) {
        console.info('_goforward', time);
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
    var _rewind = function (time) {
        console.info('_gobackward', time);
        if(_sound){
            var position = _sound.position;
            var _time = time || 1000;
            var new_pos = position - _time;
            _gotoposition(new_pos, _sound);
        }
    };

    /**
     *
     * @param position {Number}
     * @private
     * @param sound
     */
    var _gotoposition = function (position, sound) {
        console.info('_gotoposition', position);
        var __sound = sound || _sound;
        if(__sound && typeof position === 'number'){
            __sound.setPosition(position);
        }
    };

    /**
     *
     * @param volume {Number}
     * @private
     */
    var _setvolume = function (volume, sound) {
        console.info('_setvolume', sound);
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
     * @param wait
     */
    var _playthissound = function (url, id, wait) {
        console.warn('_playthissound', id, _maybecurrentindexplay, wait);

        _maybecurrentidplay = id;
        _maybecurrentindexplay = _getindexbyid(_maybecurrentidplay);
        clearTimeout(TIMEOUTusergoprevnext);
        if(wait){
            TIMEOUTusergoprevnext = setTimeout(function(){
                _playthissound(_getmp3byid(_maybecurrentidplay), _maybecurrentidplay, false);
            },500);
            return false;
        }
        else {
            _lastidplay = _currentidplay;
            _lastindexplay = _getindexbyid(_currentidplay);
            _currentidplay = _maybecurrentidplay = id;
            _currentindexplay = _maybecurrentindexplay = _getindexbyid(_currentidplay);

            _deletesound(_lastidplay);
            refreshbind();
            _createsound(url, id).play();

        }
        pushButton('play');
        _updatehtmlinfo();
    };

    var _updatehtmlinfo = function () {
//        console.info('defil _updatehtmlinfo');
        $infos_text.html(decodeURI(_getmp3byid(_currentidplay).replace('/upload/', '').replace('.mp3', '')));
        $infos_text.attr('href', _geturlbyid(_currentidplay));

        // text defil animation (work in progress)
        // todo make a function of the defil text
        var text_width = $infos_text.width();
        var pane = 25; // px
        var nb_steps = Math.round(text_width / pane);
//        console.log('defil, width',text_width);
//        console.log('defil, nb_steps',nb_steps);

        // start defil
        var position = 0;

        setInterval(function(){
            if(nb_steps > 0){
//                console.log('defil nb_steps',nb_steps);
                $infos_text.css('left', position);
                position = position - pane;
                nb_steps --;
            }
        },1000);
        // end defilText()


        pm.manager.history.bindLinks($ghettoblaster);
    };

    /**
     *
     */
    var refreshbind = function ($parent) {
        console.info('refreshbind');

        var $post = $('#post-' + _currentidplay);
        _ispostondisplay = !!$post.length;
        $currentplayer.off(timelineevents, _gotothistime); // before update current
        $currentplayer          = $post.find('.player');
        DOMcurrentloadprogress  = $currentplayer.find('.loaded')[0];
        DOMcurrenttimeline      = $currentplayer.find('.currenttime')[0];
        DOMcurrenttimetext      = $currentplayer.find('.timetext')[0];
        DOMcurrenttotaltimetext = $currentplayer.find('.totaltime')[0];
        $currentplayer.on(timelineevents, _gotothistime);

        if($parent){
            $parent.find('.JSplaysoundbyid').on('click', _getandplaythissound);
        }


    };

    var _getandplaythissound = function(e){
        console.info('_getandplaythissound', e);
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        pauseall();

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
        console.info('_pausesound');
        var __sound = sound ? sound : _sound;
        var hasbeenpaused = false;
        if(__sound){
            hasbeenpaused = !__sound.paused;
            __sound.pause();
            pushButton('pause');
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
        console.info('_resumesound');
        var __sound = sound ? sound : _sound;
        var hasbeenresumed = false;
        if(__sound){
            hasbeenresumed = __sound.paused;
            __sound.resume();
            pushButton('play');
        }
        return hasbeenresumed;
    };


    var _playtheveryfirstsoundinpage = function () {
        console.info('_playtheveryfirstsoundinpage');
        var soundid = $('.wpaudio').first().data('soundid');
        _playthissound(_getmp3byid(soundid), soundid, false)
    };


    /**
     * play the first sound found or resume a paused sound
     */
    var playSound = function(){
        console.info('playSound', _sound);
        if(_sound){
            if(_sound.paused){
                _resumesound();
            }
        }
        else{
            _playtheveryfirstsoundinpage();
        }
    };


    var togglePlayPause = function () {
        if (debug)console.info('togglePlayPause');
        if(_sound && !_sound.paused){
            _pausesound();
        }
        else {
            playSound();
        }
    };

    /**
     * Keyboard shortcuts
     * @param e
     * @private
     */
    var _keyboardshortcuts = function (e) {
        console.info('_keyboardshortcuts', e);
        var is_keyboard_shortcut = false;
        var is_keyup = e.type === 'keyup'; // keyup or keydown
        var key_code = e.keyCode;
        var is_shift = e.shiftKey;
        var is_ctrl = e.ctrlKey;
        var is_left_arrow = key_code === 37;
        var is_right_arrow = key_code === 39;
        var is_spacebar = key_code === 32;
        var is_music_play_pause_key = key_code === 179; // some keyboards have a sound play/pause button

        // toggle play/pause
        // we test event keyup because we don't want infinite toggle when user keeps pressing
        if(is_spacebar && is_keyup || is_music_play_pause_key && is_keyup){
            togglePlayPause();

            is_keyboard_shortcut = true;
        }
        // rewind <<
        else if(!is_shift && !is_ctrl && is_left_arrow){
            _rewind();
            is_keyboard_shortcut = true;
        }
        // fast forward >>
        else if(!is_shift && !is_ctrl && is_right_arrow){
            _fastForward();
            is_keyboard_shortcut = true;
        }
        // rewind faster
        else if(!is_shift && is_ctrl && is_left_arrow){
            _rewind(10000);
            is_keyboard_shortcut = true;
        }
        // fast forward faster
        else if(!is_shift && is_ctrl && is_right_arrow){
            _fastForward(10000);
            is_keyboard_shortcut = true;
        }
        // previous track
        else if(is_shift && is_left_arrow){
            _usergoprev();
            is_keyboard_shortcut = true;
        }
        // next track
        else if(is_shift && is_right_arrow){
            _usergonext();
            is_keyboard_shortcut = true;
        }

        if(is_keyboard_shortcut){
            e.preventDefault();
        }
    };

    var _unbindplaybyid = function ($elem) {
        console.info('_unbindplaybyid');
        $elem.off('click', _getandplaythissound);
    };
    var _bindplaybyid = function ($elem) {
        console.info('_bindplaybyid');
        $elem.on('click', _getandplaythissound);

    };
    var previewhaspausedcurrentsound = false;
    var _previewsound = function ($elem) {
        console.info('_previewsound');

        previewhaspausedcurrentsound = false;
        _unbindplaybyid($elem);

        $elem.off('mouseup mouseout', _cancelbeforepreviewbegin);
        $elem.on('mouseup mouseout', _previewend);

        var id = $elem.data('soundid');

        _soundpreviewid = 'preview' + id;
        soundManager.createSound({
            url:_getmp3byid(id),
            id: _soundpreviewid,
            autoPlay: true,
            autoLoad: true,
            onload: function(){
                var __starttime = 10*1000;
                this.onPosition(__starttime, function() {
                    previewhaspausedcurrentsound = _pausesound();
                });
                _playsoundattime(__starttime, _soundpreview);

            }
        });
        _soundpreview = soundManager.sounds[_soundpreviewid];

    };
    var _onpreviewendfinally = function () {
        console.info('_onpreviewendfinally');
        $previewtitle.animate({opacity:0},{duration:500,complete:function(){$(this).remove()}});
    };

    var _previewend = function (e) {
        console.info('_previewend');
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

        $elem.one('click', function(e){
            //ugly canceler, avoid playing sound on release mousedown
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
        });
        _bindplaybyid($elem);
        $elem.off('mouseup mouseout', _previewend);
        _onpreviewendfinally();
    };
    var TIMEOUTpreview = 0;
    var _cancelbeforepreviewbegin = function () {
        console.info('_cancelbeforepreviewbegin');
        var $elem = $(this);
        $elem.off('mouseup mouseout', _cancelbeforepreviewbegin);
        clearTimeout(TIMEOUTpreview);
        _onpreviewendfinally();
    };
    var _previewsoundbyidctrl = function (e) {
        console.info('_previewsoundbyidctrl');
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        // settimout unbind
        var $elem = $(this);
        $previewtitle.css({opacity:0}).html('hold your click to preview');//todo translate
        $elem.append($previewtitle);
        $previewtitle.animate({opacity:1},{duration:500});
        $elem.on('mouseup mouseout', _cancelbeforepreviewbegin);
        TIMEOUTpreview = setTimeout(function(){_previewsound($elem)}, 500);

    };


    /**
     * Mark player button as pushed (skin)
     * @param action
     */
    var pushButton = function (action) {
        if (debug)console.info('pushButton');

        var button_id = '#control-' + action;
        var id_pushed = button_id + '-pushed';
        var $control_pushed = $(id_pushed);
        var is_already_pushed = $control_pushed.hasClass('active');

        if(!is_already_pushed){
            // remove cursor hand
            $controls_all.removeClass('active');
            $(button_id).addClass('active');

            // show control "pushed"
            $controls_pushed_all.removeClass('active');
            $control_pushed.addClass('active');
        }
    };

    /**
     * Player control manager
     * What to do when asking an action with the player (onclick)
     */
    var playerControlManager = function () {
        console.info('playerControlManager');
        var $control_clicked = $(this),
            id = $control_clicked.attr('id'),
            action = id.split('control-')[1],
            is_already_pushed = $control_clicked.hasClass('active');

        if(!is_already_pushed){
            // aaaand ... action !
            switch (action){
                case 'pause':
                    _pausesound();
                    break;

                case 'play':
                    playSound();
                    break;

                case 'rewind':
                    _rewind();
                    break;

                case 'forward':
                    _fastForward();
                    break;

                case 'prev':
                    _usergoprev();
                    break;

                case 'next':
                    _usergonext();
                    break;
            }
        }
    };

    /**
     * Bind player controls
     * @private
     */
    var _bind_controls = function () {
        console.info('_onsoundmanagerready');

        $linkplaysoundbyid.on('click', _getandplaythissound);
        $linkpreviewsoundbyid.on('mousedown', _previewsoundbyidctrl);

        // New K7 buttons
        $controls_all.on('click', playerControlManager);
        // info
        $infos_text.addClass('history').html('micromix').attr('href', '/');


        // bind
        $(window).on('keydown keyup', _keyboardshortcuts);
        $(window).on('scroll', stickGhettoToBottom);

        if(_autoplay){
            _playtheveryfirstsoundinpage();
        }
    };



    /**
     * Counter
     * @constructor
     */
    var Counter = function(){
        var old_num = 0; // init
        var NUM_HEIGHT = 14;

        this.update = function(number){
            var digits = number ? Math.round(number) : 'error : wrong number';
            if(digits != old_num){
                digits = typeof digits == 'number' ? digits.toString() : digits;

                // add zeros if less then 3 digits
                while(digits.length < 3){
                    digits = '0' + digits;
                }

                digits.split('').forEach(function(num,index){
                    $('#unit-'+(index+1)).css({ 'top':-(NUM_HEIGHT*num)+'px' });
                });

                // save
                old_num = digits;
            }
        };

    };


    var init = function () {
        if (debug)console.info('init');

        counter = new Counter();


        // cassette deck animation
        // todo TEST function
        var toggleOpenDeck = function () {
            $('#deck').toggleClass('open');
            $('#deck-door-shadow').toggleClass('active');
        };
        $('#deck').on('click', toggleOpenDeck);

        // todo TEST function
        var toggleCassetteMove = function () {
            $('#cassette').toggleClass('move');
        };
        $('#cassette').on('click', toggleCassetteMove);

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
            url: theme_path.replace(location.protocol + '//' + location.host, '') + '/swf/', //todo find a better whay to extract the themepath without http full link
            // optional: prefer HTML5 over Flash for MP3/MP4
            flashVersion: 9, // for VU meter
            debugMode: true,
            preferFlash: true,
            useFastPolling:true, // for VU meter
            flashPollingInterval: 100, // for VU meter
            useHighPerformance : true,// for VU meter
            onready: _bind_controls,
            defaultOptions: {
                // set global default volume for all sound objects
                volume: 100
            }

        });
    };

    this.initsound = init;
    this.refreshbind = refreshbind;
};


