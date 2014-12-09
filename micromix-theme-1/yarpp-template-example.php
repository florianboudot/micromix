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
    		<?php
                $image_src = image_attachment_src($post->ID, 'medium'); // thumbnail (150), medium (220), large (500)

    			if ($image_src) : ?>
    				<a href="<?php the_permalink() ?>" class="img history">
    					<img src="<?php echo $image_src; ?>" alt="<?php the_title(); ?>" />
    				</a>
    		<?php endif; ?>
    		<a class="title history" href="<?php the_permalink() ?>" rel="bookmark"><?php the_title(); ?></a>
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
			<?php
            $image_src = image_attachment_src($post->ID, 'medium'); // thumbnail (150), medium (220), large (500)

            if ($image_src) : ?>
                <a href="<?php the_permalink() ?>" class="img history">
                    <img src="<?php echo $image_src; ?>" alt="<?php the_title(); ?>" />
                </a>
        <?php endif; ?>
			<a class="title history" href="<?php the_permalink() ?>" rel="bookmark"><?php the_title(); ?></a>
		</li>
	</ol>
</div>
<?php endif; ?>

