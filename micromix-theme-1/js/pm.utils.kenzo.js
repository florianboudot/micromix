if(typeof(pm) == 'undefined'){var pm = {}}

pm.utils = {
   /**
    *
    * @param $view {jQuery}
    * @param fakelink {boolean}
    * @param changetitle {boolean}
    */
   callResponsiveMenu : function ($view, fakelink, changetitle) {
        var $menuLink = $view.find('.access-menu-responsive-link');

        $menuLink.each(function(i,o){
            var options = {
                fakelink : fakelink,
                changetitle : changetitle,
                callbackopen : function(){
                    $('html').addClass('freezebody menuresponsiveisopen');
                },
                callbackclose : function($listitem){
                    $('html').removeClass('freezebody menuresponsiveisopen');
                    if($listitem.find){
                        $listitem.find('.action').trigger('click');
                    }
                }
            };
            pm.responsivemenu[$(o).prop('id')] = new pm.Responsivemenu($(o), options);
        });
   },

    /**
     *
     * @param $view {jQuery}
     */
    hoverPushButton : function ($view) {
        var $pushButtons = $view.find('.push-button');

        $pushButtons.each(function(i,o){
            var $parent =  $(this).parents('.push-product');
            $(o).on('mouseover', function(){
                $parent.find('.title').addClass('on');
                $parent.find('.text-hover').addClass('on');
            });
            $(o).on('mouseout', function(){
                $parent.find('.title').removeClass('on');
                $parent.find('.text-hover').removeClass('on');
            });
        });
    },

    /**
     *
     * @param $view {jQuery}
     * @param isBackgroundPosition {boolean}
     */
    setRangeWrapper : function ($view,isBackgroundPosition) {
        var $wrapper = $view.find('.JS_wrapper');

        $wrapper.each(function(i,o){
            var $background         = $(o).find('.JS_background');
            var backgroundHeight    = $background.height();
            var contentHeight       = $(o).find('.JS_content').height();

            // set wrapper height
            if ( backgroundHeight > contentHeight){
                $(o).css('height', backgroundHeight);
            }else{
                $(o).css('height', contentHeight);
            }

            // set background position
            if (isBackgroundPosition){
                var picturesTop = $(o).find('.JS_pictures').position().top;
                $background.css('top', picturesTop-50)
            }
        });
    },

    /**
     *
     * @param $view {jQuery}
     * @param $containerToScroll {jQuery}
     */
    addScrollDownArrow : function ($view,$containerToScroll) {

        var $container = $containerToScroll;
        var containerTop;
        var containerBottom;
        var arrowTop;

        // add arrow
        var $arrow = $('<img>').attr('src',theme_path + '/img/arrow-context-bottom.png').attr('class','arrow-scroll-down context-background-color');
        $view.append($arrow);

        var $scroller = pm.getters.getscrollelement();
        var statusisoff = -1;
        // show/hide arrow
        var showHideArrow = function(){

            var canbeoff = $scroller.prop('scrollTop') >= containerBottom;
            if (canbeoff && !statusisoff){
                $arrow.addClass('off');
                statusisoff = true;
            }
            else if(!canbeoff && statusisoff){
                $arrow.removeClass('off');
                statusisoff = false;
            }
            else if(statusisoff === -1){
                $arrow[canbeoff ? 'addClass' : 'removeClass']('off');
            }
        };
        var setarrowposition = function () {
            arrowTop = $arrow.position().top;
            containerTop = $container.offset().top - pm.manager.header.getheight() - 10;
            containerBottom = containerTop - 1;
            showHideArrow();
        };
        // on init, resize and scroll
        setarrowposition();
        pm.manager.resize.addlive('setarrowposition',setarrowposition);
        $(window).on('scroll',showHideArrow);

        // scroll to container
        $arrow.on('click',function(){
            var scrollto = $(this).hasClass('off') ? 0 : containerTop;
            var actualscrolltop = $scroller.prop('scrollTop');
            var duration = Math.max(500, Math.min(Math.abs(actualscrolltop - scrollto)/1.5, 1500));
            $scroller.stop().animate({scrollTop:scrollto}, {duration:duration,easing:'easeOutQuart'});
        });
    },

   /**
    *
    * @param $form {jQuery}
    */
   hideLabel : function($form){
       var showhidelabel = function (e) {
           var $input = $(this);
           var $label = $input.prev('label');

           if (e.type === 'focus') {
               $label.hide();
           }
           else if (e.type === 'blur') {
               if ($input.val() == '') {
                   $label.show();
               }
           }
       };

       $form.find('.input-text input').on('focus blur', showhidelabel);
   },

    /**
     *
     * @param $form {jQuery}
     */
   checkOnKeyUp : function ($form){
        $form.find('.input-text input').each(function(i,input){
            // on keypress
            $(input).one('keypress', function(e){
                var state = $(this).next('.state');
                state.addClass('error');
            });
            // on keyup & blur
            $(input).on('keyup',function(key) {
                var data = $(this).val();
                // email
                if ($(this).hasClass('check-email')){
                    pm.utils.checkEmailField($(this));
                }
                // lenght
                if ($(this).hasClass('check-length')){
                    pm.utils.checkFieldLenght($(this));
                }
            });
        });
   },

    /**
     *
     * @param $input {jQuery}
     */
   checkEmailField : function($input){
        var regexpEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+((\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)?)+@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9\-]*[a-z0-9])?$/i;
        var data = $input.val();
        var $error = $input.parents('form').find('.form-error');

        if (regexpEmail.test(data)){
            $input.add($error).removeClass('error');
            return true;
        }else{
            $input.add($error).addClass('error');
            return false;
        }

   },

    /**
     *
     * @param $input {jQuery}
     */
   checkFieldLenght : function($input){
        var minlenght = $input.attr('minlength');
        var data = $input.val();
        var state = $input.next('.state');

        if (data.length > minlenght){
            state.addClass('ok').removeClass('error');
            return true;
        }else{
            state.removeClass('ok').addClass('error');
            return false;
        }
   },

    /**
     *
     * @param url {string}
     */
   sanitizeURL: function(url){
        url = url.replace('/' + pm.base.settings.language + '/', '');
        url = url.replace(/\//g, '-');
        return decodeURIComponent(url);
   },

    /**
     *
     * @param str {string}
     */
   removeDiacritics: function(str) {
        var changes;

        return function(str){
            if(!changes) {
                changes = defaultDiacriticsRemovalMap;
            }

            for(var i=0; i<changes.length; i++) {
                str = str.replace(changes[i].letters, changes[i].base);
            }

            return str;
        }(str);
   }
};
