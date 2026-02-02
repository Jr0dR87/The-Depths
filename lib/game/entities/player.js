ig.module(
	'game.entities.player'
)
.requires(
	'plugins.twopointfive.entity',
	'plugins.mouse-delta'
)
.defines(function(){
	EntityPlayer = tpf.Entity.extend({
		type: ig.Entity.TYPE.A,
		checkAgainst: ig.Entity.TYPE.B,
		size: {x: 16, y: 24},
		angle: 0,
		internalAngle: 0,
		turnSpeed: (90).toRad(),
		moveSpeed: 100,
		bob: 0,
		bobSpeed: 0.1,
		bobHeight: 0.8,
		currentLightColor: {r:1, g:1, b:1, a:1},
		
		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			this.internalAngle = this.angle;
			ig.game.player = this;
		},
		
		ready: function() {
			let cx = this.pos.x + this.size.x/2,
				cy = this.pos.y + this.size.y/2;
			ig.system.camera.position[0] = cx;
			ig.system.camera.position[2] = cy;
		},
		
		update: function() {
			let dx = 0, 
				dy = 0;
			
			if( ig.input.state('forward') ) {
				dy = 1;
			}
			else if( ig.input.state('back') ) {
				dy = -1;
			}
			if( ig.system.isFullscreen || ig.system.hasMouseLock ) {
				this.internalAngle -= ig.input.mouseDelta.x / 400;
			}

			if( ig.input.state('left') ) {
				this.internalAngle += this.turnSpeed * ig.system.tick;
			}
			else if( ig.input.state('right') ) {
				this.internalAngle -= this.turnSpeed * ig.system.tick;	
			}

			if( ig.input.state('stepleft') ) {
				dx = 1;
			}
			else if( ig.input.state('stepright') ) {
				dx = -1;
			}

			if(ig.input.state('sprint')){
				this.moveSpeed = 200;
			}
			else{
				this.moveSpeed = 100;
			}
			
			let trackerRotation = [0,0,0];
			let trackerPosition = [0,0,0];
			if( ig.system.renderer instanceof tpf.StereoRenderer ) {
				let state = ig.system.renderer.getHMDState();
				trackerRotation = state.rotation;
				trackerPosition = state.position;
			}

			this.angle = this.internalAngle + trackerRotation[0];

			if( Math.abs(dx) + Math.abs(dy) > 1 ) {
				dx *= Math.SQRT1_2;
				dy *= Math.SQRT1_2;
			}

			this.vel.x = -Math.sin(this.angle) * dy * this.moveSpeed 
				-Math.sin(this.angle+Math.PI/2) * dx * this.moveSpeed;

			this.vel.y = -Math.cos(this.angle) * dy * this.moveSpeed 
				-Math.cos(this.angle+Math.PI/2) * dx * this.moveSpeed;
			
			this.bob += ig.system.tick * this.bobSpeed * Math.min(Math.abs(dx) + Math.abs(dy),1) * this.moveSpeed;
			let bobOffset = Math.sin(this.bob) * this.bobHeight;
			
			let cx = this.pos.x + this.size.x/2,
				cy = this.pos.y + this.size.y/2;

			ig.system.camera.setRotation( trackerRotation[2], trackerRotation[1], this.angle );

			if( ig.system.renderer instanceof tpf.StereoRenderer ) {
				let tt = trackerPosition;
				let a = this.internalAngle;
				let ttx = tt[0] * Math.cos(-a) - tt[2] * Math.sin(-a);
				let tty = tt[0] * Math.sin(-a) + tt[2] * Math.cos(-a);
				ig.system.camera.setPosition( cx + ttx, cy + tty, tt[1] );
			}
			else {
				ig.system.camera.setPosition( cx, cy, bobOffset );
			}

			this.parent();
		},

		check: function( other ) {
			other.pickup();
		}
	});
});