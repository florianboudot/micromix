<?php get_header(); ?>
<!-- TEMPLATE SINGLE (one post + its comments) -->



	<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
	    <?php $_SESSION["article_id"] = get_the_ID(); ?>
		<?php include("navigation.php"); ?>
		
		<div class="post single">
			<?php include("the_post.php"); //title, image, playlist, player, etc. ?>
		</div><!-- .article -->
		
		<!-- related posts plugin -->
		<?php if(function_exists('related_posts')) related_posts(); ?>
		
		
		
		<!-- comments -->
		<?php comments_template(); ?>
		<?php include("navigation.php"); ?>
		
	
	
		
	<?php endwhile; else: ?>
		
		<p>Sorry, no posts matched your criteria.</p>
	
	<?php endif; ?>
	
	
	
	


<?php get_sidebar(); ?>
					
				