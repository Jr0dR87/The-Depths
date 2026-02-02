ig.module( 
	'game.story',
    'impact.font'
)
.requires(
	'plugins.twopointfive.world.tile'
)
.defines(function(){
	MyStory = ig.Class.extend({
		camera: null,
		fadeScreen: null,
		width: 1600,
		height: 900,
        font: new tpf.Font( 'media/font.png' ),
		timer: null,
        title: null,
		init: function() {
			this.background = new tpf.Quad(this.width, this.height);
			this.background.setPosition(this.width/2, this.height/2,0)
			this.background.setColor({r:0.0, g:0.0, b:0});
			this.camera = new tpf.OrthoCamera(this.width, this.height);
			this.timer = new ig.Timer();
		},
		update: function() {
			if( ig.input.released('click') ) {
				ig.game.setGame();
			}
		},
		draw: function() {
            ig.system.clear('#000000');
            ig.system.renderer.setCamera(this.camera);
            ig.system.renderer.pushQuad(this.background);
			this.font.height = 32;
			this.font.lineSpacing = 2;
			this.font.draw(`You do not remember how you entered the maze.

One moment there was a door, half rotted and barely standing. The next, it was gone. Replaced by 
endless stone corridors that twist back on themselves, like a bad memory you cannot shake. The air 
is cold, stale, and heavy with silence. Broken only by the faint sound of something moving when 
you're not listening.

They say the maze was built to hold a spirit that refused to rest. A ghost bound to these walls, 
drawn to fear, learning the paths faster than any living thing ever could. Now it hunts anything 
that wanders inside.

Scattered throughout the maze are five old keys, each one pried from a door that was never meant 
to be opened again. They are your only way out. The exit exists, but it will not reveal itself until 
all five are found.

The ghost knows you are here.
Every step echoes. 

Every turn feels wrong. The maze shifts, or maybe it is just your mind playing tricks on you. Run 
when you must. Hide when you can. Do not let it see you stop.

Find the keys.

Escape the maze.

And whatever you do, do not let the ghost catch you.
`, 100, 50, ig.Font.ALIGN.LEFT);
		}
	});
});
