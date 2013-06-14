<?php
// returns absolute theme path in a variable 'theme_path'
define( 'theme_path', get_bloginfo('template_url'));

// post thumbnails enabled (images uploaded & attached to the post)
add_theme_support( 'post-thumbnails' );

/*
 * please keep this code
 * regenerate image thumbnails for old posts
 *
require ( ABSPATH . 'wp-admin/includes/image.php' );

function regenerate_all_attachment_sizes() {
    $args = array(
        'post_type' => 'attachment',
        'numberposts' => 95,
        'post_status' => null,
        'post_parent' => null,
        'post_mime_type' => 'image'
    );
    $attachments = get_posts( $args );
    if ($attachments) {
        foreach ( $attachments as $post ) {
            $file = get_attached_file( $post->ID );
            wp_update_attachment_metadata( $post->ID, wp_generate_attachment_metadata( $post->ID, $file ) );
        }
    }
}

regenerate_all_attachment_sizes();
*/

/*
function : ALL POSTS BY YEAR (in the sidebar)
author : Jean-Luc Nguyen (2009/11/03)

2009
    post 1
    post 2
2008
    post 1
    post 2
*/
function allPostsByYear() {
    global $wpdb, $content;

    $query = "SELECT DISTINCT(YEAR(post_date)) as year
              FROM wp_posts
			  WHERE post_type='post'
              ORDER BY year DESC";
    $years = $wpdb->get_results($query);

    foreach ($years as $year) {
        $content .= '<h3 class="year-title"><span class="year-text">'.$year->year.'</span></h3>';
        $content .= "\n";
        $content .= '<ul class="year-list-container">';
        $content .= "\n";

        // get all posts from this year
        $query = "SELECT *
                  FROM ".$wpdb->posts."
                  WHERE post_type='post'
                  AND post_status='publish'
                  AND post_date LIKE '".$year->year."-%'
                  ORDER BY post_date DESC";
        $posts = $wpdb->get_results($query);

        // build list items
        if (count($posts)) {
            $list = '';
            foreach ($posts as $p) {
                $post_id = $p->ID;
                $post_url  = get_permalink($p);
                $micromix_number = get_post_meta($post_id, 'micromixNumber', true);
                $post_title = $p->post_title;

                // mark item as active. or not
                ($_SESSION["article_id"] == $post_id) ? $list .= '<li class="list-item active">' : $list .= '<li class="list-item">';

                // get image from the post
                $images = get_children(array(
                    'post_type'      => 'attachment',
                    'post_status'    => null,
                    'post_parent'    => $post_id,
                    'post_mime_type' => 'image',
                    'order'          => 'ASC',
                    'orderby'        => 'menu_order ID'
                ));
                $first_image_attachment = array_shift($images);
                //$image_src = $first_image_attachment->guid;
                $image_id = $first_image_attachment->ID;





                $image_src = wp_get_attachment_image_src($image_id)[0];
                $image_tag = '<img src="'.$image_src.'" alt="" class="mini-poster">';
                // todo : generate smaller image via wordpress




                //$image_attributes = wp_get_attachment_image_src( $attachment->ID, 'thumbnail' )  ? wp_get_attachment_image_src( $attachment->ID, 'thumbnail' ) : wp_get_attachment_image_src( $attachment->ID, 'full' );

                //echo '<img src="'.wp_get_attachment_thumb_url( $attachment->ID ).'" class="current">';



                // build list item
                $list .= '<span class="micromix-number">#'.$micromix_number.'</span>';
                $list .= '<a href="'.$post_url.'">'. $post_title .$image_tag.'</a>';
                $list .= '</li>';
                $list .= "\n";
            }
            $content .= $list;
        }

        $content .= "</ul>";
        $content .= "\n";
    }

    // display full html list
    echo $content;
}



/*

Increment download/played counter for each post.
Don't forget to look into base.js for ajax function.

author : Jean-Luc Nguyen (2010/06/29)

*/
// get current year and month :
date_default_timezone_set('UTC');
$dateMonth = date('Y_m');
//$dateMonth = "2010_08";

function incrementVisit($postID) {
    global $wpdb;
    global $dateMonth;
    
    $query = "SELECT post_id, download_count FROM wp_downloadstats WHERE post_id = ".$postID." AND dl_month = '".$dateMonth."'";
    $line = $wpdb->get_results($query);
    if (!$line) {
        $query = "INSERT INTO wp_downloadstats (post_id, download_count, dl_month) VALUES (".$postID.", 1, '".$dateMonth."')";
        $wpdb->query($query);
    } else {
        // incremente
        $inc = $line[0]->download_count + 1;
        $query = "UPDATE wp_downloadstats SET download_count = ".$inc." WHERE post_id = ".$postID." AND dl_month = '".$dateMonth."'";
        $wpdb->query($query);
    }
}

function print_download($postID, $isCurrentMonth) {
    global $wpdb;
    global $dateMonth;
    
    if($isCurrentMonth){
        $where = "WHERE post_id = ".$postID." AND dl_month = '".$dateMonth."'";
    } else {
        $where = "WHERE post_id = ".$postID;
    }    
    $query = "SELECT post_id, download_count FROM wp_downloadstats ".$where;

    $line = $wpdb->get_results($query);
    $results = 0;
    
    foreach ($line as $row){
        $results += $row-> download_count;
    }
    return $results;
}

function get_top_downloads($isCurrentMonth) {
    global $wpdb;
    global $dateMonth;
    $mergeResults = array();    
    $mergeResultsCount = array();    
    $mergeResultsId = array();    
    $topMonths = array();
    
    if($isCurrentMonth){
        $where = "WHERE dl_month = '".$dateMonth."'";
    } else {
        $where = "";
    }
    $query = "SELECT post_id, download_count FROM wp_downloadstats ".$where." ORDER BY download_count DESC";
    $topMonths = $wpdb->get_results($query);
    
	$i = 0;
    foreach($topMonths as $row) {         
        
        $mergeResultsId[$row->post_id] = $row->post_id;
        $mergeResultsCount[$row->post_id] += $row->download_count;
        
        $i++;
	}
    $mergeResults = array($mergeResultsId,$mergeResultsCount);
    //echo '<pre>';    
    //print_r($mergeResults);
    //echo '</pre>';
    
    
    return $mergeResults;
}
?>