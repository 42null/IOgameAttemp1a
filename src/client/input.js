// Learn more about this file at:
// https://victorzhou.com/blog/build-an-io-game-part-1/#6-client-input-%EF%B8%8F
import { updateDirection, purchaseUpgrade, moveShipCommand } from './networking';
import { resources } from './networking';
const Constants = require('../shared/constants');
// import checkFromPosistion from '../shared/upgradeChecks';
const UpgradeChecks = require('../shared/upgradeChecks');



function onMouseInput(e) {
  handleInput(e.clientX, e.clientY);
}

function onTouchInput(e) {
  const touch = e.touches[0];
  handleInput(touch.clientX, touch.clientY);
}

function handleInput(x, y) {
  const dir = Math.atan2(x - window.innerWidth / 2, window.innerHeight / 2 - y);
  updateDirection(dir);
}

function onClick(x, y) {
  // const mouseClicked = true;
  // const dir = Math.atan2(x - window.innerWidth / 2, window.innerHeight / 2 - y);
  // updateDirection(dir);
  // updateClick(true);
}


function onKeyDown(event){
    const pressedKeyNum = event.keyCode;
    console.log("PRESSED= "+pressedKeyNum);
    if(pressedKeyNum == 87){    //W  //TODO: Make check off of settings
        moveShipCommand(1);//TODO: Get to work with single byte
    }else if(pressedKeyNum == 65){//A
        moveShipCommand(4);
    }else if(pressedKeyNum == 83){//S
        moveShipCommand(3);
    }else if(pressedKeyNum == 68){//D
        moveShipCommand(2);
    }else if(UpgradeChecks.checkFromPosistion(pressedKeyNum, resources)){
        purchaseUpgrade(pressedKeyNum, resources);
    }
}


export function startCapturingInput() {
  if(!Constants.CLICK_ONLY_DIRECTIONS){
    window.addEventListener('mousemove', onMouseInput);
  }
  window.addEventListener('click', onClick);
  window.addEventListener('touchstart', onTouchInput);
  window.addEventListener('touchmove', onTouchInput);
  window.addEventListener('keydown', onKeyDown);
}

export function stopCapturingInput() {
  window.removeEventListener('mousemove', onMouseInput);
  window.removeEventListener('click', onMouseInput);
  window.removeEventListener('touchstart', onTouchInput);
  window.removeEventListener('touchmove', onTouchInput);
  window.removeEventListener('keydown', onKeyDown);
}
