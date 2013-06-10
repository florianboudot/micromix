<?php get_header(); ?>

<?php if (have_posts()) : ?>


	<h2 class="pagetitle">Search Results</h2>



	<?php //include("navigation.php"); ?>





	<?php while (have_posts()) : the_post(); ?>

		<div class="post result">
			<?php include("the_post_result.php"); //title, image, playlist, player, etc. ?>
		</div><!-- .article -->
	<?php endwhile; ?>

	
	
	<?php if(function_exists('wp_paginate')) { wp_paginate(); } ?>


<?php else : ?>



	<h2 class="pagetitle"><span>No posts found. Try a different search?</span></h2>

	<?php include (TEMPLATEPATH . '/searchform.php'); ?>



<?php endif; ?>


<?php get_sidebar(); ?>

