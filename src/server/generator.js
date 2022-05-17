const Constants = require('../shared/constants');
const { MAP_SIZE } = Constants;


module.exports.generateAttackables = function(attackable, numberToGenerate, minSize, maxSize, type){//TODO: Make seedable
    newAttackables = [];
    var useType = type;
    for (let i = 0; i < numberToGenerate; i++) {
        if(type == -2){
            useType = Math.round(Math.random() * (3 - 1) + 1);
        }
        newAttackables.push(new attackable(
            Math.floor(Math.random()*1000),
            Math.random() * (maxSize - minSize) + minSize,
            Math.floor(Math.random()*MAP_SIZE),
            Math.floor(Math.random()*MAP_SIZE),
            useType
        ));
    }
    return newAttackables;
}
