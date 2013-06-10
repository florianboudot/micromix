<!-- post title -->
<h2 class="post-title">
	<strong><?php echo get_post_meta($post->ID, 'micromixNumber', true); ?></strong>
	<?php if(!is_single()): ?>
		<a href="<?php the_permalink() ?>" rel="bookmark">&ldquo;<?php the_title(); ?>&rdquo;</a>
	<?php else: ?>
		<span>&ldquo;<?php the_title(); ?>&rdquo;</span>
	<?php endif; ?>
</h2>


		
<!-- post image -->
<?php 
    $postMetaImage = get_post_meta($post->ID, 'imagePost', true);    
    if ($postMetaImage) : ?>
	<div class="post-image">
		<a href="<?php the_permalink() ?>" rel="bookmark"><img src="<?php echo $postMetaImage; ?>" alt="<?php the_title(); ?>" /></a>
	<?php include('sound.php'); ?>
	</div>
<?php endif; ?>

<!-- post content -->
<div class="post-content">
	<?php the_content('<p>Read the rest of this entry &raquo;</p>'); ?>

	<p class="post-permalink">> <a href="<?php the_permalink() ?>" rel="bookmark">read this post</a></p>
	
</div><!-- .post-content -->



