<div id="column1" class="column">
    <div id="artists" class="col-block">
        <h3 class="col-block-title">Top artists played</h3>
        <?php
            $array_tags = wp_tag_cloud(array(
                'smallest'  => 1, // font-size
                'largest'   => 1,
                'unit'      => 'em',
                'orderby'   => 'count',
                'order'     => 'DESC',
                'number'    => 20,
                'format'    => 'array' // array, list
            ));
            echo '<ol class="list-artists">';
            foreach($array_tags as $tag_link){
                echo '<li>'.str_ireplace('class=\'','class=\'history ',$tag_link).'</li>';
                echo "\n";
            }
            echo '</ol>';
        ?>
    </div><!-- #artists -->


    <div id="authors" class="col-block">
        <h3 class="col-block-title">Mixed by :</h3>
        <ol class="list-authors parenthistory">
            <?php wp_list_authors('show_fullname=0&optioncount=1&orderby=post_count&order=DESC&format=list'); ?>
        </ol>
    </div><!-- #authors -->


    <div id="top-played" class="col-block">
        <?php
        $onlyThisMonth = true;//true = only this month, false = global stats
        $top = get_top_downloads($onlyThisMonth);
        $j = 1;
        $stringMonth = '';

        if($onlyThisMonth && empty($top[0])) { // si y'a pas encore de stats ce mois-ci
            $top = get_top_downloads(false); //alors on affiche les stats globales
            $onlyThisMonth = false;
        }
        else {
            $stringMonth = '(this month)';
        }
        ?>


        <h3 class="col-block-title">Top 5 <?= $stringMonth ?></h3>
        <ol class="list-top-5">
            <?php
            foreach($top[0] as $row) {
                if($j <= 5){
                    $post = get_post($row);
                    $image_post_thumb = image_attachment_src($post->ID, 'thumbnail'); // thumbnail (150), medium (220), large (500)
                    $micromixNumber = get_post_meta($post->ID, 'micromixNumber', true);
                    $post_title = $post->post_title;
                    $nb_plays = $top[1][$row];
                    ?>
                    <li>
                        <strong><?= $micromixNumber; ?></strong>
                        <a class="history" href="<?= get_permalink($post); ?>" title="Micromix #<?= $micromixNumber; ?> - <?= $post_title;?> (<?= $nb_plays; ?> plays)">
                            <img src="<?= $image_post_thumb; ?>" alt="<?= $post_title; ?>" />
                        </a>
                    </li>
                <?php
                }
                $j++;
            }
            ?>
        </ol>
    </div>
</div><!-- #column1 -->