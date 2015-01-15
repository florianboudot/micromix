/**
 * MANGE THE SOUND
 * BECAUSE I MAKE TYPO
 * @constructor
 */
var Managethesound = function () {

    // DAT LIST
    var debug = /localhost/.test(document.location.href);
    var counter = null;
    var $infos_text = $('#infos-text');
    var $cassette_player = $('#cassette-player');
    var $k7face = $('.k7_face');
    var $controls_all = $cassette_player.find('.control');
    var $controls_pushed_all = $cassette_player.find('.control-pushed');
    var $linkplaysoundbyid = $('.JSplaysoundbyid');

    var EVENT_down = Modernizr.touch ? 'touchstart' : 'mousedown';
    var EVENT_up = Modernizr.touch ? 'touchend' : 'mouseup';
    var EVENT_click = Modernizr.touch ? 'click' : 'click';
    var EVENT_leave = Modernizr.touch ? 'touchcancel' : 'mouseleave';

    var $cassette = $('.cassette');
    //var $cassetteToClone = $cassette.clone();

    var _currentidplay = '';
    var _maybecurrentidplay = '';
    var _lastidplay = '';
    var _currentindexplay = 0;
    var _maybecurrentindexplay = 0;
    var _lastindexplay = 0;
    var is_post_in_the_page = false;
    var _animatingCassette = false;

    var originalPlaylist = typeof window.list_all_posts === 'object' ? window.list_all_posts : [];
    var _playlist = originalPlaylist;
    var _originalindexbyid = {};
    var _originalidbyindex = {};
    var _indexbyid = {};
    var _idbyindex = {};
    var _playlistSize = 0;
    var _sound = null;
    var _starttime = null;
    var _autoplay = false;

    var contextMenuAction = function () {
        return false;
    };
    var _cancelcontextmenu = function () {
        $(window).on('contextmenu', contextMenuAction);
    };
    var _allowcontextmenu = function () {
        $(window).off('contextmenu', contextMenuAction);
    };

    var _indexReferences = function (playlist) {
        var feedPlaylist = playlist;
        _playlistSize = feedPlaylist.length;
        for (var index = 0; index < _playlistSize; index++) {
            var obj = feedPlaylist[index];
            var id = obj.id;
            _originalindexbyid[id] = index;
            _originalidbyindex[index] = id;
            _indexbyid[id] = index;
            _idbyindex[index] = id;
        }
    };
    _indexReferences(_playlist);

    /**
     * return an object of a sound
     * @param id {Number} of post ID
     * @returns {{id: *, mp3, imgcover, url}}
     * @private
     */
    var _createPlaylistItem = function (id) {
        return {
            id: id,
            mp3: _getmp3byid(id),
            imgcover: _getcoverbyid(id),
            url: _geturlbyid(id)
        }

    };

    /**
     *
     * @param ids {Array} of post ID
     */
    var createNewPlaylist = function (ids) {
        if (debug) {
            console.info('createNewPlaylist', ids.length)
        }
        _playlist = [];
        _indexbyid = {};
        _idbyindex = {};
        _playlistSize = ids.length;
        for (var i = 0; i < _playlistSize; i++) {
            var id = ids[i];
            var item = _createPlaylistItem(id);
            _playlist.push(item);
            _indexbyid[id] = i;
            _idbyindex[i] = id;
        }
        _maybecurrentindexplay = _getindexbyid(id) ? _getindexbyid(id) : 0;
        _currentindexplay = _maybecurrentindexplay;

    };

    /**
     *
     * @param id {Number} of post ID
     */
    var queueToPlaylist = function (id) {
        if (debug) {
            console.info('queueToPlaylist')
        }
        var item = _createPlaylistItem(id);
        _playlist.push(item);
        _indexbyid[id] = _playlistSize;
        _idbyindex[_playlistSize] = id;
        _playlistSize++;
    };

    var playNextInPlaylist = function () {
        if (debug) {
            console.info('playNextInPlaylist')
        }

    };

    /*window.queuToPlaylist = function(id){
     queueToPlaylist(id)
     };
     window.createPlaylistFromArticles = function(){
     createPlaylistFromArticles()
     };
     window.getPlaylist = function () {
     return {
     _playlist: _playlist,
     _idbyindex: _idbyindex,
     _indexbyid: _indexbyid
     };
     };
     */


    //todo check properly if .article are there
    var createPlaylistFromArticles = function () {
        if (debug) {
            console.info('createPlaylistFromArticles')
        }
        var ids = [];
        $('.article').each(function () {
            ids.push(this.id.replace('post-', '') << 0);
        });
        createNewPlaylist(ids);
    };

    var _isamix = function(id){
        return !!_originalindexbyid[id];
    };

    var _getmp3byid = function (id) {
        //if (debug)console.info('_getmp3byid', id);
        //if (debug)console.trace('_getmp3byid', id);
        var getoriginalindexbyid = _getoriginalindexbyid(id);
        return getoriginalindexbyid ? originalPlaylist[getoriginalindexbyid].mp3 : getoriginalindexbyid;
    };
    var _geturlbyid = function (id) {
        //if (debug)console.info('_geturlbyid', id);
        return originalPlaylist[_getoriginalindexbyid(id)].url;
    };
    var _getoriginalindexbyid = function (id) {
        //if (debug)console.info('_getindexbyid');
        return _originalindexbyid[id];
    };
    var _getidbyindex = function (index) {
        //if (debug)console.info('_getidbyindex');
        return _idbyindex[index]
    };
    var _getindexbyid = function (id) {
        //if (debug)console.info('_getindexbyid');
        return _indexbyid[id]
    };
    var _getcoverbyid = function (id) {
        //if (debug)console.info('_getindexbyid');
        return originalPlaylist[_getoriginalindexbyid(id)].imgcover
    };
    var _getnumberbyid = function (id) {
        //if (debug)console.info('_getindexbyid');
        return typeof _getoriginalindexbyid(id) === 'number' && originalPlaylist[_getoriginalindexbyid(id)].number
    };


    var TIMEOUTanimatewindowtitle = 0;
    var _actualchardocumenttitle = '♫';
    var _animatedocumenttitle = function () {
//        if (debug)console.info('_animatedocumenttitle');
        var oldchar = _actualchardocumenttitle;
        _actualchardocumenttitle = _actualchardocumenttitle === '♪' ? '♫' : '♪';
        if (/[♪|♫]/.test(document.title)) {
            document.title = document.title.replace(oldchar, _actualchardocumenttitle);
        }
        else {
            document.title = _actualchardocumenttitle + ' ' + document.title;
        }
        TIMEOUTanimatewindowtitle = setTimeout(_animatedocumenttitle, 2000);

    };

    var _cancelanimatedocumenttitle = function () {
//        if (debug)console.info('_cancelanimatedocumenttitle');
        clearTimeout(TIMEOUTanimatewindowtitle);
        document.title = document.title.replace(/[♫|♪] /, '');
    };

    var _UIPausing = function () {
        _onClickPause();
        _cancelanimatedocumenttitle();
    };
    var _UIPlaying = function () {
        _onClickPlay();
        _animatedocumenttitle();
    };

    var _onplay = function () {
        if (debug)console.info('_onplay');
        if (this.readyState == 2) {
            _onmp3fail();
            playSound();
        }
        else {
            _UIPlaying();
        }

        $('.list-item.active').removeClass('active');
        $('.micromix-id-' + _sound.id).addClass('active');
        _starttime = null;
        _autoplay = false;
    };

    var _onpause = function () {
        if (debug)console.info('_onpause');
        isPausing = false;
        _UIPausing();
    };
    var _onresume = function () {
        if (debug)console.info('_onresume');
        isPausing = false;
        _onplay.apply(this);
    };
    var _onstop = function () {
//        if (debug)console.info('_onstop');
        counter.update(0);
        save_peak_data_left = updateVuMeter(0, $left_leds, save_peak_data_left);
        save_peak_data_right = updateVuMeter(0, $right_leds, save_peak_data_right);
        _onClickStop();
    };
    var _onid3 = function () {
//        if (debug)console.info('_onid3', this.id3);
    };
    var _ondestroy = function () {
//        if (debug)console.info('_ondestroy');
        _onpause();
    };
    var _onfinishsound = function () {
//        if (debug)console.info('_onfinishsound');
        _playnextsound(false);
    };
    var _ondataerror = function () {
//        if (debug)console.error('_ondataerror');

    };
    var _onload = function (isloaded) {
//        if (debug)console.info('_onload', isloaded);

        if (!isloaded) {
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
        if (debug)console.info('_playsoundattime', sound);
        if (typeof starttime === "number") {
            var attemp = 0;
            var done = false;
            _setvolume(0, sound);
            var _interval = setInterval(function () {
                if (!sound) {
                    sound = {};
                    done = true;
                }
                if (typeof sound.position === 'number') {
                    if (sound.position < starttime) {
                        _gotoposition(starttime, sound);
                    }
                    else {
                        done = true;
                    }
                }
                attemp++;// about 10s
                if (attemp > 200 || done) {
                    _setvolume(100, sound);
                    clearInterval(_interval);
                }
            }, 50);
        }

    };

    var _onloadfail = function () {
        if (debug)console.info('_onloadfail');
        playSound();
        if (debug)console.error('network error or mp3 missing');

    };
    var _onmp3fail = function () {
        if (debug)console.info('_onmp3fail');
        $.get('/').always(function (data, status) {
            if (status === 'error') {
                if (debug)console.error('OUPS, ' + location.host + ' IS UNREACHABLE, Y U NO PAY INTENRET CONNEXION ? LOLOLOLOLOLOL');
                //show a status to tell that intenret has gone, and will never be back :(
            }
            else if (status === 'success') {
                if (debug)console.error('MP3 IS DEAD, PLEASE PLAY NEXT, REFRESH OR FREEZE ON THE DANCEFLOOR');
                //show a status somewhere (over the rainbow) to refresh, play next or play a funky gif of that stop dancing
            }
        });
    };

    /**
     *
     * @deprecated
     * @param fullseconds {Number} full seconds
     * @private
     */
    var _getminutesandseconds = function (fullseconds) {
        if (debug)console.info('_getminutesandseconds');
        var minVar = Math.floor(fullseconds / 60);
        var seconds = (fullseconds % 60) >> 0;
        return {s: seconds, m: minVar};
    };


    /* VU METER : LEDS ANIMATION */
    var $vu_meter = $('#vu-meter');
    var $left_leds = $vu_meter.find('.left .led');
    var $right_leds = $vu_meter.find('.right .led');
    var volume_factor = 1.1; // cheat to pump up the volume peak
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
    //var _lastupdateloadprogress = 0;
    var save_peak_data_left = 0;
    var save_peak_data_right = 0;
    var _updatetimeprogress = function () {
        //console.info('_updatetimeprogress',force, this.peakData);//flood

        // RUN VU METER
        if (!Modernizr.touch) {
            var peak_data_left = parseInt(this.peakData.left * 100);
            var peak_data_right = parseInt(this.peakData.right * 100);
            save_peak_data_left = updateVuMeter(peak_data_left, $left_leds, save_peak_data_left);
            save_peak_data_right = updateVuMeter(peak_data_right, $right_leds, save_peak_data_right);
        }

        // update player COUNTER
        var position = this.position;
        if (Math.abs(position - _lastupdatetimeprogress) > 1000) {
            _lastupdatetimeprogress = position;
            var progression = position / this.duration * 100;
            progression = progression === Infinity ? 0 : progression;
            counter.update(progression);
        }
    };

    var _gotothistime = function (e) {
        if (debug)console.info('_gotothistime');
        if (e.which === 1) {
            var eventtarget = e.target;
            var offsetx = this != eventtarget ? e.offsetX + eventtarget.offsetLeft : e.offsetX;
            var positionratio = offsetx / this.clientWidth;
            var totalduration = _sound.duration * positionratio;
            _sound.setPosition(totalduration);
        }
    };

    /**
     * @deprecated
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
        if (sound) {
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
            url: url,
            id: id,
            usePeakData: true,
            onplay: _onplay,
            onpause: _onpause,
            onresume: _onresume,
            onstop: _onstop,
            onid3: _onid3,
            //whileloading: _updateloadprogress,
            whileplaying: _updatetimeprogress,
            onfinish: _onfinishsound,
            ondataerror: _ondataerror,
            onload: _onload
        });
        _sound = soundManager.sounds[id];

        return _sound;
    };
    /*
     var _inicreatesound = function () {
     var audiosrc = this.href.replace('http://www.micromix.fr', '');
     _createsound(audiosrc, this.parentNode.id)
     };
     */
    var TIMEOUTusergoprevnext = 0;

    var _usergonextprevanimation = function (sclass) {
        if (debug)console.info('_usergonextprevanimation', sclass);


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
        if (direction === 'next') {
            fn = _playnextsound;
        }
        else if (direction === 'prev') {
            fn = _playprevsound;
        }

        if (fn) {
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

        if (_maybecurrentindexplay + 1 < _playlist.length) {
            _playthatsound(_getidbyindex(_maybecurrentindexplay + 1), wait);
        }
        else {
            if (debug)console.info('no more sound, shall we play the first sound ?')
        }
    };


    var _playprevsound = function (wait) {
        if (debug)console.info('_playprevsound');

        if (_maybecurrentindexplay - 1 >= 0) {
            _playthatsound(_getidbyindex(_maybecurrentindexplay - 1), wait);
        }
        else {
            if (debug)console.info('no more sound, shall we play the last sound? ')
        }
    };
    var intervalTimoutRewindForward = 125;
    var diffTimeRewindForward = 1000;
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
     * @param [time = diffTimeRewindForward] {(Number|Boolean)}
     * @private
     */
    var _fastForward = function (time) {
        if (debug)console.info('_fastForward', time);
        var loop = typeof time === 'boolean' ? time : false;
        var _time = typeof time === 'number' ? time : diffTimeRewindForward;
        if (_sound) {
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
     * @param [time = diffTimeRewindForward] {(Number|Boolean)}
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
     * @private
     * @param position {Number}
     * @param [sound = sound] {Object}
     */
    var _gotoposition = function (position, sound) {
        if (debug)console.info('_gotoposition', position);
        var __sound = sound || _sound; // if not provided, use the current cound
        if (__sound && typeof position === 'number') {
            __sound.setPosition(position);
            var duration = __sound.duration;
            duration && counter.update(position / duration * 100);

        }
    };

    /**
     *
     * @param [sound = sound] {Object}
     * @private
     */
    var _getvolume = function (sound) {
        //if (debug)console.info('_setvolume', sound);
        var __sound = sound ? sound : _sound;
        return __sound.volume;
    };
    /**
     *
     * @param volume {Number}
     * @param [sound = sound] {Object}
     * @private
     */
    var _setvolume = function (volume, sound) {
        //if (debug)console.info('_setvolume', sound);
        var __sound = sound ? sound : _sound;
        if (__sound && volume <= 100 && volume >= 0) {
            __sound.setVolume(volume);
        }
        return volume;
    };

    /**
     * increases the volume by 5%
     * @private
     */
    var _volumeUp = function () {
        return _setvolume(_getvolume() + 5);

    };
    /**
     * lowers the volume by 5%
     * @private
     */
    var _volumeDown = function () {
        return _setvolume(_getvolume() - 5);
    };

    /**
     * will create a sound in soundmanager and play it
     * set the vars of currenttimer
     * @param id
     * @private
     * @param wait
     * @param animation
     */
    var _playthatsound = function (id, wait, animation) {
        if (debug)console.info('_playthatsound', id, _maybecurrentindexplay, wait);
        _animatingCassette = true;
        if (!animation) {
            _stopsound();
            return cassetteWantToMoveOutTheBox(id, wait)
        }

        _maybecurrentidplay = id;
        _maybecurrentindexplay = _getindexbyid(_maybecurrentidplay);
        clearTimeout(TIMEOUTusergoprevnext);
        if (wait) {
            TIMEOUTusergoprevnext = setTimeout(function () {
                _playthatsound(_maybecurrentidplay, false, true);
            }, 500);
            return false;
        }
        else {
            _lastidplay = _currentidplay;
            _lastindexplay = _getindexbyid(_currentidplay);
            _currentidplay = _maybecurrentidplay = id;
            _currentindexplay = _maybecurrentindexplay = _getindexbyid(_currentidplay);

            _deletesound(_lastidplay);
            refreshbind();
            _createsound(_getmp3byid(id), id).play();
            _animatingCassette = false;
        }
        _updatehtmlinfo();
        scrollToPost(id);
    };

    var INTERVAL_infortext = 0;
    var _updatehtmlinfo = function () {
//        if (debug)console.info('defil _updatehtmlinfo');
        var $currentlink = $('.micromix-id-' + _currentidplay);
        var title = latinize($currentlink.text());
        var finaltext = 'Micromix ' + title;
        $infos_text.html(finaltext);
        $infos_text.attr('href', _geturlbyid(_currentidplay));
        $('#button-rec').attr('href', _getmp3byid(_currentidplay));

        clearInterval(INTERVAL_infortext);
        // text defil animation (work in progress)
        // todo make a function of the defil text
        var pane = 18.19; // px (WTF, .19?)
        var letterCounts = $infos_text.html().length - 8; //-8 is for screen width
        var nb_steps = letterCounts;
        var nb_steps_origine = letterCounts;

        // start defil
        var position = 0;
        var whileTo = 0;
        var incremant = 1;
        INTERVAL_infortext = setInterval(function () {
            if (nb_steps > whileTo) {
                position = position - pane;
                $infos_text.css('left', position);
                nb_steps = nb_steps - incremant;
            }
            else if (nb_steps < whileTo) {
                position = position + pane;
                $infos_text.css('left', position);
                nb_steps = nb_steps + incremant;
            }
            else {
                if (whileTo === 0) {
                    whileTo = nb_steps_origine;
                }
                else {
                    whileTo = 0;
                }
            }

        }, 500);
        // end defilText()


        pm.manager.history.bindLinks($cassette_player);
    };

    var scrollToPost = function () {
        var $currentPost = $('#post-' + _currentidplay);
        if (!window.activity.isactiv() && $currentPost.length) {
            $('body').animate({scrollTop: $currentPost.offset().top}, {duration: 125})
        }
    };

    /**
     * update the display
     */
    var updateDisplayMixData = function () {
        $('.article').each(function () {
            var _id = this.id.split('post-')[1];
            if (_isamix(_id)) {
                var mp3path = _getmp3byid(_id);
                $(this).find('.post-micromix-number').html(_getnumberbyid(_id));
                $(this).find('.wpaudio').attr('href', mp3path);
            }
        });
    };

    /**
     *
     */
    var refreshbind = function ($parent) {
        if (debug)console.info('refreshbind');
        updateDisplayMixData();
        var $post = $('#post-' + _currentidplay);
        is_post_in_the_page = !!$post.length;
//        $currentplayer.off(timelineevents, _gotothistime); // before update current
//        $currentplayer          = $post.find('.player');
//        DOMcurrentloadprogress  = $currentplayer.find('.loaded')[0];
//        DOMcurrenttimeline      = $currentplayer.find('.currenttime')[0];
//        DOMcurrenttimetext      = $currentplayer.find('.timetext')[0];
//        DOMcurrenttotaltimetext = $currentplayer.find('.totaltime')[0];
//        $currentplayer.on(timelineevents, _gotothistime);

        if ($parent) {
            $parent.find('.JSplaysoundbyid').off('click', _getandplaythatsound).on('click', _getandplaythatsound);
        }


    };
    //todo check this function
    var _getandplaythatsound = function (e) {
        if (debug)console.info('_getandplaythatsound', e);
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        if (_animatingCassette) {
            return
        }
        pauseall();

        var thisid = $(this).data('soundid');
        _playthatsound(thisid, false);
    };

    var _clearFade = function () {
        if (debug)console.info('_clearFade');
        clearInterval(_fadeInInterval);
        clearInterval(_fadeOutInterval);
    };
    var _fadeInInterval = 0;
    var _fadeIn = function () {
        _clearFade();
        var deferred = $.Deferred();
        _fadeInInterval = setInterval(function () {
            var _vol = _volumeUp();
            if (_vol === 100) {
                _clearFade();
                deferred.resolve();
            }
        }, 5);
        return deferred.promise();
    };

    var _fadeOutInterval = 0;
    var _fadeOut = function () {
        _clearFade();
        var deferred = $.Deferred();
        _fadeOutInterval = setInterval(function () {
            var _vol = _volumeDown();
            if (_vol === 0) {
                _clearFade();
                deferred.resolve();
            }
        }, 5);
        return deferred.promise();
    };

    var isPausing = false;

    var pauseall = function () {
        soundManager.pauseAll();
    };
    /**
     *
     * @param [sound = sound] {Object}
     * @return {Boolean}
     * @private
     */
    var _pausesound = function (sound) {
        if (debug)console.info('_pausesound');
        var __sound = sound ? sound : _sound;
        var hasbeenpaused = false;
        _UIPausing();
        isPausing = true;
        if (__sound) {
            _fadeOut().promise().done(function(){
                hasbeenpaused = !__sound.paused;
                __sound.pause();
                isPausing = false;
            })
        }
        return hasbeenpaused;
    };
    /**
     *
     * @param [sound = sound] {Object}
     * @return {Boolean}
     * @private
     */
    var _resumesound = function (sound) {
        if (debug)console.info('_resumesound');
        var __sound = sound ? sound : _sound;
        var hasbeenresumed = false;
        if (__sound) {
            __sound.resume();
            isPausing = false;
            hasbeenresumed = true;
            _UIPlaying();
            _fadeIn();
        }
        return hasbeenresumed;
    };
    /**
     *
     * @param [sound = sound] {Object}
     * @return {Boolean}
     * @private
     */
    var _stopsound = function (sound) {
        if (debug)console.info('_resumesound');
        var __sound = sound ? sound : _sound;
        if (__sound) {
            __sound.stop();
        }
        return __sound;
    };

    //todo check this function
    var _playtheveryfirstsoundinpage = function () {
        if (debug)console.info('_playtheveryfirstsoundinpage');
        var soundid = $('.wpaudio').first().data('soundid');
        if (!soundid) {
            var totalsound = originalPlaylist.length - 1;
            soundid = originalPlaylist[Math.random2(0, totalsound)].id
        }
        _playthatsound(soundid, false)
    };


    /**
     * play the first sound found or resume a paused sound
     */
    var playSound = function () {
        if (debug)console.info('playSound');
        if (!!_sound) {
            if (_sound.paused || isPausing) {
                _resumesound();
            }
        }
        else {
            _playtheveryfirstsoundinpage();
        }
    };


    var togglePlayPause = function () {
        if (debug)console.info('togglePlayPause');
        if (_sound && !_sound.paused && !isPausing) {
            _pausesound();
        }
        else {
            playSound();
        }
    };

    var pressedKeys = {};

    /**
     * Keyboard shortcuts
     * @param e
     * @private
     */
    var _keyboardshortcuts = function (e) {
        //if (debug)console.info('_keyboardshortcuts', e);
        var key_code = e.keyCode;
        pressedKeys[key_code] = e.type === 'keydown';

        if (pressedKeys[91] || pressedKeys[92] || e.altKey || _animatingCassette || /TEXTAREA|INPUT/.test(e.target.nodeName)) {
            debug && console.info('stop clicking everywhere');
            return
        }

        var is_keyboard_shortcut = false;
        var is_keyup = e.type === 'keyup'; // keyup or keydown
        var is_shift = e.shiftKey;
        var is_ctrl = e.ctrlKey;
        var is_spacebar = key_code === 32;
        var is_left_arrow = key_code === 37;
        var is_up_arrow = key_code === 38;
        var is_right_arrow = key_code === 39;
        var is_down_arrow = key_code === 40;
        var is_music_play_pause_key = key_code === 179; // some keyboards have a sound play/pause button

        // toggle play/pause
        // we test event keyup because we don't want infinite toggle when user keeps pressing
        if (is_spacebar && !is_keyup || is_music_play_pause_key && !is_keyup) {
            togglePlayPause();

            is_keyboard_shortcut = true;
        }
        // rewind <<
        else if (!is_shift && !is_ctrl && is_left_arrow) {
            _rewind();
            is_keyup && _clearRewindForward();
            is_keyboard_shortcut = true;
        }
        // fast forward >>
        else if (!is_shift && !is_ctrl && is_right_arrow) {
            _fastForward();
            is_keyup && _clearRewindForward();
            is_keyboard_shortcut = true;
        }
        // rewind faster
        else if (!is_shift && is_ctrl && is_left_arrow) {
            _rewind(10000);
            is_keyup && _clearRewindForward();
            is_keyboard_shortcut = true;
        }
        // fast forward faster
        else if (!is_shift && is_ctrl && is_right_arrow) {
            _fastForward(10000);
            is_keyup && _clearRewindForward();
            is_keyboard_shortcut = true;
        }
        // previous track
        else if (is_shift && is_left_arrow) {
            is_keyup && _usergoprev();
            is_keyboard_shortcut = true;
        }
        // next track
        else if (is_shift && is_right_arrow) {
            is_keyup && _usergonext();
            is_keyboard_shortcut = true;
        }
        // volume up
        else if (is_ctrl && is_up_arrow) {
            _volumeUp();
            is_keyboard_shortcut = true;
        }
        // volume down
        else if (is_ctrl && is_down_arrow) {
            _volumeDown();
            is_keyboard_shortcut = true;
        }

        if (is_keyboard_shortcut) {
            e.preventDefault();
        }
    };

    var _unbindplaybyid = function ($elem) {
        if (debug)console.info('_unbindplaybyid');
        $elem.off('click', _getandplaythatsound);
    };
    var _bindplaybyid = function ($elem) {
        if (debug)console.info('_bindplaybyid');
        $elem.on('click', _getandplaythatsound);

    };

    /**
     * Mark player button as pushed (skin)
     * @param action
     */
    var pushButton = function (action) {
        if (debug)console.info('pushButton', action);

        var button_id = '#control-' + action;
        var id_pushed = button_id + '-pushed';
        var $control_pushed = $(id_pushed);
        var is_already_pushed = $control_pushed.hasClass('active');

        if (!is_already_pushed) {
            if (action !== 'stop') {
                // remove cursor hand

                // show control "pushed"
                $controls_pushed_all.removeClass('active');
                $controls_all.removeClass('active');
            }
            $(button_id).addClass('active');
            $control_pushed.addClass('active');
        }
    };

    var lastControlZIndex = '';
    /**
     * Player control manager
     * What to do when asking an action with the player (onclick)
     */
    var playerControlManager = function (e) {
//        if (debug)console.info('playerControlManager', e);
        if (_animatingCassette) {
            return
        }
        var $control_clicked = $(this),
            id = $control_clicked.attr('id'),
            action = id.split('control-')[1],
            is_already_pushed = $control_clicked.hasClass('active'),
            is_click = e.type === EVENT_click,
            is_mouseleave = e.type === EVENT_leave,
            is_mouseup = e.type === EVENT_up,
            is_mousedown = e.type === EVENT_down;
        // aaaand ... action! NO NON NONONOONO I DON'T GIVE A SHIIIIIIIIT
        switch (action) {
            case 'pause':
                !is_already_pushed && is_click && _pausesound();
                break;
            case 'play':
                !is_already_pushed && is_click && playSound();
                break;
            case 'rewind':
                if (is_mouseleave && e.which && is_already_pushed || is_mouseup) {
                    _allowcontextmenu();
                    _clearRewindForward();
                }
                else if (!is_click && !is_mouseleave) {
//                    _cancelcontextmenu();
                    e.preventDefault();
                    _rewind(is_mousedown);
                }
                break;
            case 'forward':
                if (is_mouseleave && e.which && is_already_pushed || is_mouseup) { // if mouseleave and mouse button is pressed and interface button is pushed or mouseup
                    _allowcontextmenu();
                    _clearRewindForward();
                }
                else if (!is_click && !is_mouseleave) {
//                    _cancelcontextmenu();
                    e.preventDefault();
                    _fastForward(is_mousedown);
                }
                break;
            case 'prev':
                !is_already_pushed && is_click && _usergoprev();
                break;
            case 'next':
                !is_already_pushed && is_click && _usergonext();
                break;
            default:
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
    var _onClickStop = function () {
        pushButton('stop');
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

        $linkplaysoundbyid.on(EVENT_click, _getandplaythatsound);
//        $linkpreviewsoundbyid.on('mousedown', _previewsoundbyidctrl);

        // New K7 buttons
        $controls_all.on(EVENT_down + ' ' + EVENT_up + ' ' + EVENT_click + ' ' + EVENT_leave + ' touchmove', playerControlManager);
        // info
        $infos_text.addClass('history').html('micromix').attr('href', '/');


        // bind
        if (!Modernizr.touch) {
            $(window).on('keydown keyup', _keyboardshortcuts);
        }

        if (_autoplay) {
            _playtheveryfirstsoundinpage();
        }
    };


    /**
     * Counter
     * @constructor
     */
    var Counter = function () {
        var old_num = 0; // init
        var NUM_HEIGHT = 14;

        var $unit3 = $('#unit-3');
        var $reelTapeRight = $cassette.find('.right .tape');
        var $reelTapeLeft = $cassette.find('.left .tape');
        var html = $unit3.html();
        $unit3.html(html + html + html + html + html + html + html + html + html + html + html);//llollololololololol

        // tape 19 to 80px margin

        this.update = function (number) {
            var originaldigit;
            var digits = originaldigit = Math.round(number);
            if (digits != old_num) {
                digits = typeof digits == 'number' ? digits.toString() : digits;
                $reelTapeRight.css('margin', 19 + (originaldigit / 100 * 61)); // 19 + (100 / 100 * 61)
                $reelTapeLeft.css('margin', 80 - (originaldigit / 100 * 61));
                // add zeros if less then 3 digits
                while (digits.length < 3) {
                    digits = '0' + digits;
                }

                digits.split('').forEach(function (num, index) {
                    var _num = index === 2 ? originaldigit : num;
                    $('#unit-' + (index + 1)).css({'top': -(NUM_HEIGHT * _num) + 'px'});
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
        return $.Velocity.animate($deck, {
            rotateX: '-30deg'
        }, {
            easing: "easeInOut",
            duration: 300
        });
    };

    /* PLAYER : CLOSE DECK DOOR */
    var closeDeckDoor = function () {
        $deck.removeClass('open');
        $('#deck-door-shadow').removeClass('active');
        return $.Velocity.animate($deck, {
            rotateX: '0deg'
        }, {
            easing: "easeInOut",
            duration: 300
        });
    };

    // debug mode
    $deck.on('click', function () {
        //todo play another animation if the K7 is playing

        if ($deck.hasClass('open')) {
            closeDeckDoor();
        }
        else {
            openDeckDoor();
        }
    });

    var K7SCALLEFAR = 0.5;
    var K7SCALLEMIDDLE = 0.525;
    var K7SCALLENEAR = 0.55;

    /**
     *
     * @param id {Number}
     * @param wait {Boolean}
     */
    var cassetteWantToMoveOutTheBox = function (id, wait) {
        debug && console.info('cassetteWantToMoveOutTheBox');

        var _callback = function () {
            _playthatsound(id, wait, true)
        };

        //todo find a better way to play this
        if ($cassette.hasClass('is-inside-player')) {
            openDeckDoor().then(function () {
                cassetteMoveOutPlayer().then(function () {
                    cassetteMoveInPlayer(id).then(function () {
                        closeDeckDoor().then(_callback);
                    });
                })
            })
        }
        else {
            openDeckDoor().then(function () {
                cassetteMoveInPlayer(id).then(function () {
                    closeDeckDoor().then(_callback);
                });
            });
        }
    };
    //todo close the door if it's open and there's no more sound to play
    /**
     * Move the cassette out of the player
     * @returns Velocity promise
     */
    var cassetteMoveOutPlayer = function () {
        if (debug) {
            console.info('cassetteMoveOutPlayer')
        }
        openDeckDoor();

        $.Velocity.animate($cassette, {
            bottom: 270,
            scale: [K7SCALLEMIDDLE, 'easeInExpo']
        }, {
            duration: 350,
            easing: 'easeInOut',
            delay: 250,
            complete: function () {
                $cassette.css('zIndex', 0);
            }
        });
        return $.Velocity.animate($cassette, {
            bottom: 61,
            scale: [K7SCALLEFAR, 'easeOutExpo']
        }, {
            duration: 350,
            easing: 'easeInOut'
        });

    };
    //todo check why we need this, bug of velocity on first animation
    $.Velocity.animate($cassette, {
        scale: [K7SCALLEFAR]
    }, {
        duration: 1
    });

    /**
     * Move the cassette from behing to the player
     * @returns Velocity promise
     */
    var cassetteMoveInPlayer = function (id) {
        debug && console.info('cassetteMoveInPlayer');
        if (!$cassette.hasClass('is-inside-player')) {
        }

        var imgFatSrc = _getcoverbyid(id);
        $k7face.css('background-image', 'url(' + imgFatSrc + ')');

        $.Velocity.animate($cassette, {
            bottom: 270,
            scale: [K7SCALLEMIDDLE, 'easeInExpo']
        }, {
            duration: 350,
            easing: 'easeInOut',
            complete: function () {
                $cassette.css('zIndex', 1);
            }
        });

        return $.Velocity.animate($cassette, {
            bottom: 61,
            scale: [K7SCALLENEAR, 'easeOutExpo']
        }, {
            duration: 350,
            delay: 0,
            easing: 'easeInOut',
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
        var hashs = getUrlHash();
        if (hashs.length) {

            for (var i = 0; i < hashs.length; i++) {
                var hashrequest = hashs[i].split('=');
                var hashparam = hashrequest[0];
                var hashvalue = hashrequest[1];
                if (hashparam === 't') {
                    _starttime = eval(hashvalue.replace('s', '* 1000').replace('m', '* 1000 * 60'));
                    _starttime = typeof _starttime === 'number' ? _starttime : null;
                }
                else if (hashparam === 'autoplay') {
                    _autoplay = hashvalue === "true";
                }

            }
            if (_starttime !== null) {
                _autoplay = true;
            }
        }

        soundManager.setup({
            url: theme_path.replace(location.protocol + '//' + location.host, '') + '/swf/',
            // optional: prefer HTML5 over Flash for MP3/MP4
            flashVersion: 9, // for VU meter
            debugMode: debug,
            preferFlash: true,
            //useFastPolling: true, //todo does not exit // for VU meter
            flashPollingInterval: 100, // for VU meter
            useHighPerformance: true,// for VU meter
            onready: _bind_controls,
            defaultOptions: {
                // set global default volume for all sound objects
                volume: 100
            }

        });
    };

    this.refreshbind = refreshbind;
    this.initsound = init;
};


