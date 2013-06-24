<!-- THE_POST.PHP -->
<?php

$micromix_number = get_post_meta($post->ID, 'micromixNumber', true);
$the_permalink = the_permalink_return();

if(is_home() || is_single()) { ?>
    <!-- TITLE -->
    <h2 class="post-title">
        <strong class="post-micromix-number"><?= $micromix_number ?></strong>
        <?php if(!is_single()): ?>
            <a class="the-title" href="<?= $the_permalink ?>" rel="bookmark" title="Leave a comment ?">&ldquo;<?php the_title(); ?>&rdquo;</a>
        <?php else: ?>
            <span class="the-title">&ldquo;<?php the_title(); ?>&rdquo;</span>
        <?php endif; ?>
    </h2>

    <!-- DATE -->
    <p class="post-date"><small><?php the_time('F jS, Y') ?></small></p>

    <!-- IMAGE -->
    <?php
    $image_src = image_attachment_src($post->ID, 'large'); // thumbnail (150), medium (220), large (500)
    if ($image_src) : ?>
        <div class="post-image">
            <?php if(!is_single()): ?>
                <a href="<?= $the_permalink ?>" rel="bookmark" title="Leave a comment ?">
                    <img src="<?= $image_src ?>" alt="<?= the_title(); ?>">
                </a>
            <?php else: ?>
                <img src="<?= $image_src ?>" alt="<?= the_title(); ?>">
            <?php endif; ?>
        </div>
    <?php endif; ?>

    <!-- SOUND -->
    <?php include("sound.php"); ?>


    <!-- TRACKLIST (WYSIWYG) -->
    <div class="intro">
        <?php the_content('<p>Read the rest of this entry &raquo;</p>'); ?>
    </div>

    <!-- AUTHOR -->
    <p class="author">
        <span>mixed by <?php the_author_posts_link(); ?></span>
    </p>


    <!-- TAGS AND CATEGORIES -->
    <?php
        if(is_single()) {
            include("postmetadata.php");
        }
    ?>
<?php } else { //if is_search() || is_archive() ?>
    <!-- THE_POST_RESULT (when you filter by author or artist or searched a keyword) -->

    <!-- POST TITLE -->
    <h2 class="post-title">
        <strong class="post-micromix-number"><?= $micromix_number; ?></strong>
        <a class="the-title" href="<?= $the_permalink ?>">&ldquo;<?php the_title(); ?>&rdquo;</a>
    </h2>


    <!-- POST IMAGE -->
    <?php
    $image_src = image_attachment_src($post->ID, 'medium'); // thumbnail (150), medium (220), large (500)
    ?>
    <div class="post-image">
        <a href="<?= $the_permalink ?>" class="link-thumb">
            <img src="<?= $image_src; ?>" alt="<?php the_title(); ?>" />
        </a>

        <!-- SOUND -->
        <?php include('sound.php'); ?>
    </div>


    <!-- POST CONTENT -->
    <div class="post-content">
        <?php the_content('<p>Read the rest of this entry &raquo;</p>'); ?>
        <p class="post-permalink">> <a href="<?php $the_permalink ?>" rel="bookmark">read this post</a></p>
    </div>
<?php } //end if ?>
