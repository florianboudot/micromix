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




});