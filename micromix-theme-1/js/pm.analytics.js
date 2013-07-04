/* $Id: pm.base.historymanager.js 3085 2012-07-02 13:23:29Z rodsto_free $ */

if(typeof(pm) == 'undefined'){var pm = {}}

pm.analytics = {
    trackpage: function (url) {
        var debug = pm.base.debug.Analytics;
        if (debug)console.info('trackpage');
        _gaq.push(['_trackPageview', url]);

    },

    trackevent: function () {
        var debug = pm.base.debug.Analytics;
        if (debug)console.info('trackevent');

    },

    init: function () {
        var debug = pm.base.debug.Analytics;
        if (debug)console.info('init');

        if(GOOGLE_GI_ACTIVATE) {
            window._gaq = window._gaq || [];
            _gaq.push(['_setAccount', GOOGLE_GI_ACCOUNT]);
            this.trackpage(document.location.href);
//            _gaq.push(['_trackPageview', document.location.href]);
            (function () {
                var ga = document.createElement('script');
                ga.type = 'text/javascript';
                ga.async = true;
                ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
                var s = document.getElementsByTagName('script')[0];
                s.parentNode.insertBefore(ga, s);
            })();
        }
        else {
            console.warn('NO ANALYTICS');
        }



    }

};