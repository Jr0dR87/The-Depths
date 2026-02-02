ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'plugins.twopointfive.game',	
	'plugins.touch-button',
	'plugins.touch-field',
	'plugins.gamepad',
	'impact.font',
	'game.levels.dungeon',
	'game.entities.trigger-wincheck',
	'game.title',
	'game.story',
	'game.ending',
	'game.controls',
	'game.gameover',
	'game.hud'
)
.defines(function(){ 
	
	"use strict";
		
	let MyGame = tpf.Game.extend({
		sectorSize: 1,
		hud: null,
		dead: false,
		menu: null,
		fps: 60,
		music: new ig.Sound("media/music/game_music.mp3"),
		gravity: 0,
		init: function() {
			ig.keyCount = 0;
			if( !ig.ua.mobile ) {
				ig.system.canvas.addEventListener('click', function(){
					ig.system.requestMouseLock();
				});
			}
			ig.input.bind( ig.KEY.MOUSE1, 'click' );

			this.setupDesktopControls(); 
			this.setTitle();
		},

		setTitle: function() {
			this.menu = new MyTitle();
		},

		controls: function(){
			this.menu = new Controls();
		},

		storyStart: function(){
			this.menu = new MyStory();
		},

		storyEnding: function(){
			this.menu = new MyEnding();
		},

		gameOver: function(){
			this.menu = new GameOver();
		},

		setGame: function() {
			this.menu = null;
			this.dead = false;
			this.hud = new MyHud( 1600, 900 );
			this.music.volume = 0.2;
			this.music.loop = true;
			this.music.play();
			this.loadLevel( LevelDungeon );
		},
		
		setupDesktopControls: function() {
			ig.input.bind( ig.KEY.UP_ARROW, 'forward' );
			ig.input.bind( ig.KEY.LEFT_ARROW, 'stepleft' );
			ig.input.bind( ig.KEY.DOWN_ARROW, 'back' );
			ig.input.bind( ig.KEY.RIGHT_ARROW, 'stepright' );
			ig.input.bind( ig.KEY.SHIFT, 'sprint');
			ig.input.bind( ig.KEY.ESC, 'pause' );
			ig.input.bind( ig.KEY.W, 'forward' );
			ig.input.bind( ig.KEY.A, 'stepleft' );
			ig.input.bind( ig.KEY.S, 'back' );
			ig.input.bind( ig.KEY.D, 'stepright' );			
		},
		
		update: function() {
			if(this.menu) {
				this.menu.update();
				return;
			}
			this.parent();
		},

		drawWorld: function() {
			this.parent();
		},

		drawHud: function() {
			ig.system.renderer.hudFreelook = false;
			if( this.player ) {
				ig.game.hud.draw(this.player, this.player.currentWeapon);
			}

			if( this.menu ) {
				ig.system.renderer.hudFreelook = true;
				this.menu.draw();
			}
		}
	});

	document.body.className = 
		(ig.System.hasWebGL() ? 'webgl' : 'no-webgl') + ' ' +
		(ig.ua.mobile ? 'mobile' : 'desktop');

	let width = 1600;
	let height = 900;

	ig.Sound.use = [ig.Sound.FORMAT.OGG, ig.Sound.FORMAT.M4A];

	if( ig.System.hasWebGL() ) {
		ig.main( '#canvas', MyGame, 60, width, height, 1, tpf.Loader );
	}
	else {
		ig.$('#game').style.display = 'none';
		ig.$('#no-webgl').style.display = 'block';
	}
});