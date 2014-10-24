            </div><!-- #mainContent -->
    </div><!-- #curtain -->

    <div id="footer">



        <?php include('player.php'); ?>
        <?php include('feedback.php'); ?>
    </div>
</div><!-- #mainContainer -->

<?php wp_footer(); ?>

<!-- SCRIPTS -->
<script> theme_path = '<?= theme_path ?>'; // javascript var </script>
<?php if(true){ ?>
    <script src="<?= theme_path ?>/js/libs/jquery-2.0.2.js"></script>
    <script src="<?= theme_path ?>/js/libs/soundmanager2.js"></script>
    <script src="<?= theme_path ?>/js/libs/sketcher.js"></script>
    <script src="<?= theme_path ?>/js/libs/jquery.velocity.js"></script>
    <script src="<?= theme_path ?>/js/libs/modernizr.js"></script>
    <script src="<?= theme_path ?>/js/libs/jquery.easing.js"></script>
    <script src="<?= theme_path ?>/js/libs/jquery.history.js"></script>
    <script src="<?= theme_path ?>/js/libs/latinize.js"></script>

    <script src="<?= theme_path ?>/js/framework/setting.js"></script>
    <script src="<?= theme_path ?>/js/framework/pm.addfntocollection.js"></script>
    <script src="<?= theme_path ?>/js/framework/pm.analytics.js"></script>
    <script src="<?= theme_path ?>/js/framework/1pm.base.micromix.js"></script>
    <script src="<?= theme_path ?>/js/framework/pm.connexionmanager.js"></script>
    <script src="<?= theme_path ?>/js/framework/pm.contentmanager.js"></script>
    <script src="<?= theme_path ?>/js/framework/pm.getterssetters.js"></script>
    <script src="<?= theme_path ?>/js/framework/pm.historymanager.js"></script>
    <script src="<?= theme_path ?>/js/framework/pm.navigationmanager.js"></script>
    <script src="<?= theme_path ?>/js/framework/pm.transitionmanager.js"></script>
    <script src="<?= theme_path ?>/js/framework/pm.viewactions.js"></script>
    <script src="<?= theme_path ?>/js/framework/pm.viewmanager.js"></script>

    <script src="<?= theme_path ?>/js/app/Managethesound.js"></script>
    <script src="<?= theme_path ?>/js/app/base.js"></script>
    <script src="<?= theme_path ?>/js/app/microondeinit.js"></script>
<?php } else { ?>
    <script src="<?= theme_path ?>/js/min/lib.js"></script>
    <script src="<?= theme_path ?>/js/min/app.js"></script>
<?php } ?>
</body>
</html>