var PLAY=1
var END=0
var WIN=2
var gameState= PLAY


var frog, frog_jumping
var jungle 
var backgroundimg
var obstacleimg
var obstacleGroup 

function preload(){
  frog_jumping = loadAnimation("./assets/frog-1.png","./assets/frog-2.png","./assets/frog-3.png","./assets/frog-4.png")
  backgroundimg = loadImage("./assets/bg.png")
  obstacleimg = loadImage("./assets/stone.png")
  frog_end = loadImage("./assets/frog-1.png")

}

function setup(){
  createCanvas(800, 400);
  
  swamp=createSprite(400,100,400,20)
  swamp.addImage("swamp",backgroundimg)
  swamp.scale=0.3
  swamp.x = width/2


  frog = createSprite(100,300,50,50);
  frog.addAnimation("jumping",frog_jumping)
  frog.scale=0.4
  frog.setCollider("circle",0,0,60)
  
  frog.addImage("end",frog_end)

  invisibleGround = createSprite(200,350,1500,10);
  invisibleGround.visible = false;

  invisibleGround2 = createSprite(200,5,1500,10);
  invisibleGround2.visible = false;

  

  obstacleGroup = new Group();



}

function draw(){
  background("green")


  if(gameState == PLAY){
    swamp.velocityX=-3
    if(swamp.x<500){
      swamp.x=600
    }

    console.log(frog.y)
    if(keyDown("space")&& frog.y>75){
      frog.velocityY = -50 
      
    }
    frog.velocityY = frog.velocityY+4
  
    spawnObstacles()
    if(obstacleGroup.isTouching(frog)){
      
      gameState="END"
    }
  }
  else if(gameState==END){
    frog.velocityX=0
    swamp.velocityX=0
    
    obstacleGroup.setVelocityXEach(0)
    obstacleGroup.setLifetimeEach(-1)


  }
  
  
  

  



  frog.collide(invisibleGround2);
  frog.collide(invisibleGround);
  drawSprites()

}

function spawnObstacles(){
  if (frameCount % 80 === 0){
    var obstacle = createSprite(camera.position.x+ 100,300,40,40)
    obstacle.setCollider("rectangle",0,0,200,200)
    
    obstacle.addImage(obstacleimg)
    obstacle.velocityX =-4
    obstacle.x= Math.round(random(300,400))
    obstacle .scale = 0.2

    obstacle.lifetime = 400
    obstacleGroup.add(obstacle)



  }
}


