if(typeof(pm) == 'undefined'){var pm = {}}

pm.Viewmanager = function() {
    var debug = pm.base.debug.Viewmanager;

    if (debug)console.info('pm.base.Viewmanager.js');

    var getters = pm.getters;
    var setters = pm.setters;
    var viewaction;
    var $viewcontainer = $('#column2');//todo should be a param
    var $viewsctn = $viewcontainer;
    var viewNotCached = 'club-index';
    var $viewnext = $();
    var $viewnow = $viewcontainer.find('.view');
    var $viewold = $();
    var viewinaction = false;

    var preshow = function (data, callback) {
        if (debug)console.info('pm.base.Viewmanager:preshow', data);

        // In all views, check if header has to be retracted
        actions('preshow', data.viewname, {callback:callback});
    };

    var postshow = function ($view) {
        if (debug)console.info('pm.base.Viewmanager:postshow');

        onviewdisplayed($view);
        $viewold = $viewnow;
        $viewnow = $viewnext;
        $viewnext = $();
        removeview($viewold.not($viewnow));
        $viewnow.attr('style', '');
        $viewold = $();

    };

    var makeviewname = function(view, old){
        if (debug)console.info('pm.base.Viewmanager:makeviewname', view, old);

        var ctx = old ? getters.getOldCtx() : getters.getCtx();

        if(ctx){
            return view + ctx.path.replace(/[^a-z0-9]+/g, '-');
        }
    };

    var removeview = function ($viewtoremove) {
        if (debug)console.info('pm.base.Viewmanager:removeview', $viewtoremove.data(), $viewtoremove[0]);
        $viewtoremove.remove();
    };

    var _appendbind = function ($viewnext, data, viewname) {
        if (debug)console.info('pm.base.Viewmanager:_appendbind', $viewnext, data);
        removeview($('.view').not($viewnow).not($viewnext));
        $viewcontainer.prepend($viewnext);
        unbind($viewnow.data('context'), $viewnow); // view now because not switched yet
        bind($viewnext, data);
    };

    var getViewName = function(view){
        if (debug)console.info('pm.base.Viewmanager:getViewName', view);

        var realView = view;
        var childView = null;
        realView = realView.replace('/', '-');

        if (view.indexOf(':') > -1) {
            realView = view.split(':')[0];
            childView = view.split(':')[1];
        }

        return {
            view: realView,
            childView: childView
        }
    };

    /**
     *
     * @param callback {Function}
     */
    var onbetweentransition = function (callback) {
        if (debug)console.info('onbetweentransition');
        $('body').animate({'scrollTop': 250}, {duration:400});
        if(callback){callback();}
    };
    /**
     *
     * @param data {Object} data + HTML
     * @param url {String} URL to translate into clean view
     */
    var load = function (data, url) {
        if (debug)console.info('pm.base.Viewmanager:load', data, url);

        //todo a bit dirty between PJAX and simple HTML page load

        var viewName = getViewName(url);
        var realView = viewName.view;
        var $tmp = $('<div>').html(data.html);
        $viewnext = $tmp.find('.view');
        $viewnext.css('opacity',0);
        var $toload = $viewnext.find('img[src!=""]');

        var doShow = function(){
            onviewinjected($viewnext);
            pm.manager.transition.doTransition($viewnext, $viewnow, {callbackbetween:onbetweentransition});
        };
        var _onviewreadytoinject = function () {
            if (debug)console.info('_onviewreadytoinject');
            _appendbind($viewnext, data, realView);
            onviewloaded($viewnext);
            doShow();
        };

        preshow(data, function(){
            if ($toload.length) {
                pm.base.loadermanager($toload, _onviewreadytoinject);
            } else {
                _onviewreadytoinject();
            }
        });

    };

    /**
     * refresh view from cache
     */
    var reload = function () {
        if (debug)console.info('reload');

    };

    var bind = function($view, data){
        if (debug)console.info('pm.base.Viewmanager:bind', $view, data);

        //todo should load JS files on the fly
        actions('bind', data.data.viewname, {$view:$viewnext,data:data.data});

    };

    var _cleanvideo = function (i,o) {
        if (debug)console.info('pm.base.Viewmanager:_cleanvideo');
        var id = o.parentNode.id;
        pm.manager.video.remove(id);
    };

    var unbind = function(view, $viewtounbind){
        if (debug)console.info('pm.base.Viewmanager:unbind', $viewtounbind);

        if(view){

            $viewtounbind.find('.vjs-tech').each(_cleanvideo);
            $viewtounbind.removeClass('view-displayed').css('zIndex', 1);
            actions('unbind', view, {option:{$view:$viewtounbind}});
        }

    };

    var cache = {
        stack: {},
        exist: function(view){
            if (debug)console.info('pm.base.Viewmanager:cache:exist', view);
            return !!this.stack[view];
        },
        add: function(view, $html, data){
            if (debug)console.info('pm.base.Viewmanager:cache:add', view, data);

            if(this.exist(view)){
                if (debug)console.info('pm.base.Viewmanager:cache:add, view already exist in cache !', view);
            } else {
                this.stack[view] = {
                    timestamp: new Date().getTime(),
                    data: data,
                    html: $html
                };
            }
        },
        get: function(view){
            if (debug)console.info('pm.base.Viewmanager:cache:get', view);

            return this.stack[view];
        }
    };

    /**
     * give possibility to execute some action before/after/ loading view and on kill
     * @param actiontype {String} 'preshow', 'bin', 'unbind'
     * @param view {String} ID of the DOM object view
     * @param options {Object} $wiew, callback
     */
    var actions = function (actiontype, view, options) {
        if (debug)console.info('pm.base.Viewmanager:actions', view, actiontype, options);

        if(viewaction[actiontype]){
            if(viewaction[actiontype].start){
                var start = viewaction[actiontype].start(view, options, function(){
                    if(viewaction[actiontype]['finally']){
                        viewaction[actiontype]['finally'](options.callback);
                    }
                    else{
                        if (debug)console.info('no finally function for : "' + actiontype + '"');
                    }
                });
            }
            else{
                if (debug)console.error('no start function for : "' + actiontype + '"');
            }
        }
        else{
            if (debug)console.error('error no action "' + actiontype + '" defined');
        }

    };
    var collectionloadingview = {};
    var collectionloadedview = {};
    var collectiondisplayedview = {};

    var onloadingview = function () {
        if (debug)console.info('pm.base.Viewmanager:onloadingview');
        for (var key in collectionloadingview) {
            collectionloadingview[key]();
        }
    };

    var onviewloaded = function ($view) {
        if (debug)console.info('pm.base.Viewmanager:onviewloaded',$view.attr('class'));
        
        for (var key in collectionloadedview) {
            collectionloadedview[key]();
        }
        $view.trigger('onviewload');
    };

    var onviewinjected = function ($view) {
        if (debug)console.info('onviewinjected');
        $view.trigger('onviewinjected');

    };

    var onviewdisplayed = function ($view) {
        if (debug)console.info('pm.base.Viewmanager:onviewdisplayed');
        for (var key in collectiondisplayedview) {
            collectiondisplayedview[key]();
        }
        $view.trigger('onviewdisplayed');
    };

    var onfirstview = function ($view, callbackonfirstview) {
        if (debug)console.info('onfirstview');
        var viewname = 'index';//$view.data('context');
        actions('preshow', viewname, {callback:function(){
            onviewloaded($view);
            actions('bind', viewname, {$view:$view});
            var $imgs = $view.find('img');
            if($imgs.length){
                pm.base.loadermanager($imgs, function(){
                    onviewinjected($view);
                    onviewdisplayed($view);
                    if(callbackonfirstview){callbackonfirstview();}
                });
            }
            else{
                onviewinjected($view);
                onviewdisplayed($view);
                if(callbackonfirstview){callbackonfirstview();}
            }
            //TODO provide an addonfirstview action
        }});

    };
    /**
     *
     * @param key {String} of key identifier
     * @param fn {Function} to execute
     * @
     */
    var addonloading = function (key, fn) {
        if (debug)console.info('pm.base.Viewmanager:addonloading');
        collectionloadingview = pm.addfntocollection(collectionloadingview, key, fn);
    };
    var removeonloading = function (key, fn) {
        if (debug)console.info('pm.base.Viewmanager:removeonloading');
        collectionloadingview = pm.removefntocollection(collectionloadingview, key, fn);
    };

    var addonloaded = function (key, fn) {
        if (debug)console.info('pm.base.Viewmanager:addonloaded');
        collectionloadedview = pm.addfntocollection(collectionloadedview, key, fn);
    };
    var removeonloaded = function (key, fn) {
        if (debug)console.info('pm.base.Viewmanager:removeonloaded');
        collectionloadedview = pm.removefntocollection(collectionloadedview, key, fn);
    };

    var addondisplay = function (key, fn) {
        if (debug)console.info('pm.base.Viewmanager:addondisplay', key);
        collectiondisplayedview = pm.addfntocollection(collectiondisplayedview, key, fn);
    };
    var removeondisplay = function (key, fn) {
        if (debug)console.info('pm.base.Viewmanager:removeondisplay');
        collectiondisplayedview = pm.removefntocollection(collectiondisplayedview, key, fn);
    };

    viewaction = pm.extendviewmanageractions({cache:cache,makeviewname:makeviewname});

    this.loadview = load;
    this.addtoonloadingview    = addonloading;
    this.addtoonloadedview     = addonloaded;
    this.addtoondisplayview    = addondisplay;
    this.removetoonloadingview = removeonloading;
    this.removetoonloadedview  = removeonloaded;
    this.removetoondisplayview = removeondisplay;
    this.preshow = preshow;
    this.doaction = actions;
    this.makeviewname = makeviewname;
    this.getViewName = getViewName;
    this.cache = cache;
    this.viewnocache = viewNotCached;
    this.postshow = postshow;
    this.onviewdisplayed = onviewdisplayed;
    this.onfirstview = onfirstview;
};
