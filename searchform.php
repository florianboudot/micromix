<form method="get" class="searchform history" action="<?php bloginfo('url'); ?>/">
	<p>
		<input type="text" value="<?php the_search_query(); ?>" name="s" class="s" />
		<input type="submit" class="searchsubmit" value="Search" />
	</p>
</form>
