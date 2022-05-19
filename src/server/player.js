const ObjectClass = require('./object');
const Bullet = require('./bullet');
const Constants = require('../shared/constants');

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
    this.rocks = 0;
  }

  // Returns a newly created bullet, or null.
  update(dt) {
    super.update(dt);

    // Update score
    this.score += dt * Constants.SCORE_PER_SECOND;

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

  onDealtDamage(bullet) {
    const firstCharacter = bullet.hit.substr(0, 1);
    if(firstCharacter == "A"){//Astroid
        this.score += Constants.SCORE_ASTROID_HIT;
        this.rocks += 5;
        this.updatedRocks = false;
    }else if(firstCharacter == "P"){//Player
        this.score += Constants.SCORE_BULLET_HIT;
    }

  }

  serializeForUpdate() {
    return {
      ...(super.serializeForUpdate()),
      direction: this.direction,
      hp: this.hp,
      rocks: this.rocks,
    };
  }
}

module.exports = Player;
