<!-- TITLE -->
<h2>
	<strong><?php echo get_post_meta($post->ID, 'micromixNumber', true); ?></strong>
	<?php if(!is_single()): ?>
		<a href="<?php the_permalink() ?>" rel="bookmark" title="Leave a comment ?">&ldquo;<?php the_title(); ?>&rdquo;</a>
	<?php else: ?>
		<span>&ldquo;<?php the_title(); ?>&rdquo;</span>
	<?php endif; ?>
</h2>

<!-- DATE -->
<p class="date"><small><?php the_time('F jS, Y') ?></small></p>

<!-- IMAGE -->
<?php
$image_src = image_attachment_src($post->ID, 'large'); // thumbnail (150), medium (220), large (500)
if ($image_src) : ?>
	<div class="imagePost">
		<?php if(!is_single()): ?>
			<a href="<?= the_permalink() ?>" rel="bookmark" title="Leave a comment ?">
				<img src="<?= $image_src; ?>" alt="<?= the_title(); ?>">
			</a>
		<?php else: ?>
			<img src="<?= $image_src; ?>" alt="<?= the_title(); ?>">
		<?php endif; ?>
	</div>
<?php endif; ?>
	
<!-- SOUND -->
<?php include("sound.php"); ?>


<!-- TRACKLIST (WYSIWYG) -->
<div class="intro">
	<?php the_content('<p>Read the rest of this entry &raquo;</p>'); ?>
</div>

<!-- AUTHOR -->
<p class="author">
	<span>mixed by <?php the_author_posts_link(); ?></span>
</p>


<!-- TAGS AND CATEGORIES -->
<?php 
	if(is_single()) {
		include("postmetadata.php"); 
	}
?>

