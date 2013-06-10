<h2>
	<strong><?php echo get_post_meta($post->ID, 'micromixNumber', true); ?></strong>
	<?php if(!is_single()): ?>
		<a href="<?php the_permalink() ?>" rel="bookmark" title="Leave a comment ?">&ldquo;<?php the_title(); ?>&rdquo;</a>
	<?php else: ?>
		<span>&ldquo;<?php the_title(); ?>&rdquo;</span>
	<?php endif; ?>
</h2>



<p class="date"><small><?php the_time('F jS, Y') ?></small></p>



<?php //if (get_post_meta($post->ID, 'imageFlash', true) && is_single()) : ?>
<!--<div id="myContent"></div>

<script type="text/javascript">
	//swfobject.embedSWF("<?php //echo get_post_meta($post->ID, 'imageFlash', true); ?>", "myContent", "480", "313", "9.0.0");
</script>
-->
		
		
<?php if (get_post_meta($post->ID, 'imagePost', true)) : ?>
	<div class="imagePost">
		<?php if(!is_single()): ?>
			<a href="<?php the_permalink() ?>" rel="bookmark" title="Leave a comment ?">
				<img src="<?php echo get_post_meta($post->ID, 'imagePost', true); ?>" alt="<?php the_title(); ?>" />
			</a>
		<?php else: ?>
			<img src="<?php echo get_post_meta($post->ID, 'imagePost', true); ?>" alt="<?php the_title(); ?>" />
		<?php endif; ?>
	</div>
<?php endif; ?>
	
	

<?php include("sound.php"); ?>



<div class="intro">
	<?php the_content('<p>Read the rest of this entry &raquo;</p>'); ?>
	<!-- wysiwyg content -->
</div><!-- .intro -->



<!-- tracklist with custom fields -->
<!-- <ol>
    <?php
    /*for($i = 1; $i < 30; $i++):
        $postMetaTrack = get_post_meta($post->ID, 'track'.$i, true);
        if($postMetaTrack):
            ?>
            <li><span><?php echo $postMetaTrack; ?></span></li>
            <?php
        endif;
	endfor;*/
	?>
</ol>-->



<p class="author">
	<span>mixed by <?php the_author_posts_link(); ?></span>
</p>

<?php 
	if(is_single()) {
		include("postmetadata.php"); 
	}
?>

