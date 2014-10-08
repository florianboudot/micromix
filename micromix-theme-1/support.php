<div id="supportWP">
	<p>
		<?php bloginfo( 'name' ); ?> is proudly powered by
		<a href="http://wordpress.org/" target="_blank">WordPress</a><br/>
	</p>
	<p>
		<a href="<?php bloginfo( 'rss2_url' ); ?>" target="_blank">Entries (RSS)</a>
		and <a href="<?php bloginfo( 'comments_rss2_url' ); ?>" target="_blank">Comments (RSS)</a>.
		<?php echo get_num_queries(); ?> queries. <?php timer_stop( 1 ); ?> seconds
	</p>
</div><!-- #supportWP -->