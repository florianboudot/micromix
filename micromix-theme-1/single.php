<?php get_header(); ?>
<!-- TEMPLATE SINGLE (one post + its comments) -->
	<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
        <?php $_SESSION["article_id"] = get_the_ID(); // to get current id and highlight item in the menu (function allPostsByYear) ?>
		<?php include("navigation.php"); ?>
		
		<div class="article" id="post-<?php the_ID(); ?>">

			<?php include("the_post.php"); //title, image, playlist, player, etc. ?>

		</div><!-- .article -->
		
		<!-- related posts plugin -->
		<?php if(function_exists('related_posts')) related_posts(); ?>
		
		<?php comments_template(); ?>
	
		
	<?php endwhile; else: ?>
		
		<p>Sorry, no posts matched your criteria.</p>
	
	<?php endif; ?>
	

	<?php include("support.php"); ?>
</div><!-- #column2 -->

<?php get_sidebar(); ?>
					
				