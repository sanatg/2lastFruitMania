var canvas;
var gameState;
var play = 1;
var end = 2;
var runner,runner_Img;
var runner_Img2;
var runner_Img3;
var runnerstarterImg;
var startPoint,startPoint_Img;
var ground2;
var ground1;
var jumperButton,jumperButtonImg;
var backgroundImg;
var obstaclesGroup;
var obstacle;
var startButton,startButtonImg;
var obstacle1;
var obstacle2;
var score = 0;
var obstacle3;
var obstacle4;
var highScore,highScoreImg;
var scoreImg;
var obstacle5;
var obstacle6;
var watermelon;
var lemon;
var resetButton,resetButtonImg;
var banana;
var pear;
var fruitgroup;
var obstacle1s;
var starterText;
localStorage["HighestScore"] = 0;

var starterTextImg;
function preload(){
    backgroundImg = loadImage("./img/BACK.png");
    runnerstarterImg = loadImage("./img/starter.png");
    runner_Img = loadImage("./img/runner.gif");
    runner_Img2 = loadImage("./img/jumper.png");
    runner_Img3 = loadImage("./img/lander.png");
    startPoint_Img = loadImage("./img/startPoint.png");
    obstacle1 = loadImage("./img/1obstacle.png");
    obstacle2 = loadImage("./img/2obstacle.png");
    obstacle3 = loadImage("./img/3obstacle.png");
    obstacle4 = loadImage("./img/trapper.png");
    obstacle5 = loadImage("./img/fire.png");
    obstacle6 = loadImage("./img/point.png");
    starterTextImg = loadImage("./img/starterText1.png");
    startButtonImg = loadImage("./img/startbutton.png");
    jumperButtonImg = loadImage("./img/jumperButton.png");
    watermelon = loadImage("./img/watermelon.png");
    lemon = loadImage("./img/lemon.png");
    banana = loadImage("./img/banana.png");
    pear = loadImage("./img/pear.png");
    scoreImg = loadImage("./img/score.png");
    resetButtonImg = loadImage("./img/reset.png");
    highScoreImg = loadImage("./img/HIGHSCORE.png");
}
    
function setup(){
    canvas = createCanvas(displayWidth,displayHeight);
    runner = createSprite(40,displayHeight-50,0,0);
    runner.addImage(runnerstarterImg);
   // runner.addImage(runner_Img);
    startPoint = createSprite(30,displayHeight-50,0,0);
    startPoint.addImage(startPoint_Img); 
    starterText = createSprite(500,displayHeight/2,30,30);
    starterText.addImage(starterTextImg);
    ground1 = createSprite(0,displayHeight-150,displayWidth+1500,4);
    ground2 = createSprite(0,displayHeight-10,displayWidth+1500,4);
    ground3 = createSprite(700,displayHeight/2,10,200)
    runner.setCollider('circle',0,0,15)
    startButton = createSprite(500,displayHeight/2+100,10,10);
    startButton.addImage(startButtonImg)
    jumperButton = createSprite(1500,displayHeight/2+100,100,100);
    jumperButton.addImage(jumperButtonImg);
    score1 = createSprite(1000,displayHeight-395,100,100);
    score1.addImage(scoreImg);
    resetButton = createSprite(500,displayHeight/2+100,10,10);
    resetButton.addImage(resetButtonImg);

    //runner.debug = true;
    obstaclesGroup = new Group();
    fruitgroup = new Group();
   // obstacle1s = createSprite(800,265,10,40);
   // obstacle2s = createSprite(200,265,10,40);
  //  obstacle3s = createSprite(400,265,10,40);
}

function draw(){
    background(backgroundImg)
    starterText.scale =0.9;
 resetButton.visible = false;
    //stroke(255);
    stroke("green");
    textSize(33);
    text(score,displayWidth-250,displayHeight-385);
 if(touches.length>0||mousePressedOver(startButton)){
    gameState = play;
    touches = [];
 }

 ground1.visible = false;
 ground2.visible = false; 
 ground3.visible = false; 
 
 //ground3.debug = true;
   if(gameState ===play){
 spawnobstacles();
 spawnFruit();

 //stroke(255);
 //stroke(21,24,38);
 //textSize(33);
 //text(score,1130,displayHeight-585);
 runner.scale = 1.5;
 jumperButton.velocity.x = -3;
 if( ground3.isTouching(jumperButton)){
     jumperButton.velocity.x = 0;     
}
 startButton.velocity.x = -3;
 startPoint.position.x = startPoint.position.x-3;
 starterText.position.x = starterText.position.x-3;
 if(touches.length>1||mousePressedOver(jumperButton)){
 runner.position.y = runner.position.y-5
 runner.addImage(runner_Img2);
 touches = [];
 }

 runner.position.y = runner.position.y+3
     
 if(runner.collide(ground1)){
    runner.addImage(runner_Img3);
 }
 if( runner.collide(ground2))
 {
 runner.addImage(runner_Img);
 }
if(runner.isTouching(obstaclesGroup)){
runner.addImage(runnerstarterImg);
gameState = end;
//obstacle1s.velocity.x = 0;
}    //ground.x = ground.position.x-3
//backgroundSound.play();
if(runner.isTouching(fruitgroup)){
fruitgroup.destroyEach();
score = score+10
}
   }
   if(gameState === end){
  obstaclesGroup.setVelocityXEach(0);
  obstaclesGroup.setLifetimeEach(-1);
  fruitgroup.setVelocityXEach(0);
  fruitgroup.setLifetimeEach(-1);
  //if( jumperButton.collide(ground3)){
   //  jumperButton.velocity.x = 0;     
   //}
   if(jumperButton.isTouching(ground3)){
        jumperButton.velocity.x = 0;     
   }
   resetButton.visible = true;
  
   if(mousePressedOver(resetButton)){
           reset();
   }

  // console.log(localStore)

   }
   drawSprites();
}

function spawnobstacles(){
    if(frameCount % 200 === 0) {
        obstacle1s = createSprite(displayWidth,displayHeight-25,10,40);
       // obstacle.debug = true;
        obstacle1s.velocity.x = -(3 + 2*score/100);
        //generate random obstacles
        var rand = Math.round(random(1,6));
        switch(rand) {
          case 1: obstacle1s.addImage(obstacle1);
                  break;
          case 2: obstacle1s.addImage(obstacle2);
                  break;
          case 3: obstacle1s.addImage(obstacle3);
                  break;
          case 4: obstacle1s.addImage(obstacle4);
                  break;
          case 5: obstacle1s.addImage(obstacle5);
                  break;
          case 6: obstacle1s.addImage(obstacle6);
                  break;        
          default: break;
        }
                 
        obstacle1s.scale = 0.5;
        //obstacle1s.lifetime = 300;
        obstaclesGroup.add(obstacle1s);
        
      }

}
function spawnFruit(){
        if(frameCount % 400 === 0){
       var fruit = createSprite(displayWidth-30,displayHeight-100,10,40);
       fruit.scale = 0.5;
       fruit.velocity.x = -(3 + 2*score/100);
       var rand2 = Math.round(random(1,4));
       switch(rand2){
         case 1: fruit.addImage(watermelon);
         break;
         case 2: fruit.addImage(lemon);
         break;
         case 3: fruit.addImage(banana);
         break;
         case 4: fruit.addImage(pear);
         break;
         default: break;    
       }
        fruitgroup.add(fruit);
        }
      }
 function reset(){
         gameState = play;
         obstaclesGroup.destroyEach();
         fruitgroup.destroyEach();
         resetButton.visible = false;
         runner.addImage(runner_Img);
           
  if(localStorage["HighestScore"]<score){
        localStorage["HighestScore"] = score;
      }
      
      console.log(localStorage["HighestScore"]);
      localStorage["HighestScore"] = 0;
         score = 0;
 }