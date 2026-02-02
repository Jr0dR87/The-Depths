ig.module(
    'game.entities.ghost'
)
.requires(
    'plugins.twopointfive.entity'
)
.defines(function () {
    EntityGhost = tpf.Entity.extend({
        type: ig.Entity.TYPE.C,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.NEVER,
        size: { x: 48, y: 48 },
        animSheet: new ig.AnimationSheet('media/characters/ghost_sprite_sheet.png', 199, 512),
        speed: 60,
        angle: 0,
        breath: new ig.Sound('media/sounds/breath.*'),
        breathRange: 512,
        breathCooldown: 5,
        breathTimer: 0, 
        triggered: false,

        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 0.1, [0,1,2,3]);
            this.breath.volume = 1;
        },

        update: function () {
            const player = ig.game.player;
            if (!player) {
                this.parent();
                return;
            }

            const mx = this.pos.x + this.size.x / 2;
            const my = this.pos.y + this.size.y / 2;
            const px = player.pos.x + player.size.x / 2;
            const py = player.pos.y + player.size.y / 2;
            const dx = px - mx;
            const dy = py - my;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist <= this.breathRange && this.breathTimer <= 0) {
                this.breath.play();
                this.breathTimer = this.breathCooldown;
            }

            if (this.breathTimer > 0) {
                this.breathTimer -= ig.system.tick;
            }

            this.angle = Math.atan2(-dx, -dy);
            const norm = dist || 1;
            this.vel.x = (dx / norm) * this.speed;
            this.vel.y = (dy / norm) * this.speed;

            this.parent();
        },
        
        // Future Jarrod! This is what is needed to make entity go through walls.
        handleMovementTrace: function () {
            this.pos.x += this.vel.x * ig.system.tick;
            this.pos.y += this.vel.y * ig.system.tick;
        },

        check: function (other) {
            if (other instanceof EntityPlayer) {
                ig.game.gameOver();
            }
        },

        kill: function () {
            this.breath.stop();
            this.parent();
        }

    });
});
