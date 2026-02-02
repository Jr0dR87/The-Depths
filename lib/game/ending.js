ig.module( 
	'game.ending',
    'impact.font'
)
.requires(
	'plugins.twopointfive.world.tile'
)
.defines(function(){
	MyEnding = ig.Class.extend({
		camera: null,
		fadeScreen: null,
		width: 1600,
		height: 900,
        font: new tpf.Font( 'media/font.png' ),
		victorySound: new ig.Sound('media/sounds/victory.*'),
		timer: null,
        title: null,
		init: function() {
			this.background = new tpf.Quad(this.width, this.height);
			this.background.setPosition(this.width/2, this.height/2,0)
			this.background.setColor({r:0.0, g:0.0, b:0});
			this.camera = new tpf.OrthoCamera(this.width, this.height);
			this.timer = new ig.Timer();
            ig.keyCount = 0;
			this.victorySound.volume = 1;
			this.victorySound.play();
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
			this.font.lineSpacing = 2;
			this.font.draw( `You push open the final door and step into the light.

The maze falls silent behind you. The walls that hunted you, twisted paths, and shadowed corners
seem to vanish into nothingness. You are free.

The keys lie behind you, scattered and forgotten, their purpose fulfilled. The ghost is gone, it's 
whispers fading like smoke in the wind. You made it out.

Your heart is pounding, your body trembling, but you are alive. The world outside the maze is cold 
and empty, yet it is a comfort compared to what you have left behind.

You've survived.

You escaped.

Thank you for playing <3. I built this in a weekend for funsies - Jr0dR87`,
            100, 50, ig.Font.ALIGN.LEFT);
		}
	});
});
