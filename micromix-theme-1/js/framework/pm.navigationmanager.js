/* $Id: pm.base.navigationmanager.js 3023 2012-06-26 12:17:43Z antsan2 $ */

if(typeof(pm) == 'undefined'){var pm = {}}

/**
 * not used anymore in this project, removed from js file call
 * @constructor
 * @deprecated
 */
pm.Navigationmanager = function() {
    var debug = pm.base.debug.Navigationmanager;

    if (debug)console.info('pm.base.Navigationmanager.js');

    //todo: goto a view
    //todo: goto position
    //todo: events of prexecution, execution, postexecution

    var goTo = function(view) {
        if (debug)console.info('pm.base.Navigationmanager.js:goTo', view);

        // Get data from model
        pm.manager.content.getData(view, null, null, function(data){

            if (debug)console.info('pm.base.Navigationmanager.js:goTo:getData:callback', view, data);

            var YODAWGDATAINDATA = data.data;
            YODAWGDATAINDATA = YODAWGDATAINDATA ? YODAWGDATAINDATA : {};
            var title_page = YODAWGDATAINDATA.title_page;
            title_page = title_page ? title_page : YODAWGDATAINDATA.page_title;
            var page_title = typeof(title_page) == 'string' ? title_page : 'Micromix';
            if(page_title){
                document.title = page_title
            }

            // Do view preshow (before show view)
            pm.manager.view.preshow(data, function(){

                // Send data to view (template html then show)
                pm.manager.view.load(data, view);
            });
        });
    };

    this.goToView = goTo;
};