<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" <?php language_attributes(); ?>>
<head profile="http://gmpg.org/xfn/11">
    <meta http-equiv="Content-Type" content="<?php bloginfo('html_type'); ?>; charset=<?php bloginfo('charset'); ?>">
    
    <title><?php bloginfo('name'); ?> <?php if ( is_single() ) {  echo "#".get_post_meta($post->ID, 'micromixNumber', true);  } ?> <?php wp_title(); ?></title>
    
    <link rel="stylesheet" href="<?php bloginfo('stylesheet_url'); ?>" type="text/css" media="all">
    <link rel="alternate" href="<?php bloginfo('rss2_url'); ?>" type="application/rss+xml" title="<?php bloginfo('name'); ?> RSS Feed">
    <link rel="pingback" href="<?php bloginfo('pingback_url'); ?>">
    
    <link href="/wp-content/themes/micromix-theme-2/img/favicon.ico" rel="shortcut icon">
    <link href="/wp-content/themes/micromix-theme-2/img/favicon.gif" type="image/gif" rel="icon">
    
    <?php wp_head(); ?>
    <script type="text/javascript" charset="utf-8">
        var hasJS = function() {
            var htmlTag = document.getElementsByTagName('html')[0];
            htmlTag.className = (htmlTag.className + ' ' || '') + 'hasJS';
        }();
    </script>
 
</head>
<?php if (is_home()) { ?>
<body id="homepage">
<?php } else { ?>
<body>
<?php } ?>
                    
<div id="main-container">
    
    
    <div id="main-header">
        <h1><a href="<?php echo get_option('home'); ?>/" title="back to home page"><?php bloginfo('name'); ?></a></h1>
        <p class="description"><?php bloginfo('description'); ?></p>
    </div><!-- #main-header -->
    
    <hr>
    
    <div id="column-1">
        
<?php if (is_home()) { ?>
    <div id="home-top">
        <div id="twitter">
            <img height="15" src="http://widgets.twimg.com/j/1/twitter_logo_s.png" alt="">
            <?php //aktt_sidebar_tweets(); ?>
        </div>
        
        
        
        <style type="text/css">
            .top-img {
                float:left; 
                overflow:hidden; 
                width:80px; 
                height:50px;
                margin:0 5px 5px 0;
                position:relative;
            }
            .top-img img {
                width:100px;
                position:absolute;
                left:-10px;
            }
        </style>
        <div id="top-played">
            <h3>top played</h3>
            <ol>
<?php 
                $j = 1;
                $top = get_top_downloads(false); //true = only this month, false = all time                    
                foreach($top[0] as $row) { 
                    if($j <= 5){ 
                        $p = get_post($row);    ?>
                        <li>
                            <div class="top-img">
                                <img src="<?php echo get_post_meta($p->ID, 'imagePost', true); ?>" alt="<?php the_title(); ?>" />
                            </div>
                            <a href="<?php echo get_permalink($p); ?>" title="<?php echo $p->post_title; ?>">
                                <?php echo $p->post_title; ?>
                            </a><br />
                            <small>(<?php echo $top[1][$row]; ?> plays)</small>
                            <br style="clear:both" />
                        </li>
<?php
                    }
                    $j++;
                } 
            ?>
            </ol>
        </div>
    </div><!-- #home-top -->
<?php } //end if(is_home()) ?>




    
    