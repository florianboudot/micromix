<div id="column3">
    <div id="sidebar" class="col-block">
        <ul>
            <?php 	/* Widgetized sidebar, if you have the plugin installed. */
            if ( !function_exists('dynamic_sidebar') || !dynamic_sidebar() ) : ?>
                <li>
                    <?php include (TEMPLATEPATH . '/searchform.php'); //old regular search field ?>
                </li>

                <?php $is_404 = is_404();
                $is_category = is_category();
                $is_day = is_day();
                $is_month = is_month();
                $is_year = is_year();
                $is_search = is_search();
                $is_paged = is_paged();
                if ( $is_404 || $is_category || $is_day || $is_month ||
                    $is_year || $is_search || $is_paged
                ) {
                    ?> <li id="currentAction"><p><span>

            <?php /* If this is a 404 page */
            $bloginfo = bloginfo('url');
            $bloginfo1 = bloginfo('name');
            if ($is_404) { ?>
                <?php /* If this is a category archive */ } elseif ($is_category) { ?>
                You are currently browsing the archives for the <?php single_cat_title(''); ?> category.

                <?php /* If this is a yearly archive */ } elseif ($is_day) { ?>
                You are currently browsing the
                <a href="<?php $bloginfo; ?>/"><?php echo $bloginfo1; ?></a> blog archives
                for the day <?php the_time('l, F jS, Y'); ?>.

                <?php /* If this is a monthly archive */ } elseif ($is_month) { ?>
                You are currently browsing the
                <a href="<?php $bloginfo; ?>/"><?php echo $bloginfo1; ?></a> blog archives
                for <?php the_time('F, Y'); ?>.

                <?php /* If this is a yearly archive */ } elseif ($is_year) { ?>
                You are currently browsing the
                <a href="<?php $bloginfo; ?>/"><?php echo $bloginfo1; ?></a> blog archives
                for the year <?php the_time('Y'); ?>.

                <?php /* If this is a monthly archive */ } elseif ($is_search) { ?>
                You have searched the
                <a href="<?php echo $bloginfo; ?>/"><?php echo $bloginfo1; ?></a> blog archives
                for <strong>'<?php the_search_query(); ?>'</strong>.
                If you are unable to find anything in these search results, you can try one of these links.

                <?php /* If this is a monthly archive */ } elseif (isset($_GET['paged']) && !empty($_GET['paged'])) { ?>
                You are currently browsing the
                <a href="<?php echo $bloginfo; ?>/"><?php echo $bloginfo1; ?></a> blog archives.
            <?php } ?>

            </span></p></li> <?php }?>



                <li>
                    <div id="posts-year-month" class="col-block">
                        <h2 class="col-block-title">Archives</h2>
                        <?php /*foreach(posts_by_year() as $year => $posts) : ?>
                            <h2><?php echo $year; ?></h2>

                            <ul>
                                <?php foreach($posts as $post) : setup_postdata($post); ?>
                                    <li> <?php print_r($post); ?>
                                        <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                                    </li>
                                <?php endforeach; ?>
                            </ul>
                        <?php endforeach;*/ ?>

                        <?php
                        // need plugin W3 total cache
                        $result = wp_cache_get( 'allPostsByYear' );
                        if ( false === $result ) {
                            $result = allPostsByYear();
                            wp_cache_set( 'allPostsByYear', $result );
                        }
                        echo $result;
                        // Do something with $result;
                        ?>
                    </div>
                </li>
                <li>
                    <!-- FORM NEWSLETTER (le récupérer dans l'admin car généré. Oui, c'est sale) -->
                    <div class="newsletter newsletter-subscription col-block">
                        <h3 class="col-block-title">Newsletter</h3>
                        <p><span class="text-bg">Get notified when a new episode goes online :</span></p>
                        <form method="post" action="/wp-content/plugins/newsletter/do/subscribe.php" id="newletter_form">
                            <p>
                                <input class="newsletter-firstname JS_hide_default_value" data-default-value="name" type="text" name="nn" size="30" value="name" />
                            </p>

                            <p>
                                <input class="newsletter-email JS_hide_default_value" data-default-value="email" type="text" name="ne" size="30" value="email" />
                            </p>
                            <p class="newsletter-td-submit">
                                <input class="newsletter-submit" type="submit" value="Subscribe"/>
                            </p>
                        </form>
                    </div>
                </li>
                <?php wp_list_pages('title_li=<h3 class="col-block-title">Micromix</h3>' ); ?>
            <?php endif; ?>
        </ul>
        <div class="social-container col-block">
            <p class="bt-social" id="btRss">
                <a href="<?php bloginfo('rss2_url'); ?>" title="Entries (RSS)">Entries (RSS)</a>
            </p>

            <p class="bt-social" id="btTwitter">
                <a href="http://twitter.com/micromix" title="follow micromix on twitter">
                    <img src="<?= theme_path ?>/img/ico-twitter.png" alt="follow micromix on twitter">
                </a>
            </p>

            <p class="bt-social" id="btFB">
                <a href="http://www.facebook.com/micromix" title="micromix on facebook">
                    <img src="<?= theme_path ?>/img/ico-facebook.png" alt="become a fan of micromix on facebook">
                </a>
            </p>
        </div>
    </div><!-- #sidebar -->
</div><!-- #column3 -->