<?php

// HEADER
if(!isajax()){
    get_header(); // <div id="column2"> is in header
}
echo '<div class="view" data-context="index">';


// POSTS LOOP
if (have_posts()) {
    $resultpost = wp_cache_get( 'single_post_' . get_the_ID());
    if ( false === $resultpost ) {

        ob_start();

        while (have_posts()) {
            the_post();

            // to get current id and highlight item in the menu (function allPostsByYear)
            $_SESSION["article_id"] = get_the_ID();

            // NAVIGATION
//        if(!isajax()){
            include("navigation.php");
//        }

            // THE POST : title, image, playlist, player, etc.
            include("the_post.php");

            // RELATED POSTS
            if(function_exists('related_posts')) {
                related_posts();
            }

            // COMMENTS
            comments_template();
        }

        $resultpost = ob_get_contents();
        ob_end_clean();


        wp_cache_set( 'single_post_' . get_the_ID(), $resultpost );
    }
    echo $resultpost;

}
else { // NO POSTS FOUND
    echo "<p>Sorry, no posts matched your criteria.</p>";
} // end if
echo '</div>';

// SIDEBAR
if(!isajax()){
    get_sidebar();
}
?>
