var PLAY = 1;
var END = 0;
var gameState = PLAY;

var boy, boy_running, boy_collided;
var obstacles, obstaclesImg;

var backgroundImg;

var score = 0;

var jumpSound, collidedSound;

var gameOver, restart;

var obstacle, obstacle1, obstacle2, obstacle3, obstaclesGroup;

var ground, groundImage;

function preload() {
  boy_running.loadAnimation(
    "boy.png",
    "boy2.png",
    "boy3.png",
    "boy4.png",
    "boy5.png",
    "boy6.png",
    "boy7.png"
  );
  boy_collided.loadAnimation("boy8.png");

  ground.loadImage("carretera.jpg");

  obstacle1.loadImage("cono.png");
  obstacle2.loadImage("conos.png");
  obstacle3.loadImage("conos3.png");
}

function setup() {
  boy = createSprite(50, height - 70, 20, 50);
  boy.addAnimation("running", boy_running);
  boy.addAnimation("collided", boy_collided);
  boy.setCollider("circle", 0, 0, 350);

  ground = createSprite(width / 2, height, width, 2);
  ground.addImage("ground", groundImage);
  ground.x = width / 2;
  ground.velocityX = -(6 + (3 * score) / 100);

  gameOver.scale = 0.5;
  restart.scale = 0.1;

  gameOver.visible = false;
  restart.visible = false;

  obstaclesGroup = new Group();

  score = 0;
}

function draw() {
  createCanvas(600, 1266);
  boy.debug = true;
  backgroundImg(backgroundImg);
  textSize(20);
  fill("black");
  text("Puntuación: " + score, 30, 50);
}
if (gameState === PLAY) {
  score = score + Math.round(getFrameRate() / 60);
  ground.velocityX = -(6 + (3 * score) / 100);
}
if ((touches.length > 0 || keyDown("SPACE")) && trex.y >= height - 120) {
  jumpSound.play();
  boy.velocityY = -10;
  touches = [];
}
boy.velocityY = boy.velocityY + 0.8;

if (ground.x < 0) {
  ground.x = ground.width / 2;
}
if (obstaclesGroup.isTouching(boy)) {
  collidedSound.play();
  gameState = END;
} else if (gameState === END) {
  gameOver.visible = true;
  restart.visible = true;
  ground.velocityX = 0;
  boy.velocityY = 0;
  obstaclesGroup.setVelocityXEach(0);
  boy.changeAnimation("collided", boy_collided);

  drawSprites();
}

function spawnObstacles() {
  obstaclesGroup.setLifetimeEach(-1);
  if (touches.length > 0 || keyDown("SPACE")) {
    reset();
    touches = [];
  }
  obstacle.debug = true;

  obstacle.velocityX = -(6 + (3 * score) / 100);

  var rand = Math.round(random(1, 2));
  switch (rand) {
    case 1:
      obstacle.addImage(obstacle1);
      break;
    case 2:
      obstacle.addImage(obstacle2);
      break;
    case 3:
      obstacle.addImage(obstacle3);
  }

  obstacle.scale = 0.3;
  obstacle.lifetime = 300;
  obstacle.depth = trex.depth;
  boy.depth += 1;
  obstaclesGroup.add(obstacle);
}
