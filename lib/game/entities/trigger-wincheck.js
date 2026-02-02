ig.module(
    'game.entities.trigger-wincheck'
)
.requires(
	'plugins.twopointfive.entity'
)
.defines(function () {
EntityTriggerWincheck = ig.Entity.extend({
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.NEVER,
        size: { x: 64, y: 64 },
        _wmDrawBox: true,
        _wmBoxColor: 'rgba(0, 255, 0, 0.35)',
        triggered: false,
        check: function (other) {
            if (this.triggered) return;
            this.triggered = true;

            if (ig.keyCount === 5) {
                this.onWin(other);
            }
        },
        onWin: function () {
			ig.game.storyEnding();
        },
    });
});
