ig.module( 
	'game.controls',
    'impact.font'
)
.requires(
	'plugins.twopointfive.world.tile'
)
.defines(function(){
	Controls = ig.Class.extend({
		camera: null,
		fadeScreen: null,
		width: 1600,
		height: 900,
        font: new tpf.Font( 'media/font.png' ),
        scarySound: new ig.Sound('media/sounds/scary-transition.*'),
		timer: null,
        title: null,
		init: function() {
			this.background = new tpf.Quad(this.width, this.height);
			this.background.setPosition(this.width/2, this.height/2,0)
			this.background.setColor({r:0.0, g:0.0, b:0});
			this.camera = new tpf.OrthoCamera(this.width, this.height);
			this.timer = new ig.Timer();
            this.scarySound.volume = 1;
			this.scarySound.play();
		},
		update: function() {
			if( ig.input.released('click') ) {
				ig.game.storyStart();
			}
		},
		draw: function() {
            ig.system.clear('#000000');
            ig.system.renderer.setCamera(this.camera);
            ig.system.renderer.pushQuad(this.background);
			this.font.draw(`How to play!
                A - Move Left
                D - Move Right
                W - Move Foward
                S - Move Backwards
                Shift - Sprint
                Use Mouse to Rotate Camera

                Avoid the ghost. If it caches you, you lose.
                Collect five keys and locate the exit to win!
`, 100, 50, ig.Font.ALIGN.LEFT);
		}
	});
});