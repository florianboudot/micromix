<?php
/**
 * Front to the WordPress application. This file doesn't do anything, but loads
 * wp-blog-header.php which does and tells WordPress to load the theme.
 *
 * @package WordPress
 */

/**
 * Tells WordPress to load the WordPress theme and output it.
 *
 * @var bool
 */
/** Loads the WordPress Environment and Template */
require('../../../wp-blog-header.php');

$postId = str_replace('bt-player-', '', $_POST['postId']);
if (isset($postId)) {
    incrementVisit($postId);
}
?>