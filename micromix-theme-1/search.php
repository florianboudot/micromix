<!-- TEMPLATE SEARCH.PHP -->
<?php

// HEADER
if(!isajax()){
    get_header(); // <div id="column2"> is in header
}

if (have_posts()) { ?>
	<div class="result">
		<h2 class="pagetitle">
            <span>
                <?= $wp_query->found_posts; ?> Search results for <?php the_search_query(); ?>
            </span>
        </h2>

        <?php
        while (have_posts()) {
            the_post();

            // THE POST : title, image, playlist, player, etc.
            include("the_post.php");
		}

        // NAVIGATION
        if(!isajax()){
            include("navigation.php");
        } ?>
	</div><!-- .result -->
<?php

} else { // NO POSTS FOUND ?>
	<h2 class="pagetitle"><span>No posts found. Try a different search?</span></h2>

	<?php include (TEMPLATEPATH . '/searchform.php');
}

// FOOTER
if(!isajax()){
    include("support.php");
    echo "</div><!-- #column2 -->";
    get_sidebar();
}
?>