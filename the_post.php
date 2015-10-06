<?php
$micromix_number = get_post_meta($post->ID, 'micromixNumber', true);
$the_permalink = the_permalink_return();
$image_format = 'large';
$image_src = image_attachment_src($post->ID, $image_format); // thumbnail (150), medium (220), large (500)
?>

<!-- ARTICLE -->
<div class="article" id="post-<?php the_ID(); ?>">


    <!-- IMAGE -->
    <div class="post-image">
        <!-- IMAGE COVER : shows a photo in a mask 494x324 -->
        <div class="cover" style="background-image:url(<?= $image_src ?>);"></div>

        <!-- PLASTIC CASE -->
        <div class="case">
            <?php include("sound.php"); ?>
        </div>

        <!-- TITLE -->
        <h2 class="post-title">
            <strong class="post-micromix-number">
                <?= $micromix_number ?>
            </strong>
            <?php if(!is_single()): ?>
                <a class="history the-title" href="<?= $the_permalink ?>" rel="bookmark">
                    &ldquo;<?php the_title(); ?>&rdquo;
                </a>
            <?php else: ?>
                <span class="the-title">&ldquo;<?php the_title(); ?>&rdquo;</span>
            <?php endif; ?>
        </h2>

        <!-- DATE -->
        <p class="post-date"><?php the_time('F jS, Y') ?></p>

        <!-- AUTHOR -->
        <p class="author">
            <span class="parenthistory">mixed by <?php the_author_posts_link(); ?></span>
        </p>

    </div>


    <!-- POST CONTENT -->

    <div class="post-content parenthistory">
        <?php the_content('<p>Read the rest of this entry &raquo;</p>'); ?>
        <p class="post-permalink">> <a class="history" href="<?= $the_permalink ?>" rel="bookmark">read this post</a></p>
    </div>



    <!-- TAGS AND CATEGORIES -->
    <?php if(is_single()) { ?>
        <p class="postmetadata parenthistory">
            <?php the_tags('<span><strong>Artists : </strong> ', ', ', '.<br /></span>'); ?>
            <span><strong>Categories : </strong> <?php the_category(', ') ?></span>
        </p>
    <?php } ?>

    <!-- TEST -->
    <div class="cube">
        <div class="flippety">
            <h1>Flippity</h1>
        </div>
        <div class="flop">
            <h2>Flop</h2>
        </div>
        <div class="flap">
            <h2>Flap</h2>
        </div>
    </div>
</div>

