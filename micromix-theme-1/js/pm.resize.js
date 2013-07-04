/* $Id: pm.base.resize.js 3023 2012-06-26 12:17:43Z antsan2 $ */

if(typeof(pm) == 'undefined'){var pm = {}}

/**
 *
 * @param latency {Number} latency of temporized resize
 * @constructor
 *
 * @property {Function} add add function on event resize
 * @property {Function} remove
 * @property {Function} addlive add function on event resize with a temporization
 * @property {Function} removelive
 * @property {Function} execute will execute the resize, 'live' execute the live function, 'tempo' execute the temporized function, 'all' both
 */
pm.Resize = function(latency) {
    var debug = pm.base.debug.Resize;

    if (debug)console.info('pm.resize.js');

    var objectresize = {};
    var objectresizelive = {};

    latency = typeof(latency) == 'number' ? latency : 125;
    var TIMEOUTresize = 0;
    var resizectrl = function () {
        if (debug)console.info('resizectrl');
        clearTimeout(TIMEOUTresize);
        resizelive();
        TIMEOUTresize = setTimeout(resizetempo,latency);
    };

    var addresize = function (key, fn) {
        if (debug)console.info('pm.Resize:addresize');
        objectresize = pm.addfntocollection(objectresize, key, fn);
    };
    var removeresize = function (key, fn) {
        if (debug)console.info('pm.Resize:removeresize');
        objectresize = pm.removefntocollection(objectresize, key, fn);
    };
    var addresizelive = function (key, fn) {
        if (debug)console.info('pm.Resize:addresize');
        objectresizelive = pm.addfntocollection(objectresizelive, key, fn);
    };
    var removeresizelive = function (key, fn) {
        if (debug)console.info('pm.Resize:removeresize');
        objectresizelive = pm.removefntocollection(objectresizelive, key, fn);
    };

    var resizetempo = function () {
        if (debug)console.info('pm.Resize:resizetempo', objectresize);

        for (var key in objectresize) {
            objectresize[key]();
        }

    };
    var resizelive = function () {
        if (debug)console.info('pm.Resize:resizelive', objectresizelive);

        for (var key in objectresizelive) {
            objectresizelive[key]();
        }

    };

    this.resizecollection = objectresize;
    this.resizecollectionlive = objectresizelive;
    this.add = addresize;
    this.remove = removeresize;
    this.addlive = addresizelive;
    this.removelive = removeresizelive;
    this.execute = function(type){
        if(type == 'live'){
            resizelive();
        }
        if(type == 'tempo'){
            resizetempo();
        }
        if(type == 'all'){
            resizelive();
            resizetempo();
        }
    };

    $(window).bind('resize', resizectrl);

};
