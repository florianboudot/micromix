<?php get_header(); ?>

								
<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
<div class="post" id="post-<?php the_ID(); ?>">	

	<h2><span><?php the_title(); ?></span></h2>
	


	<div class="page">
		<?php the_content('<p class="serif">Read the rest of this page &raquo;</p>'); ?><!-- wysiwyg content -->									
	</div><!-- .page -->
	
	<?php wp_link_pages(array('before' => '<p><strong>Pages:</strong> ', 'after' => '</p>', 'next_or_number' => 'number')); ?>
</div><!-- .article -->



<?php endwhile; endif; ?>








<?php get_sidebar(); ?>