<?php //$timestart = microtime(); ?>

<!-- TEMPLATE INDEX.PHP (home) -->
<?php
// HEADER
if(!isajax()){
    get_header(); // <div id="column2"> is in header
}

echo '<div class="view" data-context="index">';
// POSTS LOOP
if (have_posts()) {
    while (have_posts()) {
        the_post();
        // THE POST : title, image, playlist, player, etc.
        include("the_post.php");
    }

    // NAVIGATION
//    if(!isajax()){
        include("navigation.php");
//    }
}
else { // NO POSTS FOUND ?>
    <h2 class="center">Not Found</h2>
    <p class="center">Sorry, but you are looking for something that isn't here.</p>
    <?php include (TEMPLATEPATH . "/searchform.php");
}
echo '</div>';

// SIDEBAR
if(!isajax()){
    get_sidebar();
}

?>
<?php //$timeend = microtime(); echo 'toto ' .  ($timeend - $timestart) ?>
