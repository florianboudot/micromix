<?php
// to work, you need to edit the .htaccess file with this line:
// RewriteRule \.(mp3)$ /wp-content/themes/micromix-theme-1/mp3.php?file=%{REQUEST_URI}
$filename = '';
if(isset($_GET) && isset($_GET['file'])){
    $filename = '../../../' . substr($_GET['file'], 1);

    require('../../../wp-blog-header.php');

    function getpostidfrommp3($mp3){
        global $wpdb;

        $id = null;
        $lines = $wpdb->get_results($wpdb->prepare("SELECT post_id FROM wp_postmeta WHERE meta_value = %s", $mp3));
        $id = $lines[0]->post_id;
        return $id;
    }
    $postid = getpostidfrommp3(urldecode(substr($_GET['file'], 8)));
    //todo update database to have a download_count and stream_count
    if($_SERVER["HTTP_REFERER"]){
        if($postid){
            incrementVisit($postid);
        }
        //if we have a referer, that means play from the player
    }
    else{
        // if no referer, that means that the file has been downloaded
        if($postid){
            incrementVisit($postid);
        }
    }
}
if(file_exists($filename)) {
    header("HTTP/1.0 200 OK");
    header('Content-Type: audio/mpeg');
    header('Content-Disposition: filename="'.str_ireplace('upload/','',$filename).'"');
    header('Content-length: '.filesize($filename));
    header('Cache-Control: no-cache');
    header("Content-Transfer-Encoding: chunked");
    header('HTTP_REFERER: ' . $_SERVER["HTTP_REFERER"] . '');
    readfile($filename);
} else {
    header("HTTP/1.0 404 Not Found");
}
?>
