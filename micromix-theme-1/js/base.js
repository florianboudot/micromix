jQuery(document).ready(function() {
	
	
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
                    console.info('success');
                    console.info(obj);   
                },
                error : function(obj) {
                    console.error('faiiiiil');
                    console.error(obj);
                }
            });//end ajax
            
        }// end if
    });

	



});