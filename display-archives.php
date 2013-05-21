<?php
/*
Template Name: display archives
*/
?>

<?php 
$onlyThisMonth = false;//true = only this month, false = global stats

$top = get_top_downloads($onlyThisMonth, $dateMonth); 

$j = 1;

$stringMonth = 'global';

if($onlyThisMonth && empty($top[0])) { // si y'a pas encore de stats ce mois-ci
	$top = get_top_downloads(false,''); //alors on affiche les stats globales
	$onlyThisMonth = false;
} else {
	$stringMonth = '(this month)';
}

?>


<h3>Top 5 <?php echo $stringMonth ?></h3>

<?php echo(count($top[0])); ?>
<ol>
	<?php
		foreach($top[0] as $row) { 
			if($j <= count($top[0])){ 
				$p = get_post($row);    ?>
				<li>
					<strong><?php //echo get_post_meta($p->ID, 'micromixNumber', true); ?></strong>
					<a href="<?php echo get_permalink($p); ?>" title="Micromix #<?php echo get_post_meta($p->ID, 'micromixNumber', true); ?> - <?php echo $p->post_title;?> "><img src="<?php echo get_post_meta($p->ID, "imagePost", true); ?>" alt="<?php echo $p->post_title; ?>" width="100" /></a>
					<br />
					(<?php echo $top[1][$row]; ?> plays)
				</li>
<?php
		}
		$j++;
	} 
?>
</ol>