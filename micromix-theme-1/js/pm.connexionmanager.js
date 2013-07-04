/* $Id: pm.base.contentmanager.js 3050 2012-06-27 15:47:06Z rodsto_free $ */

if(typeof(pm) == 'undefined'){var pm = {}}

pm.Connexionmanager = function() {
    var debug = pm.base.debug.Connexionmanager;

    if (debug)console.info('pm.base.Contentmanager.js');

    var oauthcallback = function(){
        if (debug)console.info('nothing happen lol');
    };
    var _oauth = {};
    var ourl = {
        request_token: 'http://' +  location.host + '/oauth/request_token',
        access_token: 'http://' +  location.host + '/oauth/access_token'
    };
    var getauthurl = function (key) {
        if (debug)console.info('getauthurl');

        var url = ourl[key];
        if(!url){
            if (debug)console.info('url invalid', key);
            return false;
        }
        return url

    };

    if(oauthenabled){
        var conkey = oauth_key ? oauth_key : 'vJp3zRMQthmL6d5yJp9eUJ4rqxTYEGKS';
        var consec = oauth_secret ? oauth_secret : 'v82BToK9QRpBGKJKWq6tbhQaGB5w46rC';
    }

    var _message;
    var _accessor;
    var getauth = function() {
        if (debug)console.info('getauth');

        var accessor = {
            consumerKey : conkey,
            consumerSecret : consec
        };

        var message = {
            action: getauthurl('request_token'),
            method: 'POST',
            parameters: {
                oauth_consumer_key :conkey
            }
        };

        OAuth.completeRequest(message, accessor);

        $.ajax({
            url : getauthurl('request_token'),
            type : 'POST',
            data : message.parameters,
            success : ongetauth
        });

    };

    var ongetauth = function(auth){
        if (debug)console.info('ongetauth', auth);
        var authstring = auth;
        var auth_token = authstring.split('=')[1].split('&')[0];
        var auth_secret = authstring.split('=')[2];

        var accessor = {
            consumerKey : conkey,
            consumerSecret : consec,
            tokenSecret : auth_secret
        };

        var message = {
            action: getauthurl('access_token'),
            method: 'POST',
            parameters: {
                'oauth_consumer_key' : conkey,
                'oauth_token' : auth_token
            }
        };
        OAuth.completeRequest(message, accessor);
        if (debug)console.info(message);

        // authstring = 'key =' + authstring.split('=')[1].split('&')[0] + ' secret = ' + authstring.split('=')[2];

        $('#auth').html(authstring);
        $.ajax({
            url : getauthurl('access_token'),
            type : 'POST',
            data : message.parameters,
            success : onauthsuccess,
            error : onautherror
        });
    };

    var onauthsuccess = function(auth){
        if (debug)console.info('onauthsuccess' , authstring);

        var authstring = auth;
        var auth_token = authstring.split('=')[1].split('&')[0];
        var auth_secret = authstring.split('=')[2];

        var accessor = {
            consumerSecret : consec,
            tokenSecret : auth_secret
        };

        var message = {
            action: '',
            method: 'GET',
            parameters: {
                'oauth_consumer_key' : conkey,
                'oauth_token' : auth_token
            }
        };

        if (debug)console.info(message);
        OAuth.completeRequest(message, accessor);
        OAuth.SignatureMethod.sign(message, accessor);
        if (debug)console.info(message);

        _message = message;
        _accessor = accessor;

        oauthcallback();
    };

    var onautherror = function(error){
        if(/already/.test(error.statusText)){
            //something
        }
    };



    var requestoauth = function (callback) {
        if (debug)console.info('requestoauth');
        oauthcallback = callback;
        getauth();

    };



    var cache = !debug; // Active cache ?
    var cacheTime = (60*60*1000); // 1h
    //var cacheTime = (60*1000); // 60s
    var models = {};
    var urlToQuery;
    var getters = pm.getters;
    var settings = pm.base.settings;
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
        if (debug)console.info('request', _oauth, options);

        //todo: add oauth key to data
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

        var _data;
        if(oauthenabled){
            var message = _message;
            message.action = url;
            message.method = options.type;
            message.parameters.oauth_nonce = OAuth.nonce(6);
            OAuth.completeRequest(message, _accessor);
            OAuth.SignatureMethod.sign(message, _accessor);
            _data = $.extend(message.parameters, options.data);
        }
        else{
            _data = options.data;
        }

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
//        if (debug)console.error(_data);
        pm.base.loadershow();
//        $ajaxrequest = $.ajax(lastrequest);
        $.get(options.url, options.success);
//        $bla = $ajaxrequest;
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
            if(/Expired timestamp/.test(responsetext)){
                requestoauth(dolastrequestbeforeauthfail);
            }
            else{

//                pm.manager.user.needlogin(this.ispage);
            }
        }
        if(status == 0){
            if (debug)console.error(responsetext);
            var $popin = $('<div>');
            $popin.html('<span id="reload">connexion au serveur perdu</span>');
            var options = {
                id:'timeout',
                durationshow:250,
                durationhide:175,
                easing:'easeInOutQuart',
                complete:function(){},
                bindpostload:function(){},
                mask: true,
                closetext:'×',
                masterclass: 'default-theme'
            };

            var $timeoutpopin = $popin.pmpopin(options);
            $popin.find('span').on('click', function reloadonconnexionfail(){
                $timeoutpopin.trigger('close');
                dolastrequestbeforeauthfail(lastrequest);
            });

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
            if(/Content already bookmarked/.test(responsetext)){
                pm.manager.user.userfail('bookmark', 'already bookmarked');
            }
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

    this.oauth = requestoauth;
    this.request = request;
    this.getrequest = function(){return lastrequestbeforeauthfail};
    this.lastrequest = dolastrequestbeforeauthfail;
};