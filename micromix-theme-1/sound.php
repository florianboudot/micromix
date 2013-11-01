<?php
// current post ID
$currentID = get_the_ID();

$enclosure_customfield = get_post_meta($currentID, 'enclosure', true);

// get mp3 link ("enclosure" tag is required by apple itunes)
$mp3_link  = trim(htmlspecialchars($enclosure_customfield));

// get file name (trim if there is prefix)
$file_name = $mp3_link;

// format url the same for everyone
$mp3_link = "/upload/" . $file_name;
$file_name = urldecode($file_name); // replace '%20' by blank spaces ' '

// bug : wordpress delete enclosure custom field if post update.
// please check /wp-includes/functions.php and comment code starting with "foreach ( $pung as $link_test ) {"
// more info : http://kevinjedwards.com/51/how-to-stop-wordpress-28-from-deleting-enclosures/
?>
<div class="player">
    <div class="loaded"></div>
    <div class="currenttime"><span class="timetext"></span></div>
    <span class="totaltime"></span>
</div>

<div class="sound">
    <p class="bt-player" id="bt-player-<?= $currentID; ?>">
        <a href="<?= $mp3_link; ?>" class="wpaudio JSplaysoundbyid" data-soundid="<?= the_ID(); ?>"><?= $file_name; ?></a>
    </p>

    <p class="stats" style="clear: both;">
        <em>
             <?= print_download($currentID, false); ?> total plays
            (<?= print_download($currentID, true); ?> plays this month) <br>
            <?php
            //requete pour connaitre les mois renseignés
            $query = "SELECT download_count, dl_month FROM wp_downloadstats WHERE post_id = '".$currentID."' ORDER BY dl_month DESC";
            $line = $wpdb->get_results($query);

            //afficher toutes les dl stats pour chaque mois trouvé
            foreach ($line as $row){
                $dl_current_count = $row -> download_count;
                $dl_current_month = $row -> dl_month;

                echo $dl_current_month . ' : ('.$dl_current_count.')<br>';
            }
            ?>
        </em>
    </p>
</div><!-- .sound -->