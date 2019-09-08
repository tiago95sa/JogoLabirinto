import "../phaser";

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "maca");
    this.scene = scene;
    scene.add.existing(this);
    scene.physics.add.existing(this);
    scene.physics.world.enable(this);

  }

}
  
  

  