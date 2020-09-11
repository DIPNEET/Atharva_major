class Game {
  constructor() {
    this.end1=createElement("go");
    this.score1=createElement("go");
    this.score2=createElement("go");
  }
  getState() {
    var gameStateRef = database.ref('gameState');
    gameStateRef.on("value", function (data) {
      gameState = data.val();
    })

  }

  update(state) {
    database.ref('/').update({
      gameState: state
    });
  }
  async start() {
    if (gameState === 0) {
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if (playerCountRef.exists()) {
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
  
    p1 = createSprite(500, 500, 50, 50);
    p1.visible=false
    p1.addImage("p1",playerImage)
    p1.scale=3
    p2 = createSprite(600, 500, 50, 50);
    p2.addImage("p2",playerImage)
    p2.scale=3
    p2.visible=false
    p = [p1, p2];



  }
  play() {
    // background("#2D968D")
   

    form.hide();
    Player.getPlayerInfo();
    if (allPlayers !== undefined) {
      // background(rgb(198,135,103));
      // image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
      //index of the array
      var index = 0;
      
      //x and y position of the players
      var x;
      var y = displayHeight / 2;
       
      for (var plr in allPlayers) {
        //add 1 to the index for every loop
        index = index + 1;
         
        //position the cars a little away from each other in x direction
        x = displayWidth - 100


        if (index === player.index) {
          textSize(40);
          fill(255)
          text(allPlayers[plr].name + " : " +  player.score, 100,50)
          p[index-1].visible=true
          time=Math.round(frameCount/12)
          text('Time:'+time,100,120)
          p[index - 1].x = x
        //  if (keyDown(UP_ARROW) && player.index != null && p[index - 1].y > 50) {
            p[index - 1].y =mouseY
         // }
         //// if (keyDown(DOWN_ARROW) && player.index != null && p[index - 1].y < displayHeight - 50) {
           // p[index - 1].y += 5
         // }
          p[index - 1].shapeColor = "red";
        
          
          if(keyIsPressed===true &&player.index!=null ){
            this.spawnBullet(index)
            break;
          }
         
          
          if(frameCount % 60===0){
            var randY = random(160,580);
                enemy = createSprite(0,randY,10,40);
                enemy.velocityX=6;
                // enemy.scale=.5;
                enemy.lifetime=innerWidth/6;
                enemy.addImage("enemy",enemyImage);
                enemyGroup.add(enemy)
                
                enemy.scale=0.2
              }
            
        }

        if(bulletsGroup.collide(enemyGroup)){
          
          player.score+=10;
          enemyGroup.get(i).remove()
          bulletsGroup.destroyEach()
          i+=1
         
    
        }
        if(time>=30){
          gameState=2
          game.update(2);
        }
       
      }
      
    
    }
    drawSprites()
  
  }
  spawnBullet(index){
    if (frameCount % 2=== 0) {
      bullet = createSprite(p[index-1].x - 80, p[index-1].y-30, 30, 10);
      bullet.velocityX = -15;
     
      bullet.addImage("bullet",bulletImage)
      bullet.scale=0.25
      bulletsGroup.add(bullet)
      shoot.play()
     
      
    }
  }

 
  
  end() {
    background("yellow")
    bulletsGroup.destroyEach()
    enemyGroup.destroyEach()
    this.end1.position(innerWidth/2-200,innerHeight/2);
    this.end1.html("GAME OVER")
    form.reset.position(innerWidth/2-100,innerHeight/2-150);
    form.reset.size(200,60)
    bgSound.stop()
    shoot.stop()
    i=0
    //var playerIndex1 = "players/player1/";
    //var playerIndex2 = "players/player2/";
    var i=1
    Player.score()
    text(scores[i],innerWidth/2-200,innerHeight/2+100)
    text(scores[i+1],innerWidth/2-200,innerHeight/2+100)
    //this.score1.position(innerWidth/2-200,innerHeight/2+100);
    //this.score1.position(innerWidth/2-200,innerHeight/2+140);
    //this.score1.html(playerIndex1+score)
    //this.score2.html(playerIndex2+score)
  }


}

