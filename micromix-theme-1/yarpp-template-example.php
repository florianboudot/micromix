<?php /*
Example template
Author: mitcho (Michael Yoshitaka Erlewine)
*/ 
?>


<?php if ($related_query->have_posts()):?>
<div class="related-list">
    <h3><span>Related</span></h3>
    
    <ol>
    	<?php while ($related_query->have_posts()) : $related_query->the_post(); ?>
    	<li>
    		<?php $postMetaImage = get_post_meta($post->ID, 'imagePost', true); 
    			if ($postMetaImage) : ?>
    				<a href="<?php the_permalink() ?>" class="img">
    					<img src="<?php echo $postMetaImage; ?>" alt="<?php the_title(); ?>" />
    				</a>
    		<?php endif; ?>
    		<a class="title" href="<?php the_permalink() ?>" rel="bookmark"><?php the_title(); ?></a>
    		<br />
    		<small><em>(match score = <?php the_score(); ?>)</em></small>
    	</li>
    	<?php endwhile; ?>
    </ol>
</div>
    
<?php else: 

$related_query->query("orderby=rand&order=asc&limit=1");
$related_query->the_post(); ?>
	
<div class="related-list">	
    <h3><span>Related</span></h3>
    
	<p>No related posts. <br>Here's a consolation prize :</p>
	<ol class="related-list">
		<li>
			<?php $postMetaImage = get_post_meta($post->ID, 'imagePost', true); 
				if ($postMetaImage) : ?>
					<a href="<?php the_permalink() ?>" class="img">
						<img src="<?php echo $postMetaImage; ?>" alt="<?php the_title(); ?>" />
					</a>
			<?php endif; ?>
			<a class="title" href="<?php the_permalink() ?>" rel="bookmark"><?php the_title(); ?></a>
		</li>
	</ol>
</div>
<?php endif; ?>

