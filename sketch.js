const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var fruit,rope;
var fruit_con;
var fruit_con2;
var fruit_con3;
var rope2,rope3;

var bg_img;
var food;
var rabbit;
var bunny;
var button,blower;
var button2,button3;

var blink,eat,sad;

var mute_btn;
var bg_sound;
var cut_sound;
var eat_sound;
var sad_sound;
var air;
var fr;
var canW,canH;

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');
  star_img = loadImage('star.png');
  empty_star = loadAnimation('empty.png');
  one_star = loadAnimation('one_star.png');
  two_star = loadAnimation('stars.png')

  bg_sound = loadSound('sound1.mp3');
  sad_sound = loadSound('sad.wav');
  cut_sound = loadSound('rope_cut.mp3');
  eat_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');

  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");

  blink.playing=true;
  eat.playing=true;
  sad.playing=true;
  eat.looping=false;
  sad.looping=false;
}

function setup() 
{
  /*var isMobile=/iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if(isMobile){
    canW=displayWidth;
    canH=displayHeight;
    createCanvas(displayWidth+80,displayHeight);
  }
  else{
    canW=windowWidth;
    canH=windowHeight;
    createCanvas(windowWidth,windowHeight);
  }*/

  createCanvas(600,700);
  frameRate(80);

  bg_sound.play();
  bg_sound.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;

  button=createImg("cut_btn.png");
  button.position(100,90);
  button.size(50,50);
  button.mouseClicked(drop);

  button2=createImg("cut_btn.png");
  button2.position(450,90);
  button2.size(60,60);
  button2.mouseClicked(drop2);

  /*button3=createImg("cut_btn.png");
  button3.position(360,200);
  button3.size(60,60);
  button3.mouseClicked(drop3);*/

  blower=createImg("baloon2.png");
  blower.position(260,370);
  blower.size(120,120);
  blower.mouseClicked(airblow);

  star_display=createSprite(50,20,30,30);
  star_display.scale=0.3;
  star_display.addAnimation('empty',empty_star);
  star_display.addAnimation('one',one_star);
  star_display.addAnimation('two',two_star);
  star_display.changeAnimation('empty');

  star = createSprite(320,50,20,20);
  star.addImage(star_img);
  star.scale = 0.02;

  star2 = createSprite(50,330,20,20);
  star2.addImage(star_img);
  star2.scale = 0.02;
  
  mute_btn=createImg("mute.png");
  mute_btn.position(width-50,20);
  mute_btn.size(50,50);
  mute_btn.mouseClicked(mute);

  blink.frameDelay=20;
  eat.frameDelay=20;
  //sad.frameDelay=20;

  rope = new Rope(7,{x:120,y:90});
  rope2 = new Rope(7,{x:490,y:90});
  //rope3 = new Rope(4,{x:400,y:225});

  ground = new Ground(300,height,width,20);

  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  bunny = createSprite(200,height-80,100,100);
  //bunny.addImage(rabbit);
  bunny.scale=0.2
  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation("blinking");

  fruit_con = new Link(rope,fruit);
  fruit_con2 = new Link(rope2,fruit);
  //fruit_con3 = new Link(rope3,fruit);  

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  //imageMode(CENTER);
  
}

function draw() 
{
  background(51);

  image(bg_img,0,0,width,height);
  push();
  imageMode(CENTER);

  if(fruit!=null){
  
  image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  rope.show();
  rope2.show();
 //rope3.show();

  Engine.update(engine);
  ground.show();

  drawSprites();

  if(collide(fruit,bunny,80)==true){
    World.remove(engine.world,fruit);
    fruit = null;
    bunny.changeAnimation('eating');
    eat_sound.play();
  }
  if(fruit!=null && fruit.position.y>=650){
    bunny.changeAnimation('crying');
    bg_sound.stop();
    sad_sound.play();
    fruit = null;
  }

  if(collide(fruit,star,20)==true) { 
    star.visible = false; 
    star_display.changeAnimation('one'); 
  } 
  if(collide(fruit,star2,40)==true) { 
    star2.visible= false; 
    star_display.changeAnimation('two'); 
  }

}
function drop(){
  cut_sound.play();
  fruit_con.detach();
  rope.break();
  fruit_con=null;
}
function drop2(){
  cut_sound.play();
  fruit_con2.detach();
  rope2.break();
  fruit_con2=null;
}
/*function drop3(){
  cut_sound.play();
  fruit_con3.detach();
  rope3.break();
  fruit_con3=null;
}*/

function collide(body,sprite,x) { 
  if(body!=null) { 
    var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y); 
    if(d<=x) { 

     //World.remove(engine.world,fruit); 
      //fruit = null; 

      return true; } 
      else{ 
        return false; 
      } 
    } 
  }
 /*function keyPressed() { 
    if(keyCode==LEFT_ARROW) { 
      airblow(); 
    } 
  }*/

  function airblow() { 
    Matter.Body.applyForce(fruit,{x:0,y:0},{x:0,y:-0.03}); 
    air.play(); 
  }

  function mute() { 
    if(bg_sound.isPlaying()) {
       bg_sound.stop();
       } 
       else{
          bg_sound.play(); 
        } 
      }