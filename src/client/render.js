// Learn more about this file at:
// https://victorzhou.com/blog/build-an-io-game-part-1/#5-client-rendering
import { debounce } from 'throttle-debounce';
import { getAsset } from './assets';
import { getCurrentState } from './state';

const Constants = require('../shared/constants');

const { PLAYER_RADIUS, PLAYER_MAX_HP, BULLET_RADIUS, MAP_SIZE } = Constants;

// Get the canvas graphics context
const canvas = document.getElementById('game-canvas');
const context = canvas.getContext('2d');
setCanvasDimensions();

function setCanvasDimensions() {
  // On small screens (e.g. phones), we want to "zoom out" so players can still see at least
  // 800 in-game units of width.
  const scaleRatio = Math.max(1, 800 / window.innerWidth);
  canvas.width = scaleRatio * window.innerWidth;
  canvas.height = scaleRatio * window.innerHeight;
}

window.addEventListener('resize', debounce(40, setCanvasDimensions));

let animationFrameRequestId;

function render() {
  const { me, others, bullets, astroids, ais} = getCurrentState();
  if (me) {
    // Draw background
    renderBackground(me.x, me.y);

    // Draw boundaries
    context.strokeStyle = 'black';
    context.lineWidth = 1;
    context.strokeRect(canvas.width / 2 - me.x, canvas.height / 2 - me.y, MAP_SIZE, MAP_SIZE);

    // Draw all bullets
    bullets.forEach(renderBullet.bind(null, me));
    // Draw all players
    renderPlayer(me, me);
    others.forEach(renderPlayer.bind(null, me));
    // Draw all ai's
    ais.forEach(renderAI.bind(null, me));
    // Draw all astroids
    astroids.forEach(renderAstroid.bind(null, me));

    renderGUI(me.x, me.y);
  }

  // Rerun this render function on the next frame
  animationFrameRequestId = requestAnimationFrame(render);
}

function renderGUI(x, y){
//RENDER MAP
    //Render map box & player
    var radiusToUse = 2;//player.hp/PLAYER_MAX_HP*2;

    context.strokeStyle = "#FFFFFF";
    context.beginPath();
    context.strokeRect(20, 20, 130, 130);
    
    context.arc((x/MAP_SIZE)*130+20, (y/MAP_SIZE)*130+20, radiusToUse, 0, 2 * Math.PI);
    context.strokeStyle = "#FF0000";
    context.strokeRect(20, 20, 130, 130);
    context.arc((x/MAP_SIZE)*130+20, (y/MAP_SIZE)*130+20, radiusToUse, 0, 2 * Math.PI);
    context.stroke();

    
    context.strokeStyle = "#990000";
    context.beginPath();
    context.moveTo(130/2+20, 20);
    context.lineTo(130/2+20, 150);
    context.moveTo(20, 130/2+20, 20);
    context.lineTo(150, 130/2+20, 150);
    context.stroke();


//Player on top of everything //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    context.fillStyle = "#FFFF00";
    context.beginPath();
    context.moveTo(x,y);
    context.arc(x,y,radiusToUse,0,2*Math.PI);
    context.closePath();
    context.fill();
}

function renderBackground(x, y) {
  const backgroundX = MAP_SIZE / 2 - x + canvas.width / 2;
  const backgroundY = MAP_SIZE / 2 - y + canvas.height / 2;
  // const backgroundGradient = context.createRadialGradient(
  //   backgroundX,
  //   backgroundY,
  //   MAP_SIZE / 10,
  //   backgroundX,
  //   backgroundY,
  //   MAP_SIZE / 2,
  // );
  const backgroundGradient = context.createRadialGradient
      (
    backgroundX,
    backgroundY,
    MAP_SIZE / 10,
    backgroundX,
    backgroundY,
    MAP_SIZE / 2,
  );
  backgroundGradient.addColorStop(0, '#55cf9c');
  backgroundGradient.addColorStop(1, 'gray');
  context.fillStyle = backgroundGradient;
  context.fillRect(0, 0, canvas.width, canvas.height);


      const backgroundGradient2 = context.createRadialGradient
      (
    backgroundX,
    backgroundY,
    MAP_SIZE / 10,
    backgroundX,
    backgroundY,
    MAP_SIZE / 2,
  );

    
    context.beginPath();
    context.moveTo(canvas.width/2, canvas.height/2);
    context.lineTo(backgroundX, backgroundY);
    context.strokeStyle = "pink";
    context.stroke();

    context.strokeStyle = "#7c136030";
    for(var i=-100;i<100;i++){
        context.beginPath();
        context.moveTo(backgroundX+i*50, 10);
        context.lineTo(backgroundX+i*50, canvas.height-10);
        context.stroke();
        
        context.beginPath();
        context.moveTo(10, backgroundY+i*50);
        context.lineTo(canvas.width-10, backgroundY+i*50);
        context.stroke();
    }
    
    context.beginPath();
    context.moveTo(backgroundX, 10);
    context.lineTo(backgroundX, canvas.height-10);
    context.strokeStyle = "black";
    context.stroke();

    context.beginPath();
    context.moveTo(backgroundX, backgroundY);
    context.lineTo(canvas.width-10, backgroundY);
    context.strokeStyle = "black";
    context.stroke();

    context.beginPath();
    context.moveTo(10, backgroundY);
    context.lineTo(backgroundX, backgroundY);
    context.strokeStyle = "black";
    context.stroke();
}

// Renders a ship at the given coordinates
function renderPlayer(me, player) {
    const { x, y, direction, /*thrusters*/northActive, eastActive, southActive, westActive } = player;
    const canvasX = canvas.width / 2 + x - me.x;
    const canvasY = canvas.height / 2 + y - me.y;
    
    // Draw ship
    context.save();
    context.translate(canvasX, canvasY);
    context.rotate(direction);
    const use_player_radius = Math.round(PLAYER_RADIUS*(player.hp/PLAYER_MAX_HP))+5;
    context.drawImage(
    getAsset('ship.svg'),
        -use_player_radius,
        -use_player_radius,
        use_player_radius * 2,
        use_player_radius * 2,
    );
    // if(player.status.movement.up==1){
    // console.log("player.thrusters.north.active = "+northActive);

//THRUSTER PLUME RENDERING
    if(northActive > 0){//NORTH
        context.drawImage(
            getAsset('plumes/exaust_gif_1.gif'),
            -use_player_radius,
            use_player_radius*.1,
            use_player_radius * 2,
            use_player_radius * 2,
        );
    }
    context.rotate(1.570796);
    if(eastActive > 0){//EAST
        context.drawImage(
            getAsset('plumes/exaust_gif_1.gif'),
            -use_player_radius,
            +use_player_radius*.3,
            use_player_radius * 2,
            use_player_radius * 2,
        );
    }
    context.rotate(1.570796);
    if(southActive > 0){//SOUTH
        context.drawImage(
            getAsset('plumes/exaust_gif_1.gif'),
            -use_player_radius,
            use_player_radius * .7,
            use_player_radius * 2,
            use_player_radius * 2,
        );
    }
    context.rotate(1.570796);
    if(westActive > 0){//WEST
        context.drawImage(
            getAsset('plumes/exaust_gif_1.gif'),
            -use_player_radius,
            +use_player_radius*.3,
            use_player_radius * 2,
            use_player_radius * 2,
        );
    }
  context.restore();

  // Draw health bar
    context.fillStyle = '#3ec452';
    context.fillRect(
        canvasX - PLAYER_RADIUS - 1,
        canvasY + PLAYER_RADIUS + 7,
        PLAYER_RADIUS * 2+2,
        4,
    );
    
  context.fillStyle = 'white';
    context.fillRect(
        canvasX - PLAYER_RADIUS,
        canvasY + PLAYER_RADIUS + 8,
        PLAYER_RADIUS * 2,
        2,
    );
    context.fillStyle = '#3ec452';    
  context.fillRect(
    canvasX - PLAYER_RADIUS + PLAYER_RADIUS * 2 * player.hp / PLAYER_MAX_HP,
    canvasY + PLAYER_RADIUS + 7,
    PLAYER_RADIUS * 2 * (1 - player.hp / PLAYER_MAX_HP)+1,
    4,
  );
  if(player.hp < PLAYER_MAX_HP){
    context.fillStyle = 'red';
  }else{
    context.fillStyle = 'orange';
  }
  context.fillRect(
    canvasX - PLAYER_RADIUS + PLAYER_RADIUS * 2 * player.hp / PLAYER_MAX_HP - 1,
    canvasY + PLAYER_RADIUS + 8,
    PLAYER_RADIUS * 2 * (1 - player.hp / PLAYER_MAX_HP)+1,
    2,
  );
  // context.fillStyle = 'green';
  // context.fillRect(
  //   canvasX - PLAYER_RADIUS + PLAYER_RADIUS * 2 * player.hp / PLAYER_MAX_HP,
  //   canvasY + PLAYER_RADIUS + 8,
  //   PLAYER_RADIUS * 2 * (1 - player.hp / PLAYER_MAX_HP),
  //   2,
  // );




    //Map rendering
    context.strokeStyle = "#FFFFFF";
    context.beginPath();
    const radiusToUse = player.hp/PLAYER_MAX_HP*5;
    context.arc((player.x/MAP_SIZE)*130+20, player.y/MAP_SIZE*130+20, radiusToUse, 0, 2 * Math.PI);
    context.strokeStyle = "#660000";
    context.arc((x/MAP_SIZE)*130+20, y/MAP_SIZE*130+20, radiusToUse, 0, 2 * Math.PI);
    context.stroke();

}

function renderBullet(me, bullet) {
  const { x, y } = bullet;
  context.drawImage(
    // getAsset('bullet.svg'),
    getAsset('bulletLime1.svg'),
    canvas.width / 2 + x - me.x - BULLET_RADIUS,
    canvas.height / 2 + y - me.y - BULLET_RADIUS,
    BULLET_RADIUS * 2,
    BULLET_RADIUS * 2,
  );
}

function renderAI(me, ai) {
    const { x, y, direction, /*thrusters*/northActive, eastActive, southActive, westActive } = ai;
    
    const canvasX = canvas.width / 2 + x - me.x;
    const canvasY = canvas.height / 2 + y - me.y;
    // context.rotate(0);
// Draw ship
    context.save();
    context.translate(canvasX, canvasY);
    context.rotate(3.1415922-direction);
    const use_size_radius = 20;
    context.drawImage(
    getAsset('ship.svg'),
        -use_size_radius,
        -use_size_radius,
        use_size_radius * 2,
        use_size_radius * 2,
    );
    const active = true;
    if(active){
        context.drawImage(
            getAsset('plumes/exaust_gif_1.gif'),
            -use_size_radius,
            -use_size_radius,
            use_size_radius * 2,
            use_size_radius * 2,
        );
    }

  context.restore();

  // Draw health bar
    context.fillStyle = '#3ec452';
    context.fillRect(
        canvasX - PLAYER_RADIUS - 1,
        canvasY + PLAYER_RADIUS + 7,
        PLAYER_RADIUS * 2+2,
        4,
    );
    
  context.fillStyle = 'white';
    context.fillRect(
        canvasX - PLAYER_RADIUS,
        canvasY + PLAYER_RADIUS + 8,
        PLAYER_RADIUS * 2,
        2,
    );
    context.fillStyle = '#3ec452';    
  context.fillRect(
    canvasX - PLAYER_RADIUS + PLAYER_RADIUS * 2 * ai.hp / PLAYER_MAX_HP,
    canvasY + PLAYER_RADIUS + 7,
    PLAYER_RADIUS * 2 * (1 - ai.hp / PLAYER_MAX_HP)+1,
    4,
  );
  if(ai.hp < PLAYER_MAX_HP){
    context.fillStyle = 'green';
  }else{
    context.fillStyle = 'orange';
  }

  context.fillRect(
    canvasX - PLAYER_RADIUS + PLAYER_RADIUS * 2 * ai.hp / PLAYER_MAX_HP - 1,
    canvasY + PLAYER_RADIUS + 8,
    PLAYER_RADIUS * 2 * (1 - ai.hp / PLAYER_MAX_HP)+1,
    2,
  );

//Place on Map
    context.strokeStyle = "blue";//"#6fd6f1";//Jousveny
    context.beginPath();
    context.arc((x/MAP_SIZE)*130+20, y/MAP_SIZE*130+20, 2, 0, 2 * Math.PI);
    context.stroke();
}

function renderAstroid(me, astroid) {
  // const { x, y } = astroid;
  // context.drawImage(
  //   getAsset('greyastroid.svg'),
  //   canvas.width / 2 + x - me.x - PLAYER_RADIUS,
  //   canvas.height / 2 + y - me.y - PLAYER_RADIUS,
  //   PLAYER_RADIUS * 2,
  //   PLAYER_RADIUS * 2,
  // );
  const { x, y, direction, type } = astroid;
  const canvasX = canvas.width / 2 + x - me.x;
  const canvasY = canvas.height / 2 + y - me.y;

  // Draw ship
  context.save();
  context.translate(canvasX, canvasY);
  context.rotate(direction);

  const displaySize = Math.trunc(Math.log(astroid.hp+3)*12);
  // const displaySize = Math.trunc(Math.log(astroid.hp+3)*12+0.001*astroid.hp+Math.pow());

    var astroidAsset = null;
    const typeChar = type.charAt(0);
    if(typeChar == 'R'){
        astroidAsset = getAsset('astroid.svg');
    }else if(typeChar == 'M'){
        astroidAsset = getAsset('greyastroid.svg');
    }else if(typeChar == 'N'){
        astroidAsset = getAsset('tealGreenAstroid.svg');
    }else{
        astroidAsset = getAsset('astroid.svg');
    }
  context.drawImage(
    // getAsset('greyastroid.svg'),
    astroidAsset,
    -displaySize,//TODO: Get to work with .size
    -displaySize,
    displaySize * 2,
    displaySize * 2,
  );
  context.restore();

  // Draw health bar
  context.fillStyle = '#15f2fd ';
  context.fillRect(
    canvasX - PLAYER_RADIUS,
    canvasY + PLAYER_RADIUS + 8,
    PLAYER_RADIUS * 2,
    2,
  );
  context.fillStyle = 'grey';
  context.fillRect(
    canvasX - PLAYER_RADIUS + PLAYER_RADIUS * 2 * astroid.hp / PLAYER_MAX_HP,
    canvasY + PLAYER_RADIUS + 8,
    PLAYER_RADIUS * 2 * (1 - astroid.hp / PLAYER_MAX_HP),
    2,
  );
}


function renderMainMenu() {
  const t = Date.now() / 7500;
  const x = MAP_SIZE / 2 + 800 * Math.cos(t);
  const y = MAP_SIZE / 2 + 800 * Math.sin(t);
  renderBackground(x, y);

  // Rerun this render function on the next frame
  animationFrameRequestId = requestAnimationFrame(renderMainMenu);
}

animationFrameRequestId = requestAnimationFrame(renderMainMenu);

// Replaces main menu rendering with game rendering.
export function startRendering() {
  cancelAnimationFrame(animationFrameRequestId);
  animationFrameRequestId = requestAnimationFrame(render);
}

// Replaces game rendering with main menu rendering.
export function stopRendering() {
  cancelAnimationFrame(animationFrameRequestId);
  animationFrameRequestId = requestAnimationFrame(renderMainMenu);
}
