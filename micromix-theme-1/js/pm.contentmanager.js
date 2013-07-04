/* $Id: pm.base.contentmanager.js 3050 2012-06-27 15:47:06Z rodsto_free $ */

if(typeof(pm) == 'undefined'){var pm = {}}

pm.Contentmanager = function() {
    var debug = pm.base.debug.Contentmanager;

    if (debug)console.info('pm.base.Contentmanager.js');

    var request = false;

    var cachedviews = {};
    var getcachedview = function () {
        if (debug)console.info('getcachedview');
        return cachedviews;
    };
    var cacheget = function (url) {
        if (debug)console.info('cacheget');
        var cachedview = cachedviews[url];
        return cachedview ? cachedview : false;
    };
    var cacheset = function (url, data) {
        if (debug)console.info('cacheset');
        cachedviews[url] = data;
    };
    var cleanurl = function (url) {
        if (debug)console.info('cleanurl');

        url = encodeURI(url);

        return url.replace(/\/|-|\\|\?|=/g,'');
    };

    var reeadytoloadview = function (data, url) {
        if (debug)console.info('reeadytoloadview', data);
        // analytics
        if(GOOGLE_GI_ACTIVATE){
            pm.analytics.trackpage(document.location.href);
        }

//        pm.setters.setviewkey(data.data.viewname);
        pm.manager.view.loadview(data, cleanurl(url));

    };

    var getpage = function(url) {
        if (debug)console.info('pm.base.Contentmanager.js:getpage');

        var cache = cacheget(url);
        if(cache){
            reeadytoloadview(cache, url);
        }
        else{
            if(request){
                request = false;
            }
            request = true;
            pm.manager.connexion.request({
                url: url + '?ajax=true',
                data:{ajax:true},
                type: 'GET',
                dataType: 'html',
                cancelable:true,
                needcancel:true,
                ispage:true,
                success: function(data) {
                    console.warn('ici');
                    cacheset(url, data);
//                    var data2 = data.data;
//                    var page_title = data2.page_title;

//                    if(page_title){
//                        document.title = page_title
//                    }
                    reeadytoloadview(data, url);

                },
                complete:function(){
                    request = false;
                }
            });
        }

    };

    var context = $('.view').data('context');
    var urlforcache = location.pathname + location.search;
    cacheset(urlforcache, {data:{viewname:context},html:$('.view-container').html()});
    pm.setters.setviewkey(context);

    this.getpage = getpage;
//    this.getcachedview = getcachedview;
//    this.cacheget = cacheget;

};