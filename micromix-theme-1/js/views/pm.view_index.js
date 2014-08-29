/**
 * when going to a view who has data-context = "index" we execute here
 */
pm.manager.viewscript['index'] = function () {

    var debug = pm.base.debug.index;

    /* BIND */
    var bind = function ($view) {
        if (debug)console.info('pm.manager.view[index].bind');
        micromix.managethisawesomemicromixsound.refreshbind($view);//todo there's a generic function for viewchange, move it there somewhere

        $view.find('#commentform').on('submit', onpostnewcomment);

    };

    /* UNBIND */
    var unbind = function (options) {
        if (debug)console.info('unbind', options);
    };



    this.bind   = bind;
    this.unbind = unbind;
};
