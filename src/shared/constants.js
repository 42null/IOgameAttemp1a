module.exports = Object.freeze({
  PLAYER_RADIUS: 10,
  PLAYER_MAX_HP: 100,
  PLAYER_SPEED: 70,
  PLAYER_FIRE_COOLDOWN: 0.1,

  BULLET_RADIUS: 3,
  BULLET_SPEED: 800,
  BULLET_DAMAGE: 10,
  BULLET_TIME_TICKS: 60,
    
  SCORE_BULLET_HIT: 200,
  SCORE_ASTROID_HIT: 1,
  SCORE_PER_SECOND: 0,

  UPGRADE_COLOR_COST: 1000,//N
  UPGRADE_HP_COST: 50,//N
    
  MAP_SIZE: 5000,
  MSG_TYPES: {
    JOIN_GAME: 'join_game',
    GAME_UPDATE: 'update',
    INPUT: 'input',
    CLICKED: 'clicked',
    GAME_OVER: 'dead',
    UPDATE_ROCKS: 'update_rocks',
    UPGRADE_ATTEMPT: 'attempt_upgrade',
  },

    CLICK_ONLY_DIRECTIONS: false,
});
