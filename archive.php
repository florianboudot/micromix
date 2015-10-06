<?php
// HEADER
if(!isajax()){
    get_header(); // <div id="column2"> is in header
}
echo '<div class="view" data-context="index">';

if (have_posts()) {
    $post = $posts[0]; // Hack. Set $post so that the_date() works.
    $authordata = get_userdata($post->post_author);
    $author = $authordata->user_nicename;
    $nb_posts_found = $wp_query->found_posts; ?>

<!-- TEMPLATE ARCHIVE.PHP (search with tag) -->
    <div class="result">
        <h2 class="pagetitle">
            <span>
                <?php echo $nb_posts_found; ?>

                <?php
                if (is_category()) {
                    echo "Archive for the &#8216;".single_cat_title()."&#8217 Category";
                }
                elseif( is_tag() ) {
                    echo "Mixtapes with artist &#8216;";
                    echo single_tag_title();
                    echo "&#8217;";
                }
                elseif (is_day()) {
                    echo "Archive for" .the_time('F jS, Y');
                }
                elseif (is_month()) {
                    echo "Archive for". the_time('F, Y');
                }
                elseif (is_year()) {
                    echo "Archive for" . the_time('Y');
                }
                elseif (is_author()) {
                    echo "mixes by " . $author;
                }
                elseif (isset($_GET['paged']) && !empty($_GET['paged'])) {
                    echo "Blog Archives";
                } ?>
            </span>
        </h2>

        <?php
        while (have_posts()) {
            the_post();

            // THE POST : title, image, playlist, player, etc.
            include("the_post.php");
        }

        // NAVIGATION
//        if(!isajax()){
            include("navigation.php");
//        }
    echo "</div><!-- .result -->";
}
else { // NO POSTS FOUND
    echo '<h2 class="center">Not Found</h2>';
    include (TEMPLATEPATH . '/searchform.php');
}
echo '</div>';


// SIDEBAR
if(!isajax()){
    get_sidebar();
}
?>



