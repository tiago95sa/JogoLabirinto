import config from './config';
import FirstScene from './scenes/FirstScene';
import StartMenu from './scenes/StartMenu';
import GameOver from './scenes/GameOver';
import GameOverWin from './scenes/GameOverWin';
import FinalScene from './scenes/FinalScene';


class Game extends Phaser.Game{
    constructor(){
        super(config);
        this.scene.add('FirstScene',FirstScene);
        this.scene.add('StartMenu',StartMenu);
        this.scene.add('GameOver', GameOver);
        this.scene.add('GameOverWin', GameOverWin);
        this.scene.add('FinalScene', FinalScene);
        this.scene.start('StartMenu');

        
    }
}
new Game();