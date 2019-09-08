import Player from "../models/player.js";
import Block from "../models/block.js";
import Boss from "../models/boss.js";
import Bola from "../models/bola.js";

export default class FinalScene extends Phaser.Scene {
    constructor(key) {
      super(key);
    }
     
    
      preload(){
        this.load.image('bloco' , 'assets/arvore.png');
        this.load.spritesheet("player", "assets/link.png", {
            frameWidth: 29,
            frameHeight: 29,
            spacing: 1
          });

        this.load.spritesheet("boss" , "assets/boss.png" , {
            frameWidth: 64,
            frameHeight: 64,
            //spacing: 1
            //margin:5
          });

          this.load.spritesheet("bola", "assets/bola.png", {
            frameWidth: 64,
            frameHeight: 64
          });



          //this.load.audio('musica','assets/music.ogg');
      }




      create(){

        this.blocks = new Block(this.physics.world,this,[]);

        this.fundo =  [
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,2,2,2,2,3,3,3,3,4,4,4,4,4,1],
            [1,2,2,2,2,3,3,3,3,4,4,4,4,4,1],
            [1,2,2,2,2,3,3,3,3,4,4,4,4,4,1],
            [1,5,5,5,5,6,6,6,6,7,7,7,7,7,1],
            [1,5,5,5,5,6,6,6,6,7,7,7,7,7,1],
            [1,8,8,8,8,9,9,9,9,0,0,0,0,0,1],
            [1,8,8,8,8,9,9,9,9,0,0,0,0,0,1],
            [1,8,8,8,8,9,9,9,9,0,0,0,0,0,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
          ];
        
      
            for(var row in this.fundo){
              for(var col in this.fundo[row]){
                  var valor = this.fundo[row][col];
      
                  var x = col * 50;
                  var y = row * 50;
      
                  if(valor == 1){
                     this.blocks.create(x+24,y+24,'bloco').setImmovable();
                  } 

              }

            }
        
        // criar player
        this.player = new Player(this, 150, 250);
        this.player.setScale(2.5);



        //criar boss
        this.boss = new Boss(this,400,250);
        this.boss.setImmovable();
        this.boss.setScale(2);

        //criar bola
        this.bola = this.enemies = new Bola(this.physics.world, this, this.player);

        //Colisoes
        this.physics.add.collider(this.player, this.blocks);
        this.physics.add.overlap(
          this.player.hitboxes,
          this.boss,
          this.darHit,
          null,
          this
        );
        this.physics.add.overlap(
          this.player,
          this.bola,
          this.gameOver,
          null,
          this
        );
        
        //boss
      
        this.anims.create({
          key: "left2",
          frames: this.anims.generateFrameNumbers("boss", { start: 9, end: 9 }),
          frameRate: 9,
          repeat: 0
        });
        this.anims.create({
          key: "up2",
          frames: this.anims.generateFrameNumbers("boss", { start: 0, end: 0 }),
          frameRate: 9,
          repeat: 0
        });
        this.anims.create({
          key: "down2",
          frames: this.anims.generateFrameNumbers("boss", { start: 19, end: 19 }),
          frameRate: 9,
          repeat: 0
        });
        this.anims.create({
          key: "right2",
          frames: this.anims.generateFrameNumbers("boss", { start: 29, end: 29 }),
          frameRate: 9,
          repeat: 0
        });



        //player
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
          this.anims.create({
            key: "idle-left",
            frames: this.anims.generateFrameNumbers("player", { start: 22, end: 23 }),
            frameRate: 10,
            repeat: 0
          });
          this.anims.create({
            key: "idle-right",
            frames: this.anims.generateFrameNumbers("player", { start: 64, end: 65 }),
            frameRate: 10,
            repeat: 0
          });
          this.anims.create({
            key: "idle-up",
            frames: this.anims.generateFrameNumbers("player", { start: 56, end: 57 }),
            frameRate: 10,
            repeat: 0
          });
          this.anims.create({
            key: "idle-down",
            frames: this.anims.generateFrameNumbers("player", { start: 14, end: 15 }),
            frameRate: 10,
            repeat: 0
          });
          this.anims.create({
            key: "down-attack",
            frames: this.anims.generateFrameNumbers("player", { start: 42, end: 46 }),
            frameRate: 20,
            repeat: 0
          });
          this.anims.create({
            key: "left-attack",
            frames: this.anims.generateFrameNumbers("player", { start: 50, end: 54 }),
            frameRate: 20,
            repeat: 0
          });
          this.anims.create({
            key: "up-attack",
            frames: this.anims.generateFrameNumbers("player", { start: 84, end: 88 }),
            frameRate: 20,
            repeat: 0
          });
          this.anims.create({
            key: "right-attack",
            frames: this.anims.generateFrameNumbers("player", { start: 92, end: 96 }),
            frameRate: 20,
            repeat: 0
          });

          //bola
          this.anims.create({
            key: "explusao",
            frames: this.anims.generateFrameNumbers("bola", { start: 0, end: 23 }),
            frameRate: 10,
            repeat: 0
          });
          
          this.addEvents();

          this.cursors = this.input.keyboard.createCursorKeys();
          this.spaceBar = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.SPACE
          );
      }


      update(){

        this.movimentoPlayer();
        this.movimentoBoss();
        //console.log(this.boss.direction);
      }

      movimentoPlayer(){

        if(this.player.direction!=='idle' && !this.player.attack){
          this.player.anims.play(this.player.direction, true);
        }

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
        } else if (this.spaceBar.isDown) {
          if (!this.player.attack) {
              this.player.anims.play(this.player.direction + "-attack", true);
              this.player.attack = true;
              this.player.enableHitbox("sword");
              this.timer = this.time.addEvent({
                delay: 400,
                callback: () => {
                  this.player.attack = false;
                 
                  this.player.anims.play("idle-" + this.player.direction);
                  this.player.disableAllHitboxes();
                },
                callbackScope: this,
                repeat: 0
              });
            }
          } else {
            this.player.setVelocityX(0);
            this.player.setVelocityY(0);
            if (!this.player.attack) {
              this.player.anims.stop();
            }
          }
      }

      
      movimentoBoss(){

        this.boss.anims.play(this.boss.direction, true);
        
        if(this.player.x < 350){
            this.boss.direction = "left2";
        } else if ((this.player.x >= 250 && this.player.x <500) && (this.player.y>0 && this.player.y <= 190)){
            this.boss.direction = "up2";
        }
        else if ((this.player.x >= 250 && this.player.x <500) && (this.player.y>332 && this.player.y <= 500)){
            this.boss.direction = "down2";
        } else {
            
            this.boss.direction = "right2";
            //console.log(this.boss.direction );
        }
      
      }

      addEvents(){
        this.timer = this.time.addEvent({
          delay: 3000,
          callback: this.bola.addNovaBola,
          callbackScope: this,
          repeat: -1
        });
      }


      darHit(){
        console.log(this.boss.vida);
        this.boss.vida -= 50;
        if(this.boss.vida == 0){
          this.gameOverWin();
        }
      }

      gameOverWin(){
        this.scene.stop();
        this.scene.start('GameOverWin');
        
      }

      gameOver(){
        this.scene.stop();
        this.scene.start('GameOver');
        
      }

     
}