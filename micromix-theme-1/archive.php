<?php get_header(); ?>
<?php if (have_posts()) : ?>
<?php $authordata = get_userdata($post->post_author); ?>
<?php $post = $posts[0]; // Hack. Set $post so that the_date() works. ?>
<div class="result">
	<h2 class="pagetitle"><span>
		<?php echo $wp_query->found_posts; // display number of results ?>
					
		<?php /* If this is a category archive */ if (is_category()) { ?>
		Archive for the &#8216;<?php single_cat_title(); ?>&#8217; Category
		<?php /* If this is a tag archive */ } elseif( is_tag() ) { ?>
		Mixtapes with artist &#8216;<?php single_tag_title(); ?>&#8217;
		<?php /* If this is a daily archive */ } elseif (is_day()) { ?>
		Archive for
		<?php the_time('F jS, Y'); ?>
		<?php /* If this is a monthly archive */ } elseif (is_month()) { ?>
		Archive for
		<?php the_time('F, Y'); ?>
		<?php /* If this is a yearly archive */ } elseif (is_year()) { ?>
		Archive for
		<?php the_time('Y'); ?>
		<?php /* If this is an author archive */ } elseif (is_author()) { ?>
		mixes by <?php echo $authordata->user_nicename; ?>
		<?php /* If this is a paged archive */ } elseif (isset($_GET['paged']) && !empty($_GET['paged'])) { ?>
			Blog Archives
		<?php } ?>
	</span></h2>
	<?php //include("navigation.php"); ?>
	<?php while (have_posts()) : the_post(); ?>


	
	<div class="article" id="post-<?php the_ID(); ?>">	
		<?php include("the_post.php"); //title, image, playlist, player, etc. ?>
	</div><!-- .article -->



	<?php endwhile; ?>
	<?php //include("navigation.php"); ?>
	<div class="navigation">
		<div class="alignleft">
			<?php next_posts_link('&laquo; Older Entries') ?>
		</div>
		<div class="alignright">
			<?php previous_posts_link('Newer Entries &raquo;') ?>
		</div>
	</div>
	<?php else : ?>
	<h2 class="center">Not Found</h2>
	<?php include (TEMPLATEPATH . '/searchform.php'); ?>
	<?php endif; ?>
	<?php include("support.php"); ?>
	</div><!-- .result -->
</div><!-- #column2 -->

<?php get_sidebar(); ?>
