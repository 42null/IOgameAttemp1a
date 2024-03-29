const ObjectClass = require('./object');
const Constants = require('../shared/constants');
const Player = require('./player');

class AI1 extends ObjectClass {
    hp = -1;
    size = -1;
    type = 0; //Default
    mass = -1;

    // currentTarget
    // currentTargetX = Math.random() * Constants.MAP_SIZE;//-Constants.MAP_SIZE;
    // currentTargetY = Math.random() * Constants.MAP_SIZE;//-Constants.MAP_SIZE;
    currentTargetX = Constants.MAP_SIZE/2-500;
    currentTargetY = Constants.MAP_SIZE/2-500;
// BIAS
    
  constructor(id, size, x, y, target) {
    super("I"+id, x, y, Math.random() * 2 * Math.PI, 70, size*10000);//Size as mass
    this.mass = size*100;

    this.type = id.charAt(0);
    this.hp = size;
    this.direction = 0;// Math.round(Math.random() * 6.283185 * 100);
    // this.speed = Math.trunc(Math.random() * 50)/50;
    this.speed = Math.trunc(Math.random() * 500)/50;
    // this.speed = 0;;
    this.target = target;

  }

  update(dt) {
    // this.x += this.speed * Math.sin(this.direction);
    // this.y -= this.speed * Math.cos(this.direction);

    // if(this.x < 0){
    //     this.x += Constants.MAP_SIZE;
    // }else if(this.x > Constants.MAP_SIZE){
    //     this.x -= Constants.MAP_SIZE;
    // }
    // if(this.y < 0){
    //     this.y += Constants.MAP_SIZE;
    // }else if(this.y > Constants.MAP_SIZE){
    //     this.y -= Constants.MAP_SIZE;
    // }

      
    // var targetDirection = Math.atan2(this.currentTargetY, this.currentTargetX);
    // var diffrenceInDirection = this.direction - targetDirection;
    // if(diffrenceInDirection > 0)
    //     this.direction -= diffrenceInDirection/10;///10;
    // if(diffrenceInDirection < 0)
    //     this.direction += diffrenceInDirection/10;///10;

/*
    /| <-- here
   / |
  /  |
 /   |
----[]
*/
    // var angleOfUpper = Math.atan((this.currentTargetY-this.y)/(this.currentTargetY-this.x));
    //   this.direction += angleOfUpper/50;

    this.speed = this.speed*.95;

    var diffX;
    var diffY;
  // (a instanceof MyType)
    // if(this.target === null){
    //     diffX = this.currentTargetX-this.x;
    //     diffY = this.currentTargetY-this.y;
    // }else 
    if(this.target instanceof Player){
        diffX = this.target.getX()-this.x;
        diffY = this.target.getY()-this.y;
        diffX = this.target.x/*getX()*/-this.x;
        diffY = this.target.y/*getY()*/-this.y;
    }
    
      
    if(Math.sign(diffX)==1){
        super.addVelocityVectorRad(1.570796, Math.abs(diffX)/0.05);
    }else{
        super.addVelocityVectorRad(4.712389, Math.abs(diffX)/0.05);
    }
    if(Math.sign(diffY)==1){
        super.addVelocityVectorRad(0, Math.abs(diffY)/0.05);
    }else{
        super.addVelocityVectorRad(3.14159, Math.abs(diffY)/0.05);
    }
    
    this.x += this.speed * Math.sin(this.direction);
    this.y += this.speed * Math.cos(this.direction);
  
      
  // if(this.x < 0 || this.x > Constants.MAP_SIZE){
  //       this.direction = 6.283185-this.direction;
  //   }
  //   if(this.y < 0 || this.y > Constants.MAP_SIZE){
  //       this.direction = 3.1415925-this.direction;
  //   }

    if(Math.abs(diffX) < 70 && Math.abs(diffY)){
        // this.x = Math.random() * Constants.MAP_SIZE;
        // this.y = Math.random() * Constants.MAP_SIZE;
        this.speed += 50;
    }

    this.speed = Math.min(this.speed, 5);
    this.speed = Math.max(this.speed, -5);

      
    this.x = Math.max(0, Math.min(Constants.MAP_SIZE, this.x));
    this.y = Math.max(0, Math.min(Constants.MAP_SIZE, this.y));
      
    return null;
  }

  takeBulletDamage(bullet) {
    this.hp -= Constants.BULLET_DAMAGE;
    if(this.hp <= 0){
        return true;
    }

    super.addVelocityVectorRad(bullet.getDirection(), bullet.getVelocityEnegery());//bullet.getVelocity()/100);
    return false;
  }

  serializeForUpdate() {
    return {
      ...(super.serializeForUpdate()),
      direction: this.direction,
      hp: this.hp,
      // type: this.type,
        speed: this.speed,
        northActive: true,
        eastActive: false,
        southActive: false,
        westActive: false,
    };
  }
}

module.exports = AI1;
