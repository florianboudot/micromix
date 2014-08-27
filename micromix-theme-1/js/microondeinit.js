if(typeof(pm) == 'undefined'){var pm = { base: null }}
if(typeof(pm.base) == 'undefined'){pm.base = null;}

pm.initmicromix = (function() {
    var debug = false;

    if (debug)console.info('pm.initmicromix.js');

    pm.manager = {};

    var initsite = function () {
        if (debug)console.info('initsite');
        pm.manager.connexion = new pm.Connexionmanager();
        startscript();
    };

    var resizeViewport = function() {
        if (debug)console.info('pm.initmicromix:resizeViewport');

    };

    var startscript = function() {
        clearInterval(window.INTERVALJSLOADER);

        if (debug)console.info('pm.initmicromix:startscript');

        resizeViewport();

        // init the manager object

        // execute the settings

        // Init template manager

        pm.manager.viewscript = {};
        pm.getters            = new pm.Getters();
        pm.setters            = new pm.Setters();

        pm.manager.view       = new pm.Viewmanager();
        pm.manager.content    = new pm.Contentmanager();
        pm.manager.history    = new pm.Historymanager();
        pm.manager.transition = new pm.Transitionmanager();

        pm.manager.history.bindLinks();

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
