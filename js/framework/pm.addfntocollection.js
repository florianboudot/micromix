/* $Id: pm.base.addfntocollection.js 3023 2012-06-26 12:17:43Z antsan2 $ */

if(typeof(pm) == 'undefined'){var pm = {}}

pm.addfntocollection = function(array, key, fn) {
    var debug = pm.base.debug.addfntocollection;

    if (debug)console.info('pm.addfntocollection');

    if(typeof(fn) == 'function'){
        array[key] = fn;
    }
    return array;

};
pm.removefntocollection = function(array, key, fn) {
    var debug = pm.base.debug.removefntocollection;

    if (debug)console.info('pm.removefntocollection');

    if(typeof(fn) == 'function' && array[key] == fn){
        delete array[key]
    }
    return array;

};
