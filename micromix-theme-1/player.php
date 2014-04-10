<!-- The cassette player is build from file Managethesound.js -->
<div id="cassette-player">

    <!-- counter -->
    <div id="counter">
        <?php for ($i = 1; $i <= 3; $i++) { ?>
            <div class="unit" id="unit-<?php echo $i; ?>">
                <?php for ($j = 0; $j <= 9; $j++) { ?>
                    <div class="number number-<?php echo $j; ?>"><?php echo $j; ?></div>
                <?php } ?>
            </div>
        <?php } ?>
    </div>

    <!-- Deck door -->
    <div id="deck">
        <div id="top-depth"></div>
        <div id="dark-on-deck-open"></div>
    </div>
    <div id="deck-door-shadow"></div>

    <!-- K7 -->
    <div id="cassette"></div>

    <!-- Controls -->
    <div class="control" id="control-pause">pause</div>
    <div class="control" id="control-play">play</div>
    <div class="control" id="control-rewind">rewind</div>
    <div class="control" id="control-forward">fast forward</div>
    <div class="control" id="control-prev">prev</div>
    <div class="control" id="control-next">next</div>

    <!-- Controls when pushed (default : hidden) -->
    <div class="control-pushed" id="control-pause-pushed"></div>
    <div class="control-pushed" id="control-play-pushed"></div>
    <div class="control-pushed" id="control-rewind-pushed"></div>
    <div class="control-pushed" id="control-forward-pushed"></div>
    <div class="control-pushed" id="control-prev-pushed"></div>
    <div class="control-pushed" id="control-next-pushed"></div>

    <!-- Information screen -->
    <a id="cassette-info"></a>
</div>






















