pm.manager.viewscript['index'] = function () {

    var debug = pm.base.debug.index;

    /* BIND */
    var bind = function ($view) {
        if (debug)console.info('pm.manager.view[index].bind');
//        $viewindex = $view;
//        pm.manager.resize.addlive('index_resize', resize);

//        $view.on('onviewdisplayed', initindex);

    };

    /* UNBIND */
    var unbind = function (options) {
        if (debug)console.info('unbind', options);
//        pm.manager.resize.removelive('index_resize', resize);
//        destroysliders(options.option.$view);
    };



    this.bind   = bind;
    this.unbind = unbind;
};
