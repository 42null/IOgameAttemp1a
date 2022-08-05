const ObjectClass = require('./object');
const Constants = require('../shared/constants');

class Astroid extends ObjectClass {
    hp = -1;
    size = -1;
    type = 0; //Default
    mass = -1;
    
  constructor(id, size, x, y, type) {
    // super("A"+type+id, x, y, Math.random() * 2 * Math.PI, 0);
    super("A"+id, x, y, Math.random() * 2 * Math.PI, 70, size*100);//Size as mass
    this.mass = size*100;
  // this.x = x;
  //   this.y = y;
    // this.type = type;
    this.type = id.charAt(0);
    this.hp = size;
      // console.log(this.type);
    this.direction = Math.round(Math.random() * 6.283185 * 100);
    this.speed = Math.trunc(Math.random() * 50)/50;
      // this.speed = 1;
      // this.direction = 1;
  }
  // constructor(parentID, x, y, dir) {
  //   super(shortid(), x, y, dir, Constants.BULLET_SPEED);
  //   this.parentID = parentID;
  // }
  // Returns a newly created bullet, or null.
  update(dt) {
    // super.update(dt);
    // this.speed=1;
    //   this.direction=1;
      // this.x+=1;
      // this.y+=1;
    // this.x += dt * this.speed * Math.sin(this.direction);
    // this.y -= dt * this.speed * Math.cos(this.direction);
    this.x += this.speed * Math.sin(this.direction);
    this.y -= this.speed * Math.cos(this.direction);
    // Make sure the player stays in bounds

    // // console.log("this.speed = "+this.speed);
    //   // this.speed=1;
    if(this.x < 0 || this.x > Constants.MAP_SIZE){
        this.direction = 6.283185-this.direction;
        // this.speed = 6.283185-this.direction;
    }
    if(this.y < 0 || this.y > Constants.MAP_SIZE){
              this.direction = 3.1415925-this.direction;
    }

    // this.x = Math.max(0, Math.min(Constants.MAP_SIZE, this.x));
    // this.y = Math.max(0, Math.min(Constants.MAP_SIZE, this.y));
    return null;
  }

  takeBulletDamage(bullet) {
    this.hp -= Constants.BULLET_DAMAGE;
    if(this.hp <= 0){
        return true;
    }
    // this.size = 50-Math.log(this.hp+1)*8.5
    // this.size = Math.trunc((50-Math.log(this.hp+1)*8.5)*2);
    // this.size = Math.log(x+3)*10;
// console.log("Size = "+this.size);
// console.log("Hp = "+this.hp);

    super.addVelocityVectorRad(bullet.getDirection(), bullet.getVelocityEnegery());//bullet.getVelocity()/100);
    return false;
  }

  serializeForUpdate() {
    return {
      ...(super.serializeForUpdate()),
      direction: this.direction,
      hp: this.hp,
      type: this.type,
        speed: this.speed
    };
  }
}

module.exports = Astroid;
