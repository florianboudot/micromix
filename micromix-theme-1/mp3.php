<?php
// to work, you need to edit the .htaccess file with thie line:
// RewriteRule \.(mp3)$ /wp-content/themes/micromix-theme-1/mp3.php?file=%{REQUEST_URI}
$filename = '';
if(isset($_GET) && isset($_GET['file'])){
    $filename = '../../../' . substr($_GET['file'], 1);

    require('../../../wp-blog-header.php');

    function getpostidfrommp3($mp3){
        global $wpdb;

        /*
         * c'est une requête trop cool pour cleaner les chemin vers les MP3 dans la table wp-postmeta
                $query2 = "SELECT * FROM  `wp_postmeta` WHERE meta_key =  'enclosure' LIMIT 0 , 500";
                $lines2 = $wpdb->get_results($query2);
                foreach ($lines2 as $line) {
                    $mp3clean = urldecode($line->meta_value);
                    $mp3clean = str_ireplace('/upload/','',$mp3clean);
                    $mp3clean = str_ireplace('http://www.micromix.fr','',$mp3clean);
                    $mp3clean = addslashes($mp3clean);
                    $query3 = "UPDATE  `wp_postmeta` SET `meta_value` =  '". $mp3clean ."' WHERE `meta_id` = ". $line->meta_id;
                    echo $query3 . "\n";
                    $wpdb->query($query3);

                }
        */

        $id = null;
        $query = "SELECT post_id FROM wp_postmeta WHERE meta_value = '". $mp3 ."'";
        $lines = $wpdb->get_results($query);
        $id = $lines[0]->post_id;
        return $id;
    }
    $postid = getpostidfrommp3(urldecode($filename));

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