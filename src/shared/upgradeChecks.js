const Constants = require('../shared/constants');

// export const checkFromPosistion = (inputNumber) => {
// export default function checkFromPosistion(inputNumber){
const checkFromPosistion = (inputNumber, resoucesForClientSide) => {

    inputNumber = Math.trunc(inputNumber);
    
    console.log("PRESSED= "+inputNumber);
    console.log("this.metal = " + this.metal);
    // console.log("resoucesForClientSide.metal = " + resoucesForClientSide.metal);
    var isServer = false;
    try {
        // resoucesForClientSide.rocks;
            console.log("resoucesForClientSide.metal (is client) = " + resoucesForClientSide.metal);

    }catch(err){
        console.log("Error was caught so is not client");
        isServer = true;
    }
    //for First 9
    if(inputNumber >= 48 && inputNumber < 57){
        console.log("isServer = "+isServer);
        // console.log(this.instanceof Player);
        // if(isOnClientSide){
        //     purchaseUpgrade(inputNumber-48);
        // }else{
        //     purchaseUpgrade(inputNumber-48);
        // }
        if(inputNumber==49){/*1*/ return true;
                            
        }else if(inputNumber==50){/*2*/  
            // if(!isClient && (this.metal >= Constants.UPGRADE_HP_COST && this.hp < Constants.MAX_UPGRADEABLE_HP)){
    
            if(isServer && (this.players[socket.id].metal >= 50)){
                console.log("SECOND1");
                return true;
            // }if(resoucesForClientSide.metal >= Constants.UPGRADE_HP_COST && resoucesForClientSide.hp < Constants.MAX_UPGRADEABLE_HP) {
            }else{
               console.log("SECOND1 NOT "+this.metal); 
            }
            if(!isServer && resoucesForClientSide.metal >= 50) {
                console.log("SECOND2");
                return true;
            }else{
               console.log("SECOND2 NOT"); 
            }
            console.log("SECOND3");

        }else if(inputNumber==51){/*3*/  /*if(resources.numberOfMetal >= Constants.UPGRADE_HP_COST)  {return true;}*/
        }else if(inputNumber==52){
        }else if(inputNumber==53){
        }else if(inputNumber==54){
        }else if(inputNumber==55){
        }else if(inputNumber==56){
        }else if(inputNumber==57){
        }
    }else if(inputNumber==72){
        return true;
    }
    return false;
};



exports.checkFromPosistion = checkFromPosistion;
