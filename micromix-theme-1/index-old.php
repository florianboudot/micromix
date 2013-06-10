<?php get_header(); ?>

	<?php if (have_posts()) : ?>

							<?php while (have_posts()) : the_post(); ?>

					

							<div class="article" id="post-<?php the_ID(); ?>">

								
								<h2>
									<strong><?php echo get_post_meta($post->ID, 'micromixNumber', true); ?></strong>
									<a href="<?php the_permalink() ?>" rel="bookmark" title="Leave a comment ?">&ldquo;<?php the_title(); ?>&rdquo;</a>
								</h2>
								
									
									<p class="date">
										<small><?php the_time('F jS, Y') ?></small>
									</p>
									<?php if (get_post_meta($post->ID, 'imagePost', true)) : ?>
										<div class="imagePost">
											<a href="<?php the_permalink() ?>" rel="bookmark" title="Leave a comment ?"><img src="<?php echo get_post_meta($post->ID, 'imagePost', true); ?>" alt="<?php the_title(); ?>" /></a>
										</div>
									<?php endif; ?>
							

									
									
									<?php include("sound.php"); ?>
                                    
									<!--<div class="intro">
										<?php the_content('<p class="serif">Read the rest of this entry &raquo;</p>'); ?>
									</div>--><!-- .intro -->
                                    
                                    <h3 class="title"><span>Playlist</span></h3>
                                    <ol>
                                    	<?php if (get_post_meta($post->ID, 'track1', true)) : ?>
                                    	<li><span><?php echo get_post_meta($post->ID, 'track1', true); ?></span></li>
                                        <?php endif; ?>
                                        
                                    	<?php if (get_post_meta($post->ID, 'track2', true)) : ?>
                                    	<li><span><?php echo get_post_meta($post->ID, 'track2', true); ?></span></li>
                                        <?php endif; ?>
                                        
                                    	<?php if (get_post_meta($post->ID, 'track3', true)) : ?>
                                    	<li><span><?php echo get_post_meta($post->ID, 'track3', true); ?></span></li>
                                        <?php endif; ?>
                                        
                                    	<?php if (get_post_meta($post->ID, 'track4', true)) : ?>
                                    	<li><span><?php echo get_post_meta($post->ID, 'track4', true); ?></span></li>
                                        <?php endif; ?>
                                        
                                    	<?php if (get_post_meta($post->ID, 'track5', true)) : ?>
                                    	<li><span><?php echo get_post_meta($post->ID, 'track5', true); ?></span></li>
                                        <?php endif; ?>
                                        
                                    	<?php if (get_post_meta($post->ID, 'track6', true)) : ?>
                                    	<li><span><?php echo get_post_meta($post->ID, 'track6', true); ?></span></li>
                                        <?php endif; ?>
                                        
                                    	<?php if (get_post_meta($post->ID, 'track7', true)) : ?>
                                    	<li><span><?php echo get_post_meta($post->ID, 'track7', true); ?></span></li>
                                        <?php endif; ?>
                                        
                                    	<?php if (get_post_meta($post->ID, 'track8', true)) : ?>
                                    	<li><span><?php echo get_post_meta($post->ID, 'track8', true); ?></span></li>
                                        <?php endif; ?>
                                        
                                    	<?php if (get_post_meta($post->ID, 'track9', true)) : ?>
                                    	<li><span><?php echo get_post_meta($post->ID, 'track9', true); ?></span></li>
                                        <?php endif; ?>
                                        
                                    	<?php if (get_post_meta($post->ID, 'track10', true)) : ?>
                                    	<li><span><?php echo get_post_meta($post->ID, 'track10', true); ?></span></li>
                                        <?php endif; ?>
                                        
                                    	<?php if (get_post_meta($post->ID, 'track11', true)) : ?>
                                    	<li><span><?php echo get_post_meta($post->ID, 'track11', true); ?></span></li>
                                        <?php endif; ?>
                                    </ol>
    <!-- get posts by author -->
		<p class="author">mixed by <?php the_author_posts_link(); ?></p>
									
									<!--<p class="postmetadata">
										<span>
											<strong>Categories : </strong> <?php // the_category(', ') ?>
										</span>
										<br />
										<span>
											<strong>Comments :</strong> <?php // comments_popup_link('No Comments &#187;', '1 Comment &#187;', '% Comments &#187;'); ?>
										</span>
									</p>-->
								
								
							</div><!-- .article -->
							
							<?php endwhile; ?>

							<div class="navigation">
								<div class="alignleft"><?php next_posts_link('&laquo; Older Entries') ?></div>
								<div class="alignright"><?php previous_posts_link('Newer Entries &raquo;') ?></div>
							</div>
						<?php else : ?>

					

							<h2 class="center">Not Found</h2>

							<p class="center">Sorry, but you are looking for something that isn't here.</p>

							<?php include (TEMPLATEPATH . "/searchform.php"); ?>

					

						<?php endif; ?>

					

						<?php include("support.php"); ?>

						

						

					</div><!-- #column2 -->

					

					<?php get_sidebar(); ?>

					

				</div><!-- #mainContent -->

			</div><!-- #mainFooter -->

			

		</div><!-- #curtain -->

	</div><!-- #bricks -->

</div><!-- #mainContainer -->



<?php get_footer(); ?>





