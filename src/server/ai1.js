const ObjectClass = require('./object');
const Constants = require('../shared/constants');

class AI1 extends ObjectClass {
    hp = -1;
    size = -1;
    type = 0; //Default
    mass = -1;
    
  constructor(id, size, x, y) {
    super("I"+id, x, y, Math.random() * 2 * Math.PI, 70, size*10000);//Size as mass
    this.mass = size*100;

    this.type = id.charAt(0);
    this.hp = size;
    this.direction = Math.round(Math.random() * 6.283185 * 100);
    this.speed = Math.trunc(Math.random() * 50)/50;

  }

  // Returns a newly created bullet, or null.
  update(dt) {
    this.x += this.speed * Math.sin(this.direction);
    this.y -= this.speed * Math.cos(this.direction);

    if(this.x < 0 || this.x > Constants.MAP_SIZE){
        this.direction = 6.283185-this.direction;
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

    super.addVelocityVectorRad(bullet.getDirection(), bullet.getVelocityEnegery());//bullet.getVelocity()/100);
    return false;
  }

  serializeForUpdate() {
    return {
      ...(super.serializeForUpdate()),
      direction: this.direction,
      hp: this.hp,
      // type: this.type,
        speed: this.speed
    };
  }
}

module.exports = AI1;
