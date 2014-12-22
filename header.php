<!DOCTYPE html>
<html lang="en" dir="ltr">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title><?php bloginfo('name'); ?> <?php if ( is_single() ) {  echo "#".get_post_meta($post->ID, 'micromixNumber', true);  } ?> <?php wp_title(); ?></title>

    <?php if(is_local()){ ?>
        <link rel="stylesheet" href="<?= theme_path ?>/css/all.dev.css">
    <?php } else { ?>
        <link rel="stylesheet" href="<?= theme_path ?>/css/micromix.min.css?<?php echo getmicromixversion(); ?>">
    <?php } ?>


    <link rel="alternate" type="application/rss+xml" title="<?php bloginfo('name'); ?> RSS Feed" href="<?php bloginfo('rss2_url'); ?>">
    <link rel="pingback" href="<?php bloginfo('pingback_url'); ?>">
    <link rel="icon" href="/favicon.ico" type="image/x-icon">

    <?php
    wp_deregister_script( 'jquery' );
    wp_head(); ?>
</head>
<body>

<div id="mainContainer">
    <div id="top"></div>
    <div id="bricks"></div>
    <div id="curtain">
        <div id="mainContent">

            <div id="mainHeader">
                <a class="history return-index" href="/"></a>
                <canvas id="tagwall" width="962" height="200"></canvas>
                <div id="canvas-controls">
                    <span id="save-canvas">save</span>
                    <span id="clear-canvas">clear</span>
                    <ul class="spray-colors">
                        <li id="spray-red"></li>
                        <li id="spray-green"></li>
                        <li id="spray-blue"></li>
                        <li id="spray-white"></li>
                        <li id="spray-black"></li>
                        <li id="spray-erase"></li>
                    </ul>
                </div>
                <audio id="spraysound">
                    <source src="<?= theme_path; ?>/sound/spraycan.wav" type="audio/wav"> <!-- chrome need wav for looping!!! -->
                    <source src="<?= theme_path; ?>/sound/spraycan.mp3" type="audio/mpeg">
                </audio>

                <h1><a href="<?php echo get_option('home'); ?>/" title="back to home page"><?php bloginfo('name'); ?></a></h1>
                <p class="description"><?php bloginfo('description'); ?></p>
            </div><!-- #mainHeader -->

            <?php


            // need plugin W3 total cache
            $column1result = wp_cache_get( 'column1result' );
            if ( false === $column1result ) {
                ob_start();

                include('column-1.php');
                $column1result = ob_get_contents();

                ob_end_clean();
                wp_cache_set( 'column1result', $column1result );
            }
            echo $column1result;
            // Do something with $result;



            ?>

            <div id="column2">