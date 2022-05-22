module.exports = Object.freeze({
  PLAYER_RADIUS: 20,
  PLAYER_MAX_HP: 100,
  PLAYER_SPEED: 100,
  PLAYER_FIRE_COOLDOWN: 0.1,

  BULLET_RADIUS: 3,
  BULLET_SPEED: 800,
  BULLET_DAMAGE: 10,
  BULLET_TIME_TICKS: 70,
    
  SCORE_BULLET_HIT: 200,
  SCORE_ASTROID_HIT: 1,
  SCORE_PER_SECOND: 0,

  MAP_SIZE: 5000,
  MSG_TYPES: {
    JOIN_GAME: 'join_game',
    GAME_UPDATE: 'update',
    INPUT: 'input',
    CLICKED: 'clicked',
    GAME_OVER: 'dead',
    UPDATE_ROCKS: 'update_rocks',
  },

    CLICK_ONLY_DIRECTIONS: false,
});
