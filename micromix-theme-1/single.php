<?php
// HEADER
if(!isajax()){
    get_header(); // <div id="column2"> is in header
}

// POSTS LOOP
if (have_posts()) {
    while (have_posts()) {
        the_post();

        // to get current id and highlight item in the menu (function allPostsByYear)
        $_SESSION["article_id"] = get_the_ID();

        // NAVIGATION
        if(!isajax()){
            include("navigation.php");
        }

        // THE POST : title, image, playlist, player, etc.
        include("the_post.php");

        // RELATED POSTS
        if(function_exists('related_posts')) {
            related_posts();
        }

        // COMMENTS
        comments_template();
    }
}
else { // NO POSTS FOUND
    echo "<p>Sorry, no posts matched your criteria.</p>";
} // end if

// SIDEBAR
if(!isajax()){
    get_sidebar();
}
?>