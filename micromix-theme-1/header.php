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
                    
                    <?php include('column-1.php'); ?>
                    
                    <div id="column2">