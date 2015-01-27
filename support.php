<div id="supportWP">
	<p>
		<span>
			<?php bloginfo( 'name' ); ?> is proudly powered by
			<a href="http://wordpress.org/" target="_blank">WordPress</a><br/>
		</span>
	</p>
	<p>
		<span>
			<a href="<?php bloginfo( 'rss2_url' ); ?>" target="_blank">Entries (RSS)</a>
			and <a href="<?php bloginfo( 'comments_rss2_url' ); ?>" target="_blank">Comments (RSS)</a>.
			<?php echo get_num_queries(); ?> queries. <?php timer_stop( 1 ); ?> seconds
		</span>
	</p>
	<p>
		<span>
			Custom theme by
			<a href="https://twitter.com/kazes" target="_blank">kazes</a>,
			<a href="http://www.acidre.com/" target="_blank">acidre</a>,
			<a href="https://twitter.com/yvg" target="_blank">yvg</a>,
			<a href="https://twitter.com/romuleald" target="_blank">romuleald</a>,
			<a href="https://twitter.com/stefan_cova" target="_blank">stecov</a>,
			<a href="https://twitter.com/anaethelion" target="_blank">anaethelion</a>
		</span>
	</p>
</div><!-- #supportWP -->