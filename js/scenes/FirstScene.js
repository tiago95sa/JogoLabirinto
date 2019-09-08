import Player from "../models/player.js";
import Maca from "../models/maca.js";
import Enemy from "../models/enemy.js";
import Block from "../models/block.js";


export default class FirstScene extends Phaser.Scene {
    constructor(key) {
      super(key);
    }
     
    
      preload(){
        this.load.image('fundo' , 'assets/fundo-verde.png');
        this.load.image('bloco' , 'assets/arvore.png');
        this.load.image('maca' , 'assets/maca.png');

        this.load.spritesheet("player", "assets/link.png", {
          frameWidth: 29,
          frameHeight: 29,
          spacing: 1
        });
        
        this.load.spritesheet("enemy", "assets/enemy.png", {
          frameWidth: 24,
          frameHeight: 40,
          //spacing: 1
        });
        
        this.load.audio('musica','assets/music.ogg');
        this.load.audio('comerMaca', 'assets/comer.wav');
      }

      create(){
        //musica

        this.soundtrack=this.sound.add('musica');
        this.soundtrack.play();
        this.soundtrack.volume= 0.2;
        this.soundtrack.loop= true;
        
        this.comerMaca = this.sound.add("comerMaca");
        this.add.image(350,250,'fundo');
       
        
        this.blocks = new Block(this.physics.world,this,[]);
        //this.blocks.construirLabirinto(this);
    
          this.labirinto =  [
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,0,0,0,0,0,1,3,0,0,0,0,0,3,1],
            [1,0,1,3,1,0,1,1,0,1,1,1,1,0,1],
            [1,0,1,1,1,0,2,0,0,1,3,1,0,0,1],
            [1,0,0,0,0,0,1,1,3,1,0,0,0,1,1],
            [1,1,0,1,0,0,3,1,1,1,0,1,0,1,1],
            [1,0,0,1,0,0,0,0,0,0,0,1,3,0,1],
            [1,0,1,1,0,1,1,0,1,1,0,1,1,0,1],
            [1,0,3,0,0,1,3,0,3,1,0,0,0,0,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
          ];
            
            this.posicoesMaca = [];
      
            for(var row in this.labirinto){
              for(var col in this.labirinto[row]){
                  var valor = this.labirinto[row][col];
      
                  var x = col * 50;
                  var y = row * 50;
      
                  if(valor == 1){
                     this.blocks.create(x+24,y+24,'bloco').setImmovable();
                  } 
                  if(valor == 3){
                    var posicao = {
                    x: x + 25,
                    y: y +25  
                    };
                    this.posicoesMaca.push(posicao);
                  }
                      
                  }
              }


        // criar contador tempo 

        this.tempo = 90 ;
        this.txtTime = this.add.text( 500, 15 , 'TEMPO: ' + this.tempo,{font:'15px emulogic',fill:'#fff'});
        this.timedEvent = this.time.addEvent({ delay: 1000, callback: this.funcaoTempo, callbackScope: this, loop: true });
       


                    
        // criar player
        this.player = new Player(this, 350, 250);


        // criar inimigo
        this.enemy = new Enemy(this, 75,75);
        this.enemy2 = new Enemy(this,675,425);
       
        
        

        // criar maca 
        this.posicao = this.novaPosicao(); 
        this.maca = new Maca(this, this.posicao.x , this.posicao.y);
        this.macas = 0;
        this.qtMacas = this.add.text(15,15,"MACAS: " + this.macas , {font: '15px emulogic' , fill: '#fff'});
        
       // colisoes 

       this.physics.add.collider(this.player, this.blocks);
       this.physics.add.overlap(this.player, this.enemy ,this.gameOver,null,this);
       this.physics.add.overlap(this.player, this.enemy2 ,this.gameOver,null,this);
       this.physics.add.overlap(this.player, this.maca ,this.apanharMaca,null,this);



        // boneco player

        this.anims.create({
          key: "right",
          frames: this.anims.generateFrameNumbers("player", { start: 64, end: 69 }),
          frameRate: 10,
          repeat: -1
        });
        this.anims.create({
          key: "left",
          frames: this.anims.generateFrameNumbers("player", { start: 22, end: 27 }),
          frameRate: 10,
          repeat: 0
        });
        this.anims.create({
          key: "up",
          frames: this.anims.generateFrameNumbers("player", { start: 56, end: 63 }),
          frameRate: 10,
          repeat: 0
        });
        this.anims.create({
          key: "down",
          frames: this.anims.generateFrameNumbers("player", { start: 14, end: 21 }),
          frameRate: 10,
          repeat: 0
        });
        



        // inimigo

        this.anims.create({
          key: "right1",
          frames: this.anims.generateFrameNumbers("enemy", { start: 24, end: 31 }),
          frameRate: 10,
          repeat: 0
        });
        this.anims.create({
          key: "left1",
          frames: this.anims.generateFrameNumbers("enemy", { start: 16, end: 23 }),
          frameRate: 10,
          repeat: 0
        });
        this.anims.create({
          key: "up1",
          frames: this.anims.generateFrameNumbers("enemy", { start: 8, end: 15 }),
          frameRate: 10,
          repeat: 0
        });
        this.anims.create({
          key: "down1",
          frames: this.anims.generateFrameNumbers("enemy", { start: 0, end: 7 }),
          frameRate: 10,
          repeat: 0
        });

        

        this.cursors = this.input.keyboard.createCursorKeys();

      }
        
        
      

      update(){
       
        //this.physics.add.overlap(this.player, this.maca ,this.apanharMaca,null,this);
        this.movimentoEnemy();
        this.movimentoEnemy2()
        //this.movimentoEnemy(this.enemy2);
        this.movimentoPlayer();
        
        

      }
      
      movimentoPlayer(){
        this.player.anims.play(this.player.direction, true);
        
        if (this.cursors.left.isDown) {
          this.player.direction = "left";
          this.player.setVelocityX(-100);
          this.player.setVelocityY(0);
        } else if (this.cursors.right.isDown) {
          this.player.direction = "right";
          this.player.setVelocityX(100);
          this.player.setVelocityY(0);
        } else if (this.cursors.up.isDown) {
          this.player.direction = "up";
          this.player.setVelocityY(-100);
          this.player.setVelocityX(0);
        } else if (this.cursors.down.isDown) {
          this.player.direction = "down";
          this.player.setVelocityY(100);
          this.player.setVelocityX(0);
        } else {
          this.player.setVelocityX(0);
          this.player.setVelocityY(0);
          if (!this.player.attack) {
            this.player.anims.stop();
          }
        }
      }

      movimentoEnemy(){
        this.enemy.anims.play(this.enemy.direction, true);
        
        if(Math.floor(this.enemy.x - 25) % 50 == 0 && Math.floor(this.enemy.y -25) % 50 == 0) {
          var enemyCol = Math.floor(this.enemy.x/50);
          var enemyRow = Math.floor(this.enemy.y/50);
          
        console.log("col = " + enemyCol);
        console.log("row = " + enemyRow);
       

          var validPath = [];
        
          
        
          if(this.labirinto[enemyRow][enemyCol -1] != 1 && this.enemy.direction != 'right1'){
            validPath.push('left1');
          }
          if(this.labirinto[enemyRow][enemyCol +1] != 1 && this.enemy.direction != 'left1'){
            validPath.push('right1');
          }
          if(this.labirinto[enemyRow-1][enemyCol] != 1 && this.enemy.direction != 'down1'){
            validPath.push('up1');
          }
          if(this.labirinto[enemyRow+1][enemyCol] != 1 && this.enemy.direction != 'up1'){
            validPath.push('down1');
          }
          
          if(this.player.x > this.enemy.x && this.in_array('right1' , validPath)){
            this.enemy.direction = 'right1';
          } else if(this.player.x < this.enemy.x && this.in_array('left1' , validPath)){
            this.enemy.direction = 'left1';
          } else if(this.player.y < this.enemy.y && this.in_array('down1' , validPath)){
            this.enemy.direction = 'down1';
          }else if(this.player.y > this.enemy.y && this.in_array('up1' , validPath)){
            this.enemy.direction = 'up1';
          }else{
            this.enemy.direction = validPath[Math.floor(Math.random()*validPath.length)];
          }
        }
        
        
        switch(this.enemy.direction){
          case 'left1' :
          this.enemy.x -= 1;
          this.enemy.direction = "left1";
              
              break;
          case 'right1' :
          this.enemy.x += 1;
          this.enemy.direction = "right1";
              
              break;
          
          case 'up1' :
          this.enemy.y -= 1;
          this.enemy.direction = "up1";
              
              break;
          case 'down1' :
          this.enemy.y += 1;
          this.enemy.direction = "down1";
              
              break;
        }
      }
      

      apanharMaca(){
        this.maca.destroy();
        this.comerMaca.play(); 
        this.posicao = this.novaPosicao();
        this.maca = new Maca(this, this.posicao.x , this.posicao.y);
        this.macas ++ ;
        this.qtMacas.text = "MACAS: " + this.macas;
        this.physics.add.overlap(this.player, this.maca ,this.apanharMaca,null,this);
        if(this.macas == 5){
          this.gameOverWin();
        }
      }

      novaPosicao(){

        var pos = this.posicoesMaca[Math.floor(Math.random() * this.posicoesMaca.length)];
        
        while(this.posicao == pos){
          pos = this.posicoesMaca[Math.floor(Math.random() * this.posicoesMaca.length)];
        }
    
        return pos;
      }

      gameOver(){
        this.soundtrack.stop();
        this.scene.stop();
        this.scene.start('GameOver');
        
      }


      gameOverWin(){
        this.soundtrack.stop();
        this.scene.stop();
        this.scene.start('FinalScene');
      }
    

      movimentoEnemy2(){
        this.enemy2.anims.play(this.enemy2.direction, true);
        
        if(Math.floor(this.enemy2.x - 25) % 50 == 0 && Math.floor(this.enemy2.y -25) % 50 == 0) {
          var enemyCol = Math.floor(this.enemy2.x/50);
          var enemyRow = Math.floor(this.enemy2.y/50);
          
        console.log("col = " + enemyCol);
        console.log("row = " + enemyRow);
       

          var validPath2 = [];
        
          
        
          if(this.labirinto[enemyRow][enemyCol -1] != 1 && this.enemy2.direction != 'right1'){
            validPath2.push('left1');
          }
          if(this.labirinto[enemyRow][enemyCol +1] != 1 && this.enemy2.direction != 'left1'){
            validPath2.push('right1');
          }
          if(this.labirinto[enemyRow-1][enemyCol] != 1 && this.enemy2.direction != 'down1'){
            validPath2.push('up1');
          }
          if(this.labirinto[enemyRow+1][enemyCol] != 1 && this.enemy2.direction != 'up1'){
            validPath2.push('down1');
          }
          
        
          
          if(this.player.x > this.enemy2.x && this.in_array('right1' , validPath2)){
            this.enemy2.direction = 'right1';
          } else if(this.player.x < this.enemy2.x && this.in_array('left1' , validPath2)){
            this.enemy2.direction = 'left1';
          } else if(this.player.y < this.enemy2.y && this.in_array('down1' , validPath2)){
            this.enemy2.direction = 'down1';
          }else if(this.player.y > this.enemy2.y && this.in_array('up1' , validPath2)){
            this.enemy2.direction = 'up1';
          }else{
            this.enemy2.direction = validPath2[Math.floor(Math.random()*validPath2.length)];
          }

        }
        
        
        switch(this.enemy2.direction){
          case 'left1' :
          this.enemy2.x -= 1;
          this.enemy2.direction = "left1";
          
              
              break;
          case 'right1' :
          this.enemy2.x += 1;
          this.enemy2.direction = "right1";
              
              break;
          
          case 'up1' :
          this.enemy2.y -= 1;
          this.enemy2.direction = "up1";
              
              break;
          case 'down1' :
          this.enemy2.y += 1;
          this.enemy2.direction = "down1";
          break;
        }


      }

        in_array(string , array){
          for(var i= 0 ; i< array.length ; i++){
              if(array[i]==string){
                return true;
              }
          }
          return false;
        }

        funcaoTempo(){
          if(this.tempo == 0){
            this.gameOver();

          }
          this.tempo -- ;
          this.txtTime.text = "Tempo: " + this.tempo; 
        }

      
      
      
} 