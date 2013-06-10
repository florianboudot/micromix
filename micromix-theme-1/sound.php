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
		<!-- <div class="audio-content">
		            <p id="audio-player-<?php echo the_ID(); ?>">
		                alternative content
		            </p>
		        </div> -->
		<script type="text/javascript">  
			// AudioPlayer.embed("audio-player-<?php echo the_ID(); ?>", {
			 //                 soundFile: "<?php echo $enclosure; ?>"
			 //             });  
		</script> 
		
        <!-- <p class="btDownload"><a href="<?php echo $enclosure; ?>">download .mp3</a></p> -->
		
        <p class="bt-player" id="bt-player-<?php echo the_ID(); ?>">
		    <a href="<?php echo $enclosure; ?>" class="wpaudio"><?php echo $file; ?></a>	    
	    </p>
        <p class="shtats"><em><?php echo print_download(get_the_ID(), false); ?> total plays (<?php echo print_download(get_the_ID(), true); ?> this month)</em></p>
		
    
   

		<?php // DisplayVotes(get_the_ID()); ?>

	</div><!-- .sound -->
	
	
	
<?php endif; ?>