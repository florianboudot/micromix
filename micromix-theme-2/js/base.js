jQuery(document).ready(function() {
	
    // STATS - how many time are mixes played ??
    var stachts = {}; // object
    jQuery('.bt-player a').bind('mousedown',function(){
        var postId = jQuery(this).parents('.bt-player')[0].id;
        
        
        
        if (typeof stachts[postId] == 'undefined') {
           
            stachts[postId] = true;
            
            jQuery.ajax({
                type:'POST',
                data: 'postId='+postId,
                url: '/wp-content/themes/micromix-theme-2/ajax.php',
                success : function(obj) {
                    //console.info('success');
                    //console.info(obj);   
                },
                error : function(obj) {
                    //console.error('faiiiiil');
                    //console.error(obj);
                }
            });//end ajax
            
        }// end if
    });
	// END STATS
	
	
	
	
	
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




});//jQuery(document).ready
