const Constants = require('../shared/constants');
const Player = require('./player');
const Astroid = require('./astroid');
const applyBulletCollisions = require('./collisions');

const Generator = require('./generator');
// import { generateAttackables } from './generator';


function compareLists(list1, list2) {
  var newList = [];
  for (var i = 0; i < list1.length; i++) {
    if (!list2.includes(list1[i])) {
      newList.push(list1[i]);
    }
  }
  return newList;
}


class Game {
  constructor() {
    this.sockets = {};
    this.players = {};
    this.bullets = [];
    this.astroids = [];
    this.lastUpdateTime = Date.now();
    this.shouldSendUpdate = false;
    setInterval(this.update.bind(this), 1000 / 60);


    // this.astroids = this.astroids.concat(Generator.generateAttackables(Astroid, Math.trunc(Math.pow(Constants.MAP_SIZE/100,2)/30),10,100,1));
    this.astroids = this.astroids.concat(Generator.generateAttackables(Astroid, Math.trunc(Math.pow(Constants.MAP_SIZE/100,2)/30),10,1000,-2));
  }

  addPlayer(socket, username) {
    this.sockets[socket.id] = socket;

    // Generate a position to start this player at.
    const x = Constants.MAP_SIZE * (0.25 + Math.random() * 0.5);
    const y = Constants.MAP_SIZE * (0.25 + Math.random() * 0.5);
    this.players[socket.id] = new Player(socket.id, username, x, y);
  }

  removePlayer(socket) {
    delete this.sockets[socket.id];
    delete this.players[socket.id];
  }

  handleInput(socket, dir) {
    if (this.players[socket.id]) {
      this.players[socket.id].setArmamentDirection(dir);
    }
  }

    handleInputMovementKeys(socket, cardinalDirection) {
        if (this.players[socket.id]) {
            // switch(cardinalDirectiondir){
            //     //Movements are for thrust
            //     case(1)://North
            //         newDirection
            //         break;
            //     default:
            //         return;
            // }
            const newDirection = cardinalDirection;//(cardinalDirection-1)*90;
            // console.log("newDirection = "+newDirection);
            this.players[socket.id].updateThrust(newDirection,10);
        }
    }

  upgradeShip(socket, upgradeSlot) {
      // console.log("Attempt at upgradeShip from within game");
    if (this.players[socket.id]) {
        this.players[socket.id].purchaseUpgrade(upgradeSlot);
    }
  }
    
  update() {
    // Calculate time elapsed
    const now = Date.now();
    const dt = (now - this.lastUpdateTime) / 1000;
    this.lastUpdateTime = now;

    // Update each bullet
    const bulletsToRemove = [];
    this.bullets.forEach(bullet => {
      if (bullet.update(dt)) {
        // Destroy this bullet
        bulletsToRemove.push(bullet);
      }
    });
    this.bullets = this.bullets.filter(bullet => !bulletsToRemove.includes(bullet));

    // Update each player
    Object.keys(this.sockets).forEach(playerID => {
      const player = this.players[playerID];
      const newBullet = player.update(dt);
      if (newBullet) {
        this.bullets.push(newBullet);
      }
    });

    // Apply collisions, give players score for hitting bullets
    const {destroyedBullets, destroyedAstroids} = applyBulletCollisions(Object.values(this.players),Object.values(this.astroids), this.bullets);


    destroyedBullets.forEach(b => {
      if (this.players[b.parentID]) {
        this.players[b.parentID].onDealtDamage(b);
      }
      // else if(this.astroids[b.parentID]){
      //     console.log("attemptint to remove at "+b.parentID);
      //     this.astroids[b.parentID] = null;
      //   // this.astroids.splice(b.parentID, 1);
      // }
    });
    this.bullets = this.bullets.filter(bullet => !destroyedBullets.includes(bullet));
    destroyedBullets.forEach(b => {
      if (this.players[b.parentID]) {
        this.players[b.parentID].onDealtDamage(b);
      }
    });

    this.astroids = compareLists(this.astroids, destroyedAstroids);
    this.astroids = this.astroids.concat(Generator.generateAttackables(Astroid, destroyedAstroids.length,10,100,-2));
      
    // Check if any players are dead
    Object.keys(this.sockets).forEach(playerID => {
      const socket = this.sockets[playerID];
      const player = this.players[playerID];
      if (player.hp <= 0) {
        socket.emit(Constants.MSG_TYPES.GAME_OVER);
        this.removePlayer(socket);
      }
        
      if (!player.updatedRocks) {
        socket.emit(Constants.MSG_TYPES.UPDATE_ROCKS,{ rocks: player.resources.rocks, metal: player.resources.metal, nickel: player.resources.nickel });
        player.updatedRocks = true;
      }
    });

    // Send a game update to each player every other time
    if (this.shouldSendUpdate) {
      const leaderboard = this.getLeaderboard();
      Object.keys(this.sockets).forEach(playerID => {
        const socket = this.sockets[playerID];
        const player = this.players[playerID];
        socket.emit(Constants.MSG_TYPES.GAME_UPDATE, this.createUpdate(player, leaderboard));
      });
      this.shouldSendUpdate = false;
    } else {
      this.shouldSendUpdate = true;
    }
  }

  getLeaderboard() {
    return Object.values(this.players)
      .sort((p1, p2) => p2.score - p1.score)
      .slice(0, 5)
      .map(p => ({ username: p.username, score: Math.round(p.score) }));
  }

  createUpdate(player, leaderboard) {
    const nearbyPlayers = Object.values(this.players).filter(
      p => p !== player && p.distanceTo(player) <= Constants.MAP_SIZE / 2,
    );
    const nearbyBullets = this.bullets.filter(
      b => b.distanceTo(player) <= Constants.MAP_SIZE / 2,
    );
    const nearbyAstroids = this.astroids.filter(
      a => a.distanceTo(player) <= Constants.MAP_SIZE / 2,
    );
      
    return {
      t: Date.now(),
      me: player.serializeForUpdate(),
      others: nearbyPlayers.map(p => p.serializeForUpdate()),
      bullets: nearbyBullets.map(b => b.serializeForUpdate()),
      astroids: nearbyAstroids.map(a => a.serializeForUpdate()),
      leaderboard,
    };
  }
}

module.exports = Game;
