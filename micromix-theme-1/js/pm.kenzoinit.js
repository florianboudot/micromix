/* $Id: pm.base.kenzoinit.js 3023 2012-06-26 12:17:43Z antsan2 $ */

if(typeof(pm) == 'undefined'){var pm = { base: null }}
if(typeof(pm.base) == 'undefined'){pm.base = null;}

var oauthenabled = typeof(oauthenabled) == 'undefined' ? false : oauthenabled;

pm.initkenzo = (function() {
//    var debug = (typeof(pm.base.debug) != "undefined") ? pm.base.debug.initkenzo : false;
    var debug = false;

    if (debug)console.info('pm.kenzoinit.js');

    pm.manager = {};

    var initsite = function () {
        if (debug)console.info('initsite');
        pm.manager.connexion = new pm.Connexionmanager();
        if(oauthenabled){ // if oAuth is configurer, change true to false
            getoauth();
        }
        else{
            startscript();
        }
    };

    var getoauth = function () {
        clearInterval(window.INTERVALJSLOADER);
        if (debug)console.info('getoauth');
        pm.manager.connexion.oauth(startscript);
    };

    var resizeViewport = function() {
        if (debug)console.info('pm.initkenzo:resizeViewport');

        baseKenzo.sizing();
        baseKenzo.getdevicemode();
    };

    var viewMinHeight = function() {
        if (debug)console.error('pm.initkenzo:viewMinHeight');
        $('.view').css('min-height',pm.getters.getWindowHeight()-$("#wrapper-footer").innerHeight());
    };


    var startscript = function() {
        clearInterval(window.INTERVALJSLOADER);

        if (debug)console.info('pm.initkenzo:startscript');

        resizeViewport();

        // init the manager object

        // execute the settings
        pm.base.updatesetting();

        // Init template manager

        pm.manager.viewscript = {};
        pm.getters            = new pm.Getters();
        pm.setters            = new pm.Setters();
        pm.manager.timing     = new pm.TimingManager();
        pm.manager.resize     = new pm.Resize(125);

        viewMinHeight();

        pm.manager.view       = new pm.Viewmanager();
        pm.manager.content    = new pm.Contentmanager();
        pm.manager.history    = new pm.Historymanager();
//        pm.manager.site       = new pm.Sitemanager();
        pm.manager.transition = new pm.Transitionmanager();

        pm.manager.history.bindLinks();
        pm.manager.resize.addlive('resizeViewport', resizeViewport);
        pm.manager.resize.add('viewMinHeight', viewMinHeight);

        var $view = $('#column2').find(('.view'));//todo should be a param somewhere
        if(pm.manager.history.needfirstview){
            pm.manager.view.onfirstview($view, function(){ });
        }
        else{
//            $view.css('opacity', 0) // todo maybe find a way to hide the redirection for non history browser
        }

    };

    $(document).on('ready', initsite);


})();
