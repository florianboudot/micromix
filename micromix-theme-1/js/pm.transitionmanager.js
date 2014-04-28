if (typeof(pm) == 'undefined') {
    var pm = {}
}

pm.Transitionmanager = function () {
    var debug = pm.base.debug.Transitionmanager;

    //todo when navigating to fast, transition is fucked up

    if (debug)console.info('pm.base.Transitionmanager.js');

    var viewManager = pm.manager.view;
    var $viewcontainer = $('#column2'); // todo should be a param

    var doTransition = function ($futurview, $actualview, options) {
        if (debug)console.info('pm.base.Transitionmanager:show', $futurview, $actualview);

        options = options ? options : {};
        var callbackbetween = options.callbackbetween;
        callbackbetween = callbackbetween ? callbackbetween : function (callback) {
            callback()
        };

        var duration = 100;

        var onalltransitioncomplete = function () {
            if (debug)console.info('onalltransitioncomplete');
            $viewcontainer.height('auto');
            $actualview.hide();
            $futurview.css({position: 'relative', width: 'auto'});
            viewManager.postshow($futurview);
        };

        var futurwidth = $futurview.width();
        $futurview.css({position: 'absolute', opacity: 0, width: futurwidth});
        $viewcontainer.height($viewcontainer.height());
        $actualview.css({opacity: 1, position: 'absolute'}).animate({opacity: 0}, {duration: duration, easing: 'easeOutExpo', complete: function completeoldview() {
            callbackbetween(function () {
                $futurview.animate({marginTop: 0, opacity: 1}, {duration: duration, easing: 'easeInExpo', complete: function completefutureview() {
                    var futureheight = $futurview.height();
                    if (futureheight != $viewcontainer.height()) {
                        $viewcontainer.animate({height: futureheight}, {duration: 50, complete: onalltransitioncomplete});
                    }
                    else {
                        onalltransitioncomplete();
                    }
                }});
            });
        }});
    };

    this.doTransition = doTransition;
};