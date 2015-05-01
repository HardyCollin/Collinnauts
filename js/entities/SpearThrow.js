game.SpearThrow = me.Entity.extend({
    init: function(x, y, settings, facing){
        this._super(me.Entity, 'init', [x, y, {
                image: "spear",
                width: 48,
                height: 48,
                spritewidth: "48",
                spriteheight: "48",
                getShape: function(){
                    return (new me.Rect(0, 0, 48, 48)).toPolygon();
                }
        }]);
        this.alwaysUpdate = true;
        this.attack = game.data.ablility3*3;
        this.body.setVelocity(8, 0);
        
        this.type = "spear";
        this.facing = facing;
    
    },
    
    update: function(delta){
        if(this.facing === "left"){
            this.body.vel.x -= this.body.accel.x * me.timer.tick;
        }else{
            this.body.vel.x += this.body.accel.x * me.timer.tick;
        }
        
        me.collision.check(this, true, this.collideHandler.bind(this), true);
                
        this.body.update(delta);

        this._super(me.Entity, "update", [delta]);
        return true;    
    },
//    This allows our spear to collide with the enemy base and creep and cause damage
    collideHandler: function(response) {
        console.log(response.b.type + " " + game.data.spearAttack);
        if (response.b.type === 'EnemyBaseEntity' || response.b.type === 'EnemyCreep') {
            response.b.loseHealth(game.data.spearAttack);
            me.game.world.removeChild(this);
        }
    }
});