/* $Id: pm.base.historymanager.js 3085 2012-07-02 13:23:29Z rodsto_free $ */

if(typeof(pm) == 'undefined'){var pm = {}}

pm.Historymanager = function() {
    var debug = pm.base.debug.Historymanager;

	if (debug)console.info('pm.base.Historymanager.js');

    var settings = {
        historyHTML5: Modernizr.history
    };
    var noexecutiononurlchange = false;
    var needafirstview = true;
    var navigationcount = 0;

    var conditiongetpage = {};
    var setconditiondontgetpage = function (view) {
        if (debug)console.info('setconditiondontgetpage');

        conditiongetpage[view] = true;

    };

    var initviewblockedload = (function () {
        if (debug)console.info('initviewblockedload');

        for (var i = 0; i < urlpatternsviewblockload.length; i++) {
            var view = urlpatternsviewblockload[i];
            setconditiondontgetpage(view);
        }
    })();

    /**
     *
     * @param url {String} document url
     * @return {Boolean|*}
     */
    var getconditiondontgetpage = function (url) {
        if (debug)console.info('getconditiondontgetpage', conditiongetpage);

        var _return = false;

        if(conditiongetpage[pm.getters.getviewkey()]){
            for (var i = 0; i < urlpatternsblockload.length; i++) {
                var _url = urlpatternsblockload[i];

                var regxp = new RegExp(_url, 'gi');
                _return = regxp.test(url);

                if(_return) break;

            }
        }

        return _return;

    };

    var historyPush = function(url) {
        if (debug)console.info('pm.base.Historymanager.js:historyPush', url);

        var pathname = settings.historyHTML5 ? location.pathname : location.hash;
        if (pathname != url) {
            // HTML5
            if (settings.historyHTML5) {
                history.pushState(null, null, url);
                historyGet(url);
            } else {
                $.history.load(cleanHash(url));
            }
        }
        else{
            //already on this page
            if (debug)console.warn('pm.base.Historymanager.js:historyPush, already on this page');
        }

    };

    var historyGet = function(url) {
        if (debug)console.info('pm.base.Historymanager.js:historyGet', url);

        if (url.indexOf('!/') > -1) {
            url = url.replace('!/', '/');
        }

        $(window).trigger('pm_urlchange');
        pm.getters.getCtx().path = url;
        if(getconditiondontgetpage(url)){
            if (debug)console.warn('hoho DONT GET DAT PAGE');
        }
        else{
            pm.manager.content.getpage(url);
            navigationcount++;
        }

    };

    var cleanHash = function(str) {
        if (debug)console.info('pm.base.Historymanager.js:cleanHash', str);

        // Remove first / if exists
        if(str.substring(0, 1) === '/'){
            str = str.substring(1);
        }

        if (str.indexOf('!') === -1) {
            str = '!/' + str;
        }

        return str;
    };

    var geturlpath = function () {
        if (debug)console.info('geturlpath');
        var url = '';
        if(settings.historyHTML5){
            url = location.pathname + location.search;
        }
        else{
            url = document.location.hash;
        }
        return url;
    };

    var bind = function() {


        //if (debug)console.info('pm.base.Historymanager.js:bind');

        // HTML5
        if (settings.historyHTML5) {


            window.onpopstate = function(e) {


                if (debug)console.info('pm.base.Historymanager.js:onpopstate');
                if(noexecutiononurlchange){
                    if (debug)console.info('pm.base.Historymanager.js:onpopstate:noexecutiononurlchange');
                    noexecutiononurlchange = false;
                    pm.base.ctx.path = geturlpath();
                    return false;

                }
                //TODO we should do that before push instead of here
                if(pm.getters.getCtx().path == geturlpath()){
                    if (debug)console.info('pm.base.Historymanager.js:onpopstate, old and actual pathname are the same');
                }
                else{
                    historyGet(geturlpath());
                }
            };

            var path = document.location.pathname;
            var hash = document.location.hash;

            // Check if we got a hash in url
            if (hash !== '') {
                if (hash.indexOf('#!') > -1) {
                    path = hash.split('#!')[1];

                    historyPush(path);

                    return false;
                }
            }

            // Init current page
        } else {
            $.history.init(function(hash) {
                var _pathname = document.location.pathname;
                if(noexecutiononurlchange){
                    if (debug)console.info('pm.base.Historymanager.js:onpopstate:noexecutiononurlchange');
                    noexecutiononurlchange = false;
                    pm.base.ctx.path = _pathname;
                    return false;
                }
                if(navigationcount == 0 && document.location.pathname == '/' && window.location.hash == '#!/'){
                    // nothing
                }
                else{
                    if (hash !== '') {
                        // if we got a hash in url, get it
                        needafirstview = false;
                        historyGet(hash);
                    } else {
                        // else, redirect to current url path
                        window.location = '/#!' + _pathname + location.search;
                    }
                }
            }, {
                unescape: '/'
            });
        }
    }();

    var bindlinkhistorypush = function (e) {
        if (debug)console.info('bindlinkhistorypush');

        e.preventDefault();

        historyPush(this.pathname);

    };
    var bindformhistorypush = function (e) {
        if (debug)console.info('bindformhistorypush', this);

        var request = $(this).serialize();
        var action = '/' + this.action.split('/').slice(3).join('/') + '?' + request;
        historyPush(action);
        e.preventDefault();

    };

    var _bindlink = function (i,o) {
        if (debug)console.info('_bindlink');
        var $historyitem = $(o);
        if(/FORM/.test(o.nodeName)){
            $historyitem.off('submit', bindformhistorypush).on('submit', bindformhistorypush);
        }
        else{
            var reg = new RegExp(document.location.host);
            reg.test($historyitem.prop('host')) && $historyitem.off('click', bindlinkhistorypush).on('click', bindlinkhistorypush);
        }
        $historyitem.addClass('history');
    };

    var bindLinks = function(parent) {
        if (debug)console.info('pm.base.Historymanager.js:bindLinks', parent);
        if(PJAX){
            var $parent = parent ? parent : $('body');
            var $selector = $parent.find('.history');
            $selector.each(_bindlink);
            var $selector2 = $parent.find('.parenthistory a,form.history').not('.history');
            $selector2.each(_bindlink)
        }
        else{
            if (debug)console.warn('PJAX = false, no link will be binded');
        }
    };

    /**
     * @deprecated
     * @param section
     */
    var goTo = function(section){
        if (debug)console.info('pm.base.Historymanager.js:goTo', section);

        var sections = {
            homepage: '/' + settings.language + '/'
        };

        if(sections[section]){
            historyPush(sections[section]);
        } else {
            if(debug)console.warn('pm.base.Historymanager.js:goTo, section is not defined');
        }
    };

    var goToUrl = function(path){
        if (debug)console.info('pm.base.Historymanager.js:goToUrl', path);

        historyPush(path);
    };

    var gobackwithoutexec = function () {
        if (debug)console.info('gobackwithoutexec');
        noexecutiononurlchange = true;
        history.go(-1);
    };

    this.push = historyPush;
    this.bindLinks = bindLinks;
    this.goToUrl = goToUrl;
    this.goTo = goTo;
    this.goback = gobackwithoutexec;
    this.setconditiongetpage = setconditiondontgetpage;
    this.getconditiongetpage = getconditiondontgetpage;
    this.needfirstview = settings.historyHTML5 || needafirstview;
};