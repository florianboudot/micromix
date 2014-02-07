<!-- ghettoblaster is build here (Managethesound.js) -->

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

    <!-- deck door -->
    <div id="deck">
        <div id="top-depth"></div>
        <div id="dark-on-deck-open"></div>
    </div>
    <div id="deck-door-shadow"></div>

    <div id="cassette"></div>

    <!-- action buttons here -->
    <div class="control" id="control-1">pause</div>
    <div class="control" id="control-2">play</div>
    <div class="control" id="control-3">rewind</div>
    <div class="control" id="control-4">fast forward</div>
    <div class="control" id="control-5">prev</div>
    <div class="control" id="control-6">next</div>

    <!-- button skin hover -->
    <div class="control-pushed" id="control-1-pushed"></div>
    <div class="control-pushed" id="control-2-pushed"></div>
    <div class="control-pushed" id="control-3-pushed"></div>
    <div class="control-pushed" id="control-4-pushed"></div>
    <div class="control-pushed" id="control-5-pushed"></div>
    <div class="control-pushed" id="control-6-pushed"></div>
</div>




















