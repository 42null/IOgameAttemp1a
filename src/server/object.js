class Object {
  constructor(id, x, y, dir, speed, mass) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.direction = dir;
    this.speed = speed;
    if(!mass){
        this.mass = 999999999;
    }else{
        this.mass = mass;
    }
  }

  update(dt) {
    this.x += dt * this.speed * Math.sin(this.direction);
    this.y -= dt * this.speed * Math.cos(this.direction);
  }

  distanceTo(object) {
    const dx = this.x - object.x;
    const dy = this.y - object.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  setDirection(dir) {
    this.direction = dir;
  }

    
    addVelocityVector(angle, magnitude){//TODO: Make more efficent
        const DEBUG_MOVEMENT = false;
        // angle = angle*(180/Math.PI);
        angle = angle * 0.0174532925199;
        //Convert to Cartesion
        var existingX = Math.cos(this.direction)*this.speed;
        var existingY = Math.sin(this.direction)*this.speed;

        var addingX = Math.cos(angle)*magnitude;
        var addingY = Math.sin(angle)*magnitude;
        if(DEBUG_MOVEMENT){
            console.log("====================");
            console.log("Current X = "+existingX);
            console.log("Current Y = "+existingY);
            console.log("Current A = "+this.direction);
            console.log("======");
            console.log("Adding  X = "+addingX);
            console.log("Adding  Y = "+addingY);
            console.log("Adding  A = "+angle);
            console.log("======");
        }
        existingX += addingX;
        existingY += addingY;
        // existingX = Math.floor(existingX * 1000) / 1000;
        // existingY = Math.floor(existingY * 1000) / 1000;
        if(DEBUG_MOVEMENT){
            console.log("New     X = "+existingX);
            console.log("New     Y = "+existingY);
        }
        this.direction = Math.atan2(existingY,existingX);//*0.01745329252;
        if(DEBUG_MOVEMENT)
            console.log("New     A = "+this.direction);
        this.speed = Math.sqrt(Math.pow(existingX,2)+Math.pow(existingY,2));
    }

    addVelocityVectorRad(angle, magnitude){//TODO: Make more efficent
        const DEBUG_MOVEMENT = false;
        //Convert to Cartesion
        var existingX = Math.cos(this.direction)*this.speed*this.mass;
        var existingY = Math.sin(this.direction)*this.speed*this.mass;

        var addingX = Math.cos(angle)*magnitude;
        var addingY = Math.sin(angle)*magnitude;
        existingX += addingX;
        existingY += addingY;
        existingX /= this.mass;
        existingY /= this.mass;        // existingX = Math.floor(existingX * 1000) / 1000;
        // existingY = Math.floor(existingY * 1000) / 1000;
        this.direction = Math.atan2(existingY,existingX);//*0.01745329252;
        this.speed = Math.sqrt(Math.pow(existingX,2)+Math.pow(existingY,2));
    }
    
  serializeForUpdate() {
    return {
      id: this.id,
      x: this.x,
      y: this.y,
    };
  }
}

module.exports = Object;
