<?php
/*
Template Name: Archives
*/
?>

<?php get_header(); ?>

					
						<?php include (TEMPLATEPATH . '/searchform.php'); ?>
						
						<h2 class="pagetitle"><span>Archives by Month:</span></h2>
							<ul>
								<?php wp_get_archives('type=monthly'); ?>
							</ul>
						
						<h2 class="pagetitle"><span>Archives by Subject:</span></h2>
							<ul>
								 <?php wp_list_categories(); ?>
							</ul>
						

					
					
					<?php get_sidebar(); ?>
