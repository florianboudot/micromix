jQuery(document).ready(function() {
    var $ = jQuery;
    /* SOUNDMANAGER SETUP */
    var $pause = $('<div>');
    soundManager.setup({
        url: '/wp-content/plugins/wpaudio-mp3-player/sm2/', // where to find flash audio SWFs, as needed
        // optional: prefer HTML5 over Flash for MP3/MP4
        preferFlash: false,
        onready: function() {
            $('.wpaudio').each(function(i,o){
                var audiosrc = this.href.replace('http://www.micromix.fr', '');
                soundManager.createSound({
                    url:audiosrc,
                    id: this.parentNode.id,
                    onplay:function(){$pause.css({background:'green'})},
                    onpause:function(){$pause.css({background:'red'})}
                })

            }).bind('click', function(e){
                    e.preventDefault();
                    soundManager.pauseAll();
                    soundManager.play(this.parentNode.id);

                });
            $pause.bind('click', function(){
                soundManager.pauseAll();
            });
            $pause.css({position:'fixed',height:20,width:20,background:'red',top:40,right:40});
            $('body').append($pause);
        }
    });



	// todo : replug this to the new audio player
	var stachts = {}; // object
    jQuery('.bt-player a').bind('mousedown',function(){
        var postId = jQuery(this).parents('.bt-player')[0].id;

        if (typeof stachts[postId] == 'undefined') {
           
            stachts[postId] = true;
            
            jQuery.ajax({
                type:'POST',
                data: 'postId='+postId,
                url: '/wp-content/themes/micromix-theme-1/ajax.php',
                success : function(obj) {
                    //console.info('success');
                    //console.info(obj);
                },
                error : function(obj) {
                    //console.error('faiiiiil');
                    //console.error(obj);
                }
            });
        }
    });


    // open / close posts-year-month
    if (document.getElementById("posts-year-month")) {

        //if (jQuery("body.single").size() != 0) {
        var lists = jQuery("#posts-year-month ul ul");
        var lists2 = jQuery("#posts-year-month ul");

        if (jQuery("#posts-year-month ul ul.open").size()>0) {
            jQuery("#posts-year-month ul ul.open").parent('li').parent('ul').css('display', 'block');
            jQuery("#posts-year-month ul ul.open").parent('li').parent('ul').prev('.year').addClass('active');
        } else {
            lists[0].style.display = 'block';
            lists2[0].style.display = 'block';
        }

        //}



        var titles = jQuery("#posts-year-month h4");
        titles.bind('click', function(){
            monthContent = jQuery(this);
            monthContent.toggleClass('active');
            monthContent.next("ul").slideToggle();
        });

        var yearTitle = jQuery("#posts-year-month h3");
        if(document.getElementById("homepage")) {
            yearTitle[0].className = 'active';
        }
        yearTitle.bind('click', function(){
            monthTitle = jQuery(this);
            monthTitle.toggleClass('active');
            monthTitle.next("ul").slideToggle();
        });
    }
    // END posts-year-month

});