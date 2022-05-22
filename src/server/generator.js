const Constants = require('../shared/constants');
const { MAP_SIZE } = Constants;

var numberGenerated = 0;

module.exports.generateAttackables = function(attackable, numberToGenerate, minSize, maxSize, type){//TODO: Make seedable
    newAttackables = [];
    var useType = type;
    var typeChar = "E";//TODO: IS THIS NESSERY? THE WHOLE AS PART OF ID THING?
    for (let i = 0; i < numberToGenerate; i++) {
        if(type == -2){
            useType = Math.round(Math.random() * (3 - 1) + 1);
        }
        switch(useType){
            case 2:
                typeChar = "M"
                break;
            case 3:
                typeChar = "N";
                break;
            default:
                typeChar = "R";     
        }
        newAttackables.push(new attackable(
            typeChar+(numberGenerated++),
            Math.random() * (maxSize - minSize) + minSize,
            Math.floor(Math.random()*MAP_SIZE),
            Math.floor(Math.random()*MAP_SIZE),
            useType
        ));
    }
    return newAttackables;
}
