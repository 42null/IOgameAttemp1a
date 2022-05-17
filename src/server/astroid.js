const ObjectClass = require('./object');
const Constants = require('../shared/constants');

class Astroid extends ObjectClass {
    hp = -1;
    size = -1;
    type = 0; //Default
    
  constructor(id, size, x, y, type) {
    super(id, x, y, Math.random() * 2 * Math.PI, 0);
    this.hp = size;
    this.type = type;
  }
  // constructor(parentID, x, y, dir) {
  //   super(shortid(), x, y, dir, Constants.BULLET_SPEED);
  //   this.parentID = parentID;
  // }
  // Returns a newly created bullet, or null.
  update(dt) {
    super.update(dt);

    // Make sure the player stays in bounds
    this.x = Math.max(0, Math.min(Constants.MAP_SIZE, this.x));
    this.y = Math.max(0, Math.min(Constants.MAP_SIZE, this.y));

    return null;
  }

  takeBulletDamage() {
    this.hp -= Constants.BULLET_DAMAGE;
    if(this.hp <= 0){
        return true;
    }
    // this.size = 50-Math.log(this.hp+1)*8.5
    // this.size = Math.trunc((50-Math.log(this.hp+1)*8.5)*2);
    // this.size = Math.log(x+3)*10;
// console.log("Size = "+this.size);
// console.log("Hp = "+this.hp);
      
    return false;
  }

  serializeForUpdate() {
    return {
      ...(super.serializeForUpdate()),
      direction: this.direction,
      hp: this.hp,
      type: this.type,
    };
  }
}

module.exports = Astroid;
