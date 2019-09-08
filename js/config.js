import './phaser.js';

export default {
    type: Phaser.AUTO,
    width: 750,
    height: 500,
    physics: {
      default: "arcade",
      arcade: {
        debug: false
      }
    },    
  };