/**
 * MANGE THE SOUND
 * BECAUSE I MAKE TYPO
 * @constructor
 */
var Managethesound = function(){

    // DAT LIST
    var debug = /localhost/.test(document.location.href);
    var counter = null;
    var $empty = $();
    var $infos_text = $('#infos-text');
    var $cassette_player = $('#cassette-player');
    var $k7face = $('.k7_face');
    var $info = $('#infos');
    var $controls_all = $cassette_player.find('.control');
    var $controls_pushed_all = $cassette_player.find('.control-pushed');
//    var $listsitems = $('#posts-year-month .list-item');
//    var $previewtitle = $('<span>').addClass('sound-preview-title');
//    var $currentsoundplayer = $empty;
//    var classnamecurrentlistitem = 'currentsoundplayed';
    var $linkplaysoundbyid = $('.JSplaysoundbyid');
//    var $linkpreviewsoundbyid = $('.JSpreviewsoundbyid');

    var $cassette = $('.cassette');
    var $cassetteToClone = $cassette.clone();
    var $crans = $cassette.find('.cran');

    var _currentidplay = '';
    var _maybecurrentidplay = '';
    var _lastidplay = '';
    var _currentindexplay = 0;
    var _maybecurrentindexplay = 0;
    var _lastindexplay = 0;
//    var $currentplayer = $empty;
//    var DOMcurrenttimeline = null;
//    var DOMcurrentloadprogress = null;
//    var DOMcurrenttimetext = null;
//    var DOMcurrenttotaltimetext = null;
    var is_post_in_the_page = false;

    var _playlist = typeof list_all_posts === 'object' ? list_all_posts : [];
    var _coverbyid = {};
    var _mp3byid = {};
    var _mp3byindex = {};
    var _urlbyid = {};
    var _urlbyindex = {};
    var _indexbyid = {};
    var _idbyindex = {};

//    var timelineevents = 'mousedown mousemove'; // add touch if touch

//    var splayingclassname = 'active';
    var _sound = null;
//    var _soundpreview = null;
//    var _soundpreviewid = null;
    var _starttime = null;
    var _autoplay = false;


    (function(){
        for (var index = 0; index < _playlist.length; index++) {
            var obj = _playlist[index];
            var mp3 = obj.mp3;
            var url = obj.url;
            var id = obj.id;
            var cover = obj.imgcover;
            _mp3byid[id] = mp3;
            _mp3byindex[index] = mp3;
            _urlbyid[id] = url;
            _urlbyindex[index] = url;
            _indexbyid[id] = index;
            _idbyindex[index] = id;
            _coverbyid[id] = cover;
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
        if (debug)console.info('_geturlbyid', id);
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
    var _getcoverbyid = function (id) {
        if (debug)console.info('_getindexbyid');
        return _coverbyid[id]
    };


    var TIMEOUTanimatewindowtitle = 0;
    var _actualchardocumenttitle = '♫';
    var _animatedocumenttitle = function () {
//        if (debug)console.info('_animatedocumenttitle');
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
//        if (debug)console.info('_cancelanimatedocumenttitle');
        clearTimeout(TIMEOUTanimatewindowtitle);
        document.title = document.title.replace(/[♫|♪] /, '');
    };

    var _onplay = function(){
        if (debug)console.info('_onplay');
        if(this.readyState == 2){
            _onmp3fail();
            playSound();
        }
        else{
            _onClickPlay();
            _animatedocumenttitle();
        }

        $('.list-item.active').removeClass('active');
        $('.micromix-id-' + _sound.id).addClass('active');
        _starttime = null;
        _autoplay = false;
    };

    var _onpause = function(){
//        if (debug)console.info('_onpause');
        _onClickPause();
        _cancelanimatedocumenttitle();
    };
    var _onresume = function(){
//        if (debug)console.info('_onresume');
        _onplay.apply(this);
    };
    var _onstop = function(){
//        if (debug)console.info('_onstop');
        _onClickPause();
    };
    var _onid3 = function(){
//        if (debug)console.info('_onid3', this.id3);
    };
    var _ondestroy = function(){
//        if (debug)console.info('_ondestroy');
        _onpause();
    };
    var _onfinishsound = function () {
//        if (debug)console.info('_onfinishsound');
        _playnextsound();
    };
    var _ondataerror = function () {
//        if (debug)console.error('_ondataerror');

    };
    var _onload = function (isloaded) {
//        if (debug)console.info('_onload', isloaded);

        if(!isloaded){
            _onloadfail.apply(this, arguments);
        }

//        _playsoundattime(1, _sound); // "0" won't play the sound in flash player 9 mode. dunno why
//        _starttime = null;
//        _autoplay = false;

    };

    /**
     *
     * @param starttime
     * @param sound
     * @private
     */
    var _playsoundattime = function (starttime, sound) {
        if (debug)console.warn('_playsoundattime', sound);
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
        if (debug)console.info('_onloadfail');
        playSound();
        if (debug)console.error('network error or mp3 missing');

    };
    var _onmp3fail = function () {
        if (debug)console.info('_onmp3fail');
        $.get('/').always(function(data, status, xhr){
            if(status === 'error') {
                if (debug)console.error('OUPS, ' + location.host + ' IS UNREACHABLE, Y U NO PAY INTENRET CONNEXION ? LOLOLOLOLOLOL');
                //show a status to tell that intenret has gone, and will never be back :(
            }
            else if(status === 'success'){
                if (debug)console.error('MP3 IS DEAD, PLEASE PLAY NEXT, REFRESH OR FREEZE ON THE DANCEFLOOR');
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

        // update player COUNTER
        var position = this.position;
        if (Math.abs(position - _lastupdatetimeprogress) > 1000) {
            _lastupdatetimeprogress = position;
            var progression = position / this.duration * 100;
            counter.update(progression);
        }
    };


    var _updateloadprogress = function (force) {
//            if (debug)console.info('_updateloadprogress');//flood
        if(is_post_in_the_page){
//            var position = this.bytesLoaded;
//            if((position - _lastupdateloadprogress) > 0.01 || force){
//                _lastupdateloadprogress = position;
//                DOMcurrentloadprogress.style.cssText = 'width:' + (position/this.bytesTotal  *100 + '%;');
//                var otime = _getminutesandseconds(this.duration / 1000);
//                DOMcurrenttotaltimetext.textContent = otime.m + 'm:' + otime.s + 's';
//            }
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
        if (debug)console.info('_usergonextprevanimation');



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
            pushButton(direction);
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
            if (debug)console.warn('no more sound, shall we play the first sound ?')
        }
    };


    var _playprevsound = function (wait) {
        if (debug)console.info('_playprevsound');

        if(_maybecurrentindexplay-1 >= 0){
            _playthissound(_getmp3byindex(_maybecurrentindexplay-1), _getidbyindex(_maybecurrentindexplay-1), wait);
        }
        else{
            if (debug)console.warn('no more sound, shall we play the last sound? ')
        }
    };
    var intervalTimoutRewindForward = 125;
    var diffTimeRewindForward = 200;
    var TIMEOUTforward = 0;
    var TIMEOUTrewind = 0;

    var _clearRewindForward = function () {
        clearTimeout(TIMEOUTforward);
        clearTimeout(TIMEOUTrewind);
        if (_sound.paused) {
            _onClickPause()
        }
        else {
            _onClickPlay()
        }
    };
    /**
     *
     * @param time {Number}
     * @private
     */
    var _fastForward = function (time) {
        if (debug)console.info('_fastForward', time);
        var loop = typeof time === 'boolean' ? time : false;
        var _time = typeof time === 'number' ? time : diffTimeRewindForward;
        if(_sound){
            _onClickForward();
            var position = _sound.position;
            _gotoposition(position + _time);
            if (loop) {
                TIMEOUTforward = setTimeout(function () {
                    _fastForward(time)
                }, intervalTimoutRewindForward);
            }

        }
    };

    /**
     *
     * @param time {Number}
     * @private
     */
    var _rewind = function (time) {
        if (debug)console.info('_rewind', time);
        var loop = typeof time === 'boolean' ? time : false;
        var _time = typeof time === 'number' ? time : diffTimeRewindForward;
        if (_sound) {
            _onClickRewind();
            var position = _sound.position;
            var new_pos = position - _time;
            _gotoposition(new_pos, _sound);
            if (loop) {
                TIMEOUTrewind = setTimeout(function () {
                    _rewind(time)
                }, intervalTimoutRewindForward);
            }
        }
    };

    /**
     *
     * @param position {Number}
     * @private
     * @param sound
     */
    var _gotoposition = function (position, sound) {
        if (debug)console.info('_gotoposition', position);
        var __sound = sound || _sound; // if not provided, use the current cound
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
     * @param wait
     */
    var _playthissound = function (url, id, wait, animation) {
        if (debug)console.warn('_playthissound', id, _maybecurrentindexplay, wait);

        if(!animation){
            _pausesound();
            return cassetteWantToMoveOutTheBox(url, id, wait)
        }
        //todo play the sound of player starting playing new cassette

        _maybecurrentidplay = id;
        _maybecurrentindexplay = _getindexbyid(_maybecurrentidplay);
        clearTimeout(TIMEOUTusergoprevnext);
        if(wait){
            TIMEOUTusergoprevnext = setTimeout(function(){
                _playthissound(_getmp3byid(_maybecurrentidplay), _maybecurrentidplay, false, true);
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
        _updatehtmlinfo();
    };

    var INTERVAL_infortext = 0;
    var _updatehtmlinfo = function () {
//        if (debug)console.info('defil _updatehtmlinfo');
        var $currentlink = $('.micromix-id-' + _currentidplay);
        var textnumber = $currentlink.find('span:first').html();
        var title = latinize($currentlink.find('a').prop('innerText'));
        var finaltext = 'Micromix ' + textnumber + ' - ' + title;
        $infos_text.html(finaltext);
        $infos_text.attr('href', _geturlbyid(_currentidplay));

        clearInterval(INTERVAL_infortext);
        // text defil animation (work in progress)
        // todo make a function of the defil text
        var pane = 18.19; // px (WTF, .19?)
        var letterCounts = $infos_text.html().length-8; //-8 is for screen width
        var nb_steps = letterCounts;
        var nb_steps_origine = letterCounts;

        // start defil
        var position = 0;
        var whileTo = 0;
        var incremant = 1;
        INTERVAL_infortext = setInterval(function(){
            if(nb_steps > whileTo){
                position = position - pane;
                $infos_text.css('left', position);
                nb_steps = nb_steps - incremant;
            }
            else if(nb_steps < whileTo){
                position = position + pane;
                $infos_text.css('left', position);
                nb_steps = nb_steps + incremant;
            }
            else{
                if(whileTo === 0){
                    whileTo = nb_steps_origine;
                }
                else{
                    whileTo = 0;
                }
            }

        },500);
        // end defilText()


        pm.manager.history.bindLinks($cassette_player);
    };

    /**
     *
     */
    var refreshbind = function ($parent) {
        if (debug)console.info('refreshbind');

        var $post = $('#post-' + _currentidplay);
        is_post_in_the_page = !!$post.length;
//        $currentplayer.off(timelineevents, _gotothistime); // before update current
//        $currentplayer          = $post.find('.player');
//        DOMcurrentloadprogress  = $currentplayer.find('.loaded')[0];
//        DOMcurrenttimeline      = $currentplayer.find('.currenttime')[0];
//        DOMcurrenttimetext      = $currentplayer.find('.timetext')[0];
//        DOMcurrenttotaltimetext = $currentplayer.find('.totaltime')[0];
//        $currentplayer.on(timelineevents, _gotothistime);

        if($parent){
            $parent.find('.JSplaysoundbyid').on('click', _getandplaythissound);
        }


    };

    var _getandplaythissound = function(e){
        if (debug)console.info('_getandplaythissound', e);
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


    var _playtheveryfirstsoundinpage = function () {
        if (debug)console.info('_playtheveryfirstsoundinpage');
        var soundIDinDOM = $('.wpaudio').first().data('soundid');
        var soundid = soundIDinDOM;
        if(!soundid) {
            var totalsound = list_all_posts.length -1;
            soundid = list_all_posts[Math.random2(0,totalsound)].id
        }
        _playthissound(_getmp3byid(soundid), soundid, false)
    };


    /**
     * play the first sound found or resume a paused sound
     */
    var playSound = function(){
        if (debug)console.info('playSound', _sound);
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
        if (debug)console.info('_keyboardshortcuts', e);
        if(/TEXTAREA|INPUT/.test(e.target.nodeName)){
            return;
        }
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
        if(is_spacebar && !is_keyup || is_music_play_pause_key && !is_keyup){
            togglePlayPause();

            is_keyboard_shortcut = true;
        }
        // rewind <<
        else if(!is_shift && !is_ctrl && is_left_arrow){
            _rewind();
            is_keyup && _clearRewindForward();
            is_keyboard_shortcut = true;
        }
        // fast forward >>
        else if(!is_shift && !is_ctrl && is_right_arrow){
            _fastForward();
            is_keyup && _clearRewindForward();
            is_keyboard_shortcut = true;
        }
        // rewind faster
        else if(!is_shift && is_ctrl && is_left_arrow){
            _rewind(10000);
            is_keyup && _clearRewindForward();
            is_keyboard_shortcut = true;
        }
        // fast forward faster
        else if(!is_shift && is_ctrl && is_right_arrow){
            _fastForward(10000);
            is_keyup && _clearRewindForward();
            is_keyboard_shortcut = true;
        }
        // previous track
        else if(is_shift && is_left_arrow){
            is_keyup && _usergoprev();
            is_keyboard_shortcut = true;
        }
        // next track
        else if(is_shift && is_right_arrow){
            is_keyup && _usergonext();
            is_keyboard_shortcut = true;
        }

        if(is_keyboard_shortcut){
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
//    var previewhaspausedcurrentsound = false;
/*
    var _previewsound = function ($elem) {
        if (debug)console.info('_previewsound');

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
*/
/*
    var _onpreviewendfinally = function () {
        if (debug)console.info('_onpreviewendfinally');
        $previewtitle.animate({opacity:0},{duration:500,complete:function(){$(this).remove()}});
    };
*/

/*
    var _previewend = function (e) {
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
*/
//    var TIMEOUTpreview = 0;
/*
    var _cancelbeforepreviewbegin = function () {
        if (debug)console.info('_cancelbeforepreviewbegin');
        var $elem = $(this);
        $elem.off('mouseup mouseout', _cancelbeforepreviewbegin);
        clearTimeout(TIMEOUTpreview);
        _onpreviewendfinally();
    };
*/
/*
    var _previewsoundbyidctrl = function (e) {
        if (debug)console.info('_previewsoundbyidctrl');
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        // settimout unbind
        var $elem = $(this);
        $previewtitle.css({opacity:0}).html('hold your click to preview');
        $elem.append($previewtitle);
        $previewtitle.animate({opacity:1},{duration:500});
        $elem.on('mouseup mouseout', _cancelbeforepreviewbegin);
        TIMEOUTpreview = setTimeout(function(){_previewsound($elem)}, 500);

    };
*/


    /**
     * Mark player button as pushed (skin)
     * @param action
     */
    var pushButton = function (action) {
        if (debug)console.info('pushButton',action);

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
    var playerControlManager = function (e) {
//        if (debug)console.info('playerControlManager', e);
        var $control_clicked = $(this),
            id = $control_clicked.attr('id'),
            action = id.split('control-')[1],
            is_already_pushed = $control_clicked.hasClass('active'),
            is_click = e.type === 'click',
            is_mouseleave = e.type === 'mouseleave',
            is_mouseup = e.type === 'mouseup',
            is_mousedown = e.type === 'mousedown';
        // aaaand ... action! NO NON NONONOONO I DON'T GIVE A SHIIIIIIIIT
        switch (action) {
            case 'pause':
                !is_already_pushed && is_click && _pausesound();
                break;
            case 'play':
                !is_already_pushed && is_click && playSound();
                break;
            case 'rewind':
                if(is_mouseleave && e.which && is_already_pushed || is_mouseup){
                    _clearRewindForward();
                }
                else if (!is_click && !is_mouseleave) {
                    _rewind(is_mousedown);
                }
                break;
            case 'forward':
                if(is_mouseleave && e.which && is_already_pushed || is_mouseup){ // if mouseleave and mouse button is pressed and interface button is pushed or mouseup
                    _clearRewindForward();
                }
                else if (!is_click && !is_mouseleave) {
                    _fastForward(is_mousedown);
                }
                break;
            case 'prev':
                !is_already_pushed && is_click && _usergoprev();
                break;
            case 'next':
                !is_already_pushed && is_click && _usergonext();
                break;
        }
    };

    var _onClickPlay = function () {
        pushButton('play');
        $cassette.removeClass('rotatingfastforward rotatingrewind');
        $cassette.addClass('rotating');
    };
    var _onClickPause = function () {
        pushButton('pause');
        $cassette.removeClass('rotatingfastforward rotating rotatingrewind');
    };
    var _onClickForward = function () {
        pushButton('forward');
        $cassette.removeClass('rotating rotatingrewind');
        $cassette.addClass('rotatingfastforward');
    };
    var _onClickRewind = function () {
        pushButton('rewind');
        $cassette.removeClass('rotating rotatingfastforward');
        $cassette.addClass('rotatingrewind');
    };

    /**
     * Bind player controls
     * @private
     */
    var _bind_controls = function () {
        if (debug)console.info('_onsoundmanagerready');

        $linkplaysoundbyid.on('click', _getandplaythissound);
//        $linkpreviewsoundbyid.on('mousedown', _previewsoundbyidctrl);

        // New K7 buttons
        $controls_all.on('mousedown mouseup click mouseleave', playerControlManager);
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

        var $unit3 = $('#unit-3');
        var $reelTapeRight = $cassette.find('.right .tape');
        var $reelTapeLeft = $cassette.find('.left .tape');
        var html = $unit3.html();
        $unit3.html(html + html + html + html + html + html + html + html + html + html + html);//llollololololololol

        // tape 19 to 80px margin

        this.update = function(number){
            var originaldigit;
            var digits = originaldigit = number ? Math.round(number) : 'error : wrong number';
            if(digits != old_num){
                digits = typeof digits == 'number' ? digits.toString() : digits;
                $reelTapeLeft.css('margin', 19 + (originaldigit / 100 * 61)); // 19 + (100 / 100 * 61)
                $reelTapeRight.css('margin', 80 - (originaldigit / 100 * 61));
                // add zeros if less then 3 digits
                while(digits.length < 3){
                    digits = '0' + digits;
                }

                digits.split('').forEach(function(num,index){
                    var _num = index === 2 ? originaldigit : num;
                    $('#unit-'+(index+1)).css({ 'top':-(NUM_HEIGHT*_num)+'px' });
                });

                // save
                old_num = digits;
            }
        };

    };


    /* ANIMATIONS */
    /* PLAYER : OPEN DECK DOOR */
    var $deck = $('#deck');
    var openDeckDoor = function () {
        $deck.addClass('open');
        $('#deck-door-shadow').addClass('active');
        return $.Velocity.animate($deck,{
            rotateX:'-30deg'
        }, {
            easing: "easeInOut",
            duration: 300
        });
    };


    /* PLAYER : CLOSE DECK DOOR */
    var closeDeckDoor = function () {
        $deck.removeClass('open');
        $('#deck-door-shadow').removeClass('active');
        return $.Velocity.animate($deck,{
            rotateX:'0deg'
        }, {
            easing: "easeInOut",
            duration: 300
        });
    };

    // debug mode
    $deck.on('click', function(){
        //todo play another animation if the K7 is playing

        if($deck.hasClass('open')){
            closeDeckDoor();
        }
        else {
            openDeckDoor();
        }
    });

    var cassetteWantToMoveOutTheBox = function (url, id, wait) {
        console.error('cassetteWantToMoveOutTheBox');

        //todo we need to know if the cassette is in the flux, or in the menu
        //actually it's ok, but maybe the animation shoulb be different

        var _callback = function () {
            _playthissound(url, id, wait, true)
        };

        var isPostInList = $('#post-' + id).length;


        if ($cassette.hasClass('is-inside-player')) {
            openDeckDoor().then(function () {
                cassetteMoveOutPlayer().then(function () {
                    if (isPostInList) {
                        cassetteMoveOutTheBox(id).then(function () {
                            cassetteMoveInPlayer(id).then(function () {
                                closeDeckDoor().then(_callback);
                            })
                        });
                    }
                    else {
                        cassetteMoveInPlayer(id).then(function () {
                            closeDeckDoor().then(_callback);
                        })
                    }
                })
            })
        }
        else {
            openDeckDoor().then(function () {
                if (isPostInList) {
                    cassetteMoveOutTheBox(id).then(function () {
                        cassetteMoveInPlayer(id).then(function () {
                            closeDeckDoor().then(_callback);
                        })
                    });
                }
                else {
                    cassetteMoveInPlayer(id).then(function () {
                        closeDeckDoor().then(_callback);
                    })
                }
            });
        }
    };

    var cassetteMoveOutTheBox = function (id) {
        if (debug) {
            console.info('cassetteMoveOutTheBox')
        }
        var $k7out = $cassetteToClone.clone();
        var imgFatSrc = _getcoverbyid(id);

        $k7out.find('.k7_face').css('background-image', 'url(' + imgFatSrc + ')');
        $k7out.css({bottom: 0, right: 0, zIndex: 1});

        $('#post-' + id).css('z-index', 3);
        var $postimage = $('#bt-player-' + id).parents('.post-image');
        $postimage.prepend($k7out);

        var bottom = ($postimage.offset().top + $postimage.height()) - $(document).scrollTop();
        var left = ($('#deck').offset().left - $postimage.offset().left);
        return $.Velocity.animate($k7out, {
            left: left,
            bottom: bottom//todo calculate the exact pixel we need to move
        }, {
            duration: 100 + (bottom / 1.2),
            delay: 250,
            easing: 'linear',
            complete: function () {
                $k7out.remove();
                $('#post-' + id).css('z-index', 0);
            }
        });
    };

    /**
     * Move the cassette out of the player
     * @returns Velocity promise
     */
    var cassetteMoveOutPlayer = function () {
        if (debug) {
            console.info('cassetteMoveOutPlayer')
        }
        openDeckDoor();
        var bottom = $(window).height();

        return $.Velocity.animate($cassette,{
            right: 0,
            bottom: bottom,
            scale: 1
        }, {
            duration: 100 + (bottom/1.2),
            easing: 'linear',
            delay: 250
        });


    };
    /**
     * Move the cassette in the player
     * @returns Velocity promise
     */
    var cassetteMoveInPlayer = function (id) {
        console.error('cassetteMoveInPlayer');
        if (!$cassette.hasClass('is-inside-player')) {
        }

        var imgFatSrc = _getcoverbyid(id);
        $k7face.css('background-image','url('+imgFatSrc+')');

        return $.Velocity.animate($cassette,{
            right: 157,
            bottom: 61,
            scale: 0.55
        }, {
            duration: 1000,
            easing: 'linear',
            complete: function () {
                $cassette.addClass('is-inside-player');
            }
        });
    };


    var init = function () {
        if (debug)console.info('init');

        // instance the counter
        counter = new Counter();

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
            url: theme_path.replace(location.protocol + '//' + location.host, '') + '/swf/',
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


