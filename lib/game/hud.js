ig.module(
	'game.hud'
)
.requires(
	'plugins.twopointfive.hud'
)
.defines(function(){
	MyHud = tpf.Hud.extend({
		font: new tpf.Font( 'media/font.png' ),
		keys: [],
		showControlsTimer: null,
		init: function( width, height, showControls ) {
			this.parent(width, height);
		},
		draw: function() {
			this.prepare();
			this.font.draw( 'Keys Collected: ' + ig.keyCount, 0, this.height - this.font.height - 5, ig.Font.ALIGN.LEFT );
			this.drawDefault();
		}
	});
});