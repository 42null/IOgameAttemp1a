const Constants = require('../shared/constants');
const { MAP_SIZE } = Constants;


module.exports.generateAttackables = function(attackable, numberToGenerate, minSize, maxSize){//TODO: Make seedable
    newAttackables = [];
    for (let i = 0; i < numberToGenerate; i++) {
        newAttackables.push(new attackable(
            Math.floor(Math.random()*1000),
            Math.random() * (maxSize - minSize) + minSize,
            Math.floor(Math.random()*MAP_SIZE),
            Math.floor(Math.random()*MAP_SIZE)
        ));
    }
    return newAttackables;
}
