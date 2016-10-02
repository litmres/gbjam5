
"use strict";
(function() {
	var pathCache = {};

	GBGJ.BossEntity = me.Entity.extend({
		init : function (x, y, settings) {
			settings = settings || {};
			settings.image = 'boss';
			settings.width = 78;
			settings.height = 68;
			this._super(me.Entity, 'init', [x, y, settings]);

			this.body.setMaxVelocity(1, 1);
			this.body.gravity = 0;

			this.pos.z = 5;
		},


		update : function (dt) {
			/*
				this.body.vel.x = dir.x * me.timer.tick;
				this.body.vel.y = dir.y * me.timer.tick;

				this.body.update(dt);
			*/

			me.collision.check(this);

			return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
		},

		changeAnimation: function(dest, next) {
			if(!this.renderable.isCurrentAnimation(dest)) {
				if(next) {
					next = next.bind(this);
				}
				this.renderable.setCurrentAnimation(dest, next);
			}
		},

		onCollision : function (response, other) {
			if(other.body.collisionType == me.collision.types.ENEMY_OBJECT){
				return false;
			}
			if(other.body.collisionType == me.collision.types.PLAYER_OBJECT){
				return false;
			}
			return true;
		}
	});
})();