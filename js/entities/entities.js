
game.PlayerEntity = me.Entity.extend({
    init: function(x, y, settings){
        this.setSuper(x, y);
        this.setPlayerTimers();
        this.setAttributes();
        this.type = "PlayerEntity";
        this.setFlags();    
        
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
        
        this.addAnimation();
    
        this.renderable.setCurrentAnimation("idle");
    },
    
    setSuper: function(x, y) {
        this._super(me.Entity, 'init', [x, y, {
                image: "player",
                width: 64,
                height: 64,
                spritewidth: "64",
                spriteheight: "64",
                getShape: function() {
                    return(new me.Rect(0, 0, 64, 64)).toPolygon();
                }
            }]);
    },
    
    setPlayerTimers: function(){
        this.now = new Date().getTime();
        this.lastHit = this.now;
        this.lastSpear = this.now;
        this.lastAttack = new Date().getTime();
    },
    
    setAttributes: function(){
        this.health = game.data.playerHealth;
        this.body.setVelocity(game.data.playerMoveSpeed, 20);
        this.attack = game.data.playerAttack;
    },
    
    setFlags: function(){
        //keeps track of which  direction your character is going
        this.facing = "right";
        this.dead = false;
        this.attacking = false;
    },
    
    addAnimation: function(){
        this.renderable.addAnimation("idle", [78]);
        this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
        this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);
    },
    
    update: function(delta){
        this.now = new Date().getTime();       
        this.dead = this.checkIfDead();        
        this.checkKeyPressedAndMove();
        this.checkAbilityKey();
        this.setAnimation();        
        me.collision.check(this, true, this.collideHandler.bind(this), true);
        this.body.update(delta);        
        this._super(me.Entity, "update", [delta]);
        return true;
    },
    
    checkIfDead: function(){
        if(this.health <= 0){
            return true;
        }
        return false;
    },
//    these allow us to check if a button is pressed and then allow our character to move in the corresponding direction
    checkKeyPressedAndMove: function(){
        if(me.input.isKeyPressed("right")){
            this.moveRight();
        }else if(me.input.isKeyPressed("left")){
            this.moveLeft();
        }else{
            this.body.vel.x = 0;
        }
                if(me.input.isKeyPressed("up") && !this.jumping && !this.falling){
            this.jump();
        }
        
        if(this.body.vel.y === 0){
            this.jumping = false;
        }
        
        this.attacking = me.input.isKeyPressed("attack");
    },
    
    moveRight: function(){
            //adds the position of my x by the velocity defined above in
            //setVelocity() and multiplying it by me.timer.tick.
            //me.timer.tick makes the movement look smooth
            this.body.vel.x += this.body.accel.x * me.timer.tick;
            this.facing = "right";
            this.flipX(true);
    },
    
    moveLeft: function(){
            this.facing = "left";
            this.body.vel.x -=this.body.accel.x * me.timer.tick;
            this.flipX(false);
    },
    
    jump: function(){
        this.jumping = true;
        this.body.vel.y -= this.body.accel.y * me.timer.tick;
    },
//    this lets us use some other keys for our special  abilities
    checkAbilityKey: function(){
        if(me.input.isKeyPressed("skill1")){
            //this.speedBurst();
        }else if(me.input.isKeyPressed("skill2")){
            //this.eatCreep();
        }else if(me.input.isKeyPressed("skill3")){
            this.throwSpear();
        }
    },
//    this has to do with our spear throw and the timer of when we can throw it
    throwSpear: function(){
        if((this.now-this.lastSpear) >= game.data.spearTimer*1000 && game.data.ability3 > 0){
            this.lastSpear = this.now;
            var spear = me.pool.pull("spear", this.pos.x, this.pos.y, {}, this.facing);
            me.game.world.addChild(spear, 10);
        }    
    },
    
    setAnimation: function(){
                if(this.attacking) {
            if (!this.renderable.isCurrentAnimation("attack")) {
                //sets the current animation to attack and once thats over goes back to idle animation
                this.renderable.setCurrentAnimation("attack", "idle");
                //makes it so  that the next time we start this sequence we begin from the first animation,
                //not wherever we left off when we switched to another 
                this.renderable.setAnimationFrame();
            }
        }
        else if(this.body.vel.x !== 0 && !this.renderable.isCurrentAnimation("attack")){
            if (!this.renderable.isCurrentAnimation("walk")) {
                this.renderable.setCurrentAnimation("walk");
            }
        }else if(!this.renderable.isCurrentAnimation("attack")){
            this.renderable.setCurrentAnimation("idle");
        }
    },
    
    loseHealth: function(damage){
        this.health = this.health - damage;
    },
    
    collideHandler: function(response){
        if(response.b.type==='EnemyBaseEntity'){
            this.collideWithEnemyBase(response);
        }else if(response.b.type==='EnemyCreep'){
            this.collideWithEnemyCreep(response);
        }
    },
    
    collideWithEnemyBase: function(response){
            var ydif = this.pos.y - response.b.pos.y;
            var xdif = this.pos.x - response.b.pos.x;            
            if(ydif<-40 && xdif<70 && xdif>-35){
                this.body.falling = false;
                this.body.vel.y = -1;
            }
            else if(xdif>-35 && this.facing==='right' &&(xdif<0)){
                this.body.vel.x = 0;
            }else if(xdif<70 && this.facing==='left' && xdif>0){
                this.body.vel.x =0;
            }            
            if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= game.data.playerAttackTimer){
                this.lastHit = this.now;
                response.b.loseHealth(game.data.playerAttack);
            }
    },
    
    collideWithEnemyCreep: function(response){        
            var xdif = this.pos.x - response.b.pos.x;
            var ydif = this.pos.y - response.b.pos.y;           
            this.stopMovement(xdif);           
            if(this.checkAttack(xdif, ydif)){
                this.hitCreep(response);
            };
    },
    
    stopMovement: function(xdif){
        if(xdif>0){
                if(this.facing==="left"){
                    this.body.vel.x = 0;
                }
            }else{
                if (this.facing === "right") {
                    this.body.vel.x = 0;
                }
            } 
    },
    
    checkAttack: function(xdif, ydif){
                if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= game.data.playerAttackTimer
                    && (Math.abs(ydif) <=40) && 
                    (((xdif>0) && this.facing==="left") || ((xdif<0) && this.facing==="right"))
                    ){
                this.lastHit = this.now;
                return true;
            }
            return false;
    },
    
    hitCreep: function(response){
                //if the creep health is less than attack, execute code in if statement
                if(response.b.health <= game.data.playerAttack){
                    //adds one gold for a creep kill
                    game.data.gold += 1;
                }                
                response.b.loseHealth(game.data.playerAttack);
    }
});