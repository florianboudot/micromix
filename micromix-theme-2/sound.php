<?php 
if (get_post_meta($post->ID, 'enclosure', true)) : 
    
    //enclosure tag is required by apple itunes podcast
    $val = get_post_meta($post->ID, 'enclosure', false);
    foreach ( (array) $val as $enc ) {
        $enclosure = split("\n", $enc);
    }
    $enclosure = trim(htmlspecialchars($enclosure[0]));
    $file = str_replace("http://www.micromix.fr/upload/", "", $enclosure);
    $file = urldecode($file);
?>

    <div class="sound">
        <p class="bt-player" id="bt-player-<?php echo the_ID(); ?>">
            <a href="<?php echo $enclosure; ?>" class="wpaudio"><?php echo $file; ?></a>	    
        </p>
        
        <p><em>
            <?php echo print_download(get_the_ID(), false); ?> total plays 
            (<?php echo print_download(get_the_ID(), true); ?> plays this month)
            <br>
            <?php 
            //afficher toutes les dl stats pour chaque mois
            
            //récuper l'id du current post 
            $currentID = get_the_ID();
            
            //requete pour connaitre les mois renseignés
            $query = "SELECT download_count, dl_month FROM wp_downloadstats WHERE post_id = '".$currentID."' ORDER BY dl_month DESC";
            $line = $wpdb->get_results($query);
            
            //afficher toutes les dl stats pour chaque mois trouvé
            foreach ($line as $row){
                $dl_current_count = $row -> download_count;
                $dl_current_month = $row -> dl_month;
                echo($dl_current_month);
                echo ' : ';
                echo('('.$dl_current_count.')');
                echo '<br>';
            }
            ?>
        </em></p>
    </div><!-- .sound -->
    
<?php endif; ?>

