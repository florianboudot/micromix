<?php
// returns absolute theme path in a variable 'theme_path'
define( 'theme_path', get_bloginfo('template_url'));


function convertAccentsAndSpecialToNormal($string) {
	$table = array(
		'À'=>'A', 'Á'=>'A', 'Â'=>'A', 'Ã'=>'A', 'Ä'=>'A', 'Å'=>'A', 'Ă'=>'A', 'Ā'=>'A', 'Ą'=>'A', 'Æ'=>'A', 'Ǽ'=>'A',
		'à'=>'a', 'á'=>'a', 'â'=>'a', 'ã'=>'a', 'ä'=>'a', 'å'=>'a', 'ă'=>'a', 'ā'=>'a', 'ą'=>'a', 'æ'=>'a', 'ǽ'=>'a',

		'Þ'=>'B', 'þ'=>'b', 'ß'=>'Ss',

		'Ç'=>'C', 'Č'=>'C', 'Ć'=>'C', 'Ĉ'=>'C', 'Ċ'=>'C',
		'ç'=>'c', 'č'=>'c', 'ć'=>'c', 'ĉ'=>'c', 'ċ'=>'c',

		'Đ'=>'Dj', 'Ď'=>'D', 'Đ'=>'D',
		'đ'=>'dj', 'ď'=>'d',

		'È'=>'E', 'É'=>'E', 'Ê'=>'E', 'Ë'=>'E', 'Ĕ'=>'E', 'Ē'=>'E', 'Ę'=>'E', 'Ė'=>'E',
		'è'=>'e', 'é'=>'e', 'ê'=>'e', 'ë'=>'e', 'ĕ'=>'e', 'ē'=>'e', 'ę'=>'e', 'ė'=>'e',

		'Ĝ'=>'G', 'Ğ'=>'G', 'Ġ'=>'G', 'Ģ'=>'G',
		'ĝ'=>'g', 'ğ'=>'g', 'ġ'=>'g', 'ģ'=>'g',

		'Ĥ'=>'H', 'Ħ'=>'H',
		'ĥ'=>'h', 'ħ'=>'h',

		'Ì'=>'I', 'Í'=>'I', 'Î'=>'I', 'Ï'=>'I', 'İ'=>'I', 'Ĩ'=>'I', 'Ī'=>'I', 'Ĭ'=>'I', 'Į'=>'I',
		'ì'=>'i', 'í'=>'i', 'î'=>'i', 'ï'=>'i', 'į'=>'i', 'ĩ'=>'i', 'ī'=>'i', 'ĭ'=>'i', 'ı'=>'i',

		'Ĵ'=>'J',
		'ĵ'=>'j',

		'Ķ'=>'K',
		'ķ'=>'k', 'ĸ'=>'k',

		'Ĺ'=>'L', 'Ļ'=>'L', 'Ľ'=>'L', 'Ŀ'=>'L', 'Ł'=>'L',
		'ĺ'=>'l', 'ļ'=>'l', 'ľ'=>'l', 'ŀ'=>'l', 'ł'=>'l',

		'Ñ'=>'N', 'Ń'=>'N', 'Ň'=>'N', 'Ņ'=>'N', 'Ŋ'=>'N',
		'ñ'=>'n', 'ń'=>'n', 'ň'=>'n', 'ņ'=>'n', 'ŋ'=>'n', 'ŉ'=>'n',

		'Ò'=>'O', 'Ó'=>'O', 'Ô'=>'O', 'Õ'=>'O', 'Ö'=>'O', 'Ø'=>'O', 'Ō'=>'O', 'Ŏ'=>'O', 'Ő'=>'O', 'Œ'=>'O',
		'ò'=>'o', 'ó'=>'o', 'ô'=>'o', 'õ'=>'o', 'ö'=>'o', 'ø'=>'o', 'ō'=>'o', 'ŏ'=>'o', 'ő'=>'o', 'œ'=>'o', 'ð'=>'o',

		'Ŕ'=>'R', 'Ř'=>'R',
		'ŕ'=>'r', 'ř'=>'r', 'ŗ'=>'r',

		'Š'=>'S', 'Ŝ'=>'S', 'Ś'=>'S', 'Ş'=>'S',
		'š'=>'s', 'ŝ'=>'s', 'ś'=>'s', 'ş'=>'s',

		'Ŧ'=>'T', 'Ţ'=>'T', 'Ť'=>'T',
		'ŧ'=>'t', 'ţ'=>'t', 'ť'=>'t',

		'Ù'=>'U', 'Ú'=>'U', 'Û'=>'U', 'Ü'=>'U', 'Ũ'=>'U', 'Ū'=>'U', 'Ŭ'=>'U', 'Ů'=>'U', 'Ű'=>'U', 'Ų'=>'U',
		'ù'=>'u', 'ú'=>'u', 'û'=>'u', 'ü'=>'u', 'ũ'=>'u', 'ū'=>'u', 'ŭ'=>'u', 'ů'=>'u', 'ű'=>'u', 'ų'=>'u',

		'Ŵ'=>'W', 'Ẁ'=>'W', 'Ẃ'=>'W', 'Ẅ'=>'W',
		'ŵ'=>'w', 'ẁ'=>'w', 'ẃ'=>'w', 'ẅ'=>'w',

		'Ý'=>'Y', 'Ÿ'=>'Y', 'Ŷ'=>'Y',
		'ý'=>'y', 'ÿ'=>'y', 'ŷ'=>'y',

		'Ž'=>'Z', 'Ź'=>'Z', 'Ż'=>'Z', 'Ž'=>'Z',
		'ž'=>'z', 'ź'=>'z', 'ż'=>'z', 'ž'=>'z',

		'“'=>'"', '”'=>'"', '‘'=>"'", '’'=>"'", '•'=>'-', '…'=>'...', '—'=>'-', '–'=>'-', '¿'=>'?', '¡'=>'!', '°'=>' degrees ',
		'¼'=>' 1/4 ', '½'=>' 1/2 ', '¾'=>' 3/4 ', '⅓'=>' 1/3 ', '⅔'=>' 2/3 ', '⅛'=>' 1/8 ', '⅜'=>' 3/8 ', '⅝'=>' 5/8 ', '⅞'=>' 7/8 ',
		'÷'=>' divided by ', '×'=>' times ', '±'=>' plus-minus ', '√'=>' square root ', '∞'=>' infinity ',
		'≈'=>' almost equal to ', '≠'=>' not equal to ', '≡'=>' identical to ', '≤'=>' less than or equal to ', '≥'=>' greater than or equal to ',
		'←'=>' left ', '→'=>' right ', '↑'=>' up ', '↓'=>' down ', '↔'=>' left and right ', '↕'=>' up and down ',
		'℅'=>' care of ', '℮' => ' estimated ',
		'Ω'=>' ohm ',
		'♀'=>' female ', '♂'=>' male ',
		'©'=>' Copyright ', '®'=>' Registered ', '™' =>' Trademark ',
	);

	$string = strtr($string, $table);
	// Currency symbols: £¤¥€  - we dont bother with them for now
	$string = preg_replace("/[^\x9\xA\xD\x20-\x7F]/u", "", $string);

	return $string;
}

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
 * regenerates image thumbnails for old posts
 *
 */
require ( ABSPATH . 'wp-admin/includes/image.php' );
function regenerate_all_attachment_sizes() {
    $args = array(
        'post_type' => 'attachment',
        'numberposts' => 1000, // important
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

if(is_user_logged_in() && isset($_GET['regenimg'])){
    regenerate_all_attachment_sizes();
}



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
    $post_imagecover_array = array();
    $post_url_array = array();


    $query =
        "SELECT `ID`, `post_parent`, `post_title`, `post_type`, YEAR(post_date) as year
        FROM `wp_posts`
        WHERE (post_type='post' AND post_status='publish')
        OR post_type='attachment'
        ORDER BY post_date DESC";
    $allposts = $wpdb->get_results($query);

    $veryallpostlol = array();
    foreach ($allposts as $_post) {
        $posttype = $_post->post_type;
        $postyear = $_post->year;
        if($posttype === 'attachment'){
            $postid = $_post->post_parent;
            $veryallpostlol[$postyear][$postid]['id_attachment'] = $_post->ID;
        }
        else{
            $postid = $_post->ID;
            $veryallpostlol[$postyear][$postid]['ID'] = $_post->ID;
            $veryallpostlol[$postyear][$postid]['post_title'] = $_post->post_title;
            $veryallpostlol[$postyear][$postid]['year'] = $_post->year;
        }
    }
    $totalposts = 0;
    foreach ($veryallpostlol as $masterkey => $allpostinayear) {
        $tmpush = array();
        foreach ($allpostinayear as $post) {
            if(isset($post['ID'])){
                array_push($tmpush, $post);
                $totalposts++;
            }
        }
        $veryallpostlol[$masterkey] = $tmpush;
    }

    /*        $query = "SELECT DISTINCT(YEAR(post_date)) as year
                  FROM wp_posts
                WHERE post_type='post'
                  ORDER BY year DESC";
        $years = $wpdb->get_results($query);*/


    foreach ($veryallpostlol as $year => $posts) {
        $content .= '<h3 class="year-title"><span class="year-text">'.$year.'</span></h3>';
        $content .= "\n";
        $content .= '<ul class="year-list-container">';
        $content .= "\n";

        // get all posts from this year
/*        $query = "SELECT ID, post_title
                  FROM ".$wpdb->posts."
                  WHERE post_type='post'
                  AND post_status='publish'
                  AND post_date LIKE '".$year->year."-%'
                  ORDER BY post_date DESC";
        $posts = $wpdb->get_results($query);*/

        // build list items
        if (count($posts)) {
            $list = '';
            foreach ($posts as $p) {
                $post_id = $p['ID'];
                if(isset($post_id)){
                    $post_img_att = $p['id_attachment'];
                    $post_url  = get_permalink($post_id);

                    $valmp3_uri = get_post_meta($post_id, 'enclosure', false);
                    $mp3_uri = addslashes(trim(htmlspecialchars($valmp3_uri[0])));
                    $mp3_uri = mb_ereg_replace('http://www.micromix.fr' , '', $mp3_uri);

                    $micromix_number = get_post_meta($post_id, 'micromixNumber', true);
//                    $micromix_number = $totalposts+1;
                    $post_title = $p['post_title'];

                    // mark item as active. or not
                    //'.$micromix_number.'
                    $list .= '<li class="micromix-id-'.$post_id.' list-item">';

                    //keep this instead of image_attachment_src because it will add 1s load (for 100 posts)
                    $image_src = wp_get_attachment_metadata($post_img_att);
                    $fat_image_src = empty($image_src) ? theme_path . '/img/steven-seagal-album-cover.jpg' : $image_src['sizes']['large']['file'];
//                    $fat_image_src = empty($fat_image_src) ? theme_path . '/img/steven-seagal-album-cover.jpg' : "" . $fat_image_src;
                    $image_src = empty($image_src) ? theme_path . '/img/steven-seagal-album-cover.jpg' : "/upload/" . $image_src['sizes']['medium']['file'];
                    $image_tag = '<span class="thumbnail-wrapper"><img data-src="' . $image_src . '" data-fatsrc="' . $fat_image_src . '" alt="" class="mini-poster">';
                    $image_tag .= '<span class="play-sound JSplaysoundbyid JSpreviewsoundbyid" data-soundid="' . $post_id . '"><span class="play-sound-inside"></span><span class="play-sound-text">►</span></span></span>';

                    // build list item
                    $list .= '<span class="micromix-number">#'.$micromix_number.'</span>';
                    $list .= '<a href="'.$post_url.'" class="history">'. $post_title . $image_tag.'</a>';
                    $list .= '</li>';
                    $list .= "\n";
	                array_push($post_id_array, $post_id); // for javascript purposes
	                array_push($post_mp3_array, $mp3_uri); // for javascript purposes
	                array_push($post_url_array, $post_url);// for javascript purposes
	                array_push($post_imagecover_array, $fat_image_src);// for javascript purposes

//	                $fakemp3name = "Micromix " . $micromix_number . " - " . convertAccentsAndSpecialToNormal(trim( str_ireplace( "'", " ", $post_title ) )) . ".mp3";
//	                if($mp3_uri != $fakemp3name){
//		                echo "mp3 physique  | " . $mp3_uri . "\n";
//		                echo "mp3 simulé | " . $fakemp3name . "\n";
//		                echo "\n";
//	                }
                    $totalposts--;
                }
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
    $full_list = "<script>//console.warn('" . microtime() . "');";
    $full_list .= "\n";
    $full_list .= "var list_all_posts = [";
    $nb_posts = count($post_id_array) - 2;

    foreach ($post_id_array as $index => $id) {
        $full_list .= "{ id : ".$id.", ";
        $full_list .= " mp3 : '".$post_mp3_array[$index]."', ";
        $full_list .= " imgcover : '".$post_imagecover_array[$index]."', ";
        $full_list .= "url : '".$post_url_array[$index]."' }";
        if($index <= ($nb_posts)){
            $full_list .= ",";
        }
        $full_list .= "\n";
    }
    $full_list .= "];";
    $full_list .= "</script>";
//    echo $full_list;


    // display full html list
//    echo $content;
    return $full_list . $content;
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