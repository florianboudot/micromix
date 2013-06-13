    			    <div id="column3">
						<div id="sidebar">
							<ul>
								<?php 	/* Widgetized sidebar, if you have the plugin installed. */
										if ( !function_exists('dynamic_sidebar') || !dynamic_sidebar() ) : ?>
								<li>
                                    <?php include (TEMPLATEPATH . '/searchform.php'); //old regular search field ?>
                
                                    <?php //if(function_exists('wp_custom_fields_search')) wp_custom_fields_search(); ?>
                                </li>  
					
								
					
								<?php if ( is_404() || is_category() || is_day() || is_month() ||
											is_year() || is_search() || is_paged() ) {
								?> <li id="currentAction"><p><span>
					
								<?php /* If this is a 404 page */ if (is_404()) { ?>
								<?php /* If this is a category archive */ } elseif (is_category()) { ?>
								You are currently browsing the archives for the <?php single_cat_title(''); ?> category.
					
								<?php /* If this is a yearly archive */ } elseif (is_day()) { ?>
								You are currently browsing the 
								<a href="<?php bloginfo('url'); ?>/"><?php echo bloginfo('name'); ?></a> blog archives
								for the day <?php the_time('l, F jS, Y'); ?>.
					
								<?php /* If this is a monthly archive */ } elseif (is_month()) { ?>
								You are currently browsing the 
								<a href="<?php bloginfo('url'); ?>/"><?php echo bloginfo('name'); ?></a> blog archives
								for <?php the_time('F, Y'); ?>.
					
								<?php /* If this is a yearly archive */ } elseif (is_year()) { ?>
								You are currently browsing the 
								<a href="<?php bloginfo('url'); ?>/"><?php echo bloginfo('name'); ?></a> blog archives
								for the year <?php the_time('Y'); ?>.
					
								<?php /* If this is a monthly archive */ } elseif (is_search()) { ?>
								You have searched the 
								<a href="<?php echo bloginfo('url'); ?>/"><?php echo bloginfo('name'); ?></a> blog archives
								for <strong>'<?php the_search_query(); ?>'</strong>. 
								If you are unable to find anything in these search results, you can try one of these links.
					
								<?php /* If this is a monthly archive */ } elseif (isset($_GET['paged']) && !empty($_GET['paged'])) { ?>
								You are currently browsing the 
								<a href="<?php echo bloginfo('url'); ?>/"><?php echo bloginfo('name'); ?></a> blog archives.
					
								<?php } ?>
					
								</span></p></li> <?php }?>


								<li>
                                    <div id="posts-year-month">
                                        <h2>Archives</h2>
                                        <?php allPostsByYear(); ?>
                                    </div>
								</li>
                                <li>
                                    <!-- FORM NEWSLETTER (le récupérer dans l'admin car généré. Oui, c'est sale) -->
                                    <script type="text/javascript">
                                        //<![CDATA[
                                        if (typeof newsletter_check !== "function") {
                                            window.newsletter_check = function (f) {
                                                var re = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-]{1,})+\.)+([a-zA-Z0-9]{2,})+$/;
                                                if (!re.test(f.elements["ne"].value)) {
                                                    alert("what\'s your email address please ?");
                                                    return false;
                                                }
                                                if (f.elements["nn"] && (f.elements["nn"].value == "" || f.elements["nn"].value == f.elements["nn"].defaultValue)) {
                                                    alert("what\'s your name please ?");
                                                    return false;
                                                }
                                                if (f.elements["ny"] && !f.elements["ny"].checked) {
                                                    alert("You must accept the privacy statement");
                                                    return false;
                                                }
                                                return true;
                                            }
                                        }
                                        //]]>
                                    </script>

                                    <div class="newsletter newsletter-subscription">
                                        <h3>Newsletter</h3>
                                        <p><span class="text-bg">Get notified when a new episode goes online :</span></p>
                                        <form method="post" action="http://www.micromix.fr/wp-content/plugins/newsletter/do/subscribe.php" onsubmit="return newsletter_check(this)">

                                            <p>
                                                <input class="newsletter-firstname" type="text" name="nn" size="30" value="name" onfocus="this.value = (this.value=='name') ? '': this.value" onblur="this.value = (this.value=='') ? 'name' : this.value" />
                                            </p>


                                                <!-- email -->

                                            <p>
                                                <input class="newsletter-email" type="text" name="ne" size="30" value="email" onfocus="this.value = (this.value=='email') ? '': this.value" onblur="this.value = (this.value=='') ? 'email' : this.value" />
                                            </p>
                                            <p class="newsletter-td-submit">
                                                <input class="newsletter-submit" type="submit" value="Subscribe"/>
                                            </p>
                                        </form>
                                    </div>
                                </li>
                                <?php wp_list_pages('title_li=<h3>Micromix</h3>' ); ?>
								<?php endif; ?>
							</ul>
                            <div class="social-container">
                                <p class="bt-social" id="btRss">
                                    <a href="<?php bloginfo('rss2_url'); ?>" title="Entries (RSS)">Entries (RSS)</a>
                                </p>

                                <p class="bt-social" id="btTwitter">
                                    <a href="http://twitter.com/micromix" title="follow micromix on twitter"><img src="<?= theme_path ?>/img/ico-twitter.png" alt="follow micromix on twitter" /></a>
                                </p>

                                <p class="bt-social" id="btFB">
                                    <a href="http://www.facebook.com/micromix" title="micromix on facebook"><img src="<?= theme_path ?>/img/ico-facebook.png" alt="become a fan of micromix on facebook" /></a>
                                </p>
                            </div>
						</div><!-- #sidebar -->
					</div><!-- #column3 -->
				</div><!-- #mainContent -->
			</div><!-- #mainFooter -->
		</div><!-- #curtain -->
	</div><!-- #bricks -->
</div><!-- #mainContainer -->
<?php get_footer(); ?>

