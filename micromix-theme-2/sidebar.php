</div><!-- #column-1 -->

<div id="column-2">
	
	
	<div id="sidebar">
		
		    
			<?php 	/* Widgetized sidebar, if you have the plugin installed. */
					if ( !function_exists('dynamic_sidebar') || !dynamic_sidebar() ) : ?>
			<div>
			    <h3>Search</h3>
                <?php include (TEMPLATEPATH . '/searchform.php'); ?>

	
            	<!--<h3>social</h3>
            	<p>
            		<a href="<?php bloginfo('rss2_url'); ?>" title="Entries (RSS)">RSS</a>
            	</p>
            	
            	<p>
            		<a href="http://twitter.com/micromix" title="follow micromix">twitter</a>
            	</p>
            	
            	<p>
            		<a href="http://www.facebook.com/micromix" title="become a fan of micromix">facebook</a>
            	</p>-->
            </div>  

			
            
			<?php if ( is_404() || is_category() || is_day() || is_month() ||
						is_year() || is_search() || is_paged() ) {
			?> 
			<div id="current-action">
			

    			<?php /* If this is a 404 page */ if (is_404()) { ?>
    			<?php /* If this is a category archive */ } elseif (is_category()) { ?>
    			You are currently browsing the archives for the <?php single_cat_title(''); ?> category.
    
    			<?php /* If this is a yearly archive */ } elseif (is_day()) { ?>
    			You are currently browsing the 
    			<a href="<?php bloginfo('url'); ?>/"><?php echo bloginfo('name'); ?></a> blog archives
    			for the day <?php the_time('l, F jS, Y'); ?>.
    
    			<?php /* If this is a monthly archive */ } elseif (is_month()) { ?>
    			You are currently browsing the 
    			<a href="<?php bloginfo('url'); ?>/"><?php echo bloginfo('name'); ?></a> blog archives
    			for <?php the_time('F, Y'); ?>.
    
    			<?php /* If this is a yearly archive */ } elseif (is_year()) { ?>
    			You are currently browsing the 
    			<a href="<?php bloginfo('url'); ?>/"><?php echo bloginfo('name'); ?></a> blog archives
    			for the year <?php the_time('Y'); ?>.
    
    			<?php /* If this is a monthly archive */ } elseif (is_search()) { ?>
    			You have searched the 
    			<a href="<?php echo bloginfo('url'); ?>/"><?php echo bloginfo('name'); ?></a> blog archives
    			for <strong>'<?php the_search_query(); ?>'</strong>. 
    			If you are unable to find anything in these search results, you can try one of these links.
    
    			<?php /* If this is a monthly archive */ } elseif (isset($_GET['paged']) && !empty($_GET['paged'])) { ?>
    			You are currently browsing the 
    			<a href="<?php echo bloginfo('url'); ?>/"><?php echo bloginfo('name'); ?></a> blog archives.
    
    			<?php } ?>
    
            		
    		</div> <?php }?>

			

			<!-- <li>
			                <h3>Archives</h3>
			                <ul>
			                    <?php //wp_get_archives('type=monthly&show_post_count=1'); ?>
			                </ul>
			                
			            </li> -->
			
			<div id="artists">
				<h3>Top artists</h3>
				
				<?php wp_tag_cloud('smallest=1&largest=1&orderby=count&order=DESC&number=10&unit=em&format=list'); ?>
							
				
			</div><!-- #artists -->
			
            <div id="posts-year-month">
                <h2>Archives</h2>
            
                <?php getPostYearMonth(); ?>
            
            </div><!-- #posts-year-month -->
			
			
			<!-- <ul>
			    <?php //wp_list_categories('show_count=1&title_li=<h3>Styles</h3>&orderby=count&order=DESC'); ?>
			</ul>-->

			<ul>
			    <?php wp_list_bookmarks(); ?>
			</ul>

            
					
			<?php 
    			if (function_exists('mailchimpSF_signup_form')){
    			    mailchimpSF_signup_form(); 
    			}
			?>
				
			<?php endif; ?>
	</div><!-- #sidebar -->
</div><!-- #column-2 -->


<?php get_footer(); ?>

