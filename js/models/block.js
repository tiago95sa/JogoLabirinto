import "../phaser";

export default class Block extends Phaser.Physics.Arcade.Group {
  constructor(world, scene, children) {
    super(world, scene, children);
    this.scene = scene;
   
  }
  }