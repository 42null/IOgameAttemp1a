const Constants = require('../shared/constants');

// export const checkFromPosistion = (inputNumber) => {
// export default function checkFromPosistion(inputNumber){
const checkFromPosistion = (inputNumber, resoucesForClientSide) => {

    inputNumber = Math.trunc(inputNumber);
    
    // console.log("resoucesForClientSide.metal = " + resoucesForClientSide.metal);
    var isServer = false;
    try {
        // resoucesForClientSide.rocks;
            // console.log("resoucesForClientSide.metal (is client) = " + resoucesForClientSide.metal);

    }catch(err){
        console.log("Error was caught so is not client");
        isServer = true;
    }
    //for First 9
    if(inputNumber >= 48 && inputNumber < 57){
        // console.log("isServer = "+isServer);
        // console.log(this.instanceof Player);
        // if(isOnClientSide){
        //     purchaseUpgrade(inputNumber-48);
        // }else{
        //     purchaseUpgrade(inputNumber-48);
        // }
        if(inputNumber==49){/*1*/ return true;
                            
        }else if(inputNumber==50){/*2*/  
    
            // if(isServer && (this.players[socket.id].metal >= Constants.UPGRADE_HP_COST) && (this.players[socket.id].hp < Constants.MAX_UPGRADEABLE_HP)){
            if(isServer && (this.players[socket.id].metal >= 50)){
                return true;
            }else{
            }
            // if(!isServer && (resoucesForClientSide.metal >= Constants.UPGRADE_HP_COST) && (resoucesForClientSide.hp < Constants.MAX_UPGRADEABLE_HP)) {
            if(!isServer && (resoucesForClientSide.metal >= Constants.UPGRADE_HP_COST)) {
                return true;
            }else{
            }
            return false;
        }else if(inputNumber==51){/*3*/  /*if(resources.numberOfMetal >= Constants.UPGRADE_HP_COST)  {return true;}*/
        }else if(inputNumber==52){/*4*/
            return true;
        }else if(inputNumber==53){/*5*/
            return true;
        }else if(inputNumber==54){
        }else if(inputNumber==55){
        }else if(inputNumber==56){
        }else if(inputNumber==57){
            throw new Error();
        }
    }else if(inputNumber==72){
        return true;
    }
    return false;
};



exports.checkFromPosistion = checkFromPosistion;
