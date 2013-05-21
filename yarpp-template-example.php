<?php /*
Example template
Author: mitcho (Michael Yoshitaka Erlewine)
*/ 
?>


<?php if ($related_query->have_posts()):?>
<h3>Related mixes</h3>

<ol class="related-list">
	<?php while ($related_query->have_posts()) : $related_query->the_post(); ?>
	<li>
		<?php $postMetaImage = get_post_meta($post->ID, 'imagePost', true); 
			if ($postMetaImage) : ?>
				<a href="<?php the_permalink() ?>" class="img">
					<img src="<?php echo $postMetaImage; ?>" alt="<?php the_title(); ?>" />
				</a>
		<?php endif; ?>
		<a href="<?php the_permalink() ?>" rel="bookmark"><?php the_title(); ?></a>
		<br />
		<small><em>(the score = <?php the_score(); ?>)</em></small>
	</li>
	<?php endwhile; ?>
</ol>
<?php else: 
	$related_query->query("orderby=rand&order=asc&limit=1");
	$related_query->the_post(); ?>
	
    <h3>Related mixes</h3>
	<p>No related posts. <br>Here's a consolation prize :</p>
	<ol class="related-list">
		<li>
			<?php $postMetaImage = get_post_meta($post->ID, 'imagePost', true); 
				if ($postMetaImage) : ?>
					<a href="<?php the_permalink() ?>" class="img">
						<img src="<?php echo $postMetaImage; ?>" alt="<?php the_title(); ?>" />
					</a>
			<?php endif; ?>
			<a href="<?php the_permalink() ?>" rel="bookmark"><?php the_title(); ?></a>
		</li>
	</ol>
	
<?php endif; ?>
