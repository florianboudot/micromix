<!-- TEMPLATE ARCHIVE.PHP (search with tag) -->
<?php
// HEADER
if(!isajax()){
    get_header(); // <div id="column2"> is in header
}

if (have_posts()) {
    $authordata = get_userdata($post->post_author);
    $post = $posts[0]; // Hack. Set $post so that the_date() works. ?>


    <div class="result">
        <h2 class="pagetitle">
            <span>
            <?php echo $wp_query->found_posts; // display number of results ?>

            <?php /* If this is a category archive */ if (is_category()) { ?>
            Archive for the &#8216;<?php single_cat_title(); ?>&#8217; Category
            <?php /* If this is a tag archive */ } elseif( is_tag() ) { ?>
            Mixtapes with artist &#8216;<?php single_tag_title(); ?>&#8217;
            <?php /* If this is a daily archive */ } elseif (is_day()) { ?>
            Archive for
            <?php the_time('F jS, Y'); ?>
            <?php /* If this is a monthly archive */ } elseif (is_month()) { ?>
            Archive for
            <?php the_time('F, Y'); ?>
            <?php /* If this is a yearly archive */ } elseif (is_year()) { ?>
            Archive for
            <?php the_time('Y'); ?>
            <?php /* If this is an author archive */ } elseif (is_author()) { ?>
            mixes by <?php echo $authordata->user_nicename; ?>
            <?php /* If this is a paged archive */ } elseif (isset($_GET['paged']) && !empty($_GET['paged'])) { ?>
                Blog Archives
            <?php } ?>
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
        }
    echo "</div><!-- .result -->";
}
else { // NO POSTS FOUND
    echo '<h2 class="center">Not Found</h2>';
    include (TEMPLATEPATH . '/searchform.php');
}


// FOOTER
if(!isajax()){
    include("support.php");
    echo "</div><!-- #column2 -->";
    get_sidebar();
}


?>



