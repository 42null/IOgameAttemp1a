const Constants = require('../shared/constants');

// Returns an array of bullets to be destroyed.
function applyBulletCollisions(players, astroids, bullets) {//TODO: Good off of not bullets
  const destroyedBullets = [];
  const destroyedAstroids = [];
  for (let i = 0; i < bullets.length; i++) {//TODO: Make it stop if all bullets are destroyed on players
    // Look for a player (who didn't create the bullet) to collide each bullet with.
    // As soon as we find one, break out of the loop to prevent double counting a bullet.
    for (let j = 0; j < players.length; j++) {
      const bullet = bullets[i];
      const player = players[j];
      if (
        bullet.parentID !== player.id &&
        player.distanceTo(bullet) <= Constants.PLAYER_RADIUS + Constants.BULLET_RADIUS
      ) {
        destroyedBullets.push(bullet);
        player.takeBulletDamage();
        break;
      }
    }
// For astroids
    for (let j = 0; j < astroids.length; j++) {
      const bullet = bullets[i];
      const astroid = astroids[j];
      if(astroid.distanceTo(bullet) <= Math.trunc(Math.log(astroid.hp+3)*12) + Constants.BULLET_RADIUS){
        destroyedBullets.push(bullet);
        if(astroid.takeBulletDamage()){
            destroyedAstroids.push(astroid);
        }
        break;
      }
    }
      
  }
  return{
    destroyedBullets: destroyedBullets,
    destroyedAstroids: destroyedAstroids,
  };
}

module.exports = applyBulletCollisions;
