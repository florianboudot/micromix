<?php get_header(); ?>



<?php if (have_posts()) : ?>


	<div class="result">
		<h2 class="pagetitle"><span>Search Results</span></h2>
	
	
	
		
	
	
	
	
	
		<?php while (have_posts()) : the_post(); ?>
			<div class="article" id="post-<?php the_ID(); ?>">
				<?php include("the_post_result.php"); //title, image, playlist, player, etc. ?>
			</div><!-- .article -->
			
	
	
	
		<?php endwhile; ?>
	
	
	
		<?php include("navigation.php"); ?>
		<?php //if(function_exists('wp_paginate')) { wp_paginate(); } ?>
	</div><!-- .result -->


<?php else : ?>



	<h2 class="pagetitle"><span>No posts found. Try a different search?</span></h2>

	<?php include (TEMPLATEPATH . '/searchform.php'); ?>



<?php endif; ?>





<?php include("support.php"); ?>

</div><!-- #column2 -->



<?php get_sidebar(); ?>