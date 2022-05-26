// Learn more about this file at:
// https://victorzhou.com/blog/build-an-io-game-part-1/#6-client-input-%EF%B8%8F
import { updateDirection } from './networking';
import { purchaseUpgrade } from './networking';
import { resources } from './networking';
const Constants = require('../shared/constants');

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
  const mouseClicked = true;
  updateDirection(dir);
  updateClick(true);
}

function onKeyDown(event){
    const pressedKeyNum = event.keyCode;
    console.log("PRESSED = "+event.keyCode);
    if(pressedKeyNum==49){
        if(resources.numberOfNickel >= Constants.UPGRADE_COLOR_COST){
            purchaseUpgrade(1);
        }
    }else if(pressedKeyNum==50){
        if(resources.numberOfNickel >= Constants.UPGRADE_HP_COST){
            console.log("PRESSED ATTEMPTING HP COST");
            purchaseUpgrade(2);
            const x=0;
            const y=0;
              const dir = Math.atan2(x - window.innerWidth / 2, window.innerHeight / 2 - y);

            updateDirection(dir);
            purchaseUpgrade(2);
        }
    }else if(pressedKeyNum==51){
    }else if(pressedKeyNum==52){
    }else if(pressedKeyNum==53){
    }else if(pressedKeyNum==54){
    }else if(pressedKeyNum==55){
    }else if(pressedKeyNum==56){
    }else if(pressedKeyNum==57){
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
