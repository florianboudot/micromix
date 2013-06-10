<!-- post title -->
<h2 class="post-title">
	<strong><?php echo get_post_meta($post->ID, 'micromixNumber', true); ?></strong>
	<?php if(!is_single()): ?>
		<a href="<?php the_permalink() ?>" rel="bookmark">&ldquo;<?php the_title(); ?>&rdquo;</a>
	<?php else: ?>
		<span>&ldquo;<?php the_title(); ?>&rdquo;</span>
	<?php endif; ?>
</h2>

<!-- post date -->
<p class="post-date"><small><?php the_time('F jS, Y') ?></small></p>

<!-- post image -->
<?php $postMetaImage = get_post_meta($post->ID, 'imagePost', true);    
if ($postMetaImage) { ?>
	<div class="post-image">
		<a href="<?php the_permalink() ?>" rel="bookmark">
			<img src="<?php echo $postMetaImage; ?>" alt="<?php the_title(); ?>" />
		</a>
	</div>
<?php } ?>
	
<!-- post sound -->
<?php include("sound.php"); ?>

<!-- post content -->
<div class="post-content">
	<?php the_content('<p>Read the rest of this entry &raquo;</p>'); ?>
</div><!-- .wysiwyg -->

<!-- author -->
<p class="author">
	<span>mixed by <?php the_author_posts_link(); ?></span>
</p>

<!-- artists, category, ... -->
<?php //include("postmetadata.php"); ?>

<?php if(!is_single()): ?>
<div class="post-comments">
	<p class="write"><?php comments_popup_link('Write a comment', 'Write a comment', 'Write a comment'); ?></p>
	<p class="read"><?php comments_popup_link('No comments yet', '1 Comment', '% Comments'); ?></p>
</div>
<?php endif; ?>