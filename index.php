<?php get_header(); ?>

	<?php if (have_posts()) : ?>

		<?php while (have_posts()) : the_post(); ?>



		<div class="post" id="post-<?php the_ID(); ?>">

			
			<?php include("the_post.php"); //title, image, playlist, player, etc. ?>
			
			
		</div><!-- .article -->
		
		<?php endwhile; ?>

		<div class="navigation">
			<p class="older-entries"><?php next_posts_link('&laquo; Older Entries') ?></p>
			<p class="newer-entries"><?php previous_posts_link('Newer Entries &raquo;') ?></p>
		</div>
	<?php else : ?>



		<h2>Not Found</h2>

		<p>Sorry, but you are looking for something that isn't here.</p>

		<?php include (TEMPLATEPATH . "/searchform.php"); ?>



	<?php endif; ?>




<?php get_sidebar(); ?>