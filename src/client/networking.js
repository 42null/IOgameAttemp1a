// Learn more about this file at:
// https://victorzhou.com/blog/build-an-io-game-part-1/#4-client-networking
import io from 'socket.io-client';
import { throttle } from 'throttle-debounce';
import { processGameUpdate } from './state';

const Constants = require('../shared/constants');

const socketProtocol = (window.location.protocol.includes('https')) ? 'wss' : 'ws';
const socket = io(`${socketProtocol}://${window.location.host}`, { reconnection: false });

export var resources = {
    rocks: 0,
    metal: 0,
    nickel: 0
};
// resources.rocks = 0;
// resources.metal = 0;
// resources.nickel = 0;


const connectedPromise = new Promise(resolve => {
  socket.on('connect', () => {
    console.log('Connected to server!');
    resolve();
  });
});

export const connect = onGameOver => (
  connectedPromise.then(() => {
    // Register callbacks
    socket.on(Constants.MSG_TYPES.GAME_UPDATE, processGameUpdate);
    socket.on(Constants.MSG_TYPES.UPDATE_ROCKS, (combineMaterials) => {
        // console.log("rocks = "+JSON.parse(combineMaterials.rocks));
        // console.log("metal = "+JSON.parse(combineMaterials.metal));
        resources.rocks = JSON.parse(combineMaterials.rocks);
        resources.metal = JSON.parse(combineMaterials.metal);
        resources.nickel = JSON.parse(combineMaterials.nickel);
        document.getElementById('rocks').innerHTML = 'Rocks: '+resources.rocks;
        document.getElementById('metal').innerHTML = 'Metal: '+resources.metal;
        document.getElementById('nickel').innerHTML = 'Nickel: '+resources.nickel;
    });
    socket.on(Constants.MSG_TYPES.UPDATE_ROCKS, (combineMaterials) => {
        
    });
    socket.on(Constants.MSG_TYPES.GAME_OVER, onGameOver);
    socket.on('disconnect', () => {
      console.log('Disconnected from server.');
      document.getElementById('disconnect-modal').classList.remove('hidden');
      document.getElementById('reconnect-button').onclick = () => {
        window.location.reload();
      };
    });
  })
);

export const play = username => {
  socket.emit(Constants.MSG_TYPES.JOIN_GAME, username);
  document.getElementById('test').classList.remove('hidden');//SO IT ONLY RUNS ONCE
  document.getElementById('bottomUpgradeBar').classList.remove('hidden');//SO IT ONLY RUNS ONCE
};

export const updateDirection = throttle(20, dir => {
  socket.emit(Constants.MSG_TYPES.INPUT, dir);
});

export const updateClick = throttle(20, isClicked => {
    // socket.emit(Constants.MSG_TYPES.CLICKED, isClicked);
    // console.log("Clicked!");
});

// export const purchaseUpgrade = throttle(1, dir => {
//   socket.emit(Constants.MSG_TYPES.UPGRADE_ATTEMPT, dir);
// });

export const purchaseUpgrade = throttle(20, slot => {
    socket.emit(Constants.MSG_TYPES.UPGRADE_ATTEMPT, slot);
});

export const moveShipCommand = throttle(20, cardinalDirection => {
    socket.emit(Constants.MSG_TYPES.INPUT_MOVEMENT, cardinalDirection);
});