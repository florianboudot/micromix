/* $Id: pm.base.getterssetters.js 3023 2012-06-26 12:17:43Z antsan2 $ */

if(typeof(pm) == 'undefined'){var pm = {}}

pm.Getters = function() {
    var debug = pm.base.debug.Getters;
    
    if (debug)console.info('pm.base.Getters.js');

    var base = pm.base;
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

    var getviewkey = function () {
        if (debug)console.info('getviewkey');
        return base.viewkey;
    };
    var getviewkeyold = function () {
        if (debug)console.info('getviewkeyold');
        return base.viewkeyold;
    };

    this.getCtx = _getCtx;
    this.getCtxParams = _getCtxParams;
    this.getOldCtx = _getOldCtx;
    this.getviewkey = getviewkey;
    this.getviewkeyold = getviewkeyold;

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