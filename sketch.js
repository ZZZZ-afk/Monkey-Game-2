//creating
 var    bananaImage,obstacleImage,obstacleGroup,backImage,score,player,player_running,back,foodGroup,ground;

  var score=0;

//loading images and Animations,adding Groups
function preload(){
backImage=loadImage("jungle.jpg");
  
  player_running=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImage=loadImage("banana.png");
  obstacleImage=loadImage("stone.png");
  
  obstacleGroup=new Group();
  foodGroup=new Group(); 
}

function setup() {
//creating Canvas
  createCanvas(500, 600);
  
//creating backGround,addingImage  
  back=createSprite(400,350,20,20);
  back.addImage("back",backImage);
  back.x=back.width/2;
  back.velocityX=-4;
  
//creating Player,addingAnimation
  player=createSprite(30,570,20,20);
  player.addAnimation("moving",player_running);
  player.scale=0.1;
 
//creating Ground,makingInvisible  
  ground=createSprite(0,600,800,20);
  ground.visible=false;
  
}

function draw() {
//clear the screen  
  background(200);
  
//making Smaller   
  if(obstacleGroup.isTouching(player)){
     player.scale=0.090;
}
//making background Infinity  
  if(back.x<0){
    back.x=back.width/2;
}

//adding space function
  if(keyDown("space")&&player.y>=560){
    player.velocityY=-12;
}

//adding gravity
  player.velocityY = player.velocityY + 0.4;
//making player collide
  player.collide(ground);

//spawing food,obstacle
  food();
  spawnObstacle();

//adding space function for small player
  if(keyDown("space")&&player.y>=530.5){
     player.velocityY=-12;
}

//increasing score
  if(foodGroup.isTouching(player)){
    foodGroup.destroyEach();
    score=score+2;
}

//switch commond for increse player size at setting score 
  switch(score){
    case 10:player.scale=0.12;
            break;
    case 20:player.scale=0.14;
            break;
    case 30:player.scale=0.16;
            break;
    case 40:player.scale=0.18;
            break;
    default:break;
}

//drawing sprites
  drawSprites();

//spawning score
  stroke("white");
  textSize(20);
  fill("white");
  text("score: "+ score,100,100);  
}

//function for food
function food(){
//creating banana after 80 frame
  if(frameCount % 80 ===0){
    
 //creating banana,adding images
    var banana =createSprite(350,300,25,25);
//spawing at randomly
    banana.y = Math.round(random(400,480));
    banana.setCollider("circle",0,0,80);
    banana.debug=false;
    banana.addImage(bananaImage);
    banana.velocityX=-10;
    banana.lifetime=100;
    banana.scale=0.07;
    foodGroup.add(banana);
}
}

function spawnObstacle(){
if (frameCount % 60 ===0){ 
//creating obstacle,adding image
  var obstacle = createSprite(400,570,20,20);
  //spawing at randomly
  var rand = Math.round(random(400,350));
  obstacle.setCollider("circle",0,0,300);
  obstacle.debug=true;
  
  obstacle.velocityX=-6;
  obstacle.addImage(obstacleImage);
  obstacle.scale=0.1;
  obstacleGroup.add(obstacle);
  
//making player to come before obstacle
  obstacle.depth=player.depth;
  player.depth=player.depth+1;
}
}