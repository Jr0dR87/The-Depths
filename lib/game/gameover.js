ig.module( 
	'game.gameover',
    'impact.font'
)
.requires(
	'plugins.twopointfive.world.tile'
)
.defines(function(){
	GameOver = ig.Class.extend({
		camera: null,
		fadeScreen: null,
		width: 1600,
		height: 900,
        font: new tpf.Font( 'media/font.png' ),
		deathSound: new ig.Sound('media/sounds/death_sound.*'),
		timer: null,
        title: null,
		init: function() {
			this.background = new tpf.Quad(this.width, this.height);
			this.background.setPosition(this.width/2, this.height/2,0)
			this.background.setColor({r:0.0, g:0.0, b:0});
			this.camera = new tpf.OrthoCamera(this.width, this.height);
			this.timer = new ig.Timer();
            ig.keyCount = 0;
			this.deathSound.volume = 1;
			this.deathSound.play();
		},
		update: function() {
			if( ig.input.released('click') ) {
				ig.game.setTitle();
			}
		},
		draw: function() {
            ig.system.clear('#000000');
            ig.system.renderer.setCamera(this.camera);
            ig.system.renderer.pushQuad(this.background);
			this.font.height = 32;
			this.font.lineSpacing = 10;
			this.font.draw( `You run through the maze, heart pounding, but it is too late.

A shadow falls over you. The ghost is there, its eyes burning with hunger. It's cold hands 
wrap around you, pulling you into the darkness.

You struggle, but it is useless. The corridors twist around you, trapping you in an endless 
loop. Every step only leads you deeper into it's domain.

Your cries echo, but the maze swallows them. You are caught. You are lost. You are never leaving.

The ghost has claimed you.


Click here to try again!`, 100, 50, ig.Font.ALIGN.LEFT);
		}
	});
});
