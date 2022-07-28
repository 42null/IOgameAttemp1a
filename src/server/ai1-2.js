// const ObjectClass = require('./object');
// const Bullet = require('./bullet');
// const Constants = require('../shared/constants');
// const upgradeChecks = require('../shared/upgradeChecks');

// class Ai1 extends ObjectClass {
//   constructor(id, name, x, y) {
//   super("A"+id, x, y, Math.random() * 2 * Math.PI, 70);
//     // super(id, x, y, Math.random() * 2 * Math.PI, Constants.PLAYER_SPEED);
//     this.title = name;

//     this.hp = Constants.PLAYER_MAX_HP;
//     this.speed = 0;
//     this.direction = 0;
// // //WEAPONS
// //     this.fireCooldown = 0;
// //     this.armamentDirection = 0;
// // //TIMERS
// //     this.boostSpeedTotalEnegeryAdd = 0;
// //     this.boostTime = 0;
// // //RESOURCES
// //     this.resources = {
// //         rocks: 0,
// //         metal: 0,
// //         nickel: 0
// //     };
//   }

//   // Returns a newly created bullet, or null.
//   update(dt) {
//     // super.update(dt);
      
//     // // Update score
//     // this.score += dt * Constants.SCORE_PER_SECOND;
//     //           this.energyForSpeed -= 1;//TODO: make dust

//     // //UPDATE SPEED & ENGINE DISPLAY
//     // if(this.boostTime > 0){
//     //     this.boostTime-=1;
//     //     var energyChange = Math.ceil(boostSpeedTotalEnegeryAdd/boostTime);
//     //     boostSpeedTotalEnegeryAdd -= energyChange;
//     //     this.energyForSpeed += boostSpeedTotalEnegeryAdd;

//     //     recaculateSpeed();
//     // }

//     // //UPDATE THRUST DISLAY
//     //   //TODO: Make else if?
//     // for (let x in this.thrusters) {
//     //     if(this.thrusters[x].active > 0){
//     //         this.thrusters[x].active -= 20;
//     //     }
//     // } 
      
//     // // Make sure the player stays in bounds
//     // this.x = Math.max(0, Math.min(Constants.MAP_SIZE, this.x));
//     // this.y = Math.max(0, Math.min(Constants.MAP_SIZE, this.y));

//     // // Fire a bullet, if needed
//     // this.fireCooldown -= dt;
//     // if (this.fireCooldown <= 0 ) {
//     //   this.fireCooldown += Constants.PLAYER_FIRE_COOLDOWN;
//     //   return new Bullet(this.id, this.x, this.y, this.armamentDirection, Constants.BULLET_TIME_TICKS);
//     // }

//     return null;
//   }

//     takeBulletDamage() {
//         this.hp -= Constants.BULLET_DAMAGE;
//     }

//     recaculateSpeed(newMass){
//         this.speed = (this.speed*this.mass) / newMass;
//     }
//     updateThrust(direction_, thrustEnergy){
//         // // console.log("direction = "+direction);
//         // // console.log("thrustEnergy = "+thrustEnergy);
        
//         // switch(direction_){
//         //     case 1:
//         //         direction_ = this.thrusters.north.angle;
//         //         this.thrusters.north.active = 100;
//         //         break;
//         //     case 2:
//         //         direction_ = this.thrusters.east.angle;
//         //         this.thrusters.east.active = 100;
//         //         break;
//         //     case 3:
//         //         direction_ = this.thrusters.south.angle;
//         //         this.thrusters.south.active = 100;
//         //         break;
//         //     case 4:
//         //         direction_ = this.thrusters.west.angle;
//         //         this.thrusters.west.active = 100;
//         //         break;
//         //     default://TODO: Change
//         //         break;
//         // }
//         // let oldDirectionSighn = this.direction;//(this.direction >= 0 && this.direction <= 90);
//         // // this.recaculateSpeed();

//         // //TODO: Make more efficent
//         // this.addVelocityVector((this.fliped? -1:1)*(this.direction*57.29578) + direction_, thrustEnergy);
//         // this.addVelocityVector((this.direction*57.29578) + direction_, (this.fliped? -1:1)*thrustEnergy);

//         //         if(Math.abs(oldDirectionSighn - this.direction)<3.141594 && Math.abs(oldDirectionSighn - this.direction)>3.141592){
//         //     // this.fliped = !this.fliped;
//         // }
        
//         // // console.log(this.direction);
//         // // console.log(this.speed);
//         // console.log(Math.abs(oldDirectionSighn - this.direction))
//         // console.log(this.fliped);
//     }
//     setArmamentDirection(newDirection){
//         this.armamentDirection = newDirection;
//     }
    
    
//     boost(ticks){
//         this.boostSpeed += ticks;
//     }
    
//     addVelocityVector(angle, magnitude){//TODO: Make more efficent
//         // const DEBUG_MOVEMENT = false;
//         // // angle = angle*(180/Math.PI);
//         // angle = angle * 0.0174532925199;
//         // //Convert to Cartesion
//         // var existingX = Math.cos(this.direction)*this.speed;
//         // var existingY = Math.sin(this.direction)*this.speed;

//         // var addingX = Math.cos(angle)*magnitude;
//         // var addingY = Math.sin(angle)*magnitude;
//         // existingX += addingX;
//         // existingY += addingY;
//         // // existingX = Math.floor(existingX * 1000) / 1000;
//         // // existingY = Math.floor(existingY * 1000) / 1000;
//         // this.direction = Math.atan2(existingY,existingX);//*0.01745329252;
//         // this.speed = Math.sqrt(Math.pow(existingX,2)+Math.pow(existingY,2));
//     }
    
    
//   onDealtDamage(bullet){
//   }

//   serializeForUpdate() {
//     // console.log("~~~~ = "+this.thrusters.north.active);

//     return {
//     // const returnable = {
//         ...(super.serializeForUpdate()),
//         direction: this.direction,
//         hp: this.hp,
//     };

//     // return returnable;
//   }
// }

// module.exports = Ai1;
