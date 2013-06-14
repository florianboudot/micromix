<div id="column1">
    <div id="artists">
        <h3>Top artists played</h3>

        <?php wp_tag_cloud('smallest=1&largest=1&orderby=count&order=DESC&number=20&unit=em&format=list'); ?>

        <!--<ul>
            <li>
                <div><?php //wp_tag_cloud('smallest=.8&largest=1.8&orderby=count&order=DESC&number=30&unit=em'); ?> <span>...</span></div>
            </li>
        </ul>-->
    </div><!-- #artists -->


    <div id="authors">
        <h3>Mixed by :</h3>
        <ul>
            <?php wp_list_authors('show_fullname=0&optioncount=1&orderby=post_count&order=DESC&format=list'); ?>
        </ul>
    </div><!-- #authors -->


    <!--<div id="randoms">
        <h3>3 random mixes</h3>
        <ul>
        <?php
        //$rand_posts = get_posts('orderby=rand&showposts=3');
        //foreach( $rand_posts as $post ) :
            //if (get_post_meta($post->ID, 'imagePost', true)) : ?>

            <li>
                <strong><?php //echo get_post_meta($post->ID, 'micromixNumber', true); ?></strong>
                <a href="<?php the_permalink() ?>" title="<?php the_title_attribute(); ?>"><img src="<?php //echo get_post_meta($post->ID, "imagePost", true); ?>" alt="<?php the_title_attribute(); ?>" /></a></li>
            <?php //endif; ?>
        <?php //endforeach; ?>
        </ul>
    </div> randoms -->


    <div id="top-played">
        <?php
        $onlyThisMonth = true;//true = only this month, false = global stats
        $top = get_top_downloads($onlyThisMonth);
        $j = 1;
        $stringMonth = '';

        if($onlyThisMonth && empty($top[0])) { // si y'a pas encore de stats ce mois-ci
            $top = get_top_downloads(false); //alors on affiche les stats globales
            $onlyThisMonth = false;
        } else {
            $stringMonth = '(this month)';
        }

        ?>


        <h3>Top 5 <?= $stringMonth ?></h3>
        <ol>
            <?php
            foreach($top[0] as $row) {
                if($j <= 5){
                    $p = get_post($row);
                    $image_post_thumb = image_attachment_src($p->ID, 'thumbnail'); // thumbnail (150), medium (220), large (500)
                    ?>
                    <li>
                        <strong><?= get_post_meta($p->ID, 'micromixNumber', true); ?></strong>
                        <a href="<?= get_permalink($p); ?>" title="Micromix #<?= get_post_meta($p->ID, 'micromixNumber', true); ?> - <?= $p->post_title;?> (<?= $top[1][$row]; ?> plays)"><img src="<?= $image_post_thumb; ?>" alt="<?= $p->post_title; ?>" /></a>
                    </li>
                <?php
                }
                $j++;
            }
            ?>
        </ol>


        <!-- old top 5 (before monthly stats)
            <ol>
                <?php
                    /*$top = get_top_downloads(5);
                    foreach( $top as $t ) {
                        $p = get_post($t->post_id); */?>
                    <li>
                        <strong><?php //echo get_post_meta($p->ID, 'micromixNumber', true); ?></strong>
                        <a href="<?php //echo get_permalink($p); ?>" title="Micromix #<?php //echo get_post_meta($p->ID, 'micromixNumber', true); ?> - <?php //echo $p->post_title;?> (<?php //echo $t->download_count; ?> plays)"><img src="<?php //echo get_post_meta($p->ID, "imagePost", true); ?>" alt="<?php //echo $p->post_title; ?>" /></a>
                    </li>
                <?php //} ?>
            </ol>
        -->
    </div>


</div><!-- #column1 -->