<?php 





// Jean-Luc Nguyen 2009/11/03
/*
 2009
    septembre
        post 1
        post 2
    aout
        post 1
        post 2
2008
    septembre
        post 1
        post 2
    aout
        post 1
        post 2
*/
function getPostYearMonth() {
    global $wpdb, $wp_locale;
    
    $rows = array();
    $query = "SELECT DISTINCT(YEAR(post_date)) as year 
              FROM wp_posts 
			  WHERE post_type='post'
              ORDER BY year DESC";
    $years = $wpdb->get_results($query);
    foreach ($years as $year) {
        $content .= "<h3 class='year' title='fold / unfold'>".$year->year."</h3>";
        $query = "SELECT DISTINCT(MONTH(post_date)) as month 
                  FROM wp_posts 
                  WHERE post_date LIKE '".$year->year."-%'
				  AND post_type='post'
                  ORDER BY month DESC";
        $months = $wpdb->get_results($query);
        if (count($months)) {
            $content .= "<ul>";
            foreach ($months as $month) {
                $monthUrl = get_month_link($year->year, $month->month);
                
                // no months in micromix cause too few mixes in a month!
                $content .= "<li><!--<h4 class='month' title='fold / unfold'>".$wp_locale->get_month($month->month)."</h4>-->";
                
                if ($month->month < 10) $month->month = '0'.$month->month;
                $query = "SELECT * 
                          FROM ".$wpdb->posts." 
                          WHERE post_type='post' 
                          AND post_status='publish' 
                          AND post_date LIKE '".$year->year."-".$month->month."-%'
                          ORDER BY post_date DESC";
						  //echo $query;
                $posts = $wpdb->get_results($query);
                if (count($posts)) {
					$list = '';
					
                    foreach ($posts as $p) {
						($_SESSION["article_id"] == $p->ID) ? $list .= '<li><strong>' : $list .= '<li>';
						$postUrl  = get_permalink($p);
						
						  

						$number = get_post_meta($p->ID, 'micromixNumber', true);
						
                        $list .= '#'.$number.'<a href="'.$postUrl.'">'.$p->post_title.'</a>';
						($_SESSION["article_id"] == $p->ID) ? $list .= '</strong></li>' : $list .= '</li>';
                    }
					
					if (strpos($list,'strong') !== false) {
                	    $content .= "<ul class=\"open\">".$list."</ul>";
					}
					else {
	                    $content .= "<ul>".$list."</ul>";
					}
                }
                $content .= "</li>";
            }
            $content .= "</ul>";
        }
        $content .= "";
    }
    echo $content;
}





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
    
    if($isCurrentMonth === true){
        $where = "WHERE post_id = ".$postID." AND dl_month = '".$dateMonth."'";
    } else if($isCurrentMonth === false){
        $where = "WHERE post_id = ".$postID;
    } else {
        $where = "WHERE post_id = ".$postID." AND dl_month = '".$isCurrentMonth."'";
    }
    $query = "SELECT post_id, download_count FROM wp_downloadstats ".$where;
    //echo '<p>'.$query.'</p>';
    $line = $wpdb->get_results($query);
    $results = 0;
    
    foreach ($line as $row){
        $results += $row -> download_count;
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



























