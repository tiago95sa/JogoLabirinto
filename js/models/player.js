export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
      super(scene, x, y, "player");
      this.scene = scene;
      scene.add.existing(this);
      scene.physics.add.existing(this);
      scene.physics.world.enable(this);
      this.setFrame(14);
      this.setScale(1.2);
      this.direction = "down";
      this.setSize(20, 20);
      this.setOffset(-1, 0);
      this.hitboxes = this.scene.add.group();
      this.vida = 4000;
    }
  
    createHitbox() {
      var hitbox = this.hitboxes.create(0, 0, null);
      hitbox.setVisible(false);
      this.scene.add.existing(hitbox);
      this.scene.physics.add.existing(hitbox);
      this.scene.physics.world.enable(hitbox);
  
      // add some properties to the hitbox. These can be accessed later for use in calculations
      hitbox.name = "sword";
      hitbox.damage = 50;
      hitbox.knockbackDirection = 0.5;
      hitbox.knockbackAmt = 600;
      return hitbox;
    }

    // activate a hitbox by namefunction
   enableHitbox() {
    var hitbox = this.createHitbox();
    hitbox.setActive(true);
    if (this.direction === "left") {
      hitbox.setPosition(this.x - 60, this.y - 10); //left
      hitbox.setSize(this.width * 2, this.height / 2);
    } else if (this.direction === "right") {
      hitbox.setPosition(this.x + 40, this.y - 10); //right
      hitbox.setSize(this.width * 2, this.height / 2);
    } else if (this.direction === "down") {
      hitbox.setPosition(this.x - 10, this.y + 40); //down
      hitbox.setSize(this.width / 2, this.height * 2);
    } else {
      hitbox.setPosition(this.x - 10, this.y - 55); //up
      hitbox.setSize(this.width / 2, this.height * 2);
    }
  }
  // disable all active hitboxesfunction
  disableAllHitboxes() {
    this.hitboxes.clear();
  }
  
  


  }