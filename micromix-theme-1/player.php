<!-- The cassette player is build from file Managethesound.js -->
<div id="cassette-player">
	<!-- K7 -->
	<div class="cassette">
		<div class="front"></div>

		<div class="reel-base left"><div class="forward"><div class="backward"><div class="base"><div class="tape"></div></div></div></div></div>
		<div class="reel-base right"><div class="forward"><div class="backward"><div class="base"><div class="tape"></div></div></div></div></div>

		<style>
			.cassette-cover {
				mask: url("#cassette-mask");/* keep this rule (firefox) here in the document */
			}
		</style>
		<div class="cassette-cover k7_face" style="background-image: url(/upload/jaws-roy-scheider.jpg)">
			<img src="<?= theme_path ?>/img/cassette/velum.png" alt="" class="velum">
		</div>



		<svg height="0">
			<filter id="maskfilter">
				<fecolormatrix in="SourceAlpha" type="matrix" values="0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0"></fecolormatrix>
			</filter>

			<mask id="cassette-mask">
				<image width="520px" height="340px" xlink:href="<?= theme_path ?>/img/cassette/mask.png" filter="url(#maskfilter)"></image>
			</mask>
		</svg>

	</div>
	<div class="player-skin">

		<!-- VU meter -->
		<div id="vu-meter">
			<div class="debug" style="position: relative; z-index: 2"></div>
			<div class="bar left">
				<div class="led vu-20 green"></div>
				<div class="led vu-40 green"></div>
				<div class="led vu-60 green"></div>
				<div class="led vu-80 red"></div>
				<div class="led vu-100 red"></div>
			</div>
			<div class="bar right">
				<div class="led vu-20 green"></div>
				<div class="led vu-40 green"></div>
				<div class="led vu-60 green"></div>
				<div class="led vu-80 red"></div>
				<div class="led vu-100 red"></div>
			</div>
		</div>

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
		<div id="infos">
			<a id="infos-text"><!-- text from javascript --></a>
		</div>
	</div>
</div>























