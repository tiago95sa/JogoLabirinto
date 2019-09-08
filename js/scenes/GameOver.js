export default class GameOver extends Phaser.Scene {
    constructor(key) {
      super(key);
    }

    create(){
        this.over = this.add.text(250,250,'Game Over', {font:'20px emulogic',fill:'#fff'});
        
      
        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.spaceBar.on('down',function(event){
            
            this.scene.stop();
            this.scene.start('StartMenu');
        }.bind(this));
    }



}