/* $Id: pm.base.contentmanager.js 3050 2012-06-27 15:47:06Z rodsto_free $ */

if(typeof(pm) == 'undefined'){var pm = {}}

pm.Connexionmanager = function() {
    var debug = pm.base.debug.Connexionmanager;
    if (debug)console.info('pm.base.Contentmanager.js');
    var cache = !debug; // Active cache ?
    var cacheTime = (60*60*1000); // 1h
    //var cacheTime = (60*1000); // 60s
    var models = {};
    var urlToQuery;
    var $ajaxrequest;
    var lastrequest = null;
    var lastrequestbeforeauthfail = null;
    /**
     *
     * @param options {Object}
     * url: String
     * data: {Object}
     * type: String
     * dataType: String
     * success: function
     * complete: function
     * error: function
     *
     */
    var request = function(options) {
        if (debug)console.info('request', options);

        if($ajaxrequest && options.needcancel){
            if($ajaxrequest.cancelable){
                $ajaxrequest.abort()
            }
        }
        if(!options){
            if (debug)console.error('U MAD? NO OPTIONS?');
            return false;
        }
        if(!options.url){
            throw new Error('url undefined')
        }
        var datatype = options.datatype;
        datatype = datatype ? datatype : 'json';

        var url = location.protocol + location.host + options.url;

        var _error = options.error;
        _error = _error ? _error : error;

        var _data = options.data;

        lastrequest = {
            url: options.url,
            data: _data,
            type: options.type,
            dataType: datatype,
            success: options.success,
            complete:onajaxcomplete,
            error: _error
        };
        if(options.ispage){
            lastrequest.ispage = true;
        }
        pm.base.loadershow();
        $.get(options.url, options.success);
    };
    var onajaxcomplete = function () {
        if (debug)console.info('onajaxcomplete');
        pm.base.loaderhide();
        $ajaxrequest = null;
    };
    var error = function (xhrerror,textStatus, errorThrown) {
        var status = xhrerror.status;
        var responsetext = xhrerror.responseText;
        if (debug)console.error('xhrerror', xhrerror, responsetext, textStatus, errorThrown);
        if(status == 401){
            // You’re not authenticated to access this resource or login/password are wrong
            lastrequestbeforeauthfail = this;
        }
        if(status == 0){
            if (debug)console.error(responsetext);
            // no connexion
        }
        if(status == 400){
            if (debug)console.error(responsetext);
            // A parameter is missing or wrong
        }
        if(status == 403){
            if (debug)console.error(responsetext);
            // You’re not allowed to execute this operation (api authentication xhrerror)
        }
        if(status == 404){
            if (debug)console.error(responsetext);
            // The requested resource is not found
        }
        if(status == 405){
            if (debug)console.error(responsetext);
            // The used method is not available for this resource
        }
        if(status == 406){
            if (debug)console.error(responsetext);
        }
        if(status == 500){
            if (debug)console.error(responsetext);
            // Default xhrerror
        }
    };

    var dolastrequestbeforeauthfail = function (__request) {
        if (debug)console.info('dolastrequestbeforeauthfail');

        var _request = __request ? __request : lastrequestbeforeauthfail;
        if(_request){
            request(_request);
        }
        lastrequestbeforeauthfail = null;
    };

    this.request = request;
    this.getrequest = function(){return lastrequestbeforeauthfail};
    this.lastrequest = dolastrequestbeforeauthfail;
};