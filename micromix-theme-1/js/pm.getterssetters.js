/* $Id: pm.base.getterssetters.js 3023 2012-06-26 12:17:43Z antsan2 $ */

if(typeof(pm) == 'undefined'){var pm = {}}

pm.Getters = function() {
    var debug = pm.base.debug.Getters;
    
    if (debug)console.info('pm.base.Getters.js');

    var base = pm.base;
    var settings = base.settings;

    var _getCtx = function(){
        return base.ctx;
    };

    var _getOldCtx = function(){
        return base.oldctx;
    };

    /**
     * @deprecated
     * @return {String}
     * @private
     */
    var _getCtxParams = function(){
        var output = '';

        if(base.ctx){
            for(var param in base.ctx.params){
                if(typeof base.ctx.params[param] === 'string'){
                    output += '&' + param + '=' + base.ctx.params[param];
                }
            }
        }

        return output;
    };

    var _getWindowWidth = function(){
        return base.sizing.viewportw;
    };

    var _getWindowHeight = function(){
        return base.sizing.viewporth;
    };

    var _getdevicemode = function(){
        return base.devicemode;
    };

    var _getlang = function(key) {
        //        if (debug)console.info('_getlang');
        var val = undefined;

        if(typeof(i18n) == 'undefined'){
            console.error('i18n is undefined');
        }
        else {
            val = i18n[key];
        }

        if (val == undefined) {
            val = '•';
            if(debug)console.warn('missing: ', key);
        }
        return val;
    };

    /**
     *
     * @param key {String}
     * @return {String} url of service, if key not found, return a 404
     * @private
     *
     */
    var _getservicesurl = function (key) {
        if (debug)console.info('_getservicesurl', key);
        var url = pm.manager.site.urls[key];
        if(typeof(url) == 'string'){
            return url.replace('{lng}', settings.language);
        }
        else{
            return 'services/404';
        }
    };

    var getviewkey = function () {
        if (debug)console.info('getviewkey');
        return base.viewkey;
    };
    var getviewkeyold = function () {
        if (debug)console.info('getviewkeyold');
        return base.viewkeyold;
    };

    var $scrolled = $();

    var getscrollelement = function () {
        if (debug)console.info('getscrollelement');

        if($scrolled.length === 0){
            var $body = $('body');
            var $html = $('html');
            $scrolled = $html;

            if($body.prop('scrollTop')){
                $scrolled = $body;
            }
            else if($html.prop('scrollTop')){
                $scrolled = $html;
            }
            else{
                $body.css('height',2000).prop('scrollTop', 1);
                $html.prop('scrollTop', 1);

                if($html.prop('scrollTop') + $body.prop('scrollTop')){
                    $scrolled = ($body.prop('scrollTop') == 1) ? $body : $html;
                }
                else{ // mainly mobile here, because of delayed event
                    if(/MSIE/gi.test(navigator.appVersion)){
                        $scrolled = $html; // MSIE need $html
                    }
                    else{
                        $scrolled = $body; // others are mainly webkit, and need $body (firefox mobile too?)
                    }
                }

                $body.css('height', '').prop('scrollTop', 0);
            }
        }
        return $scrolled;
    };
    getscrollelement();

    var getcolorframe = function () {
        if (debug)console.info('getcolorframe');
        return base.sitecolor;
    };


    this.getCtx = _getCtx;
    this.getCtxParams = _getCtxParams;
    this.getWindowWidth = _getWindowWidth;
    this.getWindowHeight = _getWindowHeight;
    this.getdevicemode = _getdevicemode;
    this.getlang = _getlang;
    this.getOldCtx = _getOldCtx;
    this.getviewkey = getviewkey;
    this.getviewkeyold = getviewkeyold;
    this.getscrollelement = getscrollelement;
    this.getcolorframe = getcolorframe;

};

pm.Setters = function() {
    var debug = pm.base.debug.Setters;

    if (debug)console.info('pm.base.Setters.js');

    var base = pm.base;

    /**
     * todo method not used but should be used, property is modified hardly otherelse
     * @param ctx
     * @private
     */
    var _setCtx = function(ctx){
        base.ctx = ctx;
    };

    var _setOldCtx = function(ctx){
        base.oldctx = ctx;
    };

    var setviewkey = function (viewkey) {
        if (debug)console.info('setviewkey');
        setviewkeyold(base.viewkey);
        base.viewkey = viewkey;
    };
    var setviewkeyold = function (viewkey) {
        if (debug)console.info('setviewkeyold');
        base.viewkeyold = viewkey;
    };
    var setcolorframe = function (color) {
        if (debug)console.info('setcolorframe');
        base.sitecolor = color;
    };

    this.setCtx = _setCtx;
    this.setOldCtx = _setOldCtx;
    this.setviewkey = setviewkey;
    this.setcolorframe = setcolorframe;
};