<?php
// returns absolute theme path in a variable 'theme_path'
define( 'theme_path', get_bloginfo('template_url'));


function isajax(){
    return isset($_GET['ajax']) || isset($_GET['kjax']) || isset($_GET['kajax']);
}


function the_permalink_return() {
    return apply_filters('the_permalink', get_permalink());
}


// RETURNS SRC PATH OF THE FIRST IMAGE ATTACHED TO THE POST
function image_attachment_src($the_post_id, $the_size){
    $images_attachment = get_children(array(
        'post_type'      => 'attachment',
        'post_status'    => null,
        'post_parent'    => $the_post_id,
        'post_mime_type' => 'image',
        'order'          => 'ASC',
        'orderby'        => 'menu_order ID'
    ));
    $first_image = array_shift($images_attachment);
    $image_id = $first_image->ID;
    $img_src = wp_get_attachment_image_src($image_id, $the_size);
    $img_src = $img_src[0];
    return ($img_src == '') ? theme_path.'/img/steven-seagal-album-cover.jpg' : $img_src;
}

/*
 * please keep this code
 * regenerate image thumbnails for old posts
 *
 */

require ( ABSPATH . 'wp-admin/includes/image.php' );

function regenerate_all_attachment_sizes() {
    $args = array(
        'post_type' => 'attachment',
        'numberposts' => 95, // important
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

// regenerate_all_attachment_sizes();


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
    $post_id_array = array();
    $post_mp3_array = array();
    $post_url_array = array();

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
                array_push($post_id_array, $post_id); // for javascript purposes
                $post_url  = get_permalink($p);

                $valmp3_uri = get_post_meta($p->ID, 'enclosure', false);
                $mp3_uri = addslashes(trim(htmlspecialchars($valmp3_uri[0])));
                $mp3_uri = "/upload/" . $mp3_uri;

                array_push($post_mp3_array, $mp3_uri);// for javascript purposes
                array_push($post_url_array, $post_url);// for javascript purposes
                $micromix_number = get_post_meta($post_id, 'micromixNumber', true);
                $post_title = $p->post_title;

                // mark item as active. or not
                ($_SESSION["article_id"] == $post_id) ? $list .= '<li class="list-item active">' : $list .= '<li class="list-item">';

                $image_src = image_attachment_src($post_id, 'thumbnail'); // thumbnail (150), medium (220), large (500)
                $image_tag = '<img src="'.$image_src.'" alt="" class="mini-poster">';

                // build list item
                $list .= '<span class="micromix-number">#'.$micromix_number.'</span>';
                $list .= '<a href="'.$post_url.'" class="history">'. $post_title . $image_tag.'</a>';
                $list .= '</li>';
                $list .= "\n";
            }
            $content .= $list;
        }

        $content .= "</ul>";
        $content .= "\n";
    }


    /* build javascript array of objects (to give full list to music player)
    /* [
     *  { id : 1506, url : 'http://micromix.localhost/donne-moi-un-peu-de-toi/' },
     *  { id : 1470, url : 'http://micromix.localhost/pochette-souple/' }
     * ]
    */
    $full_list = "<script>";
    $full_list .= "\n";
    $full_list .= "var list_all_posts = [";
    $nb_posts = count($post_id_array) - 2;

    foreach ($post_id_array as $index => $id) {
        $full_list .= "{ id : ".$id.", ";
        $full_list .= " mp3 : '".$post_mp3_array[$index]."', ";
        $full_list .= "url : '".$post_url_array[$index]."' }";
        if($index <= ($nb_posts)){
            $full_list .= ",";
        }
        $full_list .= "\n";
    }
    $full_list .= "];";
    $full_list .= "</script>";
    echo $full_list;


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
    //todo see mp3.php
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


/* HIGHLIGHT SEARCH RESULT*/
function hls_set_query() {
    $tag = single_tag_title("", false);
    $query  = get_search_query();
    $searchTerm =  null;

    /* Is it a query or a tag*/
    if(strlen($query) > 0){
        $searchTerm = $query;
    }elseif (strlen($tag) > 0){
        $searchTerm = $tag;
    }

    if(strlen($searchTerm) > 0){
        echo '
      <script type="text/javascript">
        var hls_query  = "'.$searchTerm.'";
      </script>
    ';
    }
}
add_action('wp_print_scripts', 'hls_set_query');
?>