<?php


define( 'theme_root', get_bloginfo('template_url'));

// Jean-Luc Nguyen 2010/06/29
/*

Increment download/played counter for each post.
Don't forget to look into base.js for ajax function.

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
