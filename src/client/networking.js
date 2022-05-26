// Learn more about this file at:
// https://victorzhou.com/blog/build-an-io-game-part-1/#4-client-networking
import io from 'socket.io-client';
import { throttle } from 'throttle-debounce';
import { processGameUpdate } from './state';

const Constants = require('../shared/constants');

const socketProtocol = (window.location.protocol.includes('https')) ? 'wss' : 'ws';
const socket = io(`${socketProtocol}://${window.location.host}`, { reconnection: false });

export var resources = {
    numberOfRocks: 0,
    numberOfMetal: 0,
    numberOfNickel: 0
};


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
        // console.log("numberOfRocks = "+JSON.parse(combineMaterials.rocks));
        // console.log("numberOfmetal = "+JSON.parse(combineMaterials.metal));
        resources.numberOfRocks = JSON.parse(combineMaterials.rocks);
        resources.numberOfMetal = JSON.parse(combineMaterials.metal);
        resources.numberOfNickel = JSON.parse(combineMaterials.nickel);
        document.getElementById('rocks').innerHTML = 'Rocks: '+resources.numberOfRocks;
        document.getElementById('metal').innerHTML = 'Metal: '+resources.numberOfMetal;
        document.getElementById('nickel').innerHTML = 'Nickel: '+resources.numberOfNickel;
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

// // export const purchaseUpgrade = throttle(20, number => {
// export const purchaseUpgrade = number => {
//     console.log("INSIDE Esport const ");
//     if(1 <= number && number <= 9){
//       socket.emit(Constants.UPGRADE_ATTEMPT, number);
//     }
// // });
// };

export const purchaseUpgrade = throttle(2, dir => {
    console.log("WITHIN THROTTLE");
  socket.emit("Constants.UPGRADE_ATTEMPT", dir);
});