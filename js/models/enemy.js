export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
      super(scene, x, y, "enemy");
      this.scene = scene;
      scene.add.existing(this);
      scene.physics.add.existing(this);
      scene.physics.world.enable(this);
     
      this.direction = "down";
      this.setSize(24, 40);
      this.setOffset(-1, 0);
      
     
    
       
    }


}