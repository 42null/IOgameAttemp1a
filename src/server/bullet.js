const shortid = require('shortid');
const ObjectClass = require('./object');
const Constants = require('../shared/constants');

class Bullet extends ObjectClass {
    
  constructor(parentID, x, y, dir, ticksLeft, mass) {
    super(shortid(), x, y, dir, Constants.BULLET_SPEED);
    this.parentID = parentID;
    this.ticksLeft = ticksLeft;
    this.hit = 0;
    if(!mass){
        this.mass = Constants.BULLET_MASS;
    }else{
        this.mass = mass;
    }
  }
    
    getDirection(){
        return this.direction;
    }

    getVelocity(){
        return Constants.BULLET_SPEED;
    }

    getMass(){
        return this.mass;
    }
    
  // Returns true if the bullet should be destroyed
  update(dt) {
    super.update(dt);
    this.ticksLeft -= 1;
    return this.ticksLeft == 0 || this.x < 0 || this.x > Constants.MAP_SIZE || this.y < 0 || this.y > Constants.MAP_SIZE;
  }
}

module.exports = Bullet;
