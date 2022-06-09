const ObjectClass = require('./object');
const Bullet = require('./bullet');
const Constants = require('../shared/constants');
const upgradeChecks = require('../shared/upgradeChecks');

class Player extends ObjectClass {
  constructor(id, username, x, y) {
    super(id, x, y, Math.random() * 2 * Math.PI, Constants.PLAYER_SPEED);
    this.username = username;
      // if(username == "422"){
      //   this.hp = Constants.PLAYER_MAX_HP*10;
      // }else{
        this.hp = Constants.PLAYER_MAX_HP;
      // }
    // this.username = username+" ("+id+")";//@CHNAGED
    this.fireCooldown = 0;
    this.score = 0;
      
    this.updatedRocks = false;
    this.resources = {
        rocks: 0,
        metal: 0,
        nickel: 0
    };
    this.resources.rocks = 0;
    this.resources.metal = 0;
    this.resources.nickel = 0;

    this.boostSpeedTotalEnegeryAdd = 0;
    this.boostTime = 0;
  }

  // Returns a newly created bullet, or null.
  update(dt) {
    super.update(dt);

    // Update score
    this.score += dt * Constants.SCORE_PER_SECOND;

    //UPDATE SPEED & ENGINE DISPLAY
    if(this.boostTime > 0){
        this.boostTime-=1;
        this.speed
    }
      
    // Make sure the player stays in bounds
    this.x = Math.max(0, Math.min(Constants.MAP_SIZE, this.x));
    this.y = Math.max(0, Math.min(Constants.MAP_SIZE, this.y));

    // Fire a bullet, if needed
    this.fireCooldown -= dt;
    if (this.fireCooldown <= 0 ) {
      this.fireCooldown += Constants.PLAYER_FIRE_COOLDOWN;
      return new Bullet(this.id, this.x, this.y, this.direction, Constants.BULLET_TIME_TICKS);
    }

    return null;
  }

  takeBulletDamage() {
    this.hp -= Constants.BULLET_DAMAGE;
  }
    boost(ticks){
        this.boostSpeed += ticks;
    }

    purchaseUpgrade(upgradeSlot){
        console.log("upgradeSlot = "+ upgradeSlot);
        console.log("Inside of purchaseUpgrable about to do upgradeChecks on server side");
        if (!upgradeChecks.checkFromPosistion(upgradeSlot,this.resources)) return;
        
        if(upgradeSlot==49){//TODO: Make as switch
            this.hp -= 40;
            this.boost(500);
            
        }else if(upgradeSlot==50){
            this.resources.metal = this.resources.metal - 50;//Constants.UPGRADES_HP_CONST;
            this.hp += 50;
            // console.log("this.resources.metal = "+this.resources.metal);
            this.hp = Math.min(this.hp, Constants.MAX_UPGRADEABLE_HP)
            this.updatedRock = false;
            
        }else if(upgradeSlot==51){
            if(this.resources.metal >= Constants.UPGRADE_HP_COST){
                this.resources.metal = this.resources.metal - 50;//Constants.UPGRADES_HP_CONST;
                this.speed += 25;
                // console.log("this.resources.metal = "+this.resources.metal);
                this.hp = Math.min(this.hp, Constants.MAX_UPGRADEABLE_HP)
                this.updatedRock = false;
            }
            
        }else if(upgradeSlot==72){
            this.resources.metal += 50
            
        }
    }
    
  onDealtDamage(bullet) {
    const firstCharacter = bullet.hit.substr(0, 1);
    if(firstCharacter == "A"){//Astroid
        this.score += Constants.SCORE_ASTROID_HIT;
        const secondCharacter = bullet.hit.substr(1, 2);
        if(secondCharacter == "R"){//ROCK
            this.updatedRocks = false;
            this.resources.rocks += 5;
        }else if(secondCharacter == "M"){//METAL
            this.updatedRocks = false;
            this.resources.metal += 5;
        }else if(secondCharacter == "N"){//NICKEL
            this.updatedRocks = false;
            this.resources.nickel += 5;
        }
    }else if(firstCharacter == "P"){//Player
        this.score += Constants.SCORE_BULLET_HIT;
    }

  }

  serializeForUpdate() {
    return {
      ...(super.serializeForUpdate()),
      direction: this.direction,
      hp: this.hp,
      rocks: this.resources.rocks,
    };
  }
}

module.exports = Player;
