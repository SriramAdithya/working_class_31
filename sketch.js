const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

let engine, world;
let box1, pig1, pig3;
let backgroundImg, platform;
let bird, slingshot;
let score = 0;

let gameState = 'onSling';

async function preload() {
  backgroundImg = loadImage('sprites/bg.png');
  try {
    let image = await getImage();
    backgroundImg = loadImage(image);
  } catch {
    console.error('Something went wrong');
    setTimeout(function () {
      preload();
    }, 3000);
  }
}

function setup() {
  createCanvas(1200, 400);
  engine = Engine.create();
  world = engine.world;

  ground = new Ground(600, height, 1200, 20);
  platform = new Ground(150, 305, 300, 170);

  box1 = new Box(700, 320, 70, 70);
  box2 = new Box(920, 320, 70, 70);
  pig1 = new Pig(810, 350);
  log1 = new Log(810, 260, 300, PI / 2);

  box3 = new Box(700, 240, 70, 70);
  box4 = new Box(920, 240, 70, 70);
  pig3 = new Pig(810, 220);

  log3 = new Log(810, 180, 300, PI / 2);

  box5 = new Box(810, 160, 70, 70);
  log4 = new Log(760, 120, 150, PI / 7);
  log5 = new Log(870, 120, 150, -PI / 7);

  bird = new Bird(200, 50);

  slingshot = new SlingShot(bird.body, { x: 200, y: 50 });
}

function draw() {
  background(backgroundImg);
  Engine.update(engine);
  textSize(25);
  fill('red');
  text(score, 1000, 90);

  box1.display();
  box2.display();
  ground.display();
  pig1.display();
  pig1.score();
  log1.display();

  box3.display();
  box4.display();
  pig3.display();
  pig3.score();
  log3.display();

  box5.display();
  log4.display();
  log5.display();

  bird.display();
  platform.display();
  slingshot.display();
}

function mouseDragged() {
  if (gameState !== 'launched') {
    Matter.Body.setPosition(bird.body, { x: mouseX, y: mouseY });
  }
}

function mouseReleased() {
  slingshot.fly();
  gameState = 'launched';
}

function keyPressed() {
  if (keyCode === 32) {
    Matter.Body.setPosition(bird.body, { x: 200, y: 50 });
    slingshot.attach(bird.body);
    bird.trajectory = [];
    gameState = 'onSling';
  }
}

async function getImage() {
  const request = await fetch('https://worldtimeapi.org/api/timezone/Asia/Kolkata');
  const { datetime } = await request.json();
  const hour = datetime.slice(11, 13);
  const background = `sprites/${hour >= 18 ? 'bg2.jpg' : 'bg.png'}`;
  return background;
}
