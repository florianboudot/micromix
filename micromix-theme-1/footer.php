<a href="/?theme=micromix-theme-2">switch to theme 2 (work in progress, no design yet)</a>

<?php wp_footer(); ?>

<!-- SCRIPTS -->
<script type="text/javascript">
    theme_root = '<?= theme_root ?>';
</script>
<script type="text/javascript" src="<?= theme_root ?>/js/soundmanager2.js"></script>
<script>
    soundManager.setup({
        url: '<?= theme_root ?>/swf/', // where to find flash audio SWFs, as needed
        // optional: prefer HTML5 over Flash for MP3/MP4
        // preferFlash: false,
        onready: function() {
            // SM2 is ready to play audio!
        }
    });
</script>

<script type="text/javascript" src="<?= theme_root ?>/js/base.js"></script>



</body>
</html>