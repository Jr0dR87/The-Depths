ig.module(
    'game.entities.key'
)
.requires(
    'plugins.twopointfive.entity'
)
.defines(function(){
    EntityKey = tpf.Entity.extend({
        baseZ: 10,
        floatTimer: 2,
        floatSpeed: 5,
        floatAmount: 6,
        offset: {x: 0, y: 0 },
        animSheet: new ig.AnimationSheet('media/misc/key.png', 128, 256),
        type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.B,
        keyPickup: new ig.Sound('media/sounds/key_pickup.*'),
        init: function( x, y, settings ) {
            this.parent( x, y, settings );
            this.addAnim( 'idle', 100, [0]);
            this.pos.z = this.baseZ;
        },
        update: function() {
            this.floatTimer += (ig.system.tick * this.floatSpeed);
            this.pos.z = this.baseZ + Math.cos(this.floatTimer / 2) * this.floatAmount;
            this.parent();
        },
        pickup: function() {
			ig.keyCount = ig.keyCount + 1;
			this.keyPickup.volume = 1;
			this.keyPickup.play();
			this.kill();
		},
		check: function(other) {
			other.kill();
		}
    });
});