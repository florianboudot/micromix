/* $Id: pm.base.viewactions.js 3086 2012-07-02 13:49:42Z antsan2 $ */

if(typeof(pm) == 'undefined'){var pm = {}}

pm.extendviewmanageractions = function (options) {
    var debug = pm.base.debug.Viewmanager;
    if (debug)console.info('pm.extendviewmanageractions');
    var TIMEOUTframecolor = 0;
    var viewaction = {
        preshow: {
            'collection':function(callback){
                return (callback) ? callback() : true;
            },
            'blog':function(callback){
                return (callback) ? callback() : true;
            },
            'index':function(callback){
                return (callback) ? callback() : true;
            },
            'finally':function(callback){
                return (callback) ? callback() : true;
            },
            'start':function(viewname, data, callbackStart){
                if (debug)console.info('pm.extendviewmanageractions:viewaction:preshow:start', data);
                var isstart = false;
                var dostart = function() {
                    if (debug)console.info('pm.extendviewmanageractions:viewaction:preshow:start:dostart');
                    if(!isstart){
                        isstart = true;
                        return (callbackStart) ? callbackStart() : true;
                    }
                    else{
                        if (debug)console.warn('pm.extendviewmanageractions:viewaction:preshow:start:dostart executed twice');
                    }
                };
                dostart();

            }
        },


        bind: {
            'finally':function(options){
//                return (options.callback) ? options.callback(options.$view) : true;
            },
            'start':function(view, options){
                if (debug)console.info(view, options);
                var $view = options.$view;

                if(view !== $view.data('context')){
                    // the view do not match de context/content, canceling, it seems we are already leaving the page
                    return;
                }

                pm.manager.history.bindLinks($view);

                if(!pm.manager.viewscript[view]){
                    var sscriptsrc = theme_path + '/js/pm.view_' + view + '.js';
                    sscriptsrc = debug ? sscriptsrc + '?cache=' + new Date().getTime() : sscriptsrc;
                    $("<script>", { "src" : sscriptsrc, "type" : "text/javascript" }).appendTo("head");
                }
                var checkviewcount = 0;
                var checkview = function () {
                    if (debug)console.info('checkview', view, !!pm.manager.viewscript[view]);
                    //todo set a counter to avoid infinite loop if network error
                    if (pm.manager.viewscript[view]) {
                        pm.manager.view[view] = new pm.manager.viewscript[view];
                        pm.manager.view[view].bind($view);
                    }
                    else{
                        if(checkviewcount++ < 10){
                            setTimeout(checkview,500);
                        }
                        else{
                            checkviewcount = 0;
                            setTimeout(checkview,10000);
                        }
                    }

                };
                if(pm.manager.view[view]){
                    pm.manager.view[view].bind($view);
                }
                else{
                    checkview();
                }





                var $responsivemenus = $('.access-menu-responsive-link-no-callback');
                $responsivemenus.each(function(i,o){
                    pm.responsivemenu[o.id] = new pm.Responsivemenu($(o));
                });

                // css pointer-event fix for IE
                if($.browser.msie){
                    baseKenzo.nopointerevents($('#site').find('.no-pointer-events'));
                }

            }
        },

        unbind: {
            'finally':function($view){
                if($view){
                    $view.html('');
                }
            },
            'start':function(view, $view){
                if (debug)console.info('pm.extendviewmanageractions:viewaction:unbind:start', view, options);

                if (pm.manager.view[view]) {
                    pm.manager.view[view].unbind($view);
                }
                else {
                    if (debug)console.warn('pm.viewactions.unbind.start: no instance for view ' + view);
                }
            }
        }

    };

    return viewaction;

};