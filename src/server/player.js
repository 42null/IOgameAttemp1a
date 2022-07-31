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
    this.fliped = false;

      //COUNTERS
    this.score = 0;
//UPDATES
    this.updatedRocks = false;
//MOVEMENT FOR RENDER
    this.thrusters = {
        north:{
            active: 0,
            angle: 0,
        },
        east:{
            active: 0,
            angle: 90,
            // angle: 120,
        },
        south:{
            active: 0,
            angle: 180,
        },
        west:{
            active: 0,
            angle: 270,
            // angle: 250,
        }
    };
//SHIP DATA
    this.mass = 5_000;
//POLAR MOVEMENT
    this.speed = 0;
    this.direction = 0;
//WEAPONS
    this.fireCooldown = 0;
    this.armamentDirection = 0;
//TIMERS
    this.boostSpeedTotalEnegeryAdd = 0;
    this.boostTime = 0;
//RESOURCES
    this.resources = {
        rocks: 0,
        metal: 0,
        nickel: 0
    };
  }

  // Returns a newly created bullet, or null.
  update(dt) {
    super.update(dt);
      
    // Update score
    this.score += dt * Constants.SCORE_PER_SECOND;
              this.energyForSpeed -= 1;//TODO: make dust

    //UPDATE SPEED & ENGINE DISPLAY
    if(this.boostTime > 0){
        this.boostTime-=1;
        var energyChange = Math.ceil(boostSpeedTotalEnegeryAdd/boostTime);
        boostSpeedTotalEnegeryAdd -= energyChange;
        this.energyForSpeed += boostSpeedTotalEnegeryAdd;

        recaculateSpeed();
    }

    //UPDATE THRUST DISLAY
      //TODO: Make else if?
    for (let x in this.thrusters) {
        if(this.thrusters[x].active > 0){
            this.thrusters[x].active -= 20;
        }
    } 
      
    // Make sure the player stays in bounds
    this.x = Math.max(0, Math.min(Constants.MAP_SIZE, this.x));
    this.y = Math.max(0, Math.min(Constants.MAP_SIZE, this.y));

    // Fire a bullet, if needed
    this.fireCooldown -= dt;
    if (this.fireCooldown <= 0 ) {
      this.fireCooldown += Constants.PLAYER_FIRE_COOLDOWN;
      return new Bullet(this.id, this.x, this.y, this.armamentDirection, Constants.BULLET_TIME_TICKS);
    }

    return null;
  }

    takeBulletDamage() {
        this.hp -= Constants.BULLET_DAMAGE;
    }

    recaculateSpeed(newMass){
        this.speed = (this.speed*this.mass) / newMass;
    }
    updateThrust(direction_, thrustEnergy){
        // console.log("direction = "+direction);
        // console.log("thrustEnergy = "+thrustEnergy);
        
        switch(direction_){
            case 1:
                direction_ = this.thrusters.north.angle;
                this.thrusters.north.active = 100;
                break;
            case 2:
                direction_ = this.thrusters.east.angle;
                this.thrusters.east.active = 100;
                break;
            case 3:
                direction_ = this.thrusters.south.angle;
                this.thrusters.south.active = 100;
                break;
            case 4:
                direction_ = this.thrusters.west.angle;
                this.thrusters.west.active = 100;
                break;
            default://TODO: Change
                break;
        }
        let oldDirectionSighn = this.direction;//(this.direction >= 0 && this.direction <= 90);
        // this.recaculateSpeed();

        //TODO: Make more efficent
        this.addVelocityVector((this.fliped? -1:1)*(this.direction*57.29578) + direction_, thrustEnergy);
        this.addVelocityVector((this.direction*57.29578) + direction_, (this.fliped? -1:1)*thrustEnergy);

                if(Math.abs(oldDirectionSighn - this.direction)<3.141594 && Math.abs(oldDirectionSighn - this.direction)>3.141592){
            // this.fliped = !this.fliped;
        }
        
        // console.log(this.direction);
        // console.log(this.speed);
        // console.log(Math.abs(oldDirectionSighn - this.direction))
        // console.log(this.fliped);
    }
    setArmamentDirection(newDirection){
        this.armamentDirection = newDirection;
    }
    
    
    boost(ticks){
        this.boostSpeed += ticks;
    }
    
    
    purchaseUpgrade(upgradeSlot){
        // console.log("upgradeSlot = "+ upgradeSlot);
        // console.log("Inside of purchaseUpgrable about to do upgradeChecks on server side");
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
        }else if(upgradeSlot==52){/*4*/
            this.direction = 0;
            this.speed = 0;
        }else if(upgradeSlot==53){/*5*/
            this.addVelocityVector(-90,10);
        }else if(upgradeSlot==54){
        }else if(upgradeSlot==55){
        }else if(upgradeSlot==56){
        }else if(upgradeSlot==57){
        }else if(upgradeSlot==72){
            this.resources.metal += 500
            
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
    // console.log("~~~~ = "+this.thrusters.north.active);

    return {
    // const returnable = {
        ...(super.serializeForUpdate()),
        direction: this.direction,
        hp: this.hp,
        rocks: this.resources.rocks,
        // thrusters: this.thrusters
        northActive: this.thrusters.north.active,
        eastActive: this.thrusters.east.active,
        southActive: this.thrusters.south.active,
        westActive: this.thrusters.west.active,
        // // {
        //     north:{
        //         active: this.thrusters.north.active,
        //         angle: this.thrusters.north.angle,
        //     },
        //     east:{
        //         active: this.thrusters.east.active,
        //         angle: this.thrusters.east.angle,
        //     },
        //     south:{
        //         active: this.thrusters.south.active,
        //         angle: this.thrusters.south.angle,
        //     },
        //     west:{
        //         active: this.thrusters.west.active,
        //         angle: this.thrusters.west.angle,
        //     }
        // }
    };

    // return returnable;
  }
}

module.exports = Player;
