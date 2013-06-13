<!DOCTYPE html>
<html lang="en" dir="ltr">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">

    <title><?php bloginfo('name'); ?> <?php if ( is_single() ) {  echo "#".get_post_meta($post->ID, 'micromixNumber', true);  } ?> <?php wp_title(); ?></title>

    <link rel="stylesheet" href="<?= theme_path ?>/css/style.css" type="text/css" media="all" />
    <link rel="stylesheet" href="<?= theme_path ?>/css/player.css" type="text/css" media="all" />
    <link rel="stylesheet" href="<?= theme_path ?>/css/ghettoblaster.css" type="text/css" media="all" />
    <script type="text/javascript" src="<?= theme_path ?>/js/libs/jquery-2.0.2.js"></script>
    <link rel="alternate" type="application/rss+xml" title="<?php bloginfo('name'); ?> RSS Feed" href="<?php bloginfo('rss2_url'); ?>" />
    <link rel="pingback" href="<?php bloginfo('pingback_url'); ?>" />

    <link rel="icon" href="/favicon.ico" type="image/x-icon" />

    <?php wp_head(); ?>
</head>
<body>





<div id="mainContainer">
    <div id="bricks">
        <div id="curtain">
            <div id="mainFooter">
                <div id="mainContent">

                    <div id="mainHeader">
                        <h1><a href="<?php echo get_option('home'); ?>/" title="back to home page"><?php bloginfo('name'); ?></a></h1>
                        <p class="description"><?php bloginfo('description'); ?></p>
                    </div><!-- #mainHeader -->
                    
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
                         
                            
                            <h3>Top 5 <?php echo $stringMonth ?></h3>
                            <ol>
                                <?php
                                    foreach($top[0] as $row) { 
                                        if($j <= 5){ 
                                            $p = get_post($row);    ?>
                                            <li>
                                                <strong><?php echo get_post_meta($p->ID, 'micromixNumber', true); ?></strong>
                                                <a href="<?php echo get_permalink($p); ?>" title="Micromix #<?php echo get_post_meta($p->ID, 'micromixNumber', true); ?> - <?php echo $p->post_title;?> (<?php echo $top[1][$row]; ?> plays)"><img src="<?php echo get_post_meta($p->ID, "imagePost", true); ?>" alt="<?php echo $p->post_title; ?>" /></a>
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
                    
                    <div id="column2">






