<?php get_header(); ?>

    <?php if (have_posts()) : ?>

        <?php while (have_posts()) : the_post(); ?>

        <div class="article" id="post-<?php the_ID(); ?>">
            <?php include("the_post.php"); //title, image, playlist, player, etc. ?>
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





